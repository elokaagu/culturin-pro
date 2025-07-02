"use client";

import React from "react";
import { ProtectedRoute } from "@/src/components/auth/ProtectedRoute";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Crown, ArrowRight } from "lucide-react";

// Import our modular components
import FeatureHighlights from "@/components/pro/FeatureHighlights";
import SecuritySection from "@/components/pro/SecuritySection";

function StudioContent() {
  const router = useRouter();

  const handleLaunchDashboard = () => {
    router.push("/pro-dashboard");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header type="operator" />
      <div className="pt-24 pb-12 container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-medium mb-2">Culturin Studio</h1>
            <p className="text-base text-gray-700 max-w-2xl">
              Your creative workspace for building exceptional cultural
              experiences
            </p>
          </div>

          <Button
            onClick={handleLaunchDashboard}
            className="bg-black hover:bg-gray-800 text-white flex items-center py-2 px-4"
          >
            <Crown className="mr-2 h-4 w-4" />
            Launch Dashboard
          </Button>
        </div>

        <div className="space-y-12 animate-fade-in">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to Culturin Studio
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your all-in-one creative workspace for designing, managing, and
              growing your cultural tourism business.
            </p>
            <Button
              onClick={handleLaunchDashboard}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8 rounded-lg h-auto group transition-all duration-300"
            >
              Launch Dashboard
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-gray-500 mt-3">
              Trusted by cultural experience creators worldwide
            </p>
          </div>

          {/* Main sections */}
          <FeatureHighlights />
          <SecuritySection />
        </div>
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
