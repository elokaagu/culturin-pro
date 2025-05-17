
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Upload, Users, CalendarCheck, Compass, PencilRuler, ShoppingCart, ChartBar, Megaphone, Crown, Check } from "lucide-react";
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
    img.src = "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=1920&auto=format&fit=crop";
    img.onload = () => setImageLoaded(true);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        {/* Hero background image */}
        <div className="absolute inset-0 overflow-hidden z-0 bg-gray-900">
          <Image 
            src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=1920&auto=format&fit=crop" 
            alt="Traditional boats on canal in Venice with historic buildings" 
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
                Cultural Operating System<br />
                For Modern Tour Operators
              </h1>
              
              <p className={`text-base md:text-xl text-white text-shadow transition-all duration-700 ease-out ${
                animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
                style={{transitionDelay: '200ms'}}
              >
                Design, narrate, personalize, and grow rich cultural travel experiences<br className="hidden md:block" />
                without code, middlemen, or generic tools.
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
                    Start Your Platform
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
                    onClick={() => navigate('/culturin-pro')}
                  >
                    <Crown className="w-5 h-5 mr-2 text-[#333333]" />
                    Explore Pro Features
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Core Modules Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="heading-lg text-center mb-6 animate-fade-in">The Culturin OS Platform</h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto animate-fade-in">
            Empowering operators to turn itineraries into narratives, bookings into brand moments, and clients into communities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 animate-fade-in" style={{animationDelay: '0.2s'}}>
            {/* Module 1: Itinerary Builder */}
            <Card className="border-0 shadow-soft hover:shadow-card transition-all duration-300 hover:translate-y-[-4px]">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="bg-culturin-mustard/10 p-4 rounded-full mb-6">
                  <PencilRuler className="w-8 h-8 text-culturin-indigo" />
                </div>
                <h3 className="text-xl font-medium mb-4 text-[#1A1A1A]">Itinerary Builder</h3>
                <p className="text-[#4A4A4A]">
                  Craft narrative-rich, modular travel itineraries that double as marketing material.
                </p>
              </CardContent>
            </Card>
            
            {/* Module 2: Booking Layer */}
            <Card className="border-0 shadow-soft hover:shadow-card transition-all duration-300 hover:translate-y-[-4px]">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="bg-culturin-mustard/10 p-4 rounded-full mb-6">
                  <ShoppingCart className="w-8 h-8 text-culturin-indigo" />
                </div>
                <h3 className="text-xl font-medium mb-4 text-[#1A1A1A]">Booking Layer</h3>
                <p className="text-[#4A4A4A]">
                  Transform bookings into seamless, brand-aligned experiences with flexible payment options.
                </p>
              </CardContent>
            </Card>
            
            {/* Module 3: Storytelling Studio */}
            <Card className="border-0 shadow-soft hover:shadow-card transition-all duration-300 hover:translate-y-[-4px]">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="bg-culturin-mustard/10 p-4 rounded-full mb-6">
                  <Megaphone className="w-8 h-8 text-culturin-indigo" />
                </div>
                <h3 className="text-xl font-medium mb-4 text-[#1A1A1A]">Storytelling Studio</h3>
                <p className="text-[#4A4A4A]">
                  Market trips with AI-assisted content, caption builders, and visual asset management.
                </p>
              </CardContent>
            </Card>
            
            {/* Module 4: Client Dashboard */}
            <Card className="border-0 shadow-soft hover:shadow-card transition-all duration-300 hover:translate-y-[-4px]">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="bg-culturin-mustard/10 p-4 rounded-full mb-6">
                  <Users className="w-8 h-8 text-culturin-indigo" />
                </div>
                <h3 className="text-xl font-medium mb-4 text-[#1A1A1A]">Client Dashboard</h3>
                <p className="text-[#4A4A4A]">
                  Build long-term relationships with lightweight CRM, retention tools, and loyalty programs.
                </p>
              </CardContent>
            </Card>
            
            {/* Module 5: Backoffice */}
            <Card className="border-0 shadow-soft hover:shadow-card transition-all duration-300 hover:translate-y-[-4px]">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="bg-culturin-mustard/10 p-4 rounded-full mb-6">
                  <ChartBar className="w-8 h-8 text-culturin-indigo" />
                </div>
                <h3 className="text-xl font-medium mb-4 text-[#1A1A1A]">Backoffice</h3>
                <p className="text-[#4A4A4A]">
                  Track bookings, payments, and margins with clear dashboards and smart suggestions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Strategic Position Section */}
      <section className="py-16 bg-[#F8F5F2]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-medium mb-6 text-[#2B2B2B]">Build Your Brand, Not Just Manage Trips</h2>
              <p className="text-lg mb-6 text-[#4A4A4A] leading-relaxed">
                Legacy platforms help you manage trips. Culturin helps you build a brand, connect with culture, and grow a following.
              </p>
              <p className="text-lg mb-8 text-[#4A4A4A] leading-relaxed">
                With Culturin OS, you can focus on what matters — creating unforgettable cultural experiences while our platform handles the rest.
              </p>
              <Button 
                className="bg-[#2B2B2B] text-white hover:bg-[#1C1C1C] text-base py-6 px-8 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
                onClick={() => navigate('/operator')}
              >
                Start Your Free Trial
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-card h-[400px]">
                <Image 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1920&auto=format&fit=crop"
                  alt="Cultural experience platform" 
                  aspectRatio="wide"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section (New) */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium mb-6">For Modern Tour Operators</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Culturin serves independent operators offering cultural, community-based, and identity-driven travel experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="bg-culturin-mustard/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Compass className="w-6 h-6 text-culturin-indigo" />
              </div>
              <h3 className="text-xl font-medium mb-3">Niche Cultural Markets</h3>
              <p className="text-gray-600">
                Perfect for operators specializing in diaspora, wellness, solo female travel, heritage, and cultural immersion.
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="bg-culturin-mustard/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <CalendarCheck className="w-6 h-6 text-culturin-indigo" />
              </div>
              <h3 className="text-xl font-medium mb-3">Transition From Manual</h3>
              <p className="text-gray-600">
                Upgrade from spreadsheets, PDFs, WhatsApp and multiple disconnected tools to one integrated system.
              </p>
            </div>
            
            <div className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="bg-culturin-mustard/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <Globe className="w-6 h-6 text-culturin-indigo" />
              </div>
              <h3 className="text-xl font-medium mb-3">Creator Economy</h3>
              <p className="text-gray-600">
                Designed for chefs, artists, yoga instructors, and creators moving into experience design and travel offerings.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-16 bg-[#FCFBF9]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium mb-6">Simple, Transparent Pricing</h2>
            <p className="text-lg text-[#4A4A4A]">No booking commissions. No hidden fees. Just one flat monthly subscription.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-lg font-medium text-[#4A4A4A] mb-2">Starter</h3>
                <p className="text-3xl font-bold mb-1">£49</p>
                <p className="text-sm text-[#6B6B6B] mb-6">per month</p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Basic itinerary builder</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Direct booking widget</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Simple guest profiles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Basic analytics</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-[#2B2B2B]" onClick={() => navigate('/sign-in')}>
                  Choose Starter
                </Button>
              </CardContent>
            </Card>
            
            {/* Growth Plan */}
            <Card className="border-2 border-culturin-indigo shadow-lg relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-culturin-indigo text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</div>
              <CardContent className="p-8">
                <h3 className="text-lg font-medium text-[#4A4A4A] mb-2">Growth</h3>
                <p className="text-3xl font-bold mb-1">£99</p>
                <p className="text-sm text-[#6B6B6B] mb-6">per month</p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Advanced itinerary builder</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Full booking & payment system</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>CRM & automation workflows</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Marketing toolkit with AI assistance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Complete business analytics</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-culturin-indigo hover:bg-culturin-indigo/90" onClick={() => navigate('/sign-in')}>
                  Choose Growth
                </Button>
              </CardContent>
            </Card>
            
            {/* Pro Plan */}
            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-lg font-medium text-[#4A4A4A] mb-2">Pro</h3>
                <p className="text-3xl font-bold mb-1">£199</p>
                <p className="text-sm text-[#6B6B6B] mb-6">per month</p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Everything in Growth</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Team collaboration tools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Advanced API integrations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Custom branding options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span>Priority support & consulting</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-[#2B2B2B]" onClick={() => navigate('/sign-in')}>
                  Choose Pro
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-culturin-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-6 animate-fade-in">Ready to transform your tour business?</h2>
            <p className="text-xl text-[#4A4A4A] mb-10 animate-fade-in" style={{animationDelay: '0.1s'}}>
              Join hundreds of cultural tour operators already growing with Culturin OS.
            </p>
            <Button 
              className="bg-culturin-indigo hover:bg-culturin-indigo/90 hover:scale-[1.02] text-white py-6 px-10 rounded-xl text-lg animate-fade-in transition-all duration-300"
              style={{animationDelay: '0.2s'}}
              onClick={() => navigate('/operator')}
            >
              <Upload className="w-5 h-5 mr-2" />
              Start Your Free Trial
            </Button>
            <p className="mt-4 text-sm text-[#6B6B6B] animate-fade-in" style={{animationDelay: '0.3s'}}>
              No credit card required. 14-day free trial.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ForOperators;
