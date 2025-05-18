
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

        <div className="mt-16 w-full max-w-5xl">
          <img 
            src="/lovable-uploads/90db897a-9b44-4eb3-87cd-585b37891618.png"
            alt="Mobile app showcase"
            className="w-full h-auto object-contain"
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;
