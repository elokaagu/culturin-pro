'use client'

import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import BigBrandsTechSection from "@/components/sections/BigBrandsTechSection";
import FreeGuidesSection from "@/components/sections/FreeGuidesSection";
import NewFooter from "@/components/sections/NewFooter";
import TrustedOperators from "@/components/sections/TrustedOperators";
import MoreTrafficSection from "@/components/sections/MoreTrafficSection";

const Index = () => {
  // Add a smooth scroll effect when the page loads
  useEffect(() => {
    // Add a smooth scroll behavior to the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Cleanup function to remove the style when component unmounts
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header type="traveler" />
      <main className="flex-1">
        <Hero />
        <div className="pt-16">
          <MoreTrafficSection />
        </div>
        <BigBrandsTechSection />
        <TrustedOperators />
        <FreeGuidesSection />
      </main>
      <NewFooter />
    </div>
  );
};

export default Index;
