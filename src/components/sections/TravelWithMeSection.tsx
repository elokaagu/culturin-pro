
import TravelWithMeForm from "@/components/TravelWithMeForm";
import { useEffect, useState } from "react";

const TravelWithMeSection = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);

  return (
    <section className="py-20 bg-culturin-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <h2 className="heading-lg mb-4">Travel With Me</h2>
            <p className="text-xl text-gray-600">Tell us your travel preferences and we'll match you with the perfect trip</p>
          </div>
          <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
            <TravelWithMeForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelWithMeSection;
