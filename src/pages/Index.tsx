'use client'

import { useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "../../lib/navigation";

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
    <div className="h-screen flex flex-col overflow-hidden">
      <Header type="traveler" />
      <main className="flex-1">
        {/* Hero Section - Full View Height */}
        <section className="h-full flex flex-col justify-center items-center text-center px-4 relative bg-gradient-to-br from-blue-50 to-indigo-100">
          {/* Background Image */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
               style={{
                 backgroundImage: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2000&auto=format&fit=crop')"
               }}>
          </div>
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Main Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Own your bookings.
              <br />
              Tell richer stories.
              <br />
              Grow your cultural tour brand.
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Get more direct bookings, build guest loyalty, and craft unforgettable cultural journeys.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base font-semibold"
                asChild
              >
                <Link to="/how-it-works">
                  <Play className="h-4 w-4 mr-2" />
                  How It Works
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 text-base font-semibold"
                asChild
              >
                <Link to="/sign-in">
                  Login
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
