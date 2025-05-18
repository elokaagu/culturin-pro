
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
      {/* Removed announcement banner */}
      
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 pt-24 pb-28 max-w-7xl mx-auto">
        {/* Rating badge */}
        <div className="mb-6">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm bg-gray-100 text-gray-800 font-medium">
            #1 Top-Rated Cultural Experience Platform <span className="font-semibold text-amber-500 ml-1">4.8 ★</span> across 279 reviews
          </span>
        </div>
        
        {/* Main headline */}
        <h1 
          className={`font-inter text-5xl md:text-6xl lg:text-7xl text-black mb-6 font-bold tracking-tight leading-tight transition-all duration-700 ease-out ${
            animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{transitionDelay: '200ms'}}
        >
          See why cultural tour operators <br className="hidden md:block" />
          are losing bookings — and how to fix it
        </h1>
        
        {/* Subheadline */}
        <p 
          className={`text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-10 transition-all duration-700 ease-out ${
            animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{transitionDelay: '300ms'}}
        >
          Culturin helps you own your guest relationships, boost direct bookings, and tell better stories — all in one platform.
        </p>
        
        {/* Search box area */}
        <div 
          className={`w-full max-w-3xl mt-4 rounded-xl p-8 bg-white border border-gray-100 shadow-soft transition-all duration-700 ease-out ${
            animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{transitionDelay: '400ms'}}
        >
          <div className="text-left mb-5 flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black mr-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="text-lg font-medium">
              Find out what's blocking your growth
            </h3>
          </div>
          
          <div className="flex gap-3">
            <Input 
              placeholder="Enter your tour or experience name" 
              className="h-14 border-gray-200 text-base"
            />
            <Button className="bg-black text-white h-14 px-6 flex items-center gap-2 text-base whitespace-nowrap">
              Get your tour report
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Phone mockup display with dashboard preview */}
        <div 
          className={`mt-16 w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-12 transition-all duration-700 ease-out ${
            animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{transitionDelay: '500ms'}}
        >
          {/* Mobile mockup display */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative mx-auto" style={{ maxWidth: "280px" }}>
              {/* Phone frame */}
              <div className="relative z-10 border-8 border-black rounded-[36px] overflow-hidden shadow-xl">
                <div className="aspect-[9/19] relative">
                  {/* Phone UI showing the dashboard */}
                  <div className="absolute inset-0 bg-white">
                    {/* Phone status bar */}
                    <div className="bg-black text-white text-xs p-1 flex justify-between items-center">
                      <span>9:41</span>
                      <div className="flex space-x-1">
                        <span>📶</span>
                        <span>🔋</span>
                      </div>
                    </div>
                    
                    {/* Dashboard UI */}
                    <div className="p-3 bg-gray-50 h-full">
                      {/* Warning box */}
                      <div className="bg-red-100 rounded-lg p-3 mb-3">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                          <p className="text-xs font-medium text-left text-red-800">Local listings: Poor</p>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-red-700">10/40</span>
                        </div>
                      </div>
                      
                      {/* Competition section */}
                      <div className="bg-white rounded-lg p-3 mb-3 text-left">
                        <p className="text-xs font-bold mb-2">Who's beating you on Google</p>
                        
                        {/* First competitor */}
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <p className="text-xs text-gray-500">1st</p>
                            <p className="text-xs font-medium">Venice Tours</p>
                            <div className="flex items-center">
                              <p className="text-xs">4.8</p>
                              <span className="text-amber-400 ml-1">★</span>
                            </div>
                          </div>
                          <span className="text-xs text-green-600 font-medium">39/40</span>
                        </div>
                        
                        {/* Second competitor */}
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs text-gray-500">2nd</p>
                            <p className="text-xs font-medium">Culture Walks</p>
                            <div className="flex items-center">
                              <p className="text-xs">4.2</p>
                              <span className="text-amber-400 ml-1">★</span>
                            </div>
                          </div>
                          <span className="text-xs text-green-600 font-medium">36/40</span>
                        </div>
                      </div>
                      
                      {/* More sections */}
                      <div className="bg-white rounded-lg p-3 text-left">
                        <p className="text-xs font-bold mb-2">Missed booking opportunities</p>
                        <p className="text-xs text-gray-600">You're losing ~42 bookings/month</p>
                        <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2">
                          <div className="bg-red-500 h-1.5 rounded-full" style={{width: '65%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-5 bg-black rounded-b-lg"></div>
              </div>
              {/* Glow effect */}
              <div className="absolute -bottom-4 -left-4 -right-4 h-36 bg-gradient-to-t from-blue-500/20 to-transparent rounded-full blur-2xl z-0"></div>
            </div>
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
