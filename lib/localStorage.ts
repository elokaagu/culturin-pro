// localStorage utility with quota handling and data compression

export const localStorageUtils = {
  // Check if localStorage is available
  isAvailable: (): boolean => {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },

  // Get available storage space (approximate)
  getAvailableSpace: (): number => {
    try {
      let total = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length;
        }
      }
      // Most browsers have 5-10MB limit, we'll use 4MB as safe limit
      return 4 * 1024 * 1024 - total;
    } catch {
      return 0;
    }
  },

  // Safe setItem with quota handling
  setItem: (key: string, value: string): boolean => {
    try {
      // Check if data is too large
      if (value.length > 1024 * 1024) { // 1MB limit per item
        console.warn(`Data for key "${key}" is too large (${value.length} bytes)`);
        return false;
      }

      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Failed to save "${key}" to localStorage:`, error);
      
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        // Try to clear some space
        try {
          // Remove some non-essential items
          const itemsToRemove = ['websiteData', 'culturinItineraries', 'temp_*'];
          itemsToRemove.forEach(item => {
            if (item.includes('*')) {
              // Handle wildcard removal
              Object.keys(localStorage).forEach(key => {
                if (key.startsWith(item.replace('*', ''))) {
                  localStorage.removeItem(key);
                }
              });
            } else {
              localStorage.removeItem(item);
            }
          });
          
          // Try again
          localStorage.setItem(key, value);
          return true;
        } catch (retryError) {
          console.error('Failed to save even after clearing space:', retryError);
          return false;
        }
      }
      return false;
    }
  },

  // Compress data before saving
  compressData: (data: any): string => {
    // Remove large objects and unnecessary data
    const compressed = JSON.parse(JSON.stringify(data, (key, value) => {
      // Skip large objects
      if (key === 'placedBlocks' || key === 'headerImage' || key === 'blocks') {
        return undefined;
      }
      
      // Limit array sizes
      if (Array.isArray(value) && value.length > 10) {
        return value.slice(0, 10);
      }
      
      // Convert large strings to markers
      if (typeof value === 'string' && value.length > 1000) {
        return 'saved';
      }
      
      return value;
    }));
    
    return JSON.stringify(compressed);
  },

  // Save with compression and quota handling
  saveWithCompression: (key: string, data: any): boolean => {
    const compressed = localStorageUtils.compressData(data);
    return localStorageUtils.setItem(key, compressed);
  },

  // Safe removeItem
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Failed to remove "${key}" from localStorage:`, error);
      return false;
    }
  },

  // Safe getItem
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Failed to get "${key}" from localStorage:`, error);
      return null;
    }
  },

  // Clear all non-essential data
  clearNonEssential: (): void => {
    try {
      const essentialKeys = ['culturin_user_data', 'websiteLastSaved', 'websiteAutoSave'];
      const allKeys = Object.keys(localStorage);
      
      allKeys.forEach(key => {
        if (!essentialKeys.includes(key)) {
          localStorage.removeItem(key);
        }
      });
      
      console.log('Cleared non-essential localStorage data');
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  },

  // Clean up large itineraries data
  cleanupItineraries: (): void => {
    try {
      const itinerariesStr = localStorage.getItem('culturinItineraries');
      if (itinerariesStr && itinerariesStr.length > 1024 * 1024) { // 1MB
        console.warn('Itineraries data is too large, cleaning up...');
        
        const itineraries = JSON.parse(itinerariesStr);
        
        // Keep only essential fields and limit to 5 itineraries
        const cleanedItineraries = itineraries.slice(0, 5).map((itinerary: any) => ({
          id: itinerary.id,
          title: itinerary.title,
          description: itinerary.description?.substring(0, 500), // Limit description
          days: itinerary.days,
          image: itinerary.image,
          highlights: itinerary.highlights?.slice(0, 3), // Limit highlights
          // Remove large objects
          activities: undefined,
          accommodations: undefined,
          transportation: undefined,
          meals: undefined,
          notes: undefined,
        }));
        
        localStorage.setItem('culturinItineraries', JSON.stringify(cleanedItineraries));
        console.log('Cleaned up itineraries data');
      }
    } catch (error) {
      console.error('Failed to cleanup itineraries:', error);
      // If cleanup fails, remove the data entirely
      localStorage.removeItem('culturinItineraries');
    }
  }
};
