"use client";

import React, { useState } from "react";
import { useNavigate } from "../../lib/navigation";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Import our modular components
import FeatureHighlights from "./pro/FeatureHighlights";
import SecuritySection from "./pro/SecuritySection";

const CulturinPro = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    setIsLoading(true);

    // Simulate loading
    setTimeout(() => {
      // Store access in localStorage
      localStorage.setItem("culturinProAccess", "true");

      toast({
        title: "Welcome to Culturin Pro!",
        description: "Your access has been activated.",
      });

      // Navigate to pro dashboard
      navigate("/pro-dashboard");

      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to Culturin Pro
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your all in one platform for creating, managing, and growing your
          cultural tourism business.
        </p>
        <Button
          onClick={handleGetStarted}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8 rounded-lg h-auto group transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Setting up your access..." : "Launch Dashboard"}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
        <p className="text-sm text-gray-500 mt-3">
          Trusted by 1,000+ cultural experience creators worldwide
        </p>
      </div>

      {/* Main sections - simplified */}
      {/* <FeatureHighlights /> */}
      {/* <SecuritySection /> */}
    </div>
  );
};

export default CulturinPro;
