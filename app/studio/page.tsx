"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Crown,
  ArrowRight,
  ShoppingCart,
  Eye,
  Globe,
  Users,
} from "lucide-react";

// Import our modular components

import BookingFlowBuilder from "@/components/pro/website/BookingFlowBuilder";
import BookingWidget from "@/components/pro/website/BookingWidget";
import { sampleItineraries, ItineraryType } from "@/data/itineraryData";
import { useUserData } from "@/src/contexts/UserDataContext";

function StudioContent() {
  const router = useRouter();
  const { userData } = useUserData();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLaunchDashboard = () => {
    router.push("/pro-dashboard");
  };

  // Sample tour for booking preview - ensure we always have a valid ItineraryType
  const sampleTour: ItineraryType = sampleItineraries[0] || {
    id: "sample-1",
    title: "Cultural Heritage Experience",
    description: "Immerse yourself in local traditions and history",
    days: 3,
    lastUpdated: "1 day ago",
    status: "published",
    image: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
    themeType: "cultural",
    regions: ["Local Area"],
    price: 150,
    currency: "USD",
    groupSize: { min: 1, max: 8 },
    difficulty: "easy",
    tags: ["traditional crafts", "local cuisine", "historical sites"],
    modules: [],
  };

  return (
    <div className="min-h-screen bg-white">
      <Header type="operator" />
      <div className="pt-24 pb-12 container mx-auto px-4 md:px-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Studio Overview</TabsTrigger>
            <TabsTrigger value="booking-builder">Booking Builder</TabsTrigger>
            <TabsTrigger value="booking-preview">
              Booking Experience
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-12 animate-fade-in">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Welcome to Culturin Studio
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Your all-in-one creative workspace for designing, managing, and
                growing your cultural tourism business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleLaunchDashboard}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8 rounded-lg h-auto group transition-all duration-300"
                >
                  Launch Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("booking-preview")}
                  className="text-lg py-6 px-8 rounded-lg h-auto"
                >
                  <Eye className="mr-2 h-5 w-5" />
                  Preview Booking Experience
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Trusted by cultural experience creators worldwide
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <Globe className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Website Builder</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Create stunning tour operator websites with drag-and-drop
                    tools, customizable themes, and integrated booking systems.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/pro-dashboard/website")}
                  >
                    Build Website
                  </Button>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <ShoppingCart className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Booking System</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Streamline your booking process with automated
                    confirmations, payment processing, and guest management
                    tools.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/pro-dashboard/booking")}
                  >
                    Manage Bookings
                  </Button>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <Eye className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      Analytics & Insights
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Track performance, understand guest behavior, and optimize
                    your business with comprehensive analytics and reporting.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/pro-dashboard/analytics")}
                  >
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                      <Crown className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Marketing Tools</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Create compelling marketing campaigns, social media content,
                    and promotional materials to attract more guests.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/pro-dashboard/marketing")}
                  >
                    Start Marketing
                  </Button>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Guest CRM</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Build lasting relationships with your guests through
                    personalized communication, loyalty programs, and guest
                    management.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/pro-dashboard/crm")}
                  >
                    Manage Guests
                  </Button>
                </CardContent>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                      <ArrowRight className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Itinerary Builder</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Design immersive cultural experiences with our intuitive
                    itinerary builder and experience management tools.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => router.push("/pro-dashboard/itinerary")}
                  >
                    Create Experiences
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="booking-builder" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Booking Flow Builder
                </h2>
                <p className="text-gray-600">
                  Configure your booking experience and payment settings
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("booking-preview")}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview Experience
                </Button>
                <Button onClick={handleLaunchDashboard}>
                  <Globe className="mr-2 h-4 w-4" />
                  Go to Website Builder
                </Button>
              </div>
            </div>
            <BookingFlowBuilder />
          </TabsContent>

          <TabsContent value="booking-preview" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Booking Experience Preview
                </h2>
                <p className="text-gray-600">
                  See exactly how customers will experience your booking flow
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("booking-builder")}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Edit Booking Settings
                </Button>
                <Button onClick={handleLaunchDashboard}>
                  <Crown className="mr-2 h-4 w-4" />
                  Launch Full Dashboard
                </Button>
              </div>
            </div>

            {/* Booking Status Check */}
            {!userData.websiteSettings.enableBooking ? (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
                <ShoppingCart className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-orange-800 mb-2">
                  Booking is Currently Disabled
                </h3>
                <p className="text-orange-600 mb-4">
                  Enable booking in the Booking Builder to preview the customer
                  experience.
                </p>
                <Button
                  onClick={() => setActiveTab("booking-builder")}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Enable Booking
                </Button>
              </div>
            ) : (
              <div className="bg-white border rounded-lg p-6">
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    Live Booking Preview
                  </h3>
                  <p className="text-blue-600 text-sm">
                    This is exactly how your customers will see and interact
                    with your booking system. All settings are applied from your
                    Booking Builder configuration.
                  </p>
                </div>
                <BookingWidget
                  tour={sampleTour}
                  primaryColor={userData.websiteSettings.primaryColor}
                  companyName={
                    userData.websiteSettings.companyName ||
                    userData.businessName
                  }
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function StudioPage() {
  return (
    <ProtectedRoute requireStudioAccess={true}>
      <StudioContent />
    </ProtectedRoute>
  );
}
