"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/src/components/auth/AuthProvider";
import ProDashboardLayout from "@/components/pro/ProDashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  UserPlus,
  Mail,
  MessageSquare,
  Star,
  Gift,
  Calendar,
  Users,
  TrendingUp,
  BarChart3,
  Crown,
  Target,
  Heart,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import EmailAutomation from "@/components/pro/crm/EmailAutomation";
import LoyaltyProgram from "@/components/pro/crm/LoyaltyProgram";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data
const initialGuests = [
  {
    id: 1,
    name: "Aisha Patel",
    email: "aisha@email.com",
    phone: "+1 (555) 123-4567",
    status: "VIP",
    loyaltyTier: "ambassador",
    lastInteraction: "2 hours ago",
    bookings: 8,
    totalSpent: "$1,240",
    loyaltyPoints: 2400,
    avgRating: 4.9,
    npsScore: 9,
    preferences: "Art, Culture, History",
    tags: ["VIP", "Repeat Customer", "High Value"],
    referrals: 3,
  },
  {
    id: 2,
    name: "Sofia Martinez",
    email: "sofia@email.com",
    phone: "+1 (555) 234-5678",
    status: "Active",
    loyaltyTier: "gold",
    lastInteraction: "5 hours ago",
    bookings: 3,
    totalSpent: "$420",
    loyaltyPoints: 850,
    avgRating: 4.7,
    npsScore: 8,
    preferences: "Food, Cooking, Local Experiences",
    tags: ["Food Lover", "Active"],
    referrals: 1,
  },
  {
    id: 3,
    name: "James Wilson",
    email: "james@email.com",
    phone: "+1 (555) 345-6789",
    status: "Active",
    loyaltyTier: "silver",
    lastInteraction: "1 day ago",
    bookings: 2,
    totalSpent: "$180",
    loyaltyPoints: 360,
    avgRating: 4.5,
    npsScore: 7,
    preferences: "Walking Tours, Architecture",
    tags: ["New Customer"],
    referrals: 1,
  },
  {
    id: 4,
    name: "Maria Garcia",
    email: "maria@email.com",
    phone: "+1 (555) 456-7890",
    status: "Inactive",
    loyaltyTier: "bronze",
    lastInteraction: "2 weeks ago",
    bookings: 1,
    totalSpent: "$85",
    loyaltyPoints: 170,
    avgRating: 4.2,
    preferences: "Museums, Art Galleries",
    tags: ["Inactive"],
    referrals: 0,
  },
  {
    id: 5,
    name: "David Chen",
    email: "david@email.com",
    phone: "+1 (555) 567-8901",
    status: "Active",
    loyaltyTier: "gold",
    lastInteraction: "3 days ago",
    bookings: 5,
    totalSpent: "$650",
    loyaltyPoints: 1300,
    avgRating: 4.8,
    npsScore: 9,
    preferences: "Photography, Street Art, Culture",
    tags: ["Photo Enthusiast", "Regular"],
    referrals: 2,
  },
];

