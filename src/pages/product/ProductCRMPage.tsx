
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Mail, Users, Zap } from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";

const ProductCRMPage = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Build lasting relationships with your guests
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Our CRM tools help you create personalized experiences, encourage repeat bookings, and turn first-time visitors into loyal fans.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8 rounded-xl h-auto"
                    asChild
                  >
                    <Link to="/demo">Request a demo</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-white border border-gray-300 text-gray-800 text-lg py-6 px-8 rounded-xl h-auto"
                    asChild
                  >
                    <Link to="/culturin-pro">Learn more</Link>
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-gray-100 rounded-xl p-8 aspect-video flex items-center justify-center">
                  <Users className="w-32 h-32 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="bg-gray-50 py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Turn guests into advocates</h2>
              <p className="text-lg text-gray-600">
                Our suite of customer relationship management tools helps you create memorable experiences that keep guests coming back.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <Users className="h-10 w-10 text-blue-600" />,
                  title: "Guest Profiles",
                  description: "Build detailed guest profiles to personalize experiences and communications."
                },
                {
                  icon: <Mail className="h-10 w-10 text-blue-600" />,
                  title: "Email Campaigns",
                  description: "Send targeted email campaigns to keep in touch with past guests and encourage repeat bookings."
                },
                {
                  icon: <Heart className="h-10 w-10 text-blue-600" />,
                  title: "Loyalty Programs",
                  description: "Reward repeat guests and turn them into advocates for your experiences."
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-500 ${
                    animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{transitionDelay: `${index * 100}ms`}}
                >
                  <div className="mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white py-5 px-8 rounded-xl text-lg h-auto"
                asChild
              >
                <Link to="/culturin-pro">Start a free trial</Link>
              </Button>
              <p className="mt-3 text-gray-500">No credit card required</p>
            </div>
          </div>
        </section>
      </main>
      
      <NewFooter />
    </div>
  );
};

export default ProductCRMPage;
