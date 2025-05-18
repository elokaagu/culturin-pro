
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import ExperienceBuilder from "@/components/ExperienceBuilder";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { 
  Plus, 
  Calendar, 
  Filter, 
  TrendingUp,
  Crown,
  Lock,
  CheckCircle,
  Star,
  ArrowRight
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Image from "@/components/ui/image";
import { Badge } from "@/components/ui/badge";

// Import tab components
import DashboardOverview from "@/components/DashboardOverview";
import ExperiencesTab from "@/components/ExperiencesTab";
import BookingsTab from "@/components/BookingsTab";
import OperatorExperienceCard from "@/components/OperatorExperienceCard";
import CulturinPro from "@/components/CulturinPro";

// Mock experiences data
const mockExperiences = [
  {
    id: "1",
    title: "Traditional Pottery Workshop",
    status: "live" as "live",
    bookingPercentage: 75,
    price: 45,
    location: "Oaxaca, Mexico",
    dates: "Weekly, Tue & Thu",
    duration: "3 hours",
    image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
    trend: "up" as "up"
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
    trend: "flat" as "flat"
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
    trend: "down" as "down"
  }
];

const OperatorDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [filterStatus, setFilterStatus] = useState<"all" | "live" | "draft">("all");
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
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

  const handleUpgradeClick = () => {
    navigate('/culturin-pro');
    toast({
      title: "Culturin Pro",
      description: "Exploring Pro features and pricing options.",
    });
  };

  // Filtered experiences based on selected status
  const filteredExperiences = filterStatus === "all" 
    ? mockExperiences 
    : mockExperiences.filter(exp => exp.status === filterStatus);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header type="operator" />
      
      {/* Hero Section */}
      <section className="bg-black py-16 md:py-20 text-white relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png"
            alt="Cultural festival celebration" 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-medium mb-6 text-white text-shadow animate-fade-in">
              Empower Your Culture
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-2xl mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
              Grow your cultural business. Reach global travelers. Share your story.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-6 animate-fade-in" style={{animationDelay: '0.3s'}}>
              <Button 
                className="bg-white text-black hover:bg-gray-200 hover:text-black flex items-center px-8 py-6"
                onClick={handleCreateExperience}
              >
                <Plus className="w-5 h-5 mr-2" />
                Create My Experience
              </Button>
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/20 flex items-center px-8 py-6"
                onClick={handleViewBookings}
              >
                <Calendar className="w-5 h-5 mr-2" />
                View Bookings
              </Button>
            </div>

            {/* Pro Upgrade Banner */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <div className="flex items-center">
                <Crown className="h-5 w-5 text-amber-400 mr-2" />
                <span className="font-medium">Unlock all features with Culturin Pro</span>
              </div>
              <Button 
                size="sm" 
                variant="secondary" 
                className="bg-white text-black hover:bg-amber-100 whitespace-nowrap"
                onClick={handleUpgradeClick}
              >
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dashboard Content */}
      <section className="flex-1 py-12">
        <div className="container-custom">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            {/* Tab Navigation */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <TabsList className="bg-transparent p-0 flex flex-wrap gap-2">
                <TabsTrigger 
                  value="overview"
                  className="bg-gray-100 hover:bg-white data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-md rounded-full px-6 py-3"
                >
                  Dashboard Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="experiences"
                  className="bg-gray-100 hover:bg-white data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-md rounded-full px-6 py-3"
                >
                  My Experiences
                </TabsTrigger>
                <TabsTrigger 
                  value="bookings"
                  className="bg-gray-100 hover:bg-white data-[state=active]:bg-black data-[state=active]:text-white data-[state=active]:shadow-md rounded-full px-6 py-3"
                >
                  Booking Management
                </TabsTrigger>
                <TabsTrigger 
                  value="pro"
                  className="bg-amber-100 hover:bg-amber-200 data-[state=active]:bg-amber-500 data-[state=active]:text-white data-[state=active]:shadow-md rounded-full px-6 py-3 flex items-center gap-1"
                >
                  <Crown className="h-4 w-4" /> Culturin Pro
                  <Badge className="ml-1 h-5 bg-amber-400 text-black text-xs">New</Badge>
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
              {/* Basic Stats - Free Version */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-500">Total Experiences</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{mockExperiences.length}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-500">Active Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">12</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-amber-700 flex items-center">
                      <Lock className="h-4 w-4 mr-1" /> 
                      Advanced Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="h-14 bg-amber-200/30 rounded-md flex items-center justify-center">
                      <Crown className="h-5 w-5 text-amber-500 mr-2" />
                      <span className="text-amber-700">Unlock with Culturin Pro</span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full border-amber-400 text-amber-700 hover:bg-amber-200/50"
                      onClick={handleUpgradeClick}
                    >
                      View Pro Features <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest booking and experience activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 border-b border-gray-100 pb-4">
                      <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center text-white">JD</div>
                      <div>
                        <p className="font-medium">John Doe made a booking</p>
                        <p className="text-sm text-gray-500">Traditional Pottery Workshop - 2 guests - May 24, 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Desert Stargazing Experience published</p>
                        <p className="text-sm text-gray-500">Your experience is now live and accepting bookings</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t">
                  <div className="flex justify-between items-center w-full">
                    <p className="text-sm text-gray-500">Limited activity shown in free version</p>
                    <Button variant="outline" size="sm" onClick={handleUpgradeClick}>
                      <Crown className="h-3.5 w-3.5 mr-1 text-amber-500" />
                      See All Activity
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              {/* Pro Upsell Card */}
              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Crown className="h-5 w-5 text-amber-500 mr-2" />
                      Culturin Pro Features
                    </CardTitle>
                    <Badge className="bg-amber-400 text-black">Recommended</Badge>
                  </div>
                  <CardDescription className="text-amber-700">
                    Unlock powerful tools to grow your cultural business
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Advanced Analytics</p>
                        <p className="text-sm text-gray-600">Track performance and growth</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Custom Website</p>
                        <p className="text-sm text-gray-600">Professional online presence</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Marketing Tools</p>
                        <p className="text-sm text-gray-600">Promote your experiences</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">CRM System</p>
                        <p className="text-sm text-gray-600">Manage client relationships</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Team Management</p>
                        <p className="text-sm text-gray-600">Collaborate with partners</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Priority Support</p>
                        <p className="text-sm text-gray-600">Get help when you need it</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-black hover:bg-gray-800 text-white py-6"
                    onClick={handleUpgradeClick}
                  >
                    <Crown className="h-5 w-5 mr-2 text-amber-400" />
                    Upgrade to Culturin Pro
                    <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      14-day free trial
                    </span>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* My Experiences Tab */}
            <TabsContent value="experiences" className="animate-fade-in">
              <div className="mb-8">
                <h2 className="text-2xl font-medium mb-6 text-gray-800">Your Experiences</h2>
                
                {/* Experience Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredExperiences.map(experience => (
                    <OperatorExperienceCard
                      key={experience.id}
                      {...experience}
                    />
                  ))}
                  
                  {/* Add New Experience Card */}
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden flex flex-col items-center justify-center p-10 hover:bg-gray-100 transition-colors cursor-pointer min-h-[400px]"
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
              
              {/* Limited Performance Insights with Pro Upsell */}
              <div className="bg-white rounded-xl p-8 shadow-sm mt-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h3 className="text-xl font-medium">Performance Insights</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={handleUpgradeClick}
                  >
                    <Crown className="h-3.5 w-3.5 text-amber-500" />
                    <span>Upgrade for Full Analytics</span>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="text-sm text-gray-500 mb-2">Total Bookings (30 days)</div>
                    <div className="text-3xl font-bold text-gray-900">37</div>
                    <div className="flex items-center mt-2 text-green-600 text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +12% from last month
                    </div>
                  </div>

                  {/* Pro Feature Cards (Locked) */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <div className="flex items-center gap-1 text-sm text-amber-700 mb-2">
                      <Lock className="h-3.5 w-3.5" />
                      <span>Revenue Breakdown</span>
                    </div>
                    <div className="h-16 bg-amber-100/50 rounded-md flex items-center justify-center">
                      <Crown className="h-5 w-5 text-amber-500 mr-2" />
                      <span className="text-amber-700">Unlock with Pro</span>
                    </div>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <div className="flex items-center gap-1 text-sm text-amber-700 mb-2">
                      <Lock className="h-3.5 w-3.5" />
                      <span>Guest Demographics</span>
                    </div>
                    <div className="h-16 bg-amber-100/50 rounded-md flex items-center justify-center">
                      <Crown className="h-5 w-5 text-amber-500 mr-2" />
                      <span className="text-amber-700">Unlock with Pro</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Fixed CTA */}
              <div className="fixed bottom-8 right-8 z-40">
                <Button 
                  onClick={handleCreateExperience} 
                  className="bg-black hover:bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl flex items-center gap-2 px-6 py-6"
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
              <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-amber-100 rounded-full mr-3">
                      <Calendar className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Free Plan Limitation</h3>
                      <p className="text-sm text-gray-600">Basic booking management available. Upgrade to unlock advanced features.</p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleUpgradeClick}
                    className="whitespace-nowrap flex items-center gap-1"
                  >
                    <Crown className="h-4 w-4 mr-1 text-amber-400" />
                    Upgrade to Pro
                  </Button>
                </div>
              </div>
              
              <BookingsTab />
            </TabsContent>

            {/* Culturin Pro Tab */}
            <TabsContent value="pro">
              <CulturinPro />
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Footer with Pro Upsell */}
      <footer className="bg-black text-white py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
            <div className="max-w-md">
              <h3 className="flex items-center text-xl font-medium mb-2">
                <Crown className="h-5 w-5 text-amber-400 mr-2" />
                Ready to grow your cultural business?
              </h3>
              <p className="text-gray-300 mb-4">Join 1000+ cultural entrepreneurs already using Culturin Pro to build their brand and increase bookings.</p>
              <Button 
                className="bg-white text-black hover:bg-gray-200 flex items-center gap-2"
                onClick={handleUpgradeClick}
              >
                Start your free 14-day trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 max-w-sm">
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-5 w-5 text-amber-400" />
                <Star className="h-5 w-5 text-amber-400" />
                <Star className="h-5 w-5 text-amber-400" />
                <Star className="h-5 w-5 text-amber-400" />
                <Star className="h-5 w-5 text-amber-400" />
              </div>
              <p className="text-sm italic">"Switching to Culturin Pro doubled our bookings and saved me hours every week on administrative tasks."</p>
              <p className="text-xs text-gray-400 mt-2">— Maria G., Food Experience Host</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-gray-400 text-sm">© 2025 Culturin. All rights reserved.</p>
            <div className="flex justify-center space-x-6 mt-4">
              <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              <Link to="/" className="text-gray-300 hover:text-white">Help Center</Link>
              <Link to="/" className="text-gray-300 hover:text-white">Terms</Link>
              <Link to="/" className="text-gray-300 hover:text-white">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OperatorDashboard;
