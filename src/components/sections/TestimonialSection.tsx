
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon } from "lucide-react";

const TestimonialSection = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);

  return (
    <section className="py-24 lg:py-30 bg-background">
      <div className="container-custom max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-2">
            <Card className="border-0 shadow-none bg-transparent">
              <CardContent className="p-0">
                <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
                  <div className="flex items-start mb-6">
                    <QuoteIcon className="w-12 h-12 text-culturin-clay flex-shrink-0 mr-4 opacity-80" />
                  </div>
                  <div className="text-3xl md:text-4xl lg:text-5xl text-culturin-indigo font-serif mb-8 leading-tight tracking-tight">
                    Culturin isn't just about travel — it's about meaning. I've never felt this seen on a trip before.
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-culturin-clay/10 overflow-hidden mr-4">
                      <img 
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256" 
                        alt="Sofia" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <p className="text-xl font-medium">Sofia</p>
                      <p className="text-muted-foreground">Solo Traveler from Barcelona</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="hidden md:block">
            <div className="photo-card shadow-card h-80 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <img 
                src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=830&auto=format&fit=crop" 
                alt="Traveler exploring Barcelona streets" 
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
