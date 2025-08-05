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
  Sparkles,
  FileText,
  Instagram,
  Facebook,
  Target,
  BookOpen,
  Mail,
  MessageSquare,
  Megaphone,
  Smartphone,
  Monitor,
  Globe,
  Palette,
  Eye,
  Wand2,
  Copy,
  Save,
  Eye as EyeIcon,
  Minimize2,
  Download,
  Zap,
  TrendingUp,
  Sparkle,
  PenTool,
  Heart,
  Users,
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

  // Confirmation modal states
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showGenerateConfirm, setShowGenerateConfirm] = useState(false);

  const contentTypes: ContentType[] = [
    {
      id: "instagram-caption",
      name: "Instagram Caption",
      icon: <Instagram className="h-5 w-5" />,
      description: "Engaging captions for Instagram posts",
      category: "social",
      format: "Short, catchy content",
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
      id: "google-ad-copy",
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

  const handleGenerateCopy = async () => {
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
          copyType: "marketing-copy", // Special flag for copy generation
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate copy");
      }

      const data = await response.json();
      
      // Handle different content types for copy
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
        title: `Generated Marketing Copy - ${getContentTypeName(selectedContentType)}`,
        content: content,
        wordCount: wordCount,
        tone: formData.tone,
        createdAt: new Date().toISOString(),
        platform: getPlatformName(selectedContentType),
      };

      setGeneratedContent(generatedContent);
      
      if (data.note) {
        toast.success("Marketing copy generated successfully!", {
          description: data.note,
        });
      } else {
        toast.success("Marketing copy generated successfully!");
      }
    } catch (error) {
      console.error("Error generating copy:", error);
      toast.error("Failed to generate copy", {
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
    // If no custom prompt is provided, create a default prompt from form data
    let promptToUse = imagePrompt.trim();
    if (!promptToUse) {
      const defaultPrompt = `Create a beautiful marketing image for ${formData.experienceTitle || "a cultural experience"} in ${formData.location || "a destination"}. 
      
Style: ${imageStyle === "realistic" ? "Photorealistic, high-quality photography" : imageStyle === "illustration" ? "Artistic illustration, vibrant colors" : "Minimalist design, clean lines"}
Aspect ratio: ${imageAspectRatio}
Cultural elements: ${formData.keyCulturalElements || "local traditions and authentic experiences"}
Target audience: ${formData.targetAudience || "cultural travelers"}
Tone: ${formData.tone || "friendly and approachable"}

The image should be:
- Visually stunning and professional
- Show authentic cultural elements
- Capture the essence of the experience
- Perfect for marketing and promotion
- High quality and engaging`;

      promptToUse = defaultPrompt;
    }

    setIsGeneratingImages(true);

    try {
      const response = await fetch("/api/generate-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          experienceTitle: formData.experienceTitle || "Cultural Experience",
          location: formData.location || "Destination",
          keyCulturalElements: formData.keyCulturalElements || "",
          targetAudience: formData.targetAudience || "cultural-travelers",
          tone: formData.tone || "friendly",
          contentType: selectedContentType || "general",
          // Modal-specific settings
          imageStyle: imageStyle,
          imageAspectRatio: imageAspectRatio,
          customPrompt: promptToUse,
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
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pl-8">
        <h2 className="text-lg font-medium">Marketing HQ</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={handleGenerateContent} disabled={isGenerating}>
            <Save className="h-4 w-4 mr-2" />
            Generate
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Left Sidebar - Content Types */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Content Types</h3>
              <p className="text-xs text-gray-500">Select the type of content you want to create</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {contentTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedContentType === type.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedContentType(type.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-gray-100 rounded">
                        {type.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {type.name}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {type.description}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
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
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-gray-50">
            <div className="h-full p-6">
              <div className="bg-white rounded-lg border border-gray-200 h-full">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Content Details</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    {selectedContentType
                      ? `Create ${
                          contentTypes.find((t) => t.id === selectedContentType)
                            ?.name
                        }`
                      : "Select a content type to get started"}
                  </p>

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
                          className="flex-1"
                        >
                          {isGenerating ? (
                            <>
                              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                              Generating...
                            </>
                          ) : (
                            <>
                              <FileText className="mr-2 h-4 w-4" />
                              Generate Content
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={handleGenerateCopy}
                          disabled={isGenerating}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Generate Copy
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => setShowImageModal(true)}
                        >
                          <Wand2 className="mr-2 h-4 w-4" />
                          Generate Images
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Select a content type to start creating</p>
                    </div>
                  )}

                  {/* Generated Content Display */}
                  {generatedContent && (
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getContentTypeIcon(generatedContent.type)}
                          <div>
                            <h4 className="font-medium text-gray-900">{generatedContent.title}</h4>
                            <p className="text-sm text-gray-500">
                              {generatedContent.platform} • {generatedContent.wordCount} words • {generatedContent.tone} tone
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={handleCopyContent}>
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleSaveContent}>
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm">{generatedContent.content}</pre>
                      </div>

                      {/* Quick Edit Actions */}
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleQuickEdit("shorter")}>
                          <Minimize2 className="h-3 w-3 mr-1" />
                          Make Shorter
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleQuickEdit("more playful")}>
                          <FileText className="h-3 w-3 mr-1" />
                          More Playful
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleQuickEdit("add emojis")}>
                          <Heart className="h-3 w-3 mr-1" />
                          Add Emojis
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleQuickEdit("focus on families")}>
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
                                  <div className="font-medium text-sm">Your Business</div>
                                  <div className="text-xs text-gray-500">Sponsored</div>
                                </div>
                              </div>
                              <div className="bg-gray-200 h-48 rounded mb-3 flex items-center justify-center text-gray-500">
                                [Image Placeholder]
                              </div>
                              <div className="text-sm">{generatedContent.content}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                            {/* Generated Images Display */}
                  {generatedImages.length > 0 && (
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">Generated Images</h4>
                        <Button variant="outline" size="sm" onClick={() => setGeneratedImages([])}>
                          Clear Images
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {generatedImages.map((imageUrl, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={imageUrl}
                              alt={`Generated marketing image ${index + 1}`}
                              className="w-full h-48 object-cover rounded-lg border border-gray-200"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = imageUrl;
                                    link.download = `marketing-image-${index + 1}.jpg`;
                                    link.click();
                                  }}
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </Button>
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => {
                                    navigator.clipboard.writeText(imageUrl);
                                    toast.success("Image URL copied to clipboard!");
                                  }}
                                >
                                  <Copy className="h-4 w-4 mr-1" />
                                  Copy URL
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500">
                        {generatedImages.length} images generated
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              onClick={() => setShowCancelConfirm(true)}
              disabled={isGeneratingImages}
            >
              Cancel
            </Button>
            <Button
              onClick={() => setShowGenerateConfirm(true)}
              disabled={isGeneratingImages}
              className="bg-culturin-indigo hover:bg-culturin-indigo/90 text-white font-medium px-6 py-2"
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

      {/* Cancel Confirmation Modal */}
      <Dialog open={showCancelConfirm} onOpenChange={setShowCancelConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Cancel Image Generation?</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel? Any unsaved changes will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCancelConfirm(false)}
            >
              Keep Editing
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowCancelConfirm(false);
                setShowImageModal(false);
                setImagePrompt("");
                setImageStyle("realistic");
                setImageAspectRatio("1:1");
              }}
            >
              Cancel Generation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generate Confirmation Modal */}
      <Dialog open={showGenerateConfirm} onOpenChange={setShowGenerateConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Generate Images?</DialogTitle>
            <DialogDescription>
              This will generate 3 AI-powered images based on your settings. 
              {!imagePrompt.trim() && " No custom prompt provided - using default settings."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Style:</span>
              <span className="capitalize">{imageStyle}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">Aspect Ratio:</span>
              <span>{imageAspectRatio}</span>
            </div>
            {imagePrompt.trim() && (
              <div className="flex items-start gap-2 text-sm">
                <span className="font-medium">Custom Prompt:</span>
                <span className="text-gray-600 line-clamp-2">{imagePrompt}</span>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowGenerateConfirm(false)}
            >
              Review Settings
            </Button>
            <Button
              onClick={() => {
                setShowGenerateConfirm(false);
                handleGenerateImages();
              }}
              className="bg-culturin-indigo hover:bg-culturin-indigo/90"
            >
              <Wand2 className="mr-2 h-4 w-4" />
              Generate Images
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentCreator;
