
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Upload, Users, CalendarCheck, Compass, PencilRuler, ShoppingCart, ChartBar, Megaphone, Crown, Check, ArrowRight } from "lucide-react";
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
            className={`w-full h-full object-cover transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-10"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30 pt-32 pb-20">
          <div className="max-w-2xl">
            <div className="space-y-6">
              <h1 className={`font-medium text-3xl md:text-5xl text-white tracking-tight leading-tight transition-all duration-700 ease-out ${
                animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Tour Operator Platform <br />
                For Cultural Experiences
              </h1>
              
              <p className={`text-lg md:text-xl text-white/90 transition-all duration-700 ease-out ${
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
                    className="bg-white text-black hover:bg-gray-100 text-base py-6 px-8 rounded-xl font-medium transition-all duration-300 w-full sm:w-auto"
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-4">Powerful Platform Modules</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to create, manage and grow your cultural experiences business</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
            {/* Module 1: Itinerary Builder */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] overflow-hidden">
              <CardHeader className="pb-2">
                <div className="bg-gray-50 p-3 inline-flex rounded-full mb-3">
                  <PencilRuler className="w-5 h-5 text-gray-700" />
                </div>
                <CardTitle className="text-lg">Itinerary Builder</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm">
                  Create narrative-rich travel experiences
                </p>
              </CardContent>
            </Card>
            
            {/* Module 2: Booking Layer */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] overflow-hidden">
              <CardHeader className="pb-2">
                <div className="bg-gray-50 p-3 inline-flex rounded-full mb-3">
                  <ShoppingCart className="w-5 h-5 text-gray-700" />
                </div>
                <CardTitle className="text-lg">Booking Layer</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm">
                  Branded checkout with flexible payments
                </p>
              </CardContent>
            </Card>
            
            {/* Module 3: Storytelling Studio */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] overflow-hidden">
              <CardHeader className="pb-2">
                <div className="bg-gray-50 p-3 inline-flex rounded-full mb-3">
                  <Megaphone className="w-5 h-5 text-gray-700" />
                </div>
                <CardTitle className="text-lg">Storytelling</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm">
                  AI-assisted content and visual assets
                </p>
              </CardContent>
            </Card>
            
            {/* Module 4: Client Dashboard */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] overflow-hidden">
              <CardHeader className="pb-2">
                <div className="bg-gray-50 p-3 inline-flex rounded-full mb-3">
                  <Users className="w-5 h-5 text-gray-700" />
                </div>
                <CardTitle className="text-lg">Client CRM</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm">
                  Customer retention and loyalty tools
                </p>
              </CardContent>
            </Card>
            
            {/* Module 5: Analytics */}
            <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-4px] overflow-hidden">
              <CardHeader className="pb-2">
                <div className="bg-gray-50 p-3 inline-flex rounded-full mb-3">
                  <ChartBar className="w-5 h-5 text-gray-700" />
                </div>
                <CardTitle className="text-lg">Analytics</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm">
                  Actionable insights for growth
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Build Your Brand Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-medium mb-6">Build Your Brand</h2>
              <p className="text-lg mb-6 text-gray-600 leading-relaxed">
                Legacy platforms help you manage trips. Culturin helps you build a brand and grow a following.
              </p>
              <p className="text-lg mb-8 text-gray-600 leading-relaxed">
                Create unforgettable cultural experiences while our platform handles the operations.
              </p>
              <Button 
                className="bg-black text-white hover:bg-gray-800 text-base py-6 px-8 rounded-xl font-medium transition-all duration-300"
                onClick={() => navigate('/culturin-pro')}
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-lg h-96">
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-medium mb-4">For Modern Tour Operators</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Made for independent operators offering cultural and community-based experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="bg-gray-50 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                  <Compass className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-xl font-medium mb-3">Niche Markets</h3>
                <p className="text-gray-600">
                  Perfect for diaspora, wellness, solo travel, and cultural immersion experiences
                </p>
              </CardContent>
            </Card>
            
            <Card className="border shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="bg-gray-50 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                  <CalendarCheck className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-xl font-medium mb-3">Digital Upgrade</h3>
                <p className="text-gray-600">
                  Replace spreadsheets and WhatsApp with one integrated system
                </p>
              </CardContent>
            </Card>
            
            <Card className="border shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="bg-gray-50 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                  <Globe className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-xl font-medium mb-3">Creator Economy</h3>
                <p className="text-gray-600">
                  For chefs, artists, and creators expanding into travel experiences
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-medium mb-4">Simple Pricing</h2>
            <p className="text-lg text-gray-600">No booking commissions. No hidden fees. One flat monthly subscription.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <Card className="border hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-lg font-medium text-gray-600 mb-2">Starter</h3>
                <p className="text-3xl font-bold mb-1">£49</p>
                <p className="text-sm text-gray-500 mb-6">per month</p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Basic itinerary builder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Direct booking widget</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Simple guest profiles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Basic analytics</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-black py-6" size="lg" onClick={() => navigate('/sign-in')}>
                  Choose Starter
                </Button>
              </CardContent>
            </Card>
            
            {/* Growth Plan */}
            <Card className="border-2 border-black shadow-lg relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-4 py-1 rounded-full text-sm font-medium">Popular</div>
              <CardContent className="p-8">
                <h3 className="text-lg font-medium text-gray-600 mb-2">Growth</h3>
                <p className="text-3xl font-bold mb-1">£99</p>
                <p className="text-sm text-gray-500 mb-6">per month</p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Advanced itinerary builder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Full booking system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>CRM & automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Marketing toolkit</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-black hover:bg-gray-800 py-6" size="lg" onClick={() => navigate('/sign-in')}>
                  Choose Growth
                </Button>
              </CardContent>
            </Card>
            
            {/* Pro Plan */}
            <Card className="border hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-lg font-medium text-gray-600 mb-2">Pro</h3>
                <p className="text-3xl font-bold mb-1">£199</p>
                <p className="text-sm text-gray-500 mb-6">per month</p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Everything in Growth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Team collaboration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Advanced integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Custom branding</span>
                  </li>
                </ul>
                
                <Button className="w-full bg-black py-6" size="lg" onClick={() => navigate('/sign-in')}>
                  Choose Pro
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-black to-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-medium mb-6 animate-fade-in">Ready to transform your business?</h2>
            <p className="text-xl text-white/80 mb-10 animate-fade-in" style={{animationDelay: '0.1s'}}>
              Join cultural tour operators already growing with Culturin
            </p>
            <Button 
              className="bg-white hover:bg-gray-200 text-black py-6 px-10 rounded-xl text-base animate-fade-in transition-all duration-300"
              style={{animationDelay: '0.2s'}}
              onClick={() => navigate('/culturin-pro')}
              size="lg"
            >
              <Upload className="w-5 h-5 mr-3" />
              Start Free Trial
            </Button>
            <p className="mt-6 text-white/60 animate-fade-in" style={{animationDelay: '0.3s'}}>
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
