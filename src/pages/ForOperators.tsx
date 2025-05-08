import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Upload, Users, CalendarCheck, Compass } from "lucide-react";
import HostShowcaseCarousel from "@/components/sections/HostShowcaseCarousel";
import TestimonialSection from "@/components/sections/TestimonialSection";
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
    const img = document.createElement('img');
    img.src = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1920&auto=format&fit=crop";
    img.onload = () => setImageLoaded(true);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="traveler" />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        {/* Hero background image */}
        <div className="absolute inset-0 overflow-hidden z-0 bg-gray-900">
          <Image 
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1920&auto=format&fit=crop" 
            alt="Landscape photography of mountain with sun rays" 
            fill={true}
            className={`w-full h-full transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          
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
                    className="bg-white text-[#1A1A1A] hover:bg-[#F0F0F0] hover:text-black py-6 px-8 rounded-xl text-base font-medium transition-all duration-500 ease-out hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] w-full sm:w-auto border border-[#E0E0E0]"
                    onClick={() => navigate('/discover-trips')}
                  >
                    <Compass className="w-5 h-5 mr-2 text-[#333333]" />
                    Explore Experiences
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
      
      {/* Cultural Delights Section */}
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
              <div className="rounded-2xl overflow-hidden shadow-card h-[400px]">
                <Image 
                  src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1920&auto=format&fit=crop"
                  alt="Ocean waves at a beach" 
                  aspectRatio="wide"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <TestimonialSection />
      
      {/* HostShowcaseCarousel Component */}
      <HostShowcaseCarousel />
      
      {/* Local Experiences Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <div className="rounded-2xl overflow-hidden shadow-card h-[400px]">
                <Image 
                  src="https://images.unsplash.com/photo-1458668383970-8ddd3927deed?q=80&w=1920&auto=format&fit=crop"
                  alt="Landscape photo of mountain alps" 
                  aspectRatio="wide"
                  className="w-full h-full"
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
      
      {/* Tea Ceremony Section */}
      <section className="py-16 bg-[#F5F4F2]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-medium mb-6 text-[#2B2B2B]">Share Your Cultural Heritage</h2>
              <p className="text-lg mb-6 text-[#4A4A4A] leading-relaxed">
                Traditional ceremonies and rituals are windows into cultural identity. From tea ceremonies to seasonal festivals, these practices tell stories of your heritage.
              </p>
              <p className="text-lg mb-8 text-[#4A4A4A] leading-relaxed">
                On Culturin, you can invite travelers to participate in authentic cultural rituals that have been passed down through generations, creating unforgettable experiences.
              </p>
              <Button 
                className="bg-[#2B2B2B] text-white hover:bg-[#1C1C1C] text-base py-6 px-8 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
                onClick={() => navigate('/operator')}
              >
                Host a Cultural Ceremony
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-card h-[400px]">
                <Image 
                  src="https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1920&auto=format&fit=crop"
                  alt="Traditional tea ceremony" 
                  aspectRatio="wide"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Rural Traditions Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <div className="rounded-2xl overflow-hidden shadow-card h-[400px]">
                <Image 
                  src="https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?q=80&w=1920&auto=format&fit=crop"
                  alt="Photo of desert sand" 
                  aspectRatio="wide"
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="order-2">
              <h2 className="text-3xl md:text-4xl font-medium mb-6 text-[#2B2B2B]">Showcase Rural Traditions</h2>
              <p className="text-lg mb-6 text-[#4A4A4A] leading-relaxed">
                Rural communities hold wisdom that city life often forgets. From farming techniques to traditional crafts, these skills are living heritage that deserve to be celebrated.
              </p>
              <p className="text-lg mb-8 text-[#4A4A4A] leading-relaxed">
                As a Culturin host, you can invite travelers to experience the authentic rhythms of rural life, forging connections between urban visitors and countryside traditions.
              </p>
              <Button 
                className="bg-[#2B2B2B] text-white hover:bg-[#1C1C1C] text-base py-6 px-8 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
                onClick={() => navigate('/operator')}
              >
                Share Rural Traditions
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Teaser / CTA */}
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
