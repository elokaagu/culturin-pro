"use client";

import React, { useState } from "react";
import ProDashboardLayout from "../../../../components/pro/ProDashboardLayout";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Edit, Globe, Share2, Copy, Archive, Save, X } from "lucide-react";
import Image from "@/components/ui/image";
import { sampleItineraries } from "@/data/itineraryData";

export default function ItineraryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const itineraryId = params.id as string;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  // Find the itinerary from sample data
  const itinerary = sampleItineraries.find((i) => i.id === itineraryId);

  // Initialize form data when entering edit mode
  const handleEditClick = () => {
    if (itinerary) {
      setFormData({
        title: itinerary.title,
        description: itinerary.description,
        days: itinerary.days,
        regions: itinerary.regions.join(", "),
        themeType: itinerary.themeType,
        status: itinerary.status,
        image: itinerary.image,
      });
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving itinerary:", formData);
    setIsEditing(false);
    // You could show a success toast here
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
                  {isEditing ? "Make changes to your itinerary" : `${itinerary.days} days • ${itinerary.regions.join(", ")}`}
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
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
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
                    src={itinerary.image}
                    alt={itinerary.title}
                    className="w-full h-full object-cover"
                    fill
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/50 text-white">
                      {itinerary.themeType.charAt(0).toUpperCase() +
                        itinerary.themeType.slice(1)}
                    </Badge>
                  </div>
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
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={formData?.description || ""}
                          onChange={(e) => handleInputChange("description", e.target.value)}
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
                          onChange={(e) => handleInputChange("days", parseInt(e.target.value))}
                          className="mt-1"
                          min="1"
                          max="30"
                        />
                      </div>
                      <div>
                        <Label htmlFor="regions">Destinations (comma-separated)</Label>
                        <Input
                          id="regions"
                          value={formData?.regions || ""}
                          onChange={(e) => handleInputChange("regions", e.target.value)}
                          className="mt-1"
                          placeholder="e.g., Paris, Lyon, Nice"
                        />
                      </div>
                      <div>
                        <Label htmlFor="themeType">Theme</Label>
                        <Select
                          value={formData?.themeType || ""}
                          onValueChange={(value) => handleInputChange("themeType", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cultural">Cultural</SelectItem>
                            <SelectItem value="adventure">Adventure</SelectItem>
                            <SelectItem value="culinary">Culinary</SelectItem>
                            <SelectItem value="historical">Historical</SelectItem>
                            <SelectItem value="nature">Nature</SelectItem>
                            <SelectItem value="urban">Urban</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={formData?.status || ""}
                          onValueChange={(value) => handleInputChange("status", value)}
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
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-medium">{itinerary.days} days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Destinations</span>
                        <span className="font-medium">
                          {itinerary.regions.join(", ")}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Theme</span>
                        <span className="font-medium capitalize">
                          {itinerary.themeType}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Status</span>
                        <Badge
                          className={
                            itinerary.status === "published"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }
                        >
                          {itinerary.status === "published"
                            ? "Published"
                            : "Draft"}
                        </Badge>
                      </div>
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
                  <Button className="w-full" variant="outline">
                    <Globe className="h-4 w-4 mr-2" />
                    View on Website
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Link
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
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
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        1.2k
                      </div>
                      <div className="text-sm text-gray-600">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">12</div>
                      <div className="text-sm text-gray-600">Bookings</div>
                    </div>
                    <div className="text-center">
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
                    {itinerary.lastUpdated}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProDashboardLayout>
  );
}
