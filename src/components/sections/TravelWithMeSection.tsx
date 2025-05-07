
import TravelWithMeForm from "@/components/TravelWithMeForm";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const TravelWithMeSection = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);

  return (
    <section className="py-24 lg:py-30 bg-muted">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <h2 className="heading-lg mb-4">Travel With Me</h2>
            <p className="text-xl text-muted-foreground">Tell us your travel preferences and we'll match you with the perfect trip</p>
          </div>
          <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Card className="border-0 overflow-hidden rounded-2xl shadow-soft bg-card">
              <TravelWithMeForm />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelWithMeSection;
