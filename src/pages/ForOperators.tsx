
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Upload, Users, CalendarCheck, ExternalLink, Search } from "lucide-react";

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
        {/* Optional visual texture */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1572454591674-2739f30a2b2f?q=80&w=1600&auto=format&fit=crop')] bg-repeat z-[-1]"></div>
        
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className={`transition-all duration-700 ease-out ${
                animateItems ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <h1 className="heading-xl mb-6 text-culturin-charcoal">
                You Have Culture to Share.<br />
                We'll Help You Spread It.
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10">
                From ancestral meals to modern crafts, your journey belongs here.<br className="hidden md:block" />
                Culturin helps you publish and promote authentic experiences — on your terms.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div 
                className={`transition-all duration-700 ease-out ${
                  animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{transitionDelay: '200ms'}}
              >
                <Button 
                  className="bg-[#2B2B2B] text-white hover:bg-[#1C1C1C] hover:scale-[1.02] text-base py-6 px-8 rounded-xl font-medium transition-all duration-500 ease-out active:scale-[0.98] hover:shadow-[0_0_15px_rgba(0,0,0,0.2)]"
                  onClick={() => navigate('/operator')}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Start Hosting
                </Button>
              </div>
              
              <div 
                className={`transition-all duration-700 ease-out ${
                  animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{transitionDelay: '300ms'}}
              >
                <Button 
                  variant="outline" 
                  className="border-[#2B2B2B] text-[#2B2B2B] hover:bg-[#2B2B2B]/10 py-6 px-8 rounded-xl text-base font-medium transition-all duration-500 ease-out hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Search className="w-5 h-5 mr-2" />
                  See Sample Listings
                </Button>
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
      
      {/* Operator Showcase */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-lg mb-6 animate-fade-in">Experience Hosts Growing With Culturin</h2>
            <p className="text-xl text-muted-foreground animate-fade-in" style={{animationDelay: '0.1s'}}>
              Join our community of cultural storytellers and grow your audience of authentic travelers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 - Artisan Workshops */}
            <div 
              className="photo-card h-[350px] shadow-card rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-500 group"
              style={{animationDelay: '0ms'}}
            >
              <div className="h-full w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1969&auto=format&fit=crop" 
                  alt="Artisan workshop" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent group-hover:from-black/50 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white transition-all duration-500 group-hover:translate-y-[-4px]">
                  <p className="font-bold text-lg group-hover:text-shadow-sm">Artisan Workshops</p>
                  <p className="text-sm text-white/90">Pass on creative traditions</p>
                </div>
              </div>
            </div>
            
            {/* Card 2 - Ceremonies & Rituals */}
            <div 
              className="photo-card h-[350px] shadow-card rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-500 group"
              style={{animationDelay: '150ms'}}
            >
              <div className="h-full w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2032&auto=format&fit=crop" 
                  alt="Cultural ritual demonstration" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent group-hover:from-black/50 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white transition-all duration-500 group-hover:translate-y-[-4px]">
                  <p className="font-bold text-lg group-hover:text-shadow-sm">Ceremonies & Rituals</p>
                  <p className="text-sm text-white/90">Share ancestral knowledge</p>
                </div>
              </div>
            </div>
            
            {/* Card 3 - Cultural Gatherings */}
            <div 
              className="photo-card h-[350px] shadow-card rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-500 group"
              style={{animationDelay: '300ms'}}
            >
              <div className="h-full w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop" 
                  alt="Cultural gathering at sunset" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent group-hover:from-black/50 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white transition-all duration-500 group-hover:translate-y-[-4px]">
                  <p className="font-bold text-lg group-hover:text-shadow-sm">Cultural Gatherings</p>
                  <p className="text-sm text-white/90">Create connection through storytelling</p>
                </div>
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
