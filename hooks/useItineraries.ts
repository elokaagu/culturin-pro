import { useState, useEffect, useCallback, useRef } from "react";
import { ItineraryType } from "@/data/itineraryData";
import { itineraryService } from "@/lib/itinerary-service";
import { useAuth } from "@/src/components/auth/AuthProvider";
import { localStorageUtils } from "@/lib/localStorage";
import { useToast } from "@/components/ui/use-toast";

export const useItineraries = () => {
  const [itineraries, setItineraries] = useState<ItineraryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const isCreatingRef = useRef(false);

  // Load itineraries from localStorage as fallback
  const loadItinerariesFromLocalStorage = useCallback(() => {
    try {
      // Use user-specific key if user is available, otherwise use generic key
      const userSpecificKey = user?.id
        ? `culturinItineraries_${user.id}`
        : "culturinItineraries";
      let itinerariesStr = localStorageUtils.getItem(userSpecificKey);

      // If no user-specific data found, try the generic key as fallback
      if (!itinerariesStr && user?.id) {
        itinerariesStr = localStorageUtils.getItem("culturinItineraries");
        if (itinerariesStr) {
          // Migrate to user-specific key
          localStorageUtils.setItem(userSpecificKey, itinerariesStr);
        }
      }

      if (!itinerariesStr) {
        return [];
      }

      const itineraries = JSON.parse(itinerariesStr);

      // Convert localStorage format to ItineraryType format
      return itineraries.map((itinerary: any) => ({
        id: itinerary.id || `local-${Date.now()}-${Math.random()}`,
        title: itinerary.title || "Untitled Itinerary",
        description: itinerary.description || "",
        days: itinerary.days || 1,
        lastUpdated: itinerary.lastUpdated || "just now",
        status: itinerary.status || "draft",
        image: itinerary.image || "",
        themeType: itinerary.themeType || "cultural",
        regions: itinerary.regions || [],
        price: itinerary.price || 0,
        currency: itinerary.currency || "USD",
        groupSize: itinerary.groupSize || { min: 1, max: 10 },
        difficulty: itinerary.difficulty || "easy",
        tags: itinerary.tags || [],
        modules: itinerary.modules || [],
      }));
    } catch (error) {
      console.error("Error loading itineraries from localStorage:", error);
      return [];
    }
  }, [user]);

  // Load itineraries
  const loadItineraries = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      let data: ItineraryType[] = [];

      // Try to load from Supabase if user is available
      if (user) {
        try {
          data = await itineraryService.getItineraries(user.id);
        } catch (err) {
          console.error("Error loading from database, falling back to localStorage:", err);
          data = loadItinerariesFromLocalStorage();
        }
      } else {
        // No user, load from localStorage
        data = loadItinerariesFromLocalStorage();
      }
      setItineraries(data);
    } catch (err) {
      console.error("Error loading itineraries:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load itineraries"
      );
      // Even if there's an error, try localStorage as last resort
      const localData = loadItinerariesFromLocalStorage();
      setItineraries(localData);
    } finally {
      setIsLoading(false);
    }
  }, [user, loadItinerariesFromLocalStorage]);

  // Load itineraries on mount and when user changes
  useEffect(() => {
    loadItineraries();
  }, [loadItineraries]);

  // Listen for authentication events
  useEffect(() => {
    const handleUserAuthenticated = () => {
      // Reload itineraries when user authenticates
      loadItineraries();
    };

    const handleUserLoggedOut = () => {
      // Clear itineraries when user logs out
      setItineraries([]);
      setError(null);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("userAuthenticated", handleUserAuthenticated);
      window.addEventListener("userLoggedOut", handleUserLoggedOut);

      return () => {
        window.removeEventListener("userAuthenticated", handleUserAuthenticated);
        window.removeEventListener("userLoggedOut", handleUserLoggedOut);
      };
    }
  }, [loadItineraries]);

  // Create new itinerary
  const createItinerary = useCallback(
    async (itineraryData: Omit<ItineraryType, "id" | "lastUpdated">) => {
      // Prevent duplicate calls
      if (isCreatingRef.current) {
        console.log("Create itinerary already in progress, skipping...");
        return;
      }

      try {
        isCreatingRef.current = true;
        console.log("Creating itinerary:", itineraryData.title);

        const newItinerary = await itineraryService.createItinerary(
          itineraryData
        );

        console.log("Itinerary created successfully:", newItinerary.id);

        // Update the local state with the new itinerary
        setItineraries((prev) => [newItinerary, ...prev]);

        // Also update localStorage with the new itinerary
        const currentItineraries = itineraries;
        const updatedItineraries = [newItinerary, ...currentItineraries];
        const userSpecificKey = user?.id
          ? `culturinItineraries_${user.id}`
          : "culturinItineraries";
        localStorageUtils.setItem(
          userSpecificKey,
          JSON.stringify(updatedItineraries)
        );

        return newItinerary;
      } catch (err) {
        console.error("Error creating itinerary:", err);
        throw err;
      } finally {
        isCreatingRef.current = false;
      }
    },
    [itineraries]
  );

  // Update existing itinerary
  const updateItinerary = useCallback(
    async (id: string, updates: Partial<ItineraryType>) => {
      try {
        const updatedItinerary = await itineraryService.updateItinerary(
          id,
          updates
        );
        setItineraries((prev) =>
          prev.map((item) => (item.id === id ? updatedItinerary : item))
        );
        return updatedItinerary;
      } catch (err) {
        console.error("Error updating itinerary:", err);
        throw err;
      }
    },
    []
  );

  // Delete itinerary
  const deleteItinerary = useCallback(async (id: string) => {
    try {
      await itineraryService.deleteItinerary(id);
      setItineraries((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting itinerary:", err);
      throw err;
    }
  }, []);

  // Get single itinerary
  const getItinerary = useCallback(async (id: string) => {
    try {
      return await itineraryService.getItinerary(id);
    } catch (err) {
      console.error("Error getting itinerary:", err);
      throw err;
    }
  }, []);

  // Refresh itineraries
  const refreshItineraries = useCallback(() => {
    loadItineraries();
  }, [loadItineraries]);

  return {
    itineraries,
    isLoading,
    error,
    createItinerary,
    updateItinerary,
    deleteItinerary,
    getItinerary,
    refreshItineraries,
  };
};
