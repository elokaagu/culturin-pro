
import { Globe, Shield, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const FeaturesSection = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);

  return (
    <section className="py-24 lg:py-30 bg-muted">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <h2 className="heading-lg mb-4">What Makes Culturin Different</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tile 1 */}
          <Card className="border-0 overflow-hidden bg-card smooth-shadow transition-all duration-300 hover:shadow-card animate-fade-in" style={{animationDelay: '0.3s'}}>
            <CardContent className="p-8 flex flex-col h-full">
              <div className="h-16 w-16 rounded-full bg-culturin-mustard/20 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-culturin-clay" />
              </div>
              <h3 className="text-xl font-medium mb-4">Group Travel, Reinvented</h3>
              <p className="text-muted-foreground mb-2">Travel solo — but never alone.</p>
              <p className="text-muted-foreground">Join curated trips with aligned travelers.</p>
            </CardContent>
          </Card>
          
          {/* Tile 2 */}
          <Card className="border-0 overflow-hidden bg-card smooth-shadow transition-all duration-300 hover:shadow-card animate-fade-in" style={{animationDelay: '0.5s'}}>
            <CardContent className="p-8 flex flex-col h-full">
              <div className="h-16 w-16 rounded-full bg-culturin-clay/20 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-culturin-mustard" />
              </div>
              <h3 className="text-xl font-medium mb-4">Designed for Trust</h3>
              <p className="text-muted-foreground mb-2">Verified operators.</p>
              <p className="text-muted-foreground">Human-led safety layers, not algorithms.</p>
            </CardContent>
          </Card>
          
          {/* Tile 3 */}
          <Card className="border-0 overflow-hidden bg-card smooth-shadow transition-all duration-300 hover:shadow-card animate-fade-in" style={{animationDelay: '0.7s'}}>
            <CardContent className="p-8 flex flex-col h-full">
              <div className="h-16 w-16 rounded-full bg-culturin-indigo/20 flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-culturin-indigo" />
              </div>
              <h3 className="text-xl font-medium mb-4">Culture at the Center</h3>
              <p className="text-muted-foreground mb-2">Every trip celebrates local wisdom, art, and connection.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
