'use client'

import { Check, Users, Map, Heart } from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  {
    icon: <Check className="w-8 h-8 text-culturin-clay" />,
    title: "Share your trip preferences",
    description: "Tell us where you want to go and what interests you"
  },
  {
    icon: <Users className="w-8 h-8 text-culturin-clay" />,
    title: "Get matched with others headed your way",
    description: "Connect with like-minded travelers with similar plans"
  },
  {
    icon: <Map className="w-8 h-8 text-culturin-clay" />,
    title: "Join or form a cultural group trip",
    description: "Experience authentic local culture together"
  },
  {
    icon: <Heart className="w-8 h-8 text-culturin-clay" />,
    title: "Travel with trust and intention",
    description: "Enjoy meaningful connections and memorable experiences"
  }
];

const HowItWorks = () => {
  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    setAnimateItems(true);
  }, []);

  return (
    <section className="py-20 bg-culturin-white">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <h2 className="heading-lg mb-4 text-culturin-charcoal">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your journey to authentic cultural experiences is just four simple steps away
          </p>
          <div className="section-divider"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`bg-white p-8 rounded-xl shadow-soft flex flex-col items-center text-center relative z-10 ${
                animateItems ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{animationDelay: `${0.2 + index * 0.2}s`}}
            >
              <div className="h-20 w-20 rounded-full bg-culturin-white flex items-center justify-center mb-6 border-2 border-culturin-mustard/30">
                {step.icon}
              </div>
              <h3 className="text-xl font-medium mb-3 text-culturin-indigo">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-full top-1/2 w-12 -translate-y-1/2 -translate-x-6 z-0">
                  <div className="border-t-2 border-dashed border-culturin-mustard w-full"></div>
                </div>
              )}
              
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-culturin-mustard rounded-full flex items-center justify-center text-culturin-indigo font-bold text-lg shadow-soft">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
