'use client'

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Image from "@/components/ui/image";

const TestimonialSection = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (inView) {
      setAnimateItems(true);
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-24 lg:py-30 relative overflow-hidden bg-gradient-to-r from-[#1A1F2C] to-[#2A2F3C]">
      {/* Updated background image with travel theme */}
      <div className="absolute inset-0">
        <div className="bg-[url('https://images.unsplash.com/photo-1497802176320-541c8e8de98d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center h-full w-full"></div>
        {/* Added darker overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>
      
      <div className="container-custom max-w-5xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-2">
            <Card className="border-0 shadow-none bg-black/50 backdrop-blur-sm">
              <CardContent className="p-6 md:p-8">
                <div className={`transition-all duration-700 ease-out ${
                  animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <div className="flex items-start mb-6">
                    <QuoteIcon className="w-12 h-12 text-white flex-shrink-0 mr-4 opacity-80" />
                  </div>
                  <div className="text-3xl md:text-4xl lg:text-5xl text-white font-serif mb-8 leading-tight tracking-tight text-shadow-lg">
                    Culturin isn't just about travel — it's about meaning. I've never felt this seen on a trip before.
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-[#403E43] overflow-hidden mr-4 shadow-md border-2 border-white/30">
                      <img 
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256" 
                        alt="Sofia" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg">
                      <p className="text-xl font-medium text-white">Sofia</p>
                      <p className="text-white/80">Solo Traveler from Barcelona</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className={`hidden md:block transition-all duration-700 ease-out ${
            animateItems ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            {/* Updated to make image fill the entire card */}
            <div className="h-full w-full overflow-hidden rounded-xl shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=830&auto=format&fit=crop" 
                alt="Person walking through historic Italian street with buildings" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
