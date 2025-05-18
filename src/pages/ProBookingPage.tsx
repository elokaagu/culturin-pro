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
import { CalendarIcon, Users, CheckCircle, Clock, AlertCircle, Settings, Palette, CreditCard, UserPlus, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

interface Booking {
  id: number;
  experienceName: string;
  date: string;
  time: string;
  status: string;
  guests: number;
  guest: string;
}

interface Experience {
  id: number;
  name: string;
  capacity: number;
  autoReminder: boolean;
}

interface Upsell {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProBookingPage: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState("availability");
  const [checkoutTheme, setCheckoutTheme] = useState("standard");
  const [paymentOptions, setPaymentOptions] = useState({
    splitPayments: false,
    deposits: false,
    groupBooking: false,
    crypto: false
  });
  const { toast } = useToast();
  
  // Form states
  const [newTime, setNewTime] = useState("10:00");
  const [selectedExperience, setSelectedExperience] = useState<number>(1);
  const [bookings, setBookings] = useState<Booking[]>([
    { id: 1, experienceName: "Traditional Cooking Class", date: "2025-05-10", time: "10:00 AM", status: "Confirmed", guests: 4, guest: "Maria Johnson" },
    { id: 2, experienceName: "Wine Tasting Tour", date: "2025-05-10", time: "2:00 PM", status: "Confirmed", guests: 2, guest: "Robert Chen" },
    { id: 3, experienceName: "City Walking Tour", date: "2025-05-11", time: "9:00 AM", status: "Pending", guests: 6, guest: "Sarah Williams" },
    { id: 4, experienceName: "Traditional Cooking Class", date: "2025-05-12", time: "10:00 AM", status: "Waitlist", guests: 2, guest: "James Miller" },
    { id: 5, experienceName: "Wine Tasting Tour", date: "2025-05-13", time: "2:00 PM", status: "Confirmed", guests: 5, guest: "Emma Davis" },
  ]);
  
  // Mock data for experiences
  const experiences: Experience[] = [
    { id: 1, name: "Traditional Cooking Class", capacity: 8, autoReminder: true },
    { id: 2, name: "Wine Tasting Tour", capacity: 10, autoReminder: true },
    { id: 3, name: "City Walking Tour", capacity: 12, autoReminder: false },
    { id: 4, name: "Pottery Workshop", capacity: 6, autoReminder: true },
  ];

  // Mock data for upsells
  const upsells: Upsell[] = [
    { id: 1, name: "Tea Ceremony with Local Elder", price: 45, description: "Experience an authentic tea ceremony guided by a respected local elder.", image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png" },
    { id: 2, name: "Private Photography Session", price: 75, description: "Capture your memories with a professional photographer during your experience.", image: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png" },
    { id: 3, name: "Calligraphy Workshop Add-on", price: 35, description: "Learn the art of traditional calligraphy with handcrafted materials to take home.", image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png" }
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
  
  // Setup form for checkout settings
  const form = useForm({
    defaultValues: {
      enableMemoryPack: true,
      allowGuestCheckout: true,
    }
  });

  const handleAddTimeSlot = () => {
    const experience = experiences.find(exp => exp.id === selectedExperience);
    if (!experience) return;
    
    const formattedDate = format(selectedDay, "yyyy-MM-dd");
    const timeFormat = (hours: number, minutes: number) => {
      const period = hours >= 12 ? "PM" : "AM";
      const hour = hours % 12 || 12;
      return `${hour}:${minutes.toString().padStart(2, '0')} ${period}`;
    };
    
    // Parse time input
    const [hours, minutes] = newTime.split(':').map(Number);
    const formattedTime = timeFormat(hours, minutes);
    
    const newBooking: Booking = {
      id: Date.now(),
      experienceName: experience.name,
      date: formattedDate,
      time: formattedTime,
      status: "Available",
      guests: 0,
      guest: "Open Slot"
    };
    
    setBookings(prev => [...prev, newBooking]);
    
    toast({
      title: "Time Slot Added",
      description: `Added ${formattedTime} for ${experience.name} on ${format(selectedDay, "MMMM d, yyyy")}`,
    });
  };

  const handleViewBooking = (booking: Booking) => {
    toast({
      title: "Viewing Booking Details",
      description: `${booking.guest}'s booking for ${booking.experienceName}`,
    });
  };
  
  const handlePreviewCheckout = () => {
    toast({
      title: "Checkout Preview",
      description: "In a production environment, this would open a real checkout flow.",
    });
    
    // Simulate checkout and redirect
    window.open(`/product/booking`, '_blank');
  };
  
  return (
    <ProDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Smart Booking Tools</h1>
          <p className="mt-1 text-gray-600">
            Create emotional, narrative-driven booking experiences that convert better.
          </p>
        </div>
        
        <Tabs defaultValue="availability" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="checkout">Checkout Experience</TabsTrigger>
            <TabsTrigger value="upsells">Upsell Engine</TabsTrigger>
            <TabsTrigger value="payments">Payment Options</TabsTrigger>
            <TabsTrigger value="postcheckin">Post-Checkout</TabsTrigger>
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
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleViewBooking(booking)}
                              >
                                View
                              </Button>
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
                      value={selectedExperience}
                      onChange={(e) => setSelectedExperience(Number(e.target.value))}
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
                    <Input 
                      id="time" 
                      type="time" 
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  className="mt-4"
                  onClick={handleAddTimeSlot}
                >
                  Add Time Slot
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="checkout" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>White-Label Checkout Experience</CardTitle>
                <CardDescription>Customize how your checkout appears for customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Deployment Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={`border rounded-lg p-4 cursor-pointer ${checkoutTheme === "embedded" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
                           onClick={() => setCheckoutTheme("embedded")}>
                        <div className="flex items-center mb-2">
                          <div className={`w-4 h-4 rounded-full border ${checkoutTheme === "embedded" ? "border-4 border-blue-500" : "border-gray-300"}`}></div>
                          <h4 className="font-medium ml-2">Embedded on Your Website</h4>
                        </div>
                        <p className="text-sm text-gray-600">Add checkout directly to your own site with our JavaScript snippet</p>
                      </div>
                      
                      <div className={`border rounded-lg p-4 cursor-pointer ${checkoutTheme === "hosted" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
                           onClick={() => setCheckoutTheme("hosted")}>
                        <div className="flex items-center mb-2">
                          <div className={`w-4 h-4 rounded-full border ${checkoutTheme === "hosted" ? "border-4 border-blue-500" : "border-gray-300"}`}></div>
                          <h4 className="font-medium ml-2">Culturin-Hosted Microsite</h4>
                        </div>
                        <p className="text-sm text-gray-600">A dedicated booking page with your branding</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Experience Themes</h3>
                    <p className="text-sm text-gray-600 mb-4">Choose a checkout experience that matches your trip's emotional frame</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className={`border rounded-lg p-4 cursor-pointer ${checkoutTheme === "standard" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
                           onClick={() => setCheckoutTheme("standard")}>
                        <div className="flex items-center mb-2">
                          <div className={`w-4 h-4 rounded-full border ${checkoutTheme === "standard" ? "border-4 border-blue-500" : "border-gray-300"}`}></div>
                          <h4 className="font-medium ml-2">Standard</h4>
                        </div>
                        <p className="text-sm text-gray-600">Clean and professional checkout experience</p>
                      </div>
                      
                      <div className={`border rounded-lg p-4 cursor-pointer ${checkoutTheme === "heritage" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
                           onClick={() => setCheckoutTheme("heritage")}>
                        <div className="flex items-center mb-2">
                          <div className={`w-4 h-4 rounded-full border ${checkoutTheme === "heritage" ? "border-4 border-blue-500" : "border-gray-300"}`}></div>
                          <h4 className="font-medium ml-2">Heritage Journey</h4>
                        </div>
                        <p className="text-sm text-gray-600">Emphasizes cultural connection and roots</p>
                      </div>
                      
                      <div className={`border rounded-lg p-4 cursor-pointer ${checkoutTheme === "romantic" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
                           onClick={() => setCheckoutTheme("romantic")}>
                        <div className="flex items-center mb-2">
                          <div className={`w-4 h-4 rounded-full border ${checkoutTheme === "romantic" ? "border-4 border-blue-500" : "border-gray-300"}`}></div>
                          <h4 className="font-medium ml-2">Romantic</h4>
                        </div>
                        <p className="text-sm text-gray-600">Perfect for honeymoons and couples retreats</p>
                      </div>
                      
                      <div className={`border rounded-lg p-4 cursor-pointer ${checkoutTheme === "adventure" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
                           onClick={() => setCheckoutTheme("adventure")}>
                        <div className="flex items-center mb-2">
                          <div className={`w-4 h-4 rounded-full border ${checkoutTheme === "adventure" ? "border-4 border-blue-500" : "border-gray-300"}`}></div>
                          <h4 className="font-medium ml-2">Adventure</h4>
                        </div>
                        <p className="text-sm text-gray-600">Exciting, action-oriented checkout flow</p>
                      </div>
                      
                      <div className={`border rounded-lg p-4 cursor-pointer ${checkoutTheme === "spiritual" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
                           onClick={() => setCheckoutTheme("spiritual")}>
                        <div className="flex items-center mb-2">
                          <div className={`w-4 h-4 rounded-full border ${checkoutTheme === "spiritual" ? "border-4 border-blue-500" : "border-gray-300"}`}></div>
                          <h4 className="font-medium ml-2">Spiritual</h4>
                        </div>
                        <p className="text-sm text-gray-600">Mindful and transformational journey focused</p>
                      </div>
                      
                      <div className={`border rounded-lg p-4 cursor-pointer ${checkoutTheme === "solo" ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
                           onClick={() => setCheckoutTheme("solo")}>
                        <div className="flex items-center mb-2">
                          <div className={`w-4 h-4 rounded-full border ${checkoutTheme === "solo" ? "border-4 border-blue-500" : "border-gray-300"}`}></div>
                          <h4 className="font-medium ml-2">Solo Traveler</h4>
                        </div>
                        <p className="text-sm text-gray-600">Designed for independent explorers</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Preview Checkout</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-3 border-b flex items-center justify-between">
                        <span className="font-medium">Checkout Preview: {checkoutTheme.charAt(0).toUpperCase() + checkoutTheme.slice(1)} Theme</span>
                        <Button variant="outline" size="sm">
                          <Palette className="h-4 w-4 mr-1" /> Customize Colors
                        </Button>
                      </div>
                      <div className="p-6 bg-white">
                        <div className="max-w-md mx-auto space-y-6">
                          {/* Sample checkout preview */}
                          <div className="space-y-4">
                            <h3 className="text-xl font-bold text-center">Complete Your Booking</h3>
                            <p className="text-center text-gray-600">
                              {checkoutTheme === "heritage" && "Embark on a journey to connect with your roots"}
                              {checkoutTheme === "romantic" && "Begin your perfect romantic getaway"}
                              {checkoutTheme === "adventure" && "Your adventure awaits!"}
                              {checkoutTheme === "spiritual" && "Start your transformational journey"}
                              {checkoutTheme === "solo" && "Your solo adventure begins here"}
                              {checkoutTheme === "standard" && "Secure your experience now"}
                            </p>
                            
                            <div className="border rounded-lg p-4">
                              <div className="flex items-start">
                                <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                                  <img src="/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png" alt="Experience" className="w-full h-full object-cover" />
                                </div>
                                <div className="ml-4 flex-1">
                                  <h4 className="font-medium">Traditional Cooking Class</h4>
                                  <div className="text-sm text-gray-500 mt-1">May 15, 2025 • 10:00 AM</div>
                                  <div className="flex items-center mt-2 text-sm">
                                    <Users className="h-3 w-3 mr-1" /> 2 Guests
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">$120.00</div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="name">Full Name</Label>
                              <Input id="name" placeholder="Enter your full name" />
                            </div>
                            
                            <div>
                              <Label htmlFor="email">Email Address</Label>
                              <Input id="email" type="email" placeholder="Enter your email" />
                            </div>
                            
                            <div className="pt-4 border-t">
                              <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>$120.00</span>
                              </div>
                              <div className="flex justify-between font-medium">
                                <span>Total</span>
                                <span>$120.00</span>
                              </div>
                            </div>
                            
                            <Button className="w-full" onClick={handlePreviewCheckout}>
                              <CreditCard className="h-4 w-4 mr-2" /> Complete Booking
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upsells" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upsell Engine</CardTitle>
                <CardDescription>Offer journey-aligned add-ons to enhance your customers' experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Available Upsells</h3>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add New Upsell
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {upsells.map((upsell) => (
                      <div key={upsell.id} className="border rounded-lg overflow-hidden">
                        <div className="h-40 bg-gray-100 relative">
                          <img src={upsell.image} alt={upsell.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{upsell.name}</h4>
                            <div className="text-green-600 font-medium">${upsell.price}</div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{upsell.description}</p>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="flex items-center">
                              <Switch id={`active-${upsell.id}`} defaultChecked />
                              <Label htmlFor={`active-${upsell.id}`} className="ml-2 text-sm">Active</Label>
                            </div>
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border rounded-lg border-dashed p-4 text-center">
                    <div className="py-6">
                      <Plus className="h-10 w-10 mx-auto text-gray-400" />
                      <p className="mt-2 text-gray-500">Drag new upsells here</p>
                      <p className="text-xs text-gray-400 mt-1">or click the Add New Upsell button</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Upsell Presentation</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className={`w-4 h-4 rounded-full border border-4 border-blue-500`}></div>
                          <h4 className="font-medium ml-2">During Checkout</h4>
                        </div>
                        <p className="text-sm text-gray-600">Show upsell options during the checkout process</p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className={`w-4 h-4 rounded-full border border-gray-300`}></div>
                          <h4 className="font-medium ml-2">Post-Purchase Email</h4>
                        </div>
                        <p className="text-sm text-gray-600">Send upsell options in confirmation email</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Options</CardTitle>
                <CardDescription>Configure flexible payment solutions for your customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Split Payments</h3>
                          <p className="text-sm text-gray-600 mt-1">Allow customers to pay in installments</p>
                        </div>
                        <Switch 
                          checked={paymentOptions.splitPayments}
                          onCheckedChange={(checked) => setPaymentOptions({...paymentOptions, splitPayments: checked})}
                        />
                      </div>
                      {paymentOptions.splitPayments && (
                        <div className="mt-4 border-t pt-4">
                          <div className="space-y-2">
                            <div>
                              <Label>Number of installments</Label>
                              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <option>2 payments</option>
                                <option>3 payments</option>
                                <option>4 payments</option>
                              </select>
                            </div>
                            <div>
                              <Label>First payment due</Label>
                              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <option>At booking</option>
                                <option>30 days before trip</option>
                                <option>60 days before trip</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Deposit-Based Bookings</h3>
                          <p className="text-sm text-gray-600 mt-1">Secure bookings with an initial deposit</p>
                        </div>
                        <Switch 
                          checked={paymentOptions.deposits}
                          onCheckedChange={(checked) => setPaymentOptions({...paymentOptions, deposits: checked})}
                        />
                      </div>
                      {paymentOptions.deposits && (
                        <div className="mt-4 border-t pt-4">
                          <div className="space-y-2">
                            <div>
                              <Label>Deposit amount</Label>
                              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <option>25% of total</option>
                                <option>50% of total</option>
                                <option>Fixed amount ($50)</option>
                              </select>
                            </div>
                            <div>
                              <Label>Final payment due</Label>
                              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <option>14 days before trip</option>
                                <option>30 days before trip</option>
                                <option>At arrival</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Group Booking Tools</h3>
                          <p className="text-sm text-gray-600 mt-1">Coordinate payments from multiple participants</p>
                        </div>
                        <Switch 
                          checked={paymentOptions.groupBooking}
                          onCheckedChange={(checked) => setPaymentOptions({...paymentOptions, groupBooking: checked})}
                        />
                      </div>
                      {paymentOptions.groupBooking && (
                        <div className="mt-4 border-t pt-4">
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-sm">Group organizer discount</Label>
                            <Switch defaultChecked id="group-discount" />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-sm">Allow individual payments</Label>
                            <Switch defaultChecked id="individual-payments" />
                          </div>
                          <Button variant="outline" size="sm" className="mt-3 w-full">
                            <UserPlus className="h-4 w-4 mr-1" /> Group Payment Settings
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Cryptocurrency Payments</h3>
                          <p className="text-sm text-gray-600 mt-1">Accept stablecoins for international travelers</p>
                        </div>
                        <Switch 
                          checked={paymentOptions.crypto}
                          onCheckedChange={(checked) => setPaymentOptions({...paymentOptions, crypto: checked})}
                        />
                      </div>
                      {paymentOptions.crypto && (
                        <div className="mt-4 border-t pt-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm">Accept USDC</Label>
                              <Switch defaultChecked id="accept-usdc" />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label className="text-sm">Accept USDT</Label>
                              <Switch id="accept-usdt" />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label className="text-sm">Auto-convert to fiat</Label>
                              <Switch defaultChecked id="auto-convert" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="postcheckin" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post-Checkout Journey</CardTitle>
                <CardDescription>Create memorable post-booking experiences for your customers</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">AI-Generated Memory Pack</h3>
                          <p className="text-sm text-gray-600 mt-1">Create a personalized, printable journey summary</p>
                        </div>
                        <FormField
                          control={form.control}
                          name="enableMemoryPack"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Switch 
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="mt-4 border-t pt-4">
                        <div className="space-y-4">
                          <h4 className="text-sm font-medium">Memory Pack Contents</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="flex items-start">
                              <Switch id="include-itinerary" defaultChecked />
                              <div className="ml-2">
                                <Label htmlFor="include-itinerary" className="text-sm">Detailed Itinerary</Label>
                                <p className="text-xs text-gray-500">Day-by-day plan with times</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <Switch id="include-cultural" defaultChecked />
                              <div className="ml-2">
                                <Label htmlFor="include-cultural" className="text-sm">Cultural Context</Label>
                                <p className="text-xs text-gray-500">History and background info</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <Switch id="include-phrases" defaultChecked />
                              <div className="ml-2">
                                <Label htmlFor="include-phrases" className="text-sm">Local Phrases</Label>
                                <p className="text-xs text-gray-500">Useful words and expressions</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <Switch id="include-packing" defaultChecked />
                              <div className="ml-2">
                                <Label htmlFor="include-packing" className="text-sm">Packing List</Label>
                                <p className="text-xs text-gray-500">Customized for your experience</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-sm mb-1 block">Memory Pack Delivery</Label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                              <option>Immediately after booking</option>
                              <option>1 week before experience</option>
                              <option>After experience completion</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-5">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">Post-Booking Communications</h3>
                          <p className="text-sm text-gray-600 mt-1">Set up automatic follow-up messages</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <CheckCircle className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium">Booking Confirmation</h4>
                              <p className="text-xs text-gray-500">Sent immediately</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                              <Clock className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium">Pre-Experience Reminder</h4>
                              <p className="text-xs text-gray-500">Sent 2 days before</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                              <Settings className="h-5 w-5 text-amber-600" />
                            </div>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium">Post-Experience Survey</h4>
                              <p className="text-xs text-gray-500">Sent 1 day after</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button>Save Settings</Button>
                  </div>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProDashboardLayout>
  );
};

export default ProBookingPage;
