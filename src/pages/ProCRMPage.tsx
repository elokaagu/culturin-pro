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
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import EmailAutomation from "@/components/pro/crm/EmailAutomation";
import GuestSegmentation from "@/components/pro/crm/GuestSegmentation";
import LoyaltyProgram from "@/components/pro/crm/LoyaltyProgram";

// Sample guest data
const initialGuests = [
  {
    id: "c1",
    name: "Sofia Martinez",
    email: "sofia@example.com",
    phone: "+1 555-123-4567",
    lastInteraction: "2023-05-10",
    status: "Active",
    bookings: 3,
    totalSpent: "$785",
    notes: "Interested in cultural tours with historical focus.",
    preferences: "History, Architecture, Local Cuisine",
    loyaltyPoints: 350,
    loyaltyTier: "adventurer",
    birthday: "1985-08-15",
    anniversary: null,
    npsScore: 9,
    tags: ["food-lover", "history-buff"],
    lastBookingDate: "2023-05-10",
    avgRating: 4.8,
    referrals: 2,
  },
  {
    id: "c2",
    name: "James Wilson",
    email: "james@example.com",
    phone: "+1 555-987-6543",
    lastInteraction: "2023-06-15",
    status: "Active",
    bookings: 1,
    totalSpent: "$250",
    notes: "Prefers group experiences, looking for summer booking.",
    preferences: "Group Tours, Photography",
    loyaltyPoints: 100,
    loyaltyTier: "explorer",
    birthday: "1990-06-22",
    anniversary: "2018-09-30",
    npsScore: 8,
    tags: ["photographer", "group-leader"],
    lastBookingDate: "2023-06-15",
    avgRating: 5.0,
    referrals: 0,
  },
  {
    id: "c3",
    name: "Elena Petrova",
    email: "elena@example.com",
    phone: "+1 555-456-7890",
    lastInteraction: "2023-04-22",
    status: "Inactive",
    bookings: 2,
    totalSpent: "$520",
    notes: "Follow up about the fall festival experience.",
    preferences: "Cultural Festivals, Music",
    loyaltyPoints: 220,
    loyaltyTier: "explorer",
    birthday: "1983-12-10",
    anniversary: null,
    npsScore: 7,
    tags: ["music-fan", "art-enthusiast"],
    lastBookingDate: "2023-01-15",
    avgRating: 4.5,
    referrals: 1,
  },
  {
    id: "c4",
    name: "Marcus Johnson",
    email: "marcus@example.com",
    phone: "+1 555-789-0123",
    lastInteraction: "2023-06-30",
    status: "Prospect",
    bookings: 0,
    totalSpent: "$0",
    notes: "Referred by Sofia Martinez, interested in cooking classes.",
    preferences: "Culinary, Workshops",
    loyaltyPoints: 0,
    loyaltyTier: "explorer",
    birthday: "1988-03-15",
    anniversary: null,
    npsScore: null,
    tags: ["food-lover"],
    lastBookingDate: null,
    avgRating: null,
    referrals: 0,
  },
  {
    id: "c5",
    name: "Aisha Patel",
    email: "aisha@example.com",
    phone: "+1 555-321-6540",
    lastInteraction: "2023-07-05",
    status: "VIP",
    bookings: 5,
    totalSpent: "$1,275",
    notes: "VIP guest, prefers private experiences. Birthday in August.",
    preferences: "Private Tours, Art, Wine Tasting",
    loyaltyPoints: 650,
    loyaltyTier: "connoisseur",
    birthday: "1979-08-22",
    anniversary: "2005-04-18",
    npsScore: 10,
    tags: ["art-enthusiast", "food-lover", "solo-traveler"],
    lastBookingDate: "2023-07-05",
    avgRating: 4.9,
    referrals: 3,
  },
];

