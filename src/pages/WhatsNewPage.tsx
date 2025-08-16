'use client'

import { useState, useEffect } from "react";
import { Link } from "../../lib/navigation";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewFooter from "@/components/sections/NewFooter";
import Image from "@/components/ui/image";

// Define the announcement type
export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  content: string;
}

// Announcements data with unique images
export const announcements: Announcement[] = [
  {
    id: "new-booking-engine",
    title: "New Booking Engine Features",
    date: "May 15, 2025",
    category: "Product Update",
    description: "We've launched a completely redesigned booking experience with improved conversion rates and mobile optimization.",
    image: "/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png",
    content: "We're excited to announce our new booking engine with improved features that make it easier for your guests to book their cultural experiences. The new engine includes mobile optimization, multi-language support, and improved payment options. Our data shows that these improvements can increase your conversion rates by up to 25%.\n\nKey features include:\n\n- Mobile-first design with responsive layouts\n- Support for 12 languages including regional variants\n- Integrated payment processing with multiple currency support\n- Improved accessibility features\n- Real-time availability calendar\n- Optimized checkout flow with fewer steps\n\nThese changes are live now for all customers. No action is required on your part to start benefiting from these improvements."
  },
  {
    id: "analytics-dashboard",
    title: "Enhanced Analytics Dashboard",
    date: "May 1, 2025",
    category: "New Feature",
    description: "Get deeper insights with our new analytics dashboard featuring customer journey mapping and revenue forecasting.",
    image: "/lovable-uploads/57645fce-47c3-43f5-82f6-080cd2577e06.png",
    content: "Our new analytics dashboard gives you deeper insights into your business performance. You can now track customer journeys, forecast revenue, and identify growth opportunities with powerful visualization tools. The dashboard includes customizable reports and real-time data processing to help you make informed decisions.\n\nNew capabilities include:\n\n- Customer journey mapping across touchpoints\n- Advanced revenue forecasting using machine learning\n- Cohort analysis for understanding customer segments\n- Conversion funnel visualization\n- Custom report builder\n- Export functionality for presentations and team sharing\n\nTo access these new features, simply navigate to the Analytics section in your dashboard."
  },
  {
    id: "mobile-app-launch",
    title: "Mobile App Launch",
    date: "April 20, 2025",
    category: "Major Release",
    description: "Introducing our new mobile app for iOS and Android, allowing operators to manage bookings on the go.",
    image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
    content: "We're thrilled to announce the launch of our mobile app for iOS and Android. Now operators can manage bookings, view analytics, and engage with customers directly from their mobile devices. The app provides a seamless experience with the web platform while offering unique mobile-specific features.\n\nMobile app features include:\n\n- Push notifications for new bookings and customer messages\n- QR code scanner for quick check-ins\n- Offline mode for viewing upcoming bookings when connectivity is limited\n- Photo capture and upload directly to customer records\n- Voice notes for quick customer feedback collection\n\nYou can download the app now from the App Store or Google Play Store. Just use your existing Culturin credentials to log in."
  },
  {
    id: "cultural-ai-assistant",
    title: "Cultural AI Assistant",
    date: "April 10, 2025",
    category: "New Feature",
    description: "Introducing our AI-powered assistant that helps create culturally authentic experiences tailored to your audience.",
    image: "/lovable-uploads/90db897a-9b44-4eb3-87cd-585b37891618.png",
    content: "Our new AI assistant helps you create culturally authentic experiences that resonate with your target audience. It provides recommendations based on cultural preferences, historical context, and local insights. The assistant can help with content creation, experience planning, and cultural sensitivity checking.\n\nKey capabilities include:\n\n- Cultural preference analysis for different geographic regions and demographics\n- Historical context recommendations for tour content\n- Language and terminology suggestions to enhance cultural authenticity\n- Automated cultural sensitivity checks for your marketing materials\n- Local insights database covering over 100 countries\n\nThe Cultural AI Assistant is now available in the Tools section of your dashboard. We're continuously training the model with new data, so its capabilities will expand over time."
  },
  {
    id: "partnership-program",
    title: "New Partnership Program",
    date: "March 25, 2025",
    category: "Company News",
    description: "Announcing our new partnership program with cultural institutions across Europe and North America.",
    image: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
    content: "We're proud to announce our new partnership program with over 50 cultural institutions across Europe and North America. This program will provide our customers with exclusive access to unique cultural experiences and content. Partners include museums, heritage sites, performing arts venues, and cultural education organizations.\n\nProgram benefits for operators include:\n\n- Co-marketing opportunities with prestigious cultural institutions\n- Access to exclusive events and exhibition previews for your guests\n- Discounted entry fees and special access hours\n- Content sharing and cross-promotion\n- Collaborative experience development support\n\nIf you're interested in connecting with our cultural institution partners, please reach out to your account manager for introductions and partnership details."
  },
  {
    id: "multilingual-support",
    title: "Multilingual Support Expansion",
    date: "March 15, 2025",
    category: "Product Update",
    description: "We've expanded our language support to include 12 new languages, now supporting a total of 20 languages.",
    image: "/lovable-uploads/8ee97e98-fd03-4f2b-8d3e-dcb87af6a6ba.png",
    content: "We've added support for 12 new languages to our platform, making it easier for you to reach a global audience. Our platform now supports a total of 20 languages, covering over 80% of the global travel market. This expansion includes both the guest-facing booking interface and the operator dashboard.\n\nNewly added languages include:\n\n- Arabic\n- Hindi\n- Russian\n- Portuguese\n- Dutch\n- Swedish\n- Polish\n- Turkish\n- Korean\n- Thai\n- Vietnamese\n- Hebrew\n\nTo change your language preference, visit your account settings. For guest-facing content, the system will automatically detect your visitors' language preferences based on their browser settings, or they can manually select their preferred language."
  }
];

const WhatsNewPage = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  useEffect(() => {
    setAnimateItems(true);
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
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
            <TabsList className="flex justify-center mb-8 flex-wrap">
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
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
                    className={`overflow-hidden transition-all duration-500 hover:shadow-lg ${
                      animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{transitionDelay: `${index * 50}ms`}}
                  >
                    <div className="h-48 overflow-hidden">
                      <Image 
                        src={announcement.image} 
                        alt={announcement.title} 
                        className="w-full h-full object-cover"
                        aspectRatio="video"
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
                        className={`overflow-hidden transition-all duration-500 hover:shadow-lg ${
                          animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                        style={{transitionDelay: `${index * 50}ms`}}
                      >
                        <div className="h-48 overflow-hidden">
                          <Image 
                            src={announcement.image} 
                            alt={announcement.title} 
                            className="w-full h-full object-cover" 
                            aspectRatio="video"
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
