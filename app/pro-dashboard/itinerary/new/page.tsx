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

  const handleItinerarySave = (savedItinerary: ItineraryType) => {
    // The savedItinerary now contains the actual database record with proper ID
    toast({
      title: "Itinerary Created!",
      description: `"${savedItinerary.title}" has been created successfully.`,
    });
    
    // Set a flag to indicate we're returning from creating a new itinerary
    sessionStorage.setItem('returningFromCreate', 'true');
    
    // Navigate back to the itinerary list
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
