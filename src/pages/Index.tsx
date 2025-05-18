
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import OperatorInvitation from "@/components/sections/OperatorInvitation";
import TravelWithMeSection from "@/components/sections/TravelWithMeSection";
import JoinCommunity from "@/components/sections/JoinCommunity";

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
        <HowItWorksSection />
        <FeaturesSection />
        <TestimonialSection />
        <OperatorInvitation />
        <TravelWithMeSection />
        <JoinCommunity />
      </main>
    </div>
  );
};

export default Index;
