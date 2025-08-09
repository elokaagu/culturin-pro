import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { supabaseStorage } from "@/lib/supabase-storage";

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

export const useItineraries = () => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const fetchItineraries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user session directly
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        console.warn("User not authenticated, cannot get itineraries from database");
        setItineraries([]);
        setLoading(false);
        setAuthChecked(true);
        return;
      }

      const userId = session.user.id;
      setAuthChecked(true);

      // Try to get from database first
      const { data: itineraries, error } = await supabase
        .from("itineraries")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Database error:", error);
        setError("Failed to load itineraries from database");
        setItineraries([]);
        setLoading(false);
        return;
      }

      setItineraries(itineraries || []);
    } catch (err) {
      console.error("Error fetching itineraries:", err);
      setError("Failed to load itineraries");
      setItineraries([]);
    } finally {
      setLoading(false);
    }
  }, [authChecked]);

  const saveItinerary = useCallback(async (itinerary: Itinerary): Promise<boolean> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        console.warn("User not authenticated, cannot save itinerary");
        return false;
      }

      const userId = session.user.id;

      // Save to database
      const { error } = await supabase
        .from("itineraries")
        .upsert({
          ...itinerary,
          user_id: userId,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error("Database error:", error);
        return false;
      }

      // Update local state
      setItineraries(current => updateItineraryInList([...current], itinerary));

      return true;
    } catch (error) {
      console.error("Error saving itinerary:", error);
      return false;
    }
  }, []);

  const deleteItinerary = useCallback(async (itineraryId: string): Promise<boolean> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        console.warn("User not authenticated, cannot delete itinerary");
        return false;
      }

      const userId = session.user.id;

      // Delete from database
      const { error } = await supabase
        .from("itineraries")
        .delete()
        .eq("id", itineraryId)
        .eq("user_id", userId);

      if (error) {
        console.error("Database error:", error);
        return false;
      }

      // Update local state
      setItineraries(current => current.filter(it => it.id !== itineraryId));

      return true;
    } catch (error) {
      console.error("Error deleting itinerary:", error);
      return false;
    }
  }, []);

  // Helper function to update itinerary in a list
  const updateItineraryInList = (itineraries: Itinerary[], updatedItinerary: Itinerary): Itinerary[] => {
    const index = itineraries.findIndex((it: Itinerary) => it.id === updatedItinerary.id);
    if (index !== -1) {
      itineraries[index] = updatedItinerary;
    } else {
      itineraries.unshift(updatedItinerary);
    }
    return itineraries;
  };

  useEffect(() => {
    fetchItineraries();
  }, [fetchItineraries]);

  return {
    itineraries,
    loading,
    error,
    saveItinerary,
    deleteItinerary,
    refreshItineraries: fetchItineraries,
  };
};
