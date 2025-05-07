
import { Check, Users, Map, Heart } from "lucide-react";

const steps = [
  {
    icon: <Check className="w-8 h-8 text-culturin-mustard" />,
    title: "Share your trip preferences",
    description: "Tell us where you want to go and what interests you"
  },
  {
    icon: <Users className="w-8 h-8 text-culturin-mustard" />,
    title: "Get matched with others headed your way",
    description: "Connect with like-minded travelers with similar plans"
  },
  {
    icon: <Map className="w-8 h-8 text-culturin-mustard" />,
    title: "Join or form a cultural group trip",
    description: "Experience authentic local culture together"
  },
  {
    icon: <Heart className="w-8 h-8 text-culturin-mustard" />,
    title: "Travel with trust and intention",
    description: "Enjoy meaningful connections and memorable experiences"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-12 bg-culturin-sand/50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your journey to authentic cultural experiences is just four simple steps away
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center"
            >
              <div className="h-16 w-16 rounded-full bg-culturin-sand/50 flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="font-playfair text-xl mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
                  <div className="w-4 h-4 border-t-2 border-r-2 border-culturin-mustard transform rotate-45"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
