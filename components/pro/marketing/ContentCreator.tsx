"use client";

import React, { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  FileText,
  PenTool,
  Mail,
  Globe,
  Megaphone,
  Copy,
  Download,
  Save,
  RefreshCw,
  Wand2,
  BookOpen,
  MessageSquare,
  Star,
  Users,
  Target,
  Zap,
  Eye,
  CheckCircle,
  Edit,
  Sparkles,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Smartphone,
  Monitor,
  Palette,
  Settings,
  Lightbulb,
  TrendingUp,
  Clock,
  Heart,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Maximize2,
  Minimize2,
  Plus,
  ArrowRight,
  Sparkle,
  Upload,
} from "lucide-react";
import { settingsService } from "@/lib/settings-service";

interface ContentType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  category: "social" | "advertising" | "content" | "email";
  format: string;
  wordCount: string;
}

interface GeneratedContent {
  id: string;
  type: string;
  title: string;
  content: string;
  wordCount: number;
  tone: string;
  createdAt: string;
  rating?: number;
  platform?: string;
}

interface BrandVoice {
  tone: string;
  style: string;
  keywords: string[];
  examples: string[];
}

const ContentCreator: React.FC = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [selectedContentType, setSelectedContentType] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] =
    useState<GeneratedContent | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [brandVoice, setBrandVoice] = useState<BrandVoice>({
    tone: "friendly",
    style: "conversational",
    keywords: ["authentic", "immersive", "cultural"],
    examples: [],
  });
  const [showImageModal, setShowImageModal] = useState(false);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [imageStyle, setImageStyle] = useState("realistic");
  const [imageAspectRatio, setImageAspectRatio] = useState("1:1");
  const [imagePrompt, setImagePrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  // Form data state
  const [formData, setFormData] = useState({
    experienceTitle: "",
    location: "",
    keyCulturalElements: "",
    targetAudience: "cultural-travelers",
    tone: "friendly",
  });

  const contentTypes: ContentType[] = [
    {
      id: "instagram-caption",
      name: "Instagram Caption",
      icon: <Instagram className="h-5 w-5" />,
      description: "Engaging captions for Instagram posts",
      category: "social",
      format: "Short, catchy with emojis",
      wordCount: "50-100 words",
    },
    {
      id: "tiktok-hook",
      name: "TikTok Hook",
      icon: <Smartphone className="h-5 w-5" />,
      description: "Attention-grabbing hooks for TikTok",
      category: "social",
      format: "First 3 seconds hook",
      wordCount: "10-20 words",
    },
    {
      id: "google-ad",
      name: "Google Ad Copy",
      icon: <Target className="h-5 w-5" />,
      description: "High-converting ad copy for Google Ads",
      category: "advertising",
      format: "Headline + Description",
      wordCount: "30-90 characters",
    },
    {
      id: "facebook-ad",
      name: "Facebook Ad",
      icon: <Facebook className="h-5 w-5" />,
      description: "Engaging ad copy for Facebook/Instagram",
      category: "advertising",
      format: "Primary text + Headlines",
      wordCount: "125 characters",
    },
    {
      id: "blog-post",
      name: "Blog Post",
      icon: <BookOpen className="h-5 w-5" />,
      description: "SEO-optimized blog content",
      category: "content",
      format: "Introduction + Body + Conclusion",
      wordCount: "500-1000 words",
    },
    {
      id: "email-newsletter",
      name: "Email Newsletter",
      icon: <Mail className="h-5 w-5" />,
      description: "Engaging email content for campaigns",
      category: "email",
      format: "Subject line + Body",
      wordCount: "200-500 words",
    },
    {
      id: "whatsapp-script",
      name: "WhatsApp Script",
      icon: <MessageSquare className="h-5 w-5" />,
      description: "Personalized messaging scripts",
      category: "social",
      format: "Conversational tone",
      wordCount: "50-150 words",
    },
    {
      id: "event-flyer",
      name: "Event Flyer",
      icon: <Megaphone className="h-5 w-5" />,
      description: "Compelling event descriptions",
      category: "content",
      format: "Headline + Benefits + CTA",
      wordCount: "100-200 words",
    },
  ];

  const handleGenerateContent = async () => {
    if (!selectedContentType || !formData.experienceTitle || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentType: selectedContentType,
          experienceTitle: formData.experienceTitle,
          location: formData.location,
          keyCulturalElements: formData.keyCulturalElements,
          targetAudience: formData.targetAudience,
          tone: formData.tone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate content");
      }

      const data = await response.json();
      
      // Handle different content types
      let content = "";
      let wordCount = 0;
      
      if (selectedContentType === "google-ad-copy" && typeof data.content === "object") {
        // For Google Ads, format the JSON response
        content = `Headline 1: ${data.content.headline1 || ""}
Headline 2: ${data.content.headline2 || ""}
Headline 3: ${data.content.headline3 || ""}
Description 1: ${data.content.description1 || ""}
Description 2: ${data.content.description2 || ""}`;
        wordCount = content.split(" ").length;
      } else {
        content = data.content;
        wordCount = content.split(" ").length;
      }

      const generatedContent: GeneratedContent = {
        id: Date.now().toString(),
        type: selectedContentType,
        title: `Generated ${getContentTypeName(selectedContentType)}`,
        content: content,
        wordCount: wordCount,
        tone: formData.tone,
        createdAt: new Date().toISOString(),
        platform: getPlatformName(selectedContentType),
      };

      setGeneratedContent(generatedContent);
      
      if (data.note) {
        toast.success("Content generated successfully!", {
          description: data.note,
        });
      } else {
        toast.success("Content generated successfully!");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleQuickEdit = (action: string) => {
    if (!generatedContent) return;

    toast.success(`Content updated: ${action}`);
    // Here you would call the AI API to modify the content
  };

  const handleSaveContent = async () => {
    if (!generatedContent) return;
    
    try {
      // Save using the settings service
      await settingsService.saveMarketingContent(generatedContent);
      
      toast.success("Content saved to library!", {
        description: "Your content has been saved and can be accessed from the library.",
      });
    } catch (error) {
      console.error('Error saving marketing content:', error);
      toast.error("Failed to save content", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    }
  };

  const handleCopyContent = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent.content);
    toast.success("Content copied to clipboard!");
  };

  const handleGenerateImages = async () => {
    if (!selectedContentType || !formData.experienceTitle || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGeneratingImages(true);

    try {
      const response = await fetch("/api/generate-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          experienceTitle: formData.experienceTitle,
          location: formData.location,
          keyCulturalElements: formData.keyCulturalElements,
          targetAudience: formData.targetAudience,
          tone: formData.tone,
          contentType: selectedContentType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate images");
      }

      const data = await response.json();
      setGeneratedImages(data.images);
      setShowImageModal(false);
      
      if (data.note) {
        toast.success("Images generated successfully!", {
          description: data.note,
        });
      } else {
        toast.success("Images generated successfully!");
      }
    } catch (error) {
      console.error("Error generating images:", error);
      toast.error("Failed to generate images", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setIsGeneratingImages(false);
    }
  };

  const getContentTypeName = (type: string) => {
    const contentType = contentTypes.find((ct) => ct.id === type);
    return contentType?.name || "Content";
  };

  const getPlatformName = (type: string) => {
    if (type.includes("instagram")) return "Instagram";
    if (type.includes("tiktok")) return "TikTok";
    if (type.includes("google")) return "Google Ads";
    return "General";
  };

  const getContentTypeIcon = (type: string) => {
    const contentType = contentTypes.find((ct) => ct.id === type);
    return contentType?.icon || <FileText className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-8 w-8 text-culturin-indigo" />
          <h1 className="text-3xl font-bold text-gray-900">Marketing HQ</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your personal AI copywriter for tours, social media, and campaigns
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <Zap className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <TrendingUp className="h-3 w-3 mr-1" />
            Performance Optimized
          </Badge>
        </div>
      </div>

      {/* AI Assistant Welcome */}
      <Card className="bg-gradient-to-r from-culturin-indigo/5 to-purple-50 border-culturin-indigo/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-culturin-indigo/10 rounded-full">
              <Sparkle className="h-5 w-5 text-culturin-indigo" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                Hey there! Ready to create some amazing content?
              </h3>
              <p className="text-gray-600">
                I'm your AI marketing assistant. Let's write content that makes
                your cultural experiences irresistible! Pick a content type
                below and I'll help you craft compelling copy that converts.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="create" className="flex items-center gap-2">
            <PenTool className="h-4 w-4" />
            Create
          </TabsTrigger>
          <TabsTrigger value="brand-voice" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Brand Voice
          </TabsTrigger>
          <TabsTrigger value="library" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Library
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Content Type Selection */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="h-5 w-5" />
                    Choose Content Type
                  </CardTitle>
                  <CardDescription>
                    Select the type of content you want to create
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    {contentTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedContentType === type.id
                            ? "border-culturin-indigo bg-culturin-indigo/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedContentType(type.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            {type.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {type.name}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {type.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {type.format}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {type.wordCount}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Content Creation Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Content Details</CardTitle>
                  <CardDescription>
                    {selectedContentType
                      ? `Create ${
                          contentTypes.find((t) => t.id === selectedContentType)
                            ?.name
                        }`
                      : "Select a content type to get started"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedContentType ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Experience Title</Label>
                          <Input 
                            placeholder="Traditional Cooking Class in Barcelona"
                            value={formData.experienceTitle}
                            onChange={(e) => setFormData({ ...formData, experienceTitle: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input 
                            placeholder="Barcelona, Spain"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Key Cultural Elements</Label>
                        <Textarea
                          placeholder="Think: local dishes, traditions, hidden gems, cultural significance..."
                          className="min-h-[100px]"
                          value={formData.keyCulturalElements}
                          onChange={(e) => setFormData({ ...formData, keyCulturalElements: e.target.value })}
                        />
                        <p className="text-xs text-gray-500">
                          Tip: Include specific cultural details, traditions,
                          and what makes this experience unique
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Target Audience</Label>
                          <Select 
                            value={formData.targetAudience}
                            onValueChange={(value) => setFormData({ ...formData, targetAudience: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cultural-travelers">
                                Cultural Travelers
                              </SelectItem>
                              <SelectItem value="food-enthusiasts">
                                Food Enthusiasts
                              </SelectItem>
                              <SelectItem value="art-lovers">
                                Art Lovers
                              </SelectItem>
                              <SelectItem value="luxury-travelers">
                                Luxury Travelers
                              </SelectItem>
                              <SelectItem value="adventure-seekers">
                                Adventure Seekers
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Tone</Label>
                          <Select 
                            value={formData.tone}
                            onValueChange={(value) => setFormData({ ...formData, tone: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="friendly">
                                Friendly & Approachable
                              </SelectItem>
                              <SelectItem value="luxury">
                                Luxury & Premium
                              </SelectItem>
                              <SelectItem value="adventurous">
                                Adventurous & Exciting
                              </SelectItem>
                              <SelectItem value="educational">
                                Educational & Informative
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <Button
                          onClick={handleGenerateContent}
                          disabled={isGenerating}
                          className="flex-1 bg-culturin-indigo hover:bg-culturin-indigo/90"
                        >
                          {isGenerating ? (
                            <>
                              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                              Creating magic...
                            </>
                          ) : (
                            <>
                              <Sparkles className="mr-2 h-4 w-4" />
                              Generate Content
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-culturin-indigo text-culturin-indigo hover:bg-culturin-indigo/10"
                          onClick={() => setShowImageModal(true)}
                        >
                          <Wand2 className="mr-2 h-4 w-4" />
                          Generate Images
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Wand2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Select a content type to start creating</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Generated Content Display */}
          {generatedContent && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getContentTypeIcon(generatedContent.type)}
                    <div>
                      <CardTitle>{generatedContent.title}</CardTitle>
                      <CardDescription>
                        {generatedContent.platform} •{" "}
                        {generatedContent.wordCount} words •{" "}
                        {generatedContent.tone} tone
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyContent}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSaveContent}
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm">
                    {generatedContent.content}
                  </pre>
                </div>

                {/* Quick Edit Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickEdit("shorter")}
                  >
                    <Minimize2 className="h-3 w-3 mr-1" />
                    Make Shorter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickEdit("more playful")}
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    More Playful
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickEdit("add emojis")}
                  >
                    <Heart className="h-3 w-3 mr-1" />
                    Add Emojis
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickEdit("focus on families")}
                  >
                    <Users className="h-3 w-3 mr-1" />
                    Family Focus
                  </Button>
                </div>

                {/* Live Preview */}
                {showPreview && (
                  <div className="border rounded-lg p-4 bg-white">
                    <h4 className="font-medium mb-3">Live Preview</h4>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="bg-white p-3 rounded border">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                          <div>
                            <div className="font-medium text-sm">
                              Your Business
                            </div>
                            <div className="text-xs text-gray-500">
                              Sponsored
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-200 h-48 rounded mb-3 flex items-center justify-center text-gray-500">
                          [Image Placeholder]
                        </div>
                        <div className="text-sm">
                          {generatedContent.content}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Generated Images Display */}
          {generatedImages.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Wand2 className="h-5 w-5 text-culturin-indigo" />
                    <div>
                      <CardTitle>Generated Images</CardTitle>
                      <CardDescription>
                        {generatedImages.length} images generated • {imageStyle}{" "}
                        style • {imageAspectRatio} ratio
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowImageModal(true)}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Regenerate
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        // Save images to library
                        toast.success("Images saved to library!");
                      }}
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {generatedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Generated image ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white text-gray-900 hover:bg-gray-100"
                          onClick={() => {
                            // Download image
                            toast.success("Image downloaded!");
                          }}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white text-gray-900 hover:bg-gray-100"
                          onClick={() => {
                            // Copy image URL
                            navigator.clipboard.writeText(image);
                            toast.success("Image URL copied!");
                          }}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy URL
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="brand-voice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Teach AI Your Brand Voice
              </CardTitle>
              <CardDescription>
                Help the AI understand your brand's personality and tone
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Brand Tone</Label>
                    <Select
                      value={brandVoice.tone}
                      onValueChange={(value) =>
                        setBrandVoice({ ...brandVoice, tone: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly">
                          Friendly & Approachable
                        </SelectItem>
                        <SelectItem value="luxury">Luxury & Premium</SelectItem>
                        <SelectItem value="adventurous">
                          Adventurous & Exciting
                        </SelectItem>
                        <SelectItem value="educational">
                          Educational & Informative
                        </SelectItem>
                        <SelectItem value="professional">
                          Professional & Trustworthy
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Writing Style</Label>
                    <Select
                      value={brandVoice.style}
                      onValueChange={(value) =>
                        setBrandVoice({ ...brandVoice, style: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conversational">
                          Conversational
                        </SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="storytelling">
                          Storytelling
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Brand Keywords</Label>
                    <Input
                      placeholder="authentic, immersive, cultural, local..."
                      value={brandVoice.keywords.join(", ")}
                      onChange={(e) =>
                        setBrandVoice({
                          ...brandVoice,
                          keywords: e.target.value.split(", "),
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Upload Past Content (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Upload 2-3 past posts or website copy to help AI learn
                        your style
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Brand Voice Preview</Label>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Based on your settings, your content will sound:{" "}
                        <span className="font-medium text-gray-900">
                          {brandVoice.tone} and {brandVoice.style}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Library</CardTitle>
              <CardDescription>
                Your saved and generated content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>
                  No saved content yet. Generate some content to see it here!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>
                Track how your generated content performs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>
                  Analytics will appear here once you start using generated
                  content
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Image Generation Modal */}
      <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Generate Marketing Images
            </DialogTitle>
            <DialogDescription>
              Create stunning visuals for your content. Choose style, size, and
              customize the prompt.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Style Selection */}
            <div className="space-y-3">
              <Label>Image Style</Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    id: "realistic",
                    name: "Realistic",
                    icon: <FileText className="h-6 w-6" />,
                  },
                  {
                    id: "illustration",
                    name: "Illustration",
                    icon: <Palette className="h-6 w-6" />,
                  },
                  {
                    id: "minimal",
                    name: "Minimal",
                    icon: <Eye className="h-6 w-6" />,
                  },
                ].map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setImageStyle(style.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      imageStyle === style.id
                        ? "border-culturin-indigo bg-culturin-indigo/10"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-2xl mb-1">{style.icon}</div>
                    <div className="text-sm font-medium">{style.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio Selection */}
            <div className="space-y-3">
              <Label>Aspect Ratio</Label>
              <div className="grid grid-cols-4 gap-3">
                {[
                  {
                    id: "1:1",
                    name: "Square",
                    icon: <Target className="h-6 w-6" />,
                  },
                  {
                    id: "16:9",
                    name: "Landscape",
                    icon: <Monitor className="h-6 w-6" />,
                  },
                  {
                    id: "9:16",
                    name: "Portrait",
                    icon: <Smartphone className="h-6 w-6" />,
                  },
                  {
                    id: "4:3",
                    name: "Classic",
                    icon: <Globe className="h-6 w-6" />,
                  },
                ].map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => setImageAspectRatio(ratio.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      imageAspectRatio === ratio.id
                        ? "border-culturin-indigo bg-culturin-indigo/10"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-lg mb-1">{ratio.icon}</div>
                    <div className="text-xs font-medium">{ratio.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Prompt */}
            <div className="space-y-3">
              <Label>Image Prompt</Label>
              <Textarea
                placeholder="Describe the image you want to generate... (e.g., 'A vibrant cooking class in Barcelona with local ingredients and traditional Spanish kitchen')"
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-xs text-gray-500">
                Tip: Be specific about style, mood, and cultural elements for
                better results
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowImageModal(false)}
              disabled={isGeneratingImages}
            >
              Cancel
            </Button>
            <Button
              onClick={handleGenerateImages}
              disabled={isGeneratingImages || !imagePrompt.trim()}
              className="bg-culturin-indigo hover:bg-culturin-indigo/90"
            >
              {isGeneratingImages ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Images
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentCreator;
