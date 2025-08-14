"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "../../lib/navigation";
import {
  MotionText,
  MotionButton,
  MotionFloat,
  ScrollProgress,
} from "@/components/motion";
import { GlassButton } from "@/components/ui/glass";

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
    <div className="h-screen flex flex-col overflow-hidden relative">
      <ScrollProgress />
      {/* Transparent Header positioned absolutely */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <header className="w-full glass-nav">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16">
                    <img
                      src="/lovable-uploads/3d2a4fd6-0242-4fb3-bfba-8d3a44eb6e71.png"
                      alt="Culturin"
                      className="h-full w-full object-contain cursor-pointer filter brightness-0 invert"
                      width={180}
                      height={64}
                    />
                  </div>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <nav>
                  <ul className="flex space-x-6 lg:space-x-10">
                    <li>
                      <Link
                        to="/pricing"
                        className="font-medium text-white hover:text-gray-200 transition-colors text-sm lg:text-base"
                      >
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/how-it-works"
                        className="font-medium text-white hover:text-gray-200 transition-colors text-sm lg:text-base"
                      >
                        How it works
                      </Link>
                    </li>
                  </ul>
                </nav>

                <div className="flex items-center space-x-3 lg:space-x-4">
                  <GlassButton variant="ghost" size="sm" className="text-xs lg:text-sm">
                    <Link to="/sign-in">Login</Link>
                  </GlassButton>
                  <GlassButton variant="primary" size="sm" className="text-xs lg:text-sm">
                    <Link to="/demo">Get a free demo</Link>
                  </GlassButton>
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="md:hidden flex items-center space-x-2">
                <GlassButton variant="ghost" size="sm" className="text-xs px-2 py-1">
                  <Link to="/sign-in">Login</Link>
                </GlassButton>
                <GlassButton variant="primary" size="sm" className="text-xs px-2 py-1">
                  <Link to="/demo">Demo</Link>
                </GlassButton>
              </div>
            </div>
          </div>
        </header>
      </div>

      <main className="flex-1">
        {/* Hero Section - Full View Height */}
        <section className="h-full flex flex-col justify-center items-center text-center px-4 relative">
          {/* Background Video */}
          <div className="absolute inset-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/hero_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Dark Overlay for Better Contrast */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>

          {/* Content */}
          <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6">
            {/* Main Headline with staggered animation */}
            <MotionText delay={0.2}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 leading-tight drop-shadow-lg px-2">
                Own your bookings.
                <br className="hidden sm:block" />
                Tell richer stories.
                <br className="hidden sm:block" />
                Grow your cultural tour brand.
              </h1>
            </MotionText>

            {/* Subtitle */}
            <MotionText delay={0.4}>
              <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-8 sm:mb-10 max-w-2xl mx-auto drop-shadow-md px-4">
                Get more direct bookings, build guest loyalty, and craft
                unforgettable cultural journeys.
              </p>
            </MotionText>

            {/* Action Buttons with floating animation */}
            <MotionFloat>
              <MotionText delay={0.6}>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
                  <MotionButton asChild>
                    <Link
                      to="/how-it-works"
                      className="glass-button glass-blue px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-lg flex items-center justify-center w-full sm:w-auto"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      How It Works
                    </Link>
                  </MotionButton>

                  <MotionButton asChild>
                    <Link
                      to="/sign-in"
                      className="glass-button px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded-lg flex items-center justify-center w-full sm:w-auto"
                    >
                      Login
                      <ArrowRight className="h-4 w-4 ml-2" />
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
