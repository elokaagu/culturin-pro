"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "../../lib/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  Calendar,
  Users,
  TrendingUp,
  DollarSign,
  Crown,
  Plus,
  Eye,
  Settings,
  BarChart3,
  Globe,
  CreditCard,
  MessageSquare,
} from "lucide-react";
import Header from "@/components/Header";
import BookingsTab from "@/components/operator/BookingsTab";
import GuestsTab from "@/components/operator/GuestsTab";
import DashboardOverviewTab from "@/components/operator/DashboardOverviewTab";
import ExperiencesTab from "@/components/operator/ExperiencesTab";
import OperatorCreateExperienceModal from "@/components/OperatorCreateExperienceModal";
import Image from "@/components/ui/image";

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

  // Remove ProAccessDialog state and related code
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Changed: open modal instead of navigating away
  const handleCreateExperience = () => {
    setCreateModalOpen(true);
  };

  const handleUpgradeClick = () => {
    navigate("/pricing");
    toast({
      title: "Exploring Pro Features",
      description: "Check out our pricing plans to unlock advanced features...",
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

      {/* Main Content */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Operator Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your cultural experiences and bookings
              </p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button
                onClick={handleCreateExperience}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Experience
              </Button>
              <Button
                variant="outline"
                onClick={handleUpgradeClick}
                className="border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Pro
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="experiences">Experiences</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="guests">Guests</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

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

      {/* Create Experience Modal */}
      <OperatorCreateExperienceModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
    </div>
  );
};

export default OperatorDashboard;
