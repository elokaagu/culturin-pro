
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import Image from "@/components/ui/image";

const Hero = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  useEffect(() => {
    // Trigger animations on component mount (page load)
    setAnimateItems(true);
  }, []);

  const operatorImages = [
    {
      url: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=1000&auto=format&fit=crop",
      alt: "Tour guide leading a cultural food tour",
      name: "Maya",
      location: "Bangkok Food Tours",
      quote: "Culturin helped me grow direct bookings by 34% in just 2 months."
    },
    {
      url: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1000&auto=format&fit=crop",
      alt: "Happy museum guide with visitors",
      name: "Carlos",
      location: "Mexico City Heritage Walks",
      quote: "I finally cut out the middlemen and increased profit margins by 28%."
    },
    {
      url: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=1000&auto=format&fit=crop",
      alt: "Tour operator showing historical site",
      name: "Ayo",
      location: "Nigeria Roots Tours",
      quote: "My direct bookings are up 3x since I started using Culturin!"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen relative bg-white">
      {/* Simple clear background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 z-0"></div>
      
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 pt-24 pb-28 max-w-7xl mx-auto relative z-10">
        {/* Rating badge */}
        <div className="mb-6">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm bg-amber-100 text-amber-800 font-medium">
            #1 Top-Rated Cultural Experience Platform <span className="font-semibold text-amber-600 ml-1">4.8 ★</span> across 279 reviews
          </span>
        </div>
        
        {/* Headline */}
        <h1 
          className={`font-inter text-4xl md:text-5xl lg:text-6xl text-black mb-6 font-bold tracking-tight leading-tight transition-all duration-700 ease-out ${
            animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{transitionDelay: '200ms'}}
        >
          Own your bookings. Tell richer stories. Grow your cultural tour brand.
        </h1>
        
        {/* Subheadline */}
        <p 
          className={`text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-10 transition-all duration-700 ease-out ${
            animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{transitionDelay: '300ms'}}
        >
          Get more direct bookings, build guest loyalty, and craft unforgettable cultural journeys — without using five different tools.
        </p>
        
        {/* Main content with iPhone mockup and searchbox side by side */}
        <div 
          className={`w-full max-w-6xl mt-4 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 transition-all duration-700 ease-out ${
            animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{transitionDelay: '400ms'}}
        >
          {/* Left side: iPhone mockup */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            <div className="relative w-[280px] md:w-[320px]">
              {/* iPhone frame */}
              <div className="relative rounded-[40px] overflow-hidden border-8 border-gray-800 w-full aspect-[9/19] bg-white shadow-xl">
                {/* App screen content */}
                <div className="absolute inset-0 overflow-hidden">
                  {/* Phone status bar */}
                  <div className="h-6 bg-gray-800 w-full"></div>
                  
                  {/* App header */}
                  <div className="bg-white p-3 border-b">
                    <div className="h-6 flex items-center">
                      <div className="w-24 h-4 bg-amber-500 rounded"></div>
                    </div>
                  </div>
                  
                  {/* App content - cultural experience example */}
                  <div className="p-3 h-full overflow-y-auto">
                    <div className="rounded-lg overflow-hidden mb-3">
                      <img 
                        src="https://images.unsplash.com/photo-1466442929976-97f336a657be" 
                        alt="Cultural tour experience"
                        className="w-full h-40 object-cover"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-8 w-20 bg-amber-500 rounded"></div>
                      <div className="h-8 w-16 bg-gray-200 rounded"></div>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden mb-3">
                      <img 
                        src="https://images.unsplash.com/photo-1469041797191-50ace28483c3" 
                        alt="Cultural tour experience"
                        className="w-full h-32 object-cover"
                      />
                    </div>
                    
                    <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-2/3 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  </div>
                </div>
                
                {/* iPhone notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-5 w-36 bg-gray-800 rounded-b-xl"></div>
              </div>
              
              {/* Reflection effect */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-[40px]"></div>
            </div>
          </div>
          
          {/* Right side: Improved search box area with card styling */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-xl p-8 bg-white shadow-lg border border-gray-100">
              <div className="text-left mb-5 flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 mr-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-lg font-medium">
                  Discover where you're losing bookings (and how to fix it)
                </h3>
              </div>
              
              <div className="flex gap-3 flex-col md:flex-row">
                <Input 
                  placeholder="Enter your tour or experience name" 
                  className="h-14 border-gray-200 text-base"
                />
                <Button className="bg-black hover:bg-gray-800 text-white h-14 px-6 flex items-center gap-2 text-base whitespace-nowrap">
                  Scan my tour for growth leaks
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Trust builder below CTA */}
              <div className="mt-5 pt-5 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-3">Used by over 400 cultural tour leaders — from Accra to Oaxaca</p>
                <div className="flex items-center justify-center gap-3">
                  {operatorImages.map((op, i) => (
                    <div key={i} className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                        <Image 
                          src={op.url} 
                          alt={`${op.name} from ${op.location}`}
                          className="w-full h-full object-cover"
                          aspectRatio="square"
                        />
                      </div>
                    </div>
                  ))}
                  <span className="text-sm text-gray-600 font-medium">+ 397 more</span>
                </div>
              </div>
            </div>
            
            {/* App benefits/features */}
            <div className="mt-12 space-y-6 text-left">
              <h3 className="text-2xl font-bold text-gray-900">Stop losing customers to competitors</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 shrink-0 mt-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Diagnose broken funnels</h4>
                    <p className="text-gray-600 text-sm">See exactly where potential guests drop off in your booking flow</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 shrink-0 mt-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Optimize your presence</h4>
                    <p className="text-gray-600 text-sm">Outrank competitors with data-backed insights on what's working</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600 shrink-0 mt-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Drive direct bookings</h4>
                    <p className="text-gray-600 text-sm">Cut out the middlemen and increase your profit margins by 25%+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
