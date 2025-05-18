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
      {/* Enhanced background with cultural texture and warm gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 opacity-80 z-0"></div>
      
      {/* Cultural pattern overlay - using a more distinct cultural textile pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?q=80&w=2000&auto=format&fit=crop')] bg-repeat z-0"></div>
      
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
        
        {/* Improved search box area with card styling */}
        <div 
          className={`w-full max-w-3xl mt-4 rounded-xl p-8 bg-white/90 backdrop-blur-sm border border-amber-100 shadow-lg transition-all duration-700 ease-out ${
            animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{transitionDelay: '400ms', boxShadow: '0 10px 40px rgba(254, 215, 170, 0.3)'}}
        >
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

        {/* Phone mockup and features section */}
        <div 
          className={`mt-16 w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-12 transition-all duration-700 ease-out ${
            animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{transitionDelay: '500ms'}}
        >
          {/* Tour operator carousel */}
          <div className="w-full md:w-1/2 relative">
            <Carousel className="max-w-md mx-auto">
              <CarouselContent>
                {operatorImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <div className="rounded-xl overflow-hidden aspect-[4/3] relative">
                        <img 
                          src={image.url} 
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                          <div className="p-6 text-left">
                            <p className="text-white text-base font-medium mb-1">"{image.quote}"</p>
                            <p className="text-amber-200 text-sm">— {image.name}, {image.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
          
          {/* App benefits/features */}
          <div className="w-full md:w-1/2 space-y-6 text-left">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Stop losing customers to competitors</h3>
            
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
      </section>
    </div>
  );
};

export default Hero;
