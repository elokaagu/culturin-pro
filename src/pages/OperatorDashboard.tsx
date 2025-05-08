
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import ExperienceBuilder from "@/components/ExperienceBuilder";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Calendar, 
  Filter, 
  MapPin, 
  TrendingUp,
  Info,
  ChevronDown,
  Crown
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Image from "@/components/ui/image";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Import tab components
import DashboardOverview from "@/components/DashboardOverview";
import ExperiencesTab from "@/components/ExperiencesTab";
import BookingsTab from "@/components/BookingsTab";
import OperatorExperienceCard from "@/components/OperatorExperienceCard";
import CulturinPro from "@/components/CulturinPro";

// Mock experiences data with correct type for status and trend
const mockExperiences = [
  {
    id: "1",
    title: "Traditional Pottery Workshop",
    status: "live" as "live", // Type assertion to ensure it's the correct literal type
    bookingPercentage: 75,
    price: 45,
    location: "Oaxaca, Mexico",
    dates: "Weekly, Tue & Thu",
    duration: "3 hours",
    image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
    trend: "up" as "up" // Type assertion for trend
  },
  {
    id: "2",
    title: "Desert Stargazing Experience",
    status: "live" as "live",
    bookingPercentage: 60,
    price: 85,
    location: "Marrakech, Morocco",
    dates: "Nightly, Weather Permitting",
    duration: "4 hours",
    image: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
    trend: "flat" as "flat" // Type assertion for trend
  },
  {
    id: "3",
    title: "Farm to Table Cooking Class",
    status: "draft" as "draft",
    bookingPercentage: 0,
    price: 65,
    location: "Bali, Indonesia",
    dates: "Mon, Wed, Fri",
    duration: "2.5 hours",
    image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
    daysInDraft: 12,
    trend: "down" as "down" // Type assertion for trend
  }
];

const OperatorDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [filterStatus, setFilterStatus] = useState<"all" | "live" | "draft">("all");
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
  
  const handleFilterChange = (status: "all" | "live" | "draft") => {
    setFilterStatus(status);
    toast({
      title: `Filter: ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      description: `Showing ${status} experiences.`,
    });
  };

  // Filtered experiences based on selected status
  const filteredExperiences = filterStatus === "all" 
    ? mockExperiences 
    : mockExperiences.filter(exp => exp.status === filterStatus);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header type="operator" />
      
      {/* Enhanced Hero Section with more impactful design */}
      <section className="bg-culturin-indigo py-16 md:py-20 text-white relative overflow-hidden">
        {/* Background image with enhanced overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png"
            alt="Cultural festival celebration" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-culturin-indigo/70 to-black/60"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6 text-white text-shadow-lg animate-fade-in">
              Empower Your Culture
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-2xl mb-8 drop-shadow-md animate-fade-in" style={{animationDelay: '0.2s'}}>
              Grow your cultural business. Reach global travelers. Share your story.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
              <Button 
                className="bg-white text-culturin-indigo hover:bg-culturin-mustard hover:text-white hover:scale-105 flex items-center px-8 py-6 font-semibold shadow-lg transition-all duration-300 rounded-xl"
                onClick={handleCreateExperience}
              >
                <Plus className="w-5 h-5 mr-2" />
                Create My Experience
              </Button>
              <Button 
                variant="outline" 
                className="bg-[#1A1F2C] border-white text-white hover:bg-white/30 hover:scale-105 flex items-center px-8 py-6 shadow-sm transition-all duration-300 rounded-xl"
                onClick={handleViewBookings}
              >
                <Calendar className="w-5 h-5 mr-2" />
                View Bookings
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dashboard Content with improved tabs and filters */}
      <section className="flex-1 py-12">
        <div className="container-custom">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            {/* Enhanced Tab Navigation */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <TabsList className="bg-transparent p-0 flex flex-wrap gap-2">
                <TabsTrigger 
                  value="overview"
                  className="bg-gray-100 hover:bg-white data-[state=active]:bg-white data-[state=active]:text-culturin-indigo data-[state=active]:shadow-md data-[state=active]:font-medium rounded-full px-6 py-3 transition-all"
                >
                  Dashboard Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="experiences"
                  className="bg-gray-100 hover:bg-white data-[state=active]:bg-white data-[state=active]:text-culturin-indigo data-[state=active]:shadow-md data-[state=active]:font-medium rounded-full px-6 py-3 transition-all"
                >
                  My Experiences
                </TabsTrigger>
                <TabsTrigger 
                  value="bookings"
                  className="bg-gray-100 hover:bg-white data-[state=active]:bg-white data-[state=active]:text-culturin-indigo data-[state=active]:shadow-md data-[state=active]:font-medium rounded-full px-6 py-3 transition-all"
                >
                  Booking Management
                </TabsTrigger>
                <TabsTrigger 
                  value="pro"
                  className="bg-gray-100 hover:bg-white data-[state=active]:bg-white data-[state=active]:text-culturin-indigo data-[state=active]:shadow-md data-[state=active]:font-medium rounded-full px-6 py-3 transition-all flex items-center gap-1"
                >
                  <Crown className="h-4 w-4" /> Culturin Pro
                  <Badge className="ml-1 h-5 bg-culturin-mustard text-culturin-indigo text-xs">New</Badge>
                </TabsTrigger>
              </TabsList>
              
              {/* Filters for Experiences */}
              {activeTab === "experiences" && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-500 flex items-center">
                    <Filter className="w-4 h-4 mr-1" />
                    Filter:
                  </span>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant={filterStatus === "all" ? "default" : "outline"} 
                      onClick={() => handleFilterChange("all")}
                      className="rounded-full text-sm h-9"
                    >
                      All
                    </Button>
                    <Button 
                      size="sm" 
                      variant={filterStatus === "live" ? "default" : "outline"}
                      onClick={() => handleFilterChange("live")}
                      className="rounded-full text-sm h-9"
                    >
                      Published
                    </Button>
                    <Button 
                      size="sm" 
                      variant={filterStatus === "draft" ? "default" : "outline"}
                      onClick={() => handleFilterChange("draft")}
                      className="rounded-full text-sm h-9"
                    >
                      Draft
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Dashboard Overview Tab */}
            <TabsContent value="overview" className="space-y-10 animate-fade-in">
              <DashboardOverview />
            </TabsContent>
            
            {/* My Experiences Tab with redesigned cards */}
            <TabsContent value="experiences" className="animate-fade-in">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Experiences</h2>
                
                {/* Experience Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredExperiences.map(experience => (
                    <OperatorExperienceCard
                      key={experience.id}
                      {...experience}
                    />
                  ))}
                  
                  {/* Add New Experience Card */}
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-10 hover:bg-gray-100 transition-colors duration-200 cursor-pointer min-h-[400px]"
                    onClick={handleCreateExperience}
                  >
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                      <Plus className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Add New Experience</h3>
                    <p className="text-sm text-gray-500 text-center max-w-xs">Create a new cultural experience to share with travelers.</p>
                  </div>
                </div>
              </div>
              
              {/* Performance Insights section - replaces sidebar */}
              <div className="bg-white rounded-2xl p-8 shadow-sm mt-12">
                <h3 className="text-xl font-semibold mb-6">Performance Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="text-sm text-gray-500 mb-2">Total Bookings (30 days)</div>
                    <div className="text-3xl font-bold text-gray-900">37</div>
                    <div className="flex items-center mt-2 text-green-600 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +12% from last month
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="text-sm text-gray-500 mb-2">Revenue (30 days)</div>
                    <div className="text-3xl font-bold text-gray-900">$2,480</div>
                    <div className="flex items-center mt-2 text-green-600 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +8% from last month
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="text-sm text-gray-500 mb-2">Avg. Experience Rating</div>
                    <div className="text-3xl font-bold text-gray-900">4.8/5</div>
                    <div className="flex items-center mt-2 text-gray-500 text-sm">
                      Based on 28 reviews
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Fixed CTA for creating new experiences */}
              <div className="fixed bottom-8 right-8 z-40">
                <Button 
                  onClick={handleCreateExperience} 
                  className="bg-culturin-indigo hover:bg-culturin-indigo/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 px-6 py-6"
                >
                  <Plus className="w-5 h-5" />
                  New Experience
                </Button>
              </div>
            </TabsContent>
            
            {/* Create Experience Tab */}
            <TabsContent value="create">
              <ExperienceBuilder />
            </TabsContent>
            
            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <BookingsTab />
            </TabsContent>

            {/* Culturin Pro Tab */}
            <TabsContent value="pro">
              <CulturinPro />
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
