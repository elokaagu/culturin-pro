'use client'

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Check, Globe, Users } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Link } from "../../../lib/navigation";

const HowItWorksSection = () => {
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

  const travelerSteps = [
    {
      icon: <Check className="w-6 h-6 text-culturin-charcoal" />,
      title: "Share your travel vibe + timing",
      description: "Tell us your preferences, budget, and when you'd like to travel"
    },
    {
      icon: <Users className="w-6 h-6 text-culturin-charcoal" />,
      title: "Get matched with others and curated trips",
      description: "Connect with like-minded travelers and find curated experiences"
    },
    {
      icon: <Globe className="w-6 h-6 text-culturin-charcoal" />,
      title: "Join a group and travel with purpose",
      description: "Experience authentic culture with your new travel community"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-30 bg-background">
      <div className="container max-w-6xl mx-auto px-6">
        <div 
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-playfair text-4xl md:text-5xl mb-4 tracking-tight leading-tight text-culturin-charcoal">
            Culturin makes travel human again
          </h2>
          <p className="text-lg md:text-xl text-[#4A4A4A] mt-4 mb-6 max-w-2xl mx-auto leading-relaxed">
            Because the best trips aren't booked — they're shared.
          </p>
          <div className="w-20 h-0.5 bg-gray-400 mx-auto mt-8"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {travelerSteps.map((step, index) => (
            <div 
              key={index} 
              className={`bg-white p-8 rounded-2xl shadow-[0px_8px_16px_rgba(0,0,0,0.04)] transition-all duration-700 ease-out hover:shadow-[0px_12px_24px_rgba(0,0,0,0.06)] hover:translate-y-[-4px] hover:scale-[1.01] relative ${
                animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${index === 1 ? 'border-t-2 border-[#D7CFC2]' : ''}`}
              style={{transitionDelay: `${300 + index * 100}ms`}}
            >
              <div className="absolute top-4 left-8 text-xl font-medium text-gray-300">
                {index + 1}
              </div>
              <div className="h-14 w-14 rounded-full bg-[#F2F2F2] flex items-center justify-center mb-6 mt-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-medium mb-3 text-[#4A4A4A]">{step.title}</h3>
              <p className="text-[#4A4A4A] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div 
          className={`flex justify-center mt-16 transition-all duration-700 ease-out ${
            animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{transitionDelay: '700ms'}}
        >
          <Button 
            className="bg-[#2B2B2B] text-white hover:bg-[#1C1C1C] hover:scale-[1.02] text-base py-6 px-10 rounded-xl font-medium transition-all duration-500 ease-out active:scale-[0.98]"
            asChild
          >
            <Link to="/discover-trips">Join a trip</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
