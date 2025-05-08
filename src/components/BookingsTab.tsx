
import { useState } from "react";
import { Calendar, Filter, User, Download, Search, MapPin, Clock, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import Image from "@/components/ui/image";

// Mock data for bookings
const mockBookings = [
  {
    id: "bk-1",
    travelerName: "James Wilson",
    travelerAvatar: null,
    experience: "Desert Stargazing Experience",
    experienceImage: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
    date: "May 8, 2025",
    time: "8:30 PM",
    guests: 2,
    status: "confirmed",
    paid: "$170.00",
    location: "Marrakech, Morocco"
  },
  {
    id: "bk-2",
    travelerName: "Emma Rodriguez",
    travelerAvatar: null,
    experience: "Traditional Pottery Workshop",
    experienceImage: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
    date: "May 9, 2025",
    time: "10:00 AM",
    guests: 3,
    status: "confirmed",
    paid: "$135.00",
    location: "Oaxaca, Mexico"
  },
  {
    id: "bk-3",
    travelerName: "Liam Johnson",
    travelerAvatar: null,
    experience: "Traditional Pottery Workshop",
    experienceImage: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
    date: "May 9, 2025",
    time: "10:00 AM",
    guests: 4,
    status: "confirmed",
    paid: "$180.00",
    location: "Oaxaca, Mexico"
  },
  {
    id: "bk-4",
    travelerName: "Sophia Chen",
    travelerAvatar: null,
    experience: "Farm to Table Cooking Class",
    experienceImage: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
    date: "May 11, 2025",
    time: "4:00 PM",
    guests: 2,
    status: "pending",
    paid: "$130.00",
    location: "Bali, Indonesia"
  },
  {
    id: "bk-5",
    travelerName: "Noah Williams",
    travelerAvatar: null,
    experience: "Desert Stargazing Experience",
    experienceImage: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
    date: "May 12, 2025",
    time: "8:30 PM",
    guests: 1,
    status: "canceled",
    paid: "$85.00",
    location: "Marrakech, Morocco"
  }
];

// Summary stats
const bookingSummary = {
  total: mockBookings.length,
  confirmed: mockBookings.filter(b => b.status === "confirmed").length,
  pending: mockBookings.filter(b => b.status === "pending").length,
  canceled: mockBookings.filter(b => b.status === "canceled").length,
  revenue: mockBookings
    .filter(b => b.status !== "canceled")
    .reduce((total, booking) => total + parseFloat(booking.paid.replace('$', '')), 0)
};

const BookingsTab = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState(mockBookings);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  
  // Filter bookings based on status, date and search query
  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    const matchesSearch = 
      booking.travelerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      booking.experience.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Simple date filter (in a real app, this would be more sophisticated)
    let matchesDate = true;
    if (dateFilter === "today") {
      matchesDate = booking.date === "May 8, 2025";
    } else if (dateFilter === "thisWeek") {
      matchesDate = ["May 8, 2025", "May 9, 2025", "May 11, 2025", "May 12, 2025"].includes(booking.date);
    }
    
    return matchesStatus && matchesSearch && matchesDate;
  });
  
  const handleStatusChange = (value: string) => {
    setFilterStatus(value);
  };
  
  const handleDateFilterChange = (value: string) => {
    setDateFilter(value);
  };
  
  const handleContactTraveler = (bookingId: string) => {
    toast({
      title: "Message Sent",
      description: "Opening conversation with traveler..."
    });
  };
  
  const handleSendReminder = (bookingId: string) => {
    toast({
      title: "Reminder Sent",
      description: "A reminder email has been sent to the traveler."
    });
  };
  
  const handleCancel = (bookingId: string) => {
    toast({
      title: "Booking Canceled",
      description: "The booking has been canceled and the traveler notified."
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Pending</Badge>;
      case "canceled":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Canceled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Bookings</p>
              <p className="text-2xl font-semibold">{bookingSummary.total}</p>
            </div>
            <div className="p-2 rounded-full bg-indigo-100 text-culturin-indigo">
              <Calendar className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Confirmed</p>
              <p className="text-2xl font-semibold">{bookingSummary.confirmed}</p>
            </div>
            <div className="p-2 rounded-full bg-green-100 text-green-700">
              <User className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-semibold">{bookingSummary.pending}</p>
            </div>
            <div className="p-2 rounded-full bg-amber-100 text-amber-700">
              <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-semibold">${bookingSummary.revenue}</p>
            </div>
            <div className="p-2 rounded-full bg-culturin-mustard/20 text-culturin-mustard">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Button 
            variant={viewMode === "list" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-culturin-indigo text-white" : ""}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            List View
          </Button>
          <Button 
            variant={viewMode === "calendar" ? "default" : "outline"} 
            size="sm" 
            onClick={() => setViewMode("calendar")}
            className={viewMode === "calendar" ? "bg-culturin-indigo text-white" : ""}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Calendar View
          </Button>
        </div>
        
        <div className="flex flex-1 max-w-md ml-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={dateFilter} onValueChange={handleDateFilterChange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterStatus} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export bookings data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {viewMode === "list" ? (
        /* List View */
        <Card>
          <CardHeader className="pb-0">
            <CardTitle>All Bookings</CardTitle>
            <CardDescription>Manage your experience bookings</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {filteredBookings.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Traveler</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow 
                        key={booking.id} 
                        className={booking.status === "canceled" ? "opacity-60" : ""}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-culturin-indigo/20 flex items-center justify-center overflow-hidden">
                              {booking.travelerAvatar ? (
                                <img src={booking.travelerAvatar} alt={booking.travelerName} className="w-full h-full object-cover" />
                              ) : (
                                <User className="h-4 w-4 text-culturin-indigo" />
                              )}
                            </div>
                            <span className="font-medium">{booking.travelerName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <Image 
                                src={booking.experienceImage} 
                                alt={booking.experience} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <span className="text-sm font-medium line-clamp-1">{booking.experience}</span>
                              <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{booking.location}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{booking.date}</div>
                            <div className="text-muted-foreground text-xs">{booking.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center px-2 py-1 bg-gray-100 rounded-full w-fit">
                            <User className="h-3 w-3 text-gray-500 mr-1" />
                            <span className="text-sm">{booking.guests}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(booking.status)}
                        </TableCell>
                        <TableCell className="font-medium">
                          {booking.paid}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleContactTraveler(booking.id)}>
                                Contact Traveler
                              </DropdownMenuItem>
                              {booking.status !== "canceled" && (
                                <>
                                  <DropdownMenuItem onClick={() => handleSendReminder(booking.id)}>
                                    Send Reminder
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    onClick={() => handleCancel(booking.id)}
                                    className="text-red-600 focus:bg-red-50"
                                  >
                                    Cancel Booking
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium">No bookings found</h3>
                <p className="text-muted-foreground mt-1 max-w-md mx-auto">
                  {searchQuery || filterStatus !== "all" || dateFilter !== "all" 
                    ? "Try adjusting your filters to see more results" 
                    : "You don't have any bookings yet. Once travelers book your experiences, they'll appear here."}
                </p>
                {(searchQuery || filterStatus !== "all" || dateFilter !== "all") && (
                  <Button 
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery(""); 
                      setFilterStatus("all");
                      setDateFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        /* Calendar View */
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>View your bookings by date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-6 rounded-md text-center">
              <div className="flex justify-center mb-6">
                <Calendar className="h-16 w-16 text-culturin-indigo opacity-60" />
              </div>
              <h3 className="text-lg font-medium">Calendar View Coming Soon</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                We're building a beautiful calendar view for your bookings. For now, please use the list view to manage your reservations.
              </p>
              <Button onClick={() => setViewMode("list")} className="mt-4">
                Return to List View
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingsTab;
