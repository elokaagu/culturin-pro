import { supabase } from "./supabase";
import { ItineraryType, ItineraryModule } from "@/data/itineraryData";

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
  async createItinerary(
    itinerary: Omit<ItineraryType, "id" | "lastUpdated">
  ): Promise<ItineraryType> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      throw new Error("User not authenticated");
    }

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
        operator_id: user.user.id,
        last_updated: "just now",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating itinerary:", error);
      throw new Error(`Failed to create itinerary: ${error.message}`);
    }

    // Save modules if they exist
    if (itinerary.modules && itinerary.modules.length > 0) {
      await this.saveItineraryModules(data.id, itinerary.modules);
    }

    return this.mapDatabaseToItinerary(data);
  }

  async updateItinerary(
    id: string,
    updates: Partial<ItineraryType>
  ): Promise<ItineraryType> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      throw new Error("User not authenticated");
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
      .eq("operator_id", user.user.id)
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

    // Update modules if they exist
    if (updates.modules !== undefined) {
      await this.saveItineraryModules(id, updates.modules);
    }

    return this.mapDatabaseToItinerary(data);
  }

  async getItinerary(id: string): Promise<ItineraryType | null> {
    const { data, error } = await supabase
      .from("itineraries")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null; // Not found
      }
      console.error("Error fetching itinerary:", error);
      throw new Error(`Failed to fetch itinerary: ${error.message}`);
    }

    const modules = await this.getItineraryModules(id);
    return this.mapDatabaseToItinerary(data, modules);
  }

  async getItineraries(operatorId: string): Promise<ItineraryType[]> {
    const { data, error } = await supabase
      .from("itineraries")
      .select("*")
      .eq("operator_id", operatorId)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching itineraries:", error);
      throw new Error(`Failed to fetch itineraries: ${error.message}`);
    }

    // Fetch modules for each itinerary
    const itinerariesWithModules = await Promise.all(
      data.map(async (itinerary) => {
        const modules = await this.getItineraryModules(itinerary.id);
        return this.mapDatabaseToItinerary(itinerary, modules);
      })
    );

    return itinerariesWithModules;
  }

  async deleteItinerary(id: string): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from("itineraries")
      .delete()
      .eq("id", id)
      .eq("operator_id", user.user.id);

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
