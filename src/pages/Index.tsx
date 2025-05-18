
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import OperatorInvitation from "@/components/sections/OperatorInvitation";
import TravelWithMeSection from "@/components/sections/TravelWithMeSection";
import JoinCommunity from "@/components/sections/JoinCommunity";
import TrustedOperators from "@/components/sections/TrustedOperators";
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
        
        {/* Trusted by operators banner */}
        <section className="py-12 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-medium mb-2">Trusted by thousands of tour operators</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join the community of tour operators who have transformed their businesses with Culturin Pro
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center justify-items-center mt-8">
              <div className="flex items-center justify-center">
                <img src="/lovable-uploads/1a12120c-6cfd-4fe3-9571-0ea00be99ff3.png" alt="Partner logo" className="h-12 w-auto opacity-80" />
              </div>
              <div className="flex items-center justify-center">
                <img src="/lovable-uploads/1b4ba777-0a40-4904-98a9-11b727de21a6.png" alt="Partner logo" className="h-12 w-auto opacity-80" />
              </div>
              <div className="flex items-center justify-center">
                <img src="/lovable-uploads/2e9a9e9e-af76-4913-8148-9fce248d55c9.png" alt="Partner logo" className="h-12 w-auto opacity-80" />
              </div>
              <div className="flex items-center justify-center">
                <img src="/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png" alt="Partner logo" className="h-12 w-auto opacity-80" />
              </div>
            </div>
          </div>
        </section>
        
        <HowItWorksSection />
        <TrustedOperators />
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
