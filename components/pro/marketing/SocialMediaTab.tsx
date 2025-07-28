"use client";

import React, { useState, useRef } from "react";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Instagram,
  Facebook,
  Twitter,
  Plus,
  Calendar,
  BarChart3,
  X,
  Loader2,
  Sparkles,
  Copy,
  Check,
  Image as ImageIcon,
  Video,
  FileText,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SocialPost {
  id: string;
  platform: string;
  contentType: string;
  caption: string;
  mediaUrl?: string;
  scheduledDate?: string;
  status: "draft" | "scheduled" | "published";
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    views?: number;
  };
}

const SocialMediaTab = () => {
  const [platform, setPlatform] = useState("instagram");
  const [contentType, setContentType] = useState("post");
  const [caption, setCaption] = useState("");
  const [toneValue, setToneValue] = useState([50]);
  const [experienceType, setExperienceType] = useState("");
  const [keyHighlights, setKeyHighlights] = useState("");
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [scheduledPosts, setScheduledPosts] = useState<SocialPost[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter((file) => {
      const isValidType = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "video/mp4",
        "video/mov",
      ].includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit

      if (!isValidType) {
        toast.error(`${file.name} is not a supported file type`);
        return false;
      }
      if (!isValidSize) {
        toast.error(`${file.name} is too large. Maximum size is 10MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setUploadedFiles((prev) => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} file(s) uploaded successfully`);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    toast.success("File removed");
  };

  const handleGenerateCaption = async () => {
    if (!experienceType || !keyHighlights) {
      toast.error(
        "Please fill in the Experience Type and Key Highlights fields to generate a caption"
      );
      return;
    }

    setIsGeneratingCaption(true);
    setCaption("");

    try {
      const response = await fetch("/api/generate-social-caption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          experienceType,
          keyHighlights,
          tone:
            toneValue[0] < 30
              ? "informative"
              : toneValue[0] > 70
              ? "exciting"
              : "engaging",
          platform,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate caption");
      }

      setCaption(data.caption);
      toast.success("AI caption generated successfully!");
    } catch (error: any) {
      console.error("Error generating caption:", error);
      toast.error(
        error.message || "Failed to generate caption. Please try again."
      );
    } finally {
      setIsGeneratingCaption(false);
    }
  };

  const handleCopyCaption = async () => {
    if (caption) {
      try {
        await navigator.clipboard.writeText(caption);
        toast.success("Caption copied to clipboard!");
      } catch (err) {
        toast.error("Failed to copy caption");
      }
    }
  };

  const handleSchedulePost = () => {
    if (!caption.trim()) {
      toast.error("Please write a caption before scheduling");
      return;
    }

    const newPost: SocialPost = {
      id: Date.now().toString(),
      platform,
      contentType,
      caption,
      mediaUrl:
        uploadedFiles.length > 0
          ? URL.createObjectURL(uploadedFiles[0])
          : undefined,
      scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Schedule for tomorrow
      status: "scheduled",
    };

    setScheduledPosts((prev) => [newPost, ...prev]);
    setCaption("");
    setUploadedFiles([]);
    setExperienceType("");
    setKeyHighlights("");
    toast.success("Post scheduled successfully!");
  };

  const handlePublishNow = () => {
    if (!caption.trim()) {
      toast.error("Please write a caption before publishing");
      return;
    }

    const newPost: SocialPost = {
      id: Date.now().toString(),
      platform,
      contentType,
      caption,
      mediaUrl:
        uploadedFiles.length > 0
          ? URL.createObjectURL(uploadedFiles[0])
          : undefined,
      status: "published",
      engagement: {
        likes: Math.floor(Math.random() * 100),
        comments: Math.floor(Math.random() * 20),
        shares: Math.floor(Math.random() * 10),
      },
    };

    setScheduledPosts((prev) => [newPost, ...prev]);
    setCaption("");
    setUploadedFiles([]);
    setExperienceType("");
    setKeyHighlights("");
    toast.success("Post published successfully!");
  };

  const handlePreview = () => {
    if (!caption.trim()) {
      toast.error("Please write a caption before previewing");
      return;
    }
    setIsPreviewOpen(true);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-4 w-4" />;
      case "facebook":
        return <Facebook className="h-4 w-4" />;
      case "twitter":
        return <Twitter className="h-4 w-4" />;
      default:
        return <Instagram className="h-4 w-4" />;
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "post":
        return <ImageIcon className="h-4 w-4" />;
      case "story":
        return <FileText className="h-4 w-4" />;
      case "reel":
        return <Video className="h-4 w-4" />;
      default:
        return <ImageIcon className="h-4 w-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "facebook":
        return "bg-blue-600";
      case "twitter":
        return "bg-blue-400";
      default:
        return "bg-gray-600";
    }
  };

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

                {/* AI Caption Generator Fields */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    <Label className="text-sm font-medium">
                      AI Caption Generator
                    </Label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="experience-type">Experience Type</Label>
                      <Input
                        id="experience-type"
                        placeholder="e.g., Traditional Cooking Class"
                        value={experienceType}
                        onChange={(e) => setExperienceType(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="key-highlights">Key Highlights</Label>
                      <Input
                        id="key-highlights"
                        placeholder="e.g., local ingredients, family recipes"
                        value={keyHighlights}
                        onChange={(e) => setKeyHighlights(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Tone Adjustment
                    </Label>
                    <div className="space-y-2">
                      <Slider
                        value={toneValue}
                        onValueChange={setToneValue}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Informative</span>
                        <span>Exciting</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleGenerateCaption}
                    disabled={
                      isGeneratingCaption || !experienceType || !keyHighlights
                    }
                    className="w-full"
                  >
                    {isGeneratingCaption ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate AI Caption
                      </>
                    )}
                  </Button>
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
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyCaption}
                      disabled={!caption}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Media Upload</Label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-1">Upload a file</p>
                    <p className="text-xs text-gray-500">or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-2">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {/* Uploaded Files Preview */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Files</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="relative border rounded-lg p-2"
                        >
                          <div className="aspect-square bg-gray-100 rounded flex items-center justify-center">
                            {file.type.startsWith("image/") ? (
                              <ImageIcon className="h-8 w-8 text-gray-400" />
                            ) : (
                              <Video className="h-8 w-8 text-gray-400" />
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1 truncate">
                            {file.name}
                          </p>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-1 right-1 h-6 w-6 p-0"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button onClick={handleSchedulePost} className="flex-1">
                    Schedule Post
                  </Button>
                  <Button variant="outline" onClick={handlePreview}>
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview Modal */}
          <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Post Preview</DialogTitle>
                <DialogDescription>
                  How your post will appear on {platform}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Platform Header */}
                <div
                  className={`flex items-center gap-2 p-3 rounded-lg text-white ${getPlatformColor(
                    platform
                  )}`}
                >
                  {getPlatformIcon(platform)}
                  <span className="font-medium capitalize">{platform}</span>
                </div>

                {/* Post Content */}
                <div className="border rounded-lg p-4 space-y-3">
                  {/* Media Placeholder */}
                  {uploadedFiles.length > 0 && (
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      {uploadedFiles[0].type.startsWith("image/") ? (
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      ) : (
                        <Video className="h-12 w-12 text-gray-400" />
                      )}
                      <span className="text-sm text-gray-500 ml-2">
                        {uploadedFiles[0].name}
                      </span>
                    </div>
                  )}

                  {/* Caption */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {caption}
                    </p>

                    {/* Engagement Stats (if published) */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>0</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>0</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share className="h-4 w-4" />
                        <span>0</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handlePublishNow} className="flex-1">
                    Publish Now
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsPreviewOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Posts</CardTitle>
                <CardDescription>
                  Manage your scheduled social media content
                </CardDescription>
              </CardHeader>
              <CardContent>
                {scheduledPosts.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No scheduled posts
                    </h3>
                    <p className="text-gray-600">
                      Create and schedule your first post to see it here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {scheduledPosts.map((post) => (
                      <div
                        key={post.id}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getPlatformIcon(post.platform)}
                            {getContentTypeIcon(post.contentType)}
                            <Badge
                              variant={
                                post.status === "published"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {post.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            {post.scheduledDate && (
                              <>
                                <Clock className="h-4 w-4" />
                                {new Date(
                                  post.scheduledDate
                                ).toLocaleDateString()}
                              </>
                            )}
                          </div>
                        </div>

                        <p className="text-sm text-gray-700 line-clamp-2">
                          {post.caption}
                        </p>

                        {post.engagement && (
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              {post.engagement.likes}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              {post.engagement.comments}
                            </div>
                            <div className="flex items-center gap-1">
                              <Share className="h-4 w-4" />
                              {post.engagement.shares}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Analytics</CardTitle>
                <CardDescription>
                  Track your social media performance and engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Analytics Coming Soon
                  </h3>
                  <p className="text-gray-600">
                    Track engagement, reach, and performance metrics
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
