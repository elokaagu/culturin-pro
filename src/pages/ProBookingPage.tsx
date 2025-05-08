
import React, { useState } from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Users, CheckCircle, Clock, AlertCircle } from "lucide-react";

const ProBookingPage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState("availability");
  
  // Mock data for bookings
  const bookings = [
    { id: 1, experienceName: "Traditional Cooking Class", date: "2025-05-10", time: "10:00 AM", status: "Confirmed", guests: 4, guest: "Maria Johnson" },
    { id: 2, experienceName: "Wine Tasting Tour", date: "2025-05-10", time: "2:00 PM", status: "Confirmed", guests: 2, guest: "Robert Chen" },
    { id: 3, experienceName: "City Walking Tour", date: "2025-05-11", time: "9:00 AM", status: "Pending", guests: 6, guest: "Sarah Williams" },
    { id: 4, experienceName: "Traditional Cooking Class", date: "2025-05-12", time: "10:00 AM", status: "Waitlist", guests: 2, guest: "James Miller" },
    { id: 5, experienceName: "Wine Tasting Tour", date: "2025-05-13", time: "2:00 PM", status: "Confirmed", guests: 5, guest: "Emma Davis" },
  ];
  
  // Mock data for experiences
  const experiences = [
    { id: 1, name: "Traditional Cooking Class", capacity: 8, autoReminder: true },
    { id: 2, name: "Wine Tasting Tour", capacity: 10, autoReminder: true },
    { id: 3, name: "City Walking Tour", capacity: 12, autoReminder: false },
    { id: 4, name: "Pottery Workshop", capacity: 6, autoReminder: true },
  ];
  
  // Filter bookings for today
  const todaysBookings = bookings.filter(booking => 
    new Date(booking.date).toDateString() === selectedDay.toDateString()
  );
  
  // Helper function for status badge
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Confirmed':
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'Waitlist':
        return <Badge variant="outline" className="text-orange-500 border-orange-500">Waitlist</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <ProDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Smart Booking Tools</h1>
          <p className="mt-1 text-gray-600">
            Manage your bookings, waitlists, and availability all in one place.
          </p>
        </div>
        
        <Tabs defaultValue="availability" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="availability">Availability Calendar</TabsTrigger>
            <TabsTrigger value="groupsize">Group Management</TabsTrigger>
            <TabsTrigger value="reminders">Auto-Reminders</TabsTrigger>
            <TabsTrigger value="reschedule">Reschedule/Refunds</TabsTrigger>
          </TabsList>
          
          <TabsContent value="availability" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>Select a date to view bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDay}
                    onSelect={(date) => date && setSelectedDay(date)}
                    className="pointer-events-auto"
                  />
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>
                    Bookings for {format(selectedDay, "MMMM d, yyyy")}
                  </CardTitle>
                  <CardDescription>
                    {todaysBookings.length} bookings scheduled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {todaysBookings.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Experience</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Guest</TableHead>
                          <TableHead>Group Size</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {todaysBookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell>{booking.experienceName}</TableCell>
                            <TableCell>{booking.time}</TableCell>
                            <TableCell>{booking.guest}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {booking.guests}
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(booking.status)}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">View</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No bookings for this date
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Add New Time Slot</CardTitle>
                <CardDescription>
                  Create additional availability for your experiences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="experience">Experience</Label>
                    <select 
                      id="experience"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {experiences.map(exp => (
                        <option key={exp.id} value={exp.id}>{exp.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                          {format(selectedDay, "PPP")}
                          <CalendarIcon className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single" 
                          selected={selectedDay}
                          onSelect={(date) => date && setSelectedDay(date)}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>
                <Button className="mt-4">Add Time Slot</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="groupsize" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Group Size Management</CardTitle>
                <CardDescription>Configure group sizes and waitlist settings for your experiences</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Experience Name</TableHead>
                      <TableHead>Max Capacity</TableHead>
                      <TableHead>Current Bookings</TableHead>
                      <TableHead>Waitlist Settings</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {experiences.map((exp) => (
                      <TableRow key={exp.id}>
                        <TableCell className="font-medium">{exp.name}</TableCell>
                        <TableCell>{exp.capacity}</TableCell>
                        <TableCell>3/{exp.capacity}</TableCell>
                        <TableCell>
                          <Badge variant="outline">Enabled (Max: 5)</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reminders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Auto-Reminder Settings</CardTitle>
                <CardDescription>Configure automatic reminders for your guests</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Experience Name</TableHead>
                      <TableHead>Auto-Reminder</TableHead>
                      <TableHead>Timing</TableHead>
                      <TableHead>Message Template</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {experiences.map((exp) => (
                      <TableRow key={exp.id}>
                        <TableCell className="font-medium">{exp.name}</TableCell>
                        <TableCell>
                          {exp.autoReminder ? 
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Enabled
                            </div> : 
                            <div className="flex items-center text-gray-500">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              Disabled
                            </div>
                          }
                        </TableCell>
                        <TableCell>{exp.autoReminder ? "24 hours before" : "-"}</TableCell>
                        <TableCell>{exp.autoReminder ? "Default" : "-"}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Configure</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reschedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reschedule & Refund Requests</CardTitle>
                <CardDescription>Manage customer requests for changes to their bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">James Miller</h3>
                        <p className="text-sm text-gray-500">Traditional Cooking Class - May 12, 2025</p>
                        <div className="mt-2 flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-1 text-amber-500" />
                          <span className="text-amber-500 font-medium">Reschedule Request</span>
                        </div>
                        <p className="mt-2 text-sm">
                          "I have a conflict with my schedule. Can I move my booking to May 15th?"
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Deny</Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Emma Davis</h3>
                        <p className="text-sm text-gray-500">Wine Tasting Tour - May 13, 2025</p>
                        <div className="mt-2 flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-1 text-red-500" />
                          <span className="text-red-500 font-medium">Refund Request</span>
                        </div>
                        <p className="mt-2 text-sm">
                          "Unfortunately, I need to cancel my booking due to a family emergency."
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Partial Refund</Button>
                        <Button size="sm">Full Refund</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center text-sm text-gray-500">
                    <p>Showing 2 pending requests • <a href="#" className="text-blue-500 hover:underline">View all</a></p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Refund Policy</CardTitle>
                <CardDescription>Configure your refund and cancellation policies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Cancellation window for full refund</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option>48 hours before event</option>
                        <option>24 hours before event</option>
                        <option>72 hours before event</option>
                        <option>1 week before event</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label>Partial refund amount</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option>50% of booking</option>
                        <option>25% of booking</option>
                        <option>75% of booking</option>
                        <option>No partial refund</option>
                      </select>
                    </div>
                  </div>
                  
                  <Button>Save Policy Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProDashboardLayout>
  );
};

export default ProBookingPage;
