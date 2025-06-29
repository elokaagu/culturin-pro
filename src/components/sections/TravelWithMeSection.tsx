'use client'

import TravelWithMeForm from "@/components/TravelWithMeForm";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "../ui/image";
import { useInView } from "react-intersection-observer";

const TravelWithMeSection = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
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
    <section ref={sectionRef} className="py-16 lg:py-24 bg-[#F5F4F2]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div 
            className={`transition-all duration-700 ease-out ${
              animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{transitionDelay: '200ms'}}
          >
            <div className="text-left mb-6">
              <h2 className="heading-lg mb-4">Let's Find Your Kind of Journey</h2>
              <p className="text-lg text-muted-foreground">
                Tell us where, when, and how you like to travel — and we'll match you with meaningful
                group trips built around connection, culture, and community.
              </p>
            </div>
            <Card className="border-0 overflow-hidden rounded-2xl shadow-[0px_4px_16px_rgba(0,0,0,0.05)] bg-white hover:shadow-[0px_8px_24px_rgba(0,0,0,0.07)] transition-shadow duration-500">
              <TravelWithMeForm />
            </Card>
          </div>
          
          <div 
            className={`hidden lg:block transition-all duration-700 ease-out ${
              animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{transitionDelay: '400ms'}}
          >
            <div className="rounded-2xl overflow-hidden h-full">
              <div className="relative h-full">
                <Image 
                  src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1920&auto=format&fit=crop"
                  alt="Person in colorful clothing walking on street in Marrakech" 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelWithMeSection;
