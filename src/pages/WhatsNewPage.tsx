
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewFooter from "@/components/sections/NewFooter";

const announcements = [
  {
    id: "new-booking-engine",
    title: "New Booking Engine Features",
    date: "May 15, 2025",
    category: "Product Update",
    description: "We've launched a completely redesigned booking experience with improved conversion rates and mobile optimization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    content: "We're excited to announce our new booking engine with improved features that make it easier for your guests to book their cultural experiences. The new engine includes mobile optimization, multi-language support, and improved payment options."
  },
  {
    id: "analytics-dashboard",
    title: "Enhanced Analytics Dashboard",
    date: "May 1, 2025",
    category: "New Feature",
    description: "Get deeper insights with our new analytics dashboard featuring customer journey mapping and revenue forecasting.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    content: "Our new analytics dashboard gives you deeper insights into your business performance. You can now track customer journeys, forecast revenue, and identify growth opportunities with powerful visualization tools."
  },
  {
    id: "mobile-app-launch",
    title: "Mobile App Launch",
    date: "April 20, 2025",
    category: "Major Release",
    description: "Introducing our new mobile app for iOS and Android, allowing operators to manage bookings on the go.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    content: "We're thrilled to announce the launch of our mobile app for iOS and Android. Now operators can manage bookings, view analytics, and engage with customers directly from their mobile devices."
  },
  {
    id: "cultural-ai-assistant",
    title: "Cultural AI Assistant",
    date: "April 10, 2025",
    category: "New Feature",
    description: "Introducing our AI-powered assistant that helps create culturally authentic experiences tailored to your audience.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    content: "Our new AI assistant helps you create culturally authentic experiences that resonate with your target audience. It provides recommendations based on cultural preferences, historical context, and local insights."
  },
  {
    id: "partnership-program",
    title: "New Partnership Program",
    date: "March 25, 2025",
    category: "Company News",
    description: "Announcing our new partnership program with cultural institutions across Europe and North America.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    content: "We're proud to announce our new partnership program with over 50 cultural institutions across Europe and North America. This program will provide our customers with exclusive access to unique cultural experiences and content."
  },
  {
    id: "multilingual-support",
    title: "Multilingual Support Expansion",
    date: "March 15, 2025",
    category: "Product Update",
    description: "We've expanded our language support to include 12 new languages, now supporting a total of 20 languages.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    content: "We've added support for 12 new languages to our platform, making it easier for you to reach a global audience. Our platform now supports a total of 20 languages, covering over 80% of the global travel market."
  }
];

const WhatsNewPage = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);
  
  const categories = ["all", ...new Set(announcements.map(a => a.category))];
  
  const filteredAnnouncements = selectedCategory === "all" 
    ? announcements 
    : announcements.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">What's New at Culturin</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay up to date with the latest features, updates, and news from the Culturin platform.
            </p>
          </div>
          
          <Tabs defaultValue="all" className="mb-10">
            <TabsList className="flex justify-center mb-8">
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === "all" ? "All Updates" : category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAnnouncements.map((announcement, index) => (
                  <Card 
                    key={announcement.id}
                    className={`overflow-hidden transition-all duration-500 ${
                      animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{transitionDelay: `${index * 50}ms`}}
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={announcement.image} 
                        alt={announcement.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                          {announcement.category}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {announcement.date}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{announcement.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{announcement.description}</p>
                      <Link to={`/whats-new/${announcement.id}`}>
                        <Button variant="outline" className="w-full">Read More</Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {categories.filter(c => c !== "all").map(category => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {announcements
                    .filter(a => a.category === category)
                    .map((announcement, index) => (
                      <Card 
                        key={announcement.id}
                        className={`overflow-hidden transition-all duration-500 ${
                          animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        style={{transitionDelay: `${index * 50}ms`}}
                      >
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={announcement.image} 
                            alt={announcement.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                              {announcement.category}
                            </Badge>
                            <div className="flex items-center text-sm text-gray-500">
                              <CalendarIcon className="h-3 w-3 mr-1" />
                              {announcement.date}
                            </div>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{announcement.title}</h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">{announcement.description}</p>
                          <Link to={`/whats-new/${announcement.id}`}>
                            <Button variant="outline" className="w-full">Read More</Button>
                          </Link>
                        </div>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-16 text-center">
            <p className="text-lg font-medium mb-4">Want to be the first to know about new features?</p>
            <Link to="/demo">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Schedule a Demo
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <NewFooter />
    </div>
  );
};

export default WhatsNewPage;
