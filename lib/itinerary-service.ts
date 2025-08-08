import { supabase } from "./supabase";
import { supabaseStorage } from "./supabase-storage";

export interface Itinerary {
  id: string;
  title: string;
  description?: string;
  days: number;
  price?: number;
  currency?: string;
  image?: string;
  highlights?: string[];
  activities?: any[];
  accommodations?: any[];
  transportation?: any[];
  meals?: any[];
  notes?: any[];
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  status?: "draft" | "published" | "archived";
}

class ItineraryService {
  /**
   * Get all itineraries for the current user
   */
  async getItineraries(): Promise<Itinerary[]> {
    try {
      // Check if user is authenticated
      const isAuthenticated = await supabaseStorage.isAuthenticated();
      
      if (!isAuthenticated) {
        console.warn("User not authenticated, cannot get itineraries from database");
        return [];
      }

      const userId = await supabaseStorage.getCurrentUserId();
      if (!userId) {
        console.warn("No user ID found");
        return [];
      }

      // Try to get from database first
      const { data: itineraries, error } = await supabase
        .from("itineraries")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Database error, falling back to Supabase storage:", error);
        // Fallback to Supabase storage
        const storedItineraries = await supabaseStorage.getItem(`userItineraries_${userId}`);
        return storedItineraries || [];
      }

      // Also save to Supabase storage as backup
      if (itineraries) {
        await supabaseStorage.setItem(`userItineraries_${userId}`, itineraries);
      }

      return itineraries || [];
    } catch (error) {
      console.error("Error getting itineraries:", error);
      return [];
    }
  }

  /**
   * Save itinerary to database and Supabase storage
   */
  async saveItinerary(itinerary: Itinerary): Promise<boolean> {
    try {
      const isAuthenticated = await supabaseStorage.isAuthenticated();
      
      if (!isAuthenticated) {
        console.warn("User not authenticated, saving to Supabase storage only");
        const userId = await supabaseStorage.getCurrentUserId();
        if (userId) {
          const localItineraries = await this.getItinerariesFromStorage(userId);
          const updatedItineraries = this.updateItineraryInList(localItineraries, itinerary);
          return await supabaseStorage.setItem(`userItineraries_${userId}`, updatedItineraries);
        }
        return false;
      }

      const userId = await supabaseStorage.getCurrentUserId();
      if (!userId) {
        console.warn("No user ID found");
        return false;
      }

      // Save to database
      const { error } = await supabase
        .from("itineraries")
        .upsert({
          ...itinerary,
          user_id: userId,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error("Database error, falling back to Supabase storage:", error);
        // Fallback to Supabase storage
        const localItineraries = await this.getItinerariesFromStorage(userId);
        const updatedItineraries = this.updateItineraryInList(localItineraries, itinerary);
        return await supabaseStorage.setItem(`userItineraries_${userId}`, updatedItineraries);
      }

      // Also save to Supabase storage as backup
      const localItineraries = await this.getItinerariesFromStorage(userId);
      const updatedItineraries = this.updateItineraryInList(localItineraries, itinerary);
      await supabaseStorage.setItem(`userItineraries_${userId}`, updatedItineraries);

      return true;
    } catch (error) {
      console.error("Error saving itinerary:", error);
      return false;
    }
  }

  /**
   * Update itinerary in database and Supabase storage
   */
  async updateItinerary(itinerary: Itinerary): Promise<boolean> {
    try {
      const isAuthenticated = await supabaseStorage.isAuthenticated();
      
      if (!isAuthenticated) {
        console.warn("User not authenticated, updating in Supabase storage only");
        const userId = await supabaseStorage.getCurrentUserId();
        if (userId) {
          const localItineraries = await this.getItinerariesFromStorage(userId);
          const updatedItineraries = this.updateItineraryInList(localItineraries, itinerary);
          return await supabaseStorage.setItem(`userItineraries_${userId}`, updatedItineraries);
        }
        return false;
      }

      const userId = await supabaseStorage.getCurrentUserId();
      if (!userId) {
        console.warn("No user ID found");
        return false;
      }

      // Update in database
      const { error } = await supabase
        .from("itineraries")
        .update({
          ...itinerary,
          updated_at: new Date().toISOString(),
        })
        .eq("id", itinerary.id)
        .eq("user_id", userId);

      if (error) {
        console.error("Database error, falling back to Supabase storage:", error);
        // Fallback to Supabase storage
        const localItineraries = await this.getItinerariesFromStorage(userId);
        const updatedItineraries = this.updateItineraryInList(localItineraries, itinerary);
        return await supabaseStorage.setItem(`userItineraries_${userId}`, updatedItineraries);
      }

      // Also update in Supabase storage
      const localItineraries = await this.getItinerariesFromStorage(userId);
      const updatedItineraries = this.updateItineraryInList(localItineraries, itinerary);
      await supabaseStorage.setItem(`userItineraries_${userId}`, updatedItineraries);

      return true;
    } catch (error) {
      console.error("Error updating itinerary:", error);
      return false;
    }
  }

  /**
   * Delete itinerary from database and Supabase storage
   */
  async deleteItinerary(itineraryId: string): Promise<boolean> {
    try {
      const isAuthenticated = await supabaseStorage.isAuthenticated();
      
      if (!isAuthenticated) {
        console.warn("User not authenticated, deleting from Supabase storage only");
        const userId = await supabaseStorage.getCurrentUserId();
        if (userId) {
          const localItineraries = await this.getItinerariesFromStorage(userId);
          const updatedItineraries = localItineraries.filter((it: Itinerary) => it.id !== itineraryId);
          return await supabaseStorage.setItem(`userItineraries_${userId}`, updatedItineraries);
        }
        return false;
      }

      const userId = await supabaseStorage.getCurrentUserId();
      if (!userId) {
        console.warn("No user ID found");
        return false;
      }

      // Delete from database
      const { error } = await supabase
        .from("itineraries")
        .delete()
        .eq("id", itineraryId)
        .eq("user_id", userId);

      if (error) {
        console.error("Database error, falling back to Supabase storage:", error);
        // Fallback to Supabase storage
        const localItineraries = await this.getItinerariesFromStorage(userId);
        const updatedItineraries = localItineraries.filter((it: Itinerary) => it.id !== itineraryId);
        return await supabaseStorage.setItem(`userItineraries_${userId}`, updatedItineraries);
      }

      // Also delete from Supabase storage
      const localItineraries = await this.getItinerariesFromStorage(userId);
      const updatedItineraries = localItineraries.filter((it: Itinerary) => it.id !== itineraryId);
      await supabaseStorage.setItem(`userItineraries_${userId}`, updatedItineraries);

      return true;
    } catch (error) {
      console.error("Error deleting itinerary:", error);
      return false;
    }
  }

  /**
   * Get a specific itinerary by ID
   */
  async getItinerary(id: string): Promise<Itinerary | null> {
    try {
      const isAuthenticated = await supabaseStorage.isAuthenticated();
      
      if (!isAuthenticated) {
        console.warn("User not authenticated, getting from Supabase storage only");
        const userId = await supabaseStorage.getCurrentUserId();
        if (userId) {
          const localItineraries = await this.getItinerariesFromStorage(userId);
          return localItineraries.find((it: Itinerary) => it.id === id) || null;
        }
        return null;
      }

      const userId = await supabaseStorage.getCurrentUserId();
      if (!userId) {
        console.warn("No user ID found");
        return null;
      }

      // Try database first
      const { data: itinerary, error } = await supabase
        .from("itineraries")
        .select("*")
        .eq("id", id)
        .eq("user_id", userId)
        .single();

      if (error) {
        console.warn("Database error, trying Supabase storage:", error);
        // Try Supabase storage
        const localItineraries = await this.getItinerariesFromStorage(userId);
        return localItineraries.find((it: Itinerary) => it.id === id) || null;
      }

      return itinerary;
    } catch (error) {
      console.error("Error getting itinerary:", error);
      return null;
    }
  }

  /**
   * Get itineraries from Supabase storage
   */
  private async getItinerariesFromStorage(userId: string): Promise<Itinerary[]> {
    try {
      const storedItineraries = await supabaseStorage.getItem(`userItineraries_${userId}`);
      return storedItineraries || [];
    } catch (error) {
      console.error("Error getting itineraries from storage:", error);
      return [];
    }
  }

  /**
   * Update itinerary in a list
   */
  private updateItineraryInList(itineraries: Itinerary[], updatedItinerary: Itinerary): Itinerary[] {
    const index = itineraries.findIndex((it: Itinerary) => it.id === updatedItinerary.id);
    if (index !== -1) {
      itineraries[index] = updatedItinerary;
    } else {
      itineraries.unshift(updatedItinerary);
    }
    return itineraries;
  }
}

export const itineraryService = new ItineraryService();
