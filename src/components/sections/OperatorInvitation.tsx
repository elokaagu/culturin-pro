
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

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
    <section ref={sectionRef} className="py-24 lg:py-30 bg-[#F5F4F2]">
      <div className="container-custom">
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
                  Your Culture Is a Gift. Share It With the World.
                </h2>
                <p className="text-lg md:text-xl mb-8 leading-relaxed text-[#4A4A4A]">
                  Whether you guide people through hidden streets, host ancestral meals, or teach local rituals — your story deserves to be seen.
                  Culturin gives you the tools to publish, connect, and grow — on your terms.
                </p>
                <Button 
                  className="bg-[#2B2B2B] text-white hover:bg-[#1C1C1C] hover:scale-[1.02] text-base py-6 px-10 rounded-xl font-medium transition-all duration-500 ease-out active:scale-[0.98]"
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
            style={{transitionDelay: '400ms'}}
          >
            <div className="photo-card shadow-card h-[550px]">
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=1374&auto=format&fit=crop" 
                alt="Cultural host sharing meaningful traditions with travelers" 
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 ease-out hover:scale-[1.03]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="glass-card rounded-xl p-6">
                  <p className="text-white text-lg font-medium">Share your cultural heritage with the world</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperatorInvitation;
