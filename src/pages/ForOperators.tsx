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
    window.scrollTo(0, 0);
    setAnimateItems(true);
    
    // Preload hero image
    const img = document.createElement('img');
    img.src = "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=1920&auto=format&fit=crop";
    img.onload = () => setImageLoaded(true);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
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
          
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-10"></div>
          
          {/* Grain texture overlay */}
          <div className="absolute inset-0 opacity-15 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-20"></div>
        </div>
        
        <div className="container-custom relative z-30 pt-32 pb-20">
          <div className="max-w-2xl">
            <div className="space-y-6">
              <h1 className={`font-medium text-3xl md:text-4xl text-white tracking-tight leading-tight text-shadow-lg transition-all duration-700 ease-out ${
                animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Tour Operator Platform <br />
                For Cultural Experiences
              </h1>
              
              <p className={`text-base text-white text-shadow transition-all duration-700 ease-out ${
                animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
                style={{transitionDelay: '200ms'}}
              >
                Design and grow cultural travel experiences without complex tools
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div 
                  className={`transition-all duration-500 ease-out ${
                    animateItems ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                  }`}
                  style={{transitionDelay: '300ms'}}
                >
                  <Button 
                    className="bg-white text-black hover:bg-gray-100 text-base py-5 px-6 rounded-xl font-medium transition-all duration-300 w-full sm:w-auto"
                    onClick={() => navigate('/culturin-pro')}
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Start Free Trial
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Core Modules Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-medium mb-6 text-center animate-fade-in">Platform Modules</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
            {/* Module 1: Itinerary Builder */}
            <Card className="border-0 shadow-soft hover:shadow-card transition-all duration-300 hover:translate-y-[-4px]">
              <CardContent className="p-5 flex flex-col items-center text-center">
                <div className="bg-gray-100 p-3 rounded-full mb-3">
                  <PencilRuler className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-base font-medium mb-2">Itinerary Builder</h3>
                <p className="text-gray-600 text-sm">
                  Create narrative-rich travel experiences
                </p>
              </CardContent>
            </Card>
            
            {/* Module 2: Booking Layer */}
            <Card className="border-0 shadow-soft hover:shadow-card transition-all duration-300 hover:translate-y-[-4px]">
              <CardContent className="p-5 flex flex-col items-center text-center">
                <div className="bg-gray-100 p-3 rounded-full mb-3">
                  <ShoppingCart className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-base font-medium mb-2">Booking Layer</h3>
                <p className="text-gray-600 text-sm">
                  Branded checkout with flexible payments
                </p>
              </CardContent>
            </Card>
            
            {/* Module 3: Storytelling Studio */}
            <Card className="border-0 shadow-soft hover:shadow-card transition-all duration-300 hover:translate-y-[-4px]">
              <CardContent className="p-5 flex flex-col items-center text-center">
                <div className="bg-gray-100 p-3 rounded-full mb-3">
                  <Megaphone className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-base font-medium mb-2">Storytelling</h3>
                <p className="text-gray-600 text-sm">
                  AI-assisted content and visual assets
                </p>
              </CardContent>
            </Card>
            
            {/* Module 4: Client Dashboard */}
            <Card className="border-0 shadow-soft hover:shadow-card transition-all duration-300 hover:translate-y-[-4px]">
              <CardContent className="p-5 flex flex-col items-center text-center">
                <div className="bg-gray-100 p-3 rounded-full mb-3">
                  <Users className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-base font-medium mb-2">Client CRM</h3>
                <p className="text-gray-600 text-sm">
                  Customer retention and loyalty tools
                </p>
              </CardContent>
            </Card>
            
            {/* Module 5: Backoffice */}
            <Card className="border-0 shadow-soft hover:shadow-card transition-all duration-300 hover:translate-y-[-4px]">
              <CardContent className="p-5 flex flex-col items-center text-center">
                <div className="bg-gray-100 p-3 rounded-full mb-3">
                  <ChartBar className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-base font-medium mb-2">Analytics</h3>
                <p className="text-gray-600 text-sm">
                  Actionable insights for growth
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Build Your Brand Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl font-medium mb-4">Build Your Brand</h2>
              <p className="text-base mb-4 text-gray-600 leading-relaxed">
                Legacy platforms help you manage trips. Culturin helps you build a brand and grow a following.
              </p>
              <p className="text-base mb-6 text-gray-600 leading-relaxed">
                Create unforgettable cultural experiences while our platform handles the operations.
              </p>
              <Button 
                className="bg-black text-white hover:bg-gray-800 text-base py-5 px-6 rounded-xl font-medium transition-all duration-300"
                onClick={() => navigate('/culturin-pro')}
              >
                Start Free Trial
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-xl overflow-hidden shadow-card h-80">
                <Image 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1920&auto=format&fit=crop"
                  alt="Cultural experience platform" 
                  aspectRatio="wide"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-medium mb-4">For Modern Tour Operators</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Made for independent operators offering cultural and community-based experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full mb-3">
                <Compass className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-base font-medium mb-2">Niche Markets</h3>
              <p className="text-gray-600 text-sm">
                Perfect for diaspora, wellness, solo travel, and cultural immersion experiences
              </p>
            </div>
            
            <div className="p-5 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full mb-3">
                <CalendarCheck className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-base font-medium mb-2">Digital Upgrade</h3>
              <p className="text-gray-600 text-sm">
                Replace spreadsheets and WhatsApp with one integrated system
              </p>
            </div>
            
            <div className="p-5 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full mb-3">
                <Globe className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-base font-medium mb-2">Creator Economy</h3>
              <p className="text-gray-600 text-sm">
                For chefs, artists, and creators expanding into travel experiences
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h2 className="text-2xl font-medium mb-3">Simple Pricing</h2>
            <p className="text-base text-gray-600">No booking commissions. No hidden fees. One flat monthly subscription.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Starter Plan */}
            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-base font-medium text-gray-600 mb-2">Starter</h3>
                <p className="text-2xl font-bold mb-1">£49</p>
                <p className="text-sm text-gray-500 mb-4">per month</p>
                
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Basic itinerary builder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Direct booking widget</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Simple guest profiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Basic analytics</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-black" onClick={() => navigate('/sign-in')}>
                  Choose Starter
                </Button>
              </CardContent>
            </Card>
            
            {/* Growth Plan */}
            <Card className="border-2 border-black shadow-lg relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded-full text-xs font-medium">Popular</div>
              <CardContent className="p-6">
                <h3 className="text-base font-medium text-gray-600 mb-2">Growth</h3>
                <p className="text-2xl font-bold mb-1">£99</p>
                <p className="text-sm text-gray-500 mb-4">per month</p>
                
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Advanced itinerary builder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Full booking system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">CRM & automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Marketing toolkit</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-black hover:bg-gray-800" onClick={() => navigate('/sign-in')}>
                  Choose Growth
                </Button>
              </CardContent>
            </Card>
            
            {/* Pro Plan */}
            <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-base font-medium text-gray-600 mb-2">Pro</h3>
                <p className="text-2xl font-bold mb-1">£199</p>
                <p className="text-sm text-gray-500 mb-4">per month</p>
                
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Everything in Growth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Team collaboration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Advanced integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    <span className="text-sm">Custom branding</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-black" onClick={() => navigate('/sign-in')}>
                  Choose Pro
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-medium mb-4 animate-fade-in">Ready to transform your business?</h2>
            <p className="text-base text-gray-600 mb-6 animate-fade-in" style={{animationDelay: '0.1s'}}>
              Join cultural tour operators already growing with Culturin
            </p>
            <Button 
              className="bg-black hover:bg-gray-800 text-white py-5 px-6 rounded-xl text-base animate-fade-in transition-all duration-300"
              style={{animationDelay: '0.2s'}}
              onClick={() => navigate('/culturin-pro')}
            >
              <Upload className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <p className="mt-3 text-sm text-gray-500 animate-fade-in" style={{animationDelay: '0.3s'}}>
              No credit card required. 14-day free trial
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ForOperators;
