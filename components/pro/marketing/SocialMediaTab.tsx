"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Upload,
  Instagram,
  Facebook,
  Twitter,
  Plus,
  Calendar,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner";

const SocialMediaTab = () => {
  const [platform, setPlatform] = useState("instagram");
  const [contentType, setContentType] = useState("post");
  const [caption, setCaption] = useState(
    "Write your caption here or use our AI-powered caption generator..."
  );
  const [toneValue, setToneValue] = useState([50]);

  const handleUploadFile = () => {
    toast.info("File upload functionality would open here");
  };

  const handleGenerateCaption = () => {
    toast.success("AI caption generated!");
  };

  const handleSchedulePost = () => {
    toast.success("Post scheduled successfully!");
  };

  const platforms = [
    {
      value: "instagram",
      label: "Instagram",
      icon: <Instagram className="h-4 w-4" />,
    },
    {
      value: "facebook",
      label: "Facebook",
      icon: <Facebook className="h-4 w-4" />,
    },
    {
      value: "twitter",
      label: "Twitter",
      icon: <Twitter className="h-4 w-4" />,
    },
  ];

  const contentTypes = [
    { value: "post", label: "Post" },
    { value: "story", label: "Story" },
    { value: "reel", label: "Reel" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Social Media Manager</h2>
        <p className="text-gray-600">
          Plan, create and schedule social media content for your experiences
        </p>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Social Media Content</CardTitle>
                <CardDescription>
                  Design and write engaging social media posts for your cultural
                  experiences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="platform">Platform</Label>
                    <Select value={platform} onValueChange={setPlatform}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            <div className="flex items-center gap-2">
                              {p.icon}
                              {p.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="content-type">Content Type</Label>
                    <Select value={contentType} onValueChange={setContentType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        {contentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="caption">Caption</Label>
                  <Textarea
                    id="caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Write your caption here or use our AI-powered caption generator..."
                    className="min-h-[120px]"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateCaption}
                    className="mt-2"
                  >
                    Generate AI Caption
                  </Button>
                </div>

                <div>
                  <Label>Tone Adjustment</Label>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Informative</span>
                      <span>Exciting</span>
                    </div>
                    <Slider
                      value={toneValue}
                      onValueChange={setToneValue}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <Label>Media Upload</Label>
                  <div
                    onClick={handleUploadFile}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-blue-600 font-medium">
                      Upload a file
                    </p>
                    <p className="text-sm text-gray-500">or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleSchedulePost} className="flex-1">
                    Schedule Post
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => toast.info("Post preview opened")}
                  >
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Content</CardTitle>
                <CardDescription>
                  Plan your social media content calendar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Social media calendar coming soon
                  </p>
                  <p className="text-sm text-gray-500">
                    Schedule and manage your posts across all platforms
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Analytics</CardTitle>
                <CardDescription>
                  Track your social media performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Analytics dashboard coming soon
                  </p>
                  <p className="text-sm text-gray-500">
                    Monitor engagement, reach, and conversions
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SocialMediaTab;
