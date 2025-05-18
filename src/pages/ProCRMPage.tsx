
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Search, Plus, Star, Edit, Mail, Calendar, Heart, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';

// Mock data for guest profiles
const guestProfiles = [
  {
    id: 1,
    name: "Emma Thompson",
    email: "emma.t@example.com",
    phone: "+1 (555) 123-4567",
    tripsCount: 3,
    lastTrip: "Apr 15, 2025",
    rating: 4.9,
    notes: "Interested in cultural cooking experiences. Vegetarian.",
    loyaltyPoints: 350,
    referrals: 2,
    upcomingEvent: "Tokyo Cherry Blossom Festival (Mar 2026)",
    birthday: "Jun 15",
    anniversary: null
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.c@example.com",
    phone: "+1 (555) 987-6543",
    tripsCount: 1,
    lastTrip: "Mar 22, 2025",
    rating: 5.0,
    notes: "Photography enthusiast. Speaks Mandarin and English.",
    loyaltyPoints: 125,
    referrals: 0,
    upcomingEvent: null,
    birthday: "Aug 3",
    anniversary: "Sep 18"
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    email: "sophia.r@example.com",
    phone: "+1 (555) 234-5678",
    tripsCount: 2,
    lastTrip: "May 3, 2025",
    rating: 4.7,
    notes: "Loves historical sites. Traveling with family of 4.",
    loyaltyPoints: 275,
    referrals: 1,
    upcomingEvent: "Barcelona Cultural Week (Jul 2025)",
    birthday: "Nov 22",
    anniversary: "Feb 14"
  }
];

// Mock data for message templates
const messageTemplates = [
  {
    id: 1,
    title: "Booking Confirmation",
    content: "Hello {guest_name}, your booking for {experience_name} on {date} has been confirmed! We're looking forward to hosting you. Please arrive 15 minutes before the start time at {meeting_point}.",
    lastEdited: "Apr 10, 2025"
  },
  {
    id: 2,
    title: "Day Before Reminder",
    content: "Hi {guest_name}! Just a friendly reminder about your experience tomorrow. Weather forecast: {weather_forecast}. Don't forget to bring {items_to_bring}. See you soon!",
    lastEdited: "Apr 22, 2025"
  },
  {
    id: 3,
    title: "Thank You & Review Request",
    content: "Thank you for joining us, {guest_name}! We hope you enjoyed {experience_name}. If you had a great time, we'd appreciate if you could leave us a review. Here's the link: {review_link}",
    lastEdited: "May 1, 2025"
  },
  {
    id: 4,
    title: "Birthday Greeting & Special Offer",
    content: "Happy Birthday, {guest_name}! We hope your day is filled with joy. As a valued guest, we'd like to offer you a special 15% discount on your next booking with us. This offer is valid for 30 days. Use code: BDAYTREAT",
    lastEdited: "May 12, 2025"
  },
  {
    id: 5,
    title: "Anniversary Reminder",
    content: "Dear {guest_name}, your {experience_anniversary} anniversary with us is coming up! Relive those wonderful memories with another trip. Book now to receive a complimentary upgrade.",
    lastEdited: "May 15, 2025"
  }
];

// Mock data for automated campaigns
const automatedCampaigns = [
  {
    id: 1,
    name: "Birthday Greetings",
    trigger: "Guest's birthday",
    template: "Birthday Greeting & Special Offer",
    status: "Active",
    lastRun: "May 12, 2025",
    nextRun: "May 16, 2025",
    sentCount: 156
  },
  {
    id: 2,
    name: "Trip Anniversary",
    trigger: "1 year after experience",
    template: "Anniversary Reminder",
    status: "Active",
    lastRun: "May 14, 2025",
    nextRun: "May 17, 2025",
    sentCount: 89
  },
  {
    id: 3,
    name: "Seasonal Festival Alert",
    trigger: "3 months before relevant local festival",
    template: "Upcoming Festival Invitation",
    status: "Paused",
    lastRun: "Apr 30, 2025",
    nextRun: "N/A",
    sentCount: 64
  }
];

