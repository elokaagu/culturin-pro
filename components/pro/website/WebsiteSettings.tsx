"use client";

import React, { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ExperienceType } from "@/data/experienceData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Eye, EyeOff, Save } from "lucide-react";

interface WebsiteSettingsProps {
  experiences: ExperienceType[];
  setExperiences: React.Dispatch<React.SetStateAction<ExperienceType[]>>;
  onSettingsChange?: () => void; // Add callback for settings changes
}

const WebsiteSettings: React.FC<WebsiteSettingsProps> = ({
  experiences,
  setExperiences,
  onSettingsChange,
}) => {
  const [selectedItineraries, setSelectedItineraries] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  // Initialize selected experiences
  useEffect(() => {
    const stored = localStorage.getItem("selectedWebsiteItineraries");
    if (stored) {
      try {
        setSelectedItineraries(JSON.parse(stored));
      } catch (e) {
        // If parsing fails, select all by default
        setSelectedItineraries(experiences.map((it) => it.id));
      }
    } else {
      // Default to all experiences selected
      setSelectedItineraries(experiences.map((it) => it.id));
    }
  }, [experiences]);

  const handleItineraryToggle = (id: string) => {
    setSelectedItineraries((prev) => {
      const newSelection = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      // Save to localStorage immediately for persistence
      localStorage.setItem(
        "selectedWebsiteItineraries",
        JSON.stringify(newSelection)
      );
      return newSelection;
    });

    // Trigger preview update immediately
    if (onSettingsChange) {
      onSettingsChange();
    }

    toast.success("Selection updated", {
      description: "Preview will update automatically",
    });
  };

  const handleSelectAll = () => {
    const allIds = experiences.map((it) => it.id);
    setSelectedItineraries(allIds);
    localStorage.setItem("selectedWebsiteItineraries", JSON.stringify(allIds));

    // Trigger preview update
    if (onSettingsChange) {
      onSettingsChange();
    }

    toast.success("All experiences selected");
  };

  const handleSelectNone = () => {
    setSelectedItineraries([]);
    localStorage.setItem("selectedWebsiteItineraries", JSON.stringify([]));

    // Trigger preview update
    if (onSettingsChange) {
      onSettingsChange();
    }

    toast.success("All experiences deselected");
  };

  const saveSettings = async () => {
    setSaving(true);

    try {
      // Filter experiences based on selection
      const filteredItineraries = experiences.filter((item) =>
        selectedItineraries.includes(item.id)
      );

      // Update the experiences state
      setExperiences(filteredItineraries);

      // Save to localStorage for website display
      localStorage.setItem(
        "culturinItineraries",
        JSON.stringify(filteredItineraries)
      );
      localStorage.setItem(
        "selectedWebsiteItineraries",
        JSON.stringify(selectedItineraries)
      );

      // Simulate save delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));

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
    } catch (error) {
      toast.error("Failed to save settings", {
        description: "Please try again",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Website Settings
          </h2>
          <p className="text-gray-600 text-sm">
            Configure which experiences appear on your public website
          </p>
        </div>
        <Badge variant="outline">
          {selectedItineraries.length} of {experiences.length} selected
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">Experiences to Display</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={handleSelectNone}>
                Select None
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {experiences.length > 0 ? (
            <div className="space-y-3">
              {experiences.map((experience) => (
                <div
                  key={experience.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
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
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {experience.days} {experience.days === 1 ? "day" : "days"}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {experience.status}
                      </Badge>
                    </div>
                  </div>
                  {selectedItineraries.includes(experience.id) ? (
                    <Eye className="h-4 w-4 text-green-600" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  )}
                  {experience.image && (
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Settings className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="font-medium">No experiences available</p>
              <p className="text-sm mt-1">
                Create experiences in the Experience Builder to display them on
                your website.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Selected experiences will appear on your public website
        </div>
        <Button
          onClick={saveSettings}
          disabled={saving}
          className="flex items-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default WebsiteSettings;
