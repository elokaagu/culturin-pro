"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "../../lib/navigation";
import { 
  MotionText, 
  MotionButton, 
  MotionFloat,
  ScrollProgress
} from "@/components/motion";

const Index = () => {
  // Add a smooth scroll effect when the page loads
  useEffect(() => {
    // Add a smooth scroll behavior to the entire page
    document.documentElement.style.scrollBehavior = "smooth";

    // Cleanup function to remove the style when component unmounts
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <ScrollProgress />
      <Header type="traveler" />
      <main className="flex-1">
        {/* Hero Section - Full View Height */}
        <section className="h-full flex flex-col justify-center items-center text-center px-4 relative bg-gradient-to-br from-blue-50 to-indigo-100">
          {/* Background Video */}
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-40"
              style={{ filter: 'brightness(0.6)' }}
            >
              <source src="/videos/hero_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>

          {/* Content */}
          <div className="relative z-20 max-w-4xl mx-auto px-6">
            {/* Main Headline with staggered animation */}
            <MotionText delay={0.2}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
                Own your bookings.
                <br />
                Tell richer stories.
                <br />
                Grow your cultural tour brand.
              </h1>
            </MotionText>

            {/* Subtitle */}
            <MotionText delay={0.4}>
              <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto drop-shadow-md">
                Get more direct bookings, build guest loyalty, and craft
                unforgettable cultural journeys.
              </p>
            </MotionText>

            {/* Action Buttons with floating animation */}
            <MotionFloat>
              <MotionText delay={0.6}>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <MotionButton
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg rounded-lg"
                    asChild
                  >
                    <Link to="/how-it-works">
                      <Play className="h-5 w-5 mr-2" />
                      How It Works
                    </Link>
                  </MotionButton>

                  <MotionButton
                    className="border-2 border-white hover:border-gray-200 text-white hover:text-gray-100 px-8 py-4 text-lg font-semibold shadow-lg bg-white bg-opacity-10 backdrop-blur-sm rounded-lg"
                    asChild
                  >
                    <Link to="/sign-in">
                      Login
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </MotionButton>
                </div>
              </MotionText>
            </MotionFloat>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
