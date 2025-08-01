"use client";

import { useState, useEffect } from "react";
import { Link } from "../../../lib/navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  MessageSquare,
  Star,
  Eye,
  Save,
  Quote,
} from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import { ImageUploader } from "@/components/ui/image-uploader";
import {
  testimonials,
  testimonialCategories,
  Testimonial,
} from "@/data/testimonialsData";
import { toast } from "@/hooks/use-toast";
import { settingsService } from "@/lib/settings-service";

// Simple content interface for testimonials page
interface TestimonialsContent {
  heroTitle: string;
  heroSubtitle: string;
}

const TestimonialsManagement = () => {
  const [testimonialsData, setTestimonialsData] =
    useState<Testimonial[]>(testimonials);
  const [content, setContent] = useState<TestimonialsContent>({
    heroTitle: "What Our Community Says",
    heroSubtitle:
      "Real stories from tour operators and travelers who trust Culturin to create meaningful cultural experiences.",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);

  // State for file uploads
  const [newTestimonialImage, setNewTestimonialImage] = useState<File | null>(
    null
  );
  const [editTestimonialImage, setEditTestimonialImage] = useState<File | null>(
    null
  );

  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    type: "customer",
    category: "Cultural Tours",
    quote: "",
    name: "",
    company: "",
    location: "",
    image: "",
    rating: 5,
    status: "active",
    featured: false,
  });

  const testimonialTypes = ["customer", "operator", "partner", "general"];

  const filteredTestimonials = testimonialsData.filter((testimonial) => {
    const matchesSearch =
      testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (testimonial.company &&
        testimonial.company.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      selectedCategory === "all" || testimonial.category === selectedCategory;
    const matchesType =
      selectedType === "all" || testimonial.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleAddTestimonial = () => {
    if (!newTestimonial.quote || !newTestimonial.name) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Handle image upload - in a real app, you'd upload to a server/storage
    let imageUrl = "/placeholder-avatar.png";
    if (newTestimonialImage) {
      // For demo purposes, create a local URL
      imageUrl = URL.createObjectURL(newTestimonialImage);
    }

    const testimonial: Testimonial = {
      id: `testimonial-${Date.now()}`,
      type: newTestimonial.type || "customer",
      category: newTestimonial.category || "Cultural Tours",
      quote: newTestimonial.quote || "",
      name: newTestimonial.name || "",
      company: newTestimonial.company || "",
      location: newTestimonial.location || "",
      image: imageUrl,
      rating: newTestimonial.rating || 5,
      dateAdded: new Date().toISOString().split("T")[0],
      status: newTestimonial.status || "active",
      featured: newTestimonial.featured || false,
    };

    setTestimonialsData([...testimonialsData, testimonial]);
    setNewTestimonial({
      type: "customer",
      category: "Cultural Tours",
      quote: "",
      name: "",
      company: "",
      location: "",
      image: "",
      rating: 5,
      status: "active",
      featured: false,
    });
    setNewTestimonialImage(null);
    setIsAddingTestimonial(false);

    toast({
      title: "Success",
      description: "Testimonial added successfully.",
    });
  };

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial({ ...testimonial });
    setEditTestimonialImage(null);
  };

  const handleUpdateTestimonial = () => {
    if (!editingTestimonial) return;

    // Handle image upload - in a real app, you'd upload to a server/storage
    let imageUrl = editingTestimonial.image;
    if (editTestimonialImage) {
      // For demo purposes, create a local URL
      imageUrl = URL.createObjectURL(editTestimonialImage);
    }

    setTestimonialsData(
      testimonialsData.map((testimonial) =>
        testimonial.id === editingTestimonial.id
          ? {
              ...editingTestimonial,
              image: imageUrl,
            }
          : testimonial
      )
    );
    setEditingTestimonial(null);
    setEditTestimonialImage(null);

    toast({
      title: "Success",
      description: "Testimonial updated successfully.",
    });
  };

  const handleDeleteTestimonial = (id: string) => {
    setTestimonialsData(
      testimonialsData.filter((testimonial) => testimonial.id !== id)
    );
    toast({
      title: "Success",
      description: "Testimonial deleted successfully.",
    });
  };

  const handleToggleTestimonialStatus = (id: string) => {
    setTestimonialsData(
      testimonialsData.map((testimonial) =>
        testimonial.id === id
          ? {
              ...testimonial,
              status:
                testimonial.status === "active"
                  ? "inactive"
                  : ("active" as "active" | "inactive" | "pending"),
            }
          : testimonial
      )
    );
  };

  const handleToggleFeatured = (id: string) => {
    setTestimonialsData(
      testimonialsData.map((testimonial) =>
        testimonial.id === id
          ? {
              ...testimonial,
              featured: !testimonial.featured,
            }
          : testimonial
      )
    );
  };

  const handleSaveContent = async () => {
    try {
      // Handle hero image upload - in a real app, you'd upload to a server/storage
      if (newTestimonialImage) {
        const heroImageUrl = URL.createObjectURL(newTestimonialImage);
        setContent((prev) => ({ ...prev, heroImage: heroImageUrl }));
      }

      // Save using the settings service
      await settingsService.saveTestimonialsContent(content);

      setIsEditingContent(false);
      setNewTestimonialImage(null);
      toast({
        title: "Success",
        description: "Testimonials content updated successfully and saved to database.",
      });
    } catch (error) {
      console.error('Error saving testimonials content:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save content. Please try again.",
        variant: "destructive",
      });
    }
  };

  const stats = [
    {
      title: "Total Testimonials",
      value: testimonialsData.length.toString(),
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Testimonials",
      value: testimonialsData
        .filter((testimonial) => testimonial.status === "active")
        .length.toString(),
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Featured Testimonials",
      value: testimonialsData
        .filter((testimonial) => testimonial.featured)
        .length.toString(),
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Average Rating",
      value: (
        testimonialsData.reduce(
          (acc, testimonial) => acc + (testimonial.rating || 5),
          0
        ) / testimonialsData.length
      ).toFixed(1),
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header type="operator" />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-start">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Testimonials Management
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                  Manage customer testimonials and reviews.
                </p>
              </div>
              <div className="flex gap-3">
                <Button asChild variant="outline">
                  <Link to="/testimonials">
                    <Eye className="h-4 w-4 mr-2" />
                    View Live
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/admin">← Back to Admin</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <MessageSquare className="h-6 w-6" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="testimonials" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="testimonials">
                  Testimonials Management
                </TabsTrigger>
                <TabsTrigger value="content">Content Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="testimonials" className="space-y-6">
                {/* Testimonials Management */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Manage Testimonials</CardTitle>
                      <Dialog
                        open={isAddingTestimonial}
                        onOpenChange={setIsAddingTestimonial}
                      >
                        <DialogTrigger asChild>
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Testimonial
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Add New Testimonial</DialogTitle>
                            <DialogDescription>
                              Create a new customer testimonial.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
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
                                placeholder="Enter the customer's testimonial"
                                rows={4}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="name">Customer Name *</Label>
                                <Input
                                  id="name"
                                  value={newTestimonial.name || ""}
                                  onChange={(e) =>
                                    setNewTestimonial({
                                      ...newTestimonial,
                                      name: e.target.value,
                                    })
                                  }
                                  placeholder="Enter customer name"
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
                                  placeholder="Enter company name (optional)"
                                />
                              </div>
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
                                placeholder="Enter customer location"
                              />
                            </div>
                            <div>
                              <Label htmlFor="image">Customer Photo</Label>
                              <ImageUploader
                                onImageSelect={(file) =>
                                  setNewTestimonialImage(file)
                                }
                                currentImageUrl={
                                  newTestimonialImage
                                    ? URL.createObjectURL(newTestimonialImage)
                                    : undefined
                                }
                                className="mt-2"
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
                                      <SelectItem
                                        key={category}
                                        value={category}
                                      >
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
                                      type: value as
                                        | "customer"
                                        | "operator"
                                        | "partner"
                                        | "general",
                                    })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {testimonialTypes.map((type) => (
                                      <SelectItem key={type} value={type}>
                                        {type.charAt(0).toUpperCase() +
                                          type.slice(1)}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
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
                                  {[1, 2, 3, 4, 5].map((rating) => (
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
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="active"
                                  checked={newTestimonial.status === "active"}
                                  onCheckedChange={(checked) =>
                                    setNewTestimonial({
                                      ...newTestimonial,
                                      status: checked ? "active" : "inactive",
                                    })
                                  }
                                />
                                <Label htmlFor="active">Active</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="featured"
                                  checked={newTestimonial.featured}
                                  onCheckedChange={(checked) =>
                                    setNewTestimonial({
                                      ...newTestimonial,
                                      featured: checked,
                                    })
                                  }
                                />
                                <Label htmlFor="featured">Featured</Label>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setIsAddingTestimonial(false);
                                setNewTestimonialImage(null);
                              }}
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
                  </CardHeader>
                  <CardContent>
                    {/* Filters */}
                    <div className="flex gap-4 mb-6">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Search testimonials..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="All Categories" />
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
                      <Select
                        value={selectedType}
                        onValueChange={setSelectedType}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          {testimonialTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Testimonials Table */}
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
                              <Badge variant="outline">
                                {testimonial.type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
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
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={testimonial.status === "active"}
                                  onCheckedChange={() =>
                                    handleToggleTestimonialStatus(
                                      testimonial.id
                                    )
                                  }
                                />
                                <span className="text-sm">
                                  {testimonial.status === "active"
                                    ? "Active"
                                    : "Inactive"}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={testimonial.featured}
                                  onCheckedChange={() =>
                                    handleToggleFeatured(testimonial.id)
                                  }
                                />
                                {testimonial.featured && (
                                  <Star className="h-4 w-4 text-yellow-500" />
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleEditTestimonial(testimonial)
                                  }
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleDeleteTestimonial(testimonial.id)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {filteredTestimonials.length === 0 && (
                      <div className="text-center py-8">
                        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                          No testimonials found matching your criteria
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                {/* Content Settings */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Testimonials Page Content</CardTitle>
                      <Button
                        onClick={() => setIsEditingContent(!isEditingContent)}
                        variant={isEditingContent ? "outline" : "default"}
                      >
                        {isEditingContent ? (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        ) : (
                          <>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Content
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="heroTitle">Hero Title</Label>
                      <Input
                        id="heroTitle"
                        value={content.heroTitle}
                        onChange={(e) =>
                          setContent({ ...content, heroTitle: e.target.value })
                        }
                        disabled={!isEditingContent}
                      />
                    </div>
                    <div>
                      <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                      <Textarea
                        id="heroSubtitle"
                        value={content.heroSubtitle}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            heroSubtitle: e.target.value,
                          })
                        }
                        disabled={!isEditingContent}
                        rows={3}
                      />
                    </div>

                    {isEditingContent && (
                      <div className="flex justify-end">
                        <Button onClick={handleSaveContent}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Content Changes
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Edit Testimonial Dialog */}
        {editingTestimonial && (
          <Dialog
            open={!!editingTestimonial}
            onOpenChange={() => {
              setEditingTestimonial(null);
              setEditTestimonialImage(null);
            }}
          >
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Testimonial</DialogTitle>
                <DialogDescription>
                  Update the testimonial information.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-quote">Testimonial Quote</Label>
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="edit-name">Customer Name</Label>
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
                <div>
                  <Label htmlFor="edit-image">Customer Photo</Label>
                  <ImageUploader
                    onImageSelect={(file) => setEditTestimonialImage(file)}
                    currentImageUrl={
                      editTestimonialImage
                        ? URL.createObjectURL(editTestimonialImage)
                        : editingTestimonial.image
                    }
                    className="mt-2"
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
                          type: value as
                            | "customer"
                            | "operator"
                            | "partner"
                            | "general",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {testimonialTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="edit-rating">Rating</Label>
                  <Select
                    value={(editingTestimonial.rating || 5).toString()}
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
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <SelectItem key={rating} value={rating.toString()}>
                          {rating} Star{rating !== 1 ? "s" : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-active"
                      checked={editingTestimonial.status === "active"}
                      onCheckedChange={(checked) =>
                        setEditingTestimonial({
                          ...editingTestimonial,
                          status: checked ? "active" : "inactive",
                        })
                      }
                    />
                    <Label htmlFor="edit-active">Active</Label>
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
                    <Label htmlFor="edit-featured">Featured</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingTestimonial(null);
                    setEditTestimonialImage(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleUpdateTestimonial}>
                  Update Testimonial
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </main>

      <NewFooter />
    </div>
  );
};

export default TestimonialsManagement;
