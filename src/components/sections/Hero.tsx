
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
    <div className="flex flex-col min-h-screen relative">
      {/* Notification banner at top */}
      <div className="bg-black text-white py-2 px-4 text-center">
        <p className="text-sm">
          🎉 BREAKING NEWS: We've just raised $10M. <Link to="/blog" className="underline hover:text-gray-300">Read our memo</Link> &rarr;
        </p>
      </div>
      
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 pt-20 pb-28 max-w-5xl mx-auto">
        {/* Subtle badge/tag */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
            #1 Top-Rated Cultural Experience Platform 4.8 ★ across 279 reviews
          </span>
        </div>
        
        {/* Main headline */}
        <h1 
          className={`font-inter text-4xl md:text-5xl lg:text-6xl text-black mb-10 font-medium tracking-tight leading-tight transition-all duration-700 ease-out ${
            animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{transitionDelay: '200ms'}}
        >
          See where your cultural <br className="hidden md:block" />
          experiences need help
        </h1>
        
        {/* Search box area */}
        <div className="w-full max-w-2xl mt-8 border border-gray-200 rounded-lg p-8 bg-white shadow-sm">
          <div className="text-left mb-4">
            <h3 className="text-base font-medium flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full text-sm">✓</span>
              See how much visibility you could get from keywords
            </h3>
          </div>
          
          <div className="flex gap-3">
            <Input 
              placeholder="Find your experience name" 
              className="h-12 border-gray-200"
            />
            <Button className="bg-black text-white h-12 px-5 flex items-center gap-2">
              Get my report
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
