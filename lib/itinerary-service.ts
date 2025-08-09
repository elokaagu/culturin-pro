import { supabase } from "./supabase";
import { supabaseStorage } from "./supabase-storage";

export interface Itinerary {
  id?: string;
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
  operator_id?: string;
  status?: "draft" | "published" | "archived";
  lastUpdated?: string;
  themeType?: string;
  regions?: string[];
  groupSize?: { min: number; max: number };
  groupSizeMin?: number;
  groupSizeMax?: number;
  difficulty?: string;
  tags?: string[];
}

class ItineraryService {
  /**
   * Get all itineraries for the current user
   */
  async getItineraries(): Promise<Itinerary[]> {
    try {
      // Get user session directly
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        console.warn(
          "User not authenticated, cannot get itineraries from database"
        );
        return [];
      }

      const userId = session.user.id;

      // Get from database
      const { data: itineraries, error } = await supabase
        .from("itineraries")
        .select("*")
        .eq("operator_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Database error:", error);
        return [];
      }

      // Transform database format to interface format
      const transformedItineraries = (itineraries || []).map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        days: item.days,
        price: item.price,
        currency: item.currency || "USD",
        image: item.image,
        highlights: item.highlights || [],
        activities: item.activities || [],
        accommodations: item.accommodations || [],
        transportation: item.transportation || [],
        meals: item.meals || [],
        notes: item.notes || [],
        created_at: item.created_at,
        updated_at: item.updated_at,
        operator_id: item.operator_id,
        status: item.status || "draft",
        lastUpdated: item.lastUpdated || item.last_updated || "just now",
        themeType: item.themeType || item.theme_type || "cultural",
        regions: item.regions || [],
        groupSizeMin: item.groupSizeMin || item.group_size_min || 1,
        groupSizeMax: item.groupSizeMax || item.group_size_max || 10,
        groupSize: {
          min: item.groupSizeMin || item.group_size_min || 1,
          max: item.groupSizeMax || item.group_size_max || 10,
        },
        difficulty: item.difficulty || "easy",
        tags: item.tags || [],
      }));

      return transformedItineraries;
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
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        console.warn("User not authenticated, cannot save itinerary");
        return false;
      }

      const userId = session.user.id;

      // Transform frontend format to database format
      const dbItinerary = {
        ...itinerary,
        operator_id: userId,
        updated_at: new Date().toISOString(),
        // Handle groupSize object conversion
        groupSizeMin: itinerary.groupSize?.min || itinerary.groupSizeMin || 1,
        groupSizeMax: itinerary.groupSize?.max || itinerary.groupSizeMax || 10,
        // Remove the groupSize object since it doesn't exist in database
        groupSize: undefined,
      };

      // For new records without valid UUID, use insert; for existing records, use upsert
      const isNewRecord = !itinerary.id || 
        itinerary.id.startsWith("new-") || 
        itinerary.id.startsWith("temp-") || 
        itinerary.id.startsWith("local-") ||
        itinerary.id.startsWith("duplicate-");

      let error;
      if (isNewRecord) {
        // Remove invalid ID for new records - let database generate UUID
        const { id, ...newRecord } = dbItinerary;
        const result = await supabase.from("itineraries").insert(newRecord);
        error = result.error;
      } else {
        // Update existing record
        const result = await supabase.from("itineraries").upsert(dbItinerary);
        error = result.error;
      }

      if (error) {
        console.error("Database error:", error);
        return false;
      }

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
        console.warn(
          "User not authenticated, updating in Supabase storage only"
        );
        const userId = await supabaseStorage.getCurrentUserId();
        if (userId) {
          const localItineraries = await this.getItinerariesFromStorage(userId);
          const updatedItineraries = this.updateItineraryInList(
            localItineraries,
            itinerary
          );
          return await supabaseStorage.setItem(
            `userItineraries_${userId}`,
            updatedItineraries
          );
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
        console.error(
          "Database error, falling back to Supabase storage:",
          error
        );
        // Fallback to Supabase storage
        const localItineraries = await this.getItinerariesFromStorage(userId);
        const updatedItineraries = this.updateItineraryInList(
          localItineraries,
          itinerary
        );
        return await supabaseStorage.setItem(
          `userItineraries_${userId}`,
          updatedItineraries
        );
      }

      // Also update in Supabase storage
      const localItineraries = await this.getItinerariesFromStorage(userId);
      const updatedItineraries = this.updateItineraryInList(
        localItineraries,
        itinerary
      );
      await supabaseStorage.setItem(
        `userItineraries_${userId}`,
        updatedItineraries
      );

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
        console.warn(
          "User not authenticated, deleting from Supabase storage only"
        );
        const userId = await supabaseStorage.getCurrentUserId();
        if (userId) {
          const localItineraries = await this.getItinerariesFromStorage(userId);
          const updatedItineraries = localItineraries.filter(
            (it: Itinerary) => it.id !== itineraryId
          );
          return await supabaseStorage.setItem(
            `userItineraries_${userId}`,
            updatedItineraries
          );
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
        console.error(
          "Database error, falling back to Supabase storage:",
          error
        );
        // Fallback to Supabase storage
        const localItineraries = await this.getItinerariesFromStorage(userId);
        const updatedItineraries = localItineraries.filter(
          (it: Itinerary) => it.id !== itineraryId
        );
        return await supabaseStorage.setItem(
          `userItineraries_${userId}`,
          updatedItineraries
        );
      }

      // Also delete from Supabase storage
      const localItineraries = await this.getItinerariesFromStorage(userId);
      const updatedItineraries = localItineraries.filter(
        (it: Itinerary) => it.id !== itineraryId
      );
      await supabaseStorage.setItem(
        `userItineraries_${userId}`,
        updatedItineraries
      );

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
        console.warn(
          "User not authenticated, getting from Supabase storage only"
        );
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
  private async getItinerariesFromStorage(
    userId: string
  ): Promise<Itinerary[]> {
    try {
      const storedItineraries = await supabaseStorage.getItem(
        `userItineraries_${userId}`
      );
      return storedItineraries || [];
    } catch (error) {
      console.error("Error getting itineraries from storage:", error);
      return [];
    }
  }

  /**
   * Update itinerary in a list
   */
  private updateItineraryInList(
    itineraries: Itinerary[],
    updatedItinerary: Itinerary
  ): Itinerary[] {
    const index = itineraries.findIndex(
      (it: Itinerary) => it.id === updatedItinerary.id
    );
    if (index !== -1) {
      itineraries[index] = updatedItinerary;
    } else {
      itineraries.unshift(updatedItinerary);
    }
    return itineraries;
  }
}

export const itineraryService = new ItineraryService();
