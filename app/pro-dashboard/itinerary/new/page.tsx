"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProDashboardLayout from "@/components/pro/ProDashboardLayout";
import ItineraryEditor from "@/components/pro/itinerary/ItineraryEditor";
import { ItineraryType } from "@/data/itineraryData";
import { useToast } from "@/components/ui/use-toast";

export default function CreateItineraryPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  // Create a new itinerary with default values
  const newItinerary: ItineraryType = {
    id: `new-${Date.now()}`,
    title: "New Itinerary",
    days: 3,
    lastUpdated: "just now",
    status: "draft" as const,
    image: "/lovable-uploads/38b3d0e5-8ce3-41eb-bc8f-7dd21ee77dc2.png",
    themeType: "general",
    description: "Start building your cultural experience itinerary",
    regions: [],
  };

  const handleEditorClose = () => {
    router.push("/pro-dashboard/itinerary");
  };

  const handleItinerarySave = (updatedItinerary: ItineraryType) => {
    // Here you would typically save to your backend
    toast({
      title: "Itinerary Created!",
      description: `"${updatedItinerary.title}" has been created successfully.`,
    });
    router.push("/pro-dashboard/itinerary");
  };

  return (
    <ProDashboardLayout
      title="Create New Itinerary"
      subtitle="Build your cultural experience from scratch"
    >
      <div className="px-4 sm:px-0">
        <ItineraryEditor
          showEditor={true}
          selectedItinerary={newItinerary}
          showAIAssistant={showAIAssistant}
          onAIAssistantClose={() => setShowAIAssistant(false)}
          onEditorClose={handleEditorClose}
          onItinerarySave={handleItinerarySave}
        />
      </div>
    </ProDashboardLayout>
  );
}
