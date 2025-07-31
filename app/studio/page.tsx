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
  Palette,
  Settings,
  Calendar,
} from "lucide-react";

// Import our modular components
import BookingFlowBuilder from "@/components/pro/website/BookingFlowBuilder";
import BookingWidget from "@/components/pro/website/BookingWidget";
import { sampleItineraries, ItineraryType } from "@/data/itineraryData";
import { useUserData } from "@/src/contexts/UserDataContext";
import Image from "@/components/ui/image";

function StudioContent() {
  const router = useRouter();
  const { userData } = useUserData();
  const [activeTab, setActiveTab] = useState<string>("overview");

  const handleLaunchDashboard = () => {
    router.push("/pro-dashboard");
  };

  // Sample tour for booking preview - ensure we always have a valid ItineraryType
  const sampleItinerary: ItineraryType & {
    price?: number;
    currency?: string;
    groupSize?: { min: number; max: number };
    difficulty?: string;
    tags?: string[];
    modules?: any[];
  } = {
    id: "sample-cultural-tour",
    title: "Traditional Crafts & Local Cuisine",
    description: "Immerse yourself in local traditions and flavors",
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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header type="operator" />
      
      {activeTab === "overview" ? (
        // Split Screen Layout for Overview
        <div className="pt-24 min-h-screen flex">
          {/* Left Side - Welcome Content */}
          <div className="w-1/2 flex items-center justify-center px-12">
            <div className="max-w-lg">
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Welcome to Culturin Studio
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Your all-in-one creative workspace for designing, managing, and
                growing your cultural tourism business.
              </p>
              <div className="flex flex-col gap-4">
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
                  className="text-lg py-6 px-8 rounded-lg h-auto border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Eye className="mr-2 h-5 w-5" />
                  Preview Booking Experience
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                Trusted by cultural experience creators worldwide
              </p>
            </div>
          </div>

          {/* Right Side - Image with Overlay Buttons */}
          <div className="w-1/2 relative">
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2000&auto=format&fit=crop"
                alt="Cultural tourism workspace"
                className="w-full h-full object-cover"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-indigo-900/40" />
            </div>
            
            {/* Overlay Buttons */}
            <div className="absolute inset-0 flex flex-col justify-center items-center space-y-6 p-12">
              <Button
                onClick={() => handleTabChange("overview")}
                className="w-64 h-16 text-lg font-semibold transition-all duration-300 bg-white text-blue-600 shadow-lg scale-105"
              >
                <Palette className="mr-3 h-5 w-5" />
                Studio Overview
              </Button>
              
              <Button
                onClick={() => handleTabChange("booking-builder")}
                className="w-64 h-16 text-lg font-semibold transition-all duration-300 bg-white/90 text-gray-700 hover:bg-white hover:shadow-lg"
              >
                <Settings className="mr-3 h-5 w-5" />
                Booking Builder
              </Button>
              
              <Button
                onClick={() => handleTabChange("booking-preview")}
                className="w-64 h-16 text-lg font-semibold transition-all duration-300 bg-white/90 text-gray-700 hover:bg-white hover:shadow-lg"
              >
                <Calendar className="mr-3 h-5 w-5" />
                Booking Experience
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // Tabbed Layout for Other Sections
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
                    tour={sampleItinerary}
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
      )}
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
