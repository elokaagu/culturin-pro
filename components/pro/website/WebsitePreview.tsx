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
  viewMode?: 'desktop' | 'mobile' | 'tablet';
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({
  itineraries = [],
  refreshKey: externalRefreshKey,
  viewMode: externalViewMode,
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile' | 'tablet'>(externalViewMode || "desktop");
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
    placedBlocks,
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

  // Update viewMode when external viewMode changes
  useEffect(() => {
    if (externalViewMode) {
      setViewMode(externalViewMode as 'desktop' | 'mobile' | 'tablet');
    }
  }, [externalViewMode]);

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
      case "adventure":
        return {
          heroClass: "bg-gradient-to-r from-green-600 to-green-800",
          cardClass: "bg-white shadow-xl rounded-xl border border-green-200",
          headerTextClass: "text-white",
          buttonClass: "bg-green-600 hover:bg-green-700 text-white",
          navClass: "bg-green-50",
          fontFamily: "Inter",
        };
      case "luxury":
        return {
          heroClass: "bg-gradient-to-r from-purple-600 to-purple-800",
          cardClass: "bg-white shadow-xl rounded-xl border border-purple-200",
          headerTextClass: "text-white",
          buttonClass: "bg-purple-600 hover:bg-purple-700 text-white",
          navClass: "bg-purple-50",
          fontFamily: "Playfair Display",
        };
      case "city-tours":
        return {
          heroClass: "bg-gradient-to-r from-blue-600 to-blue-800",
          cardClass: "bg-white shadow-xl rounded-xl border border-blue-200",
          headerTextClass: "text-white",
          buttonClass: "bg-blue-600 hover:bg-blue-700 text-white",
          navClass: "bg-blue-50",
          fontFamily: "Inter",
        };
      case "cultural":
        return {
          heroClass: "bg-gradient-to-r from-red-600 to-red-800",
          cardClass: "bg-white shadow-xl rounded-xl border border-red-200",
          headerTextClass: "text-white",
          buttonClass: "bg-red-600 hover:bg-red-700 text-white",
          navClass: "bg-red-50",
          fontFamily: "Merriweather",
        };
      case "eco-tourism":
        return {
          heroClass: "bg-gradient-to-r from-green-500 to-green-700",
          cardClass: "bg-white shadow-xl rounded-xl border border-green-200",
          headerTextClass: "text-white",
          buttonClass: "bg-green-600 hover:bg-green-700 text-white",
          navClass: "bg-green-50",
          fontFamily: "Inter",
        };
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

  // Render placed blocks from drag & drop builder
  const renderPlacedBlocks = () => {
    if (!placedBlocks || placedBlocks.length === 0) {
      return null;
    }

    return (
      <div className="space-y-4">
        {placedBlocks
          .sort((a, b) => a.position - b.position)
          .map((block) => {
            const style: React.CSSProperties = {
              textAlign: block.settings.textAlign as
                | "left"
                | "center"
                | "right"
                | "justify",
              fontSize: block.settings.fontSize,
              fontWeight: block.settings.fontWeight,
              color: block.settings.color,
              backgroundColor: block.settings.backgroundColor,
              padding: block.settings.padding,
              margin: block.settings.margin,
              width: block.settings.width,
              height: block.settings.height,
              borderRadius: block.settings.borderRadius,
              border: block.settings.border,
              boxShadow: block.settings.shadow,
            };

            switch (block.blockType) {
              case "header":
                return (
                  <header
                    key={block.id}
                    style={style}
                    className="flex justify-between items-center"
                  >
                    <div className="font-bold text-xl">
                      {block.content.logo}
                    </div>
                    <nav className="flex gap-4">
                      {block.content.navigation.map(
                        (item: string, index: number) => (
                          <a
                            key={index}
                            href="#"
                            className="hover:text-blue-600"
                          >
                            {item}
                          </a>
                        )
                      )}
                    </nav>
                    <Button size="sm">{block.content.cta}</Button>
                  </header>
                );

              case "footer":
                return (
                  <footer
                    key={block.id}
                    style={style}
                    className="flex flex-col gap-4"
                  >
                    <div className="font-bold">{block.content.companyName}</div>
                    <div className="flex gap-4">
                      {block.content.links.map(
                        (link: string, index: number) => (
                          <a key={index} href="#" className="hover:underline">
                            {link}
                          </a>
                        )
                      )}
                    </div>
                    <div className="flex gap-2">
                      {block.content.socialMedia.map(
                        (social: string, index: number) => (
                          <a key={index} href="#" className="hover:opacity-80">
                            {social}
                          </a>
                        )
                      )}
                    </div>
                  </footer>
                );

              case "hero":
                return (
                  <section
                    key={block.id}
                    style={style}
                    className="flex flex-col items-center justify-center min-h-[400px]"
                  >
                    <h1 className="text-4xl font-bold mb-4">
                      {block.content.title}
                    </h1>
                    <p className="text-xl mb-6">{block.content.subtitle}</p>
                    <Button size="lg">{block.content.ctaText}</Button>
                  </section>
                );

              case "text":
                return (
                  <div key={block.id} style={style}>
                    <p>{block.content.text}</p>
                  </div>
                );

              case "heading":
                return (
                  <div key={block.id} style={style}>
                    {block.content.level === "h1" && (
                      <h1>{block.content.text}</h1>
                    )}
                    {block.content.level === "h2" && (
                      <h2>{block.content.text}</h2>
                    )}
                    {block.content.level === "h3" && (
                      <h3>{block.content.text}</h3>
                    )}
                  </div>
                );

              case "image":
                return (
                  <div key={block.id} style={style}>
                    <img
                      src={
                        block.content.src ||
                        "https://via.placeholder.com/400x300?text=Add+Image"
                      }
                      alt={block.content.alt}
                      className="w-full h-auto"
                    />
                    {block.content.caption && (
                      <p className="text-sm text-gray-600 mt-2">
                        {block.content.caption}
                      </p>
                    )}
                  </div>
                );

              case "grid":
                return (
                  <div
                    key={block.id}
                    style={style}
                    className={`grid grid-cols-${block.content.columns} gap-4`}
                  >
                    {block.content.items.map((item: any, index: number) => (
                      <div key={index} className="p-4 border rounded">
                        <h3 className="font-bold">{item.title}</h3>
                        <p>{item.content}</p>
                      </div>
                    ))}
                  </div>
                );

              case "quote":
                return (
                  <blockquote
                    key={block.id}
                    style={style}
                    className="text-center"
                  >
                    <p className="mb-4">"{block.content.text}"</p>
                    <footer>
                      <cite className="font-bold">{block.content.author}</cite>
                      {block.content.role && (
                        <span className="text-gray-600">
                          , {block.content.role}
                        </span>
                      )}
                    </footer>
                  </blockquote>
                );

              case "list":
                return (
                  <div key={block.id} style={style}>
                    {block.content.type === "bullet" ? (
                      <ul className="list-disc list-inside">
                        {block.content.items.map(
                          (item: string, index: number) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ul>
                    ) : (
                      <ol className="list-decimal list-inside">
                        {block.content.items.map(
                          (item: string, index: number) => (
                            <li key={index}>{item}</li>
                          )
                        )}
                      </ol>
                    )}
                  </div>
                );

              case "contact":
                return (
                  <div
                    key={block.id}
                    style={style}
                    className="max-w-md mx-auto"
                  >
                    <h3 className="text-xl font-bold mb-4">
                      {block.content.title}
                    </h3>
                    <form className="space-y-4">
                      {block.content.fields.map(
                        (field: string, index: number) => (
                          <div key={index}>
                            <label className="block text-sm font-medium mb-1">
                              {field}
                            </label>
                            {field === "Message" ? (
                              <textarea
                                className="w-full p-2 border rounded"
                                rows={4}
                              />
                            ) : (
                              <input
                                type="text"
                                className="w-full p-2 border rounded"
                              />
                            )}
                          </div>
                        )
                      )}
                      <Button type="submit" className="w-full">
                        {block.content.submitText}
                      </Button>
                    </form>
                  </div>
                );

              case "booking":
                return (
                  <div
                    key={block.id}
                    style={style}
                    className="max-w-md mx-auto"
                  >
                    <h3 className="text-xl font-bold mb-4">
                      {block.content.title}
                    </h3>
                    <div className="space-y-4">
                      <select className="w-full p-2 border rounded">
                        <option>Select a tour</option>
                        {block.content.tours.map(
                          (tour: string, index: number) => (
                            <option key={index}>{tour}</option>
                          )
                        )}
                      </select>
                      <Button className="w-full">Book Now</Button>
                    </div>
                  </div>
                );

              case "map":
                return (
                  <div
                    key={block.id}
                    style={style}
                    className="bg-gray-200 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                      <p className="font-bold">{block.content.location}</p>
                      <p className="text-sm text-gray-600">
                        {block.content.address}
                      </p>
                    </div>
                  </div>
                );

              default:
                return <div key={block.id}>Unknown block type</div>;
            }
          })}
      </div>
    );
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    toast.success("Preview refreshed", {
      description: "The latest changes have been applied to the preview",
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Website Preview</h2>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Select defaultValue={viewMode} onValueChange={(value) => setViewMode(value as 'desktop' | 'mobile' | 'tablet')}>
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

      <Card className="border border-gray-200 overflow-hidden bg-gray-50 flex-1">
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

                {/* Placed Blocks from Drag & Drop Builder */}
                {renderPlacedBlocks()}

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
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsitePreview;
