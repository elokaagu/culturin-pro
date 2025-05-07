
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import TripCard from "@/components/TripCard";
import JourneyForm from "@/components/JourneyForm";
import HowItWorks from "@/components/HowItWorks";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock trip data
const trips = [
  {
    id: "trip1",
    name: "Artisan Workshop Tour",
    location: "Oaxaca, Mexico",
    operatorName: "Maria Gonzalez",
    dates: "Jun 5-12, 2025",
    groupSize: 8,
    tags: ["art", "crafts", "culture"],
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=400"
  },
  {
    id: "trip2",
    name: "Desert Meditation Journey",
    location: "Marrakech, Morocco",
    operatorName: "Ahmed Lasri",
    dates: "Sep 15-22, 2025",
    groupSize: 6,
    tags: ["spiritual", "mindfulness", "nature"],
    imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=400"
  },
  {
    id: "trip3",
    name: "Ancient Temple Photography",
    location: "Kyoto, Japan",
    operatorName: "Yuki Tanaka",
    dates: "Apr 1-8, 2025",
    groupSize: 5,
    tags: ["photography", "history", "architecture"],
    imageUrl: "https://images.unsplash.com/photo-1580639613257-8fdd89df31d9?q=80&w=400"
  },
  {
    id: "trip4",
    name: "Island Cooking Masterclass",
    location: "Bali, Indonesia",
    operatorName: "Putu Widjaja",
    dates: "Jul 10-18, 2025",
    groupSize: 7,
    tags: ["food", "cooking", "nature"],
    imageUrl: "https://images.unsplash.com/photo-1562602833-0f4ab2fc46e3?q=80&w=400"
  }
];

const Index = () => {
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);
  
  const filterTrips = (tab: string) => {
    setSelectedTab(tab);
    // In a real app, this would filter the trips based on the selected tab
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header type="traveler" />
      
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[580px]">
        <div className="absolute inset-0 bg-black">
          <img 
            src="https://images.unsplash.com/photo-1504150558240-0b4fd8946624?q=80&w=2070" 
            alt="Group of travelers exploring a colorful market" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20" />
        </div>
        
        <div className="relative container-custom h-full flex flex-col justify-center pb-16">
          <div className="max-w-2xl mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <h1 className="heading-xl text-white mb-6">
              Discover Culture, <span className="text-culturin-mustard">Together</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
              Join curated group trips with like-minded travelers. Safe, flexible, unforgettable.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="btn-primary text-base py-6">
                Explore Trips
              </Button>
              <Button variant="outline" className="btn-outline text-base py-6">
                Tell Us Where You Want To Go
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trip Discovery Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <h2 className="heading-lg mb-3">Upcoming Cultural Experiences</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Discover authentic experiences led by local experts and join fellow travelers on your next adventure</p>
            <div className="section-divider"></div>
          </div>
          
          <div className="flex overflow-x-auto pb-6 mb-10 space-x-2 animate-fade-in" style={{animationDelay: '0.6s'}}>
            {["all", "art", "food", "spiritual", "photography", "history"].map((tab) => (
              <Button
                key={tab}
                variant={selectedTab === tab ? "default" : "outline"}
                className={`whitespace-nowrap ${
                  selectedTab === tab ? "bg-culturin-indigo shadow-md" : "hover:border-culturin-indigo"
                }`}
                onClick={() => filterTrips(tab)}
              >
                {tab === "all" ? "All Experiences" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trips.map((trip, index) => (
              <div 
                key={trip.id} 
                className="animate-fade-in" 
                style={{animationDelay: `${0.2 + index * 0.1}s`}}
              >
                <TripCard {...trip} />
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-16 animate-fade-in" style={{animationDelay: '1s'}}>
            <Button className="btn-secondary text-base py-6 px-8">
              View All Experiences
            </Button>
          </div>
        </div>
      </section>
      
      {/* Create Journey Section */}
      <section className="py-20 bg-culturin-sand/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center animate-fade-in" style={{animationDelay: '0.2s'}}>
              <h2 className="heading-lg mb-6">
                Share Your <span className="text-culturin-terracotta">Journey</span> Plans
              </h2>
              <p className="text-lg mb-8 leading-relaxed">
                Tell us where you want to go and what interests you. We'll connect you with like-minded travelers planning similar experiences.
              </p>
              <div className="bg-white rounded-lg p-8 border border-gray-100 shadow-md mb-8">
                <div className="flex items-start mb-6">
                  <div className="bg-culturin-mustard/20 p-3 rounded-full mr-4">
                    <span className="text-culturin-indigo font-bold text-xl">92%</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Travelers find better experiences</h3>
                    <p className="text-gray-600">when traveling with others who share their interests</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-culturin-mustard/20 p-3 rounded-full mr-4">
                    <span className="text-culturin-indigo font-bold text-xl">68%</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Solo travelers prefer small groups</h3>
                    <p className="text-gray-600">for a balance of connection and independence</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
              <JourneyForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Operator CTA Section */}
      <section className="py-20 bg-culturin-indigo text-white">
        <div className="container-custom text-center">
          <h2 className="heading-lg mb-6 text-white animate-fade-in" style={{animationDelay: '0.2s'}}>
            Are You a Cultural Experience Provider?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-white/90 animate-fade-in" style={{animationDelay: '0.4s'}}>
            Share your story, publish your tours, and connect with travelers seeking authentic experiences.
          </p>
          <Link to="/operator" className="animate-fade-in" style={{animationDelay: '0.6s'}}>
            <Button className="bg-white text-culturin-indigo hover:bg-white/90 text-base py-6 px-8 shadow-lg">
              Become an Operator
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <span className="font-playfair font-bold text-3xl">Culturin</span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Connecting cultural travelers with authentic local experiences, fostering meaningful connections around the world.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-xl mb-6 font-playfair">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="/" className="text-gray-300 hover:text-culturin-mustard transition-colors">Discover Experiences</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-culturin-mustard transition-colors">How It Works</Link></li>
                <li><Link to="/operator" className="text-gray-300 hover:text-culturin-mustard transition-colors">For Operators</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-culturin-mustard transition-colors">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-xl mb-6 font-playfair">Contact</h3>
              <p className="text-gray-300 mb-3">hello@culturin.com</p>
              <p className="text-gray-300 mb-6">+1 (555) 123-4567</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-culturin-mustard transition-colors">Twitter</a>
                <a href="#" className="text-gray-300 hover:text-culturin-mustard transition-colors">Instagram</a>
                <a href="#" className="text-gray-300 hover:text-culturin-mustard transition-colors">Facebook</a>
              </div>
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
