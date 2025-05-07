
import { Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BookingSummary {
  upcoming: number;
  thisMonth: number;
  total: number;
  revenue: number;
}

const bookingSummary: BookingSummary = {
  upcoming: 12,
  thisMonth: 8,
  total: 47,
  revenue: 2850
};

const BookingOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-playfair font-semibold">Booking Overview</h2>
        <Button variant="outline" className="flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="py-4">
            <CardDescription>Upcoming Tours</CardDescription>
            <CardTitle className="text-2xl">{bookingSummary.upcoming}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardDescription>Tours This Month</CardDescription>
            <CardTitle className="text-2xl">{bookingSummary.thisMonth}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardDescription>Total Bookings</CardDescription>
            <CardTitle className="text-2xl">{bookingSummary.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl">${bookingSummary.revenue}</CardTitle>
          </CardHeader>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Upcoming Schedule</CardTitle>
              <CardDescription>Your next 7 days of experiences</CardDescription>
            </div>
            <Calendar className="h-5 w-5 text-gray-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Mock calendar entries */}
            <div className="flex border-l-4 border-culturin-terracotta pl-4 py-2">
              <div className="flex-1">
                <p className="font-semibold">Desert Stargazing Experience</p>
                <p className="text-sm text-gray-500">May 8, 2025 • 8:30 PM</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-culturin-terracotta">6 guests</p>
                <p className="text-xs text-gray-500">2 spots left</p>
              </div>
            </div>
            
            <div className="flex border-l-4 border-culturin-mustard pl-4 py-2">
              <div className="flex-1">
                <p className="font-semibold">Traditional Pottery Workshop</p>
                <p className="text-sm text-gray-500">May 9, 2025 • 10:00 AM</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-culturin-mustard">8 guests</p>
                <p className="text-xs text-gray-500">Fully booked</p>
              </div>
            </div>
            
            <div className="flex border-l-4 border-culturin-indigo pl-4 py-2">
              <div className="flex-1">
                <p className="font-semibold">Traditional Pottery Workshop</p>
                <p className="text-sm text-gray-500">May 11, 2025 • 10:00 AM</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-culturin-indigo">4 guests</p>
                <p className="text-xs text-gray-500">4 spots left</p>
              </div>
            </div>
            
            <div className="flex border-l-4 border-gray-300 pl-4 py-2 opacity-70">
              <div className="flex-1">
                <p className="font-semibold">Desert Stargazing Experience</p>
                <p className="text-sm text-gray-500">May 12, 2025 • 8:30 PM</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-500">0 guests</p>
                <p className="text-xs text-gray-500">8 spots left</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button variant="outline">View Full Calendar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingOverview;
