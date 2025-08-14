"use client";

import React, { useState } from "react";
import { ProtectedRoute } from "@/src/components/auth/ProtectedRoute";
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
  LogOut,
  User,
  Shield,
  Mail,
  Key,
} from "lucide-react";
import { useAuth } from "@/src/components/auth/AuthProvider";

// Import our modular components
import BookingFlowBuilder from "@/components/pro/website/BookingFlowBuilder";
import BookingWidget from "@/components/pro/website/BookingWidget";
import { ItineraryType } from "@/data/itineraryData";
import { useUserData } from "@/src/contexts/UserDataContext";
import Image from "@/components/ui/image";

function StudioContent() {
  const router = useRouter();
  const { userData } = useUserData();
  const { user, logout, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("overview");

  const handleLaunchDashboard = () => {
    router.push("/pro-dashboard");
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
    }
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

      {/* User Authentication Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  {user?.email || "User"}
                </span>
                <span className="text-xs text-gray-500">
                  {isLoggedIn ? "Authenticated" : "Guest"}
                </span>
              </div>

            </div>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/pro-dashboard")}
              className="text-sm"
            >
              <Globe className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/pro-dashboard/itinerary")}
              className="text-sm"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Itineraries
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/pro-dashboard/marketing")}
              className="text-sm"
            >
              <Palette className="h-4 w-4 mr-2" />
              Marketing
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-sm text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/pro-dashboard")}
              className="text-xs px-2 py-1"
            >
              <Globe className="h-3 w-3 mr-1" />
              Dashboard
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-xs px-2 py-1 text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="h-3 w-3 mr-1" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {activeTab === "overview" ? (
        // Split Screen Layout for Overview
        <div className="min-h-screen flex flex-col lg:flex-row">
          {/* Left Side - Welcome Content */}
          <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8 lg:px-12 pt-16 sm:pt-20 lg:pt-24">
            <div className="max-w-lg text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Welcome to Culturin Studio
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Your all-in-one creative workspace for designing, managing, and
                growing your cultural tourism business.
              </p>
              <div className="flex flex-col gap-3 sm:gap-4">
                <Button
                  onClick={handleLaunchDashboard}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg py-4 sm:py-6 px-6 sm:px-8 rounded-lg h-auto group transition-all duration-300 w-full sm:w-auto"
                >
                  Launch Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("booking-preview")}
                  className="text-base sm:text-lg py-4 sm:py-6 px-6 sm:px-8 rounded-lg h-auto border-gray-300 text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
                >
                  <Eye className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Preview Booking Experience
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4 sm:mt-6">
                Trusted by cultural experience creators worldwide
              </p>
            </div>
          </div>

          {/* Right Side - Image with Overlay Buttons */}
          <div className="w-full lg:w-1/2 relative h-64 sm:h-80 lg:h-full">
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
            <div className="absolute inset-0 flex flex-col justify-center items-center space-y-3 sm:space-y-6 p-4 sm:p-8 lg:p-12">
              <Button
                onClick={() => handleTabChange("overview")}
                className="w-full sm:w-64 h-12 sm:h-16 text-sm sm:text-lg font-semibold transition-all duration-300 bg-white text-blue-600 shadow-lg scale-105"
              >
                <Palette className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                Studio Overview
              </Button>

              <Button
                onClick={() => handleTabChange("booking-builder")}
                className="w-full sm:w-64 h-12 sm:h-16 text-sm sm:text-lg font-semibold transition-all duration-300 bg-white/90 text-gray-700 hover:bg-white hover:shadow-lg"
              >
                <Settings className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                Booking Builder
              </Button>

              <Button
                onClick={() => handleTabChange("booking-preview")}
                className="w-full sm:w-64 h-12 sm:h-16 text-sm sm:text-lg font-semibold transition-all duration-300 bg-white/90 text-gray-700 hover:bg-white hover:shadow-lg"
              >
                <Calendar className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                Booking Experience
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // Tabbed Layout for Other Sections
        <div className="pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 container mx-auto px-4 sm:px-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4 sm:space-y-6"
          >
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">Studio Overview</TabsTrigger>
              <TabsTrigger value="booking-builder" className="text-xs sm:text-sm">Booking Builder</TabsTrigger>
              <TabsTrigger value="booking-preview" className="text-xs sm:text-sm">
                Booking Experience
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="overview"
              className="space-y-12 animate-fade-in"
            >
              {/* Hero Section */}
              <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                  Welcome to Culturin Studio
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
                  Your all-in-one creative workspace for designing, managing,
                  and growing your cultural tourism business.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                  <Button
                    onClick={handleLaunchDashboard}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg py-4 sm:py-6 px-6 sm:px-8 rounded-lg h-auto group transition-all duration-300 w-full sm:w-auto"
                  >
                    Launch Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("booking-preview")}
                    className="text-base sm:text-lg py-4 sm:py-6 px-6 sm:px-8 rounded-lg h-auto w-full sm:w-auto"
                  >
                    <Eye className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Preview Booking Experience
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Trusted by cultural experience creators worldwide
                </p>
              </div>
            </TabsContent>

            <TabsContent value="booking-builder" className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">
                    Booking Flow Builder
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    Configure your booking experience and payment settings
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("booking-preview")}
                    className="w-full sm:w-auto text-sm"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview Experience
                  </Button>
                  <Button onClick={handleLaunchDashboard} className="w-full sm:w-auto text-sm">
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
              <div className="bg-white border rounded-lg p-6">
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    Live Booking Preview
                  </h3>
                  <p className="text-blue-600 text-sm">
                    This is exactly how your customers will see and interact
                    with your booking system. All settings are applied from
                    your Booking Builder configuration.
                  </p>
                </div>
                <BookingWidget
                  tour={sampleItinerary}
                  primaryColor="#9b87f5"
                  companyName="Your Business"
                />
              </div>
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
