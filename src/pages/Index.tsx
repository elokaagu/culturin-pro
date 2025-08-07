"use client";

import { useEffect } from "react";
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
    <div className="h-screen flex flex-col overflow-hidden relative">
      <ScrollProgress />
      {/* Transparent Header positioned absolutely */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <header className="w-full bg-transparent backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              <div className="flex items-center">
                <Link
                  to="/"
                  className="flex items-center"
                >
                  <div className="h-12 lg:h-16">
                    <img
                      src="/lovable-uploads/3d2a4fd6-0242-4fb3-bfba-8d3a44eb6e71.png"
                      alt="Culturin"
                      className="h-full w-auto object-contain cursor-pointer filter brightness-0 invert"
                      width={180}
                      height={64}
                    />
                  </div>
                </Link>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <nav>
                  <ul className="flex space-x-10">
                    <li>
                      <Link
                        to="/pricing"
                        className="font-medium text-white hover:text-gray-200 transition-colors"
                      >
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/how-it-works"
                        className="font-medium text-white hover:text-gray-200 transition-colors"
                      >
                        How it works
                      </Link>
                    </li>
                  </ul>
                </nav>
                
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    className="text-white hover:text-gray-200 hover:bg-white/10"
                    asChild
                  >
                    <Link to="/sign-in">Login</Link>
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    asChild
                  >
                    <Link to="/demo">Get a free demo</Link>
                  </Button>
                </div>
              </div>
              
              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-gray-200 hover:bg-white/10"
                  asChild
                >
                  <Link to="/sign-in">Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </header>
      </div>
      
      <main className="flex-1">
        {/* Hero Section - Full View Height */}
        <section className="h-full flex flex-col justify-center items-center text-center px-4 relative">
          {/* Background Video - No overlay */}
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
                    className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 text-lg font-semibold shadow-2xl rounded-xl border border-blue-500 hover:border-blue-400 transition-all duration-300 min-w-[200px] flex items-center justify-center"
                    asChild
                  >
                    <Link to="/how-it-works">
                      <Play className="h-5 w-5 mr-3" />
                      How It Works
                    </Link>
                  </MotionButton>

                  <MotionButton
                    className="border-2 border-white/80 hover:border-white text-white hover:text-white px-10 py-5 text-lg font-semibold shadow-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl transition-all duration-300 min-w-[200px] flex items-center justify-center"
                    asChild
                  >
                    <Link to="/sign-in">
                      Login
                      <ArrowRight className="h-5 w-5 ml-3" />
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