// Mock data for loyalty tiers
const loyaltyTiers = [
  {
    id: 1,
    name: "Explorer",
    requirements: "0-200 points",
    benefits: ["Basic guest profile", "Newsletter updates"],
    members: 425
  },
  {
    id: 2,
    name: "Adventurer",
    requirements: "201-500 points",
    benefits: ["5% off repeat bookings", "Priority booking", "Exclusive content"],
    members: 178
  },
  {
    id: 3,
    name: "Voyager",
    requirements: "501-1000 points",
    benefits: ["10% off repeat bookings", "Free add-on experiences", "Early access to new trips"],
    members: 86
  },
  {
    id: 4,
    name: "Cultural Ambassador",
    requirements: "1001+ points",
    benefits: ["15% off all bookings", "Complimentary upgrades", "Invite to annual virtual meetup", "Special host access"],
    members: 27
  }
];

// Mock data for survey metrics
const surveyMetrics = [
  { category: "Host Knowledge", score: 4.9 },
  { category: "Experience Value", score: 4.7 },
  { category: "Communication", score: 4.8 },
  { category: "Location", score: 4.6 },
  { category: "Overall Satisfaction", score: 4.8 }
];

// Mock testimonials
const testimonials = [
  { 
    id: 1, 
    guest: "Emma T.", 
    experience: "Lisbon Food Tour", 
    rating: 5,
    comment: "The host was incredibly knowledgeable about local cuisine. We discovered places we would have never found on our own!"
  },
  { 
    id: 2, 
    guest: "Michael C.", 
    experience: "Tokyo Photography Walk", 
    rating: 5,
    comment: "A perfect blend of photography tips and cultural insights. Our host knew all the best spots for unique shots."
  },
  { 
    id: 3, 
    guest: "Sophia R.", 
    experience: "Barcelona Architecture Tour", 
    rating: 4,
    comment: "Very informative tour. Would have appreciated a bit more time at Sagrada Familia, but overall excellent."
  }
];

// Mock data for memory prompts
const memoryPrompts = [
  {
    id: 1,
    title: "Favorite Moment",
    prompt: "What was your favorite moment from your {experience_name} trip?",
    responseRate: "78%"
  },
  {
    id: 2,
    title: "Food Memory",
    prompt: "Tell us about a dish or food moment that stood out during your experience.",
    responseRate: "82%"
  },
  {
    id: 3,
    title: "Cultural Learning",
    prompt: "What's one thing you learned about the local culture that surprised you?",
    responseRate: "73%"
  }
];

const RatingStar = ({ filled }: { filled: boolean }) => (
  <Star className={`h-4 w-4 ${filled ? "text-[#FFD700] fill-[#FFD700]" : "text-gray-300"}`} />
);

const RatingDisplay = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <RatingStar key={star} filled={star <= rating} />
      ))}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

const ProCRMPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("guests");
  const [searchValue, setSearchValue] = useState("");
  const [selectedGuest, setSelectedGuest] = useState<typeof guestProfiles[0] | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<typeof messageTemplates[0] | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<typeof automatedCampaigns[0] | null>(null);

  const handleGuestClick = (guest: typeof guestProfiles[0]) => {
    setSelectedGuest(guest);
  };

  const handleTemplateClick = (template: typeof messageTemplates[0]) => {
    setSelectedTemplate(template);
  };

  const handleCampaignClick = (campaign: typeof automatedCampaigns[0]) => {
    setSelectedCampaign(campaign);
  };

  const filteredGuests = guestProfiles.filter(guest => 
    guest.name.toLowerCase().includes(searchValue.toLowerCase()) || 
    guest.email.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <ProDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">CRM for Hosts</h1>
          <p className="mt-1 text-gray-600">
            Manage your guest relationships, loyalty programs, and automated communications.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="guests">Guest Profiles</TabsTrigger>
            <TabsTrigger value="templates">Message Templates</TabsTrigger>
            <TabsTrigger value="automations">Automations</TabsTrigger>
            <TabsTrigger value="loyalty">Loyalty Program</TabsTrigger>
            <TabsTrigger value="feedback">Feedback & Surveys</TabsTrigger>
          </TabsList>

          {/* Guest Profiles Tab */}
          <TabsContent value="guests" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search guests..."
                  className="pl-8"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Guest
              </Button>
            </div>

            <div className="flex gap-6">
              <div className="w-2/3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Guest Directory</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Last Trip</TableHead>
                          <TableHead>Trips</TableHead>
                          <TableHead>Loyalty</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredGuests.map((guest) => (
                          <TableRow 
                            key={guest.id} 
                            className={`cursor-pointer ${selectedGuest?.id === guest.id ? 'bg-gray-50' : ''}`}
                            onClick={() => handleGuestClick(guest)}
                          >
                            <TableCell className="font-medium">{guest.name}</TableCell>
                            <TableCell>{guest.lastTrip}</TableCell>
                            <TableCell>{guest.tripsCount}</TableCell>
                            <TableCell>
                              <Badge className="bg-[#9b87f5] hover:bg-[#7E69AB]">
                                {guest.loyaltyPoints} pts
                              </Badge>
                            </TableCell>
                            <TableCell><RatingDisplay rating={guest.rating} /></TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              
              <div className="w-1/3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>{selectedGuest ? 'Guest Details' : 'Select a Guest'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedGuest ? (
                      <div className="space-y-4">
                        <div className="flex flex-col space-y-1">
                          <span className="text-sm text-gray-500">Name</span>
                          <span>{selectedGuest.name}</span>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-sm text-gray-500">Contact</span>
                          <span>{selectedGuest.email}</span>
                          <span>{selectedGuest.phone}</span>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <span className="text-sm text-gray-500">Experience History</span>
                          <span>{selectedGuest.tripsCount} experiences</span>
                          <span>Last trip: {selectedGuest.lastTrip}</span>
                        </div>
                        
                        <div className="flex flex-col space-y-1">
                          <span className="text-sm text-gray-500">Loyalty & Referrals</span>
                          <div className="flex items-center gap-2">
                            <span>{selectedGuest.loyaltyPoints} points</span>
                            <Badge variant="outline">
                              {selectedGuest.loyaltyPoints < 200 
                                ? "Explorer" 
                                : selectedGuest.loyaltyPoints < 500 
                                  ? "Adventurer" 
                                  : selectedGuest.loyaltyPoints < 1000 
                                    ? "Voyager" 
                                    : "Cultural Ambassador"}
                            </Badge>
                          </div>
                          <span>{selectedGuest.referrals} referrals made</span>
                        </div>

                        {(selectedGuest.birthday || selectedGuest.anniversary) && (
                          <div className="flex flex-col space-y-1">
                            <span className="text-sm text-gray-500">Special Dates</span>
                            {selectedGuest.birthday && <span>Birthday: {selectedGuest.birthday}</span>}
                            {selectedGuest.anniversary && <span>Anniversary: {selectedGuest.anniversary}</span>}
                          </div>
                        )}
                        
                        {selectedGuest.upcomingEvent && (
                          <div className="flex flex-col space-y-1">
                            <span className="text-sm text-gray-500">Upcoming Event</span>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-[#9b87f5]" />
                              <span>{selectedGuest.upcomingEvent}</span>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex flex-col space-y-1">
                          <span className="text-sm text-gray-500">Notes</span>
                          <p className="text-sm">{selectedGuest.notes}</p>
                        </div>
                        
                        <div className="pt-2 flex justify-between">
                          <Button variant="outline" size="sm">
                            <Heart className="mr-2 h-4 w-4" /> Add to List
                          </Button>
                          <Button size="sm">
                            <Mail className="mr-2 h-4 w-4" /> Message Guest
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500">
                        <p>Select a guest to view their details</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Message Templates Tab */}
          <TabsContent value="templates" className="space-y-4">
            <div className="flex justify-end">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> New Template
              </Button>
            </div>

            <div className="flex gap-6">
              <div className="w-1/3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Saved Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {messageTemplates.map(template => (
                        <div
                          key={template.id}
                          className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 ${selectedTemplate?.id === template.id ? 'bg-gray-50 border-gray-400' : ''}`}
                          onClick={() => handleTemplateClick(template)}
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{template.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {template.lastEdited}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1 truncate">
                            {template.content.substring(0, 50)}...
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="w-2/3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>{selectedTemplate ? 'Edit Template' : 'Select a Template'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedTemplate ? (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="template-name" className="block text-sm font-medium text-gray-700 mb-1">
                            Template Name
                          </label>
                          <Input
                            id="template-name"
                            defaultValue={selectedTemplate.title}
                          />
                        </div>
                        <div>
                          <label htmlFor="template-content" className="block text-sm font-medium text-gray-700 mb-1">
                            Content
                          </label>
                          <textarea
                            id="template-content"
                            className="w-full h-40 p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-gray-200"
                            defaultValue={selectedTemplate.content}
                          />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Available variables: {'{guest_name}'}, {'{experience_name}'}, {'{date}'},
                            {'{meeting_point}'}, {'{weather_forecast}'}, {'{items_to_bring}'}, {'{review_link}'},
                            {'{experience_anniversary}'}
                          </p>
                        </div>
                        <div className="pt-2 flex justify-between">
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" /> Delete
                          </Button>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">Test Send</Button>
                            <Button size="sm">Save Changes</Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
                        <p>Select a template to edit or create a new one</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Automations Tab */}
          <TabsContent value="automations" className="space-y-4">
            <div className="flex justify-end">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> New Automation
              </Button>
            </div>
            
            <div className="flex gap-6">
              <div className="w-1/3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Active Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {automatedCampaigns.map(campaign => (
                        <div
                          key={campaign.id}
                          className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 ${selectedCampaign?.id === campaign.id ? 'bg-gray-50 border-gray-400' : ''}`}
                          onClick={() => handleCampaignClick(campaign)}
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{campaign.name}</h3>
                            <Badge 
                              className={campaign.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                            >
                              {campaign.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Trigger: {campaign.trigger}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="w-2/3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>{selectedCampaign ? 'Campaign Details' : 'Select a Campaign'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedCampaign ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Campaign Name
                            </label>
                            <Input defaultValue={selectedCampaign.name} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Status
                            </label>
                            <select className="w-full p-2 border rounded-md">
                              <option value="Active" selected={selectedCampaign.status === "Active"}>Active</option>
                              <option value="Paused" selected={selectedCampaign.status === "Paused"}>Paused</option>
                              <option value="Draft">Draft</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Trigger Event
                          </label>
                          <select className="w-full p-2 border rounded-md">
                            <option value="birthday" selected={selectedCampaign.trigger === "Guest's birthday"}>Guest's birthday</option>
                            <option value="anniversary" selected={selectedCampaign.trigger === "1 year after experience"}>Experience anniversary</option>
                            <option value="festival" selected={selectedCampaign.trigger === "3 months before relevant local festival"}>Before local festival</option>
                            <option value="inactivity">90 days of inactivity</option>
                            <option value="booking_completion">Immediately after booking</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Template
                          </label>
                          <select className="w-full p-2 border rounded-md">
                            {messageTemplates.map(template => (
                              <option 
                                key={template.id} 
                                value={template.id.toString()}
                                selected={selectedCampaign.template === template.title}
                              >
                                {template.title}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Last Run
                            </label>
                            <Input disabled value={selectedCampaign.lastRun} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Next Run
                            </label>
                            <Input disabled value={selectedCampaign.nextRun} />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Performance
                          </label>
                          <div className="p-3 bg-gray-50 rounded-md">
                            <p className="text-sm">Sent: <strong>{selectedCampaign.sentCount}</strong></p>
                            <p className="text-sm">Open rate: <strong>68%</strong></p>
                            <p className="text-sm">Click rate: <strong>42%</strong></p>
                            <p className="text-sm">Resulting bookings: <strong>17</strong></p>
                          </div>
                        </div>
                        
                        <div className="pt-2 flex justify-end space-x-2">
                          <Button variant="outline" size="sm">Test Run</Button>
                          <Button size="sm">Save Changes</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
                        <p>Select a campaign to view or edit its details</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Loyalty Program Tab */}
          <TabsContent value="loyalty" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium">Loyalty Program Settings</h2>
                <p className="text-sm text-gray-500">Configure your loyalty program tiers and rewards</p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> New Tier
              </Button>
            </div>
            
            {/* Loyalty Program Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Program Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold">716</p>
                        <p className="text-sm text-gray-500">Active Participants</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">48%</p>
                        <p className="text-sm text-gray-500">Repeat Booking Rate</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">135</p>
                        <p className="text-sm text-gray-500">Referral Bookings</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Point Earning Rate</span>
                        <span className="text-sm">100 points per $100 spent</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Referral Bonus</span>
                        <span className="text-sm">250 points per successful referral</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Point Expiration</span>
                        <span className="text-sm">24 months from earning date</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">Edit Program Settings</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Referral Program</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold">285</p>
                        <p className="text-sm text-gray-500">Total Referrals Sent</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">135</p>
                        <p className="text-sm text-gray-500">Successful Conversions</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">47%</p>
                        <p className="text-sm text-gray-500">Conversion Rate</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Referrer Reward</span>
                        <span className="text-sm">250 points</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Referee Reward</span>
                        <span className="text-sm">10% off first booking</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Sharing Options</span>
                        <span className="text-sm">Email, WhatsApp, Link</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">Edit Referral Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Loyalty Tiers */}
            <Card>
              <CardHeader>
                <CardTitle>Loyalty Tiers</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tier Name</TableHead>
                      <TableHead>Requirements</TableHead>
                      <TableHead>Benefits</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loyaltyTiers.map((tier) => (
                      <TableRow key={tier.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full bg-[#${tier.id === 1 ? '9b87f5' : tier.id === 2 ? '7E69AB' : tier.id === 3 ? '6E59A5' : '1A1F2C'}]`}></div>
                            {tier.name}
                          </div>
                        </TableCell>
                        <TableCell>{tier.requirements}</TableCell>
                        <TableCell>
                          <ul className="list-disc pl-4 text-sm">
                            {tier.benefits.map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                          </ul>
                        </TableCell>
                        <TableCell>{tier.members}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback & Surveys Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Satisfaction Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {surveyMetrics.map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{metric.category}</span>
                          <span className="text-sm font-medium">{metric.score}/5</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#9b87f5]"
                            style={{ width: `${(metric.score / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="relative h-32 w-32">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold">87%</span>
                      </div>
                      <svg className="h-32 w-32 transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#f3f4f6"
                          strokeWidth="16"
                          fill="transparent"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#9b87f5"
                          strokeWidth="16"
                          strokeDasharray="351.86"
                          strokeDashoffset="45.74"
                          fill="transparent"
                        />
                      </svg>
                    </div>
                    <p className="mt-4 text-gray-500 text-center">
                      87% of your guests have completed post-experience surveys
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Memory Prompts */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Memory Prompts</CardTitle>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Add Prompt
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {memoryPrompts.map((prompt) => (
                    <div key={prompt.id} className="border rounded-lg p-4 space-y-2">
                      <h3 className="font-medium">{prompt.title}</h3>
                      <p className="text-sm text-gray-500">{prompt.prompt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Response Rate: {prompt.responseRate}</span>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Testimonials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{testimonial.guest}</p>
                          <p className="text-sm text-gray-500">{testimonial.experience}</p>
                        </div>
                        <RatingDisplay rating={testimonial.rating} />
                      </div>
                      <p className="mt-2 text-gray-700">"{testimonial.comment}"</p>
                      <div className="mt-2 flex justify-end">
                        <Button variant="outline" size="sm">
                          <Users className="mr-2 h-4 w-4" /> Share as Testimonial
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProDashboardLayout>
  );
};

export default ProCRMPage;
