import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { supabaseStorage } from "@/lib/supabase-storage";

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

export const useExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const fetchExperiences = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user session directly
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        console.warn(
          "User not authenticated, cannot get experiences from database"
        );
        setExperiences([]);
        setLoading(false);
        setAuthChecked(true);
        return;
      }

      const userId = session.user.id;
      setAuthChecked(true);

      // Try to get from database first
      const { data: experiences, error } = await supabase
        .from("experiences")
        .select("*")
        .eq("operator_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Database error:", error);
        console.log("🔄 Trying localStorage fallback for experiences");
        
        // Try localStorage fallback
        try {
          const localData = localStorage.getItem(`userExperiences_${userId}`);
          if (localData) {
            const parsed = JSON.parse(localData);
            if (Array.isArray(parsed) && parsed.length > 0) {
              console.log(`✅ Found ${parsed.length} experiences in localStorage fallback`);
              setExperiences(parsed);
              setLoading(false);
              return;
            }
          }
        } catch (localError) {
          console.error("LocalStorage fallback failed:", localError);
        }
        
        setError("Failed to load experiences from database");
        setExperiences([]);
        setLoading(false);
        return;
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
      }));

      console.log(`✅ Successfully loaded ${transformedExperiences.length} experiences from database`);
      setExperiences(transformedExperiences);
      
      // Save to localStorage for future fallback
      try {
        localStorage.setItem(`userExperiences_${userId}`, JSON.stringify(transformedExperiences));
      } catch (localError) {
        console.warn("Failed to save experiences to localStorage:", localError);
      }
    } catch (err) {
      console.error("Error fetching experiences:", err);
      setError("Failed to load experiences");
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  }, []); // Remove authChecked dependency to prevent loops

  const saveExperience = useCallback(
    async (experience: Experience): Promise<boolean> => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          console.warn("User not authenticated, cannot save experience");
          return false;
        }

        const userId = session.user.id;

        // Save to database
        const { error } = await supabase.from("experiences").upsert({
          ...experience,
          operator_id: userId,
          updated_at: new Date().toISOString(),
        });

        if (error) {
          console.error("Database error:", error);
          return false;
        }

        // Update local state
        setExperiences((current) =>
          updateExperienceInList([...current], experience)
        );

        return true;
      } catch (error) {
        console.error("Error saving experience:", error);
        return false;
      }
    },
    []
  );

  const deleteExperience = useCallback(
    async (experienceId: string): Promise<boolean> => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) {
          console.warn("User not authenticated, cannot delete experience");
          return false;
        }

        const userId = session.user.id;

        // Delete from database
        const { error } = await supabase
          .from("experiences")
          .delete()
          .eq("id", experienceId)
          .eq("operator_id", userId);

        if (error) {
          console.error("Database error:", error);
          return false;
        }

        // Update local state
        setExperiences((current) =>
          current.filter((exp) => exp.id !== experienceId)
        );

        return true;
      } catch (error) {
        console.error("Error deleting experience:", error);
        return false;
      }
    },
    []
  );

  // Helper function to update experience in a list
  const updateExperienceInList = (
    experiences: Experience[],
    updatedExperience: Experience
  ): Experience[] => {
    const index = experiences.findIndex(
      (exp: Experience) => exp.id === updatedExperience.id
    );
    if (index !== -1) {
      experiences[index] = updatedExperience;
    } else {
      experiences.unshift(updatedExperience);
    }
    return experiences;
  };

  useEffect(() => {
    let isMounted = true;
    
    const loadItineraries = async () => {
      try {
        if (isMounted) {
          setLoading(true);
          setError(null);
        }
        
        await fetchExperiences();
        
        if (isMounted) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error in loadItineraries effect:", error);
        if (isMounted) {
          setError("Failed to load experiences");
          setLoading(false);
        }
      }
    };

    loadItineraries();
    
    // Fallback timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        console.warn("Experiences fetch timeout - setting loading to false");
        setLoading(false);
        setError("Loading timeout - please refresh the page");
      }
    }, 15000); // Increased to 15 seconds for better reliability
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [fetchExperiences]);

  return {
    experiences,
    loading,
    error,
    saveExperience,
    deleteExperience,
    refreshExperiences: fetchExperiences,
  };
};
