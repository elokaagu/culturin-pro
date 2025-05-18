
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  useEffect(() => {
    // Trigger animations on component mount (page load)
    setAnimateItems(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative bg-white">
      {/* Notification banner at top */}
      <div className="bg-black text-white py-3 px-4 text-center">
        <p className="text-sm font-medium">
          🎉 BREAKING NEWS: We've just raised $120M. <Link to="/blog" className="underline hover:text-gray-300">Read our memo</Link> &rarr;
        </p>
      </div>
      
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 pt-24 pb-28 max-w-7xl mx-auto">
        {/* Subtle badge/tag */}
        <div className="mb-6">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm bg-gray-100 text-gray-800 font-medium">
            #1 Top-Rated Cultural Experience Platform <span className="font-semibold text-amber-500 ml-1">4.8 ★</span> across 279 reviews
          </span>
        </div>
        
        {/* Main headline */}
        <h1 
          className={`font-inter text-5xl md:text-6xl lg:text-7xl text-black mb-10 font-semibold tracking-tight leading-tight transition-all duration-700 ease-out ${
            animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{transitionDelay: '200ms'}}
        >
          See where your cultural <br className="hidden md:block" />
          experiences are losing sales
        </h1>
        
        {/* Search box area */}
        <div className="w-full max-w-3xl mt-8 rounded-xl p-10 bg-white border border-gray-100 shadow-soft">
          <div className="text-left mb-6 flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black mr-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="text-lg font-medium">
              See how much sales you could get from keywords
            </h3>
          </div>
          
          <div className="flex gap-3">
            <Input 
              placeholder="Find your experience name" 
              className="h-14 border-gray-200 text-base"
            />
            <Button className="bg-black text-white h-14 px-6 flex items-center gap-2 text-base">
              Get my report
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-16 w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Mobile mockup display */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative mx-auto" style={{ maxWidth: "280px" }}>
              {/* Phone frame */}
              <div className="relative z-10 border-8 border-black rounded-[36px] overflow-hidden shadow-xl">
                <div className="aspect-[9/19]">
                  <img 
                    src="/lovable-uploads/8be44817-c794-41ca-a731-2e013805f703.png" 
                    alt="Culturin Pro mobile app" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-5 bg-black rounded-b-lg"></div>
              </div>
              {/* Glow effect */}
              <div className="absolute -bottom-4 -left-4 -right-4 h-36 bg-gradient-to-t from-blue-500/30 to-transparent rounded-full blur-2xl z-0"></div>
            </div>
          </div>
          
          {/* App highlights */}
          <div className="w-full md:w-1/2 space-y-5 text-left">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 shrink-0 mt-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                  <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lg">Real-time Analytics</h3>
                <p className="text-gray-600 text-sm">Track bookings and customer engagement with detailed analytics</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 shrink-0 mt-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lg">Booking Management</h3>
                <p className="text-gray-600 text-sm">Handle reservations, payments, and guest communications in one place</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 shrink-0 mt-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <path d="M16 2v4"></path>
                  <path d="M8 2v4"></path>
                  <path d="M3 10h18"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-lg">Itinerary Builder</h3>
                <p className="text-gray-600 text-sm">Create and share beautiful itineraries with your guests</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
