"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "../../lib/navigation";
import ProDashboardLayout from "@/components/pro/ProDashboardLayout";
import { useToast } from "@/components/ui/use-toast";
import { supabaseStorage } from "@/lib/supabase-storage";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ExperienceEditor from "@/components/pro/experience/ExperienceEditor";
import { ExperienceType } from "@/data/experienceData";
import { useAuth } from "@/src/components/auth/AuthProvider";
import ExperienceCard from "@/components/pro/experience/ExperienceCard";

const ProItineraryPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isReady } = useAuth();
  const [experiences, setItineraries] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExperience, setSelectedItinerary] =
    useState<ExperienceType | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  // Default images for experiences
  const defaultImages = [
    "/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png",
    "/lovable-uploads/38b3d0e5-8ce3-41eb-bc8f-7dd21ee77dc2.png",
    "/lovable-uploads/57645fce-47c3-43f5-82f6-080cd2577e06.png",
    "/lovable-uploads/61e2237f-86de-4ec9-8712-8902092d8c9b.png",
    "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
    "/lovable-uploads/88dfd739-180c-4ca4-8bfd-08396d3464c9.png",
    "/lovable-uploads/90db897a-9b44-4eb3-87cd-585b37891618.png",
    "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
  ];

  // Helper function to ensure experience has an image
  const ensureItineraryHasImage = (
    experience: ExperienceType,
    index: number
  ): ExperienceType => {
    if (!experience.image) {
      return {
        ...experience,
        image: defaultImages[index % defaultImages.length],
      };
    }
    return experience;
  };

  // Simplified and reliable experience loading with timeout protection
  useEffect(() => {
    console.log(
      "🔄 ProItineraryPage loading - user:",
      user?.email,
      "isReady:",
      isReady
    );

    let isMounted = true;
    let loadingTimeout: NodeJS.Timeout;

    const loadItineraries = async () => {
      try {
        if (isMounted) {
          setLoading(true);
        }
        console.log("🔄 Starting experience load process");

        let foundItineraries: any[] = [];

        // Primary storage key based on user
        const primaryKey = user?.id
          ? `userExperiences_${user.id}`
          : "userItineraries";

        console.log("📦 Checking primary storage key:", primaryKey);

        // 1. Try localStorage first (fastest)
        try {
          const localData = localStorage.getItem(primaryKey);
          if (localData) {
            const parsed = JSON.parse(localData);
            if (Array.isArray(parsed) && parsed.length > 0) {
              foundItineraries = parsed;
              console.log(
                `✅ Found ${foundItineraries.length} experiences in localStorage`
              );
            }
          }
        } catch (error) {
          console.log("❌ Error reading localStorage:", error);
        }

        // 2. Try Supabase storage if localStorage is empty and user exists
        if (foundItineraries.length === 0 && user?.id) {
          console.log("📦 Trying Supabase storage...");
          try {
            const supabaseData = await supabaseStorage.getItem(primaryKey);
            if (Array.isArray(supabaseData) && supabaseData.length > 0) {
              foundItineraries = supabaseData;
              console.log(
                `✅ Found ${foundItineraries.length} experiences in Supabase storage`
              );

              // Sync back to localStorage for faster future access
              localStorage.setItem(
                primaryKey,
                JSON.stringify(foundItineraries)
              );
              console.log("💾 Synced to localStorage for faster access");
            }
          } catch (error) {
            console.log("❌ Error reading Supabase storage:", error);
          }
        }

        // 3. Check legacy keys only if nothing found (fallback)
        if (foundItineraries.length === 0) {
          console.log("📦 Checking legacy storage keys...");
          const legacyKeys = [
            "userItineraries",
            user?.email
              ? `userExperiences_${user.email.replace(/[@.]/g, "_")}`
              : null,
            "experiences",
          ].filter(Boolean);

          for (const key of legacyKeys) {
            try {
              const legacyData = localStorage.getItem(key);
              if (legacyData) {
                const parsed = JSON.parse(legacyData);
                if (Array.isArray(parsed) && parsed.length > 0) {
                  foundItineraries = parsed;
                  console.log(
                    `✅ Found ${foundItineraries.length} experiences in legacy key: ${key}`
                  );

                  // Migrate to primary key
                  localStorage.setItem(
                    primaryKey,
                    JSON.stringify(foundItineraries)
                  );
                  console.log("🔄 Migrated to primary storage key");
                  break;
                }
              }
            } catch (error) {
              console.log(`❌ Error with legacy key "${key}":`, error);
            }
          }
        }

        // If no experiences found anywhere, create some sample ones for demo
        if (foundItineraries.length === 0) {
          console.log("📝 No experiences found, creating sample experiences");
          foundItineraries = [
            {
              id: "sample-florence-tour",
              title: "Florence Tour",
              description:
                "Experience the Renaissance capital with expert guides",
              days: 3,
              lastUpdated: "just now",
              status: "draft",
              image:
                "/lovable-uploads/38b3d0e5-8ce3-41eb-bc8f-7dd21ee77dc2.png",
              themeType: "cultural",
              regions: ["Tuscany"],
            },
            {
              id: "sample-barcelona-guide",
              title: "Barcelona Tour Guide",
              description: "Discover Gaudí's masterpieces and local culture",
              days: 3,
              lastUpdated: "just now",
              status: "draft",
              image:
                "/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png",
              themeType: "cultural",
              regions: ["Catalonia"],
            },
          ];

          // Save sample experiences to storage for future use
          try {
            localStorage.setItem(primaryKey, JSON.stringify(foundItineraries));
            if (user?.id) {
              await supabaseStorage.setItem(primaryKey, foundItineraries);
            }
            console.log("💾 Saved sample experiences to storage");
          } catch (error) {
            console.log("❌ Error saving sample experiences:", error);
          }
        }

        console.log(
          `🎯 Final result: ${foundItineraries.length} experiences loaded`
        );

        if (isMounted) {
          setItineraries(foundItineraries);
          setLoading(false);
        }
      } catch (error) {
        console.error("❌ Critical error loading experiences:", error);
        if (isMounted) {
          setItineraries([]);
          setLoading(false);
        }
      }
    };

    // Set a safety timeout to prevent infinite loading
    loadingTimeout = setTimeout(() => {
      console.log("⚠️ Loading timeout - setting loading to false");
      if (isMounted) {
        setLoading(false);
      }
    }, 5000);

    // Only start loading when auth is ready
    if (isReady) {
      loadItineraries();
    }

    return () => {
      isMounted = false;
      clearTimeout(loadingTimeout);
    };
  }, [isReady, user?.id, user?.email]);

  const handleCreateNew = () => {
    const newItinerary: ExperienceType = {
      id: `new-${Date.now()}`,
      title: "New Experience",
      days: 3,
      lastUpdated: "just now",
      status: "draft",
      image: "/lovable-uploads/38b3d0e5-8ce3-41eb-bc8f-7dd21ee77dc2.png",
      themeType: "cultural",
      description: "Start building your cultural experience experience",
      regions: [],
    };
    setSelectedItinerary(newItinerary);
    setShowEditor(true);
  };

  const handleEditItinerary = (experience: ExperienceType) => {
    setSelectedItinerary(experience);
    setShowEditor(true);
  };

  const handleDeleteItinerary = async (itineraryId: string) => {
    try {
      const updatedItineraries = experiences.filter(
        (it) => it.id !== itineraryId
      );
      setItineraries(updatedItineraries);

      // Save to storage with user-specific key and fallback
      const storageKey = user?.id
        ? `userExperiences_${user.id}`
        : "userItineraries";
      console.log("🗑️ Deleting from storage key:", storageKey);

      try {
        await supabaseStorage.setItem(storageKey, updatedItineraries);
        console.log("💾 Updated Supabase storage after deletion");
      } catch (storageError) {
        console.error("Error updating Supabase storage:", storageError);
        // Fallback to localStorage with user-specific key
        const localStorageKey = user?.id
          ? `userExperiences_${user.id}`
          : "userItineraries";
        localStorage.setItem(
          localStorageKey,
          JSON.stringify(updatedItineraries)
        );
        console.log(
          "💾 Updated localStorage after deletion with key:",
          localStorageKey
        );
      }

      toast({
        title: "Experience Deleted",
        description: "The experience has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast({
        title: "Error",
        description: "An error occurred while deleting the experience.",
        variant: "destructive",
      });
    }
  };

  const handleEditorClose = () => {
    setShowEditor(false);
    setSelectedItinerary(null);
    setShowAIAssistant(false);
  };

  const handleItinerarySave = async (savedItinerary: ExperienceType) => {
    try {
      console.log(
        "🏠 Parent handling save for:",
        savedItinerary.title,
        "Status:",
        savedItinerary.status
      );

      let updatedItineraries;

      if (savedItinerary.id.startsWith("new-")) {
        // New experience - generate a proper ID
        const newItinerary = {
          ...savedItinerary,
          id: `experience-${Date.now()}`,
          lastUpdated: "just now",
        };
        updatedItineraries = [newItinerary, ...experiences];
        console.log("✅ Created new experience with ID:", newItinerary.id);
      } else {
        // Existing experience - update
        updatedItineraries = experiences.map((it) =>
          it.id === savedItinerary.id
            ? { ...savedItinerary, lastUpdated: "just now" }
            : it
        );
        console.log("✅ Updated existing experience:", savedItinerary.id);
      }

      setItineraries(updatedItineraries);

      // Save to storage with user-specific key and fallback
      const storageKey = user?.id
        ? `userExperiences_${user.id}`
        : "userItineraries";
      console.log("💾 Saving with storage key:", storageKey);

      try {
        await supabaseStorage.setItem(storageKey, updatedItineraries);
        console.log("💾 Saved to Supabase storage");
      } catch (storageError) {
        console.error("Error saving to Supabase storage:", storageError);
        // Fallback to localStorage with user-specific key
        const localStorageKey = user?.id
          ? `userExperiences_${user.id}`
          : "userItineraries";
        localStorage.setItem(
          localStorageKey,
          JSON.stringify(updatedItineraries)
        );
        console.log(
          "💾 Saved to localStorage as fallback with key:",
          localStorageKey
        );
      }

      // Different toast messages for save vs publish
      if (savedItinerary.status === "published") {
        toast({
          title: "Experience Published! 🎉",
          description: `"${savedItinerary.title}" is now live and available.`,
        });
      } else {
        toast({
          title: "Experience Saved",
          description: `"${savedItinerary.title}" has been saved successfully.`,
        });
      }

      handleEditorClose();
    } catch (error) {
      console.error("Error saving experience:", error);
      toast({
        title: "Error",
        description: "Failed to save the experience.",
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

  // Show editor if selectedExperience exists
  if (showEditor && selectedExperience) {
    return (
      <ExperienceEditor
        showEditor={showEditor}
        selectedExperience={selectedExperience}
        showAIAssistant={showAIAssistant}
        onAIAssistantClose={() => setShowAIAssistant(false)}
        onEditorClose={handleEditorClose}
        onExperienceSave={handleItinerarySave}
        onQuickAction={(action: string) => {
          console.log(
            "🎯 Quick action:",
            action,
            "for experience:",
            selectedExperience.id
          );
          if (action === "delete") {
            handleDeleteItinerary(selectedExperience.id);
          }
          // Other quick actions will be handled by the ExperienceEditor
        }}
      />
    );
  }

  return (
    <ProDashboardLayout>
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Experiences
            </h1>
            <p className="text-muted-foreground">
              Create and manage your experience experiences
            </p>
          </div>
          <Button onClick={handleCreateNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Experience
          </Button>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium text-foreground mb-2">
                No experiences yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Create your first experience to get started with your cultural
                experiences.
              </p>
              <Button
                onClick={handleCreateNew}
                className="flex items-center gap-2 mx-auto"
              >
                <Plus className="h-4 w-4" />
                Create Your First Experience
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((experience, index) => {
              const itineraryWithImage = ensureItineraryHasImage(
                experience,
                index
              );
              return (
                <div
                  key={experience.id}
                  onClick={() => {
                    console.log(
                      "🖱️ Card clicked, opening modal for:",
                      experience.title
                    );
                    handleEditItinerary(experience);
                  }}
                >
                  <ExperienceCard
                    id={experience.id}
                    title={experience.title}
                    description={
                      experience.description ||
                      "Start building your cultural experience experience"
                    }
                    days={experience.days}
                    lastUpdated={experience.lastUpdated || "Recently updated"}
                    status={experience.status}
                    image={itineraryWithImage.image || defaultImages[0]}
                    themeType={experience.themeType}
                    regions={experience.regions}
                    onEdit={() => handleEditItinerary(experience)}
                    onDelete={() => handleDeleteItinerary(experience.id)}
                    onQuickAction={(id, action) => {
                      if (action === "edit") {
                        handleEditItinerary(experience);
                      } else if (action === "delete") {
                        handleDeleteItinerary(experience.id);
                      }
                    }}
                    completionPercentage={
                      experience.status === "published" ? 100 : 60
                    }
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
