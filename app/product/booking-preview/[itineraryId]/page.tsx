"use client";
import React, { useState, useEffect } from "react";
import BookingWidget from "@/components/pro/website/BookingWidget";
import { itineraryService } from "@/lib/itinerary-service";
import { ItineraryType } from "@/data/itineraryData";
import { notFound } from "next/navigation";

export default function BookingPreviewPage({
  params,
}: {
  params: { itineraryId: string };
}) {
  const [itinerary, setItinerary] = useState<ItineraryType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItinerary = async () => {
      try {
        setIsLoading(true);
        const dbItinerary = await itineraryService.getItinerary(params.itineraryId);
        
        if (dbItinerary) {
          setItinerary(dbItinerary);
        } else {
          setError("Itinerary not found");
        }
      } catch (error) {
        console.error("Error loading itinerary:", error);
        setError("Failed to load itinerary");
      } finally {
        setIsLoading(false);
      }
    };

    loadItinerary();
  }, [params.itineraryId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-culturin-indigo/10 to-white animate-fade-in p-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100 animate-fade-in overflow-hidden p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading itinerary...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !itinerary) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-culturin-indigo/10 to-white animate-fade-in p-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100 animate-fade-in overflow-hidden p-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Itinerary Not Found</h2>
            <p className="text-gray-600">The requested itinerary could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-culturin-indigo/10 to-white animate-fade-in p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100 animate-fade-in overflow-hidden">
        <BookingWidget
          tour={itinerary}
          primaryColor="#3B3B98"
          companyName="Culturin"
        />
      </div>
    </div>
  );
}
