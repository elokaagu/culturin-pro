"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Star,
  ChevronRight,
  Check,
  Phone,
  Mail,
  MapIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Itinerary as ItineraryType } from "@/hooks/useItineraries";
import { userWebsiteService } from "@/components/pro/website/UserWebsiteService";

type Tour = {
  id: string;
  name: string;
  duration: string;
  price: number;
  image: string;
  description: string;
  highlights: string[];
  rating: number;
  reviews: number;
};

type OperatorData = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  coverImage: string | null;
  theme: string;
  primaryColor?: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  tours: Tour[];
};

export default function TourOperatorPage({
  params,
}: {
  params: { slug: string };
}) {
  const [loading, setLoading] = useState(true);
  const [operatorData, setOperatorData] = useState<OperatorData | null>(null);
  const [theme, setTheme] = useState("classic");
  const [layout, setLayout] = useState("hero-top");
  const [publishedItineraries, setPublishedItineraries] = useState<
    ItineraryType[]
  >([]);

  useEffect(() => {
    const loadData = async () => {
      // Parse theme and layout from slug: e.g. elegant-newspaper-xxxxxx
      const slugParts = params.slug.split("-");
      let parsedTheme = "classic";
      let parsedLayout = "hero-top";
      if (slugParts.length >= 3) {
        parsedTheme = slugParts[0];
        parsedLayout = slugParts[1];
      }
      setTheme(parsedTheme);
      setLayout(parsedLayout);

      // Extract user ID from URL - try multiple patterns
      // URL format: tour/businessname-userid or tour/businessname-userid-timestamp
      let userId = null;

      // First, try to find the published URL directly in localStorage/database
      // Check if this exact slug matches a published URL
      try {
        // Get all possible published URLs from localStorage
        const allKeys = Object.keys(localStorage).filter(
          (key) =>
            key.startsWith("publishedWebsiteUrl_") ||
            key.startsWith("userWebsiteSettings_")
        );

        for (const key of allKeys) {
          try {
            if (key.startsWith("publishedWebsiteUrl_")) {
              const storedUrl = localStorage.getItem(key);
              if (storedUrl === `tour/${params.slug}`) {
                userId = key.replace("publishedWebsiteUrl_", "");
                console.log("Found user ID from published URL:", userId);
                break;
              }
            } else if (key.startsWith("userWebsiteSettings_")) {
              const settings = JSON.parse(localStorage.getItem(key) || "{}");
              if (settings.published_url === `tour/${params.slug}`) {
                userId = key.replace("userWebsiteSettings_", "");
                console.log("Found user ID from settings:", userId);
                break;
              }
            }
          } catch (e) {
            // Skip invalid entries
          }
        }
      } catch (e) {
        console.warn("Error searching for published URL:", e);
      }

      // Fallback: Extract from URL pattern
      if (!userId) {
        const urlParts = params.slug.split("-");
        if (urlParts.length >= 2) {
          // Look for a user ID pattern (8 characters, likely alphanumeric)
          const potentialUserId = urlParts[urlParts.length - 1]; // Last part
          if (
            potentialUserId &&
            potentialUserId.length === 8 &&
            /^[a-f0-9]+$/.test(potentialUserId)
          ) {
            userId = potentialUserId;
          } else {
            // Try second to last part
            const potentialUserId2 = urlParts[urlParts.length - 2];
            if (
              potentialUserId2 &&
              potentialUserId2.length === 8 &&
              /^[a-f0-9]+$/.test(potentialUserId2)
            ) {
              userId = potentialUserId2;
            }
          }
        }
      }

      console.log("Extracted user ID:", userId, "from slug:", params.slug);

      // Load website data - prioritize user customizations
      let websiteData = null;
      let itineraries: ItineraryType[] = [];
      let finalWebsiteSettings = null;

      if (userId) {
        console.log("Loading data for user:", userId);

        // Strategy 1: Try localStorage first (most recent changes)
        try {
          const savedSettings = localStorage.getItem(
            `userWebsiteSettings_${userId}`
          );
          if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            finalWebsiteSettings = {
              companyName: settings.company_name,
              tagline: settings.tagline,
              description: settings.description,
              primaryColor: settings.branding?.primary_color || "#9b87f5",
              headerImage: settings.branding?.header_image,
              theme: settings.branding?.theme || "classic",
              contactEmail: settings.contact_info?.email,
              contactPhone: settings.contact_info?.phone,
              contactAddress: settings.contact_info?.address,
              logo: settings.branding?.logo_url,
            };
            console.log(
              "Loaded from localStorage settings:",
              finalWebsiteSettings
            );
          }
        } catch (e) {
          console.error("Error loading localStorage settings:", e);
        }

        // Strategy 2: Try WebsiteBuilder data
        if (!finalWebsiteSettings) {
          try {
            const websiteDataStr = localStorage.getItem(
              `websiteData_${userId}`
            );
            if (websiteDataStr) {
              const data = JSON.parse(websiteDataStr);
              if (data.settings) {
                finalWebsiteSettings = data.settings;
                console.log("Loaded from websiteData:", finalWebsiteSettings);
              }
            }
          } catch (e) {
            console.error("Error loading websiteData:", e);
          }
        }

        // Strategy 3: Try database
        if (!finalWebsiteSettings) {
          try {
            const dbWebsiteData = await userWebsiteService.getUserWebsiteData(
              userId
            );
            if (dbWebsiteData && dbWebsiteData.settings) {
              finalWebsiteSettings = {
                companyName: dbWebsiteData.settings.company_name,
                tagline: dbWebsiteData.settings.tagline,
                description: dbWebsiteData.settings.description,
                primaryColor:
                  dbWebsiteData.settings.branding?.primary_color || "#9b87f5",
                headerImage: dbWebsiteData.settings.branding?.header_image,
                theme: dbWebsiteData.settings.branding?.theme || "classic",
                contactEmail: dbWebsiteData.settings.contact_info?.email,
                contactPhone: dbWebsiteData.settings.contact_info?.phone,
                contactAddress: dbWebsiteData.settings.contact_info?.address,
                logo: dbWebsiteData.settings.branding?.logo_url,
              };
              console.log("Loaded from database:", finalWebsiteSettings);

              // Also load itineraries from database
              itineraries = dbWebsiteData.itineraries.map((item) => ({
                id:
                  item.id || `tour-${Math.random().toString(36).substr(2, 9)}`,
                title: item.title,
                description:
                  item.description || `Experience the best of ${item.title}.`,
                days: item.days,
                price: item.price || Math.floor(Math.random() * 50) + 40,
                image:
                  item.image ||
                  "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                highlights: item.highlights || [],
                activities: item.activities || [],
                accommodations: item.accommodations || [],
                transportation: item.transportation || [],
                meals: item.meals || [],
                notes: item.notes || [],
                difficulty: "moderate",
                groupSize: { min: 2, max: 12 },
                regions: [],
                tags: [],
                themeType: "cultural",
                operatorId: userId,
                status: "published",
                createdAt: item.created_at || new Date().toISOString(),
                lastUpdated: item.updated_at || new Date().toISOString(),
              }));
            }
          } catch (error) {
            console.error("Error loading from database:", error);
          }
        }

        // Load itineraries if not loaded from database
        if (itineraries.length === 0) {
          try {
            const userItinerariesKey = `userItineraries_${userId}`;
            const itinerariesStr = localStorage.getItem(userItinerariesKey);
            if (itinerariesStr) {
              const savedItineraries = JSON.parse(itinerariesStr);
              itineraries = savedItineraries.filter(
                (item: any) => item.status === "published"
              );
              console.log(
                "Loaded itineraries from localStorage:",
                itineraries.length
              );
            }
          } catch (e) {
            console.error("Error loading itineraries:", e);
          }
        }
      }

      // Set the loaded data
      setPublishedItineraries(itineraries);

      // Store final settings for use below
      websiteData = { settings: finalWebsiteSettings };

      // Load operator data with real user customizations
      const loadedWebsiteSettings = websiteData?.settings;

      // If no customizations found, try the old publishedWebsiteContent as fallback
      let fallbackContent = null;
      if (!loadedWebsiteSettings) {
        const websiteContentStr = localStorage.getItem(
          "publishedWebsiteContent"
        );
        if (websiteContentStr) {
          try {
            fallbackContent = JSON.parse(websiteContentStr);
          } catch (e) {
            console.error("Error parsing fallback website content:", e);
          }
        }
      }

      // Use user customizations first, then fallback content, then defaults
      const websiteSettings = loadedWebsiteSettings || fallbackContent;

      console.log("Final website settings used for display:", websiteSettings);

      // Only show content if it exists from website builder - no fallbacks
      const defaultData: OperatorData = {
        id: params.slug || "demo",
        name: websiteSettings?.companyName || "",
        tagline: websiteSettings?.tagline || "",
        description: websiteSettings?.description || "",
        logo: websiteSettings?.logo || "",
        coverImage: websiteSettings?.headerImage || null,
        theme: websiteSettings?.theme || parsedTheme,
        primaryColor: websiteSettings?.primaryColor || "#9b87f5",
        contact: {
          email: websiteSettings?.contactEmail || "",
          phone: websiteSettings?.contactPhone || "",
          address: websiteSettings?.contactAddress || "",
        },
        tours: [],
      };

      // Convert real itineraries to tours - only use actual data, no fallbacks
      const toursFromItineraries: Tour[] = itineraries.map((itinerary) => ({
        id: itinerary.id || "",
        name: itinerary.title || "",
        duration: itinerary.days
          ? `${itinerary.days} ${itinerary.days === 1 ? "day" : "days"}`
          : "",
        price: itinerary.price || 0,
        image: itinerary.image || "",
        description: itinerary.description || "",
        highlights: itinerary.highlights || [],
        rating: 0, // No fake ratings
        reviews: 0, // No fake reviews
      }));

      // Only use real itineraries, no fallback to sample tours
      defaultData.tours = toursFromItineraries;

      setOperatorData(defaultData);
      setLoading(false);
    };

    // Call the async function
    loadData();
  }, [params.slug]);

  const getThemeStyles = () => {
    const baseColor = operatorData?.primaryColor || "#9b87f5";

    switch (theme) {
      case "modern":
        return {
          headerBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          cardStyle: "border-0 shadow-lg",
          buttonStyle: "rounded-full",
        };
      case "elegant":
        return {
          headerBg: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
          cardStyle: "border border-gray-200",
          buttonStyle: "rounded-none",
        };
      default: // classic
        return {
          headerBg: baseColor,
          cardStyle: "border border-gray-200 rounded-lg",
          buttonStyle: "rounded-md",
        };
    }
  };

  const handleBookNow = (tourId: string) => {
    // Navigate to booking page
    window.location.href = `/tour/${params.slug}/booking/${tourId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!operatorData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Tour Operator Not Found
          </h1>
          <p className="text-gray-600">
            The requested tour operator page could not be found.
          </p>
        </div>
      </div>
    );
  }

  const themeStyles = getThemeStyles();

  // Layout rendering for published site
  const renderLayout = () => {
    // Get the actual website builder content
    const websiteDataStr = localStorage.getItem("websiteData");
    const websiteData = websiteDataStr ? JSON.parse(websiteDataStr) : null;

    // If we have custom website data, render it instead of the default template
    if (websiteData?.settings) {
      return (
        <div className="min-h-screen bg-white">
          {/* Render custom website content based on website builder data */}
          <div className="w-full">
            {/* Custom header/hero section if exists */}
            {websiteData.settings.headerImage && (
              <div
                className="relative h-96 flex items-center justify-center text-white"
                style={{
                  background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${websiteData.settings.headerImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="text-center max-w-4xl px-4">
                  {(websiteData.settings.companyName || operatorData?.name) && (
                    <h1 className="text-5xl font-bold mb-4">
                      {websiteData.settings.companyName || operatorData?.name}
                    </h1>
                  )}
                  {(websiteData.settings.tagline || operatorData?.tagline) && (
                    <p className="text-xl mb-6">
                      {websiteData.settings.tagline || operatorData?.tagline}
                    </p>
                  )}
                  {websiteData.settings.enableBooking && (
                    <Button
                      size="lg"
                      className="bg-white text-gray-900 hover:bg-gray-100 rounded-md"
                    >
                      Book Now
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Render placed blocks from website builder */}
            <div className="container mx-auto px-4 py-12">
              {/* Render custom content blocks if they exist */}
              {websiteData.settings.placedBlocks &&
              websiteData.settings.placedBlocks.length > 0 ? (
                websiteData.settings.placedBlocks
                  .sort((a: any, b: any) => a.position - b.position)
                  .map((block: any) => {
                    const style: React.CSSProperties = {
                      textAlign: block.settings?.textAlign as
                        | "left"
                        | "center"
                        | "right"
                        | "justify",
                      fontSize: block.settings?.fontSize,
                      fontWeight: block.settings?.fontWeight,
                      color: block.settings?.color,
                      backgroundColor: block.settings?.backgroundColor,
                      padding: block.settings?.padding,
                      margin: block.settings?.margin,
                      width: block.settings?.width,
                      height: block.settings?.height,
                      borderRadius: block.settings?.borderRadius,
                      border: block.settings?.border,
                      boxShadow: block.settings?.shadow,
                    };

                    switch (block.blockType) {
                      case "header":
                        return (
                          <header
                            key={block.id}
                            style={style}
                            className="flex justify-between items-center"
                          >
                            {block.content?.logo && (
                              <div className="font-bold text-xl">
                                {block.content.logo}
                              </div>
                            )}
                            <nav className="flex gap-4">
                              {block.content?.navigation?.map(
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
                            {block.content?.cta && (
                              <Button size="sm">{block.content.cta}</Button>
                            )}
                          </header>
                        );

                      case "hero":
                        return (
                          <section
                            key={block.id}
                            style={style}
                            className="flex flex-col items-center justify-center min-h-[400px]"
                          >
                            {block.content?.title && (
                              <h1 className="text-4xl font-bold mb-4">
                                {block.content.title}
                              </h1>
                            )}
                            {block.content?.subtitle && (
                              <p className="text-xl mb-6">
                                {block.content.subtitle}
                              </p>
                            )}
                            {block.content?.ctaText && (
                              <Button size="lg">{block.content.ctaText}</Button>
                            )}
                          </section>
                        );

                      case "text":
                        return block.content?.text ? (
                          <div
                            key={block.id}
                            style={style}
                            className="max-w-3xl mx-auto text-center"
                          >
                            <p>{block.content.text}</p>
                          </div>
                        ) : null;

                      case "heading":
                        return block.content?.text ? (
                          <div
                            key={block.id}
                            style={style}
                            className="max-w-3xl mx-auto text-center"
                          >
                            {block.content.level === "h1" && (
                              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                                {block.content.text}
                              </h1>
                            )}
                            {block.content.level === "h2" && (
                              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                {block.content.text}
                              </h2>
                            )}
                            {block.content.level === "h3" && (
                              <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {block.content.text}
                              </h3>
                            )}
                          </div>
                        ) : null;

                      case "image":
                        return block.content?.src ? (
                          <div
                            key={block.id}
                            style={style}
                            className="max-w-4xl mx-auto"
                          >
                            <img
                              src={block.content.src}
                              alt={block.content?.alt || ""}
                              className="w-full h-auto rounded-lg"
                            />
                            {block.content?.caption && (
                              <p className="text-sm text-gray-600 mt-2 text-center">
                                {block.content.caption}
                              </p>
                            )}
                          </div>
                        ) : null;

                      case "grid":
                        return (
                          <div
                            key={block.id}
                            style={style}
                            className={`grid grid-cols-${
                              block.content?.columns || 2
                            } gap-4 max-w-4xl mx-auto`}
                          >
                            {block.content?.items?.map(
                              (item: any, index: number) => (
                                <div key={index} className="p-4 border rounded">
                                  <h3 className="font-bold">{item.title}</h3>
                                  <p>{item.content}</p>
                                </div>
                              )
                            )}
                          </div>
                        );

                      case "quote":
                        return block.content?.text ? (
                          <blockquote
                            key={block.id}
                            style={style}
                            className="text-center max-w-3xl mx-auto"
                          >
                            <p className="mb-4 text-xl italic">
                              "{block.content.text}"
                            </p>
                            <footer>
                              {block.content?.author && (
                                <cite className="font-bold">
                                  {block.content.author}
                                </cite>
                              )}
                              {block.content?.role && (
                                <span className="text-gray-600">
                                  , {block.content.role}
                                </span>
                              )}
                            </footer>
                          </blockquote>
                        ) : null;

                      default:
                        return block.content?.text ? (
                          <div
                            key={block.id}
                            style={style}
                            className="max-w-3xl mx-auto text-center"
                          >
                            <p>{block.content.text}</p>
                          </div>
                        ) : null;
                    }
                  })
              ) : (
                // Fallback to basic content if no placed blocks
                <>
                  {/* About section if description exists */}
                  {websiteData.settings.description && (
                    <div className="mb-16">
                      <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                          About Us
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                          {websiteData.settings.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Tours/Itineraries section */}
                  {operatorData?.tours && operatorData.tours.length > 0 && (
                    <div className="mb-16">
                      <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Our Tours
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {operatorData.tours.map((tour) => (
                          <Card
                            key={tour.id}
                            className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 rounded-lg"
                          >
                            <div className="aspect-video relative">
                              <img
                                src={tour.image}
                                alt={tour.name}
                                className="w-full h-full object-cover"
                              />
                              {tour.price > 0 && (
                                <div className="absolute top-4 right-4">
                                  <Badge className="bg-white text-gray-900">
                                    €{tour.price}
                                  </Badge>
                                </div>
                              )}
                            </div>
                            <CardContent className="p-6">
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {tour.name}
                              </h3>
                              <p className="text-gray-600 mb-4 line-clamp-2">
                                {tour.description}
                              </p>
                              {tour.duration && (
                                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{tour.duration}</span>
                                  </div>
                                </div>
                              )}
                              {tour.highlights &&
                                tour.highlights.length > 0 && (
                                  <div className="mb-4">
                                    <h4 className="font-medium text-gray-900 mb-2">
                                      Highlights:
                                    </h4>
                                    <ul className="space-y-1">
                                      {tour.highlights
                                        .slice(0, 3)
                                        .map((highlight, index) => (
                                          <li
                                            key={index}
                                            className="flex items-center gap-2 text-sm text-gray-600"
                                          >
                                            <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                                            <span>{highlight}</span>
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                )}
                              <Button
                                className="w-full rounded-md"
                                style={{
                                  backgroundColor:
                                    websiteData.settings.primaryColor ||
                                    operatorData?.primaryColor,
                                }}
                                onClick={() => handleBookNow(tour.id)}
                              >
                                {tour.price > 0
                                  ? `Book Now - €${tour.price}`
                                  : "Book Now"}
                                <ChevronRight className="h-4 w-4 ml-2" />
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Custom footer if specified, otherwise minimal footer */}
            {websiteData.settings.footerContent ? (
              <footer className="bg-gray-900 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: websiteData.settings.footerContent,
                    }}
                  />
                </div>
              </footer>
            ) : (
              <footer className="bg-gray-900 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                  <p className="text-sm text-gray-400">
                    © {new Date().getFullYear()}{" "}
                    {websiteData.settings.companyName || operatorData?.name}.
                    All rights reserved.
                  </p>
                </div>
              </footer>
            )}
          </div>
        </div>
      );
    }
    if (layout === "hero-side") {
      return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-gray-100 to-blue-200 border-4 border-blue-400">
          {/* Hero section */}
          <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-blue-200 to-blue-400 border-r-4 border-blue-300">
            <div className="w-full text-center text-white">
              <h1 className="text-5xl font-extrabold mb-4 tracking-widest drop-shadow-lg">
                {operatorData?.name}
              </h1>
              <p className="text-2xl mb-6 italic font-serif">
                {operatorData?.tagline}
              </p>
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
              {operatorData?.tours.map((tour) => (
                <Card
                  key={tour.id}
                  className="overflow-hidden border-2 border-blue-200 shadow-lg"
                >
                  <div className="aspect-video relative">
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-blue-700 mb-2">
                      {tour.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {tour.description}
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
            {operatorData?.tours.slice(0, 4).map((tour, index) => (
              <Card
                key={tour.id}
                className="bg-white rounded-lg shadow-xl p-4 flex flex-col border-2 border-purple-200"
              >
                <div className="font-bold text-2xl mb-2 text-purple-700">
                  {tour.name}
                </div>
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-32 object-cover rounded mb-2 border border-purple-100"
                />
                <div className="text-xs text-gray-500">{tour.duration}</div>
                <div className="mt-2 text-sm text-gray-700 italic">
                  Feature story: {tour.description?.slice(0, 60)}...
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
            {operatorData?.tours.slice(0, 6).map((tour, index) => (
              <Card
                key={tour.id}
                className="bg-white rounded shadow p-3 flex flex-col border border-gray-300"
              >
                <div className="font-bold mb-1 text-lg text-gray-800">
                  {tour.name}
                </div>
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-20 object-cover rounded mb-1 border border-gray-200"
                />
                <div className="text-xs text-gray-500">{tour.duration}</div>
                <div className="mt-2 text-xs text-gray-700">
                  Column: {tour.description?.slice(0, 40)}...
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
            {operatorData?.tours.map((tour, index) => (
              <div
                key={tour.id}
                className="flex items-center gap-4 border-b pb-3"
              >
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-20 h-20 object-cover rounded-full border-2 border-blue-300"
                />
                <div>
                  <div className="font-semibold text-lg text-blue-700">
                    {tour.name}
                  </div>
                  <div className="text-xs text-gray-500">{tour.duration}</div>
                  <div className="text-xs text-gray-700 mt-1">
                    {tour.description?.slice(0, 50)}...
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
      <>
        {/* Header */}
        <div
          className="relative h-96 flex items-center justify-center text-white"
          style={{
            background: operatorData?.coverImage
              ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${operatorData.coverImage})`
              : themeStyles.headerBg,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-center max-w-4xl px-4">
            <h1 className="text-5xl font-bold mb-4">{operatorData?.name}</h1>
            <p className="text-xl mb-6">{operatorData?.tagline}</p>
            <Button
              size="lg"
              className={cn(
                "bg-white text-gray-900 hover:bg-gray-100",
                themeStyles.buttonStyle
              )}
            >
              Explore Our Tours
            </Button>
          </div>
        </div>
        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          {/* About Section */}
          <div className="mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About Us
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {operatorData?.description}
              </p>
            </div>
          </div>
          {/* Tours Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Our Tours
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {operatorData?.tours.map((tour) => (
                <Card
                  key={tour.id}
                  className={cn(
                    "overflow-hidden hover:shadow-lg transition-shadow",
                    themeStyles.cardStyle
                  )}
                >
                  <div className="aspect-video relative">
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white text-gray-900">
                        €{tour.price}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">
                          {tour.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({tour.reviews} reviews)
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {tour.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {tour.description}
                    </p>
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>Small group</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Highlights:
                      </h4>
                      <ul className="space-y-1">
                        {tour.highlights.slice(0, 3).map((highlight, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      className={cn("w-full", themeStyles.buttonStyle)}
                      style={{ backgroundColor: operatorData?.primaryColor }}
                      onClick={() => handleBookNow(tour.id)}
                    >
                      Book Now - €{tour.price}
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          {/* Contact Section */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Get in Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                <p className="text-gray-600">{operatorData?.contact.phone}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">{operatorData?.contact.email}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapIcon className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                <p className="text-gray-600">{operatorData?.contact.address}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold mb-4">{operatorData?.name}</h3>
            <p className="text-gray-400 mb-6">{operatorData?.tagline}</p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} {operatorData?.name}. All rights
              reserved.
            </p>
          </div>
        </footer>
      </>
    );
  };

  return <>{renderLayout()}</>;
}
