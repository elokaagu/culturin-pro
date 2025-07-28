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
import { ItineraryType } from "@/data/itineraryData";

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

    // Get content from localStorage (still only one published site supported for content)
    const publishedContentStr = localStorage.getItem("publishedWebsiteContent");
    const publishedItinerariesStr = localStorage.getItem(
      "publishedItineraries"
    );
    let publishedContent = null;
    let headerImage = null;
    let itineraries: ItineraryType[] = [];
    if (publishedContentStr) {
      try {
        publishedContent = JSON.parse(publishedContentStr);
        headerImage = publishedContent.headerImage;
      } catch (e) {
        console.error("Error parsing published content:", e);
      }
    }
    if (publishedItinerariesStr) {
      try {
        itineraries = JSON.parse(publishedItinerariesStr);
        setPublishedItineraries(itineraries);
      } catch (e) {
        console.error("Error parsing published itineraries:", e);
      }
    }
    // Simulate loading operator data
    setTimeout(() => {
      const defaultData: OperatorData = {
        id: params.slug || "demo",
        name: publishedContent?.companyName || "Culturin Tours",
        tagline:
          publishedContent?.tagline ||
          "Authentic cultural experiences curated by Eloka Agu",
        description:
          publishedContent?.description ||
          "Founded by Eloka Agu, Culturin Tours specializes in immersive cultural experiences that connect travelers with authentic local traditions, stories, and communities around the world.",
        logo: "https://placehold.co/200x80",
        coverImage: headerImage || null,
        theme: parsedTheme,
        primaryColor: publishedContent?.primaryColor || "#9b87f5",
        contact: {
          email: "eloka@culturintours.com",
          phone: "+1 (555) 123-4567",
          address: "Global Cultural Experiences",
        },
        tours: [],
      };
      // Convert itineraries to tours
      const toursFromItineraries: Tour[] = itineraries.map((itinerary) => ({
        id: itinerary.id || `tour-${Math.random().toString(36).substr(2, 9)}`,
        name: itinerary.title,
        duration: `${itinerary.days} ${itinerary.days === 1 ? "day" : "days"}`,
        price: Math.floor(Math.random() * 50) + 40,
        image:
          itinerary.image ||
          "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description:
          itinerary.description || `Experience the best of ${itinerary.title}.`,
        highlights: [
          "Expert local guides",
          "Small groups of max 10 people",
          "Authentic cultural experiences",
        ],
        rating: +(Math.random() * (5 - 4) + 4).toFixed(1),
        reviews: Math.floor(Math.random() * 100) + 50,
      }));
      // If we have itineraries, use those; otherwise fallback to sample tours
      if (toursFromItineraries.length > 0) {
        defaultData.tours = toursFromItineraries;
      } else {
        defaultData.tours = [
          {
            id: "gaudi-tour",
            name: "Gaudí Masterpieces Tour",
            duration: "4 hours",
            price: 65,
            image:
              "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            description:
              "Explore Antoni Gaudí's most famous architectural works including Sagrada Familia and Park Güell with skip-the-line access.",
            highlights: [
              "Skip-the-line Sagrada Familia tickets",
              "Expert architecture guide",
              "Small groups of max 10 people",
            ],
            rating: 4.9,
            reviews: 215,
          },
          {
            id: "tapas-tour",
            name: "Evening Tapas & Wine Tour",
            duration: "3 hours",
            price: 80,
            image:
              "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            description:
              "Discover Barcelona's culinary scene with this guided walking tour of the best tapas bars in the Gothic Quarter and El Born.",
            highlights: [
              "Visit to 4 authentic tapas bars",
              "Wine pairing with each tapa",
              "Food history and cultural insights",
            ],
            rating: 4.8,
            reviews: 182,
          },
          {
            id: "gothic-tour",
            name: "Gothic Quarter Hidden Gems",
            duration: "2.5 hours",
            price: 45,
            image:
              "https://images.unsplash.com/photo-1543783207-ec63e4900aba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            description:
              "Wander through the labyrinthine streets of Barcelona's Gothic Quarter discovering secret squares and hidden history.",
            highlights: [
              "Ancient Roman ruins",
              "Medieval architecture",
              "Local legends and stories",
            ],
            rating: 4.7,
            reviews: 158,
          },
        ];
      }
      setOperatorData(defaultData);
      setLoading(false);
    }, 500);
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
