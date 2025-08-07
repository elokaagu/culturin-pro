import { User } from "@supabase/supabase-js";
import { localStorageUtils } from "@/lib/localStorage";
import { supabase } from "@/lib/supabase";

/**
 * Centralized service for loading and managing user-specific data
 * across all dashboard sections
 */
export class UserDataService {
  private static instance: UserDataService;
  private userDataCache: Map<string, any> = new Map();
  private loadingPromises: Map<string, Promise<any>> = new Map();

  static getInstance(): UserDataService {
    if (!UserDataService.instance) {
      UserDataService.instance = new UserDataService();
    }
    return UserDataService.instance;
  }

  /**
   * Load all user-specific data for a given user
   */
  async loadUserData(user: User): Promise<any> {
    const cacheKey = `userData_${user.id}`;
    
    // Return cached data if available and fresh
    if (this.userDataCache.has(cacheKey)) {
      const cached = this.userDataCache.get(cacheKey);
      const cacheAge = Date.now() - cached.timestamp;
      
      // Use cache for 5 minutes
      if (cacheAge < 5 * 60 * 1000) {
        return cached.data;
      }
    }

    // Return existing promise if already loading
    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey);
    }

    // Start loading user data
    const loadingPromise = this.fetchUserData(user);
    this.loadingPromises.set(cacheKey, loadingPromise);

    try {
      const userData = await loadingPromise;
      
      // Cache the result
      this.userDataCache.set(cacheKey, {
        data: userData,
        timestamp: Date.now()
      });

      return userData;
    } finally {
      this.loadingPromises.delete(cacheKey);
    }
  }

  /**
   * Fetch user data from various sources
   */
  private async fetchUserData(user: User): Promise<any> {

    const userData = {
      user: {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
        role: 'user',
        studio_access: true
      },
      itineraries: [],
      bookings: [],
      guests: [],
      analytics: {
        totalBookings: 0,
        totalRevenue: 0,
        averageRating: 0,
        newGuests: 0
      },
      settings: {},
      preferences: {},
      lastLogin: new Date().toISOString()
    };

    try {
      // Load user profile from database
      const { data: userProfile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (userProfile) {
        userData.user = { ...userData.user, ...userProfile };
      }

      // Load itineraries
      try {
        const { data: itineraries } = await supabase
          .from('itineraries')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        userData.itineraries = itineraries || [];
      } catch (error) {
        userData.itineraries = this.loadItinerariesFromLocalStorage(user.id);
      }

      // Load user preferences and settings from localStorage
      userData.preferences = this.loadFromLocalStorage(`userPreferences_${user.id}`, {});
      userData.settings = this.loadFromLocalStorage(`userSettings_${user.id}`, {
        theme: 'light',
        notifications: true,
        autoSave: true
      });

      // Update last login
      this.saveToLocalStorage(`userLastLogin_${user.id}`, userData.lastLogin);

      return userData;
    } catch (error) {
      console.error("❌ Error loading user data:", error);
      
      // Return fallback data with localStorage content
      userData.itineraries = this.loadItinerariesFromLocalStorage(user.id);
      userData.preferences = this.loadFromLocalStorage(`userPreferences_${user.id}`, {});
      userData.settings = this.loadFromLocalStorage(`userSettings_${user.id}`, {});
      
      return userData;
    }
  }

  /**
   * Load itineraries from localStorage as fallback
   */
  private loadItinerariesFromLocalStorage(userId: string): any[] {
    try {
      const userSpecificKey = `culturinItineraries_${userId}`;
      let itinerariesStr = localStorageUtils.getItem(userSpecificKey);

      // Fallback to generic key
      if (!itinerariesStr) {
        itinerariesStr = localStorageUtils.getItem("culturinItineraries");
        if (itinerariesStr) {
          // Migrate to user-specific key
          localStorageUtils.setItem(userSpecificKey, itinerariesStr);
        }
      }

      if (itinerariesStr) {
        return JSON.parse(itinerariesStr);
      }
    } catch (error) {
      console.error("Error loading itineraries from localStorage:", error);
    }
    return [];
  }

  /**
   * Load data from localStorage with fallback
   */
  private loadFromLocalStorage(key: string, fallback: any = null): any {
    try {
      const data = localStorageUtils.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return fallback;
    }
  }

  /**
   * Save data to localStorage
   */
  private saveToLocalStorage(key: string, data: any): void {
    try {
      localStorageUtils.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }

  /**
   * Update user preferences
   */
  async updateUserPreferences(userId: string, preferences: any): Promise<void> {
    const key = `userPreferences_${userId}`;
    this.saveToLocalStorage(key, preferences);
    
    // Update cache
    const cacheKey = `userData_${userId}`;
    if (this.userDataCache.has(cacheKey)) {
      const cached = this.userDataCache.get(cacheKey);
      cached.data.preferences = preferences;
    }
  }

  /**
   * Update user settings
   */
  async updateUserSettings(userId: string, settings: any): Promise<void> {
    const key = `userSettings_${userId}`;
    this.saveToLocalStorage(key, settings);
    
    // Update cache
    const cacheKey = `userData_${userId}`;
    if (this.userDataCache.has(cacheKey)) {
      const cached = this.userDataCache.get(cacheKey);
      cached.data.settings = settings;
    }
  }

  /**
   * Clear all user data from cache and localStorage
   */
  clearUserData(userId: string): void {
    
    // Clear cache
    const cacheKey = `userData_${userId}`;
    this.userDataCache.delete(cacheKey);
    this.loadingPromises.delete(cacheKey);
    
    // Clear localStorage
    if (typeof window !== "undefined") {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (
          key.startsWith(`culturinItineraries_${userId}`) ||
          key.startsWith(`userPreferences_${userId}`) ||
          key.startsWith(`userSettings_${userId}`) ||
          key.startsWith(`userLastLogin_${userId}`) ||
          key.startsWith(`publishedWebsiteUrl_${userId}`) ||
          key.startsWith(`websiteData_${userId}`)
        )) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    }
  }

  /**
   * Get cached user data without loading
   */
  getCachedUserData(userId: string): any | null {
    const cacheKey = `userData_${userId}`;
    const cached = this.userDataCache.get(cacheKey);
    return cached ? cached.data : null;
  }

  /**
   * Refresh user data (force reload)
   */
  async refreshUserData(user: User): Promise<any> {
    const cacheKey = `userData_${user.id}`;
    this.userDataCache.delete(cacheKey);
    return this.loadUserData(user);
  }
}

// Export singleton instance
export const userDataService = UserDataService.getInstance();
