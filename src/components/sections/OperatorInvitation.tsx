
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const OperatorInvitation = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);
  
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
            <h2 className="heading-lg mb-6">Are You a Local Guide, Artist, or Cultural Host?</h2>
            <p className="text-xl mb-8 leading-relaxed">
              Bring your experience to the world. We give you the tools to publish, promote, and grow — with full creative freedom.
            </p>
            <Button className="btn-secondary text-base py-6 px-8">
              Start Publishing
            </Button>
          </div>
          <div className="relative h-80 md:h-[500px] rounded-xl overflow-hidden shadow-card animate-fade-in" style={{animationDelay: '0.4s'}}>
            <img 
              src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1374&auto=format&fit=crop" 
              alt="Local guide showing travelers authentic experiences" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-8">
              <p className="text-white text-lg font-medium">Share your cultural heritage with the world</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperatorInvitation;
