
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Globe, Map, Users } from "lucide-react";
import Image from "@/components/ui/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface Trip {
  id: number;
  title: string;
  image: string;
  destination: string;
  duration: string;
  price: string;
  category: string;
  description?: string;
  highlights?: string[];
  includes?: string[];
}

const DiscoverTrips = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const trips: Trip[] = [
    {
      id: 1,
      title: "Culinary Journey Through Marrakech",
      image: "https://images.unsplash.com/photo-1553522911-d0ba84227d69?q=80&w=1170",
      destination: "Marrakech, Morocco",
      duration: "7 days",
      price: "$1,500",
      category: "food",
      description: "Explore the rich flavors and culinary traditions of Morocco alongside local chefs and food experts. Visit bustling markets, participate in cooking classes, and enjoy authentic meals in traditional settings.",
      highlights: [
        "Hands-on cooking classes with local chefs",
        "Guided food market tours",
        "Traditional dinner in the Medina",
        "Spice workshop with master blender"
      ],
      includes: [
        "6 nights accommodation",
        "Daily breakfast, 5 lunches, 4 dinners",
        "All cooking classes and tastings",
        "Market tours with local guides" 
      ]
    },
    {
      id: 2,
      title: "Traditional Crafts in Kyoto",
      image: "https://images.unsplash.com/photo-1624299831638-33a35a3a431a?q=80&w=1170",
      destination: "Kyoto, Japan",
      duration: "10 days",
      price: "$2,200",
      category: "craft",
      description: "Immerse yourself in Kyoto's centuries-old craft traditions. Learn directly from master artisans and create your own pieces in traditional workshops while experiencing the rich cultural heritage of ancient Japan.",
      highlights: [
        "Pottery workshop with 3rd generation master",
        "Traditional textile dyeing experience",
        "Paper making and calligraphy classes",
        "Private tea ceremony in historic temple"
      ],
      includes: [
        "9 nights in traditional ryokan accommodation",
        "Daily breakfast, 6 lunches",
        "All workshop materials and tools",
        "Temple and cultural site entry fees"
      ]
    },
    {
      id: 3,
      title: "Oaxacan Pottery and Textiles",
      image: "https://images.unsplash.com/photo-1608454367599-c133fdb4bdfd?q=80&w=1170",
      destination: "Oaxaca, Mexico",
      duration: "6 days",
      price: "$1,200",
      category: "craft",
      description: "Discover the world-renowned crafts of Oaxaca with visits to indigenous communities preserving ancient techniques. Learn the art of black clay pottery and the secrets of natural textile dyeing from local artisans.",
      highlights: [
        "Black clay pottery workshop in Oaxaca",
        "Natural dyeing class with cochineal and indigo",
        "Textile weaving experience with Zapotec artists",
        "Home visit with master wood carver"
      ],
      includes: [
        "5 nights boutique accommodation",
        "Daily breakfast, 4 lunches with local families",
        "Transportation to rural communities",
        "All workshop materials"
      ]
    },
    {
      id: 4,
      title: "Balinese Spiritual Retreat",
      image: "https://images.unsplash.com/photo-1604568120269-5958b60308be?q=80&w=1170",
      destination: "Ubud, Bali",
      duration: "12 days",
      price: "$1,800",
      category: "wellness",
      description: "Connect with Bali's spiritual traditions through ceremonies, meditation, and healing practices. Experience sacred water temples, traditional blessing rituals, and daily yoga in lush tropical settings.",
      highlights: [
        "Water purification ceremony at Tirta Empul",
        "Meditation with local spiritual healers",
        "Sacred arts and offering making workshops",
        "Traditional Balinese blessing ceremony"
      ],
      includes: [
        "11 nights eco-luxury accommodation",
        "Daily breakfast and wellness meals",
        "Daily yoga and meditation sessions",
        "All ceremony offerings and materials"
      ]
    },
    {
      id: 5,
      title: "Portuguese Wine Experience",
      image: "https://images.unsplash.com/photo-1528918230037-b8e9a69da5b6?q=80&w=1170",
      destination: "Douro Valley, Portugal",
      duration: "5 days",
      price: "$1,300",
      category: "food",
      description: "Journey through Portugal's stunning Douro Valley, exploring family-owned vineyards and learning the art of wine production. Enjoy exquisite food pairings and hands-on experiences with local winemakers.",
      highlights: [
        "Vineyard tours with family winemakers",
        "Traditional grape harvesting (seasonal)",
        "Wine blending workshop",
        "Port wine cellar private tour"
      ],
      includes: [
        "4 nights historic quinta accommodation",
        "Daily breakfast, 3 lunches, 2 dinners",
        "All wine tastings and winery visits",
        "River cruise along the Douro"
      ]
    },
    {
      id: 6,
      title: "Photography Safari in Kruger",
      image: "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?q=80&w=1170",
      destination: "Kruger National Park, South Africa",
      duration: "8 days",
      price: "$2,500",
      category: "photography",
      description: "Capture Africa's magnificent wildlife alongside professional photographers. Learn specialized techniques for wildlife photography while enjoying daily game drives and exclusive access to prime viewing areas.",
      highlights: [
        "Daily game drives in prime wildlife areas",
        "Photography workshops with pro wildlife photographers",
        "Night photography sessions",
        "Editing and critique sessions"
      ],
      includes: [
        "7 nights luxury safari lodge accommodation",
        "All meals and refreshments",
        "Private guide and photography instructor",
        "All park and conservation fees"
      ]
    }
  ];

  const filteredTrips = selectedFilter === 'all' 
    ? trips 
    : trips.filter(trip => trip.category === selectedFilter);

  const handleViewDetails = (trip: Trip) => {
    setSelectedTrip(trip);
    setIsModalOpen(true);
  };

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
                  <Image 
                    src={trip.image} 
                    alt={trip.title} 
                    aspectRatio="video"
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
                    <Button 
                      variant="outline" 
                      className="border-culturin-indigo text-culturin-indigo hover:bg-culturin-indigo hover:text-white"
                      onClick={() => handleViewDetails(trip)}
                    >
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

      {/* Trip Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedTrip && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-playfair">{selectedTrip.title}</DialogTitle>
                <DialogDescription className="text-culturin-indigo font-medium">
                  {selectedTrip.destination} · {selectedTrip.duration}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                <div className="h-72 overflow-hidden rounded-md mb-6">
                  <Image 
                    src={selectedTrip.image} 
                    alt={selectedTrip.title}
                    aspectRatio="wide"
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-medium mb-3">Experience</h3>
                    <p className="text-[#4A4A4A] mb-6">{selectedTrip.description}</p>
                    
                    <h3 className="text-xl font-medium mb-3">Highlights</h3>
                    <ul className="list-disc list-inside space-y-2 mb-6">
                      {selectedTrip.highlights?.map((highlight, index) => (
                        <li key={index} className="text-[#4A4A4A]">{highlight}</li>
                      ))}
                    </ul>
                    
                    <h3 className="text-xl font-medium mb-3">What's Included</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {selectedTrip.includes?.map((item, index) => (
                        <li key={index} className="text-[#4A4A4A]">{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-medium mb-2">Price</h3>
                    <p className="text-2xl font-bold mb-4">{selectedTrip.price}</p>
                    <p className="text-sm text-[#4A4A4A] mb-6">per person</p>
                    
                    <Button className="w-full mb-3 bg-culturin-indigo hover:bg-culturin-indigo/90">
                      Book This Trip
                    </Button>
                    
                    <Button variant="outline" className="w-full mb-6">
                      Ask a Question
                    </Button>
                    
                    <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                      <Calendar className="w-4 h-4" />
                      <span>Multiple dates available</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiscoverTrips;
