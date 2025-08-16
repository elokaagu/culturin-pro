"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProDashboardLayout from "@/components/pro/ProDashboardLayout";
import ExperienceEditor from "@/components/pro/experience/ExperienceEditor";
import { ExperienceType } from "@/data/experienceData";
import { useToast } from "@/components/ui/use-toast";
import { supabaseStorage } from "@/lib/supabase-storage";

export default function CreateItineraryPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  // Create a new experience with default values
  const newExperience: ExperienceType = {
    id: `new-${Date.now()}`,
    title: "New Experience",
    days: 3,
    lastUpdated: "just now",
    status: "draft" as const,
    image: "/lovable-uploads/38b3d0e5-8ce3-41eb-bc8f-7dd21ee77dc2.png",
    themeType: "general",
    description: "Start building your cultural experience experience",
    regions: [],
  };

  const handleEditorClose = () => {
    router.push("/pro-dashboard/experience");
  };

  const handleExperienceSave = async (savedExperience: ExperienceType) => {
    // The savedItinerary now contains the actual database record with proper ID
    toast({
      title: "Experience Created!",
      description: `"${savedExperience.title}" has been created successfully.`,
    });
    
    // Set a flag to indicate we're returning from creating a new experience
    await supabaseStorage.setItem('returningFromCreate', 'true');
    
    // Navigate back to the experience list
    router.push("/pro-dashboard/experience");
  };

  return (
    <ProDashboardLayout
      title="Create New Experience"
      subtitle="Build your cultural experience from scratch"
    >
      <div className="px-4 sm:px-0">
        <ExperienceEditor
          showEditor={true}
          selectedExperience={newExperience}
          showAIAssistant={showAIAssistant}
          onAIAssistantClose={() => setShowAIAssistant(false)}
          onEditorClose={handleEditorClose}
          onExperienceSave={handleExperienceSave}
        />
      </div>
    </ProDashboardLayout>
  );
}
