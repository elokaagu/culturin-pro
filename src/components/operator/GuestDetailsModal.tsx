
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, Calendar, Star, DollarSign, Users, Clock } from "lucide-react";

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  totalSpent: number;
  lastBooking: string;
  joinDate: string;
  status: string;
  rating: number;
  location: string;
  avatar: string;
}

interface GuestDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guest: Guest | null;
}

const GuestDetailsModal = ({ open, onOpenChange, guest }: GuestDetailsModalProps) => {
  if (!guest) return null;

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

  // Mock booking history
  const bookingHistory = [
    {
      id: "BK-001",
      experience: guest.lastBooking,
      date: "2024-05-15",
      amount: 95,
      status: "completed",
      rating: 5
    },
    {
      id: "BK-002",
      experience: "Cultural Heritage Walk",
      date: "2024-04-20",
      amount: 75,
      status: "completed",
      rating: 4
    },
    {
      id: "BK-003",
      experience: "Local Food Tour",
      date: "2024-03-10",
      amount: 115,
      status: "completed",
      rating: 5
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Guest Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Guest Header */}
          <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg">
            <Avatar className="h-16 w-16">
              <AvatarImage src={guest.avatar} alt={guest.name} />
              <AvatarFallback className="text-lg">{getInitials(guest.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-medium">{guest.name}</h2>
                <Badge className={getStatusColor(guest.status)}>
                  {guest.status.toUpperCase()}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  {guest.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  {guest.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {guest.location}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  Joined {new Date(guest.joinDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{guest.totalBookings}</div>
                <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                  <Users className="h-3 w-3" />
                  Total Bookings
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">${guest.totalSpent}</div>
                <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  Total Spent
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                  <Star className="h-5 w-5" />
                  {guest.rating}
                </div>
                <div className="text-sm text-gray-500">Average Rating</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{Math.round(guest.totalSpent / guest.totalBookings)}</div>
                <div className="text-sm text-gray-500">Avg. per Booking</div>
              </CardContent>
            </Card>
          </div>

          {/* Booking History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Booking History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookingHistory.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{booking.experience}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-4">
                        <span>#{booking.id}</span>
                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${booking.amount}</div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-3 w-3 text-yellow-500" />
                        {booking.rating}
                      </div>
                    </div>
                    <Badge className="ml-4 bg-green-100 text-green-800">
                      {booking.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="bg-black hover:bg-gray-800 text-white">
              <Mail className="h-4 w-4 mr-2" />
              Send Message
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              View Bookings
            </Button>
            <Button variant="outline">
              <Star className="h-4 w-4 mr-2" />
              Manage Reviews
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuestDetailsModal;
