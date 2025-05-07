
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorksSection = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);
  
  return (
    <section className="py-24 lg:py-30 bg-background">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <h2 className="heading-lg mb-4">How It Works</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* For Travelers */}
          <Card className="border overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 animate-fade-in rounded-2xl" style={{animationDelay: '0.4s'}}>
            <CardContent className="p-10">
              <h3 className="heading-md mb-8 text-culturin-indigo">Discover Your People</h3>
              <ul className="space-y-8">
                <li className="flex items-start">
                  <span className="bg-culturin-mustard/20 rounded-full w-10 h-10 flex items-center justify-center mr-5 text-culturin-indigo font-bold">1</span>
                  <p className="text-lg pt-1.5">Tell us where you want to go</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-culturin-mustard/20 rounded-full w-10 h-10 flex items-center justify-center mr-5 text-culturin-indigo font-bold">2</span>
                  <p className="text-lg pt-1.5">Get matched with others on the same path</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-culturin-mustard/20 rounded-full w-10 h-10 flex items-center justify-center mr-5 text-culturin-indigo font-bold">3</span>
                  <p className="text-lg pt-1.5">Join or create a curated cultural group trip</p>
                </li>
              </ul>
              <div className="mt-10">
                <Button className="btn-primary text-base py-6 px-8 rounded-xl">Start Your Journey</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* For Operators */}
          <Card className="bg-culturin-indigo border-0 overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 text-white animate-fade-in rounded-2xl" style={{animationDelay: '0.6s'}}>
            <CardContent className="p-10">
              <h3 className="heading-md mb-8 text-culturin-mustard">Empower Your Culture</h3>
              <ul className="space-y-8">
                <li className="flex items-start">
                  <span className="bg-culturin-mustard/20 rounded-full w-10 h-10 flex items-center justify-center mr-5 text-white font-bold">1</span>
                  <p className="text-lg pt-1.5">Publish your experience with beautiful storytelling</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-culturin-mustard/20 rounded-full w-10 h-10 flex items-center justify-center mr-5 text-white font-bold">2</span>
                  <p className="text-lg pt-1.5">Get bookings from global travelers</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-culturin-mustard/20 rounded-full w-10 h-10 flex items-center justify-center mr-5 text-white font-bold">3</span>
                  <p className="text-lg pt-1.5">Build trust, not just tours</p>
                </li>
              </ul>
              <div className="mt-10">
                <Button className="bg-white text-culturin-indigo hover:bg-white/90 py-6 px-8 rounded-xl">Become an Operator</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
