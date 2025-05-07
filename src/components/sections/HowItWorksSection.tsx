
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const HowItWorksSection = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);
  
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <h2 className="heading-lg mb-4">How It Works</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* For Travelers */}
          <div className="bg-culturin-white rounded-xl p-8 shadow-soft hover:shadow-card transition-all duration-300 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <h3 className="heading-md mb-6 text-culturin-indigo">Discover Your People</h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <span className="bg-culturin-mustard/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 text-culturin-indigo font-bold">1</span>
                <p className="text-lg">Tell us where you want to go</p>
              </li>
              <li className="flex items-start">
                <span className="bg-culturin-mustard/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 text-culturin-indigo font-bold">2</span>
                <p className="text-lg">Get matched with others on the same path</p>
              </li>
              <li className="flex items-start">
                <span className="bg-culturin-mustard/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 text-culturin-indigo font-bold">3</span>
                <p className="text-lg">Join or create a curated cultural group trip</p>
              </li>
            </ul>
            <div className="mt-8">
              <Button className="btn-primary">Start Your Journey</Button>
            </div>
          </div>
          
          {/* For Operators */}
          <div className="bg-culturin-indigo rounded-xl p-8 shadow-soft hover:shadow-card transition-all duration-300 text-white animate-fade-in" style={{animationDelay: '0.6s'}}>
            <h3 className="heading-md mb-6 text-culturin-mustard">Empower Your Culture</h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <span className="bg-culturin-mustard/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 text-white font-bold">1</span>
                <p className="text-lg">Publish your experience with beautiful storytelling</p>
              </li>
              <li className="flex items-start">
                <span className="bg-culturin-mustard/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 text-white font-bold">2</span>
                <p className="text-lg">Get bookings from global travelers</p>
              </li>
              <li className="flex items-start">
                <span className="bg-culturin-mustard/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 text-white font-bold">3</span>
                <p className="text-lg">Build trust, not just tours</p>
              </li>
            </ul>
            <div className="mt-8">
              <Button className="bg-white text-culturin-indigo hover:bg-white/90">Become an Operator</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
