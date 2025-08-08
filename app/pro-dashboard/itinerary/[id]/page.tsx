"use client";

import React, { useState, useEffect } from "react";
import ProDashboardLayout from "../../../../components/pro/ProDashboardLayout";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  Edit,
  Globe,
  Share2,
  Copy,
  Archive,
  Save,
  X,
  ExternalLink,
  Trash2,
  Upload,
  Camera,
} from "lucide-react";
import Image from "@/components/ui/image";

import { itineraryService } from "@/lib/itinerary-service";
import { Itinerary } from "@/hooks/useItineraries";

export default function ItineraryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const itineraryId = params.id as string;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Modal states for quick actions
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  // Load itinerary data
  useEffect(() => {
    const loadItinerary = async () => {
      try {
        setIsLoading(true);

        // First try to load from database
        const dbItinerary = await itineraryService.getItinerary(itineraryId);

        if (dbItinerary) {
          setItinerary(dbItinerary);
        } else {
          // No itinerary found - set to null
          setItinerary(null);
        }
      } catch (error) {
        console.error("Error loading itinerary:", error);
        // Error loading - set to null
        setItinerary(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadItinerary();
  }, [itineraryId]);

  // Initialize form data when entering edit mode
  const handleEditClick = () => {
    if (itinerary) {
      setFormData({
        title: itinerary.title,
        description: itinerary.description,
        days: itinerary.days,
        status: itinerary.status,
        image: itinerary.image,
        price: itinerary.price,
        currency: itinerary.currency,
        highlights: itinerary.highlights?.join(", "),
      });
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (!itinerary || !formData) {
      toast({
        title: "Error",
        description: "Missing itinerary data",
        variant: "destructive",
      });
      return;
    }

    // Validate required fields
    if (!formData.title?.trim()) {
      toast({
        title: "Validation Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const updates: Partial<Itinerary> = {
        title: formData.title.trim(),
        description: formData.description?.trim() || "",
        days: formData.days || 1,
        status: formData.status || "draft",
        image: formData.image || "",
        price: formData.price || null,
        currency: formData.currency || "USD",
        highlights: formData.highlights
          ? formData.highlights.split(", ").filter(Boolean)
          : [],
      };

      const success = await itineraryService.updateItinerary({
        ...itinerary,
        ...updates,
      });

      if (success) {
        // Refresh the itinerary data
        const refreshedItinerary = await itineraryService.getItinerary(
          itinerary.id
        );
        setItinerary(refreshedItinerary);
        setIsEditing(false);

        // Dispatch event to notify website builder of itinerary changes
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("itineraryChanged", {
              detail: { action: "updated", itinerary: refreshedItinerary },
            })
          );
        }

        toast({
          title: "Changes Saved",
          description: "Your itinerary has been updated successfully.",
        });
      } else {
        toast({
          title: "Save Failed",
          description: "Failed to save itinerary. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error saving itinerary:", error);

      toast({
        title: "Save Failed",
        description:
          error instanceof Error
            ? error.message
            : "Failed to save itinerary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(null);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Quick Actions Functions
  const handleViewOnWebsite = () => {
    setShowViewModal(true);
  };

  const handleViewOnWebsiteConfirm = () => {
    // Get the user's published website URL from localStorage
    const getPublishedUrl = () => {
      // Try to get user-specific published URL first
      const userKeys = Object.keys(localStorage).filter((key) =>
        key.startsWith("publishedWebsiteUrl_")
      );

      if (userKeys.length > 0) {
        return localStorage.getItem(userKeys[0]);
      }

      // Fallback to general published URL
      return localStorage.getItem("publishedWebsiteUrl");
    };

    const publishedUrl = getPublishedUrl();
    const publicUrl = publishedUrl
      ? `${window.location.origin}/${publishedUrl}`
      : `${window.location.origin}/tour/${itineraryId}`;

    window.open(publicUrl, "_blank");
    setShowViewModal(false);
  };

  const handleShareLink = async () => {
    setShowShareModal(true);
  };

  const handleShareLinkConfirm = async () => {
    // Get the user's published website URL from localStorage
    const getPublishedUrl = () => {
      // Try to get user-specific published URL first
      const userKeys = Object.keys(localStorage).filter((key) =>
        key.startsWith("publishedWebsiteUrl_")
      );

      if (userKeys.length > 0) {
        return localStorage.getItem(userKeys[0]);
      }

      // Fallback to general published URL
      return localStorage.getItem("publishedWebsiteUrl");
    };

    const publishedUrl = getPublishedUrl();
    const shareUrl = publishedUrl
      ? `${window.location.origin}/${publishedUrl}`
      : `${window.location.origin}/tour/${itineraryId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: itinerary?.title || "Itinerary",
          text: itinerary?.description || "Check out this amazing itinerary",
          url: shareUrl,
        });
      } catch (error) {}
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link Copied",
          description: "Itinerary link has been copied to your clipboard.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to copy link to clipboard.",
          variant: "destructive",
        });
      }
    }
    setShowShareModal(false);
  };

  const handleDuplicate = async () => {
    setShowDuplicateModal(true);
  };

  const handleDuplicateConfirm = async () => {
    if (!itinerary) return;

    try {
      // Create a duplicate of the current itinerary
      const { id, ...itineraryData } = itinerary;
      const duplicateItinerary = {
        ...itineraryData,
        id: `duplicate-${Date.now()}`,
        title: `${itinerary.title} (Copy)`,
        status: "draft" as const,
      };

      const success = await itineraryService.saveItinerary(duplicateItinerary);

      if (success) {
        toast({
          title: "Itinerary Duplicated",
          description: "A copy of this itinerary has been created.",
        });

        // Navigate back to the itinerary list
        router.push("/pro-dashboard/itinerary");
      } else {
        toast({
          title: "Error",
          description: "Failed to duplicate itinerary",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error duplicating itinerary:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to duplicate itinerary",
        variant: "destructive",
      });
    }
    setShowDuplicateModal(false);
  };

  const handleArchive = async () => {
    setShowArchiveModal(true);
  };

  const handleArchiveConfirm = async () => {
    if (!itinerary) return;

    try {
      const success = await itineraryService.updateItinerary({
        ...itinerary,
        status: "archived",
      });

      if (success) {
        toast({
          title: "Itinerary Archived",
          description: "The itinerary has been archived successfully.",
        });

        router.push("/pro-dashboard/itinerary");
      } else {
        toast({
          title: "Error",
          description: "Failed to archive itinerary",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error archiving itinerary:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to archive itinerary",
        variant: "destructive",
      });
    }
    setShowArchiveModal(false);
  };

  const handleDelete = async () => {
    if (!itinerary) return;

    try {
      await itineraryService.deleteItinerary(itinerary.id);

      // Dispatch event to notify website builder of itinerary deletion
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("itineraryChanged", {
            detail: { action: "deleted", itineraryId: itinerary.id },
          })
        );
      }

      toast({
        title: "Itinerary Deleted",
        description: "The itinerary has been deleted successfully.",
      });

      router.push("/pro-dashboard/itinerary");
    } catch (error) {
      console.error("Error deleting itinerary:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete itinerary",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <ProDashboardLayout>
        <div className="p-6">
          <div className="py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </ProDashboardLayout>
    );
  }

  if (!itinerary) {
    return (
      <ProDashboardLayout>
        <div className="p-6">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Itinerary Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The itinerary you're looking for doesn't exist.
            </p>
            <Button onClick={() => router.push("/pro-dashboard/itinerary")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Itineraries
            </Button>
          </div>
        </div>
      </ProDashboardLayout>
    );
  }

  return (
    <ProDashboardLayout>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.push("/pro-dashboard/itinerary")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Itineraries
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isEditing ? "Edit Itinerary" : itinerary.title}
                </h1>
                <p className="text-gray-600">
                  {isEditing
                    ? "Make changes to your itinerary"
                    : `${itinerary.days} days • ${
                        itinerary.highlights?.join(", ") || "No highlights"
                      }`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={handleShareLink}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" onClick={handleDuplicate}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteDialog(true)}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                  <Button onClick={handleEditClick}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Itinerary
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Image and Basic Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero Image */}
              <Card className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={
                      isEditing && formData?.image
                        ? formData.image
                        : itinerary.image
                    }
                    alt={
                      isEditing && formData?.title
                        ? formData.title
                        : itinerary.title
                    }
                    className="w-full h-full object-cover"
                    fill
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/50 text-white">
                      {itinerary.status.charAt(0).toUpperCase() +
                        itinerary.status.slice(1)}
                    </Badge>
                  </div>
                  {/* Image Upload Overlay */}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="text-center text-white">
                        <Camera className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm font-medium">
                          Click to change image
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (e) => {
                                const result = e.target?.result as string;
                                handleInputChange("image", result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About This Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={formData?.title || ""}
                          onChange={(e) =>
                            handleInputChange("title", e.target.value)
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={formData?.description || ""}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          className="mt-1"
                          rows={4}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700 leading-relaxed">
                      {itinerary.description}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Itinerary Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Itinerary Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="days">Duration (days)</Label>
                        <Input
                          id="days"
                          type="number"
                          value={formData?.days || ""}
                          onChange={(e) =>
                            handleInputChange("days", parseInt(e.target.value))
                          }
                          className="mt-1"
                          min="1"
                          max="30"
                        />
                      </div>
                      <div>
                        <Label htmlFor="regions">
                          Destinations (comma-separated)
                        </Label>
                        <Input
                          id="regions"
                          value={formData?.regions || ""}
                          onChange={(e) =>
                            handleInputChange("regions", e.target.value)
                          }
                          className="mt-1"
                          placeholder="e.g., Paris, Lyon, Nice"
                        />
                      </div>
                      <div>
                        <Label htmlFor="themeType">Theme</Label>
                        <Select
                          value={formData?.themeType || ""}
                          onValueChange={(value) =>
                            handleInputChange("themeType", value)
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cultural">Cultural</SelectItem>
                            <SelectItem value="adventure">Adventure</SelectItem>
                            <SelectItem value="culinary">Culinary</SelectItem>
                            <SelectItem value="historical">
                              Historical
                            </SelectItem>
                            <SelectItem value="nature">Nature</SelectItem>
                            <SelectItem value="urban">Urban</SelectItem>
                            <SelectItem value="spiritual">Spiritual</SelectItem>
                            <SelectItem value="arts">Arts</SelectItem>
                            <SelectItem value="general">General</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={formData?.status || ""}
                          onValueChange={(value) =>
                            handleInputChange("status", value)
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="price">Price (USD)</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={formData?.price || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "price",
                              parseFloat(e.target.value) || 0
                            )
                          }
                          className="mt-1"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <Label htmlFor="groupSize">Group Size</Label>
                        <div className="flex gap-2 mt-1">
                          <Input
                            type="number"
                            placeholder="Min"
                            value={formData?.groupSizeMin || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "groupSizeMin",
                                parseInt(e.target.value) || 1
                              )
                            }
                          />
                          <Input
                            type="number"
                            placeholder="Max"
                            value={formData?.groupSizeMax || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "groupSizeMax",
                                parseInt(e.target.value) || 10
                              )
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="difficulty">Difficulty Level</Label>
                        <Select
                          value={formData?.difficulty || ""}
                          onValueChange={(value) =>
                            handleInputChange("difficulty", value)
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="challenging">
                              Challenging
                            </SelectItem>
                            <SelectItem value="expert">Expert</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="tags">Tags (comma-separated)</Label>
                        <Input
                          id="tags"
                          value={formData?.tags || ""}
                          onChange={(e) =>
                            handleInputChange("tags", e.target.value)
                          }
                          className="mt-1"
                          placeholder="e.g., cultural, adventure, food"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex flex-col">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-medium">
                          {itinerary.days} days
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600">Destinations</span>
                        <span className="font-medium">
                          {itinerary.highlights?.join(", ") || "No highlights"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600">Type</span>
                        <span className="font-medium capitalize">
                          Cultural Experience
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600">Status</span>
                        <Badge
                          className={
                            itinerary.status === "published"
                              ? "bg-green-500 px-2 py-1 text-xs w-fit"
                              : "bg-yellow-500 px-2 py-1 text-xs w-fit"
                          }
                        >
                          {itinerary.status === "published"
                            ? "Published"
                            : "Draft"}
                        </Badge>
                      </div>
                      {itinerary.price && (
                        <div className="flex flex-col">
                          <span className="text-gray-600">Price</span>
                          <span className="font-medium">
                            ${itinerary.price} {itinerary.currency}
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-gray-600">Group Size</span>
                        <span className="font-medium">
                          2-8 people
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600">Difficulty</span>
                        <span className="font-medium capitalize">
                          Easy
                        </span>
                      </div>
                      {itinerary.highlights && itinerary.highlights.length > 0 && (
                        <div className="flex flex-col">
                          <span className="text-gray-600">Highlights</span>
                          <div className="flex gap-1 flex-wrap">
                            {itinerary.highlights.map((highlight, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Actions and Stats */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={handleViewOnWebsite}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    View on Website
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={handleShareLink}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Link
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={handleDuplicate}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={handleArchive}
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Itinerary
                  </Button>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-left">
                      <div className="text-2xl font-bold text-gray-900">
                        1.2k
                      </div>
                      <div className="text-sm text-gray-600">Views</div>
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-gray-900">12</div>
                      <div className="text-sm text-gray-600">Bookings</div>
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-gray-900">
                        4.8
                      </div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Last Updated */}
              <Card>
                <CardHeader>
                  <CardTitle>Last Updated</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    {itinerary.updated_at ? new Date(itinerary.updated_at).toLocaleDateString() : 'Recently updated'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Itinerary</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{itinerary?.title}"? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Share Link Modal */}
      <AlertDialog open={showShareModal} onOpenChange={setShowShareModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Share Itinerary</AlertDialogTitle>
            <AlertDialogDescription>
              Share this itinerary with others. The link will be copied to your
              clipboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleShareLinkConfirm}>
              Share Link
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Duplicate Modal */}
      <AlertDialog
        open={showDuplicateModal}
        onOpenChange={setShowDuplicateModal}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Duplicate Itinerary</AlertDialogTitle>
            <AlertDialogDescription>
              Create a copy of "{itinerary?.title}"? The duplicate will be saved
              as a draft.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDuplicateConfirm}>
              Duplicate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Archive Modal */}
      <AlertDialog open={showArchiveModal} onOpenChange={setShowArchiveModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Archive Itinerary</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to archive "{itinerary?.title}"? This action
              can be undone later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleArchiveConfirm}>
              Archive
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View on Website Modal */}
      <AlertDialog open={showViewModal} onOpenChange={setShowViewModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>View on Website</AlertDialogTitle>
            <AlertDialogDescription>
              Open "{itinerary?.title}" in a new tab to see how it appears on
              your website?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleViewOnWebsiteConfirm}>
              Open Website
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ProDashboardLayout>
  );
}
