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

  const fetchItineraries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if user is authenticated
      const isAuthenticated = await supabaseStorage.isAuthenticated();
      
      if (!isAuthenticated) {
        console.warn("User not authenticated, cannot get itineraries from database");
        setItineraries([]);
        setLoading(false);
        return;
      }

      const userId = await supabaseStorage.getCurrentUserId();
      if (!userId) {
        console.warn("No user ID found");
        setItineraries([]);
        setLoading(false);
        return;
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
        setItineraries(storedItineraries || []);
        setLoading(false);
        return;
      }

      // Also save to Supabase storage as backup
      if (itineraries) {
        await supabaseStorage.setItem(`userItineraries_${userId}`, itineraries);
      }

      setItineraries(itineraries || []);
    } catch (err) {
      console.error("Error fetching itineraries:", err);
      setError("Failed to load itineraries");
      setItineraries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveItinerary = useCallback(async (itinerary: Itinerary): Promise<boolean> => {
    try {
      const isAuthenticated = await supabaseStorage.isAuthenticated();
      
      if (!isAuthenticated) {
        console.warn("User not authenticated, saving to Supabase storage only");
        const userId = await supabaseStorage.getCurrentUserId();
        if (userId) {
          const localItineraries = await supabaseStorage.getItem(`userItineraries_${userId}`) || [];
          const updatedItineraries = updateItineraryInList(localItineraries, itinerary);
          const success = await supabaseStorage.setItem(`userItineraries_${userId}`, updatedItineraries);
          if (success) {
            setItineraries(updatedItineraries);
          }
          return success;
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
        const localItineraries = await supabaseStorage.getItem(`userItineraries_${userId}`) || [];
        const updatedItineraries = updateItineraryInList(localItineraries, itinerary);
        const success = await supabaseStorage.setItem(`userItineraries_${userId}`, updatedItineraries);
        if (success) {
          setItineraries(updatedItineraries);
        }
        return success;
      }

      // Also save to Supabase storage as backup
      const localItineraries = await supabaseStorage.getItem(`userItineraries_${userId}`) || [];
      const updatedItineraries = updateItineraryInList(localItineraries, itinerary);
      await supabaseStorage.setItem(`userItineraries_${userId}`, updatedItineraries);
      setItineraries(updatedItineraries);

      return true;
    } catch (error) {
      console.error("Error saving itinerary:", error);
      return false;
    }
  }, []);

  const deleteItinerary = useCallback(async (itineraryId: string): Promise<boolean> => {
    try {
      const isAuthenticated = await supabaseStorage.isAuthenticated();
      
      if (!isAuthenticated) {
        console.warn("User not authenticated, deleting from Supabase storage only");
        const userId = await supabaseStorage.getCurrentUserId();
        if (userId) {
          const localItineraries = await supabaseStorage.getItem(`userItineraries_${userId}`) || [];
          const updatedItineraries = localItineraries.filter((it: Itinerary) => it.id !== itineraryId);
          const success = await supabaseStorage.setItem(`userItineraries_${userId}`, updatedItineraries);
          if (success) {
            setItineraries(updatedItineraries);
          }
          return success;
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
        const localItineraries = await supabaseStorage.getItem(`userItineraries_${userId}`) || [];
        const updatedItineraries = localItineraries.filter((it: Itinerary) => it.id !== itineraryId);
        const success = await supabaseStorage.setItem(`userItineraries_${userId}`, updatedItineraries);
        if (success) {
          setItineraries(updatedItineraries);
        }
        return success;
      }

      // Also delete from Supabase storage
      const localItineraries = await supabaseStorage.getItem(`userItineraries_${userId}`) || [];
      const updatedItineraries = localItineraries.filter((it: Itinerary) => it.id !== itineraryId);
      await supabaseStorage.setItem(`userItineraries_${userId}`, updatedItineraries);
      setItineraries(updatedItineraries);

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
