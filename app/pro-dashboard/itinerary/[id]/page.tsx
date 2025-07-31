"use client";

import React from "react";
import ProDashboardLayout from "../../../../components/pro/ProDashboardLayout";
import { useParams, useNavigate } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Globe, Share2, Copy, Archive } from "lucide-react";
import Image from "@/components/ui/image";
import { sampleItineraries } from "@/data/itineraryData";

export default function ItineraryDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const itineraryId = params.id as string;
  
  // Find the itinerary from sample data
  const itinerary = sampleItineraries.find(i => i.id === itineraryId);
  
  if (!itinerary) {
    return (
      <ProDashboardLayout>
        <div className="p-6">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Itinerary Not Found</h1>
            <p className="text-gray-600 mb-6">The itinerary you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/pro-dashboard/itinerary")}>
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
                onClick={() => navigate("/pro-dashboard/itinerary")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Itineraries
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{itinerary.title}</h1>
                <p className="text-gray-600">{itinerary.days} days • {itinerary.regions.join(", ")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </Button>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Itinerary
              </Button>
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
                      {itinerary.themeType.charAt(0).toUpperCase() + itinerary.themeType.slice(1)}
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
                  <p className="text-gray-700 leading-relaxed">
                    {itinerary.description}
                  </p>
                </CardContent>
              </Card>

              {/* Itinerary Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Itinerary Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{itinerary.days} days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Destinations</span>
                      <span className="font-medium">{itinerary.regions.join(", ")}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Theme</span>
                      <span className="font-medium capitalize">{itinerary.themeType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Status</span>
                      <Badge className={itinerary.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'}>
                        {itinerary.status === 'published' ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                  </div>
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
                      <div className="text-2xl font-bold text-gray-900">1.2k</div>
                      <div className="text-sm text-gray-600">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">12</div>
                      <div className="text-sm text-gray-600">Bookings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">4.8</div>
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
                  <p className="text-sm text-gray-600">{itinerary.lastUpdated}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProDashboardLayout>
  );
} 