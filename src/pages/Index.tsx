
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, BarChart2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TravelWithMeForm from "@/components/TravelWithMeForm";

const Index = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const [userType, setUserType] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission
    console.log({ name, email, userType });
    setName("");
    setEmail("");
    setUserType("");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header type="traveler" />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[650px]">
        <div className="absolute inset-0 bg-black">
          <img 
            src="https://images.unsplash.com/photo-1504150558240-0b4fd8946624?q=80&w=2070" 
            alt="Solo traveler walking through a colorful open-air market" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
        </div>
        
        <div className="relative container-custom h-full flex flex-col justify-center pb-16 max-w-4xl">
          <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
            <h1 className="heading-xl text-white mb-6">
              Travel With Culture, <br /><span className="text-culturin-mustard">Not Just Itineraries.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-2xl">
              Join meaningful group trips or publish your own cultural experience — with trust, flexibility, and human connection.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="btn-primary text-base py-6 px-8">
                Explore Group Trips
              </Button>
              <Button variant="outline" className="btn-outline text-base py-6 px-8">
                Create an Experience
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <h2 className="heading-lg mb-4">How It Works</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Travelers */}
            <div className="bg-culturin-white rounded-xl p-8 shadow-soft hover:shadow-card transition-all duration-300 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <h3 className="heading-md mb-6 text-culturin-indigo">Discover Your People</h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <span className="bg-culturin-mustard/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 text-culturin-indigo font-bold">1</span>
                  <p className="text-lg">Tell us where you want to go</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-culturin-mustard/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 text-culturin-indigo font-bold">2</span>
                  <p className="text-lg">Get matched with others on the same path</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-culturin-mustard/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 text-culturin-indigo font-bold">3</span>
                  <p className="text-lg">Join or create a curated cultural group trip</p>
                </li>
              </ul>
              <div className="mt-8">
                <Button className="btn-primary">Start Your Journey</Button>
              </div>
            </div>
            
            {/* For Operators */}
            <div className="bg-culturin-indigo rounded-xl p-8 shadow-soft hover:shadow-card transition-all duration-300 text-white animate-fade-in" style={{animationDelay: '0.6s'}}>
              <h3 className="heading-md mb-6 text-culturin-mustard">Empower Your Culture</h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <span className="bg-culturin-mustard/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 text-white font-bold">1</span>
                  <p className="text-lg">Publish your experience with beautiful storytelling</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-culturin-mustard/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 text-white font-bold">2</span>
                  <p className="text-lg">Get bookings from global travelers</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-culturin-mustard/20 rounded-full w-8 h-8 flex items-center justify-center mr-4 text-white font-bold">3</span>
                  <p className="text-lg">Build trust, not just tours</p>
                </li>
              </ul>
              <div className="mt-8">
                <Button className="bg-white text-culturin-indigo hover:bg-white/90">Become an Operator</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Travel Reimagined Section */}
      <section className="py-20 bg-culturin-white/50">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <h2 className="heading-lg mb-4">What Makes Culturin Different</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tile 1 */}
            <div className="bg-white rounded-xl p-8 shadow-soft hover:shadow-card transition-all duration-300 animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="h-16 w-16 rounded-full bg-culturin-mustard/20 flex items-center justify-center mb-6">
                <BarChart2 className="w-8 h-8 text-culturin-clay" />
              </div>
              <h3 className="text-xl font-medium mb-4">Group Travel, Reinvented</h3>
              <p className="text-gray-600 mb-2">Travel solo — but never alone.</p>
              <p className="text-gray-600">Join curated trips with aligned travelers.</p>
            </div>
            
            {/* Tile 2 */}
            <div className="bg-white rounded-xl p-8 shadow-soft hover:shadow-card transition-all duration-300 animate-fade-in" style={{animationDelay: '0.5s'}}>
              <div className="h-16 w-16 rounded-full bg-culturin-clay/20 flex items-center justify-center mb-6">
                <BarChart2 className="w-8 h-8 text-culturin-mustard" />
              </div>
              <h3 className="text-xl font-medium mb-4">Designed for Trust</h3>
              <p className="text-gray-600 mb-2">Verified operators.</p>
              <p className="text-gray-600">Human-led safety layers, not algorithms.</p>
            </div>
            
            {/* Tile 3 */}
            <div className="bg-white rounded-xl p-8 shadow-soft hover:shadow-card transition-all duration-300 animate-fade-in" style={{animationDelay: '0.7s'}}>
              <div className="h-16 w-16 rounded-full bg-culturin-indigo/20 flex items-center justify-center mb-6">
                <BarChart2 className="w-8 h-8 text-culturin-indigo" />
              </div>
              <h3 className="text-xl font-medium mb-4">Culture at the Center</h3>
              <p className="text-gray-600 mb-2">Every trip celebrates local wisdom, art, and connection.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-20 bg-culturin-mustard/10">
        <div className="container-custom max-w-4xl text-center">
          <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
            <div className="text-4xl md:text-5xl text-culturin-indigo font-medium mb-8">
              <span className="block text-5xl md:text-7xl text-culturin-clay mb-4">"</span>
              Culturin isn't just about travel — it's about meaning. I've never felt this seen on a trip before.
            </div>
            <p className="text-xl font-medium">– Sofia, Solo Traveler from Barcelona</p>
          </div>
        </div>
      </section>
      
      {/* Operator Invitation Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
              <h2 className="heading-lg mb-6">Are You a Local Guide, Artist, or Cultural Host?</h2>
              <p className="text-xl mb-8 leading-relaxed">
                Bring your experience to the world. We give you the tools to publish, promote, and grow — with full creative freedom.
              </p>
              <Button className="btn-secondary text-base py-6 px-8">
                Start Publishing
              </Button>
            </div>
            <div className="relative h-80 md:h-[500px] rounded-xl overflow-hidden shadow-card animate-fade-in" style={{animationDelay: '0.4s'}}>
              <img 
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1374&auto=format&fit=crop" 
                alt="Local guide showing travelers authentic experiences" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-8">
                <p className="text-white text-lg font-medium">Share your cultural heritage with the world</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Travel With Me Form Section */}
      <section className="py-20 bg-culturin-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <h2 className="heading-lg mb-4">Travel With Me</h2>
              <p className="text-xl text-gray-600">Tell us your travel preferences and we'll match you with the perfect trip</p>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
              <TravelWithMeForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Community Section */}
      <section className="py-20 bg-culturin-indigo text-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="heading-lg mb-6 text-white animate-fade-in" style={{animationDelay: '0.2s'}}>
              This is just the beginning. Join us.
            </h2>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input 
                    placeholder="First Name" 
                    className="bg-white/20 border-white/20 text-white placeholder:text-white/60"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Input 
                    placeholder="Email" 
                    type="email"
                    className="bg-white/20 border-white/20 text-white placeholder:text-white/60"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger className="bg-white/20 border-white/20 text-white">
                    <SelectValue placeholder="I am a..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="traveler">Solo Traveler</SelectItem>
                    <SelectItem value="operator">Operator</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button type="submit" className="w-full bg-white text-culturin-indigo hover:bg-white/90 py-6 font-medium">
                  Join Now
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <span className="font-bold text-3xl">Culturin</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Connecting cultural travelers with authentic local experiences, fostering meaningful connections around the world.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-xl mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="/" className="text-gray-300 hover:text-culturin-mustard transition-colors">About</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-culturin-mustard transition-colors">Contact</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-culturin-mustard transition-colors">FAQs</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-culturin-mustard transition-colors">Privacy</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-xl mb-6">Connect</h3>
              <div className="flex space-x-4 mb-6">
                <a href="#" className="text-gray-300 hover:text-culturin-mustard transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-culturin-mustard transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
              <p className="text-gray-300">hello@culturin.com</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 Culturin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
