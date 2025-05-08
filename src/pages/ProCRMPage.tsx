
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Search, Plus, Star, Edit, Trash } from "lucide-react";
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
    notes: "Interested in cultural cooking experiences. Vegetarian."
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.c@example.com",
    phone: "+1 (555) 987-6543",
    tripsCount: 1,
    lastTrip: "Mar 22, 2025",
    rating: 5.0,
    notes: "Photography enthusiast. Speaks Mandarin and English."
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    email: "sophia.r@example.com",
    phone: "+1 (555) 234-5678",
    tripsCount: 2,
    lastTrip: "May 3, 2025",
    rating: 4.7,
    notes: "Loves historical sites. Traveling with family of 4."
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

  const handleGuestClick = (guest: typeof guestProfiles[0]) => {
    setSelectedGuest(guest);
  };

  const handleTemplateClick = (template: typeof messageTemplates[0]) => {
    setSelectedTemplate(template);
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
            Manage your guest relationships and communication templates.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="guests">Guest Profiles</TabsTrigger>
            <TabsTrigger value="templates">Message Templates</TabsTrigger>
            <TabsTrigger value="surveys">Survey Results</TabsTrigger>
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
                          <span className="text-sm text-gray-500">Notes</span>
                          <p className="text-sm">{selectedGuest.notes}</p>
                        </div>
                        <div className="pt-2 flex justify-between">
                          <Button variant="outline" size="sm">Add Note</Button>
                          <Button size="sm">Message Guest</Button>
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
                            {'{meeting_point}'}, {'{weather_forecast}'}, {'{items_to_bring}'}, {'{review_link}'}
                          </p>
                        </div>
                        <div className="pt-2 flex justify-between">
                          <Button variant="outline" size="sm">
                            <Trash className="mr-2 h-4 w-4" /> Delete
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

          {/* Survey Results Tab */}
          <TabsContent value="surveys" className="space-y-6">
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
                            className="h-full bg-[#222]"
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
                          stroke="#222"
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