const GuestsTable = ({ guests, onViewGuest }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTierIcon = (tier) => {
    switch (tier) {
      case "ambassador":
        return <Crown className="h-3 w-3 text-gold-600" />;
      case "connoisseur":
        return <Crown className="h-3 w-3 text-purple-600" />;
      case "adventurer":
        return <Star className="h-3 w-3 text-blue-600" />;
      default:
        return <Star className="h-3 w-3 text-gray-600" />;
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case "ambassador":
        return "bg-yellow-100 text-yellow-800";
      case "connoisseur":
        return "bg-purple-100 text-purple-800";
      case "adventurer":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search guests..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Guest
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Loyalty Tier</TableHead>
              <TableHead>Last Interaction</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead>Loyalty</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGuests.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell className="font-medium">{guest.name}</TableCell>
                <TableCell>
                  <div>{guest.email}</div>
                  <div className="text-sm text-gray-500">{guest.phone}</div>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      guest.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : guest.status === "VIP"
                        ? "bg-purple-100 text-purple-800"
                        : guest.status === "Inactive"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {guest.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {getTierIcon(guest.loyaltyTier)}
                    <Badge
                      className={getTierColor(guest.loyaltyTier)}
                      variant="outline"
                    >
                      {guest.loyaltyTier}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{guest.lastInteraction}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{guest.bookings}</span>
                    {guest.avgRating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs">{guest.avgRating}</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {guest.loyaltyPoints > 0 ? (
                    <div className="flex items-center">
                      <Gift className="h-3 w-3 text-amber-500 mr-1" />
                      <span>{guest.loyaltyPoints} pts</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewGuest(guest)}
                    >
                      <span className="sr-only">View details</span>
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <span className="sr-only">Email guest</span>
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <span className="sr-only">Message guest</span>
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
  const { toast } = useToast();
  const [notes, setNotes] = useState(guest.notes);

  const handleSaveNotes = () => {
    toast({
      title: "Notes saved",
      description: "Guest notes have been updated successfully.",
    });
  };

  const getNextMilestone = () => {
    if (!guest.birthday) return null;

    const today = new Date();
    const birthday = new Date(guest.birthday);

    // Set birthday to current year
    birthday.setFullYear(today.getFullYear());

    // If birthday already passed this year, get next year's
    if (birthday < today) {
      birthday.setFullYear(today.getFullYear() + 1);
    }

    // Calculate days until birthday - FIX: Convert to timestamp milliseconds before calculation
    const daysUntil = Math.ceil(
      (birthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      type: "Birthday",
      date: birthday.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      }),
      daysUntil,
    };
  };

  const nextMilestone = getNextMilestone();

  const getTierIcon = (tier) => {
    switch (tier) {
      case "ambassador":
        return <Crown className="h-4 w-4 text-gold-600" />;
      case "connoisseur":
        return <Crown className="h-4 w-4 text-purple-600" />;
      case "adventurer":
        return <Star className="h-4 w-4 text-blue-600" />;
      default:
        return <Star className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case "ambassador":
        return "bg-yellow-100 text-yellow-800";
      case "connoisseur":
        return "bg-purple-100 text-purple-800";
      case "adventurer":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          ← Back to Guests
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Send Email
          </Button>
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{guest.name}</h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-gray-600">{guest.email}</span>
                <Badge
                  className={`${
                    guest.status === "VIP"
                      ? "bg-purple-100 text-purple-800"
                      : guest.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {guest.status}
                </Badge>
                <div className="flex items-center gap-1">
                  {getTierIcon(guest.loyaltyTier)}
                  <Badge
                    className={getTierColor(guest.loyaltyTier)}
                    variant="outline"
                  >
                    {guest.loyaltyTier}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Member since</div>
              <div className="font-medium">March 2023</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {guest.bookings}
              </div>
              <div className="text-sm text-gray-600">Total Bookings</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {guest.totalSpent}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {guest.loyaltyPoints}
              </div>
              <div className="text-sm text-gray-600">Loyalty Points</div>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <div className="text-2xl font-bold text-amber-600">
                {guest.referrals || 0}
              </div>
              <div className="text-sm text-gray-600">Referrals Made</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium mb-2">Guest Preferences & Tags</h4>
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium text-gray-700 mb-1">
                  Interests
                </div>
                <div className="flex flex-wrap gap-2">
                  {guest.preferences?.split(", ").map((pref, i) => (
                    <Badge key={i} variant="outline" className="bg-blue-50">
                      {pref}
                    </Badge>
                  ))}
                </div>
              </div>
              {guest.tags && guest.tags.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Tags
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {guest.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="bg-gray-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium mb-2">Important Dates</h4>
            <div className="space-y-3">
              {guest.birthday && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                    <span>
                      Birthday:{" "}
                      {new Date(guest.birthday).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  {nextMilestone && (
                    <Badge
                      className={
                        nextMilestone.daysUntil < 30
                          ? "bg-amber-100 text-amber-800"
                          : ""
                      }
                    >
                      In {nextMilestone.daysUntil} days
                    </Badge>
                  )}
                </div>
              )}

              {guest.anniversary && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-rose-600" />
                  <span>
                    Anniversary:{" "}
                    {new Date(guest.anniversary).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}

              {!guest.birthday && !guest.anniversary && (
                <p className="text-gray-500">No important dates recorded</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Guest Notes</h4>
            <div className="flex items-center gap-4">
              {guest.npsScore && (
                <div className="flex items-center bg-gray-100 px-2 py-1 rounded-md">
                  <Star className="h-4 w-4 text-amber-500 mr-1" />
                  <span className="text-sm font-medium">
                    NPS Score: {guest.npsScore}/10
                  </span>
                </div>
              )}
              {guest.avgRating && (
                <div className="flex items-center bg-gray-100 px-2 py-1 rounded-md">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">
                    Avg Rating: {guest.avgRating}/5
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <textarea
              className="w-full min-h-[100px] p-2 border rounded-md"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
            <Button onClick={handleSaveNotes}>Save Notes</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h4 className="font-medium">Travel History</h4>
        {guest.bookings > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Feedback</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guest.bookings >= 1 && (
                <TableRow>
                  <TableCell>2023-06-15</TableCell>
                  <TableCell>Cultural Heritage Tour</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>$250</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= 5 ? "text-amber-500" : "text-gray-300"
                          }`}
                          fill={star <= 5 ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {guest.bookings >= 2 && (
                <TableRow>
                  <TableCell>2023-04-22</TableCell>
                  <TableCell>Food & Wine Experience</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>$185</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= 4 ? "text-amber-500" : "text-gray-300"
                          }`}
                          fill={star <= 4 ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {guest.bookings >= 3 && (
                <TableRow>
                  <TableCell>2023-03-10</TableCell>
                  <TableCell>Art Gallery Tour</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>$350</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= 5 ? "text-amber-500" : "text-gray-300"
                          }`}
                          fill={star <= 5 ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-gray-500 mb-4">No booking history yet</p>
              <Button>Send Welcome Email</Button>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="pt-4 border-t">
        <h4 className="font-medium mb-3">Guest Engagement</h4>
        <div className="space-x-2">
          <Button variant="outline" className="bg-blue-50">
            <Mail className="h-4 w-4 mr-2" />
            Send Email
          </Button>
          <Button variant="outline" className="bg-blue-50">
            <Gift className="h-4 w-4 mr-2" />
            Send Loyalty Offer
          </Button>
          <Button variant="outline" className="bg-blue-50">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Follow-up
          </Button>
          {guest.loyaltyTier !== "ambassador" && (
            <Button variant="outline" className="bg-purple-50">
              <TrendingUp className="h-4 w-4 mr-2" />
              Upgrade Tier
            </Button>
          )}
        </div>
      </div>
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
  const avgLoyaltyPoints = Math.round(
    guests.reduce((sum, g) => sum + g.loyaltyPoints, 0) / totalGuests
  );
  const totalReferrals = guests.reduce((sum, g) => sum + (g.referrals || 0), 0);
  const avgNPS = Math.round(
    guests.filter((g) => g.npsScore).reduce((sum, g) => sum + g.npsScore, 0) /
      guests.filter((g) => g.npsScore).length
  );

  return (
    <ProDashboardLayout
      title="Guest CRM"
      subtitle="Connect every journey to the next"
    >
      {selectedGuest ? (
        <GuestDetails guest={selectedGuest} onBack={handleBackToList} />
      ) : (
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="all-clients">All Guests</TabsTrigger>
            <TabsTrigger value="segmentation">Segmentation</TabsTrigger>
            <TabsTrigger value="email-automation">Email Automation</TabsTrigger>
            <TabsTrigger value="loyalty">Loyalty Program</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* CRM Overview Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{totalGuests}</div>
                      <p className="text-sm text-gray-500">Total Guests</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    ↗ +12% this month
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{activeGuests}</div>
                      <p className="text-sm text-gray-500">Active Guests</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    ↗ +8% this month
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{vipGuests}</div>
                      <p className="text-sm text-gray-500">VIP Guests</p>
                    </div>
                    <Crown className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-xs text-purple-600 mt-1">
                    High value segment
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{avgNPS}</div>
                      <p className="text-sm text-gray-500">Avg NPS Score</p>
                    </div>
                    <Star className="h-8 w-8 text-amber-600" />
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    Excellent rating
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
                    className="h-20 flex-col gap-2"
                    variant="outline"
                    onClick={() => setActiveTab("email-automation")}
                  >
                    <Mail className="h-6 w-6" />
                    <span>Create Email Campaign</span>
                  </Button>
                  <Button
                    className="h-20 flex-col gap-2"
                    variant="outline"
                    onClick={() => setActiveTab("segmentation")}
                  >
                    <Target className="h-6 w-6" />
                    <span>Create Guest Segment</span>
                  </Button>
                  <Button
                    className="h-20 flex-col gap-2"
                    variant="outline"
                    onClick={() => setActiveTab("loyalty")}
                  >
                    <Gift className="h-6 w-6" />
                    <span>Manage Rewards</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Guest Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Star className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">
                          Aisha Patel left a 5-star review
                        </div>
                        <div className="text-sm text-gray-500">2 hours ago</div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      New Review
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Gift className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">
                          Sofia Martinez redeemed loyalty points
                        </div>
                        <div className="text-sm text-gray-500">5 hours ago</div>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Loyalty</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Heart className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">
                          James Wilson referred a friend
                        </div>
                        <div className="text-sm text-gray-500">1 day ago</div>
                      </div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">
                      Referral
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all-clients">
            <Card>
              <CardContent className="pt-6">
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

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">{avgLoyaltyPoints}</div>
                  <p className="text-sm text-gray-500">Avg. Loyalty Points</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">{totalReferrals}</div>
                  <p className="text-sm text-gray-500">Total Referrals</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">73%</div>
                  <p className="text-sm text-gray-500">Retention Rate</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Guest Lifecycle Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">
                        New Guests (Last 30 Days)
                      </div>
                      <div className="text-sm text-gray-500">
                        First-time bookers
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">23</div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">Repeat Guests</div>
                      <div className="text-sm text-gray-500">2+ bookings</div>
                    </div>
                    <div className="text-2xl font-bold text-green-600">67</div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">At-Risk Guests</div>
                      <div className="text-sm text-gray-500">
                        No activity in 90+ days
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-red-600">12</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Lifecycle Automation Banner */}
      {!selectedGuest && activeTab === "all-clients" && (
        <Card className="mt-6 border-blue-100 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium text-blue-900">
                  Lifecycle Automation
                </h3>
                <p className="text-sm text-blue-700 mt-1">
                  Set up automations to nurture your guest relationships
                  throughout their journey.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white border-blue-200"
                  onClick={() => setActiveTab("email-automation")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Birthday Reminders
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white border-blue-200"
                  onClick={() => setActiveTab("email-automation")}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Review Requests
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white border-blue-200"
                  onClick={() => setActiveTab("loyalty")}
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Loyalty Campaigns
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </ProDashboardLayout>
  );
};

export default ProCRMPage;
