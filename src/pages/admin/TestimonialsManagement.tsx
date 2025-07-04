"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Star, Eye, Search, Filter } from "lucide-react";
import Header from "@/components/Header";
import NewFooter from "@/components/sections/NewFooter";
import {
  testimonials,
  testimonialCategories,
  testimonialTypes,
  Testimonial,
} from "@/data/testimonialsData";

const TestimonialsManagement = () => {
  const [testimonialsData, setTestimonialsData] =
    useState<Testimonial[]>(testimonials);
  const [filteredTestimonials, setFilteredTestimonials] =
    useState<Testimonial[]>(testimonials);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    name: "",
    company: "",
    role: "",
    location: "",
    quote: "",
    image: "",
    category: "",
    featured: false,
    rating: 5,
    status: "active",
    type: "customer",
  });

  // Filter testimonials based on search and filters
  useEffect(() => {
    let filtered = testimonialsData;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (testimonial) =>
          testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          testimonial.company
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          testimonial.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
          testimonial.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (testimonial) => testimonial.status === filterStatus
      );
    }

    // Type filter
    if (filterType !== "all") {
      filtered = filtered.filter(
        (testimonial) => testimonial.type === filterType
      );
    }

    // Category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter(
        (testimonial) => testimonial.category === filterCategory
      );
    }

    setFilteredTestimonials(filtered);
  }, [testimonialsData, searchTerm, filterStatus, filterType, filterCategory]);

  const handleAddTestimonial = () => {
    if (
      !newTestimonial.name ||
      !newTestimonial.quote ||
      !newTestimonial.category
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const testimonial: Testimonial = {
      id: Date.now().toString(),
      name: newTestimonial.name!,
      company: newTestimonial.company || "",
      role: newTestimonial.role || "",
      location: newTestimonial.location || "",
      quote: newTestimonial.quote!,
      image: newTestimonial.image || "/placeholder-avatar.png",
      category: newTestimonial.category!,
      featured: newTestimonial.featured || false,
      rating: newTestimonial.rating || 5,
      dateAdded: new Date().toISOString().split("T")[0],
      status:
        (newTestimonial.status as "active" | "inactive" | "pending") ||
        "active",
      type:
        (newTestimonial.type as
          | "customer"
          | "operator"
          | "partner"
          | "general") || "customer",
    };

    setTestimonialsData([testimonial, ...testimonialsData]);
    setNewTestimonial({
      name: "",
      company: "",
      role: "",
      location: "",
      quote: "",
      image: "",
      category: "",
      featured: false,
      rating: 5,
      status: "active",
      type: "customer",
    });
    setIsAddDialogOpen(false);
    toast.success("Testimonial added successfully!");
  };

  const handleEditTestimonial = () => {
    if (!editingTestimonial) return;

    setTestimonialsData(
      testimonialsData.map((testimonial) =>
        testimonial.id === editingTestimonial.id
          ? editingTestimonial
          : testimonial
      )
    );
    setIsEditDialogOpen(false);
    setEditingTestimonial(null);
    toast.success("Testimonial updated successfully!");
  };

  const handleDeleteTestimonial = (id: string) => {
    setTestimonialsData(
      testimonialsData.filter((testimonial) => testimonial.id !== id)
    );
    toast.success("Testimonial deleted successfully!");
  };

  const handleToggleFeatured = (id: string) => {
    setTestimonialsData(
      testimonialsData.map((testimonial) =>
        testimonial.id === id
          ? { ...testimonial, featured: !testimonial.featured }
          : testimonial
      )
    );
    toast.success("Featured status updated!");
  };

  const handleToggleStatus = (id: string) => {
    setTestimonialsData(
      testimonialsData.map((testimonial) =>
        testimonial.id === id
          ? {
              ...testimonial,
              status: testimonial.status === "active" ? "inactive" : "active",
            }
          : testimonial
      )
    );
    toast.success("Status updated!");
  };

  const stats = {
    total: testimonialsData.length,
    active: testimonialsData.filter((t) => t.status === "active").length,
    featured: testimonialsData.filter((t) => t.featured).length,
    pending: testimonialsData.filter((t) => t.status === "pending").length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header type="operator" />

      <main className="flex-1 pt-24">
        {/* Header Section */}
        <section className="bg-white py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Testimonials Management
                </h1>
                <p className="text-gray-600">
                  Manage customer testimonials and reviews across the platform
                </p>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Testimonial
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Testimonial</DialogTitle>
                    <DialogDescription>
                      Create a new testimonial to showcase customer feedback
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={newTestimonial.name || ""}
                          onChange={(e) =>
                            setNewTestimonial({
                              ...newTestimonial,
                              name: e.target.value,
                            })
                          }
                          placeholder="Customer name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={newTestimonial.company || ""}
                          onChange={(e) =>
                            setNewTestimonial({
                              ...newTestimonial,
                              company: e.target.value,
                            })
                          }
                          placeholder="Company name"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="role">Role</Label>
                        <Input
                          id="role"
                          value={newTestimonial.role || ""}
                          onChange={(e) =>
                            setNewTestimonial({
                              ...newTestimonial,
                              role: e.target.value,
                            })
                          }
                          placeholder="Job title or role"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={newTestimonial.location || ""}
                          onChange={(e) =>
                            setNewTestimonial({
                              ...newTestimonial,
                              location: e.target.value,
                            })
                          }
                          placeholder="City, Country"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="quote">Testimonial Quote *</Label>
                      <Textarea
                        id="quote"
                        value={newTestimonial.quote || ""}
                        onChange={(e) =>
                          setNewTestimonial({
                            ...newTestimonial,
                            quote: e.target.value,
                          })
                        }
                        placeholder="Enter the testimonial text..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        value={newTestimonial.image || ""}
                        onChange={(e) =>
                          setNewTestimonial({
                            ...newTestimonial,
                            image: e.target.value,
                          })
                        }
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={newTestimonial.category || ""}
                          onValueChange={(value) =>
                            setNewTestimonial({
                              ...newTestimonial,
                              category: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {testimonialCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="type">Type</Label>
                        <Select
                          value={newTestimonial.type || "customer"}
                          onValueChange={(value) =>
                            setNewTestimonial({
                              ...newTestimonial,
                              type: value as any,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {testimonialTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="rating">Rating</Label>
                        <Select
                          value={newTestimonial.rating?.toString() || "5"}
                          onValueChange={(value) =>
                            setNewTestimonial({
                              ...newTestimonial,
                              rating: parseInt(value),
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[5, 4, 3, 2, 1].map((rating) => (
                              <SelectItem
                                key={rating}
                                value={rating.toString()}
                              >
                                {rating} Star{rating !== 1 ? "s" : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={newTestimonial.status || "active"}
                          onValueChange={(value) =>
                            setNewTestimonial({
                              ...newTestimonial,
                              status: value as any,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="featured"
                        checked={newTestimonial.featured || false}
                        onCheckedChange={(checked) =>
                          setNewTestimonial({
                            ...newTestimonial,
                            featured: checked,
                          })
                        }
                      />
                      <Label htmlFor="featured">Featured testimonial</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddTestimonial}>
                      Add Testimonial
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        Total Testimonials
                      </p>
                      <p className="text-3xl font-bold">{stats.total}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Star className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active</p>
                      <p className="text-3xl font-bold">{stats.active}</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Eye className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Featured</p>
                      <p className="text-3xl font-bold">{stats.featured}</p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending</p>
                      <p className="text-3xl font-bold">{stats.pending}</p>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Filter className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search testimonials..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {testimonialTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={filterCategory}
                      onValueChange={setFilterCategory}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {testimonialCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials Table */}
        <section className="pb-12">
          <div className="container mx-auto px-4">
            <Card>
              <CardHeader>
                <CardTitle>All Testimonials</CardTitle>
                <CardDescription>
                  Manage and organize customer testimonials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Quote</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTestimonials.map((testimonial) => (
                        <TableRow key={testimonial.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                                <img
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                      "/placeholder-avatar.png";
                                  }}
                                />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {testimonial.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {testimonial.company &&
                                    `${testimonial.company} • `}
                                  {testimonial.location}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <p className="truncate">{testimonial.quote}</p>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {testimonial.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{testimonial.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {Array.from({
                                length: testimonial.rating || 5,
                              }).map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                testimonial.status === "active"
                                  ? "default"
                                  : testimonial.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {testimonial.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={testimonial.featured}
                              onCheckedChange={() =>
                                handleToggleFeatured(testimonial.id)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingTestimonial(testimonial);
                                  setIsEditDialogOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleToggleStatus(testimonial.id)
                                }
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Testimonial
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this
                                      testimonial? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleDeleteTestimonial(testimonial.id)
                                      }
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Testimonial</DialogTitle>
              <DialogDescription>
                Update testimonial information
              </DialogDescription>
            </DialogHeader>
            {editingTestimonial && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-name">Name</Label>
                    <Input
                      id="edit-name"
                      value={editingTestimonial.name}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-company">Company</Label>
                    <Input
                      id="edit-company"
                      value={editingTestimonial.company || ""}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          company: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-role">Role</Label>
                    <Input
                      id="edit-role"
                      value={editingTestimonial.role || ""}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          role: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-location">Location</Label>
                    <Input
                      id="edit-location"
                      value={editingTestimonial.location || ""}
                      onChange={(e) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          location: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-quote">Quote</Label>
                  <Textarea
                    id="edit-quote"
                    value={editingTestimonial.quote}
                    onChange={(e) =>
                      setEditingTestimonial({
                        ...editingTestimonial,
                        quote: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-image">Image URL</Label>
                  <Input
                    id="edit-image"
                    value={editingTestimonial.image}
                    onChange={(e) =>
                      setEditingTestimonial({
                        ...editingTestimonial,
                        image: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-category">Category</Label>
                    <Select
                      value={editingTestimonial.category}
                      onValueChange={(value) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          category: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {testimonialCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-type">Type</Label>
                    <Select
                      value={editingTestimonial.type}
                      onValueChange={(value) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          type: value as any,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {testimonialTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-rating">Rating</Label>
                    <Select
                      value={editingTestimonial.rating?.toString()}
                      onValueChange={(value) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          rating: parseInt(value),
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <SelectItem key={rating} value={rating.toString()}>
                            {rating} Star{rating !== 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="edit-status">Status</Label>
                    <Select
                      value={editingTestimonial.status}
                      onValueChange={(value) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          status: value as any,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-featured"
                    checked={editingTestimonial.featured}
                    onCheckedChange={(checked) =>
                      setEditingTestimonial({
                        ...editingTestimonial,
                        featured: checked,
                      })
                    }
                  />
                  <Label htmlFor="edit-featured">Featured testimonial</Label>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleEditTestimonial}>
                Update Testimonial
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>

      <NewFooter />
    </div>
  );
};

export default TestimonialsManagement;
