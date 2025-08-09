"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "../../lib/navigation";
import ProDashboardLayout from "@/components/pro/ProDashboardLayout";
import { useToast } from "@/components/ui/use-toast";
import { supabaseStorage } from "@/lib/supabase-storage";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ItineraryEditor from "@/components/pro/itinerary/ItineraryEditor";
import { ItineraryType } from "@/data/itineraryData";
import { useAuth } from "@/src/components/auth/AuthProvider";
import ItineraryCard from "@/components/pro/itinerary/ItineraryCard";

const ProItineraryPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isReady } = useAuth();
  const [itineraries, setItineraries] = useState<ItineraryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItinerary, setSelectedItinerary] = useState<ItineraryType | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  // Default images for itineraries
  const defaultImages = [
    "/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png",
    "/lovable-uploads/38b3d0e5-8ce3-41eb-bc8f-7dd21ee77dc2.png", 
    "/lovable-uploads/57645fce-47c3-43f5-82f6-080cd2577e06.png",
    "/lovable-uploads/61e2237f-86de-4ec9-8712-8902092d8c9b.png",
    "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
    "/lovable-uploads/88dfd739-180c-4ca4-8bfd-08396d3464c9.png",
    "/lovable-uploads/90db897a-9b44-4eb3-87cd-585b37891618.png",
    "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png"
  ];

  // Helper function to ensure itinerary has an image
  const ensureItineraryHasImage = (itinerary: ItineraryType, index: number): ItineraryType => {
    if (!itinerary.image) {
      return {
        ...itinerary,
        image: defaultImages[index % defaultImages.length]
      };
    }
    return itinerary;
  };

  // Load itineraries from storage - wait for auth to be ready
  useEffect(() => {
    console.log("🔄 useEffect triggered - isReady:", isReady, "user:", user?.email);
    
    let isMounted = true;
    
    const loadItineraries = async () => {
      try {
        console.log("🔄 Loading itineraries for user:", user?.email || 'anonymous');
        
        // Create user-specific storage key
        const storageKey = user?.id ? `userItineraries_${user.id}` : 'userItineraries';
        console.log("🔑 Using storage key:", storageKey);
        
        // Load from Supabase storage first (user-specific)
        try {
          const storedItineraries = await supabaseStorage.getItem(storageKey) || [];
          console.log("📦 Loaded from Supabase storage:", storedItineraries);
          if (isMounted) {
            setItineraries(Array.isArray(storedItineraries) ? storedItineraries : []);
          }
        } catch (storageError) {
          console.error("Error loading from Supabase storage:", storageError);
          // Use local storage as fallback with user-specific key
          try {
            const localStorageKey = user?.id ? `userItineraries_${user.id}` : 'userItineraries';
            const localItineraries = localStorage.getItem(localStorageKey);
            const parsed = localItineraries ? JSON.parse(localItineraries) : [];
            console.log("📦 Loaded from localStorage with key:", localStorageKey, parsed);
            if (isMounted) {
              setItineraries(parsed);
            }
          } catch (localError) {
            console.error("Error loading from localStorage:", localError);
            if (isMounted) {
              setItineraries([]);
            }
          }
        }
      } catch (error) {
        console.error("Error loading itineraries:", error);
        if (isMounted) {
          setItineraries([]);
        }
      } finally {
        console.log("✅ Itineraries loading complete");
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    // Simple timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log("⚠️ Loading timeout - forcing loading state to false");
      if (isMounted) {
        setLoading(false);
      }
    }, 3000);
    
    // Load data when auth is ready, or after a short delay
    if (isReady) {
      loadItineraries();
    } else {
      // Wait a bit for auth, then load anyway
      setTimeout(() => {
        if (isMounted) {
          loadItineraries();
        }
      }, 1000);
    }
    
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [isReady, user?.id, user?.email]);

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
      
      // Save to storage with user-specific key and fallback
      const storageKey = user?.id ? `userItineraries_${user.id}` : 'userItineraries';
      console.log("🗑️ Deleting from storage key:", storageKey);
      
      try {
        await supabaseStorage.setItem(storageKey, updatedItineraries);
        console.log("💾 Updated Supabase storage after deletion");
      } catch (storageError) {
        console.error("Error updating Supabase storage:", storageError);
        // Fallback to localStorage with user-specific key
        const localStorageKey = user?.id ? `userItineraries_${user.id}` : 'userItineraries';
        localStorage.setItem(localStorageKey, JSON.stringify(updatedItineraries));
        console.log("💾 Updated localStorage after deletion with key:", localStorageKey);
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
      
      // Save to storage with user-specific key and fallback
      const storageKey = user?.id ? `userItineraries_${user.id}` : 'userItineraries';
      console.log("💾 Saving with storage key:", storageKey);
      
      try {
        await supabaseStorage.setItem(storageKey, updatedItineraries);
        console.log("💾 Saved to Supabase storage");
      } catch (storageError) {
        console.error("Error saving to Supabase storage:", storageError);
        // Fallback to localStorage with user-specific key
        const localStorageKey = user?.id ? `userItineraries_${user.id}` : 'userItineraries';
        localStorage.setItem(localStorageKey, JSON.stringify(updatedItineraries));
        console.log("💾 Saved to localStorage as fallback with key:", localStorageKey);
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {itineraries.map((itinerary, index) => {
              const itineraryWithImage = ensureItineraryHasImage(itinerary, index);
              return (
                <div 
                  key={itinerary.id} 
                  onClick={() => {
                    console.log("🖱️ Card clicked, opening modal for:", itinerary.title);
                    handleEditItinerary(itinerary);
                  }}
                >
                  <ItineraryCard
                    id={itinerary.id}
                    title={itinerary.title}
                    description={itinerary.description || 'Start building your cultural experience itinerary'}
                    days={itinerary.days}
                    lastUpdated={itinerary.lastUpdated || 'Recently updated'}
                    status={itinerary.status}
                    image={itineraryWithImage.image || defaultImages[0]}
                    themeType={itinerary.themeType}
                    regions={itinerary.regions}
                    onEdit={() => handleEditItinerary(itinerary)}
                    onDelete={() => handleDeleteItinerary(itinerary.id)}
                    onQuickAction={(id, action) => {
                      if (action === 'edit') {
                        handleEditItinerary(itinerary);
                      } else if (action === 'delete') {
                        handleDeleteItinerary(itinerary.id);
                      }
                    }}
                    completionPercentage={itinerary.status === 'published' ? 100 : 60}
                    disableNavigation={true}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ProDashboardLayout>
  );
};

export default ProItineraryPage;
