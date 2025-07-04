"use client";

import React, { useState } from "react";
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
import GuestSegmentation from "@/components/pro/crm/GuestSegmentation";
import LoyaltyProgram from "@/components/pro/crm/LoyaltyProgram";

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
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search guests by name, email, or status..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Guest
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Guest</TableHead>
              <TableHead className="font-semibold">Contact</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Loyalty Tier</TableHead>
              <TableHead className="font-semibold">Last Activity</TableHead>
              <TableHead className="font-semibold">Performance</TableHead>
              <TableHead className="font-semibold">Loyalty Points</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
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
                        ? "bg-purple-100 text-purple-800 border-purple-200"
                        : guest.status === "Active"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-gray-100 text-gray-800 border-gray-200"
                    }
                  >
                    {guest.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {guest.loyaltyTier === "ambassador" && (
                      <Crown className="h-4 w-4 text-purple-600" />
                    )}
                    {guest.loyaltyTier === "gold" && (
                      <Star className="h-4 w-4 text-yellow-600" />
                    )}
                    {guest.loyaltyTier === "silver" && (
                      <Target className="h-4 w-4 text-gray-600" />
                    )}
                    {guest.loyaltyTier === "bronze" && (
                      <Users className="h-4 w-4 text-amber-600" />
                    )}
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
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600">
                            {guest.avgRating}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      {guest.totalSpent}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {guest.loyaltyPoints > 0 ? (
                    <div className="flex items-center gap-1">
                      <Gift className="h-4 w-4 text-blue-600" />
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
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MessageSquare className="h-4 w-4" />
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
    "Aisha is one of our most valued guests. She particularly enjoys art-focused experiences and has referred several friends to our tours. Always provides detailed feedback that helps us improve."
  );
  const { toast } = useToast();

  const handleSaveNotes = () => {
    toast({
      title: "Notes saved",
      description: "Guest notes have been updated successfully.",
    });
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case "ambassador":
        return <Crown className="h-4 w-4 text-purple-600" />;
      case "gold":
        return <Star className="h-4 w-4 text-yellow-600" />;
      case "silver":
        return <Target className="h-4 w-4 text-gray-600" />;
      case "bronze":
        return <Users className="h-4 w-4 text-amber-600" />;
      default:
        return <Users className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case "ambassador":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "gold":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "silver":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "bronze":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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
            <Mail className="h-4 w-4 mr-2" />
            Send Email
          </Button>
          <Button
            variant="outline"
            className="border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </div>
      </div>

      <Card className="border-gray-200">
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
                        ? "bg-purple-100 text-purple-800 border-purple-200"
                        : guest.status === "Active"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-gray-100 text-gray-800 border-gray-200"
                    }
                  >
                    {guest.status}
                  </Badge>
                  <div className="flex items-center gap-2">
                    {getTierIcon(guest.loyaltyTier)}
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
            <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
              <div className="text-2xl font-bold text-green-600">
                {guest.totalSpent}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Spent</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-100">
              <div className="text-2xl font-bold text-purple-600">
                {guest.loyaltyPoints}
              </div>
              <div className="text-sm text-gray-600 mt-1">Loyalty Points</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-100">
              <div className="text-2xl font-bold text-amber-600">
                {guest.referrals || 0}
              </div>
              <div className="text-sm text-gray-600 mt-1">Referrals Made</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Guest Preferences & Tags</CardTitle>
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

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Performance Metrics</CardTitle>
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
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= guest.avgRating
                            ? "text-yellow-500 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
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
                className="bg-green-50 text-green-700 border-green-200"
              >
                High
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Guest Notes</CardTitle>
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

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Travel History</CardTitle>
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
                    <TableCell className="font-medium text-green-600">
                      $250
                    </TableCell>
                    <TableCell>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= 5
                                ? "text-yellow-500 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                  {guest.bookings >= 2 && (
                    <TableRow>
                      <TableCell className="font-medium">2023-08-22</TableCell>
                      <TableCell>Local Cuisine Experience</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell className="font-medium text-green-600">
                        $180
                      </TableCell>
                      <TableCell>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= 5
                                  ? "text-yellow-500 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No booking history available</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button
              variant="outline"
              className="border-green-200 text-green-600 hover:bg-green-50"
            >
              <Gift className="h-4 w-4 mr-2" />
              Send Loyalty Offer
            </Button>
            <Button
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Follow-up
            </Button>
            {guest.loyaltyTier !== "ambassador" && (
              <Button
                variant="outline"
                className="border-amber-200 text-amber-600 hover:bg-amber-50"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
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
  const { toast } = useToast();

  const handleViewGuest = (guest) => {
    setSelectedGuest(guest);
  };

  const handleBackToList = () => {
    setSelectedGuest(null);
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
    <ProDashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Guest CRM</h1>
          <p className="mt-1 text-gray-600">
            Connect every journey to the next
          </p>
        </div>

        {selectedGuest ? (
          <GuestDetails guest={selectedGuest} onBack={handleBackToList} />
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-6 w-full max-w-4xl">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="all-guests">All Guests</TabsTrigger>
              <TabsTrigger value="segmentation">Segmentation</TabsTrigger>
              <TabsTrigger value="email-automation">
                Email Automation
              </TabsTrigger>
              <TabsTrigger value="loyalty">Loyalty Program</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Total Guests
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                          {totalGuests}
                        </p>
                        <p className="text-sm text-green-600 flex items-center mt-1">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          +12% this month
                        </p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Active Guests
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                          {activeGuests}
                        </p>
                        <p className="text-sm text-green-600 flex items-center mt-1">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          +8% this month
                        </p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-full">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          VIP Guests
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                          {vipGuests}
                        </p>
                        <p className="text-sm text-purple-600">
                          High value segment
                        </p>
                      </div>
                      <div className="p-3 bg-purple-100 rounded-full">
                        <Crown className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Avg NPS Score
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                          {avgNPS}
                        </p>
                        <p className="text-sm text-green-600">
                          Excellent rating
                        </p>
                      </div>
                      <div className="p-3 bg-yellow-100 rounded-full">
                        <Star className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center gap-2 border-blue-200 hover:bg-blue-50"
                    >
                      <Mail className="h-8 w-8 text-blue-600" />
                      <span className="font-medium">Create Email Campaign</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center gap-2 border-purple-200 hover:bg-purple-50"
                    >
                      <Target className="h-8 w-8 text-purple-600" />
                      <span className="font-medium">Create Guest Segment</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center gap-2 border-green-200 hover:bg-green-50"
                    >
                      <Gift className="h-8 w-8 text-green-600" />
                      <span className="font-medium">Manage Rewards</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Guest Activity */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Recent Guest Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Star className="h-5 w-5 text-green-600" />
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
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        New Review
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Gift className="h-5 w-5 text-blue-600" />
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

                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Heart className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            James Wilson referred a friend
                          </div>
                          <div className="text-sm text-gray-600">1 day ago</div>
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                        Referral
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="all-guests" className="space-y-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">All Guests</CardTitle>
                </CardHeader>
                <CardContent>
                  <GuestsTable guests={guests} onViewGuest={handleViewGuest} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="segmentation">
              <GuestSegmentation />
            </TabsContent>

            <TabsContent value="email-automation">
              <EmailAutomation />
            </TabsContent>

            <TabsContent value="loyalty">
              <LoyaltyProgram />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        87%
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Email Open Rate
                      </p>
                      <Progress value={87} className="mt-3" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        34%
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Repeat Booking Rate
                      </p>
                      <Progress value={34} className="mt-3" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        $127
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Avg. Customer Value
                      </p>
                      <Progress value={65} className="mt-3" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </ProDashboardLayout>
  );
};

export default ProCRMPage;
