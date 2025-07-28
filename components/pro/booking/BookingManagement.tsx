import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Users,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Download,
  Eye,
  MessageSquare,
  Star,
} from "lucide-react";
import { toast } from "sonner";

interface Booking {
  id: string;
  tourId: string;
  tourTitle: string;
  date: string;
  time: string;
  guestCount: number;
  totalPrice: number;
  currency: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequests: string;
  };
  status: "confirmed" | "pending" | "cancelled" | "completed";
  createdAt: string;
  companyName: string;
}

const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchTerm, statusFilter]);

  const loadBookings = () => {
    try {
      const storedBookings = localStorage.getItem("culturin_bookings");
      if (storedBookings) {
        const parsedBookings = JSON.parse(storedBookings);
        setBookings(parsedBookings);
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
      toast.error("Failed to load bookings");
    }
  };

  const filterBookings = () => {
    let filtered = bookings;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.tourTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.customerInfo.firstName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          booking.customerInfo.lastName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          booking.customerInfo.email
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          booking.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  };

  const updateBookingStatus = (
    bookingId: string,
    newStatus: Booking["status"]
  ) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem("culturin_bookings", JSON.stringify(updatedBookings));
    toast.success(`Booking status updated to ${newStatus}`);
  };

  const getStatusBadge = (status: Booking["status"]) => {
    const statusConfig = {
      confirmed: {
        color: "bg-culturin-indigo/10 text-culturin-indigo",
        icon: CheckCircle,
      },
      pending: {
        color: "bg-culturin-indigo/20 text-culturin-indigo",
        icon: AlertCircle,
      },
      cancelled: { color: "bg-red-100 text-red-800", icon: XCircle },
      completed: {
        color: "bg-culturin-indigo/15 text-culturin-indigo",
        icon: CheckCircle,
      },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })} at ${timeStr}`;
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols: { [key: string]: string } = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      CAD: "C$",
      AUD: "A$",
      MXN: "$",
      BRL: "R$",
    };
    return symbols[currency] || "$";
  };

  const exportBookings = () => {
    const csvContent = [
      [
        "Booking ID",
        "Tour",
        "Date",
        "Time",
        "Guests",
        "Customer",
        "Email",
        "Phone",
        "Total",
        "Status",
        "Created",
      ],
      ...filteredBookings.map((booking) => [
        booking.id,
        booking.tourTitle,
        booking.date,
        booking.time,
        booking.guestCount.toString(),
        `${booking.customerInfo.firstName} ${booking.customerInfo.lastName}`,
        booking.customerInfo.email,
        booking.customerInfo.phone,
        `${getCurrencySymbol(booking.currency)}${booking.totalPrice.toFixed(
          2
        )}`,
        booking.status,
        formatDate(booking.createdAt),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Bookings exported successfully");
  };

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    pending: bookings.filter((b) => b.status === "pending").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    revenue: bookings.reduce((sum, b) => sum + b.totalPrice, 0),
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Calendar className="h-8 w-8 text-culturin-indigo" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-culturin-indigo">
                  {stats.confirmed}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-culturin-indigo" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-culturin-indigo/80">
                  {stats.pending}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-culturin-indigo/80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-culturin-indigo">
                  {stats.completed}
                </p>
              </div>
              <Star className="h-8 w-8 text-culturin-indigo" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-culturin-indigo">
                  ${stats.revenue.toFixed(2)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-culturin-indigo" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Booking Management</CardTitle>
              <p className="text-sm text-gray-600">
                Manage and track all customer bookings
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={exportBookings}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button
                onClick={loadBookings}
                className="bg-culturin-indigo hover:bg-culturin-indigo/90"
              >
                <Clock className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bookings Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Tour</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-8 text-gray-500"
                    >
                      No bookings found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-mono text-sm">
                        {booking.id}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.tourTitle}</p>
                          <p className="text-sm text-gray-500">
                            {booking.companyName}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {formatDate(booking.date)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.time}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {booking.customerInfo.firstName}{" "}
                            {booking.customerInfo.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.customerInfo.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{booking.guestCount}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">
                          {getCurrencySymbol(booking.currency)}
                          {booking.totalPrice.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setIsDetailOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              window.open(
                                `mailto:${booking.customerInfo.email}`
                              )
                            }
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Booking Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="customer">Customer</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Booking ID
                      </p>
                      <p className="font-mono">{selectedBooking.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Status
                      </p>
                      <div className="mt-1">
                        {getStatusBadge(selectedBooking.status)}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Tour</p>
                      <p className="font-medium">{selectedBooking.tourTitle}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Date & Time
                      </p>
                      <p>
                        {formatDateTime(
                          selectedBooking.date,
                          selectedBooking.time
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Guests
                      </p>
                      <p>{selectedBooking.guestCount} people</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total</p>
                      <p className="font-medium">
                        {getCurrencySymbol(selectedBooking.currency)}
                        {selectedBooking.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="customer" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Name</p>
                      <p className="font-medium">
                        {selectedBooking.customerInfo.firstName}{" "}
                        {selectedBooking.customerInfo.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p>{selectedBooking.customerInfo.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p>
                        {selectedBooking.customerInfo.phone || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Created
                      </p>
                      <p>{formatDate(selectedBooking.createdAt)}</p>
                    </div>
                  </div>
                  {selectedBooking.customerInfo.specialRequests && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Special Requests
                      </p>
                      <p className="text-sm bg-gray-50 p-3 rounded-lg">
                        {selectedBooking.customerInfo.specialRequests}
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="actions" className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500 mb-2">
                        Update Status
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {(
                          [
                            "confirmed",
                            "pending",
                            "cancelled",
                            "completed",
                          ] as const
                        ).map((status) => (
                          <Button
                            key={status}
                            variant={
                              selectedBooking.status === status
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() =>
                              updateBookingStatus(selectedBooking.id, status)
                            }
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() =>
                          window.open(
                            `mailto:${selectedBooking.customerInfo.email}`
                          )
                        }
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                      {selectedBooking.customerInfo.phone && (
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() =>
                            window.open(
                              `tel:${selectedBooking.customerInfo.phone}`
                            )
                          }
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call Customer
                        </Button>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingManagement;
