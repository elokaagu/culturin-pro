'use client'
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Mail, Phone, Calendar, MapPin, Star, Users } from "lucide-react";
import GuestDetailsModal from "./GuestDetailsModal";

// Mock guest data
const mockGuests = [
  {
    id: "1",
    name: "Emma Thompson",
    email: "emma.thompson@email.com",
    phone: "+44 20 7946 0958",
    totalBookings: 3,
    totalSpent: 285,
    lastBooking: "Traditional Pottery Workshop",
    joinDate: "2024-03-15",
    status: "active",
    rating: 4.8,
    location: "London, UK",
    avatar: "",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1 555 0123",
    totalBookings: 1,
    totalSpent: 120,
    lastBooking: "Food & Culinary Tour",
    joinDate: "2024-05-20",
    status: "active",
    rating: 5.0,
    location: "San Francisco, USA",
    avatar: "",
  },
  {
    id: "3",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+61 2 9876 5432",
    totalBookings: 2,
    totalSpent: 160,
    lastBooking: "Artisan Workshop Visit",
    joinDate: "2024-04-08",
    status: "active",
    rating: 4.5,
    location: "Sydney, Australia",
    avatar: "",
  },
  {
    id: "4",
    name: "David Rodriguez",
    email: "d.rodriguez@email.com",
    phone: "+34 91 123 4567",
    totalBookings: 4,
    totalSpent: 380,
    lastBooking: "Sunset Cultural Tour",
    joinDate: "2024-02-12",
    status: "vip",
    rating: 4.9,
    location: "Madrid, Spain",
    avatar: "",
  },
];

const GuestsTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const filteredGuests = mockGuests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || guest.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "vip": return "bg-purple-100 text-purple-800";
      case "active": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleViewDetails = (guest: any) => {
    setSelectedGuest(guest);
    setDetailsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-medium">Guest Management</h2>
          <p className="text-gray-600 mt-1">Manage your guest relationships and bookings</p>
        </div>
        <Button className="bg-black hover:bg-gray-800 text-white">
          Export Guest List
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">54</div>
            <p className="text-sm text-gray-500">Total Guests</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">12</div>
            <p className="text-sm text-gray-500">New This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">4.7</div>
            <p className="text-sm text-gray-500">Avg. Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">68%</div>
            <p className="text-sm text-gray-500">Return Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search guests by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Guests</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="bookings">Most Bookings</SelectItem>
                <SelectItem value="spent">Highest Spent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Guest List */}
      <div className="space-y-4">
        {filteredGuests.map((guest) => (
          <Card key={guest.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={guest.avatar} alt={guest.name} />
                    <AvatarFallback>{getInitials(guest.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{guest.name}</h3>
                      <Badge className={getStatusColor(guest.status)}>
                        {guest.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {guest.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {guest.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {guest.location}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 text-center">
                  <div>
                    <div className="font-medium">{guest.totalBookings}</div>
                    <div className="text-xs text-gray-500">Bookings</div>
                  </div>
                  <div>
                    <div className="font-medium">${guest.totalSpent}</div>
                    <div className="text-xs text-gray-500">Total Spent</div>
                  </div>
                  <div>
                    <div className="font-medium flex items-center justify-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      {guest.rating}
                    </div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                  <div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleViewDetails(guest)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gray-500">Last booking: </span>
                    <span className="font-medium">{guest.lastBooking}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Calendar className="h-3 w-3" />
                    Joined {new Date(guest.joinDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGuests.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="font-medium mb-2">No guests found</h3>
              <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Guest Details Modal */}
      <GuestDetailsModal 
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        guest={selectedGuest}
      />
    </div>
  );
};

export default GuestsTab;
