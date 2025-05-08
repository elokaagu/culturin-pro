
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import ExperienceBuilder from "@/components/ExperienceBuilder";
import ListingsTable from "@/components/ListingsTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Image from "@/components/ui/image";

// Import new tab components
import DashboardOverview from "@/components/DashboardOverview";
import ExperiencesTab from "@/components/ExperiencesTab";
import BookingsTab from "@/components/BookingsTab";

const OperatorDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const { toast } = useToast();
  const location = useLocation();
  
  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleCreateExperience = () => {
    setActiveTab("create");
    toast({
      title: "Create Experience",
      description: "You've switched to the experience builder.",
    });
  };
  
  const handleViewBookings = () => {
    setActiveTab("bookings");
    toast({
      title: "View Bookings",
      description: "You've switched to booking management.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header type="operator" />
      
      {/* Hero Section with enhanced contrast */}
      <section className="bg-culturin-indigo py-12 text-white relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png"
            alt="Cultural background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-culturin-indigo/95 to-black/80 mix-blend-multiply"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-2xl backdrop-blur-sm bg-black/20 p-6 rounded-lg border border-white/10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-4 text-white text-shadow">
              Empower Your Culture
            </h1>
            <p className="text-xl text-white max-w-2xl mb-8 drop-shadow-md">
              Share your story, publish your tours, grow your travel business.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <Button 
                className="bg-culturin-mustard text-culturin-indigo hover:bg-culturin-mustard/90 hover:scale-105 flex items-center px-6 py-6 font-semibold shadow-lg transition-all duration-200"
                onClick={handleCreateExperience}
              >
                <Plus className="w-5 h-5 mr-2" />
                Create My Experience
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/30 hover:scale-105 flex items-center px-6 py-6 shadow-sm transition-all duration-200"
                onClick={handleViewBookings}
              >
                <Calendar className="w-5 h-5 mr-2" />
                View Bookings
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dashboard Content with improved tabs */}
      <section className="flex-1 py-8">
        <div className="container-custom">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid grid-cols-1 sm:grid-cols-3 p-1 bg-gray-100 rounded-lg">
              <TabsTrigger 
                value="overview"
                className="data-[state=active]:bg-culturin-indigo data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:font-medium rounded-md transition-all border-b-2 border-transparent data-[state=active]:border-culturin-mustard hover:bg-gray-200 hover:text-culturin-indigo"
              >
                Dashboard Overview
              </TabsTrigger>
              <TabsTrigger 
                value="experiences"
                className="data-[state=active]:bg-culturin-indigo data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:font-medium rounded-md transition-all border-b-2 border-transparent data-[state=active]:border-culturin-mustard hover:bg-gray-200 hover:text-culturin-indigo"
              >
                My Experiences
              </TabsTrigger>
              <TabsTrigger 
                value="bookings"
                className="data-[state=active]:bg-culturin-indigo data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:font-medium rounded-md transition-all border-b-2 border-transparent data-[state=active]:border-culturin-mustard hover:bg-gray-200 hover:text-culturin-indigo"
              >
                Booking Management
              </TabsTrigger>
            </TabsList>
            
            {/* Dashboard Overview Tab */}
            <TabsContent value="overview" className="space-y-10">
              <DashboardOverview />
            </TabsContent>
            
            {/* My Experiences Tab */}
            <TabsContent value="experiences">
              <ExperiencesTab />
            </TabsContent>
            
            {/* Create Experience Tab */}
            <TabsContent value="create">
              <ExperienceBuilder />
            </TabsContent>
            
            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <BookingsTab />
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container-custom text-center">
          <p className="text-gray-400 text-sm">© 2025 Culturin. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
            <Link to="/" className="text-gray-300 hover:text-white">Help Center</Link>
            <Link to="/" className="text-gray-300 hover:text-white">Terms</Link>
            <Link to="/" className="text-gray-300 hover:text-white">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OperatorDashboard;
