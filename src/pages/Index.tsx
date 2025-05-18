
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import OperatorInvitation from "@/components/sections/OperatorInvitation";
import TravelWithMeSection from "@/components/sections/TravelWithMeSection";
import JoinCommunity from "@/components/sections/JoinCommunity";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChartBar } from "lucide-react";

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
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-medium mb-6">Explore Culturin Pro Tools</h2>
            <div className="flex justify-center gap-4">
              <Link to="/pro-analytics">
                <Button className="bg-black text-white flex items-center gap-2">
                  <ChartBar size={18} />
                  View Analytics Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>
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
