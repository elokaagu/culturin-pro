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
import { safeLocalStorage } from "../../../../lib/localStorage";
import Image from "@/components/ui/image";

interface WebsitePreviewProps {
  itineraries?: ItineraryType[];
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({
  itineraries = [],
}) => {
  const [viewMode, setViewMode] = useState("desktop");
  const [primaryColor, setPrimaryColor] = useState("#9b87f5");
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("Culturin Tours");
  const [tagline, setTagline] = useState(
    "Authentic cultural experiences curated by Eloka Agu"
  );
  const [refreshKey, setRefreshKey] = useState(0);
  const [theme, setTheme] = useState("classic");

  useEffect(() => {
    // Load website settings from localStorage
    const loadSettings = () => {
      setPrimaryColor(
        safeLocalStorage.getItem("websitePrimaryColor") || "#9b87f5"
      );
      setHeaderImage(safeLocalStorage.getItem("websiteHeaderImage"));
      setCompanyName(
        safeLocalStorage.getItem("websiteCompanyName") || "Culturin Tours"
      );
      setTagline(
        safeLocalStorage.getItem("websiteTagline") ||
          "Authentic cultural experiences curated by Eloka Agu"
      );
      setTheme(safeLocalStorage.getItem("selectedWebsiteTheme") || "classic");
    };

    loadSettings();

    // Set up event listener for storage changes
    const handleStorageChange = () => {
      loadSettings();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, [refreshKey]);

  const handleRefresh = () => {
    // Force refresh by changing key
    setPrimaryColor(
      safeLocalStorage.getItem("websitePrimaryColor") || "#9b87f5"
    );
    setHeaderImage(safeLocalStorage.getItem("websiteHeaderImage"));
    setCompanyName(
      safeLocalStorage.getItem("websiteCompanyName") || "Culturin Tours"
    );
    setTagline(
      safeLocalStorage.getItem("websiteTagline") ||
        "Authentic cultural experiences curated by Eloka Agu"
    );
    setRefreshKey((prev) => prev + 1);
    toast.success("Preview refreshed", {
      description: "The latest changes have been applied to the preview",
    });
  };

  // Theme style mapping
  const getThemeStyles = () => {
    switch (theme.toLowerCase()) {
      case "modern":
        return {
          heroClass: "bg-gradient-to-r from-blue-500 to-purple-600",
          cardClass: "bg-white shadow-xl rounded-xl",
          headerTextClass: "text-white",
          buttonClass: "bg-blue-600 hover:bg-blue-700",
        };
      case "minimalist":
        return {
          heroClass: "bg-white border-b",
          cardClass: "bg-white border shadow-sm rounded-md",
          headerTextClass: "text-black",
          buttonClass: "bg-black hover:bg-gray-800 text-white",
        };
      case "elegant":
        return {
          heroClass: "bg-gradient-to-r from-amber-400 to-orange-300",
          cardClass: "bg-white shadow-lg rounded-lg border border-amber-200",
          headerTextClass: "text-white",
          buttonClass: "bg-amber-600 hover:bg-amber-700",
        };
      case "bold":
        return {
          heroClass: "bg-gradient-to-r from-purple-600 to-pink-600",
          cardClass: "bg-white shadow-xl rounded-xl border-2 border-purple-200",
          headerTextClass: "text-white",
          buttonClass: "bg-purple-600 hover:bg-purple-700",
        };
      case "artisan":
        return {
          heroClass: "bg-gradient-to-r from-emerald-500 to-teal-600",
          cardClass: "bg-white shadow-lg rounded-lg border border-emerald-200",
          headerTextClass: "text-white",
          buttonClass: "bg-emerald-600 hover:bg-emerald-700",
        };
      case "classic":
      default:
        return {
          heroClass: "bg-cover bg-center",
          cardClass: "bg-white shadow-md rounded-lg",
          headerTextClass: "text-white",
          buttonClass: "bg-blue-600 hover:bg-blue-700",
        };
    }
  };
  const themeStyles = getThemeStyles();

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
              "rounded-md shadow-lg overflow-hidden transition-all",
              viewMode === "desktop" && "w-full",
              viewMode === "tablet" && "w-[768px]",
              viewMode === "mobile" && "w-[375px]"
            )}
            key={refreshKey}
          >
            <AspectRatio ratio={16 / 9} className="overflow-visible">
              <div className="p-0 h-full overflow-auto">
                {/* Header/Hero section preview */}
                <div
                  className={cn("w-full h-32 relative", themeStyles.heroClass)}
                  style={{
                    backgroundColor:
                      theme === "classic" && !headerImage
                        ? primaryColor
                        : undefined,
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
                <div className="p-4">
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
                    {itineraries.slice(0, 3).map((item, index) => (
                      <div
                        key={item.id || index}
                        className={cn(
                          "h-32 rounded relative overflow-hidden cursor-pointer hover:opacity-90",
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
                    {itineraries.length === 0 && (
                      <>
                        <div
                          className={cn("h-32 rounded", themeStyles.cardClass)}
                        ></div>
                        <div
                          className={cn("h-32 rounded", themeStyles.cardClass)}
                        ></div>
                        <div
                          className={cn("h-32 rounded", themeStyles.cardClass)}
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
                      style={
                        theme === "classic"
                          ? { backgroundColor: primaryColor, color: "#fff" }
                          : {}
                      }
                    >
                      Book Now
                    </div>

                    <div className="border-t pt-3">
                      <h3 className="font-medium mb-2">About Us</h3>
                      <div className="h-16 bg-gray-100 rounded p-2 mb-2 text-xs overflow-hidden">
                        {safeLocalStorage.getItem("websiteDescription") ||
                          "We specialize in small group cultural tours that showcase the real Barcelona beyond the tourist spots."}
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
