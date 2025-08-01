"use client";

import React, { useState } from "react";
import { useNavigate } from "../../lib/navigation";
import ProDashboardLayout from "@/components/pro/ProDashboardLayout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ItineraryTabs from "@/components/pro/itinerary/ItineraryTabs";
import ItineraryEditor from "@/components/pro/itinerary/ItineraryEditor";
import { sampleTemplates, ItineraryType } from "@/data/itineraryData";
import { useToast } from "@/components/ui/use-toast";
import { useItineraries } from "@/hooks/useItineraries";

const ProItineraryPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("itineraries");
  const [selectedItinerary, setSelectedItinerary] =
    useState<ItineraryType | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isSavingInProgress, setIsSavingInProgress] = useState(false);
  const { toast } = useToast();
  const {
    itineraries,
    isLoading,
    error,
    createItinerary,
    updateItinerary,
    deleteItinerary,
  } = useItineraries();

  const handleCreateNewItinerary = () => {
    // Navigate to the dedicated new itinerary page
    navigate("/pro-dashboard/itinerary/new");
  };

  const handleEditItinerary = (itinerary: ItineraryType) => {
    setSelectedItinerary(itinerary);
    setShowEditor(true);
  };

  const handleEditorClose = () => {
    setShowEditor(false);
    setSelectedItinerary(null);
  };

  const handleItinerarySave = async (updatedItinerary: ItineraryType) => {
    // Prevent duplicate saves
    if (isSavingInProgress) {
      console.log("Save already in progress, skipping...");
      return;
    }

    setIsSavingInProgress(true);
    console.log("Saving itinerary:", updatedItinerary.title);

    try {
      if (
        updatedItinerary.id.startsWith("temp-") ||
        updatedItinerary.id.startsWith("new-") ||
        updatedItinerary.id.startsWith("duplicate-")
      ) {
        // Create new itinerary
        const { id, lastUpdated, ...itineraryData } = updatedItinerary;
        console.log("Creating new itinerary...");
        await createItinerary(itineraryData);
        toast({
          title: "Itinerary Created",
          description: "Your new itinerary has been created successfully.",
        });
      } else {
        // Update existing itinerary
        console.log("Updating existing itinerary...");
        await updateItinerary(updatedItinerary.id, updatedItinerary);
        toast({
          title: "Itinerary Updated",
          description: "Your itinerary has been updated successfully.",
        });
      }
    } catch (error) {
      console.error("Error saving itinerary:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save itinerary",
        variant: "destructive",
      });
    } finally {
      setIsSavingInProgress(false);
    }
  };

  const handleDeleteItinerary = async (id: string) => {
    try {
      await deleteItinerary(id);
      toast({
        title: "Itinerary Deleted",
        description: "The itinerary has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting itinerary:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete itinerary",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <ProDashboardLayout
        title="Itinerary Builder"
        subtitle="Create and manage your experience itineraries"
      >
        <div className="px-4 sm:px-0">
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Error Loading Itineraries
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-culturin-indigo text-white px-4 py-2 rounded-lg hover:bg-culturin-indigo/90"
            >
              Try Again
            </button>
          </div>
        </div>
      </ProDashboardLayout>
    );
  }

  return (
    <ProDashboardLayout
      title="Itinerary Builder"
      subtitle="Create and manage your experience itineraries"
    >
      <div className="px-4 sm:px-0">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <ItineraryTabs
            activeTab={activeTab}
            itineraries={itineraries}
            isLoading={isLoading}
            onCreateNewItinerary={handleCreateNewItinerary}
            onEditItinerary={handleEditItinerary}
            onDeleteItinerary={handleDeleteItinerary}
          />
        </Tabs>
      </div>

      {showEditor && selectedItinerary && (
        <div className="mx-4 sm:mx-0">
          <ItineraryEditor
            showEditor={showEditor}
            selectedItinerary={selectedItinerary}
            showAIAssistant={showAIAssistant}
            onAIAssistantClose={() => setShowAIAssistant(false)}
            onEditorClose={handleEditorClose}
            onItinerarySave={handleItinerarySave}
          />
        </div>
      )}
    </ProDashboardLayout>
  );
};

export default ProItineraryPage;
