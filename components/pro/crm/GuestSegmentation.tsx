"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Users,
  Plus,
  Filter,
  Tag,
  TrendingUp,
  Calendar,
  DollarSign,
  Star,
  MapPin,
  Heart,
  Camera,
  Utensils,
  Music,
  Palette,
  BookOpen,
  Mountain,
  Building,
  Plane,
  Clock,
  Target,
  BarChart3,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const guestSegments = [
  {
    id: "vip-guests",
    name: "VIP Guests",
    description: "High-value guests with 5+ bookings or $1000+ spent",
    count: 34,
    criteria: { bookings: ">=5", totalSpent: ">=1000" },
    color: "bg-purple-100 text-purple-800",
    icon: <Star className="h-4 w-4" />,
  },
  {
    id: "food-lovers",
    name: "Food Lovers",
    description: "Guests who prefer culinary experiences",
    count: 156,
    criteria: { interests: ["culinary", "food", "cooking"] },
    color: "bg-orange-100 text-orange-800",
    icon: <Utensils className="h-4 w-4" />,
  },
  {
    id: "art-enthusiasts",
    name: "Art Enthusiasts",
    description: "Guests interested in art and cultural experiences",
    count: 89,
    criteria: { interests: ["art", "culture", "museums"] },
    color: "bg-pink-100 text-pink-800",
    icon: <Palette className="h-4 w-4" />,
  },
  {
    id: "repeat-bookers",
    name: "Repeat Bookers",
    description: "Guests with 2+ bookings in the last 6 months",
    count: 67,
    criteria: { bookings: ">=2", timeframe: "6months" },
    color: "bg-green-100 text-green-800",
    icon: <Heart className="h-4 w-4" />,
  },
  {
    id: "inactive-guests",
    name: "Inactive Guests",
    description: "Guests with no bookings in the last 12 months",
    count: 45,
    criteria: { lastBooking: ">12months" },
    color: "bg-gray-100 text-gray-800",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    id: "high-reviewers",
    name: "High Reviewers",
    description: "Guests who consistently leave 5-star reviews",
    count: 78,
    criteria: { avgRating: ">=4.5", reviewCount: ">=3" },
    color: "bg-yellow-100 text-yellow-800",
    icon: <Star className="h-4 w-4" />,
  },
];

const availableTags = [
  {
    id: "food-lover",
    name: "Food Lover",
    color: "bg-orange-100 text-orange-800",
    icon: <Utensils className="h-3 w-3" />,
  },
  {
    id: "art-enthusiast",
    name: "Art Enthusiast",
    color: "bg-pink-100 text-pink-800",
    icon: <Palette className="h-3 w-3" />,
  },
  {
    id: "history-buff",
    name: "History Buff",
    color: "bg-blue-100 text-blue-800",
    icon: <BookOpen className="h-3 w-3" />,
  },
  {
    id: "adventure-seeker",
    name: "Adventure Seeker",
    color: "bg-green-100 text-green-800",
    icon: <Mountain className="h-3 w-3" />,
  },
  {
    id: "architecture-lover",
    name: "Architecture Lover",
    color: "bg-gray-100 text-gray-800",
    icon: <Building className="h-3 w-3" />,
  },
  {
    id: "music-fan",
    name: "Music Fan",
    color: "bg-purple-100 text-purple-800",
    icon: <Music className="h-3 w-3" />,
  },
  {
    id: "photographer",
    name: "Photographer",
    color: "bg-indigo-100 text-indigo-800",
    icon: <Camera className="h-3 w-3" />,
  },
  {
    id: "solo-traveler",
    name: "Solo Traveler",
    color: "bg-teal-100 text-teal-800",
    icon: <Plane className="h-3 w-3" />,
  },
  {
    id: "group-leader",
    name: "Group Leader",
    color: "bg-amber-100 text-amber-800",
    icon: <Users className="h-3 w-3" />,
  },
  {
    id: "local-resident",
    name: "Local Resident",
    color: "bg-emerald-100 text-emerald-800",
    icon: <MapPin className="h-3 w-3" />,
  },
];

