"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "../../lib/navigation";
import ProDashboardLayout from "@/components/pro/ProDashboardLayout";
import { useToast } from "@/components/ui/use-toast";
import { supabaseStorage } from "@/lib/supabase-storage";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ItineraryEditor from "@/components/pro/itinerary/ItineraryEditor";
import { ItineraryType } from "@/data/itineraryData";

const ProItineraryPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [itineraries, setItineraries] = useState<ItineraryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItinerary, setSelectedItinerary] = useState<ItineraryType | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  // Load itineraries from storage
  useEffect(() => {
    const loadItineraries = async () => {
      try {
        console.log("🔄 Loading itineraries...");
        setLoading(true);
        
        // Add a small delay to ensure auth is ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Load from Supabase storage first (fallback)
        try {
          const storedItineraries = await supabaseStorage.getItem('userItineraries') || [];
          console.log("📦 Loaded from Supabase storage:", storedItineraries);
          setItineraries(Array.isArray(storedItineraries) ? storedItineraries : []);
        } catch (storageError) {
          console.error("Error loading from storage:", storageError);
          // Use local storage as ultimate fallback
          try {
            const localItineraries = localStorage.getItem('userItineraries');
            const parsed = localItineraries ? JSON.parse(localItineraries) : [];
            console.log("📦 Loaded from localStorage:", parsed);
            setItineraries(parsed);
          } catch (localError) {
            console.error("Error loading from localStorage:", localError);
            setItineraries([]);
          }
        }
      } catch (error) {
        console.error("Error loading itineraries:", error);
        setItineraries([]);
      } finally {
        console.log("✅ Itineraries loading complete");
        setLoading(false);
      }
    };
    
    // Add timeout failsafe to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log("⚠️ Loading timeout - forcing loading state to false");
      setLoading(false);
    }, 3000);
    
    loadItineraries().finally(() => {
      clearTimeout(timeoutId);
    });
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleCreateNew = () => {
    const newItinerary: ItineraryType = {
      id: `new-${Date.now()}`,
      title: "New Itinerary",
      days: 3,
      lastUpdated: "just now",
      status: "draft",
      image: "/lovable-uploads/38b3d0e5-8ce3-41eb-bc8f-7dd21ee77dc2.png",
      themeType: "cultural",
      description: "Start building your cultural experience itinerary",
      regions: [],
    };
    setSelectedItinerary(newItinerary);
    setShowEditor(true);
  };

  const handleEditItinerary = (itinerary: ItineraryType) => {
    setSelectedItinerary(itinerary);
    setShowEditor(true);
  };

  const handleDeleteItinerary = async (itineraryId: string) => {
    try {
      const updatedItineraries = itineraries.filter(it => it.id !== itineraryId);
      setItineraries(updatedItineraries);
      
      // Save to storage with fallback
      try {
        await supabaseStorage.setItem('userItineraries', updatedItineraries);
      } catch (storageError) {
        console.error("Error saving to Supabase storage:", storageError);
        // Fallback to localStorage
        localStorage.setItem('userItineraries', JSON.stringify(updatedItineraries));
      }
      
      toast({
        title: "Itinerary Deleted",
        description: "The itinerary has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting itinerary:", error);
      toast({
        title: "Error",
        description: "An error occurred while deleting the itinerary.",
        variant: "destructive",
      });
    }
  };

  const handleEditorClose = () => {
    setShowEditor(false);
    setSelectedItinerary(null);
    setShowAIAssistant(false);
  };

  const handleItinerarySave = async (savedItinerary: ItineraryType) => {
    try {
      console.log("🏠 Parent handling save for:", savedItinerary.title, "Status:", savedItinerary.status);
      
      let updatedItineraries;
      
      if (savedItinerary.id.startsWith('new-')) {
        // New itinerary - generate a proper ID
        const newItinerary = {
          ...savedItinerary,
          id: `itinerary-${Date.now()}`,
          lastUpdated: "just now"
        };
        updatedItineraries = [newItinerary, ...itineraries];
        console.log("✅ Created new itinerary with ID:", newItinerary.id);
      } else {
        // Existing itinerary - update
        updatedItineraries = itineraries.map(it => 
          it.id === savedItinerary.id ? { ...savedItinerary, lastUpdated: "just now" } : it
        );
        console.log("✅ Updated existing itinerary:", savedItinerary.id);
      }
      
      setItineraries(updatedItineraries);
      
      // Save to storage with fallback
      try {
        await supabaseStorage.setItem('userItineraries', updatedItineraries);
        console.log("💾 Saved to Supabase storage");
      } catch (storageError) {
        console.error("Error saving to Supabase storage:", storageError);
        // Fallback to localStorage
        localStorage.setItem('userItineraries', JSON.stringify(updatedItineraries));
        console.log("💾 Saved to localStorage as fallback");
      }
      
      // Different toast messages for save vs publish
      if (savedItinerary.status === "published") {
        toast({
          title: "Itinerary Published! 🎉",
          description: `"${savedItinerary.title}" is now live and available.`,
        });
      } else {
        toast({
          title: "Itinerary Saved",
          description: `"${savedItinerary.title}" has been saved successfully.`,
        });
      }
      
      handleEditorClose();
    } catch (error) {
      console.error("Error saving itinerary:", error);
      toast({
        title: "Error",
        description: "Failed to save the itinerary.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <ProDashboardLayout>
        <div className="p-6">
          <div className="flex items-center justify-center min-h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </ProDashboardLayout>
    );
  }

  // Show editor if selectedItinerary exists
  if (showEditor && selectedItinerary) {
    return (
      <ItineraryEditor
        showEditor={showEditor}
        selectedItinerary={selectedItinerary}
        showAIAssistant={showAIAssistant}
        onAIAssistantClose={() => setShowAIAssistant(false)}
        onEditorClose={handleEditorClose}
        onItinerarySave={handleItinerarySave}
      />
    );
  }

  return (
    <ProDashboardLayout>
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Itineraries
            </h1>
            <p className="text-gray-600">
              Create and manage your experience itineraries
            </p>
          </div>
          <Button onClick={handleCreateNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Itinerary
          </Button>
        </div>



        {itineraries.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No itineraries yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first itinerary to get started with your cultural experiences.
              </p>
              <Button onClick={handleCreateNew} className="flex items-center gap-2 mx-auto">
                <Plus className="h-4 w-4" />
                Create Your First Itinerary
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itineraries.map((itinerary) => (
              <Card key={itinerary.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{itinerary.title}</CardTitle>
                      <CardDescription>
                        {itinerary.days} day{itinerary.days !== 1 ? 's' : ''} • {itinerary.status}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditItinerary(itinerary)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteItinerary(itinerary.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    {itinerary.description}
                  </p>
                  {itinerary.price && (
                    <div className="text-sm font-medium text-gray-900">
                      ${itinerary.price} {itinerary.currency}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </ProDashboardLayout>
  );
};

export default ProItineraryPage;
