"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Laptop, Smartphone, Tablet, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ItineraryType } from "@/data/itineraryData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUserData } from "../../../src/contexts/UserDataContext";

interface WebsitePreviewProps {
  itineraries?: ItineraryType[];
  refreshKey?: number; // Add refresh key prop
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({
  itineraries = [],
  refreshKey: externalRefreshKey,
}) => {
  const [viewMode, setViewMode] = useState("desktop");
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentItineraries, setCurrentItineraries] =
    useState<ItineraryType[]>(itineraries);
  const { userData } = useUserData();

  // Get website settings from UserDataContext for real-time updates
  const { websiteSettings } = userData;
  const {
    companyName,
    tagline,
    description,
    primaryColor,
    headerImage,
    theme,
  } = websiteSettings;

  // Update internal refresh key when external key changes
  useEffect(() => {
    if (externalRefreshKey !== undefined) {
      setRefreshKey(externalRefreshKey);
    }
  }, [externalRefreshKey]);

  // Update itineraries when prop changes
  useEffect(() => {
    setCurrentItineraries(itineraries);
  }, [itineraries]);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      setRefreshKey((prev) => prev + 1);
      toast.success("Preview updated with new theme", {
        description: `Applied "${event.detail.theme}" theme`,
      });
    };

    const handleSettingsChange = (event: CustomEvent) => {
      setRefreshKey((prev) => prev + 1);
      // Update itineraries if they changed
      if (event.detail?.filteredItineraries) {
        setCurrentItineraries(event.detail.filteredItineraries);
      }
      toast.success("Preview updated with new settings", {
        description: "Itinerary selection has been updated",
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener(
        "themeChanged",
        handleThemeChange as EventListener
      );
      window.addEventListener(
        "websiteSettingsChanged",
        handleSettingsChange as EventListener
      );
      return () => {
        window.removeEventListener(
          "themeChanged",
          handleThemeChange as EventListener
        );
        window.removeEventListener(
          "websiteSettingsChanged",
          handleSettingsChange as EventListener
        );
      };
    }
  }, []);

  // Get theme-based styling
  const getThemeStyles = () => {
    switch (theme?.toLowerCase()) {
      case "modern":
        return {
          heroClass: "bg-gradient-to-r from-blue-500 to-purple-600",
          cardClass: "bg-white shadow-xl rounded-xl",
          headerTextClass: "text-white",
          buttonClass: "bg-blue-600 hover:bg-blue-700",
          navClass: "bg-white shadow-sm",
        };
      case "minimalist":
        return {
          heroClass: "bg-white border-b-2 border-gray-200",
          cardClass: "bg-white border shadow-sm rounded-md",
          headerTextClass: "text-black",
          buttonClass: "bg-black hover:bg-gray-800 text-white",
          navClass: "bg-gray-50",
        };
      case "elegant":
        return {
          heroClass: "bg-gradient-to-r from-amber-400 to-orange-500",
          cardClass: "bg-white shadow-lg rounded-lg border border-amber-200",
          headerTextClass: "text-white",
          buttonClass: "bg-amber-600 hover:bg-amber-700",
          navClass: "bg-amber-50",
        };
      case "bold":
        return {
          heroClass: "bg-gradient-to-r from-purple-600 to-pink-600",
          cardClass: "bg-white shadow-xl rounded-xl border-2 border-purple-200",
          headerTextClass: "text-white",
          buttonClass: "bg-purple-600 hover:bg-purple-700",
          navClass: "bg-purple-50",
        };
      case "artisan":
        return {
          heroClass: "bg-gradient-to-r from-emerald-500 to-teal-600",
          cardClass: "bg-white shadow-lg rounded-lg border border-emerald-200",
          headerTextClass: "text-white",
          buttonClass: "bg-emerald-600 hover:bg-emerald-700",
          navClass: "bg-emerald-50",
        };
      case "classic":
      default:
        return {
          heroClass: "bg-cover bg-center",
          cardClass: "bg-white shadow-md rounded-lg",
          headerTextClass: "text-white",
          buttonClass: "bg-blue-600 hover:bg-blue-700",
          navClass: "bg-gray-50",
        };
    }
  };

  const themeStyles = getThemeStyles();

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    toast.success("Preview refreshed", {
      description: "The latest changes have been applied to the preview",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Website Preview</h2>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Select defaultValue={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desktop">
                <div className="flex items-center gap-2">
                  <Laptop className="h-4 w-4" />
                  <span>Desktop</span>
                </div>
              </SelectItem>
              <SelectItem value="tablet">
                <div className="flex items-center gap-2">
                  <Tablet className="h-4 w-4" />
                  <span>Tablet</span>
                </div>
              </SelectItem>
              <SelectItem value="mobile">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <span>Mobile</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border border-gray-200 overflow-hidden bg-gray-50">
        <CardContent className="p-4 flex justify-center">
          <div
            className={cn(
              "rounded-md shadow-lg bg-white overflow-hidden transition-all",
              viewMode === "desktop" && "w-full",
              viewMode === "tablet" && "w-[768px]",
              viewMode === "mobile" && "w-[375px]"
            )}
            key={refreshKey}
          >
            <AspectRatio ratio={16 / 9} className="overflow-visible">
              <div className="p-0 bg-white h-full overflow-auto">
                {/* Header/Hero section preview */}
                <div
                  className={cn(
                    "w-full h-32 relative",
                    headerImage ? "" : themeStyles.heroClass
                  )}
                  style={{
                    backgroundColor:
                      headerImage && !themeStyles.heroClass.includes("gradient")
                        ? undefined
                        : headerImage
                        ? undefined
                        : primaryColor,
                  }}
                >
                  {headerImage && (
                    <div className="absolute inset-0">
                      <img
                        src={headerImage}
                        alt="Header"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    </div>
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <div
                      className={cn("text-center", themeStyles.headerTextClass)}
                    >
                      <h1 className="text-xl font-bold">{companyName}</h1>
                      <p className="text-sm mt-1">{tagline}</p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className={cn("p-4", themeStyles.navClass)}>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="h-6 w-16 rounded bg-gray-200"></div>
                    <div className="h-6 w-16 rounded bg-gray-200"></div>
                    <div className="h-6 w-16 rounded bg-gray-200"></div>
                    <div className="h-6 w-16 rounded bg-gray-200"></div>
                  </div>

                  {/* Tours grid */}
                  <div
                    className={cn(
                      "grid gap-4 mb-4",
                      viewMode === "mobile" ? "grid-cols-1" : "grid-cols-3"
                    )}
                  >
                    {currentItineraries.slice(0, 3).map((item, index) => (
                      <div
                        key={item.id || index}
                        className={cn(
                          "h-32 relative overflow-hidden cursor-pointer hover:opacity-90",
                          themeStyles.cardClass
                        )}
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                          {item.title}
                        </div>
                      </div>
                    ))}
                    {currentItineraries.length === 0 && (
                      <>
                        <div
                          className={cn("h-32", themeStyles.cardClass)}
                        ></div>
                        <div
                          className={cn("h-32", themeStyles.cardClass)}
                        ></div>
                        <div
                          className={cn("h-32", themeStyles.cardClass)}
                        ></div>
                      </>
                    )}
                  </div>

                  {/* Interactive CTAs */}
                  <div className="space-y-3">
                    <div
                      className={cn(
                        "h-12 w-full rounded text-center flex items-center justify-center font-medium cursor-pointer hover:opacity-90",
                        themeStyles.buttonClass
                      )}
                      style={{
                        backgroundColor: themeStyles.buttonClass.includes("bg-")
                          ? undefined
                          : primaryColor,
                      }}
                    >
                      Book Now
                    </div>

                    <div className="border-t pt-3">
                      <h3 className="font-medium mb-2">About Us</h3>
                      <div className="h-16 bg-gray-100 rounded p-2 mb-2 text-xs overflow-hidden">
                        {description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AspectRatio>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsitePreview;
