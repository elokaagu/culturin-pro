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
import { ItineraryType } from "@/data/itineraryData";
import { Itinerary } from "@/lib/itinerary-service";
import { toast } from "sonner";
import { useUserData } from "../../../src/contexts/UserDataContext";
import {
  userWebsiteService,
  UserWebsiteData,
  UserWebsiteSettings,
} from "./UserWebsiteService";
import { useAuth } from "@/src/components/auth/AuthProvider";

interface WebsitePreviewProps {
  itineraries?: Itinerary[];
  refreshKey?: number;
  viewMode?: "desktop" | "mobile" | "tablet";
  onTourSelect?: (tour: Itinerary) => void;
  websiteSlug?: string;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({
  itineraries = [],
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
  const [currentItineraries, setCurrentItineraries] =
    useState<Itinerary[]>(itineraries);
  const [websiteData, setWebsiteData] = useState<UserWebsiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const { userData } = useUserData();
  const { user } = useAuth();

  // Load user's website data
  useEffect(() => {
    let isMounted = true;

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
        const data = await userWebsiteService.getUserWebsiteData(user.id);

        if (isMounted) {
          setWebsiteData(data);
          setCurrentItineraries(data.itineraries);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error loading website data:", error);
        if (isMounted) {
          toast.error("Failed to load website data");
          setLoading(false);
        }
      }
    };

    loadWebsiteData();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, [user?.id, externalRefreshKey]);

  // Dynamic settings from user data
  const settings = websiteData?.settings;
  const companyName = settings?.company_name || "Your Cultural Tours";
  const tagline =
    settings?.tagline || "Discover Authentic Cultural Experiences";
  const description =
    settings?.description || "We specialize in authentic cultural tours";
  const primaryColor = settings?.branding?.primary_color || "#9b87f5";
  const headerImage = settings?.branding?.header_image || null;
  const theme = settings?.branding?.theme || "classic";

  const headerSettings = {
    backgroundColor: "#ffffff",
    textColor: "#000000",
    height: 80,
  };

  const footerSettings = {
    backgroundColor: "#f8f9fa",
    textColor: "#6c757d",
    showSocialMedia: true,
    showContactInfo: true,
    layout: "3-column",
    showLogo: false,
    logo: settings?.branding?.logo_url || null,
    copyrightText: `© ${new Date().getFullYear()} ${companyName}. All rights reserved.`,
    contactInfo: {
      phone: settings?.contact_info?.phone || "",
      email: settings?.contact_info?.email || "",
      address: settings?.contact_info?.address || "",
    },
    socialMediaLinks: {
      facebook: settings?.social_media?.facebook || "",
      twitter: settings?.social_media?.twitter || "",
      instagram: settings?.social_media?.instagram || "",
      youtube: settings?.social_media?.youtube || "",
    },
  };

  const fontSettings = {
    headingFont: "Inter",
    headingFontWeight: "600",
    headingFontSize: "32",
    lineHeight: "1.2",
    letterSpacing: "0",
    bodyFont: "Inter",
    bodyFontWeight: "400",
    bodyFontSize: "16",
    bodyLetterSpacing: "0",
  };

  const animationSettings = {
    enableAnimations: true,
    animationSpeed: 0.3,
    animationType: "fade",
    enableHoverEffects: true,
    enableScrollAnimations: true,
  };

  const placedBlocks = [];

  // Update internal refresh key when external key changes
  useEffect(() => {
    if (externalRefreshKey !== undefined) {
      setRefreshKey(externalRefreshKey);
      // Reset loading state when refresh key changes
      setLoading(true);
    }
  }, [externalRefreshKey]);

  // Update itineraries when prop changes
  useEffect(() => {
    setCurrentItineraries(itineraries);
  }, [itineraries]);

  // Update viewMode when external viewMode changes
  useEffect(() => {
    if (externalViewMode) {
      setViewMode(externalViewMode as "desktop" | "mobile" | "tablet");
    }
  }, [externalViewMode]);

  // Get theme styles
  const themeStyles = {
    heroClass: "bg-gradient-to-r from-blue-50 to-purple-50",
    headingClass: "text-gray-900 font-bold",
    textClass: "text-gray-700",
    cardClass: "bg-white border border-gray-200 rounded-lg shadow-sm",
    buttonClass: "bg-blue-600 text-white hover:bg-blue-700",
    navClass: "bg-white",
    sectionClass: "bg-white",
  };

  const fontStyles = {
    headingStyle: {
      fontFamily: fontSettings.headingFont,
      fontWeight: fontSettings.headingFontWeight,
      fontSize: `${fontSettings.headingFontSize}px`,
      lineHeight: fontSettings.lineHeight,
      letterSpacing: `${fontSettings.letterSpacing}px`,
    },
    bodyStyle: {
      fontFamily: fontSettings.bodyFont,
      fontWeight: fontSettings.bodyFontWeight,
      fontSize: `${fontSettings.bodyFontSize}px`,
      letterSpacing: `${fontSettings.bodyLetterSpacing}px`,
    },
  };

  const animationClasses = {
    animationClass: animationSettings.enableAnimations
      ? animationSettings.animationType === "slide"
        ? "transform transition-transform duration-300 hover:scale-105"
        : "transition-opacity duration-300"
      : "",
    hoverClass: animationSettings.enableHoverEffects
      ? "hover:shadow-lg transition-shadow duration-300"
      : "",
  };

  const renderPlacedBlocks = () => {
    if (!placedBlocks || placedBlocks.length === 0) {
      return null;
    }

    return placedBlocks
      .sort((a, b) => a.position - b.position)
      .map((block) => (
        <div key={block.id} className="w-full">
          {/* Block rendering logic would go here */}
        </div>
      ));
  };

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
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-sm text-gray-600">
                        Loading your website and itineraries...
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Header/Hero section preview */}
                    <div
                      className={cn("p-6 text-center", themeStyles.heroClass)}
                      style={{ backgroundColor: primaryColor + "10" }}
                    >
                      <h1
                        className={cn(
                          "text-2xl font-bold mb-2",
                          themeStyles.headingClass
                        )}
                        style={{ color: primaryColor }}
                      >
                        {companyName}
                      </h1>
                      <p className={cn("text-sm mb-4", themeStyles.textClass)}>
                        {tagline}
                      </p>
                      <Button
                        size="sm"
                        style={{ backgroundColor: primaryColor }}
                      >
                        Explore Tours
                      </Button>
                    </div>

                    {/* Placed Blocks from Drag & Drop Builder */}
                    {renderPlacedBlocks()}

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
                      {!isLoading && !error && currentItineraries.length > 0 ? (
                        <div
                          className={cn(
                            "grid gap-4 mb-4",
                            viewMode === "mobile"
                              ? "grid-cols-1"
                              : "grid-cols-3"
                          )}
                        >
                          {currentItineraries.slice(0, 6).map((item, index) => (
                            <div
                              key={item.id || index}
                              className={cn(
                                "border rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow",
                                themeStyles.cardClass,
                                animationClasses.hoverClass,
                                animationClasses.animationClass
                              )}
                              style={{ animationDelay: `${index * 0.1}s` }}
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
                                <h3
                                  className="font-medium text-sm mb-1"
                                  style={fontStyles.headingStyle}
                                >
                                  {item.title}
                                </h3>
                                <p
                                  className="text-xs text-gray-600 mb-2"
                                  style={fontStyles.bodyStyle}
                                >
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
                            Create and publish your first itinerary to see it
                            here
                          </p>
                        </div>
                      )}
                    </div>

                    {/* About Section */}
                    <div
                      className={cn("p-6 bg-gray-50", themeStyles.sectionClass)}
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
                          {footerSettings.contactInfo.email && (
                            <p className="mb-1">
                              📧 {footerSettings.contactInfo.email}
                            </p>
                          )}
                          {footerSettings.contactInfo.phone && (
                            <p className="mb-1">
                              📞 {footerSettings.contactInfo.phone}
                            </p>
                          )}
                          {footerSettings.contactInfo.address && (
                            <p>📍 {footerSettings.contactInfo.address}</p>
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
                            {footerSettings.socialMediaLinks.facebook && (
                              <div className="w-6 h-6 bg-blue-500 rounded"></div>
                            )}
                            {footerSettings.socialMediaLinks.instagram && (
                              <div className="w-6 h-6 bg-pink-500 rounded"></div>
                            )}
                            {footerSettings.socialMediaLinks.twitter && (
                              <div className="w-6 h-6 bg-blue-400 rounded"></div>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600">
                            {footerSettings.copyrightText}
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
