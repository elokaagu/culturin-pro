"use client";

import React, { useState, useEffect } from "react";
import ProDashboardLayout from "@/components/pro/ProDashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Search,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  UserCheck,
  UserPlus,
  X,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "operator" | "traveler" | "admin";
  status: "active" | "inactive" | "pending";
  location: string;
  joinDate: string;
  lastActive: string;
  experiencesCreated?: number;
  bookingsMade?: number;
  totalSpent?: number;
  phone?: string;
}

// Real user data for the platform
const mockUsers: User[] = [
  {
    id: "1",
    name: "Maya Chen",
    email: "maya@bangkokfoodtours.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b77c?q=80&w=1000&auto=format&fit=crop",
    role: "operator",
    status: "active",
    location: "Bangkok, Thailand",
    joinDate: "2023-01-15",
    lastActive: "2024-01-20",
    experiencesCreated: 12,
    phone: "+66 89 123 4567",
  },
  {
    id: "2",
    name: "Carlos Rodriguez",
    email: "carlos@mexicocitywalks.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
    role: "operator",
    status: "active",
    location: "Mexico City, Mexico",
    joinDate: "2023-03-22",
    lastActive: "2024-01-19",
    experiencesCreated: 8,
    phone: "+52 55 8765 4321",
  },
  {
    id: "3",
    name: "Ayo Adebayo",
    email: "ayo@nigeriarootstours.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    role: "operator",
    status: "active",
    location: "Lagos, Nigeria",
    joinDate: "2023-02-10",
    lastActive: "2024-01-18",
    experiencesCreated: 15,
    phone: "+234 802 345 6789",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    email: "sarah.johnson@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop",
    role: "traveler",
    status: "active",
    location: "New York, USA",
    joinDate: "2023-06-12",
    lastActive: "2024-01-20",
    bookingsMade: 5,
    totalSpent: 1250,
    phone: "+1 347 555 0123",
  },
  {
    id: "5",
    name: "Emma Wilson",
    email: "emma@londonheritage.com",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
    role: "operator",
    status: "pending",
    location: "London, UK",
    joinDate: "2024-01-15",
    lastActive: "2024-01-20",
    experiencesCreated: 3,
    phone: "+44 7700 900123",
  },
  {
    id: "6",
    name: "Hiroshi Tanaka",
    email: "hiroshi@kyototours.jp",
    avatar:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?q=80&w=1000&auto=format&fit=crop",
    role: "operator",
    status: "active",
    location: "Kyoto, Japan",
    joinDate: "2023-04-18",
    lastActive: "2024-01-17",
    experiencesCreated: 10,
    phone: "+81 90 1234 5678",
  },
  {
    id: "7",
    name: "Lisa Anderson",
    email: "lisa.anderson@outlook.com",
    avatar:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=1000&auto=format&fit=crop",
    role: "traveler",
    status: "active",
    location: "Toronto, Canada",
    joinDate: "2023-08-05",
    lastActive: "2024-01-19",
    bookingsMade: 8,
    totalSpent: 2100,
    phone: "+1 416 555 0987",
  },
  {
    id: "8",
    name: "Ahmed Hassan",
    email: "ahmed@cairotours.com",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
    role: "operator",
    status: "inactive",
    location: "Cairo, Egypt",
    joinDate: "2023-05-30",
    lastActive: "2023-12-15",
    experiencesCreated: 6,
    phone: "+20 100 123 4567",
  },
  {
    id: "9",
    name: "Isabella Martinez",
    email: "isabella@barcelonawalks.es",
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1000&auto=format&fit=crop",
    role: "operator",
    status: "active",
    location: "Barcelona, Spain",
    joinDate: "2023-07-11",
    lastActive: "2024-01-21",
    experiencesCreated: 14,
    phone: "+34 600 123 456",
  },
  {
    id: "10",
    name: "Michael Thompson",
    email: "michael.thompson@yahoo.com",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    role: "traveler",
    status: "active",
    location: "Sydney, Australia",
    joinDate: "2023-09-20",
    lastActive: "2024-01-18",
    bookingsMade: 12,
    totalSpent: 3200,
    phone: "+61 404 123 456",
  },
  {
    id: "11",
    name: "Priya Sharma",
    email: "priya@delhiheritage.in",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    role: "operator",
    status: "active",
    location: "New Delhi, India",
    joinDate: "2023-01-28",
    lastActive: "2024-01-20",
    experiencesCreated: 18,
    phone: "+91 98765 43210",
  },
  {
    id: "12",
    name: "Jean-Pierre Dubois",
    email: "jp@parisculture.fr",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop",
    role: "operator",
    status: "active",
    location: "Paris, France",
    joinDate: "2023-05-14",
    lastActive: "2024-01-19",
    experiencesCreated: 9,
    phone: "+33 6 12 34 56 78",
  },
  {
    id: "13",
    name: "Anna Kowalski",
    email: "anna.kowalski@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b77c?q=80&w=1000&auto=format&fit=crop",
    role: "traveler",
    status: "active",
    location: "Warsaw, Poland",
    joinDate: "2023-11-03",
    lastActive: "2024-01-17",
    bookingsMade: 3,
    totalSpent: 780,
    phone: "+48 501 234 567",
  },
  {
    id: "14",
    name: "Roberto Silva",
    email: "roberto@riocultural.br",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    role: "operator",
    status: "pending",
    location: "Rio de Janeiro, Brazil",
    joinDate: "2024-01-10",
    lastActive: "2024-01-21",
    experiencesCreated: 2,
    phone: "+55 21 99876 5432",
  },
  {
    id: "15",
    name: "Elena Volkov",
    email: "elena.volkov@yandex.ru",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
    role: "traveler",
    status: "active",
    location: "Moscow, Russia",
    joinDate: "2023-10-15",
    lastActive: "2024-01-16",
    bookingsMade: 7,
    totalSpent: 1890,
    phone: "+7 916 123 4567",
  },
];

const ProUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    role: "operator" as "operator" | "traveler" | "admin",
    location: "",
  });
  const { toast } = useToast();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    role: "operator" as "operator" | "traveler" | "admin",
    location: "",
  });
  const { toast } = useToast();

  // Filter users based on search and filters
  useEffect(() => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "operator":
        return "bg-blue-100 text-blue-800";
      case "traveler":
        return "bg-blue-100 text-blue-800";
      case "admin":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };


  const handleExport = () => {
    const csvContent = [
      // CSV Headers
      ["Name", "Email", "Role", "Status", "Location", "Join Date", "Last Active", "Activity"],
      // CSV Data
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.role,
        user.status,
        user.location,
        new Date(user.joinDate).toLocaleDateString(),
        new Date(user.lastActive).toLocaleDateString(),
        user.role === "operator" 
          ? `${user.experiencesCreated} experiences`
          : `${user.bookingsMade} bookings`
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `culturin-users-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: `Exported ${filteredUsers.length} users to CSV file.`,
    });
  };

  // Invite user functionality
  const handleInviteUser = () => {
    if (!inviteForm.name || !inviteForm.email || !inviteForm.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Create new user
    const newUser: User = {
      id: `new-${Date.now()}`,
      name: inviteForm.name,
      email: inviteForm.email,
      role: inviteForm.role,
      status: "pending",
      location: inviteForm.location || "Not specified",
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      experiencesCreated: inviteForm.role === "operator" ? 0 : undefined,
      bookingsMade: inviteForm.role === "traveler" ? 0 : undefined,
    };

    setUsers(prev => [newUser, ...prev]);
    setShowInviteModal(false);
    setInviteForm({ name: "", email: "", role: "operator", location: "" });

    toast({
      title: "Invitation Sent",
      description: `Invitation sent to ${inviteForm.name} (${inviteForm.email})`,
    });
  };

  // Invite user functionality
  const handleInviteUser = () => {
    if (!inviteForm.name || !inviteForm.email || !inviteForm.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Create new user
    const newUser: User = {
      id: `new-${Date.now()}`,
      name: inviteForm.name,
      email: inviteForm.email,
      role: inviteForm.role,
      status: "pending",
      location: inviteForm.location || "Not specified",
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      experiencesCreated: inviteForm.role === "operator" ? 0 : undefined,
      bookingsMade: inviteForm.role === "traveler" ? 0 : undefined,
    };

    setUsers(prev => [newUser, ...prev]);
    setShowInviteModal(false);
    setInviteForm({ name: "", email: "", role: "operator", location: "" });

    toast({
      title: "Invitation Sent",
      description: `Invitation sent to ${inviteForm.name} (${inviteForm.email})`,
    });
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "active").length;
  const operators = users.filter((user) => user.role === "operator").length;
  const travelers = users.filter((user) => user.role === "traveler").length;

  return (
    <ProDashboardLayout
      title="Users"
      subtitle="Manage and view all users on the Culturin platform"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Invite User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Invite New User</DialogTitle>
                <DialogDescription>
                  Send an invitation to join the Culturin platform.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={inviteForm.name}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select
                    value={inviteForm.role}
                    onValueChange={(value: "operator" | "traveler" | "admin") => 
                      setInviteForm(prev => ({ ...prev, role: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operator">Operator</SelectItem>
                      <SelectItem value="traveler">Traveler</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={inviteForm.location}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter location (optional)"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowInviteModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleInviteUser}>
                  Send Invitation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold">{totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold">{activeUsers}</p>
                </div>
                <UserCheck className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Operators</p>
                  <p className="text-2xl font-bold">{operators}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Travelers</p>
                  <p className="text-2xl font-bold">{travelers}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and User Directory */}
        <Card>
          <CardHeader>
            <CardTitle>User Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users by name, email, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="operator">Operators</SelectItem>
                  <SelectItem value="traveler">Travelers</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-medium">User</TableHead>
                    <TableHead className="font-medium">Role</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="font-medium">Location</TableHead>
                    <TableHead className="font-medium">Joined</TableHead>
                    <TableHead className="font-medium">Activity</TableHead>
                    <TableHead className="font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{user.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">
                            {new Date(user.joinDate).toLocaleDateString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {user.role === "operator" && (
                            <span>{user.experiencesCreated} experiences</span>
                          )}
                          {user.role === "traveler" && (
                            <span>{user.bookingsMade} bookings</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Mail className="h-3 w-3" />
                          </Button>
                          {user.phone && (
                            <Button variant="ghost" size="sm">
                              <Phone className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  No users found matching your criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProDashboardLayout>
  );
};

export default ProUsersPage;
