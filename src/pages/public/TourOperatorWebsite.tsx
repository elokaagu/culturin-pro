"use client";

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "../../../lib/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "@/components/ui/image";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  UtensilsCrossed,
  Camera,
  Star,
  ChevronRight,
  Check,
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
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  tours: Tour[];
};

const TourOperatorWebsite: React.FC = () => {
  const { operatorId } = useParams();
  const [loading, setLoading] = useState(true);
  const [operatorData, setOperatorData] = useState<OperatorData | null>(null);
  const [theme, setTheme] = useState("classic");
  const [publishedItineraries, setPublishedItineraries] = useState<
    ItineraryType[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get theme and content from localStorage (set by the website builder)
    const publishedTheme =
      localStorage.getItem("publishedWebsiteTheme") || "classic";
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

    setTheme(publishedTheme);

    // Simulate loading operator data
    setTimeout(() => {
      const defaultData = {
        id: operatorId || "demo",
        name: "Barcelona Cultural Tours",
        tagline: "Authentic cultural experiences in the heart of Catalonia",
        description:
          "We specialize in small group cultural tours that showcase the real Barcelona beyond the tourist spots. Our expert local guides bring history and culture to life with immersive experiences.",
        logo: "https://placehold.co/200x80",
        coverImage: headerImage || null,
        theme: publishedTheme,
        primaryColor: "#9b87f5",
        contact: {
          email: "info@barcelonaculturaltours.com",
          phone: "+34 932 123 456",
          address: "Carrer de la Diputació 215, 08011 Barcelona, Spain",
        },
        socialMedia: {
          facebook: "https://facebook.com",
          instagram: "https://instagram.com",
          twitter: "https://twitter.com",
        },
        tours: [],
      };

      // Apply published content if available
      if (publishedContent) {
        defaultData.name = publishedContent.companyName || defaultData.name;
        defaultData.tagline = publishedContent.tagline || defaultData.tagline;
        defaultData.description =
          publishedContent.description || defaultData.description;
        defaultData.primaryColor =
          publishedContent.primaryColor || defaultData.primaryColor;
        defaultData.coverImage = publishedContent.headerImage || null;
      }

      // Convert itineraries to tours
      const toursFromItineraries: Tour[] = itineraries.map((itinerary) => ({
        id: itinerary.id || `tour-${Math.random().toString(36).substr(2, 9)}`,
        name: itinerary.title,
        duration: `${itinerary.days} ${itinerary.days === 1 ? "day" : "days"}`,
        price: Math.floor(Math.random() * 50) + 40, // Generate random price between 40-90
        image: itinerary.image || "https://placehold.co/600x400",
        description:
          itinerary.description || `Experience the best of ${itinerary.title}.`,
        highlights: [
          "Expert local guides",
          "Small groups of max 10 people",
          "Authentic cultural experiences",
        ],
        rating: +(Math.random() * (5 - 4) + 4).toFixed(1), // Random rating between 4.0-5.0
        reviews: Math.floor(Math.random() * 100) + 50, // Random number of reviews between 50-150
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
            image: "https://placehold.co/600x400",
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
            image: "https://placehold.co/600x400",
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
            image: "https://placehold.co/600x400",
            description:
              "Wander through the labyrinthine streets of Barcelona's Gothic Quarter discovering secret squares and hidden history.",
            highlights: [
              "Ancient Roman ruins",
              "Medieval architecture",
              "Local stories and legends",
            ],
            rating: 4.7,
            reviews: 124,
          },
        ];
      }

      setOperatorData(defaultData);
      setLoading(false);
    }, 1000);
  }, [operatorId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading tour operator website...</p>
        </div>
      </div>
    );
  }

  // Apply theme styles based on the selected theme
  const getThemeStyles = () => {
    switch (theme.toLowerCase()) {
      case "modern":
        return {
          heroClass: "bg-gradient-to-r from-blue-500 to-purple-600",
          cardClass: "bg-white shadow-xl rounded-xl",
          headerTextClass: "text-white",
          buttonClass: "bg-blue-600 hover:bg-blue-700",
          accentColor: operatorData?.primaryColor || "#3B82F6",
        };
      case "minimalist":
        return {
          heroClass: "bg-white border-b",
          cardClass: "bg-white border shadow-sm rounded-md",
          headerTextClass: "text-black",
          buttonClass: "bg-black hover:bg-gray-800 text-white",
          accentColor: operatorData?.primaryColor || "#000000",
        };
      case "classic":
      default:
        return {
          heroClass: "bg-cover bg-center",
          cardClass: "bg-white shadow-md rounded-lg",
          headerTextClass: "text-white",
          buttonClass: `bg-[${
            operatorData?.primaryColor || "#9b87f5"
          }] hover:bg-opacity-90`,
          accentColor: operatorData?.primaryColor || "#9b87f5",
        };
    }
  };

  const themeStyles = getThemeStyles();
  const primaryColor = operatorData?.primaryColor || "#9b87f5";

  const handleBookNow = (tourId: string) => {
    navigate(`/product/booking-preview/${tourId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Only render if there's a cover image or not minimalist theme */}
      {operatorData?.coverImage || theme.toLowerCase() !== "minimalist" ? (
        <div
          className={cn(
            "h-96 bg-cover bg-center relative",
            themeStyles.heroClass
          )}
          style={{
            backgroundImage:
              theme.toLowerCase() === "minimalist"
                ? "none"
                : operatorData?.coverImage
                ? `url(${operatorData.coverImage})`
                : "none",
            backgroundColor:
              theme.toLowerCase() === "minimalist"
                ? "white"
                : operatorData?.coverImage
                ? undefined
                : primaryColor,
          }}
        >
          <div
            className={
              theme.toLowerCase() !== "minimalist"
                ? "absolute inset-0 bg-black bg-opacity-40"
                : ""
            }
          ></div>
          <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <h1
                className={cn(
                  "text-5xl font-bold mb-4",
                  themeStyles.headerTextClass
                )}
              >
                {operatorData?.name}
              </h1>
              <p
                className={cn(
                  "text-xl max-w-3xl mx-auto",
                  themeStyles.headerTextClass
                )}
              >
                {operatorData?.tagline}
              </p>
              <Button
                size="lg"
                className="mt-8 px-8 py-6 text-lg font-medium rounded-full shadow-lg transition-transform hover:scale-105"
                style={{ backgroundColor: primaryColor }}
              >
                Discover Our Tours <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* About Us section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">About Us</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                {operatorData?.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                className={cn(
                  "p-8 rounded-xl transition-all hover:shadow-xl",
                  themeStyles.cardClass
                )}
              >
                <div className="flex items-center mb-4">
                  <div
                    className="rounded-full p-2"
                    style={{ backgroundColor: `${primaryColor}20` }}
                  >
                    <Users
                      className="h-6 w-6"
                      style={{ color: primaryColor }}
                    />
                  </div>
                  <h3 className="text-xl font-medium ml-3">
                    Local Expert Guides
                  </h3>
                </div>
                <p className="text-gray-600">
                  Our guides are born and raised in Barcelona with deep
                  knowledge of local history and culture.
                </p>
              </div>

              <div
                className={cn(
                  "p-8 rounded-xl transition-all hover:shadow-xl",
                  themeStyles.cardClass
                )}
              >
                <div className="flex items-center mb-4">
                  <div
                    className="rounded-full p-2"
                    style={{ backgroundColor: `${primaryColor}20` }}
                  >
                    <Users
                      className="h-6 w-6"
                      style={{ color: primaryColor }}
                    />
                  </div>
                  <h3 className="text-xl font-medium ml-3">
                    Small Group Sizes
                  </h3>
                </div>
                <p className="text-gray-600">
                  We limit our groups to 10 people to ensure a personalized
                  experience for every guest.
                </p>
              </div>

              <div
                className={cn(
                  "p-8 rounded-xl transition-all hover:shadow-xl",
                  themeStyles.cardClass
                )}
              >
                <div className="flex items-center mb-4">
                  <div
                    className="rounded-full p-2"
                    style={{ backgroundColor: `${primaryColor}20` }}
                  >
                    <Star className="h-6 w-6" style={{ color: primaryColor }} />
                  </div>
                  <h3 className="text-xl font-medium ml-3">
                    Authentic Experiences
                  </h3>
                </div>
                <p className="text-gray-600">
                  Go beyond the tourist trail and experience the real Barcelona
                  like a local.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Our Experiences</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Choose from our carefully crafted tours and experiences
              </p>
            </div>

            <div className="space-y-12">
              {operatorData?.tours.map((tour: Tour) => (
                <Card
                  key={tour.id}
                  className={cn(
                    "overflow-hidden border-0 transition-all hover:shadow-xl",
                    themeStyles.cardClass
                  )}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                    <div
                      className="h-72 md:h-full bg-cover bg-center rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                      style={{ backgroundImage: `url(${tour.image})` }}
                    ></div>
                    <div className="col-span-2 p-8">
                      <h3 className="text-2xl font-semibold mb-3">
                        {tour.name}
                      </h3>

                      <div className="flex items-center text-sm text-gray-500 mb-5 flex-wrap gap-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{tour.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>Max 10 people</span>
                        </div>
                        <div className="flex items-center">
                          <Star
                            className="h-4 w-4 mr-1"
                            style={{ color: primaryColor }}
                          />
                          <span>
                            {tour.rating} ({tour.reviews} reviews)
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-5">{tour.description}</p>

                      <ul className="mb-7 space-y-2">
                        {tour.highlights.map(
                          (highlight: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <div
                                className="flex-shrink-0 rounded-full p-0.5 mt-1"
                                style={{ backgroundColor: `${primaryColor}20` }}
                              >
                                <Check
                                  className="h-3 w-3"
                                  style={{ color: primaryColor }}
                                />
                              </div>
                              <span className="ml-2 text-gray-700">
                                {highlight}
                              </span>
                            </li>
                          )
                        )}
                      </ul>

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">
                          €{tour.price}{" "}
                          <span className="text-sm font-normal text-gray-500">
                            per person
                          </span>
                        </div>
                        <Button
                          className="px-8 font-medium shadow-md transition-transform hover:scale-105"
                          style={{ backgroundColor: primaryColor }}
                          onClick={() => handleBookNow(tour.id)}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Contact Us section */}
          <section className="mb-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Get in touch with our team to plan your perfect experience
              </p>
            </div>

            <div
              className={cn(
                "rounded-xl overflow-hidden",
                themeStyles.cardClass
              )}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
                  <div className="space-y-4">
                    <p className="flex items-center">
                      <MapPin
                        className="h-5 w-5 mr-3"
                        style={{ color: primaryColor }}
                      />
                      <span>{operatorData?.contact.address}</span>
                    </p>
                    <p className="flex items-center">
                      <svg
                        className="h-5 w-5 mr-3"
                        style={{ color: primaryColor }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{operatorData?.contact.email}</span>
                    </p>
                    <p className="flex items-center">
                      <svg
                        className="h-5 w-5 mr-3"
                        style={{ color: primaryColor }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span>{operatorData?.contact.phone}</span>
                    </p>
                  </div>

                  <div className="flex space-x-4 mt-8">
                    <a
                      href={operatorData?.socialMedia.facebook}
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                    <a
                      href={operatorData?.socialMedia.instagram}
                      className="text-gray-600 hover:text-pink-600 transition-colors"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a
                      href={operatorData?.socialMedia.twitter}
                      className="text-gray-600 hover:text-blue-400 transition-colors"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="p-8 bg-gray-50">
                  <h3 className="text-2xl font-semibold mb-6">
                    Send a Message
                  </h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none"
                          style={{ borderColor: `${primaryColor}30` }}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none"
                          style={{ borderColor: `${primaryColor}30` }}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none"
                        style={{ borderColor: `${primaryColor}30` }}
                      ></textarea>
                    </div>
                    <Button
                      className="w-full py-6 font-medium shadow-md"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  {operatorData?.name}
                </h3>
                <p className="text-gray-300 mb-6">{operatorData?.tagline}</p>
                <div className="flex space-x-4">
                  <a
                    href={operatorData?.socialMedia.facebook}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a
                    href={operatorData?.socialMedia.instagram}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href={operatorData?.socialMedia.twitter}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Tours
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-4">Contact</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 mt-0.5" />
                    <span>{operatorData?.contact.address}</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{operatorData?.contact.email}</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>{operatorData?.contact.phone}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 mt-8 text-sm text-gray-400">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p>
                  © {new Date().getFullYear()} {operatorData?.name}. All rights
                  reserved.
                </p>
                <p className="mt-2 md:mt-0">
                  Powered by{" "}
                  <a
                    href="/studio"
                    className="text-white hover:text-opacity-80 font-medium"
                  >
                    Culturin Studio
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TourOperatorWebsite;
