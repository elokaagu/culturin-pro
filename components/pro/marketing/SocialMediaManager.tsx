"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import {
  Instagram,
  Facebook,
  Twitter,
  Calendar as CalendarIcon,
  Image,
  Video,
  Hash,
  Eye,
  Heart,
  MessageCircle,
  Share,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  BarChart3,
  Clock,
  Users,
  TrendingUp,
  Camera,
  Palette,
  Zap,
  Loader2,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface SocialPost {
  id: string;
  platform: "Instagram" | "Facebook" | "Twitter" | "TikTok";
  content: string;
  status: "Draft" | "Scheduled" | "Published";
  scheduledDate?: string;
  mediaType: "Image" | "Video" | "Carousel" | "Story";
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views?: number;
  };
  hashtags: string[];
  createdDate: string;
}

interface ContentIdea {
  id: string;
  title: string;
  category: string;
  description: string;
  platforms: string[];
  engagement: "High" | "Medium" | "Low";
}

const SocialMediaManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [toneValue, setToneValue] = useState<number>(50);

  // AI Caption Generator states
  const [experienceType, setExperienceType] = useState("");
  const [keyHighlights, setKeyHighlights] = useState("");
  const [captionTone, setCaptionTone] = useState("engaging");
  const [captionPlatform, setCaptionPlatform] = useState("Instagram");
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);

  const mockPosts: SocialPost[] = [
    {
      id: "1",
      platform: "Instagram",
      content:
        "Discover the hidden culinary gems of Barcelona! 🍷✨ Join our authentic tapas tour and taste centuries-old recipes passed down through generations. #Barcelona #CulturalFood #AuthenticExperience",
      status: "Published",
      mediaType: "Carousel",
      engagement: { likes: 324, comments: 28, shares: 15, views: 2847 },
      hashtags: ["#Barcelona", "#CulturalFood", "#AuthenticExperience"],
      createdDate: "2024-05-20",
    },
    {
      id: "2",
      platform: "Facebook",
      content:
        "This weekend: Traditional Pottery Workshop in Kyoto! Learn ancient techniques from master craftsmen and create your own ceramic masterpiece to take home.",
      status: "Scheduled",
      scheduledDate: "2024-05-25",
      mediaType: "Video",
      engagement: { likes: 0, comments: 0, shares: 0 },
      hashtags: ["#Kyoto", "#Pottery", "#TraditionalCrafts"],
      createdDate: "2024-05-22",
    },
    {
      id: "3",
      platform: "Twitter",
      content:
        "Cultural tip: Did you know that the traditional tea ceremony in Japan can take up to 4 hours? It's not just about drinking tea - it's a meditation on mindfulness and respect. 🍵 #CulturalWisdom",
      status: "Draft",
      mediaType: "Image",
      engagement: { likes: 0, comments: 0, shares: 0 },
      hashtags: ["#CulturalWisdom", "#Japan", "#TeaCeremony"],
      createdDate: "2024-05-23",
    },
  ];

  const contentIdeas: ContentIdea[] = [
    {
      id: "1",
      title: "Behind the Scenes: Local Artisan Spotlight",
      category: "Educational",
      description:
        "Feature local craftspeople and their traditional techniques",
      platforms: ["Instagram", "Facebook"],
      engagement: "High",
    },
    {
      id: "2",
      title: "Cultural Recipe of the Week",
      category: "Food & Culture",
      description:
        "Share traditional recipes with cultural context and history",
      platforms: ["Instagram", "TikTok"],
      engagement: "High",
    },
    {
      id: "3",
      title: "Guest Experience Stories",
      category: "User Generated",
      description:
        "Showcase guest photos and testimonials from recent experiences",
      platforms: ["Instagram", "Facebook", "Twitter"],
      engagement: "Medium",
    },
    {
      id: "4",
      title: "Cultural Calendar Events",
      category: "Educational",
      description:
        "Highlight upcoming cultural festivals and local celebrations",
      platforms: ["Facebook", "Twitter"],
      engagement: "Medium",
    },
    {
      id: "5",
      title: "Quick Cultural Facts",
      category: "Educational",
      description: "Share interesting facts about local culture and traditions",
      platforms: ["Twitter", "Instagram Stories"],
      engagement: "High",
    },
  ];

  const handleCreatePost = () => {
    toast.success("Your social media post has been created successfully.");
    setIsCreatePostOpen(false);
  };

  const handleSchedulePost = () => {
    toast.success("Your post has been scheduled for publishing.");
  };

  const handlePublishPost = (postId: string) => {
    toast.success("Your post has been published successfully.");
  };

  const handleGenerateCaption = async () => {
    if (!experienceType || !keyHighlights) {
      toast.error(
        "Please fill in the Experience Type and Key Highlights fields."
      );
      return;
    }

    setIsGeneratingCaption(true);
    setGeneratedCaption("");

    try {
      const response = await fetch("/api/generate-social-caption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          experienceType,
          keyHighlights,
          tone: captionTone,
          platform: captionPlatform,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate caption");
      }

      setGeneratedCaption(data.caption);
      toast.success("Caption generated successfully!");
    } catch (error: any) {
      console.error("Error generating caption:", error);
      toast.error(
        error.message || "Failed to generate caption. Please try again."
      );
      setGeneratedCaption(
        "Sorry, there was an error generating the caption. Please try again."
      );
    } finally {
      setIsGeneratingCaption(false);
    }
  };

  const handleCopyCaption = async () => {
    if (generatedCaption) {
      try {
        await navigator.clipboard.writeText(generatedCaption);
        setCopiedCaption(true);
        toast.success("Caption copied to clipboard!");
        setTimeout(() => setCopiedCaption(false), 2000);
      } catch (err) {
        toast.error("Failed to copy caption");
      }
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Instagram":
        return <Instagram className="h-4 w-4" />;
      case "Facebook":
        return <Facebook className="h-4 w-4" />;
      case "Twitter":
        return <Twitter className="h-4 w-4" />;
      case "TikTok":
        return <Video className="h-4 w-4" />;
      default:
        return <Share className="h-4 w-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "Instagram":
        return "bg-pink-100 text-pink-800";
      case "Facebook":
        return "bg-blue-100 text-blue-800";
      case "Twitter":
        return "bg-sky-100 text-sky-800";
      case "TikTok":
        return "bg-black text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case "High":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Social Media Manager</h2>
          <p className="text-gray-600">
            Create, schedule, and analyze your social media content
          </p>
        </div>
        <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Social Media Post</DialogTitle>
              <DialogDescription>
                Create and schedule content for your social media platforms
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Platform</label>
                  <Select defaultValue="instagram">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content Type</label>
                  <Select defaultValue="image">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image Post</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="carousel">Carousel</SelectItem>
                      <SelectItem value="story">Story</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Post Content</label>
                <Textarea
                  placeholder="Write your post content here..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tone</label>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">Professional</span>
                  <Slider
                    value={[toneValue]}
                    onValueChange={(value) => setToneValue(value[0])}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-500">Casual</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Hashtags</label>
                <Input placeholder="#culture #travel #authentic" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Media Upload</label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <Camera className="mx-auto h-8 w-8 text-gray-400" />
                  <div className="mt-1 text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload media</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, MP4 up to 50MB
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsCreatePostOpen(false)}
                >
                  Save as Draft
                </Button>
                <Button onClick={handleCreatePost}>Schedule Post</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="ideas">Content Ideas</TabsTrigger>
          <TabsTrigger value="tools">AI Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Posts</p>
                    <p className="text-2xl font-bold">127</p>
                  </div>
                  <Share className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 8% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Engagement</p>
                    <p className="text-2xl font-bold">4.2%</p>
                  </div>
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 1.3% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Followers</p>
                    <p className="text-2xl font-bold">2,847</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 15% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Reach</p>
                    <p className="text-2xl font-bold">18.5K</p>
                  </div>
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 22% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {mockPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className={getPlatformColor(post.platform)}>
                          <div className="flex items-center gap-1">
                            {getPlatformIcon(post.platform)}
                            {post.platform}
                          </div>
                        </Badge>
                        <Badge className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                        <Badge variant="outline">{post.mediaType}</Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        {post.hashtags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {post.status === "Published" && (
                        <div className="flex items-center gap-6 text-sm text-gray-500">
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
                          {post.engagement.views && (
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {post.engagement.views}
                            </div>
                          )}
                        </div>
                      )}
                      {post.scheduledDate && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <CalendarIcon className="h-4 w-4" />
                          Scheduled: {post.scheduledDate}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {post.status === "Draft" && (
                        <Button
                          size="sm"
                          onClick={() => handlePublishPost(post.id)}
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Publish
                        </Button>
                      )}
                      {post.status === "Scheduled" && (
                        <Button variant="outline" size="sm">
                          <Pause className="h-4 w-4 mr-1" />
                          Pause
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Content Calendar</CardTitle>
                  <CardDescription>
                    Plan and schedule your social media content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Posts</CardTitle>
                  <CardDescription>
                    Upcoming posts for this week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockPosts
                      .filter((p) => p.status === "Scheduled")
                      .map((post) => (
                        <div key={post.id} className="border rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getPlatformColor(post.platform)}>
                              <div className="flex items-center gap-1">
                                {getPlatformIcon(post.platform)}
                                {post.platform}
                              </div>
                            </Badge>
                            <Badge variant="outline">{post.mediaType}</Badge>
                          </div>
                          <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                            {post.content}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {post.scheduledDate}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Likes</p>
                    <p className="text-2xl font-bold">8,429</p>
                  </div>
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 18% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Comments</p>
                    <p className="text-2xl font-bold">1,247</p>
                  </div>
                  <MessageCircle className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Shares</p>
                    <p className="text-2xl font-bold">356</p>
                  </div>
                  <Share className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 8% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Profile Visits</p>
                    <p className="text-2xl font-bold">2,847</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-red-600 mt-1">
                  ↓ 3% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Platform Performance</CardTitle>
              <CardDescription>
                Compare performance across different platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    platform: "Instagram",
                    followers: 1847,
                    engagement: 5.2,
                    posts: 45,
                    growth: 12,
                  },
                  {
                    platform: "Facebook",
                    followers: 892,
                    engagement: 3.8,
                    posts: 32,
                    growth: 8,
                  },
                  {
                    platform: "Twitter",
                    followers: 634,
                    engagement: 2.4,
                    posts: 78,
                    growth: -2,
                  },
                  {
                    platform: "TikTok",
                    followers: 423,
                    engagement: 8.1,
                    posts: 12,
                    growth: 28,
                  },
                ].map((platform, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge className={getPlatformColor(platform.platform)}>
                          <div className="flex items-center gap-1">
                            {getPlatformIcon(platform.platform)}
                            {platform.platform}
                          </div>
                        </Badge>
                      </div>
                      <div
                        className={`text-sm ${
                          platform.growth >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {platform.growth >= 0 ? "↑" : "↓"}{" "}
                        {Math.abs(platform.growth)}%
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Followers</p>
                        <p className="font-medium">
                          {platform.followers.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Engagement</p>
                        <p className="font-medium">{platform.engagement}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Posts</p>
                        <p className="font-medium">{platform.posts}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Growth</p>
                        <p className="font-medium">
                          {platform.growth >= 0 ? "+" : ""}
                          {platform.growth}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ideas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Ideas & Inspiration</CardTitle>
              <CardDescription>
                AI-generated content ideas tailored for cultural experiences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contentIdeas.map((idea) => (
                  <Card
                    key={idea.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className={getEngagementColor(idea.engagement)}>
                          {idea.engagement} Engagement
                        </Badge>
                        <Badge variant="outline">{idea.category}</Badge>
                      </div>
                      <h3 className="font-semibold mb-2">{idea.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {idea.description}
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        {idea.platforms.map((platform, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {platform}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" className="w-full">
                        Use This Idea
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button className="w-full mt-4">
                <Zap className="h-4 w-4 mr-2" />
                Generate More Ideas
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  AI Caption Generator
                </CardTitle>
                <CardDescription>
                  Generate engaging captions for your posts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Experience Type</label>
                  <Input
                    placeholder="e.g., Cooking class, Art workshop, Walking tour"
                    value={experienceType}
                    onChange={(e) => setExperienceType(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Key Highlights</label>
                  <Textarea
                    placeholder="What makes this experience special?"
                    value={keyHighlights}
                    onChange={(e) => setKeyHighlights(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Platform</label>
                    <Select
                      value={captionPlatform}
                      onValueChange={setCaptionPlatform}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="Twitter">Twitter</SelectItem>
                        <SelectItem value="TikTok">TikTok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tone</label>
                    <Select value={captionTone} onValueChange={setCaptionTone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engaging">Engaging</SelectItem>
                        <SelectItem value="professional">
                          Professional
                        </SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="inspiring">Inspiring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  onClick={handleGenerateCaption}
                  disabled={isGeneratingCaption}
                  className="w-full"
                >
                  {isGeneratingCaption ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Caption...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Caption
                    </>
                  )}
                </Button>

                {generatedCaption && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Generated Caption:</h4>
                      <Button
                        onClick={handleCopyCaption}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        {copiedCaption ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {generatedCaption}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hashtag Research</CardTitle>
                <CardDescription>
                  Find the best hashtags for your content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content Topic</label>
                  <Input placeholder="e.g., Traditional cooking, Local art" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input placeholder="e.g., Paris, Tokyo, Barcelona" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Audience</label>
                  <Select defaultValue="travelers">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="travelers">
                        Cultural Travelers
                      </SelectItem>
                      <SelectItem value="locals">Local Community</SelectItem>
                      <SelectItem value="foodies">Food Enthusiasts</SelectItem>
                      <SelectItem value="art">Art Lovers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Research Hashtags</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Image Enhancement</CardTitle>
                <CardDescription>
                  Enhance your photos with AI-powered tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <Image className="mx-auto h-8 w-8 text-gray-400" />
                  <div className="mt-1 text-sm text-gray-600">
                    <label
                      htmlFor="enhance-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload image to enhance</span>
                      <input
                        id="enhance-upload"
                        name="enhance-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Enhancement Type
                  </label>
                  <Select defaultValue="auto">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto Enhance</SelectItem>
                      <SelectItem value="brighten">Brighten</SelectItem>
                      <SelectItem value="contrast">
                        Increase Contrast
                      </SelectItem>
                      <SelectItem value="saturation">Boost Colors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">
                  <Palette className="h-4 w-4 mr-2" />
                  Enhance Image
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Best Time to Post</CardTitle>
                <CardDescription>
                  AI recommendations for optimal posting times
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    {
                      platform: "Instagram",
                      time: "6:00 PM - 8:00 PM",
                      engagement: "+23%",
                    },
                    {
                      platform: "Facebook",
                      time: "1:00 PM - 3:00 PM",
                      engagement: "+18%",
                    },
                    {
                      platform: "Twitter",
                      time: "9:00 AM - 10:00 AM",
                      engagement: "+15%",
                    },
                    {
                      platform: "TikTok",
                      time: "7:00 PM - 9:00 PM",
                      engagement: "+31%",
                    },
                  ].map((timing, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Badge className={getPlatformColor(timing.platform)}>
                          <div className="flex items-center gap-1">
                            {getPlatformIcon(timing.platform)}
                            {timing.platform}
                          </div>
                        </Badge>
                        <span className="text-sm">{timing.time}</span>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        {timing.engagement}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button className="w-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Update Analysis
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialMediaManager;
