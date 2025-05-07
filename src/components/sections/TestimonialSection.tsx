
import { useEffect, useState } from "react";

const TestimonialSection = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);

  return (
    <section className="py-20 bg-culturin-mustard/10">
      <div className="container-custom max-w-4xl text-center">
        <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
          <div className="text-4xl md:text-5xl text-culturin-indigo font-medium mb-8">
            <span className="block text-5xl md:text-7xl text-culturin-clay mb-4">"</span>
            Culturin isn't just about travel — it's about meaning. I've never felt this seen on a trip before.
          </div>
          <p className="text-xl font-medium">– Sofia, Solo Traveler from Barcelona</p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
