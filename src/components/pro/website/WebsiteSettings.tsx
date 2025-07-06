"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ItineraryType } from "@/data/itineraryData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { safeLocalStorage } from "../../../../lib/localStorage";
import Image from "@/components/ui/image";

interface WebsiteSettingsProps {
  itineraries: ItineraryType[];
  setItineraries: React.Dispatch<React.SetStateAction<ItineraryType[]>>;
  onSettingsChange?: () => void; // Add callback for settings changes
}

const WebsiteSettings: React.FC<WebsiteSettingsProps> = ({
  itineraries,
  setItineraries,
  onSettingsChange,
}) => {
  const [selectedItineraries, setSelectedItineraries] = useState<string[]>(
    itineraries.map((it) => it.id)
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
    const filteredItineraries = itineraries.filter((item) =>
      selectedItineraries.includes(item.id)
    );

    setItineraries(filteredItineraries);
    safeLocalStorage.setItem(
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
      description: `${selectedItineraries.length} itineraries will be displayed on your website. Preview updated automatically.`,
    });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-lg font-medium">Website Settings</h2>
        <p className="text-gray-600 text-sm">
          Manage itineraries displayed on your website
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-base font-medium mb-2">Itineraries to Display</h3>
          <p className="text-sm text-gray-500 mb-4">
            Select which itineraries to show on your website
          </p>

          <div className="border rounded-md overflow-hidden">
            <div className="divide-y">
              {itineraries.map((itinerary) => (
                <div
                  key={itinerary.id}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50"
                >
                  <Checkbox
                    id={`itinerary-${itinerary.id}`}
                    checked={selectedItineraries.includes(itinerary.id)}
                    onCheckedChange={() => handleItineraryToggle(itinerary.id)}
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={`itinerary-${itinerary.id}`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {itinerary.title}
                    </label>
                    <p className="text-xs text-gray-500">
                      {itinerary.days} {itinerary.days === 1 ? "day" : "days"} •{" "}
                      {itinerary.status}
                    </p>
                  </div>
                  {itinerary.image && (
                    <img
                      src={itinerary.image}
                      alt={itinerary.title}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  )}
                </div>
              ))}

              {itineraries.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  <p>No itineraries created yet.</p>
                  <p className="text-sm mt-1">
                    Create itineraries in the Itinerary Builder to display them
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
