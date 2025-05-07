import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Upload, Users, CalendarCheck, ExternalLink, Search } from "lucide-react";
import HostShowcaseCarousel from "@/components/sections/HostShowcaseCarousel";

const ForOperators = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="traveler" />
      
      {/* Hero Section - Updated with background image and styling */}
      <section className="relative min-h-[80vh] flex items-center">
        {/* Background image with zoom effect */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <img 
            src="https://images.unsplash.com/photo-1605538058334-52290f6d4b3f?q=80&w=1920&auto=format&fit=crop"
            alt="Cultural cooking demonstration" 
            className="w-full h-full object-cover transition-transform duration-[10000ms] ease-out scale-[1.01]"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/10 z-10"></div>
          {/* Grain texture overlay */}
          <div className="absolute inset-0 opacity-15 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-20"></div>
        </div>
        
        <div className="container-custom relative z-30 pt-32 pb-20">
          <div className="max-w-3xl">
            <div className="space-y-6">
              <h1 className={`font-bold text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-tight text-shadow transition-all duration-700 ease-out ${
                animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                You Have Culture to Share.<br />
                We'll Help You Spread It.
              </h1>
              
              <p className={`text-base md:text-xl text-[#EAEAEA] text-shadow transition-all duration-700 ease-out ${
                animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
                style={{transitionDelay: '200ms'}}
              >
                From ancestral meals to modern crafts, your journey belongs here.<br className="hidden md:block" />
                Culturin helps you publish and promote authentic experiences — on your terms.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div 
                  className={`transition-all duration-500 ease-out ${
                    animateItems ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                  }`}
                  style={{transitionDelay: '300ms'}}
                >
                  <Button 
                    className="bg-[#1A1A1A] text-white hover:bg-black hover:scale-[1.02] text-base py-6 px-8 rounded-xl font-medium transition-all duration-500 ease-out active:scale-[0.98] hover:shadow-[0_0_15px_rgba(0,0,0,0.4)] w-full sm:w-auto"
                    onClick={() => navigate('/operator')}
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Start Hosting
                  </Button>
                </div>
                
                <div 
                  className={`transition-all duration-500 ease-out ${
                    animateItems ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                  }`}
                  style={{transitionDelay: '400ms'}}
                >
                  <Button 
                    variant="outline" 
                    className="border-[#B0B0B0] text-white hover:bg-[#F3F3F3] hover:text-[#1A1A1A] py-6 px-8 rounded-xl text-base font-medium transition-all duration-500 ease-out hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    See Sample Listings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Value Props Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="heading-lg text-center mb-16 animate-fade-in">How Culturin works for cultural hosts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-fade-in" style={{animationDelay: '0.2s'}}>
            {/* Value Prop 1 */}
            <Card className="border-0 shadow-soft hover:shadow-card transition-all duration-300">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="bg-culturin-mustard/10 p-4 rounded-full mb-6">
                  <Upload className="w-8 h-8 text-culturin-indigo" />
                </div>
                <h3 className="text-xl font-medium mb-4">Publish easily with beautiful storytelling tools</h3>
                <p className="text-muted-foreground">
                  Our intuitive platform helps you showcase your cultural expertise with rich media and compelling descriptions that travelers connect with.
                </p>
              </CardContent>
            </Card>
            
            {/* Value Prop 2 */}
            <Card className="border-0 shadow-soft hover:shadow-card transition-all duration-300">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="bg-culturin-mustard/10 p-4 rounded-full mb-6">
                  <Users className="w-8 h-8 text-culturin-indigo" />
                </div>
                <h3 className="text-xl font-medium mb-4">Reach aligned travelers, globally</h3>
                <p className="text-muted-foreground">
                  Connect with travelers who value authentic cultural exchanges. Our matching algorithm brings you guests who will appreciate your unique offerings.
                </p>
              </CardContent>
            </Card>
            
            {/* Value Prop 3 */}
            <Card className="border-0 shadow-soft hover:shadow-card transition-all duration-300">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="bg-culturin-mustard/10 p-4 rounded-full mb-6">
                  <CalendarCheck className="w-8 h-8 text-culturin-indigo" />
                </div>
                <h3 className="text-xl font-medium mb-4">Manage bookings + group dynamics with ease</h3>
                <p className="text-muted-foreground">
                  Streamlined tools for handling reservations, communications, and fostering positive group interactions among your guests.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-20 bg-culturin-indigo text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Globe className="w-16 h-16 mx-auto mb-8 opacity-20" />
            <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8 animate-fade-in">
              "This platform helped me connect with travelers who truly cared about learning our traditions, not just taking photos. It's changed how I share my culture with the world."
            </blockquote>
            <div className="flex items-center justify-center animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop" 
                  alt="Host portrait" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-medium">Maria Gonzalez</p>
                <p className="text-sm opacity-80">Culinary Guide, Mexico City</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Host Showcase Carousel - NEW SECTION */}
      <HostShowcaseCarousel />
      
      {/* Pricing Teaser / CTA */}
      <section className="py-20 bg-culturin-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-6 animate-fade-in">Start sharing your culture, free</h2>
            <p className="text-xl text-muted-foreground mb-10 animate-fade-in" style={{animationDelay: '0.1s'}}>
              No upfront costs to list your experiences. We only earn when you do — with a simple commission on bookings.
            </p>
            <Button 
              className="bg-culturin-indigo hover:bg-culturin-indigo/90 text-white py-6 px-10 rounded-xl text-lg animate-fade-in"
              style={{animationDelay: '0.2s'}}
              onClick={() => navigate('/operator')}
            >
              <Upload className="w-5 h-5 mr-2" />
              Start Hosting Now
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ForOperators;
