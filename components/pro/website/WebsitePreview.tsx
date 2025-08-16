"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Laptop, Tablet, Smartphone } from "lucide-react";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Experience } from "@/lib/experience-service";
import { toast } from "sonner";
import { useUserData } from "../../../src/contexts/UserDataContext";
import {
  userWebsiteService,
  UserWebsiteData,
  UserWebsiteSettings,
} from "./UserWebsiteService";
import { useAuth } from "@/hooks/useAuth";

interface WebsitePreviewProps {
  experiences?: Experience[];
  refreshKey?: number;
  viewMode?: "desktop" | "mobile" | "tablet";
  onTourSelect?: (tour: Experience) => void;
  websiteSlug?: string;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({
  experiences = [],
  refreshKey: externalRefreshKey,
  viewMode: externalViewMode,
  onTourSelect,
  websiteSlug,
  isLoading = false,
  error = null,
  onRetry,
}) => {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile" | "tablet">(
    externalViewMode || "desktop"
  );
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentExperiences, setCurrentExperiences] = useState<Experience[]>(experiences);
  const [websiteData, setWebsiteData] = useState<UserWebsiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const { userData } = useUserData();
  const { user } = useAuth();

  // Load user's website data
  useEffect(() => {
    let isMounted = true;
    let loadingTimeout: NodeJS.Timeout;

    const loadWebsiteData = async () => {
      if (!user?.id) {
        if (isMounted) {
          setLoading(false);
        }
        return;
      }

      try {
        if (isMounted) {
          setLoading(true);
        }
        
        // Set a timeout to prevent infinite loading
        loadingTimeout = setTimeout(() => {
          if (isMounted && loading) {
            console.warn("Website data loading timeout - forcing loading to false");
            setLoading(false);
            toast.error("Loading timeout - please refresh the page");
          }
        }, 10000); // 10 second timeout

        const data = await userWebsiteService.getUserWebsiteData(user.id);

        if (isMounted) {
          setWebsiteData(data);
          setCurrentExperiences(data.experiences || []);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading website data:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadWebsiteData();

    return () => {
      isMounted = false;
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [user?.id]);

  // Update experiences when prop changes
  useEffect(() => {
    setCurrentExperiences(experiences);
  }, [experiences]);

  // Update viewMode when external viewMode changes
  useEffect(() => {
    if (externalViewMode) {
      setViewMode(externalViewMode as "desktop" | "mobile" | "tablet");
    }
  }, [externalViewMode]);

  // Get website settings with fallbacks
  const websiteSettings = websiteData?.settings || userData?.settings || {};
  const companyName = websiteSettings.company_name || "Your Tour Company";
  const tagline = websiteSettings.tagline || "Discover Amazing Cultural Experiences";
  const description = websiteSettings.description || "We specialize in creating authentic cultural experiences that connect you with local traditions and communities.";
  const primaryColor = websiteSettings.branding?.primary_color || "#3B82F6";
  const theme = websiteSettings.branding?.theme || "classic";
  const logoUrl = websiteSettings.branding?.logo_url || "";
  const headerImage = websiteSettings.branding?.header_image || "";

  // Get theme styles based on selected theme
  const getThemeStyles = () => {
    switch (theme) {
      case "adventure":
        return {
          heroClass: "bg-gradient-to-br from-green-400 to-blue-500",
          headingClass: "text-white font-bold",
          textClass: "text-white",
          cardClass: "bg-white border border-gray-200 rounded-lg shadow-lg",
          buttonClass: "bg-white text-green-600 hover:bg-gray-100",
          navClass: "bg-white",
          sectionClass: "bg-gray-50",
        };
      case "cultural":
        return {
          heroClass: "bg-gradient-to-br from-amber-400 to-orange-500",
          headingClass: "text-white font-bold",
          textClass: "text-white",
          cardClass: "bg-white border border-gray-200 rounded-lg shadow-lg",
          buttonClass: "bg-white text-amber-600 hover:bg-gray-100",
          navClass: "bg-white",
          sectionClass: "bg-amber-50",
        };
      case "luxury":
        return {
          heroClass: "bg-gradient-to-br from-purple-400 to-pink-500",
          headingClass: "text-white font-bold",
          textClass: "text-white",
          cardClass: "bg-white border border-gray-200 rounded-lg shadow-lg",
          buttonClass: "bg-white text-purple-600 hover:bg-gray-100",
          navClass: "bg-white",
          sectionClass: "bg-purple-50",
        };
      case "family":
        return {
          heroClass: "bg-gradient-to-br from-blue-400 to-cyan-500",
          headingClass: "text-white font-bold",
          textClass: "text-white",
          cardClass: "bg-white border border-gray-200 rounded-lg shadow-lg",
          buttonClass: "bg-white text-blue-600 hover:bg-gray-100",
          navClass: "bg-white",
          sectionClass: "bg-blue-50",
        };
      case "eco":
        return {
          heroClass: "bg-gradient-to-br from-emerald-400 to-teal-500",
          headingClass: "text-white font-bold",
          textClass: "text-white",
          cardClass: "bg-white border border-gray-200 rounded-lg shadow-lg",
          buttonClass: "bg-white text-emerald-600 hover:bg-gray-100",
          navClass: "bg-white",
          sectionClass: "bg-emerald-50",
        };
      case "urban":
        return {
          heroClass: "bg-gradient-to-br from-gray-400 to-slate-500",
          headingClass: "text-white font-bold",
          textClass: "text-white",
          cardClass: "bg-white border border-gray-200 rounded-lg shadow-lg",
          buttonClass: "bg-white text-gray-600 hover:bg-gray-100",
          navClass: "bg-white",
          sectionClass: "bg-gray-50",
        };
      default: // classic
        return {
          heroClass: "bg-gradient-to-r from-blue-50 to-purple-50",
          headingClass: "text-gray-900 font-bold",
          textClass: "text-gray-700",
          cardClass: "bg-white border border-gray-200 rounded-lg shadow-sm",
          buttonClass: "bg-blue-600 text-white hover:bg-blue-700",
          navClass: "bg-white",
          sectionClass: "bg-white",
        };
    }
  };

  const themeStyles = getThemeStyles();

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    toast.success("Preview refreshed");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Controls */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-4">
          <h3 className="font-medium">Website Preview</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw
              className={cn("h-4 w-4 mr-2", loading && "animate-spin")}
            />
            Refresh
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">View:</span>
          <Select
            value={viewMode}
            onValueChange={(value) =>
              setViewMode(value as "desktop" | "mobile" | "tablet")
            }
          >
            <SelectTrigger className="w-32">
              <SelectValue />
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

      <Card className="overflow-hidden bg-gray-50 flex-1 pl-8 border-0">
        <CardContent className="p-6 flex justify-center h-full">
          <div
            className={cn(
              "rounded-md shadow-lg bg-white overflow-hidden transition-all h-full",
              viewMode === "desktop" && "w-full",
              viewMode === "tablet" && "w-[768px]",
              viewMode === "mobile" && "w-[375px]"
            )}
            key={refreshKey}
          >
            <div className="h-full overflow-auto">
              <div className="p-0 bg-white h-full overflow-auto">
                {loading || isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-sm text-gray-600">
                        {isLoading ? "Loading your website and experiences..." : "Loading website data..."}
                      </p>
                      {loading && !isLoading && (
                        <button 
                          onClick={() => window.location.reload()} 
                          className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                        >
                          Refresh if stuck
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Header/Hero section preview */}
                    <div
                      className={cn("p-6 text-center", themeStyles.heroClass)}
                      style={headerImage ? { backgroundImage: `url(${headerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                    >
                      {logoUrl && (
                        <div className="mb-4">
                          <img src={logoUrl} alt={companyName} className="h-16 mx-auto" />
                        </div>
                      )}
                      <h1
                        className={cn(
                          "text-2xl font-bold mb-2",
                          themeStyles.headingClass
                        )}
                      >
                        {companyName}
                      </h1>
                      <p className={cn("text-sm mb-4", themeStyles.textClass)}>
                        {tagline}
                      </p>
                      <Button
                        size="sm"
                        className={themeStyles.buttonClass}
                      >
                        Explore Our Tours
                      </Button>
                    </div>

                    {/* Tours Section */}
                    <div className={cn("p-6", themeStyles.navClass)}>
                      <h2
                        className={cn(
                          "text-xl font-semibold mb-4",
                          themeStyles.headingClass
                        )}
                      >
                        Our Tours
                      </h2>

                      {/* Loading State */}
                      {isLoading && (
                        <div className="text-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                          <p className="text-sm text-gray-600">Loading tours...</p>
                        </div>
                      )}

                      {/* Error State */}
                      {error && !isLoading && (
                        <div className="text-center py-8 border rounded-lg bg-red-50">
                          <p className="text-sm text-red-600 mb-4">{error}</p>
                          {onRetry && (
                            <button
                              onClick={onRetry}
                              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
                            >
                              Try Again
                            </button>
                          )}
                        </div>
                      )}

                      {/* Tours Grid */}
                      {!isLoading && !error && currentExperiences.length > 0 ? (
                        <div
                          className={cn(
                            "grid gap-4 mb-4",
                            viewMode === "mobile"
                              ? "grid-cols-1"
                              : "grid-cols-3"
                          )}
                        >
                          {currentExperiences.slice(0, 6).map((item, index) => (
                            <div
                              key={item.id || index}
                              className={cn(
                                "border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow",
                                themeStyles.cardClass
                              )}
                              onClick={() => onTourSelect?.(item)}
                            >
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-24 object-cover"
                                />
                              )}
                              <div className="p-3">
                                <h3 className="font-medium text-sm mb-1">
                                  {item.title}
                                </h3>
                                <p className="text-xs text-gray-600 mb-2">
                                  {item.description?.substring(0, 60)}...
                                </p>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-500">
                                    {item.days} day{item.days !== 1 ? "s" : ""}
                                  </span>
                                  {item.price && (
                                    <span
                                      className="text-sm font-medium"
                                      style={{ color: primaryColor }}
                                    >
                                      ${item.price}
                                    </span>
                                  )}
                                </div>
                                {/* Book Now Button */}
                                <button
                                  className="w-full mt-2 px-3 py-1.5 text-xs font-medium text-white rounded transition-colors"
                                  style={{ backgroundColor: primaryColor }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onTourSelect?.(item);
                                  }}
                                >
                                  Book Now
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 border rounded-lg bg-gray-50">
                          <p className="text-sm text-gray-600 mb-4">
                            No published tours yet
                          </p>
                          <p className="text-xs text-gray-500">
                            Create and publish your first experience to see it
                            here
                          </p>
                        </div>
                      )}
                    </div>

                    {/* About Section */}
                    <div
                      className={cn("p-6", themeStyles.sectionClass)}
                    >
                      <h2
                        className={cn(
                          "text-xl font-semibold mb-4",
                          themeStyles.headingClass
                        )}
                      >
                        About {companyName}
                      </h2>
                      <p className={cn("text-sm", themeStyles.textClass)}>
                        {description}
                      </p>
                      {websiteData?.stats && (
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="text-center">
                            <div
                              className="text-lg font-bold"
                              style={{ color: primaryColor }}
                            >
                              {websiteData.stats.total_tours}
                            </div>
                            <div className="text-xs text-gray-600">Tours</div>
                          </div>
                          <div className="text-center">
                            <div
                              className="text-lg font-bold"
                              style={{ color: primaryColor }}
                            >
                              {websiteData.stats.rating.toFixed(1)}
                            </div>
                            <div className="text-xs text-gray-600">Rating</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer with dynamic contact info */}
                    <div className="border-t bg-gray-100 p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div>
                          <h4
                            className="font-medium mb-2"
                            style={{ color: primaryColor }}
                          >
                            Contact
                          </h4>
                          {websiteSettings.contact_info?.email && (
                            <p className="mb-1">
                              📧 {websiteSettings.contact_info.email}
                            </p>
                          )}
                          {websiteSettings.contact_info?.phone && (
                            <p className="mb-1">
                              📞 {websiteSettings.contact_info.phone}
                            </p>
                          )}
                          {websiteSettings.contact_info?.address && (
                            <p>📍 {websiteSettings.contact_info.address}</p>
                          )}
                        </div>

                        <div>
                          <h4
                            className="font-medium mb-2"
                            style={{ color: primaryColor }}
                          >
                            Follow Us
                          </h4>
                          <div className="flex gap-2">
                            {websiteSettings.social_media?.facebook && (
                              <div className="w-6 h-6 bg-blue-500 rounded"></div>
                            )}
                            {websiteSettings.social_media?.instagram && (
                              <div className="w-6 h-6 bg-pink-500 rounded"></div>
                            )}
                            {websiteSettings.social_media?.twitter && (
                              <div className="w-6 h-6 bg-blue-400 rounded"></div>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600">
                            © {new Date().getFullYear()} {companyName}. All rights reserved.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsitePreview;
