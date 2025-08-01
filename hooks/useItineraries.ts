import { useState, useEffect, useCallback, useRef } from "react";
import { ItineraryType } from "@/data/itineraryData";
import { itineraryService } from "@/lib/itinerary-service";
import { useAuth } from "@/components/auth/AuthProvider";

export const useItineraries = () => {
  const [itineraries, setItineraries] = useState<ItineraryType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const isCreatingRef = useRef(false);

  // Load itineraries
  const loadItineraries = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await itineraryService.getItineraries(user.id);
      setItineraries(data);
    } catch (err) {
      console.error("Error loading itineraries:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load itineraries"
      );
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Load itineraries on mount and when user changes
  useEffect(() => {
    loadItineraries();
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
        setItineraries((prev) => [newItinerary, ...prev]);
        return newItinerary;
      } catch (err) {
        console.error("Error creating itinerary:", err);
        throw err;
      } finally {
        isCreatingRef.current = false;
      }
    },
    []
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