const GuestsTable = ({ guests, onViewGuest }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search guests by name, email, or status..."
            className="pl-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">Add Guest</Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-medium">Guest</TableHead>
              <TableHead className="font-medium">Contact</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium">Loyalty Tier</TableHead>
              <TableHead className="font-medium">Last Activity</TableHead>
              <TableHead className="font-medium">Performance</TableHead>
              <TableHead className="font-medium">Loyalty Points</TableHead>
              <TableHead className="font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGuests.map((guest) => (
              <TableRow key={guest.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">
                        {guest.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {guest.name}
                      </div>
                      <div className="text-sm text-gray-500">{guest.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="text-gray-900">{guest.phone}</div>
                    <div className="text-gray-500">{guest.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      guest.status === "VIP"
                        ? "default"
                        : guest.status === "Active"
                        ? "secondary"
                        : "outline"
                    }
                    className={
                      guest.status === "VIP"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : guest.status === "Active"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : "bg-gray-100 text-gray-800 border-gray-200"
                    }
                  >
                    {guest.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium capitalize">
                      {guest.loyaltyTier}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-600">
                    {guest.lastInteraction}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {guest.bookings} bookings
                      </span>
                      {guest.avgRating && (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-600">
                            {guest.avgRating}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-sm font-medium text-blue-600">
                      {guest.totalSpent}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {guest.loyaltyPoints > 0 ? (
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">
                        {guest.loyaltyPoints}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewGuest(guest)}
                      className="h-8 w-8 p-0"
                    >
                      View
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      Email
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      Message
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const GuestDetails = ({ guest, onBack }) => {
  const [notes, setNotes] = useState(
    "Aisha is one of our most valued guests. She particularly enjoys art focused experiences and has referred several friends to our tours. Always provides detailed feedback that helps us improve."
  );
  const { toast } = useToast();

  const handleSaveNotes = () => {
    toast({
      title: "Notes saved",
      description: "Guest notes have been updated successfully.",
    });
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case "ambassador":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "gold":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "silver":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "bronze":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="border-gray-300">
          ← Back to Guests
        </Button>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            Send Email
          </Button>
          <Button
            variant="outline"
            className="border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            Send Message
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xl">
                  {guest.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {guest.name}
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-gray-600">{guest.email}</span>
                  <Badge
                    variant="outline"
                    className={
                      guest.status === "VIP"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : guest.status === "Active"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : "bg-gray-100 text-gray-800 border-gray-200"
                    }
                  >
                    {guest.status}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={getTierColor(guest.loyaltyTier)}
                    >
                      {guest.loyaltyTier}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Member since</div>
              <div className="font-medium text-gray-900">March 2023</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">
                {guest.bookings}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Bookings</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">
                {guest.totalSpent}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Spent</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">
                {guest.loyaltyPoints}
              </div>
              <div className="text-sm text-gray-600 mt-1">Loyalty Points</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">
                {guest.referrals || 0}
              </div>
              <div className="text-sm text-gray-600 mt-1">Referrals Made</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Guest Preferences & Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">
                Interests
              </div>
              <div className="flex flex-wrap gap-2">
                {guest.preferences?.split(", ").map((pref, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {pref}
                  </Badge>
                ))}
              </div>
            </div>
            {guest.tags && guest.tags.length > 0 && (
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Tags
                </div>
                <div className="flex flex-wrap gap-2">
                  {guest.tags.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="bg-gray-50 text-gray-700 border-gray-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {guest.npsScore && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  NPS Score
                </span>
                <div className="flex items-center gap-2">
                  <Progress value={guest.npsScore * 10} className="w-20 h-2" />
                  <span className="text-sm font-bold text-gray-900">
                    {guest.npsScore}/10
                  </span>
                </div>
              </div>
            )}
            {guest.avgRating && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Avg Rating
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">
                    {guest.avgRating}/5
                  </span>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Engagement Level
              </span>
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                High
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Guest Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes about this guest..."
          />
          <Button
            onClick={handleSaveNotes}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Save Notes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Travel History</CardTitle>
        </CardHeader>
        <CardContent>
          {guest.bookings > 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Experience</TableHead>
                    <TableHead className="font-semibold">Guests</TableHead>
                    <TableHead className="font-semibold">Amount</TableHead>
                    <TableHead className="font-semibold">Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">2023-06-15</TableCell>
                    <TableCell>Cultural Heritage Tour</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell className="font-medium text-blue-600">
                      $250
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">5/5</span>
                    </TableCell>
                  </TableRow>
                  {guest.bookings >= 2 && (
                    <TableRow>
                      <TableCell className="font-medium">2023-08-22</TableCell>
                      <TableCell>Local Cuisine Experience</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell className="font-medium text-blue-600">
                        $180
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">5/5</span>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No booking history available</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              Send Email
            </Button>
            <Button
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              Send Loyalty Offer
            </Button>
            <Button
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              Schedule Follow-up
            </Button>
            {guest.loyaltyTier !== "ambassador" && (
              <Button
                variant="outline"
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Upgrade Tier
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ProCRMPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [guests, setGuests] = useState(initialGuests);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [showEmailCampaignModal, setShowEmailCampaignModal] = useState(false);
  const [showGuestSegmentModal, setShowGuestSegmentModal] = useState(false);
  const { user, userData, isReady } = useAuth();

  // Load user-specific CRM data
  useEffect(() => {
    if (isReady && user) {
      // Here you can load user-specific guests, segments, campaigns, etc.
    }
  }, [isReady, user]);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const { toast } = useToast();

  const handleViewGuest = (guest) => {
    setSelectedGuest(guest);
  };

  const handleBackToList = () => {
    setSelectedGuest(null);
  };

  // Quick Actions Functions
  const handleCreateEmailCampaign = () => {
    setShowEmailCampaignModal(true);
    toast({
      title: "Email Campaign",
      description: "Opening email campaign creator...",
    });
  };

  const handleCreateGuestSegment = () => {
    setShowGuestSegmentModal(true);
    toast({
      title: "Guest Segment",
      description: "Opening guest segment creator...",
    });
  };

  const handleManageRewards = () => {
    setShowRewardsModal(true);
    toast({
      title: "Rewards Management",
      description: "Opening rewards management...",
    });
  };

  // Calculate CRM metrics
  const totalGuests = guests.length;
  const activeGuests = guests.filter(
    (g) => g.status === "Active" || g.status === "VIP"
  ).length;
  const vipGuests = guests.filter((g) => g.status === "VIP").length;
  const avgNPS = Math.round(
    guests.filter((g) => g.npsScore).reduce((sum, g) => sum + g.npsScore, 0) /
      guests.filter((g) => g.npsScore).length
  );

  return (
    <ProDashboardLayout
      title="Guest CRM"
      subtitle="Connect every journey to the next"
    >
      <div className="space-y-6">
        {selectedGuest ? (
          <GuestDetails guest={selectedGuest} onBack={handleBackToList} />
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-4 w-full max-w-4xl">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="all-guests">All Guests</TabsTrigger>
              <TabsTrigger value="email-automation">
                Email Automation
              </TabsTrigger>
              <TabsTrigger value="loyalty">Loyalty Program</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Guests</p>
                        <p className="text-2xl font-bold">{totalGuests}</p>
                        <p className="text-xs text-blue-600 flex items-center mt-1">
                          +12% this month
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Active Guests</p>
                        <p className="text-2xl font-bold">{activeGuests}</p>
                        <p className="text-xs text-blue-600 flex items-center mt-1">
                          +8% this month
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">VIP Guests</p>
                        <p className="text-2xl font-bold">{vipGuests}</p>
                        <p className="text-xs text-blue-600">
                          High value segment
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Avg NPS Score</p>
                        <p className="text-2xl font-bold">{avgNPS}</p>
                        <p className="text-xs text-blue-600">
                          Excellent rating
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant="outline"
                      className="h-auto p-6 flex flex-col items-center gap-3 hover:shadow-md transition-shadow"
                      onClick={handleCreateEmailCampaign}
                    >
                      <span className="font-medium">Create Email Campaign</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-6 flex flex-col items-center gap-3 hover:shadow-md transition-shadow"
                      onClick={handleCreateGuestSegment}
                    >
                      <span className="font-medium">Create Guest Segment</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-6 flex flex-col items-center gap-3 hover:shadow-md transition-shadow"
                      onClick={handleManageRewards}
                    >
                      <span className="font-medium">Manage Rewards</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Guest Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Guest Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            AP
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            Aisha Patel left a 5-star review
                          </div>
                          <div className="text-sm text-gray-600">
                            2 hours ago
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        New Review
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            SM
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            Sofia Martinez redeemed loyalty points
                          </div>
                          <div className="text-sm text-gray-600">
                            5 hours ago
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        Loyalty
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            JW
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            James Wilson referred a friend
                          </div>
                          <div className="text-sm text-gray-600">1 day ago</div>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        Referral
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="all-guests" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Guests</CardTitle>
                </CardHeader>
                <CardContent>
                  <GuestsTable guests={guests} onViewGuest={handleViewGuest} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="email-automation">
              <EmailAutomation />
            </TabsContent>

            <TabsContent value="loyalty">
              <LoyaltyProgram />
            </TabsContent>
          </Tabs>
        )}

        {/* Email Campaign Modal */}
        <Dialog open={showEmailCampaignModal} onOpenChange={setShowEmailCampaignModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Email Campaign</DialogTitle>
              <DialogDescription>
                Create a targeted email campaign to engage your guests.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input id="campaign-name" placeholder="Enter campaign name" />
              </div>
              <div>
                <Label htmlFor="subject-line">Subject Line</Label>
                <Input id="subject-line" placeholder="Enter subject line" />
              </div>
              <div>
                <Label htmlFor="target-segment">Target Segment</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target segment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Guests</SelectItem>
                    <SelectItem value="vip">VIP Guests</SelectItem>
                    <SelectItem value="active">Active Guests</SelectItem>
                    <SelectItem value="inactive">Inactive Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="email-content">Email Content</Label>
                <Textarea 
                  id="email-content" 
                  placeholder="Write your email content here..."
                  rows={6}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEmailCampaignModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                toast({
                  title: "Campaign Created",
                  description: "Your email campaign has been created successfully.",
                });
                setShowEmailCampaignModal(false);
              }}>
                Create Campaign
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Guest Segment Modal */}
        <Dialog open={showGuestSegmentModal} onOpenChange={setShowGuestSegmentModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Guest Segment</DialogTitle>
              <DialogDescription>
                Define criteria to create a targeted guest segment.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="segment-name">Segment Name</Label>
                <Input id="segment-name" placeholder="Enter segment name" />
              </div>
              <div>
                <Label htmlFor="segment-criteria">Segment Criteria</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select criteria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booking-frequency">Booking Frequency</SelectItem>
                    <SelectItem value="total-spent">Total Amount Spent</SelectItem>
                    <SelectItem value="last-activity">Last Activity Date</SelectItem>
                    <SelectItem value="loyalty-tier">Loyalty Tier</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="criteria-value">Criteria Value</Label>
                <Input id="criteria-value" placeholder="Enter criteria value" />
              </div>
              <div>
                <Label htmlFor="segment-description">Description</Label>
                <Textarea 
                  id="segment-description" 
                  placeholder="Describe this segment..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowGuestSegmentModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                toast({
                  title: "Segment Created",
                  description: "Your guest segment has been created successfully.",
                });
                setShowGuestSegmentModal(false);
              }}>
                Create Segment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Rewards Management Modal */}
        <Dialog open={showRewardsModal} onOpenChange={setShowRewardsModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Manage Rewards</DialogTitle>
              <DialogDescription>
                Configure and manage your loyalty rewards program.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="reward-name">Reward Name</Label>
                <Input id="reward-name" placeholder="Enter reward name" />
              </div>
              <div>
                <Label htmlFor="points-required">Points Required</Label>
                <Input id="points-required" type="number" placeholder="Enter points required" />
              </div>
              <div>
                <Label htmlFor="reward-description">Reward Description</Label>
                <Textarea 
                  id="reward-description" 
                  placeholder="Describe the reward..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="reward-type">Reward Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reward type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">Discount</SelectItem>
                    <SelectItem value="free-experience">Free Experience</SelectItem>
                    <SelectItem value="upgrade">Upgrade</SelectItem>
                    <SelectItem value="early-access">Early Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRewardsModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                toast({
                  title: "Reward Created",
                  description: "Your reward has been created successfully.",
                });
                setShowRewardsModal(false);
              }}>
                Create Reward
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ProDashboardLayout>
  );
};

export default ProCRMPage;
