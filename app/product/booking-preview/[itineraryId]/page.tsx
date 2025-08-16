"use client";
import React, { useState, useEffect } from "react";
import BookingWidget from "@/components/pro/website/BookingWidget";
import { experienceService } from "@/lib/experience-service";
import { Experience } from "@/hooks/useExperiences";
import { notFound } from "next/navigation";

export default function BookingPreviewPage({
  params,
}: {
  params: { itineraryId: string };
}) {
  const [experience, setItinerary] = useState<Experience | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItinerary = async () => {
      try {
        setIsLoading(true);
        const dbItinerary = await experienceService.getExperience(params.itineraryId);
        
        if (dbItinerary) {
          setItinerary(dbItinerary);
        } else {
          setError("Experience not found");
        }
      } catch (error) {
        console.error("Error loading experience:", error);
        setError("Failed to load experience");
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
            <span className="ml-3 text-gray-600">Loading experience...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-culturin-indigo/10 to-white animate-fade-in p-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100 animate-fade-in overflow-hidden p-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Experience Not Found</h2>
            <p className="text-gray-600">The requested experience could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-culturin-indigo/10 to-white animate-fade-in p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100 animate-fade-in overflow-hidden">
        <BookingWidget
          tour={experience}
          primaryColor="#3B3B98"
          companyName="Culturin"
        />
      </div>
    </div>
  );
}
