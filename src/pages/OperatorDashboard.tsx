"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "../../lib/navigation";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import OperatorCreateExperienceModal from "@/components/OperatorCreateExperienceModal";
import DashboardOverviewTab from "@/components/operator/DashboardOverviewTab";
import ExperiencesTab from "@/components/operator/ExperiencesTab";
import BookingsTab from "@/components/operator/BookingsTab";
import GuestsTab from "@/components/operator/GuestsTab";
import Image from "@/components/ui/image";
import { Plus, Calendar, Crown, ArrowRight } from "lucide-react";
import ProAccessDialog, {
  useProAccess,
} from "@/components/pro/ProAccessDialog";

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
  },
];

// Mock bookings data
const mockBookings = [
  {
    id: "BK-1001",
    guest: "Emma Thompson",
    experience: "Cultural Heritage Walk",
    date: "2025-05-24",
    amount: "£95.00",
    status: "confirmed",
  },
  {
    id: "BK-1002",
    guest: "Michael Chen",
    experience: "Food & Culinary Tour",
    date: "2025-05-26",
    amount: "£120.00",
    status: "pending",
  },
  {
    id: "BK-1003",
    guest: "Sarah Johnson",
    experience: "Artisan Workshop Visit",
    date: "2025-05-29",
    amount: "£75.00",
    status: "completed",
  },
  {
    id: "BK-1004",
    guest: "David Rodriguez",
    experience: "Sunset Cultural Tour",
    date: "2025-05-31",
    amount: "£85.00",
    status: "confirmed",
  },
  {
    id: "BK-1005",
    guest: "Aisha Patel",
    experience: "Heritage Site Tour",
    date: "2025-06-02",
    amount: "£110.00",
    status: "cancelled",
  },
];

const OperatorDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // State to control the Pro Access Dialog
  const [proDialogOpen, setProDialogOpen] = useState(false);

  // Remove automatic Pro dialog display
  const { hasAccess } = useProAccess();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Changed: open modal instead of navigating away
  const handleCreateExperience = () => {
    setCreateModalOpen(true);
  };

  const handleUpgradeClick = () => {
    navigate("/sign-in");
    toast({
      title: "Exploring Studio Features",
      description: "Please sign in to access Culturin Studio...",
    });
  };

  const handleManageGuests = () => {
    setActiveTab("guests");
    toast({
      title: "Guest Management",
      description: "Viewing your guest management dashboard...",
    });
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
      <OperatorCreateExperienceModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />

      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
                Welcome to Your Cultural Experience Dashboard
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Manage your offerings, track bookings, and grow your cultural
                experience business.
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
                <TabsTrigger
                  value="guests"
                  className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 rounded-lg px-4 py-2 text-gray-600"
                >
                  Manage Guests
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
              <ExperiencesTab onCreateExperience={handleCreateExperience} />
            </TabsContent>
            <TabsContent value="bookings">
              <BookingsTab />
            </TabsContent>
            <TabsContent value="guests">
              <GuestsTab />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 Culturin. All rights reserved.
            </p>
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

      {/* Add the 'View Pro Features' toggle button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          variant="secondary"
          className="shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold"
          onClick={() => setProDialogOpen(true)}
        >
          View Pro Features
        </Button>
      </div>
      {/* Toggleable Pro Access Dialog */}
      <ProAccessDialog open={proDialogOpen} setOpen={setProDialogOpen} />
    </div>
  );
};

export default OperatorDashboard;
