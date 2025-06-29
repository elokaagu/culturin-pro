'use client'

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "../../../lib/navigation";
import { useInView } from "react-intersection-observer";
import Image from "@/components/ui/image";

const OperatorInvitation = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (inView) {
      setAnimateItems(true);
    }
  }, [inView]);
  
  return (
    <section ref={sectionRef} className="py-24 lg:py-30 relative overflow-hidden">
      {/* Background image with subtle pattern */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[#F5F4F2]"></div>
        <div className="absolute inset-0 opacity-15 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-10"></div>
      </div>
      
      <div className="container-custom relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            className={`transition-all duration-700 ease-out ${
              animateItems ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
            style={{transitionDelay: '200ms'}}
          >
            <Card className="bg-transparent border-0 shadow-none">
              <CardContent className="p-0">
                <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight tracking-tight text-culturin-charcoal">
                  Your Culture Is a Gift.<br />Share It With the World.
                </h2>
                <p className="text-lg md:text-xl mb-8 leading-relaxed text-[#4A4A4A]">
                  Whether you guide people through hidden streets, host ancestral meals, or teach local rituals — your story deserves to be seen.
                  Culturin gives you the tools to publish, connect, and grow — on your terms.
                </p>
                <Button 
                  className="bg-[#2B2B2B] text-white hover:bg-[#1C1C1C] hover:scale-[1.02] text-base py-6 px-10 rounded-xl font-medium transition-all duration-500 ease-out active:scale-[0.98] hover:shadow-[0_0_15px_rgba(0,0,0,0.2)]"
                  onClick={() => navigate('/for-operators')}
                >
                  Start Hosting
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div 
            className={`relative transition-all duration-700 ease-out ${
              animateItems ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
            style={{transitionDelay: '350ms'}}
          >
            <div className="photo-card shadow-card h-[550px]">
              <Image 
                src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1600&auto=format&fit=crop" 
                alt="Colorful local market stalls with spices and textiles" 
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 ease-out hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperatorInvitation;
