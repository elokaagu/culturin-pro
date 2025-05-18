
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Users,
  Calendar,
  BarChart,
  MessageSquare,
  ArrowRight,
  Crown
} from "lucide-react";
import Image from "@/components/ui/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock experiences data
const mockExperiences = [
  {
    id: "1",
    title: "Traditional Pottery Workshop",
    bookings: 24,
    revenue: 1080,
    location: "Oaxaca, Mexico",
    image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
  },
  {
    id: "2",
    title: "Desert Stargazing Experience",
    bookings: 18,
    revenue: 1530,
    location: "Marrakech, Morocco",
    image: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
  },
  {
    id: "3",
    title: "Farm to Table Cooking Class",
    bookings: 12,
    revenue: 780,
    location: "Bali, Indonesia",
    image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
  }
];

const OperatorDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCreateExperience = () => {
    toast({
      title: "Create Experience",
      description: "Redirecting to experience builder...",
    });
    // Would navigate to experience builder in full implementation
  };

  const handleUpgradeClick = () => {
    navigate('/culturin-pro');
    toast({
      title: "Exploring Pro Features",
      description: "Redirecting to Culturin Pro options...",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header type="operator" />
      
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
                Welcome to Your Cultural Experience Dashboard
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Manage your offerings, track bookings, and grow your cultural experience business.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-black hover:bg-gray-800 text-white"
                  onClick={handleCreateExperience}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Experience
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-300"
                  onClick={() => setActiveTab("bookings")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  View Bookings
                </Button>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative h-72 rounded-lg overflow-hidden shadow-lg">
                <Image 
                  src="https://images.unsplash.com/photo-1466442929976-97f336a657be" 
                  alt="Cultural tour guide showing historical site to tourists" 
                  className="object-cover"
                  fill={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dashboard Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
              <TabsList className="bg-transparent p-0">
                <TabsTrigger 
                  value="overview"
                  className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 rounded-lg px-4 py-2 text-gray-600"
                >
                  Dashboard Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="experiences"
                  className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 rounded-lg px-4 py-2 text-gray-600"
                >
                  My Experiences
                </TabsTrigger>
                <TabsTrigger 
                  value="bookings"
                  className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 rounded-lg px-4 py-2 text-gray-600"
                >
                  Booking Management
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Dashboard Overview Tab */}
            <TabsContent value="overview">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-500">Total Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">54</div>
                    <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-500">Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$3,390</div>
                    <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-500">Avg. Rating</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">4.8</div>
                    <p className="text-sm text-gray-500 mt-1">From 36 reviews</p>
                  </CardContent>
                </Card>
              </div>

              {/* Popular Experiences */}
              <div className="mb-10">
                <h2 className="text-xl font-medium mb-4">Your Popular Experiences</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {mockExperiences.map((exp) => (
                    <Card key={exp.id} className="overflow-hidden">
                      <div className="h-40 relative">
                        <Image 
                          src={exp.image} 
                          alt={exp.title} 
                          className="object-cover"
                          fill={true}
                        />
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="font-medium mb-1">{exp.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">{exp.location}</p>
                        <div className="flex justify-between text-sm">
                          <span>{exp.bookings} bookings</span>
                          <span>${exp.revenue} revenue</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Pro Upgrade Banner */}
              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Crown className="h-5 w-5 text-amber-500 mr-2" />
                        <h3 className="font-medium">Unlock Advanced Analytics with Culturin Pro</h3>
                      </div>
                      <p className="text-sm text-gray-600">Get deeper insights into your business performance and customer preferences.</p>
                    </div>
                    <Button 
                      onClick={handleUpgradeClick}
                      className="bg-black hover:bg-gray-800 text-white whitespace-nowrap"
                    >
                      Upgrade to Pro
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Quick Actions */}
              <h2 className="text-xl font-medium mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleCreateExperience}>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <Plus className="w-6 h-6 text-gray-600" />
                    </div>
                    <h3 className="font-medium mb-1">Create Experience</h3>
                    <p className="text-sm text-gray-500">Add a new tour or workshop</p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <Users className="w-6 h-6 text-gray-600" />
                    </div>
                    <h3 className="font-medium mb-1">Manage Guests</h3>
                    <p className="text-sm text-gray-500">View and edit guest information</p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <MessageSquare className="w-6 h-6 text-gray-600" />
                    </div>
                    <h3 className="font-medium mb-1">Support</h3>
                    <p className="text-sm text-gray-500">Contact our team for help</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Experiences Tab Placeholder */}
            <TabsContent value="experiences">
              <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
                <h2 className="text-xl font-medium mb-2">My Experiences</h2>
                <p className="text-gray-500 mb-6">Manage your tours, workshops, and cultural experiences</p>
                <Button 
                  className="bg-black hover:bg-gray-800 text-white"
                  onClick={handleCreateExperience}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Experience
                </Button>
              </div>
            </TabsContent>
            
            {/* Bookings Tab Placeholder */}
            <TabsContent value="bookings">
              <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
                <h2 className="text-xl font-medium mb-2">Booking Management</h2>
                <p className="text-gray-500 mb-6">View and manage all your upcoming and past bookings</p>
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Coming Soon with Pro</Badge>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">© 2025 Culturin. All rights reserved.</p>
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-500 hover:text-gray-900"
                onClick={handleUpgradeClick}
              >
                <Crown className="w-4 h-4 mr-2 text-amber-500" />
                Upgrade to Pro
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OperatorDashboard;
