
import { useState } from "react";
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
    imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=400"
  },
  {
    id: "trip4",
    name: "Island Cooking Masterclass",
    location: "Bali, Indonesia",
    operatorName: "Putu Widjaja",
    dates: "Jul 10-18, 2025",
    groupSize: 7,
    tags: ["food", "cooking", "nature"],
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=400"
  }
];

const Index = () => {
  const [selectedTab, setSelectedTab] = useState<string>("all");
  
  const filterTrips = (tab: string) => {
    setSelectedTab(tab);
    // In a real app, this would filter the trips based on the selected tab
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header type="traveler" />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[480px]">
        <div className="absolute inset-0 bg-black">
          <img 
            src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070" 
            alt="Group of travelers exploring a colorful market" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        
        <div className="relative container-custom h-full flex flex-col justify-end pb-16">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-4">
              Discover Culture, Together
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Join curated group trips with like-minded travelers. Safe, flexible, unforgettable.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-culturin-mustard text-culturin-indigo hover:bg-culturin-mustard/80">
                Explore Trips
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20">
                Tell Us Where You Want To Go
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trip Discovery Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-8">Upcoming Cultural Experiences</h2>
          
          <div className="flex overflow-x-auto pb-4 mb-6 space-x-2">
            {["all", "art", "food", "spiritual", "photography", "history"].map((tab) => (
              <Button
                key={tab}
                variant={selectedTab === tab ? "default" : "outline"}
                className={`whitespace-nowrap ${
                  selectedTab === tab ? "bg-culturin-indigo" : ""
                }`}
                onClick={() => filterTrips(tab)}
              >
                {tab === "all" ? "All Experiences" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trips.map((trip) => (
              <TripCard key={trip.id} {...trip} />
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button className="bg-culturin-terracotta hover:bg-culturin-clay">
              View All Experiences
            </Button>
          </div>
        </div>
      </section>
      
      {/* Create Journey Section */}
      <section className="py-16 bg-culturin-sand/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-6">
                Share Your Journey Plans
              </h2>
              <p className="text-lg mb-6">
                Tell us where you want to go and what interests you. We'll connect you with like-minded travelers planning similar experiences.
              </p>
              <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm mb-6">
                <div className="flex items-start mb-4">
                  <div className="bg-culturin-mustard/20 p-2 rounded-full mr-3">
                    <span className="text-culturin-indigo font-bold">92%</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Travelers find better experiences</h3>
                    <p className="text-sm text-gray-600">when traveling with others who share their interests</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-culturin-mustard/20 p-2 rounded-full mr-3">
                    <span className="text-culturin-indigo font-bold">68%</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Solo travelers prefer small groups</h3>
                    <p className="text-sm text-gray-600">for a balance of connection and independence</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <JourneyForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Operator CTA Section */}
      <section className="py-16 bg-culturin-indigo text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4">
            Are You a Cultural Experience Provider?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Share your story, publish your tours, and connect with travelers seeking authentic experiences.
          </p>
          <Link to="/operator">
            <Button className="bg-white text-culturin-indigo hover:bg-white/90">
              Become an Operator
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <span className="font-playfair font-bold text-2xl">Culturin</span>
              </div>
              <p className="text-gray-300 mb-4">
                Connecting cultural travelers with authentic local experiences.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Discover Experiences</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-white">How It Works</Link></li>
                <li><Link to="/operator" className="text-gray-300 hover:text-white">For Operators</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-white">About Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact</h3>
              <p className="text-gray-300 mb-2">hello@culturin.com</p>
              <p className="text-gray-300 mb-4">+1 (555) 123-4567</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
                <a href="#" className="text-gray-300 hover:text-white">Instagram</a>
                <a href="#" className="text-gray-300 hover:text-white">Facebook</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 Culturin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
