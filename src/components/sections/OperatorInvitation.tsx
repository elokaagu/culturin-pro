
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const OperatorInvitation = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);
  
  return (
    <section className="py-24 lg:py-30 bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
            <Card className="bg-transparent border-0 shadow-none">
              <CardContent className="p-0">
                <h2 className="heading-lg mb-6 text-culturin-charcoal">Are You a Local Guide, Artist, or Cultural Host?</h2>
                <p className="text-xl mb-8 leading-relaxed text-muted-foreground">
                  Bring your experience to the world. We give you the tools to publish, promote, and grow — with full creative freedom.
                </p>
                <Button 
                  className="btn-secondary text-lg py-6 px-8 rounded-xl"
                  onClick={() => navigate('/for-operators')}
                >
                  Start Publishing
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="relative animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="photo-card shadow-card h-[550px]">
              <img 
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1374&auto=format&fit=crop" 
                alt="Local guide showing travelers authentic experiences" 
                className="w-full h-full object-cover"
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
