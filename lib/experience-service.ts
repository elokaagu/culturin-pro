import { supabase } from "./supabase";
import { supabaseStorage } from "./supabase-storage";

export interface Experience {
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

class ExperienceService {
  /**
   * Get all experiences for the current user
   */
  async getExperiences(): Promise<Experience[]> {
    try {
      // Get user session directly
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        console.warn(
          "User not authenticated, cannot get experiences from database"
        );
        return [];
      }

      const userId = session.user.id;

      // Get from database
      const { data: experiences, error } = await supabase
        .from("experiences")
        .select("*")
        .eq("operator_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Database error:", error);
        return [];
      }

      // Transform database format to interface format
      const transformedExperiences = (experiences || []).map((item: any) => ({
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

      return transformedExperiences;
    } catch (error) {
      console.error("Error getting experiences:", error);
      return [];
    }
  }

  /**
   * Save experience to database and Supabase storage
   */
  async saveExperience(experience: Experience): Promise<boolean> {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

              if (!session?.user) {
          console.warn("User not authenticated, cannot save experience");
          return false;
        }

        const userId = session.user.id;

        // Transform frontend format to database format
        const dbExperience = {
          ...experience,
          operator_id: userId,
          updated_at: new Date().toISOString(),
          // Handle groupSize object conversion
          groupSizeMin: experience.groupSize?.min || experience.groupSizeMin || 1,
          groupSizeMax: experience.groupSize?.max || experience.groupSizeMax || 10,
          // Remove the groupSize object since it doesn't exist in database
          groupSize: undefined,
        };

        // For new records without valid UUID, use insert; for existing records, use upsert
        const isNewRecord = !experience.id || 
          experience.id.startsWith("new-") || 
          experience.id.startsWith("temp-") || 
          experience.id.startsWith("local-") ||
          experience.id.startsWith("duplicate-");

        let error;
        if (isNewRecord) {
          // Remove invalid ID for new records - let database generate UUID
          const { id, ...newRecord } = dbExperience;
          const result = await supabase.from("experiences").insert(newRecord);
          error = result.error;
        } else {
          // Update existing record
          const result = await supabase.from("experiences").upsert(dbExperience);
          error = result.error;
        }

        if (error) {
          console.error("Database error:", error);
          return false;
        }

        return true;
      } catch (error) {
        console.error("Error saving experience:", error);
        return false;
      }
  }

  /**
   * Update experience in database and Supabase storage
   */
  async updateExperience(experience: Experience): Promise<boolean> {
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
            experience
          );
          return await supabaseStorage.setItem(
            `userExperiences_${userId}`,
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
        .from("experiences")
        .update({
          ...experience,
          updated_at: new Date().toISOString(),
        })
        .eq("id", experience.id)
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
          experience
        );
        return await supabaseStorage.setItem(
          `userExperiences_${userId}`,
          updatedItineraries
        );
      }

      // Also update in Supabase storage
      const localItineraries = await this.getItinerariesFromStorage(userId);
      const updatedItineraries = this.updateItineraryInList(
        localItineraries,
        experience
      );
      await supabaseStorage.setItem(
        `userExperiences_${userId}`,
        updatedItineraries
      );

      return true;
    } catch (error) {
      console.error("Error updating experience:", error);
      return false;
    }
  }

  /**
   * Delete experience from database and Supabase storage
   */
  async deleteExperience(itineraryId: string): Promise<boolean> {
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
            (it: Experience) => it.id !== itineraryId
          );
          return await supabaseStorage.setItem(
            `userExperiences_${userId}`,
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
        .from("experiences")
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
          (it: Experience) => it.id !== itineraryId
        );
        return await supabaseStorage.setItem(
          `userExperiences_${userId}`,
          updatedItineraries
        );
      }

      // Also delete from Supabase storage
      const localItineraries = await this.getItinerariesFromStorage(userId);
      const updatedItineraries = localItineraries.filter(
        (it: Experience) => it.id !== itineraryId
      );
      await supabaseStorage.setItem(
        `userExperiences_${userId}`,
        updatedItineraries
      );

      return true;
    } catch (error) {
      console.error("Error deleting experience:", error);
      return false;
    }
  }

  /**
   * Get a specific experience by ID
   */
  async getExperience(id: string): Promise<Experience | null> {
    try {
      const isAuthenticated = await supabaseStorage.isAuthenticated();

      if (!isAuthenticated) {
        console.warn(
          "User not authenticated, getting from Supabase storage only"
        );
        const userId = await supabaseStorage.getCurrentUserId();
        if (userId) {
          const localItineraries = await this.getItinerariesFromStorage(userId);
          return localItineraries.find((it: Experience) => it.id === id) || null;
        }
        return null;
      }

      const userId = await supabaseStorage.getCurrentUserId();
      if (!userId) {
        console.warn("No user ID found");
        return null;
      }

      // Try database first
      const { data: experience, error } = await supabase
        .from("experiences")
        .select("*")
        .eq("id", id)
        .eq("user_id", userId)
        .single();

      if (error) {
        console.warn("Database error, trying Supabase storage:", error);
        // Try Supabase storage
        const localItineraries = await this.getItinerariesFromStorage(userId);
        return localItineraries.find((it: Experience) => it.id === id) || null;
      }

      return experience;
    } catch (error) {
      console.error("Error getting experience:", error);
      return null;
    }
  }

  /**
   * Get experiences from Supabase storage
   */
  private async getItinerariesFromStorage(
    userId: string
  ): Promise<Experience[]> {
    try {
      const storedItineraries = await supabaseStorage.getItem(
        `userExperiences_${userId}`
      );
      return storedItineraries || [];
    } catch (error) {
      console.error("Error getting experiences from storage:", error);
      return [];
    }
  }

  /**
   * Update experience in a list
   */
  private updateItineraryInList(
    experiences: Experience[],
    updatedItinerary: Experience
  ): Experience[] {
    const index = experiences.findIndex(
      (it: Experience) => it.id === updatedItinerary.id
    );
    if (index !== -1) {
      experiences[index] = updatedItinerary;
    } else {
      experiences.unshift(updatedItinerary);
    }
    return experiences;
  }
}

export const experienceService = new ExperienceService();
