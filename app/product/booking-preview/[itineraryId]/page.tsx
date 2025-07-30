"use client";
import React from "react";
import BookingWidget from "@/components/pro/website/BookingWidget";
import { sampleItineraries } from "@/data/itineraryData";
import { notFound } from "next/navigation";

export default function BookingPreviewPage({
  params,
}: {
  params: { itineraryId: string };
}) {
  // In a real app, fetch from API or DB. Here, use sample data.
  const itinerary = sampleItineraries.find((i) => i.id === params.itineraryId);

  if (!itinerary) return notFound();

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
