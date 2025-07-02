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
  FileText,
  Star,
  Eye,
  Save,
  Building,
} from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import {
  caseStudies,
  caseStudiesCategories,
  caseStudiesContent,
  CaseStudy,
  CaseStudiesContent,
} from "@/data/caseStudiesData";
import { toast } from "@/hooks/use-toast";

const CaseStudiesManagement = () => {
  const [studies, setStudies] = useState<CaseStudy[]>(caseStudies);
  const [content, setContent] =
    useState<CaseStudiesContent>(caseStudiesContent);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null);
  const [isAddingStudy, setIsAddingStudy] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);

  const [newStudy, setNewStudy] = useState<Partial<CaseStudy>>({
    category: "food-tours",
    title: "",
    company: "",
    location: "",
    tags: [],
    excerpt: "",
    challenge: "",
    solution: "",
    results: [],
    testimonial: {
      quote: "",
      author: "",
      position: "",
    },
    image: "",
    isActive: true,
    featured: false,
  });

  const filteredStudies = studies.filter((study) => {
    const matchesSearch =
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || study.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddStudy = () => {
    if (!newStudy.title || !newStudy.company || !newStudy.excerpt) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const study: CaseStudy = {
      id: `case-${Date.now()}`,
      title: newStudy.title || "",
      company: newStudy.company || "",
      location: newStudy.location || "",
      category: newStudy.category || "food-tours",
      tags: newStudy.tags || [],
      excerpt: newStudy.excerpt || "",
      challenge: newStudy.challenge || "",
      solution: newStudy.solution || "",
      results: newStudy.results || [],
      testimonial: newStudy.testimonial || {
        quote: "",
        author: "",
        position: "",
      },
      image: newStudy.image || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: newStudy.isActive || true,
      featured: newStudy.featured || false,
    };

    setStudies([...studies, study]);
    setNewStudy({
      category: "food-tours",
      title: "",
      company: "",
      location: "",
      tags: [],
      excerpt: "",
      challenge: "",
      solution: "",
      results: [],
      testimonial: { quote: "", author: "", position: "" },
      image: "",
      isActive: true,
      featured: false,
    });
    setIsAddingStudy(false);

    toast({
      title: "Success",
      description: "Case study added successfully.",
    });
  };

  const handleEditStudy = (study: CaseStudy) => {
    setEditingStudy({ ...study });
  };

  const handleUpdateStudy = () => {
    if (!editingStudy) return;

    setStudies(
      studies.map((study) =>
        study.id === editingStudy.id
          ? { ...editingStudy, updatedAt: new Date().toISOString() }
          : study
      )
    );
    setEditingStudy(null);

    toast({
      title: "Success",
      description: "Case study updated successfully.",
    });
  };

  const handleDeleteStudy = (id: string) => {
    setStudies(studies.filter((study) => study.id !== id));
    toast({
      title: "Success",
      description: "Case study deleted successfully.",
    });
  };

  const handleToggleStudyStatus = (id: string) => {
    setStudies(
      studies.map((study) =>
        study.id === id
          ? {
              ...study,
              isActive: !study.isActive,
              updatedAt: new Date().toISOString(),
            }
          : study
      )
    );
  };

  const handleToggleFeatured = (id: string) => {
    setStudies(
      studies.map((study) =>
        study.id === id
          ? {
              ...study,
              featured: !study.featured,
              updatedAt: new Date().toISOString(),
            }
          : study
      )
    );
  };

  const handleSaveContent = () => {
    setIsEditingContent(false);
    toast({
      title: "Success",
      description: "Case Studies content updated successfully.",
    });
  };

  const stats = [
    {
      title: "Total Case Studies",
      value: studies.length.toString(),
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Studies",
      value: studies.filter((study) => study.isActive).length.toString(),
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Featured Studies",
      value: studies.filter((study) => study.featured).length.toString(),
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Categories",
      value: (caseStudiesCategories.length - 1).toString(), // Subtract 1 for "All Categories"
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
                  Case Studies Management
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                  Manage success stories and case studies content.
                </p>
              </div>
              <div className="flex gap-3">
                <Button asChild variant="outline">
                  <Link to="/case-studies">
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
                      <FileText className="h-6 w-6" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="studies" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="studies">
                  Case Studies Management
                </TabsTrigger>
                <TabsTrigger value="content">Content Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="studies" className="space-y-6">
                {/* Case Studies Management */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Manage Case Studies</CardTitle>
                      <Dialog
                        open={isAddingStudy}
                        onOpenChange={setIsAddingStudy}
                      >
                        <DialogTrigger asChild>
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Case Study
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Add New Case Study</DialogTitle>
                            <DialogDescription>
                              Create a new success story and case study.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                  id="title"
                                  value={newStudy.title || ""}
                                  onChange={(e) =>
                                    setNewStudy({
                                      ...newStudy,
                                      title: e.target.value,
                                    })
                                  }
                                  placeholder="Enter case study title"
                                />
                              </div>
                              <div>
                                <Label htmlFor="company">Company</Label>
                                <Input
                                  id="company"
                                  value={newStudy.company || ""}
                                  onChange={(e) =>
                                    setNewStudy({
                                      ...newStudy,
                                      company: e.target.value,
                                    })
                                  }
                                  placeholder="Enter company name"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="location">Location</Label>
                                <Input
                                  id="location"
                                  value={newStudy.location || ""}
                                  onChange={(e) =>
                                    setNewStudy({
                                      ...newStudy,
                                      location: e.target.value,
                                    })
                                  }
                                  placeholder="Enter location"
                                />
                              </div>
                              <div>
                                <Label htmlFor="category">Category</Label>
                                <Select
                                  value={newStudy.category}
                                  onValueChange={(value) =>
                                    setNewStudy({
                                      ...newStudy,
                                      category: value,
                                    })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {caseStudiesCategories
                                      .filter((cat) => cat.id !== "all")
                                      .map((category) => (
                                        <SelectItem
                                          key={category.id}
                                          value={category.id}
                                        >
                                          {category.name}
                                        </SelectItem>
                                      ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="excerpt">Excerpt</Label>
                              <Textarea
                                id="excerpt"
                                value={newStudy.excerpt || ""}
                                onChange={(e) =>
                                  setNewStudy({
                                    ...newStudy,
                                    excerpt: e.target.value,
                                  })
                                }
                                placeholder="Enter a brief description"
                                rows={3}
                              />
                            </div>
                            <div>
                              <Label htmlFor="image">Image URL</Label>
                              <Input
                                id="image"
                                value={newStudy.image || ""}
                                onChange={(e) =>
                                  setNewStudy({
                                    ...newStudy,
                                    image: e.target.value,
                                  })
                                }
                                placeholder="Enter image URL"
                              />
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="active"
                                  checked={newStudy.isActive}
                                  onCheckedChange={(checked) =>
                                    setNewStudy({
                                      ...newStudy,
                                      isActive: checked,
                                    })
                                  }
                                />
                                <Label htmlFor="active">Active</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="featured"
                                  checked={newStudy.featured}
                                  onCheckedChange={(checked) =>
                                    setNewStudy({
                                      ...newStudy,
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
                              onClick={() => setIsAddingStudy(false)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleAddStudy}>
                              Add Case Study
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
                            placeholder="Search case studies..."
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
                          {caseStudiesCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Case Studies Table */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Featured</TableHead>
                          <TableHead>Updated</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStudies.map((study) => (
                          <TableRow key={study.id}>
                            <TableCell className="font-medium max-w-md">
                              <div className="truncate">{study.title}</div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Building className="h-4 w-4 text-gray-400" />
                                {study.company}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                {
                                  caseStudiesCategories.find(
                                    (cat) => cat.id === study.category
                                  )?.name
                                }
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={study.isActive}
                                  onCheckedChange={() =>
                                    handleToggleStudyStatus(study.id)
                                  }
                                />
                                <span className="text-sm">
                                  {study.isActive ? "Active" : "Inactive"}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={study.featured}
                                  onCheckedChange={() =>
                                    handleToggleFeatured(study.id)
                                  }
                                />
                                {study.featured && (
                                  <Star className="h-4 w-4 text-yellow-500" />
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              {new Date(study.updatedAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditStudy(study)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteStudy(study.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {filteredStudies.length === 0 && (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                          No case studies found matching your criteria
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
                      <CardTitle>Case Studies Page Content</CardTitle>
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
                    <div>
                      <Label htmlFor="heroImage">Hero Image URL</Label>
                      <Input
                        id="heroImage"
                        value={content.heroImage}
                        onChange={(e) =>
                          setContent({ ...content, heroImage: e.target.value })
                        }
                        disabled={!isEditingContent}
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

        {/* Edit Case Study Dialog */}
        {editingStudy && (
          <Dialog
            open={!!editingStudy}
            onOpenChange={() => setEditingStudy(null)}
          >
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Case Study</DialogTitle>
                <DialogDescription>
                  Update the case study information.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editTitle">Title</Label>
                    <Input
                      id="editTitle"
                      value={editingStudy.title}
                      onChange={(e) =>
                        setEditingStudy({
                          ...editingStudy,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="editCompany">Company</Label>
                    <Input
                      id="editCompany"
                      value={editingStudy.company}
                      onChange={(e) =>
                        setEditingStudy({
                          ...editingStudy,
                          company: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editLocation">Location</Label>
                    <Input
                      id="editLocation"
                      value={editingStudy.location}
                      onChange={(e) =>
                        setEditingStudy({
                          ...editingStudy,
                          location: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="editCategory">Category</Label>
                    <Select
                      value={editingStudy.category}
                      onValueChange={(value) =>
                        setEditingStudy({ ...editingStudy, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {caseStudiesCategories
                          .filter((cat) => cat.id !== "all")
                          .map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="editExcerpt">Excerpt</Label>
                  <Textarea
                    id="editExcerpt"
                    value={editingStudy.excerpt}
                    onChange={(e) =>
                      setEditingStudy({
                        ...editingStudy,
                        excerpt: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="editImage">Image URL</Label>
                  <Input
                    id="editImage"
                    value={editingStudy.image}
                    onChange={(e) =>
                      setEditingStudy({
                        ...editingStudy,
                        image: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="editActive"
                      checked={editingStudy.isActive}
                      onCheckedChange={(checked) =>
                        setEditingStudy({ ...editingStudy, isActive: checked })
                      }
                    />
                    <Label htmlFor="editActive">Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="editFeatured"
                      checked={editingStudy.featured}
                      onCheckedChange={(checked) =>
                        setEditingStudy({ ...editingStudy, featured: checked })
                      }
                    />
                    <Label htmlFor="editFeatured">Featured</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditingStudy(null)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateStudy}>Update Case Study</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </main>

      <NewFooter />
    </div>
  );
};

export default CaseStudiesManagement;
