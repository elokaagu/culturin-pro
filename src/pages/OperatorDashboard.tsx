import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import OperatorCreateExperienceModal from "@/components/OperatorCreateExperienceModal";
import DashboardOverviewTab from "@/components/operator/DashboardOverviewTab";
import ExperiencesTab from "@/components/operator/ExperiencesTab";
import BookingsTab from "@/components/operator/BookingsTab";
import Image from "@/components/ui/image";
import { Plus, Calendar, Crown, ArrowRight } from "lucide-react";

// Mock experiences data
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

// Mock bookings data
const mockBookings = [
  { 
    id: 'BK-1001', 
    guest: 'Emma Thompson', 
    experience: 'Cultural Heritage Walk', 
    date: '2025-05-24', 
    amount: '£95.00',
    status: 'confirmed',
  },
  { 
    id: 'BK-1002', 
    guest: 'Michael Chen', 
    experience: 'Food & Culinary Tour', 
    date: '2025-05-26', 
    amount: '£120.00',
    status: 'pending',
  },
  { 
    id: 'BK-1003', 
    guest: 'Sarah Johnson', 
    experience: 'Artisan Workshop Visit', 
    date: '2025-05-29', 
    amount: '£75.00',
    status: 'completed',
  },
  { 
    id: 'BK-1004', 
    guest: 'David Rodriguez', 
    experience: 'Sunset Cultural Tour', 
    date: '2025-05-31', 
    amount: '£85.00',
    status: 'confirmed',
  },
  { 
    id: 'BK-1005', 
    guest: 'Aisha Patel', 
    experience: 'Heritage Site Tour', 
    date: '2025-06-02', 
    amount: '£110.00',
    status: 'cancelled',
  }
];

const OperatorDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Changed: open modal instead of navigating away
  const handleCreateExperience = () => {
    setCreateModalOpen(true);
  };

  const handleUpgradeClick = () => {
    navigate('/culturin-pro');
    toast({
      title: "Exploring Pro Features",
      description: "Redirecting to Culturin Pro options...",
    });
  };

  const handleManageGuests = () => {
    toast({
      title: "Manage Guests",
      description: "Redirecting to guest management...",
    });
    navigate("/pro-dashboard/crm");
  };

  const handleGetSupport = () => {
    toast({
      title: "Support",
      description: "Connecting you with our support team...",
    });
    navigate("/help-center");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header type="operator" />
      <OperatorCreateExperienceModal open={createModalOpen} onOpenChange={setCreateModalOpen} />

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
          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-8"
          >
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
              <DashboardOverviewTab
                onCreateExperience={handleCreateExperience}
                onUpgradeClick={handleUpgradeClick}
                onManageGuests={handleManageGuests}
                onGetSupport={handleGetSupport}
              />
            </TabsContent>
            <TabsContent value="experiences">
              <ExperiencesTab 
                onCreateExperience={handleCreateExperience} 
              />
            </TabsContent>
            <TabsContent value="bookings">
              <BookingsTab />
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
