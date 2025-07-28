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
import {
  Laptop,
  Smartphone,
  Tablet,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
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
    headerSettings,
    footerSettings,
    fontSettings,
    animationSettings,
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

  // Get font styles
  const getFontStyles = () => {
    if (!fontSettings) return {};

    return {
      headingStyle: {
        fontFamily: `"${fontSettings.headingFont}", sans-serif`,
        fontWeight: fontSettings.headingFontWeight,
        fontSize: `${fontSettings.headingFontSize}px`,
        lineHeight: fontSettings.lineHeight,
        letterSpacing: `${fontSettings.letterSpacing}px`,
      },
      bodyStyle: {
        fontFamily: `"${fontSettings.bodyFont}", sans-serif`,
        fontWeight: fontSettings.bodyFontWeight,
        fontSize: `${fontSettings.bodyFontSize}px`,
        lineHeight: fontSettings.lineHeight,
        letterSpacing: `${fontSettings.letterSpacing}px`,
      },
    };
  };

  // Get animation classes
  const getAnimationClasses = () => {
    if (!animationSettings?.enableAnimations) return {};

    const speed = animationSettings.animationSpeed;
    const type = animationSettings.animationType;

    const baseClass = `transition-all duration-${Math.round(
      speed * 1000
    )} ease-in-out`;

    let animationClass = baseClass;
    switch (type) {
      case "fade":
        animationClass += " opacity-0 animate-fade-in";
        break;
      case "slide-up":
        animationClass += " transform translate-y-8 opacity-0 animate-slide-up";
        break;
      case "slide-down":
        animationClass +=
          " transform -translate-y-8 opacity-0 animate-slide-down";
        break;
      case "slide-left":
        animationClass +=
          " transform translate-x-8 opacity-0 animate-slide-left";
        break;
      case "slide-right":
        animationClass +=
          " transform -translate-x-8 opacity-0 animate-slide-right";
        break;
      case "zoom-in":
        animationClass += " transform scale-95 opacity-0 animate-zoom-in";
        break;
      case "zoom-out":
        animationClass += " transform scale-105 opacity-0 animate-zoom-out";
        break;
      case "bounce":
        animationClass += " animate-bounce";
        break;
      case "flip":
        animationClass += " transform rotate-y-180 animate-flip";
        break;
      case "rotate":
        animationClass += " animate-spin";
        break;
    }

    return {
      animationClass,
      hoverClass: animationSettings?.enableHoverEffects
        ? "hover:scale-105 hover:shadow-lg"
        : "",
      scrollClass: animationSettings?.enableScrollAnimations
        ? "animate-on-scroll"
        : "",
    };
  };

  const fontStyles = getFontStyles();
  const animationClasses = getAnimationClasses();

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
                    "w-full relative",
                    headerSettings?.height === "small" && "h-20",
                    headerSettings?.height === "medium" && "h-32",
                    headerSettings?.height === "large" && "h-48",
                    headerSettings?.height === "full" && "h-96",
                    !headerSettings?.height && "h-32",
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

                  {/* Custom Header Logo */}
                  {headerSettings?.logo && (
                    <div className="absolute top-4 left-4">
                      <img
                        src={headerSettings.logo}
                        alt="Logo"
                        className="h-8 w-auto object-contain"
                      />
                    </div>
                  )}

                  {/* Navigation Menu */}
                  {headerSettings?.showNav && headerSettings?.navItems && (
                    <div className="absolute top-4 right-4">
                      <div className="flex gap-4">
                        {headerSettings.navItems.map((item, index) => (
                          <div
                            key={index}
                            className="text-white text-sm font-medium hover:opacity-80 cursor-pointer"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div
                    className={cn(
                      "absolute inset-0 flex flex-col items-center justify-center p-4",
                      headerSettings?.textAlign === "left" && "items-start",
                      headerSettings?.textAlign === "right" && "items-end",
                      headerSettings?.textAlign === "center" && "items-center"
                    )}
                  >
                    <div
                      className={cn(
                        "text-center",
                        themeStyles.headerTextClass,
                        animationClasses.animationClass
                      )}
                      style={fontStyles.headingStyle}
                    >
                      <h1 className="text-xl font-bold">{companyName}</h1>
                      <p className="text-sm mt-1" style={fontStyles.bodyStyle}>
                        {tagline}
                      </p>
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
                          themeStyles.cardClass,
                          animationClasses.hoverClass,
                          animationClasses.animationClass
                        )}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1"
                          style={fontStyles.bodyStyle}
                        >
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
                        themeStyles.buttonClass,
                        animationClasses.hoverClass,
                        animationClasses.animationClass
                      )}
                      style={{
                        backgroundColor: themeStyles.buttonClass.includes("bg-")
                          ? undefined
                          : primaryColor,
                        ...fontStyles.bodyStyle,
                      }}
                    >
                      Book Now
                    </div>

                    <div
                      className={cn(
                        "border-t pt-3",
                        animationClasses.animationClass
                      )}
                    >
                      <h3
                        className="font-medium mb-2"
                        style={fontStyles.headingStyle}
                      >
                        About Us
                      </h3>
                      <div
                        className="h-16 bg-gray-100 rounded p-2 mb-2 text-xs overflow-hidden"
                        style={fontStyles.bodyStyle}
                      >
                        {description}
                      </div>
                    </div>
                  </div>

                  {/* Customizable Footer */}
                  {footerSettings && (
                    <div
                      className="border-t pt-4 mt-4"
                      style={{
                        backgroundColor: footerSettings.backgroundColor,
                        color: footerSettings.textColor,
                      }}
                    >
                      <div
                        className={cn(
                          "grid gap-4 p-4",
                          footerSettings.layout === "1-column" && "grid-cols-1",
                          footerSettings.layout === "2-column" && "grid-cols-2",
                          footerSettings.layout === "3-column" && "grid-cols-3",
                          footerSettings.layout === "4-column" && "grid-cols-4"
                        )}
                      >
                        {/* Logo and Company Info */}
                        <div className="space-y-2">
                          {footerSettings.showLogo && footerSettings.logo && (
                            <img
                              src={footerSettings.logo}
                              alt="Footer Logo"
                              className="h-8 w-auto object-contain"
                            />
                          )}
                          <h3 className="font-semibold">{companyName}</h3>
                          <p className="text-xs opacity-80">{tagline}</p>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Contact</h4>
                          {footerSettings.contactInfo.phone && (
                            <div className="flex items-center gap-1 text-xs">
                              <Phone className="h-3 w-3" />
                              {footerSettings.contactInfo.phone}
                            </div>
                          )}
                          {footerSettings.contactInfo.email && (
                            <div className="flex items-center gap-1 text-xs">
                              <Mail className="h-3 w-3" />
                              {footerSettings.contactInfo.email}
                            </div>
                          )}
                          {footerSettings.contactInfo.address && (
                            <div className="flex items-center gap-1 text-xs">
                              <MapPin className="h-3 w-3" />
                              {footerSettings.contactInfo.address}
                            </div>
                          )}
                        </div>

                        {/* Social Media Links */}
                        {footerSettings.showSocial && (
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">Follow Us</h4>
                            <div className="flex gap-2">
                              {footerSettings.socialLinks.facebook && (
                                <div className="w-6 h-6 bg-white bg-opacity-20 rounded flex items-center justify-center">
                                  <Facebook className="h-3 w-3" />
                                </div>
                              )}
                              {footerSettings.socialLinks.twitter && (
                                <div className="w-6 h-6 bg-white bg-opacity-20 rounded flex items-center justify-center">
                                  <Twitter className="h-3 w-3" />
                                </div>
                              )}
                              {footerSettings.socialLinks.instagram && (
                                <div className="w-6 h-6 bg-white bg-opacity-20 rounded flex items-center justify-center">
                                  <Instagram className="h-3 w-3" />
                                </div>
                              )}
                              {footerSettings.socialLinks.youtube && (
                                <div className="w-6 h-6 bg-white bg-opacity-20 rounded flex items-center justify-center">
                                  <Youtube className="h-3 w-3" />
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Quick Links */}
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Quick Links</h4>
                          <div className="space-y-1 text-xs">
                            <div className="hover:opacity-80 cursor-pointer">
                              About Us
                            </div>
                            <div className="hover:opacity-80 cursor-pointer">
                              Our Tours
                            </div>
                            <div className="hover:opacity-80 cursor-pointer">
                              Contact
                            </div>
                            <div className="hover:opacity-80 cursor-pointer">
                              Privacy Policy
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
