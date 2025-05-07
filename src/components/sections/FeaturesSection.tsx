
import { BarChart2 } from "lucide-react";
import { useEffect, useState } from "react";

const FeaturesSection = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);

  return (
    <section className="py-20 bg-culturin-white/50">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <h2 className="heading-lg mb-4">What Makes Culturin Different</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tile 1 */}
          <div className="bg-white rounded-xl p-8 shadow-soft hover:shadow-card transition-all duration-300 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="h-16 w-16 rounded-full bg-culturin-mustard/20 flex items-center justify-center mb-6">
              <BarChart2 className="w-8 h-8 text-culturin-clay" />
            </div>
            <h3 className="text-xl font-medium mb-4">Group Travel, Reinvented</h3>
            <p className="text-gray-600 mb-2">Travel solo — but never alone.</p>
            <p className="text-gray-600">Join curated trips with aligned travelers.</p>
          </div>
          
          {/* Tile 2 */}
          <div className="bg-white rounded-xl p-8 shadow-soft hover:shadow-card transition-all duration-300 animate-fade-in" style={{animationDelay: '0.5s'}}>
            <div className="h-16 w-16 rounded-full bg-culturin-clay/20 flex items-center justify-center mb-6">
              <BarChart2 className="w-8 h-8 text-culturin-mustard" />
            </div>
            <h3 className="text-xl font-medium mb-4">Designed for Trust</h3>
            <p className="text-gray-600 mb-2">Verified operators.</p>
            <p className="text-gray-600">Human-led safety layers, not algorithms.</p>
          </div>
          
          {/* Tile 3 */}
          <div className="bg-white rounded-xl p-8 shadow-soft hover:shadow-card transition-all duration-300 animate-fade-in" style={{animationDelay: '0.7s'}}>
            <div className="h-16 w-16 rounded-full bg-culturin-indigo/20 flex items-center justify-center mb-6">
              <BarChart2 className="w-8 h-8 text-culturin-indigo" />
            </div>
            <h3 className="text-xl font-medium mb-4">Culture at the Center</h3>
            <p className="text-gray-600 mb-2">Every trip celebrates local wisdom, art, and connection.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
