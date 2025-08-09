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
// Note: localStorage utilities have been replaced with Supabase storage
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
  const [layout, setLayout] = useState("hero-top");

  useEffect(() => {
    // Load website settings from localStorage
    const loadSettings = () => {
      setPrimaryColor(localStorage.getItem("websitePrimaryColor") || "#9b87f5");
      setHeaderImage(localStorage.getItem("websiteHeaderImage"));
      setCompanyName(
        localStorage.getItem("websiteCompanyName") || "Culturin Tours"
      );
      setTagline(
        localStorage.getItem("websiteTagline") ||
          "Authentic cultural experiences curated by Eloka Agu"
      );
      setTheme(localStorage.getItem("selectedWebsiteTheme") || "classic");
      setLayout(localStorage.getItem("selectedWebsiteLayout") || "hero-top");
    };

    loadSettings();

    // Set up event listener for storage changes and content changes
    const handleStorageChange = () => {
      loadSettings();
    };
    const handleContentChange = () => {
      loadSettings();
      toast.success("Preview updated with new content");
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
      window.addEventListener("websiteContentChanged", handleContentChange);
      return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener(
          "websiteContentChanged",
          handleContentChange
        );
      };
    }
  }, [refreshKey]);

  const handleRefresh = () => {
    // Force refresh by changing key
    setPrimaryColor(localStorage.getItem("websitePrimaryColor") || "#9b87f5");
    setHeaderImage(localStorage.getItem("websiteHeaderImage"));
    setCompanyName(
      localStorage.getItem("websiteCompanyName") || "Culturin Tours"
    );
    setTagline(
      localStorage.getItem("websiteTagline") ||
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

  // Layout rendering
  const renderLayout = () => {
    if (layout === "hero-side") {
      return (
        <div className="flex flex-col md:flex-row h-full bg-gradient-to-r from-gray-100 to-blue-200 border-4 border-blue-400">
          {/* Hero section */}
          <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-blue-200 to-blue-400 border-r-4 border-blue-300">
            <div className="w-full text-center text-white">
              <h1 className="text-5xl font-extrabold mb-4 tracking-widest drop-shadow-lg">
                {companyName}
              </h1>
              <p className="text-2xl mb-6 italic font-serif">{tagline}</p>
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-100 font-bold px-8 py-4 rounded-full shadow-lg"
              >
                Explore Our Tours
              </Button>
            </div>
          </div>
          {/* Tours grid */}
          <div className="flex-1 p-6 bg-white">
            <h2 className="text-3xl font-bold text-blue-700 mb-8 border-b-2 border-blue-200 pb-2">
              Our Tours
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {itineraries.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden border-2 border-blue-200 shadow-lg"
                >
                  <div className="aspect-video relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-blue-700 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      );
    }
    if (layout === "magazine") {
      return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-100 to-blue-100 border-8 border-pink-300">
          <div className="mb-6 text-5xl font-extrabold text-purple-700 text-center pt-12 tracking-widest uppercase drop-shadow-lg">
            Culturin Magazine
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 pb-16">
            {itineraries.slice(0, 4).map((item, index) => (
              <Card
                key={item.id}
                className="bg-white rounded-lg shadow-xl p-4 flex flex-col border-2 border-purple-200"
              >
                <div className="font-bold text-2xl mb-2 text-purple-700">
                  {item.title}
                </div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-32 object-cover rounded mb-2 border border-purple-100"
                />
                <div className="text-xs text-gray-500">{item.days} days</div>
                <div className="mt-2 text-sm text-gray-700 italic">
                  Feature story: {item.description?.slice(0, 60)}...
                </div>
              </Card>
            ))}
          </div>
        </div>
      );
    }
    if (layout === "newspaper") {
      return (
        <div className="min-h-screen p-6 bg-gray-100 border-t-8 border-b-8 border-gray-400 font-serif">
          <div className="mb-4 text-4xl font-bold border-b-4 border-gray-400 pb-2 text-center tracking-widest">
            Culturin Times
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {itineraries.slice(0, 6).map((item, index) => (
              <Card
                key={item.id}
                className="bg-white rounded shadow p-3 flex flex-col border border-gray-300"
              >
                <div className="font-bold mb-1 text-lg text-gray-800">
                  {item.title}
                </div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-20 object-cover rounded mb-1 border border-gray-200"
                />
                <div className="text-xs text-gray-500">{item.days} days</div>
                <div className="mt-2 text-xs text-gray-700">
                  Column: {item.description?.slice(0, 40)}...
                </div>
              </Card>
            ))}
          </div>
        </div>
      );
    }
    if (layout === "feed") {
      return (
        <div className="min-h-screen p-6 bg-white border-l-8 border-blue-200">
          <div className="mb-4 text-3xl font-bold text-blue-600 text-center">
            Latest Experiences Feed
          </div>
          <div className="space-y-4 max-w-2xl mx-auto">
            {itineraries.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-full border-2 border-blue-300"
                />
                <div>
                  <div className="font-semibold text-lg text-blue-700">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500">{item.days} days</div>
                  <div className="text-xs text-gray-700 mt-1">
                    {item.description?.slice(0, 50)}...
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    // Default: hero-top
    return (
      <div className="p-0 h-full overflow-auto">
        {/* Header/Hero section preview */}
        <div
          className={cn("w-full h-32 relative", themeStyles.heroClass)}
          style={{
            backgroundColor:
              theme === "classic" && !headerImage ? primaryColor : undefined,
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
            <div className={cn("text-center", themeStyles.headerTextClass)}>
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
                {localStorage.getItem("websiteDescription") ||
                  "We specialize in small group cultural tours that showcase the real Barcelona beyond the tourist spots."}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Debug: Show current layout */}
      <div className="text-xs text-gray-500 mb-2">
        Current layout: <span className="font-mono">{layout}</span>
      </div>
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
              {renderLayout()}
            </AspectRatio>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsitePreview;
