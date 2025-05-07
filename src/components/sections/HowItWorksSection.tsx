
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check, Globe, Users } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const HowItWorksSection = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);

  const travelerSteps = [
    {
      icon: <Check className="w-6 h-6 text-culturin-clay" />,
      title: "Share your travel vibe + timing",
      description: "Tell us your preferences, budget, and when you'd like to travel"
    },
    {
      icon: <Users className="w-6 h-6 text-culturin-clay" />,
      title: "Get matched with others and curated trips",
      description: "Connect with like-minded travelers and find curated experiences"
    },
    {
      icon: <Globe className="w-6 h-6 text-culturin-clay" />,
      title: "Join a group and travel with purpose",
      description: "Experience authentic culture with your new travel community"
    }
  ];

  const operatorSteps = [
    {
      icon: <Check className="w-6 h-6 text-culturin-indigo" />,
      title: "Share your story and offer",
      description: "Tell your unique story and showcase your cultural experiences"
    },
    {
      icon: <Users className="w-6 h-6 text-culturin-indigo" />,
      title: "Get discovered by global travelers",
      description: "Connect with travelers seeking authentic experiences in your area"
    },
    {
      icon: <Globe className="w-6 h-6 text-culturin-indigo" />,
      title: "Build community and income",
      description: "Create meaningful connections while growing your business"
    }
  ];
  
  return (
    <section className="py-24 lg:py-30 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fade-in" style={{animationDelay: '0.2s'}}>
          <h2 className="heading-lg mb-4">Culturin makes travel human again</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Traveler Steps */}
          <div className="mb-16 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <h3 className="heading-md mb-8 text-culturin-indigo">For Travelers</h3>
            <ol className="relative border-l border-muted">
              {travelerSteps.map((step, index) => (
                <li key={index} className="mb-10 ml-8">
                  <div className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-8 ring-background bg-culturin-mustard/20">
                    <span className="text-culturin-indigo font-bold">{index + 1}</span>
                  </div>
                  <div className="p-6 bg-card rounded-lg border shadow-soft">
                    <div className="flex items-center mb-2">
                      <div className="mr-2">{step.icon}</div>
                      <h4 className="text-xl font-medium">{step.title}</h4>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="ml-8 mt-6">
              <Button className="btn-primary">
                Join a Trip
                <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <Separator className="my-12 max-w-md mx-auto" />
          
          {/* Operator Steps */}
          <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
            <h3 className="heading-md mb-8 text-culturin-clay">For Operators</h3>
            <ol className="relative border-l border-muted">
              {operatorSteps.map((step, index) => (
                <li key={index} className="mb-10 ml-8">
                  <div className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-8 ring-background bg-culturin-indigo/20">
                    <span className="text-culturin-clay font-bold">{index + 1}</span>
                  </div>
                  <div className="p-6 bg-card rounded-lg border shadow-soft">
                    <div className="flex items-center mb-2">
                      <div className="mr-2">{step.icon}</div>
                      <h4 className="text-xl font-medium">{step.title}</h4>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="ml-8 mt-6">
              <Button className="bg-culturin-clay text-white hover:bg-culturin-clay/90">
                Become a Host
                <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
