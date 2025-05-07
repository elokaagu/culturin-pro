
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Upload, Users, CalendarCheck, ExternalLink, Search } from "lucide-react";
import HostShowcaseCarousel from "@/components/sections/HostShowcaseCarousel";
import Image from "@/components/ui/image";

const ForOperators = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top when component mounts or route changes
    window.scrollTo(0, 0);
    
    setAnimateItems(true);
    
    // Preload hero image
    const img = new window.Image();
    img.src = "https://images.unsplash.com/photo-1605538058334-52290f6d4b3f?q=80&w=1920&auto=format&fit=crop";
    img.onload = () => setImageLoaded(true);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="traveler" />
      
      {/* Hero Section with enhanced image loading and contrast */}
      <section className="relative min-h-[80vh] flex items-center">
        {/* Background image with optimized loading */}
        <div className="absolute inset-0 overflow-hidden z-0 bg-gray-900">
          <div className={`w-full h-full transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <Image 
              src="https://images.unsplash.com/photo-1605538058334-52290f6d4b3f?q=80&w=1920&auto=format&fit=crop"
              alt="Cultural cooking demonstration" 
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          
          {/* Enhanced gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-10"></div>
          
          {/* Grain texture overlay */}
          <div className="absolute inset-0 opacity-15 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-20"></div>
        </div>
        
        <div className="container-custom relative z-30 pt-32 pb-20">
          <div className="max-w-3xl">
            <div className="space-y-6">
              <h1 className={`font-bold text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-tight text-shadow-lg transition-all duration-700 ease-out ${
                animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                You Have Culture to Share.<br />
                We'll Help You Spread It.
              </h1>
              
              <p className={`text-base md:text-xl text-white text-shadow transition-all duration-700 ease-out ${
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
                    className="border-[#B0B0B0] text-white hover:bg-white hover:text-[#1A1A1A] py-6 px-8 rounded-xl text-base font-medium transition-all duration-500 ease-out hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
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
      
      {/* Value Props Section - Improved contrast and animations */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="heading-lg text-center mb-16 animate-fade-in">How Culturin works for cultural hosts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-fade-in" style={{animationDelay: '0.2s'}}>
            {/* Value Prop 1 */}
            <Card className="border-0 shadow-soft hover:shadow-card transition-all duration-300 hover:translate-y-[-4px]">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="bg-culturin-mustard/10 p-4 rounded-full mb-6">
                  <Upload className="w-8 h-8 text-culturin-indigo" />
                </div>
                <h3 className="text-xl font-medium mb-4 text-[#1A1A1A]">Publish easily with beautiful storytelling tools</h3>
                <p className="text-[#4A4A4A]">
                  Our intuitive platform helps you showcase your cultural expertise with rich media and compelling descriptions that travelers connect with.
                </p>
              </CardContent>
            </Card>
            
            {/* Value Prop 2 */}
            <Card className="border-0 shadow-soft hover:shadow-card transition-all duration-300 hover:translate-y-[-4px]">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="bg-culturin-mustard/10 p-4 rounded-full mb-6">
                  <Users className="w-8 h-8 text-culturin-indigo" />
                </div>
                <h3 className="text-xl font-medium mb-4 text-[#1A1A1A]">Reach aligned travelers, globally</h3>
                <p className="text-[#4A4A4A]">
                  Connect with travelers who value authentic cultural exchanges. Our matching algorithm brings you guests who will appreciate your unique offerings.
                </p>
              </CardContent>
            </Card>
            
            {/* Value Prop 3 */}
            <Card className="border-0 shadow-soft hover:shadow-card transition-all duration-300 hover:translate-y-[-4px]">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="bg-culturin-mustard/10 p-4 rounded-full mb-6">
                  <CalendarCheck className="w-8 h-8 text-culturin-indigo" />
                </div>
                <h3 className="text-xl font-medium mb-4 text-[#1A1A1A]">Manage bookings + group dynamics with ease</h3>
                <p className="text-[#4A4A4A]">
                  Streamlined tools for handling reservations, communications, and fostering positive group interactions among your guests.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* NEW Cultural Delights Section with uploaded image */}
      <section className="py-16 bg-[#F8F5F2]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-medium mb-6 text-[#2B2B2B]">Share Your Cultural Delights</h2>
              <p className="text-lg mb-6 text-[#4A4A4A] leading-relaxed">
                From mooncakes and tea ceremonies to pasta-making and spice markets — food is more than sustenance. It's a living, breathing story of culture and identity.
              </p>
              <p className="text-lg mb-8 text-[#4A4A4A] leading-relaxed">
                On Culturin, you can share your culinary traditions through hands-on experiences, tastings, market tours, and home-cooked meals that travelers remember forever.
              </p>
              <Button 
                className="bg-[#2B2B2B] text-white hover:bg-[#1C1C1C] text-base py-6 px-8 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
                onClick={() => navigate('/operator')}
              >
                Start a Culinary Experience
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-card">
                <Image 
                  src="/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png"
                  alt="Traditional mooncake and tea on an orange background" 
                  className="w-full h-auto object-cover"
                  aspectRatio="square"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section - Enhanced for better contrast */}
      <section className="py-20 bg-culturin-indigo text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Globe className="w-16 h-16 mx-auto mb-8 opacity-20" />
            <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8 animate-fade-in text-shadow">
              "This platform helped me connect with travelers who truly cared about learning our traditions, not just taking photos. It's changed how I share my culture with the world."
            </blockquote>
            <div className="flex items-center justify-center animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4 shadow-md">
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
      
      {/* NEW Local Experiences Section with uploaded image */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <div className="rounded-2xl overflow-hidden shadow-card">
                <Image 
                  src="/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png"
                  alt="Traditional cafe storefront with bicycle and people sitting outside" 
                  className="w-full h-auto object-cover"
                  aspectRatio="wide"
                />
              </div>
            </div>
            <div className="order-2">
              <h2 className="text-3xl md:text-4xl font-medium mb-6 text-[#2B2B2B]">Share Local Authentic Experiences</h2>
              <p className="text-lg mb-6 text-[#4A4A4A] leading-relaxed">
                Every neighborhood has hidden gems that only locals know about. From family-owned cafés to artisan workshops, these authentic places tell the real story of a destination.
              </p>
              <p className="text-lg mb-8 text-[#4A4A4A] leading-relaxed">
                As a Culturin host, you can guide travelers through these meaningful spaces and create connections that go far beyond typical tourism.
              </p>
              <Button 
                className="bg-[#2B2B2B] text-white hover:bg-[#1C1C1C] text-base py-6 px-8 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
                onClick={() => navigate('/operator')}
              >
                Create a Local Experience
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Host Showcase Carousel Section */}
      <HostShowcaseCarousel />
      
      {/* Pricing Teaser / CTA - Improved contrast and animations */}
      <section className="py-20 bg-culturin-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-6 animate-fade-in">Start sharing your culture, free</h2>
            <p className="text-xl text-[#4A4A4A] mb-10 animate-fade-in" style={{animationDelay: '0.1s'}}>
              No upfront costs to list your experiences. We only earn when you do — with a simple commission on bookings.
            </p>
            <Button 
              className="bg-culturin-indigo hover:bg-culturin-indigo/90 hover:scale-[1.02] text-white py-6 px-10 rounded-xl text-lg animate-fade-in transition-all duration-300"
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
