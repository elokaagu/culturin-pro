
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  useEffect(() => {
    // Trigger animations on component mount (page load)
    setAnimateItems(true);
  }, []);

  return (
    <section className="relative h-screen-90 min-h-[650px]">
      <div className="absolute inset-0 bg-black">
        <img 
          src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=2070&auto=format&fit=crop" 
          alt="Vibrant orange flowers in natural landscape" 
          className="w-full h-full object-cover opacity-70 transition-transform duration-[20000ms] ease-out hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20" />
      </div>
      
      <div className="relative container mx-auto h-full flex flex-col items-center justify-center pb-16 px-6">
        <div className="text-center max-w-[720px]">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-[#F3F3F3] mb-8 tracking-tight leading-tight drop-shadow-sm">
            <span 
              className={`block transition-all duration-700 ease-out ${
                animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{transitionDelay: '200ms'}}
            >
              Travel With Culture,
            </span>
            <span 
              className={`block text-[#F3F3F3] transition-all duration-700 ease-out ${
                animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{transitionDelay: '400ms'}}
            >
              Not Just Itineraries.
            </span>
          </h1>
          <p 
            className={`text-xl md:text-2xl text-[#E0E0E0] mb-12 leading-relaxed font-light max-w-2xl mx-auto drop-shadow-sm transition-all duration-700 ease-out ${
              animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{transitionDelay: '600ms'}}
          >
            Join meaningful group trips or publish your own cultural experience — with trust, flexibility, and human connection.
          </p>
          <div 
            className={`flex flex-wrap justify-center gap-6 transition-all duration-700 ease-out ${
              animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{transitionDelay: '800ms'}}
          >
            <Button 
              className="bg-[#2B2B2B] text-white hover:bg-[#1E1E1E] hover:scale-[1.02] text-lg py-7 px-8 rounded-xl border-none transition-all duration-500 ease-out active:scale-[0.98]"
              asChild
            >
              <Link to="/discover-trips">Explore Group Trips</Link>
            </Button>
            <Button 
              variant="outline" 
              className="bg-[#EDEDED] text-[#2B2B2B] hover:bg-[#D4D4D4] hover:scale-[1.02] border-none text-lg py-7 px-8 rounded-xl transition-all duration-500 ease-out active:scale-[0.98]"
              asChild
            >
              <Link to="/for-operators">Create an Experience</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
