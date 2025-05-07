
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Upload, Users, CalendarCheck, ExternalLink } from "lucide-react";

const ForOperators = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="traveler" />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-culturin-white to-background z-[-1]"></div>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6 text-culturin-charcoal animate-fade-in">
              You have culture to share. We'll help you spread it.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 animate-fade-in" style={{animationDelay: '0.2s'}}>
              Join thousands of cultural hosts, local guides, and storytellers sharing authentic experiences on Culturin.
            </p>
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{animationDelay: '0.3s'}}>
              <Button 
                className="bg-culturin-indigo hover:bg-culturin-indigo/90 text-white py-6 px-8 rounded-xl text-lg" 
                onClick={() => navigate('/operator')}
              >
                <Upload className="w-5 h-5 mr-2" />
                Start Hosting
              </Button>
              <Button 
                variant="outline" 
                className="border-culturin-indigo text-culturin-indigo hover:bg-culturin-indigo/10 py-6 px-8 rounded-xl text-lg"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                See Sample Listings
              </Button>
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
      
      {/* Operator Showcase */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg mb-6 animate-fade-in">Experience hosts growing with Culturin</h2>
            <p className="text-xl text-muted-foreground animate-fade-in" style={{animationDelay: '0.1s'}}>
              Join our community of cultural storytellers and grow your audience of authentic travelers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
            {/* Image 1 */}
            <div className="photo-card h-[350px] shadow-card">
              <img 
                src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop" 
                alt="Local cooking class" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="font-medium text-lg">Traditional Cooking Classes</p>
                <p className="text-sm opacity-80">Share your culinary heritage</p>
              </div>
            </div>
            
            {/* Image 2 */}
            <div className="photo-card h-[350px] shadow-card">
              <img 
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2032&auto=format&fit=crop" 
                alt="Cultural ritual demonstration" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="font-medium text-lg">Cultural Rituals & Ceremonies</p>
                <p className="text-sm opacity-80">Teach meaningful traditions</p>
              </div>
            </div>
            
            {/* Image 3 */}
            <div className="photo-card h-[350px] shadow-card">
              <img 
                src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1969&auto=format&fit=crop" 
                alt="Artisan workshop" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="font-medium text-lg">Artisan Workshops</p>
                <p className="text-sm opacity-80">Pass on creative traditions</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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
