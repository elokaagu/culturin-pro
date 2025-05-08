
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Globe, Map, Users } from "lucide-react";

const DiscoverTrips = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const trips = [
    {
      id: 1,
      title: "Culinary Journey Through Marrakech",
      image: "https://images.unsplash.com/photo-1553522911-d0ba84227d69?q=80&w=1170",
      destination: "Marrakech, Morocco",
      duration: "7 days",
      price: "$1,500",
      category: "food"
    },
    {
      id: 2,
      title: "Traditional Crafts in Kyoto",
      image: "https://images.unsplash.com/photo-1624299831638-33a35a3a431a?q=80&w=1170",
      destination: "Kyoto, Japan",
      duration: "10 days",
      price: "$2,200",
      category: "craft"
    },
    {
      id: 3,
      title: "Oaxacan Pottery and Textiles",
      image: "https://images.unsplash.com/photo-1608454367599-c133fdb4bdfd?q=80&w=1170",
      destination: "Oaxaca, Mexico",
      duration: "6 days",
      price: "$1,200",
      category: "craft"
    },
    {
      id: 4,
      title: "Balinese Spiritual Retreat",
      image: "https://images.unsplash.com/photo-1604568120269-5958b60308be?q=80&w=1170",
      destination: "Ubud, Bali",
      duration: "12 days",
      price: "$1,800",
      category: "wellness"
    },
    {
      id: 5,
      title: "Portuguese Wine Experience",
      image: "https://images.unsplash.com/photo-1528918230037-b8e9a69da5b6?q=80&w=1170",
      destination: "Douro Valley, Portugal",
      duration: "5 days",
      price: "$1,300",
      category: "food"
    },
    {
      id: 6,
      title: "Photography Safari in Kruger",
      image: "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?q=80&w=1170",
      destination: "Kruger National Park, South Africa",
      duration: "8 days",
      price: "$2,500",
      category: "photography"
    }
  ];

  const filteredTrips = selectedFilter === 'all' 
    ? trips 
    : trips.filter(trip => trip.category === selectedFilter);

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="traveler" />
      <main className="flex-grow pt-28">
        <section className="container mx-auto px-6 mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl text-culturin-charcoal mb-8">Discover Group Trips</h1>
          <p className="text-lg text-[#4A4A4A] max-w-3xl mb-12">
            Join curated cultural experiences with like-minded travelers. Each trip is designed to connect you deeply with local traditions and communities.
          </p>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Button 
              variant={selectedFilter === 'all' ? "default" : "outline"} 
              onClick={() => setSelectedFilter('all')}
              className={selectedFilter === 'all' ? "bg-culturin-indigo" : ""}
            >
              All Experiences
            </Button>
            <Button 
              variant={selectedFilter === 'food' ? "default" : "outline"} 
              onClick={() => setSelectedFilter('food')}
              className={selectedFilter === 'food' ? "bg-culturin-mustard text-black" : ""}
            >
              Food & Cuisine
            </Button>
            <Button 
              variant={selectedFilter === 'craft' ? "default" : "outline"} 
              onClick={() => setSelectedFilter('craft')}
              className={selectedFilter === 'craft' ? "bg-culturin-terracotta" : ""}
            >
              Arts & Crafts
            </Button>
            <Button 
              variant={selectedFilter === 'photography' ? "default" : "outline"} 
              onClick={() => setSelectedFilter('photography')}
              className={selectedFilter === 'photography' ? "bg-culturin-charcoal" : ""}
            >
              Photography
            </Button>
            <Button 
              variant={selectedFilter === 'wellness' ? "default" : "outline"} 
              onClick={() => setSelectedFilter('wellness')}
              className={selectedFilter === 'wellness' ? "bg-culturin-clay" : ""}
            >
              Wellness
            </Button>
          </div>
          
          {/* Trip listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrips.map((trip) => (
              <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-56 overflow-hidden">
                  <img 
                    src={trip.image} 
                    alt={trip.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-culturin-indigo mb-2">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm font-medium">{trip.destination}</span>
                  </div>
                  <h3 className="text-xl font-medium mb-3">{trip.title}</h3>
                  <div className="flex flex-wrap gap-y-2 gap-x-4 text-[#4A4A4A] text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{trip.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Small group (6-12)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <span className="text-[#4A4A4A] text-sm">from</span>
                      <p className="text-lg font-medium">{trip.price}</p>
                    </div>
                    <Button variant="outline" className="border-culturin-indigo text-culturin-indigo">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DiscoverTrips;
