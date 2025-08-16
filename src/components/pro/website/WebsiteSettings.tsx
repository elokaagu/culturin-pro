"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ExperienceType } from "@/data/experienceData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// Note: localStorage utilities have been replaced with Supabase storage
import Image from "@/components/ui/image";

interface WebsiteSettingsProps {
  experiences: ExperienceType[];
  setItineraries: React.Dispatch<React.SetStateAction<ExperienceType[]>>;
  onSettingsChange?: () => void; // Add callback for settings changes
}

const WebsiteSettings: React.FC<WebsiteSettingsProps> = ({
  experiences,
  setItineraries,
  onSettingsChange,
}) => {
  const [selectedItineraries, setSelectedItineraries] = useState<string[]>(
    experiences.map((it) => it.id)
  );

  const handleItineraryToggle = (id: string) => {
    setSelectedItineraries((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });

    // Trigger preview update immediately
    if (onSettingsChange) {
      onSettingsChange();
    }

    toast.success("Selection updated", {
      description: "Preview will update automatically",
    });
  };

  const saveSettings = () => {
    const filteredItineraries = experiences.filter((item) =>
      selectedItineraries.includes(item.id)
    );

    setItineraries(filteredItineraries);
    localStorage.setItem(
      "culturinItineraries",
      JSON.stringify(filteredItineraries)
    );

    // Trigger preview update after save
    if (onSettingsChange) {
      onSettingsChange();
    }

    // Dispatch custom event for preview refresh
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("websiteSettingsChanged", {
          detail: {
            selectedItineraries,
            filteredItineraries,
          },
        })
      );
    }

    toast.success("Website settings saved successfully", {
      description: `${selectedItineraries.length} experiences will be displayed on your website. Preview updated automatically.`,
    });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-lg font-medium">Website Settings</h2>
        <p className="text-gray-600 text-sm">
          Manage experiences displayed on your website
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-base font-medium mb-2">Experiences to Display</h3>
          <p className="text-sm text-gray-500 mb-4">
            Select which experiences to show on your website
          </p>

          <div className="border rounded-md overflow-hidden">
            <div className="divide-y">
              {experiences.map((experience) => (
                <div
                  key={experience.id}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50"
                >
                  <Checkbox
                    id={`experience-${experience.id}`}
                    checked={selectedItineraries.includes(experience.id)}
                    onCheckedChange={() => handleItineraryToggle(experience.id)}
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={`experience-${experience.id}`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {experience.title}
                    </label>
                    <p className="text-xs text-gray-500">
                      {experience.days} {experience.days === 1 ? "day" : "days"} •{" "}
                      {experience.status}
                    </p>
                  </div>
                  {experience.image && (
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  )}
                </div>
              ))}

              {experiences.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  <p>No experiences created yet.</p>
                  <p className="text-sm mt-1">
                    Create experiences in the Experience Builder to display them
                    on your website.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Button onClick={saveSettings}>Save Settings</Button>
      </div>
    </div>
  );
};

export default WebsiteSettings;
