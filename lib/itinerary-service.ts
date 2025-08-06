import { supabase } from "./supabase";
import { ItineraryType, ItineraryModule } from "@/data/itineraryData";
import { localStorageUtils } from "./localStorage";

export interface ItineraryService {
  // Itinerary CRUD operations
  createItinerary: (
    itinerary: Omit<ItineraryType, "id" | "lastUpdated">
  ) => Promise<ItineraryType>;
  updateItinerary: (
    id: string,
    updates: Partial<ItineraryType>
  ) => Promise<ItineraryType>;
  getItinerary: (id: string) => Promise<ItineraryType | null>;
  getItineraries: (operatorId: string) => Promise<ItineraryType[]>;
  deleteItinerary: (id: string) => Promise<void>;

  // Module operations
  saveItineraryModules: (
    itineraryId: string,
    modules: ItineraryModule[]
  ) => Promise<void>;
  getItineraryModules: (itineraryId: string) => Promise<ItineraryModule[]>;
}

class SupabaseItineraryService implements ItineraryService {
  private async getCurrentUser() {
    try {
      // First try to get the current session
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        return session.user;
      }

      // Fallback to getUser
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  async createItinerary(
    itinerary: Omit<ItineraryType, "id" | "lastUpdated">
  ): Promise<ItineraryType> {
    const user = await this.getCurrentUser();
    
    if (!user) {
      // Fallback to localStorage for non-authenticated users
      console.log("User not authenticated, saving to localStorage");
      const localItineraries = await this.getItinerariesFromLocalStorage();
      const newItinerary: ItineraryType = {
        ...itinerary,
        id: `local-${Date.now()}`,
        lastUpdated: "just now",
      };
      
      localItineraries.unshift(newItinerary);
      const userSpecificKey = "culturinItineraries"; // Generic key for non-authenticated users
      localStorageUtils.setItem(userSpecificKey, JSON.stringify(localItineraries));
      
      return newItinerary;
    }

    console.log("Creating itinerary in database for user:", user.id);

    try {
      const { data, error } = await supabase
        .from("itineraries")
        .insert({
          title: itinerary.title,
          description: itinerary.description,
          days: itinerary.days,
          status: itinerary.status,
          image: itinerary.image,
          theme_type: itinerary.themeType,
          regions: itinerary.regions,
          price: itinerary.price,
          currency: itinerary.currency || "USD",
          group_size_min: itinerary.groupSize?.min || 1,
          group_size_max: itinerary.groupSize?.max || 10,
          difficulty: itinerary.difficulty || "easy",
          tags: itinerary.tags,
          operator_id: user.id,
          last_updated: "just now",
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating itinerary in database:", error);
        throw new Error(`Failed to create itinerary: ${error.message}`);
      }

      console.log("Itinerary created successfully in database:", data.id);

      // Save modules if they exist
      if (itinerary.modules && itinerary.modules.length > 0) {
        await this.saveItineraryModules(data.id, itinerary.modules);
      }

      const createdItinerary = this.mapDatabaseToItinerary(data);
      
      // Also save to localStorage as backup
      const localItineraries = await this.getItinerariesFromLocalStorage();
      localItineraries.unshift(createdItinerary);
      const userSpecificKey = user?.id ? `culturinItineraries_${user.id}` : "culturinItineraries";
      localStorageUtils.setItem(userSpecificKey, JSON.stringify(localItineraries));

      return createdItinerary;
    } catch (error) {
      console.error("Database error, falling back to localStorage:", error);
      
      // Fallback to localStorage
      const localItineraries = await this.getItinerariesFromLocalStorage();
      const newItinerary: ItineraryType = {
        ...itinerary,
        id: `local-${Date.now()}`,
        lastUpdated: "just now",
      };
      
      localItineraries.unshift(newItinerary);
      const userSpecificKey = user?.id ? `culturinItineraries_${user.id}` : "culturinItineraries";
      localStorageUtils.setItem(userSpecificKey, JSON.stringify(localItineraries));
      
      return newItinerary;
    }
  }

  async updateItinerary(
    id: string,
    updates: Partial<ItineraryType>
  ): Promise<ItineraryType> {
    const user = await this.getCurrentUser();
    if (!user) {
      // Fallback to localStorage for non-authenticated users
      console.log("User not authenticated, updating in localStorage");
      const localItineraries = await this.getItinerariesFromLocalStorage();
      const itineraryIndex = localItineraries.findIndex(item => item.id === id);
      
      if (itineraryIndex !== -1) {
        localItineraries[itineraryIndex] = {
          ...localItineraries[itineraryIndex],
          ...updates,
          lastUpdated: "just now",
        };
        
        const userSpecificKey = "culturinItineraries"; // Generic key for non-authenticated users
        localStorageUtils.setItem(userSpecificKey, JSON.stringify(localItineraries));
        
        return localItineraries[itineraryIndex];
      }
      
      throw new Error("Itinerary not found");
    }

    const updateData: any = {
      last_updated: "just now",
    };

    // Map ItineraryType fields to database fields
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.description !== undefined)
      updateData.description = updates.description;
    if (updates.days !== undefined) updateData.days = updates.days;
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.image !== undefined) updateData.image = updates.image;
    if (updates.themeType !== undefined)
      updateData.theme_type = updates.themeType;
    if (updates.regions !== undefined) updateData.regions = updates.regions;
    if (updates.price !== undefined) updateData.price = updates.price;
    if (updates.currency !== undefined) updateData.currency = updates.currency;
    if (updates.groupSize !== undefined) {
      updateData.group_size_min = updates.groupSize.min;
      updateData.group_size_max = updates.groupSize.max;
    }
    if (updates.difficulty !== undefined)
      updateData.difficulty = updates.difficulty;
    if (updates.tags !== undefined) updateData.tags = updates.tags;

    console.log("Updating itinerary with data:", updateData);
    
    const { data, error } = await supabase
      .from("itineraries")
      .update(updateData)
      .eq("id", id)
      .eq("operator_id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating itinerary:", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      throw new Error(`Failed to update itinerary: ${error.message}`);
    }

    return this.mapDatabaseToItinerary(data);
  }