const GuestSegmentation = () => {
  const [activeTab, setActiveTab] = useState("segments");
  const [segmentDialogOpen, setSegmentDialogOpen] = useState(false);
  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const { toast } = useToast();

  const [newSegment, setNewSegment] = useState({
    name: "",
    description: "",
    criteria: {
      bookings: "",
      totalSpent: "",
      lastBooking: "",
      avgRating: "",
      location: "",
      interests: [],
      tags: [],
    },
  });

  const [segmentFilters, setSegmentFilters] = useState({
    bookingCount: [0, 10],
    spentAmount: [0, 2000],
    rating: [0, 5],
    daysSinceLastBooking: [0, 365],
    selectedTags: [],
    location: "",
    ageRange: [18, 65],
  });

  const handleCreateSegment = () => {
    toast({
      title: "Segment created",
      description: "Your guest segment has been created successfully.",
    });
    setSegmentDialogOpen(false);
    setNewSegment({
      name: "",
      description: "",
      criteria: {
        bookings: "",
        totalSpent: "",
        lastBooking: "",
        avgRating: "",
        location: "",
        interests: [],
        tags: [],
      },
    });
  };

  const handleExportSegment = (segmentId: string) => {
    toast({
      title: "Export started",
      description:
        "Your segment data is being exported. You'll receive an email when it's ready.",
    });
  };

  const handleCreateCampaign = (segmentId: string) => {
    toast({
      title: "Campaign created",
      description: "Email campaign has been created for this segment.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Guest Segmentation</h2>
          <p className="text-gray-600">
            Organize and target your guests with smart segmentation and tagging
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={segmentDialogOpen} onOpenChange={setSegmentDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Segment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Guest Segment</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Segment Name</Label>
                    <Input
                      placeholder="e.g., Premium Food Lovers"
                      value={newSegment.name}
                      onChange={(e) =>
                        setNewSegment({ ...newSegment, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input
                      placeholder="Brief description of this segment"
                      value={newSegment.description}
                      onChange={(e) =>
                        setNewSegment({
                          ...newSegment,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Segment Criteria</h4>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Minimum Bookings</Label>
                      <Select
                        value={newSegment.criteria.bookings}
                        onValueChange={(value) =>
                          setNewSegment({
                            ...newSegment,
                            criteria: {
                              ...newSegment.criteria,
                              bookings: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select minimum" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value=">=1">1 or more</SelectItem>
                          <SelectItem value=">=2">2 or more</SelectItem>
                          <SelectItem value=">=3">3 or more</SelectItem>
                          <SelectItem value=">=5">5 or more</SelectItem>
                          <SelectItem value=">=10">10 or more</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Minimum Spent</Label>
                      <Select
                        value={newSegment.criteria.totalSpent}
                        onValueChange={(value) =>
                          setNewSegment({
                            ...newSegment,
                            criteria: {
                              ...newSegment.criteria,
                              totalSpent: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select minimum" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value=">=100">$100+</SelectItem>
                          <SelectItem value=">=250">$250+</SelectItem>
                          <SelectItem value=">=500">$500+</SelectItem>
                          <SelectItem value=">=1000">$1000+</SelectItem>
                          <SelectItem value=">=2000">$2000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Last Booking</Label>
                      <Select
                        value={newSegment.criteria.lastBooking}
                        onValueChange={(value) =>
                          setNewSegment({
                            ...newSegment,
                            criteria: {
                              ...newSegment.criteria,
                              lastBooking: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<30days">
                            Within 30 days
                          </SelectItem>
                          <SelectItem value="<90days">
                            Within 90 days
                          </SelectItem>
                          <SelectItem value="<6months">
                            Within 6 months
                          </SelectItem>
                          <SelectItem value=">6months">
                            Over 6 months ago
                          </SelectItem>
                          <SelectItem value=">12months">
                            Over 12 months ago
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Average Rating</Label>
                      <Select
                        value={newSegment.criteria.avgRating}
                        onValueChange={(value) =>
                          setNewSegment({
                            ...newSegment,
                            criteria: {
                              ...newSegment.criteria,
                              avgRating: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select minimum" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value=">=3.0">3.0+ stars</SelectItem>
                          <SelectItem value=">=4.0">4.0+ stars</SelectItem>
                          <SelectItem value=">=4.5">4.5+ stars</SelectItem>
                          <SelectItem value=">=5.0">5.0 stars only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Interest Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => (
                        <Badge
                          key={tag.id}
                          variant="outline"
                          className={`cursor-pointer transition-colors ${
                            newSegment.criteria.tags.includes(tag.id)
                              ? tag.color
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => {
                            const updatedTags =
                              newSegment.criteria.tags.includes(tag.id)
                                ? newSegment.criteria.tags.filter(
                                    (t) => t !== tag.id
                                  )
                                : [...newSegment.criteria.tags, tag.id];
                            setNewSegment({
                              ...newSegment,
                              criteria: {
                                ...newSegment.criteria,
                                tags: updatedTags,
                              },
                            });
                          }}
                        >
                          {tag.icon}
                          <span className="ml-1">{tag.name}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSegmentDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateSegment}>Create Segment</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="segments">Guest Segments</TabsTrigger>
          <TabsTrigger value="tags">Tag Management</TabsTrigger>
          <TabsTrigger value="builder">Segment Builder</TabsTrigger>
          <TabsTrigger value="analytics">Segment Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="segments" className="space-y-4">
          <div className="grid gap-4">
            {guestSegments.map((segment) => (
              <Card
                key={segment.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          {segment.icon}
                          <h3 className="font-medium text-lg">
                            {segment.name}
                          </h3>
                        </div>
                        <Badge className={segment.color}>
                          {segment.count} guests
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">
                        {segment.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Growing segment
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          High value potential
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleExportSegment(segment.id)}
                      >
                        Export
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCreateCampaign(segment.id)}
                      >
                        Create Campaign
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tags" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Available Tags</h3>
            <Dialog open={tagDialogOpen} onOpenChange={setTagDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Tag
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Tag</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tag Name</Label>
                    <Input placeholder="e.g., Wine Enthusiast" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tag Color</Label>
                    <div className="flex gap-2">
                      {[
                        "bg-red-100",
                        "bg-blue-100",
                        "bg-green-100",
                        "bg-yellow-100",
                        "bg-purple-100",
                        "bg-pink-100",
                      ].map((color) => (
                        <div
                          key={color}
                          className={`w-8 h-8 rounded-full cursor-pointer border-2 border-transparent hover:border-gray-300 ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Auto-Apply Rules</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="auto-food" />
                        <Label htmlFor="auto-food">
                          Auto-apply to guests who book food experiences
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="auto-rating" />
                        <Label htmlFor="auto-rating">
                          Auto-apply to guests with 5-star ratings
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setTagDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => setTagDialogOpen(false)}>
                      Create Tag
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {availableTags.map((tag) => (
              <Card
                key={tag.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    {tag.icon}
                  </div>
                  <h4 className="font-medium mb-1">{tag.name}</h4>
                  <Badge className={tag.color} variant="outline">
                    {Math.floor(Math.random() * 50) + 10} guests
                  </Badge>
                  <div className="flex justify-center gap-1 mt-3">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="builder" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Segment Builder</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Booking Count Range</Label>
                    <Slider
                      value={segmentFilters.bookingCount}
                      onValueChange={(value) =>
                        setSegmentFilters({
                          ...segmentFilters,
                          bookingCount: value,
                        })
                      }
                      max={20}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{segmentFilters.bookingCount[0]} bookings</span>
                      <span>{segmentFilters.bookingCount[1]} bookings</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Total Spent Range</Label>
                    <Slider
                      value={segmentFilters.spentAmount}
                      onValueChange={(value) =>
                        setSegmentFilters({
                          ...segmentFilters,
                          spentAmount: value,
                        })
                      }
                      max={5000}
                      step={50}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>${segmentFilters.spentAmount[0]}</span>
                      <span>${segmentFilters.spentAmount[1]}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Average Rating</Label>
                    <Slider
                      value={segmentFilters.rating}
                      onValueChange={(value) =>
                        setSegmentFilters({ ...segmentFilters, rating: value })
                      }
                      max={5}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{segmentFilters.rating[0]} stars</span>
                      <span>{segmentFilters.rating[1]} stars</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Days Since Last Booking</Label>
                    <Slider
                      value={segmentFilters.daysSinceLastBooking}
                      onValueChange={(value) =>
                        setSegmentFilters({
                          ...segmentFilters,
                          daysSinceLastBooking: value,
                        })
                      }
                      max={365}
                      step={7}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{segmentFilters.daysSinceLastBooking[0]} days</span>
                      <span>{segmentFilters.daysSinceLastBooking[1]} days</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Select
                      value={segmentFilters.location}
                      onValueChange={(value) =>
                        setSegmentFilters({
                          ...segmentFilters,
                          location: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="local">
                          Local (within 50 miles)
                        </SelectItem>
                        <SelectItem value="domestic">Domestic</SelectItem>
                        <SelectItem value="international">
                          International
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Age Range</Label>
                    <Slider
                      value={segmentFilters.ageRange}
                      onValueChange={(value) =>
                        setSegmentFilters({
                          ...segmentFilters,
                          ageRange: value,
                        })
                      }
                      min={18}
                      max={80}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{segmentFilters.ageRange[0]} years</span>
                      <span>{segmentFilters.ageRange[1]} years</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Interest Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant="outline"
                      className={`cursor-pointer transition-colors ${
                        segmentFilters.selectedTags.includes(tag.id)
                          ? tag.color
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        const updatedTags =
                          segmentFilters.selectedTags.includes(tag.id)
                            ? segmentFilters.selectedTags.filter(
                                (t) => t !== tag.id
                              )
                            : [...segmentFilters.selectedTags, tag.id];
                        setSegmentFilters({
                          ...segmentFilters,
                          selectedTags: updatedTags,
                        });
                      }}
                    >
                      {tag.icon}
                      <span className="ml-1">{tag.name}</span>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Estimated matches:</span> 127
                  guests
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Preview Guests</Button>
                  <Button>Save as Segment</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">8</div>
                <p className="text-sm text-gray-500">Active Segments</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">456</div>
                <p className="text-sm text-gray-500">Total Guests Segmented</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">73%</div>
                <p className="text-sm text-gray-500">Segment Coverage</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Segment Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {guestSegments.map((segment) => (
                  <div
                    key={segment.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {segment.icon}
                      <div>
                        <div className="font-medium">{segment.name}</div>
                        <div className="text-sm text-gray-500">
                          {segment.count} guests
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium">
                          {Math.floor(Math.random() * 30) + 60}%
                        </div>
                        <div className="text-gray-500">Email Open Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">
                          ${Math.floor(Math.random() * 200) + 150}
                        </div>
                        <div className="text-gray-500">Avg. Booking Value</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">
                          {Math.floor(Math.random() * 20) + 15}%
                        </div>
                        <div className="text-gray-500">Conversion Rate</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GuestSegmentation;
