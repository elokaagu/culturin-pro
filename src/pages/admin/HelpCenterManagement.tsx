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
  HelpCircle,
  Eye,
  Save,
} from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import { ImageUploader } from "@/components/ui/image-uploader";
import {
  faqItems,
  faqCategories,
  helpCenterContent,
  FAQ,
  HelpCenterContent,
} from "@/data/helpCenterData";
import { toast } from "@/hooks/use-toast";
import { settingsService } from "@/lib/settings-service";

const HelpCenterManagement = () => {
  const [faqsData, setFaqsData] = useState<FAQ[]>(faqItems);
  const [content, setContent] = useState<HelpCenterContent>(helpCenterContent);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);

  // State for file upload
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);

  const [newFaq, setNewFaq] = useState<Partial<FAQ>>({
    category: "general",
    question: "",
    answer: "",
    isActive: true,
  });

  const filteredFaqs = faqsData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddFaq = () => {
    if (!newFaq.question || !newFaq.answer) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const faq: FAQ = {
      id: `faq-${Date.now()}`,
      category: newFaq.category || "general",
      question: newFaq.question || "",
      answer: newFaq.answer || "",
      isActive: newFaq.isActive || true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setFaqsData([...faqsData, faq]);
    setNewFaq({
      category: "general",
      question: "",
      answer: "",
      isActive: true,
    });
    setIsAddingFaq(false);

    toast({
      title: "Success",
      description: "FAQ added successfully.",
    });
  };

  const handleEditFaq = (faq: FAQ) => {
    setEditingFaq({ ...faq });
  };

  const handleUpdateFaq = () => {
    if (!editingFaq) return;

    setFaqsData(
      faqsData.map((faq) =>
        faq.id === editingFaq.id
          ? { ...editingFaq, updatedAt: new Date().toISOString() }
          : faq
      )
    );
    setEditingFaq(null);

    toast({
      title: "Success",
      description: "FAQ updated successfully.",
    });
  };

  const handleDeleteFaq = (id: string) => {
    setFaqsData(faqsData.filter((faq) => faq.id !== id));
    toast({
      title: "Success",
      description: "FAQ deleted successfully.",
    });
  };

  const handleToggleFaqStatus = (id: string) => {
    setFaqsData(
      faqsData.map((faq) =>
        faq.id === id
          ? {
              ...faq,
              isActive: !faq.isActive,
              updatedAt: new Date().toISOString(),
            }
          : faq
      )
    );
  };

  const handleSaveContent = async () => {
    try {
      // Handle hero image upload - in a real app, you'd upload to a server/storage
      if (heroImageFile) {
        const heroImageUrl = URL.createObjectURL(heroImageFile);
        setContent((prev) => ({ ...prev, heroImage: heroImageUrl }));
      }

      // Save to localStorage as fallback
      localStorage.setItem("helpCenterContent", JSON.stringify(content));
      
      toast({
        title: "Content Saved",
        description: "Help center content has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving help center content:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save content. Please try again.",
        variant: "destructive",
      });
    }
  };

  const stats = [
    {
      title: "Total FAQs",
      value: faqsData.length.toString(),
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active FAQs",
      value: faqsData.filter((faq) => faq.isActive).length.toString(),
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Categories",
      value: faqCategories.length.toString(),
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Inactive FAQs",
      value: faqsData.filter((faq) => !faq.isActive).length.toString(),
      color: "bg-red-100 text-red-600",
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
                  Help Center Management
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                  Manage FAQs and help center content.
                </p>
              </div>
              <div className="flex gap-3">
                <Button asChild variant="outline">
                  <Link to="/help-center">
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
                      <HelpCircle className="h-6 w-6" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Tabs defaultValue="faqs" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="faqs">FAQ Management</TabsTrigger>
                <TabsTrigger value="content">Content Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="faqs" className="space-y-6">
                {/* FAQ Management */}
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Manage FAQs</CardTitle>
                      <Dialog open={isAddingFaq} onOpenChange={setIsAddingFaq}>
                        <DialogTrigger asChild>
                          <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add FAQ
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Add New FAQ</DialogTitle>
                            <DialogDescription>
                              Create a new frequently asked question.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="category">Category</Label>
                              <Select
                                value={newFaq.category || "general"}
                                onValueChange={(value) =>
                                  setNewFaq({ ...newFaq, category: value })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  {faqCategories.map((category) => (
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
                            <div>
                              <Label htmlFor="question">Question *</Label>
                              <Input
                                id="question"
                                value={newFaq.question || ""}
                                onChange={(e) =>
                                  setNewFaq({
                                    ...newFaq,
                                    question: e.target.value,
                                  })
                                }
                                placeholder="Enter the question"
                              />
                            </div>
                            <div>
                              <Label htmlFor="answer">Answer *</Label>
                              <Textarea
                                id="answer"
                                value={newFaq.answer || ""}
                                onChange={(e) =>
                                  setNewFaq({
                                    ...newFaq,
                                    answer: e.target.value,
                                  })
                                }
                                placeholder="Enter the answer"
                                rows={4}
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                id="active"
                                checked={newFaq.isActive}
                                onCheckedChange={(checked) =>
                                  setNewFaq({ ...newFaq, isActive: checked })
                                }
                              />
                              <Label htmlFor="active">Active</Label>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsAddingFaq(false)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleAddFaq}>Add FAQ</Button>
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
                            placeholder="Search FAQs..."
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
                          {faqCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* FAQs Table */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Question</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Updated</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredFaqs.map((faq) => (
                          <TableRow key={faq.id}>
                            <TableCell className="font-medium max-w-md">
                              <div className="truncate">{faq.question}</div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                {
                                  faqCategories.find(
                                    (cat) => cat.id === faq.category
                                  )?.name
                                }
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={faq.isActive}
                                  onCheckedChange={() =>
                                    handleToggleFaqStatus(faq.id)
                                  }
                                />
                                <span className="text-sm">
                                  {faq.isActive ? "Active" : "Inactive"}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {new Date(faq.updatedAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditFaq(faq)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteFaq(faq.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    {filteredFaqs.length === 0 && (
                      <div className="text-center py-8">
                        <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                          No FAQs found matching your criteria
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
                      <CardTitle>Help Center Content</CardTitle>
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
                      <Label htmlFor="heroImage">Hero Background Image</Label>
                      {isEditingContent ? (
                        <ImageUploader
                          onImageSelect={(file) => setHeroImageFile(file)}
                          currentImageUrl={
                            heroImageFile
                              ? URL.createObjectURL(heroImageFile)
                              : content.heroImage
                          }
                          className="mt-2"
                        />
                      ) : (
                        <div className="mt-2 p-4 border rounded-lg">
                          {content.heroImage ? (
                            <img
                              src={content.heroImage}
                              alt="Hero background"
                              className="w-full h-32 object-cover rounded"
                            />
                          ) : (
                            <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center text-gray-500">
                              No hero image set
                            </div>
                          )}
                        </div>
                      )}
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

        {/* Edit FAQ Dialog */}
        {editingFaq && (
          <Dialog open={!!editingFaq} onOpenChange={() => setEditingFaq(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit FAQ</DialogTitle>
                <DialogDescription>
                  Update the question and answer information.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="editCategory">Category</Label>
                  <Select
                    value={editingFaq.category}
                    onValueChange={(value) =>
                      setEditingFaq({ ...editingFaq, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {faqCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="editQuestion">Question</Label>
                  <Input
                    id="editQuestion"
                    value={editingFaq.question}
                    onChange={(e) =>
                      setEditingFaq({ ...editingFaq, question: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="editAnswer">Answer</Label>
                  <Textarea
                    id="editAnswer"
                    value={editingFaq.answer}
                    onChange={(e) =>
                      setEditingFaq({ ...editingFaq, answer: e.target.value })
                    }
                    rows={4}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="editActive"
                    checked={editingFaq.isActive}
                    onCheckedChange={(checked) =>
                      setEditingFaq({ ...editingFaq, isActive: checked })
                    }
                  />
                  <Label htmlFor="editActive">Active</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditingFaq(null)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateFaq}>Update FAQ</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </main>

      <NewFooter />
    </div>
  );
};

export default HelpCenterManagement;