  async getItinerary(id: string): Promise<ItineraryType | null> {
    // If it's a local itinerary (starts with 'local-'), check localStorage first
    if (id.startsWith('local-')) {
      console.log("Looking for local itinerary in localStorage:", id);
      const localItineraries = await this.getItinerariesFromLocalStorage();
      const localItinerary = localItineraries.find(it => it.id === id);
      if (localItinerary) {
        console.log("Found local itinerary:", localItinerary.title);
        return localItinerary;
      }
      console.log("Local itinerary not found in localStorage");
      return null;
    }

    // Otherwise, try to get from database
    try {
      const { data, error } = await supabase
        .from("itineraries")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          console.log("Itinerary not found in database:", id);
          return null; // Not found
        }
        console.error("Error fetching itinerary:", error);
        throw new Error(`Failed to fetch itinerary: ${error.message}`);
      }

      const modules = await this.getItineraryModules(id);
      const itinerary = this.mapDatabaseToItinerary(data, modules);
      console.log("Found itinerary in database:", itinerary.title);
      return itinerary;
    } catch (error) {
      console.error("Error fetching itinerary from database:", error);
      return null;
    }
  }

  async getItineraries(operatorId: string): Promise<ItineraryType[]> {
    try {
      const user = await this.getCurrentUser();
      
      if (!user) {
        // User not authenticated, return localStorage data
        console.log("User not authenticated, returning localStorage itineraries");
        return await this.getItinerariesFromLocalStorage();
      }

      console.log("Loading itineraries from database for user:", user.id);

      // First try to get from Supabase
      const { data, error } = await supabase
        .from("itineraries")
        .select("*")
        .eq("operator_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Error fetching itineraries from Supabase:", error);
        // Fall back to localStorage
        return await this.getItinerariesFromLocalStorage();
      }

      if (data && data.length > 0) {
        console.log(`Found ${data.length} itineraries in database`);
        
        // Fetch modules for each itinerary
        const itinerariesWithModules = await Promise.all(
          data.map(async (itinerary) => {
            const modules = await this.getItineraryModules(itinerary.id);
            return this.mapDatabaseToItinerary(itinerary, modules);
          })
        );

        // Also update localStorage with database data
        const userSpecificKey = user?.id ? `culturinItineraries_${user.id}` : "culturinItineraries";
        localStorageUtils.setItem(userSpecificKey, JSON.stringify(itinerariesWithModules));

        return itinerariesWithModules;
      } else {
        console.log("No itineraries found in database, checking localStorage");
        // No itineraries in Supabase, try localStorage
        const localItineraries = await this.getItinerariesFromLocalStorage();
        
        // If we have local itineraries, try to save them to database
        if (localItineraries.length > 0) {
          console.log("Found local itineraries, attempting to sync to database");
          try {
            await this.syncLocalItinerariesToDatabase(localItineraries, user.id);
          } catch (syncError) {
            console.error("Failed to sync local itineraries to database:", syncError);
          }
        }
        
        return localItineraries;
      }
    } catch (error) {
      console.error("Error fetching itineraries:", error);
      // Fall back to localStorage
      return await this.getItinerariesFromLocalStorage();
    }
  }

  private async getItinerariesFromLocalStorage(): Promise<ItineraryType[]> {
    try {
      const user = await this.getCurrentUser();
      const userSpecificKey = user?.id ? `culturinItineraries_${user.id}` : "culturinItineraries";
      
      const itinerariesStr = localStorageUtils.getItem(userSpecificKey);
      if (!itinerariesStr) {
        console.log(`No itineraries found in localStorage with key: ${userSpecificKey}`);
        return [];
      }

      const itineraries = JSON.parse(itinerariesStr);
      console.log(`Loaded ${itineraries.length} itineraries from localStorage with key: ${userSpecificKey}`);
      
      // Convert localStorage format to ItineraryType format
      return itineraries.map((itinerary: any) => ({
        id: itinerary.id || `local-${Date.now()}-${Math.random()}`,
        title: itinerary.title || 'Untitled Itinerary',
        description: itinerary.description || '',
        days: itinerary.days || 1,
        lastUpdated: itinerary.lastUpdated || 'just now',
        status: itinerary.status || 'draft',
        image: itinerary.image || '',
        themeType: itinerary.themeType || 'cultural',
        regions: itinerary.regions || [],
        price: itinerary.price || 0,
        currency: itinerary.currency || 'USD',
        groupSize: itinerary.groupSize || { min: 1, max: 10 },
        difficulty: itinerary.difficulty || 'easy',
        tags: itinerary.tags || [],
        modules: itinerary.modules || [],
      }));
    } catch (error) {
      console.error("Error loading itineraries from localStorage:", error);
      return [];
    }
  }

  private async syncLocalItinerariesToDatabase(localItineraries: ItineraryType[], userId: string): Promise<void> {
    console.log("Syncing local itineraries to database...");
    
    for (const itinerary of localItineraries) {
      // Skip if it's already a database itinerary
      if (!itinerary.id.startsWith('local-')) {
        continue;
      }

      try {
        const { data, error } = await supabase
          .from("itineraries")
          .insert({
            title: itinerary.title,
            description: itinerary.description,
            days: itinerary.days,
            status: itinerary.status,
            image: itinerary.image,
            theme_type: itinerary.themeType,
            regions: itinerary.regions,
            price: itinerary.price,
            currency: itinerary.currency || "USD",
            group_size_min: itinerary.groupSize?.min || 1,
            group_size_max: itinerary.groupSize?.max || 10,
            difficulty: itinerary.difficulty || "easy",
            tags: itinerary.tags,
            operator_id: userId,
            last_updated: "just now",
          })
          .select()
          .single();

        if (error) {
          console.error("Error syncing itinerary to database:", error);
          continue;
        }

        console.log("Successfully synced itinerary to database:", data.id);

        // Save modules if they exist
        if (itinerary.modules && itinerary.modules.length > 0) {
          await this.saveItineraryModules(data.id, itinerary.modules);
        }
      } catch (error) {
        console.error("Error syncing itinerary to database:", error);
      }
    }
  }

  async deleteItinerary(id: string): Promise<void> {
    const user = await this.getCurrentUser();
    if (!user) {
      // Fallback to localStorage for non-authenticated users
      console.log("User not authenticated, deleting from localStorage");
      const localItineraries = await this.getItinerariesFromLocalStorage();
      const initialLength = localItineraries.length;
      const updatedItineraries = localItineraries.filter(item => item.id !== id);
      
      if (updatedItineraries.length === initialLength) {
        throw new Error("Itinerary not found");
      }
      
      const userSpecificKey = "culturinItineraries"; // Generic key for non-authenticated users
      localStorageUtils.setItem(userSpecificKey, JSON.stringify(updatedItineraries));
      return;
    }

    const { error } = await supabase
      .from("itineraries")
      .delete()
      .eq("id", id)
      .eq("operator_id", user.id);

    if (error) {
      console.error("Error deleting itinerary:", error);
      throw new Error(`Failed to delete itinerary: ${error.message}`);
    }
  }

  async saveItineraryModules(
    itineraryId: string,
    modules: ItineraryModule[]
  ): Promise<void> {
    // First, delete existing modules
    const { error: deleteError } = await supabase
      .from("itinerary_modules")
      .delete()
      .eq("itinerary_id", itineraryId);

    if (deleteError) {
      console.error("Error deleting existing modules:", deleteError);
      throw new Error(
        `Failed to delete existing modules: ${deleteError.message}`
      );
    }

    // Then insert new modules
    if (modules.length > 0) {
      const moduleData = modules.map((module) => ({
        itinerary_id: itineraryId,
        day: module.day,
        type: module.type,
        title: module.title,
        description: module.description,
        time: module.time,
        duration: module.duration,
        location: module.location,
        price: module.price,
        notes: module.notes,
        images: module.images,
        position: module.position || 0,
        properties: module.properties,
        coordinates: module.coordinates,
      }));

      const { error: insertError } = await supabase
        .from("itinerary_modules")
        .insert(moduleData);

      if (insertError) {
        console.error("Error inserting modules:", insertError);
        throw new Error(`Failed to insert modules: ${insertError.message}`);
      }
    }
  }

  async getItineraryModules(itineraryId: string): Promise<ItineraryModule[]> {
    const { data, error } = await supabase
      .from("itinerary_modules")
      .select("*")
      .eq("itinerary_id", itineraryId)
      .order("day", { ascending: true })
      .order("position", { ascending: true });

    if (error) {
      console.error("Error fetching modules:", error);
      throw new Error(`Failed to fetch modules: ${error.message}`);
    }

    return data.map((module) => ({
      id: module.id,
      day: module.day,
      type: module.type,
      title: module.title,
      description: module.description,
      time: module.time,
      duration: module.duration,
      location: module.location,
      price: module.price,
      notes: module.notes,
      images: module.images,
      position: module.position,
      properties: module.properties,
      coordinates: module.coordinates,
    }));
  }

  private mapDatabaseToItinerary(
    dbItinerary: any,
    modules: ItineraryModule[] = []
  ): ItineraryType {
    return {
      id: dbItinerary.id,
      title: dbItinerary.title,
      description: dbItinerary.description,
      days: dbItinerary.days,
      lastUpdated: dbItinerary.last_updated,
      status: dbItinerary.status,
      image: dbItinerary.image,
      themeType: dbItinerary.theme_type,
      regions: dbItinerary.regions || [],
      price: dbItinerary.price,
      currency: dbItinerary.currency,
      groupSize: {
        min: dbItinerary.group_size_min,
        max: dbItinerary.group_size_max,
      },
      difficulty: dbItinerary.difficulty,
      tags: dbItinerary.tags || [],
      modules: modules,
    };
  }
}

// Export singleton instance
export const itineraryService = new SupabaseItineraryService();
