import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { supabaseStorage } from "@/lib/supabase-storage";

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
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        console.warn(
          "User not authenticated, cannot get itineraries from database"
        );
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
        .eq("operator_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Database error:", error);
        console.log("🔄 Trying localStorage fallback for itineraries");
        
        // Try localStorage fallback
        try {
          const localData = localStorage.getItem(`userItineraries_${userId}`);
          if (localData) {
            const parsed = JSON.parse(localData);
            if (Array.isArray(parsed) && parsed.length > 0) {
              console.log(`✅ Found ${parsed.length} itineraries in localStorage fallback`);
              setItineraries(parsed);
              setLoading(false);
              return;
            }
          }
        } catch (localError) {
          console.error("LocalStorage fallback failed:", localError);
        }
        
        setError("Failed to load itineraries from database");
        setItineraries([]);
        setLoading(false);
        return;
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
      }));

      console.log(`✅ Successfully loaded ${transformedItineraries.length} itineraries from database`);
      setItineraries(transformedItineraries);
      
      // Save to localStorage for future fallback
      try {
        localStorage.setItem(`userItineraries_${userId}`, JSON.stringify(transformedItineraries));
      } catch (localError) {
        console.warn("Failed to save itineraries to localStorage:", localError);
      }
    } catch (err) {
      console.error("Error fetching itineraries:", err);
      setError("Failed to load itineraries");
      setItineraries([]);
    } finally {
      setLoading(false);
    }
  }, []); // Remove authChecked dependency to prevent loops

  const saveItinerary = useCallback(
    async (itinerary: Itinerary): Promise<boolean> => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          console.warn("User not authenticated, cannot save itinerary");
          return false;
        }

        const userId = session.user.id;

        // Save to database
        const { error } = await supabase.from("itineraries").upsert({
          ...itinerary,
          operator_id: userId,
          updated_at: new Date().toISOString(),
        });

        if (error) {
          console.error("Database error:", error);
          return false;
        }

        // Update local state
        setItineraries((current) =>
          updateItineraryInList([...current], itinerary)
        );

        return true;
      } catch (error) {
        console.error("Error saving itinerary:", error);
        return false;
      }
    },
    []
  );

  const deleteItinerary = useCallback(
    async (itineraryId: string): Promise<boolean> => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

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
          .eq("operator_id", userId);

        if (error) {
          console.error("Database error:", error);
          return false;
        }

        // Update local state
        setItineraries((current) =>
          current.filter((it) => it.id !== itineraryId)
        );

        return true;
      } catch (error) {
        console.error("Error deleting itinerary:", error);
        return false;
      }
    },
    []
  );

  // Helper function to update itinerary in a list
  const updateItineraryInList = (
    itineraries: Itinerary[],
    updatedItinerary: Itinerary
  ): Itinerary[] => {
    const index = itineraries.findIndex(
      (it: Itinerary) => it.id === updatedItinerary.id
    );
    if (index !== -1) {
      itineraries[index] = updatedItinerary;
    } else {
      itineraries.unshift(updatedItinerary);
    }
    return itineraries;
  };

  useEffect(() => {
    let isMounted = true;
    
    const loadItineraries = async () => {
      try {
        if (isMounted) {
          setLoading(true);
          setError(null);
        }
        
        await fetchItineraries();
        
        if (isMounted) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error in loadItineraries effect:", error);
        if (isMounted) {
          setError("Failed to load itineraries");
          setLoading(false);
        }
      }
    };

    loadItineraries();
    
    // Fallback timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        console.warn("Itineraries fetch timeout - setting loading to false");
        setLoading(false);
        setError("Loading timeout - please refresh the page");
      }
    }, 15000); // Increased to 15 seconds for better reliability
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
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
