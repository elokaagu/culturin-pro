
import React from 'react';
import Header from "@/components/Header";
import CulturinPro from "@/components/CulturinPro";
import { Button } from "@/components/ui/button";
import { CalendarCheck } from "lucide-react";

const CulturinProPage = () => {
  return (
    <div className="min-h-screen">
      <Header type="operator" />
      
      {/* Hero Section with properly styled buttons */}
      <div className="bg-gradient-to-r from-[#1A1A1A] to-[#333333] text-white pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Empower Your Culture</h1>
          <p className="text-xl text-gray-200 mb-10 max-w-3xl">
            Grow your cultural business. Reach global travelers. Share your story.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              size="hero" 
              className="bg-[#1E1E1E] border border-white/20 text-white hover:bg-black"
            >
              Create Experience
            </Button>
            
            <Button 
              size="hero" 
              variant="outline" 
              className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
            >
              <CalendarCheck className="mr-2 h-5 w-5" />
              View Bookings
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Culturin Pro Platform</h2>
        <p className="text-lg text-gray-700 mb-10 max-w-3xl">
          Welcome to Culturin Pro - your professional toolkit for growing and managing your cultural experience business.
        </p>
        <CulturinPro />
      </div>
    </div>
  );
};

export default CulturinProPage;
