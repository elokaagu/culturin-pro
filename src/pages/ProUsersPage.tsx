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

// Mock data for platform users
const mockUsers: User[] = [
  {
    id: "1",
    name: "Maya Chen",
    email: "maya@bangkokfoodtours.com",
    avatar: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?q=80&w=1000&auto=format&fit=crop",
    role: "operator",
    status: "active",
    location: "Bangkok, Thailand",
    joinDate: "2023-01-15",
    lastActive: "2024-01-20",
    experiencesCreated: 12,
    phone: "+66 2 123 4567",
  },
  {
    id: "2",
    name: "Carlos Rodriguez",
    email: "carlos@mexicocitywalks.com",
    avatar: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=1000&auto=format&fit=crop",
    role: "operator",
    status: "active",
    location: "Mexico City, Mexico",
    joinDate: "2023-03-22",
    lastActive: "2024-01-19",
    experiencesCreated: 8,
    phone: "+52 55 1234 5678",
  },
  {
    id: "3",
    name: "Ayo Adebayo",
    email: "ayo@nigeriarootstours.com",
    avatar: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=1000&auto=format&fit=crop",
    role: "operator",
    status: "active",
    location: "Lagos, Nigeria",
    joinDate: "2023-02-10",
    lastActive: "2024-01-18",
    experiencesCreated: 15,
    phone: "+234 1 234 5678",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    role: "traveler",
    status: "active",
    location: "New York, USA",
    joinDate: "2023-06-12",
    lastActive: "2024-01-20",
    bookingsMade: 5,
    totalSpent: 1250,
    phone: "+1 555 123 4567",
  },
  {
    id: "5",
    name: "Emma Wilson",
    email: "emma@londonheritage.com",
    role: "operator",
    status: "pending",
    location: "London, UK",
    joinDate: "2024-01-15",
    lastActive: "2024-01-20",
    experiencesCreated: 3,
    phone: "+44 20 1234 5678",
  },
  {
    id: "6",
    name: "Hiroshi Tanaka",
    email: "hiroshi@kyototours.jp",
    role: "operator",
    status: "active",
    location: "Kyoto, Japan",
    joinDate: "2023-04-18",
    lastActive: "2024-01-17",
    experiencesCreated: 10,
    phone: "+81 75 123 4567",
  },
  {
    id: "7",
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    role: "traveler",
    status: "active",
    location: "Toronto, Canada",
    joinDate: "2023-08-05",
    lastActive: "2024-01-19",
    bookingsMade: 8,
    totalSpent: 2100,
    phone: "+1 416 123 4567",
  },
  {
    id: "8",
    name: "Ahmed Hassan",
    email: "ahmed@cairotours.com",
    role: "operator",
    status: "inactive",
    location: "Cairo, Egypt",
    joinDate: "2023-05-30",
    lastActive: "2023-12-15",
    experiencesCreated: 6,
    phone: "+20 2 1234 5678",
  },
];

const ProUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

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
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "operator":
        return "bg-blue-100 text-blue-800";
      case "traveler":
        return "bg-purple-100 text-purple-800";
      case "admin":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "active").length;
  const operators = users.filter((user) => user.role === "operator").length;
  const travelers = users.filter((user) => user.role === "traveler").length;

  return (
    <ProDashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-medium">Platform Users</h1>
            <p className="mt-1 text-gray-600 text-sm">
              Manage and view all users on the Culturin platform
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold">{totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold">{activeUsers}</p>
                </div>
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Operators</p>
                  <p className="text-2xl font-bold">{operators}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Travelers</p>
                  <p className="text-2xl font-bold">{travelers}</p>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and User Directory */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Directory</CardTitle>
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
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
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
                            <p className="text-sm text-gray-500">{user.email}</p>
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
                <p className="text-gray-500">No users found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProDashboardLayout>
  );
};

export default ProUsersPage;
