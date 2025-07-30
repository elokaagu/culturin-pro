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
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [brandVoice, setBrandVoice] = useState<BrandVoice>({
    tone: "friendly",
    style: "conversational",
    keywords: ["authentic", "immersive", "cultural"],
    examples: []
  });

  const contentTypes: ContentType[] = [
    {
      id: "instagram-caption",
      name: "Instagram Caption",
      icon: <Instagram className="h-5 w-5" />,
      description: "Engaging captions for Instagram posts",
      category: "social",
      format: "Short, catchy with emojis",
      wordCount: "50-100 words"
    },
    {
      id: "tiktok-hook",
      name: "TikTok Hook",
      icon: <Smartphone className="h-5 w-5" />,
      description: "Attention-grabbing hooks for TikTok",
      category: "social",
      format: "First 3 seconds hook",
      wordCount: "10-20 words"
    },
    {
      id: "google-ad",
      name: "Google Ad Copy",
      icon: <Target className="h-5 w-5" />,
      description: "High-converting ad copy for Google Ads",
      category: "advertising",
      format: "Headline + Description",
      wordCount: "30-90 characters"
    },
    {
      id: "facebook-ad",
      name: "Facebook Ad",
      icon: <Facebook className="h-5 w-5" />,
      description: "Engaging ad copy for Facebook/Instagram",
      category: "advertising",
      format: "Primary text + Headlines",
      wordCount: "125 characters"
    },
    {
      id: "blog-post",
      name: "Blog Post",
      icon: <BookOpen className="h-5 w-5" />,
      description: "SEO-optimized blog content",
      category: "content",
      format: "Introduction + Body + Conclusion",
      wordCount: "500-1000 words"
    },
    {
      id: "email-newsletter",
      name: "Email Newsletter",
      icon: <Mail className="h-5 w-5" />,
      description: "Engaging email content for campaigns",
      category: "email",
      format: "Subject line + Body",
      wordCount: "200-500 words"
    },
    {
      id: "whatsapp-script",
      name: "WhatsApp Script",
      icon: <MessageSquare className="h-5 w-5" />,
      description: "Personalized messaging scripts",
      category: "social",
      format: "Conversational tone",
      wordCount: "50-150 words"
    },
    {
      id: "event-flyer",
      name: "Event Flyer",
      icon: <Megaphone className="h-5 w-5" />,
      description: "Compelling event descriptions",
      category: "content",
      format: "Headline + Benefits + CTA",
      wordCount: "100-200 words"
    }
  ];

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockContent: GeneratedContent = {
        id: Date.now().toString(),
        type: selectedContentType,
        title: "Generated Content",
        content: "🌟 Experience the authentic flavors of Barcelona with our Traditional Cooking Class! 🇪🇸\n\nLearn to cook like a local in a charming family kitchen, using time-honored recipes passed down through generations. From paella to tapas, discover the secrets of Spanish cuisine while immersing yourself in the rich cultural traditions of Catalonia.\n\nPerfect for food lovers, culture enthusiasts, and anyone who wants to take home more than just memories! 🍷✨\n\nBook now and save 20% with code: CULTURE20",
        wordCount: 89,
        tone: "friendly",
        createdAt: new Date().toISOString(),
        platform: selectedContentType.includes("instagram") ? "Instagram" : "General"
      };
      
      setGeneratedContent(mockContent);
      setIsGenerating(false);
      toast.success("Content generated successfully!");
    }, 2000);
  };

  const handleQuickEdit = (action: string) => {
    if (!generatedContent) return;
    
    toast.success(`Content updated: ${action}`);
    // Here you would call the AI API to modify the content
  };

  const handleSaveContent = () => {
    if (!generatedContent) return;
    toast.success("Content saved to library!");
  };

  const handleCopyContent = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent.content);
    toast.success("Content copied to clipboard!");
  };

  const getContentTypeIcon = (type: string) => {
    const contentType = contentTypes.find(ct => ct.id === type);
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
                Hey there! 👋 Ready to create some amazing content?
              </h3>
              <p className="text-gray-600">
                I'm your AI marketing assistant. Let's write content that makes your cultural experiences irresistible! 
                Pick a content type below and I'll help you craft compelling copy that converts.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
                            <h4 className="font-medium text-gray-900">{type.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{type.description}</p>
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
                    {selectedContentType ? 
                      `Create ${contentTypes.find(t => t.id === selectedContentType)?.name}` : 
                      "Select a content type to get started"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedContentType ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Experience Title</Label>
                          <Input placeholder="Traditional Cooking Class in Barcelona" />
                        </div>
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input placeholder="Barcelona, Spain" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Key Cultural Elements</Label>
                        <Textarea 
                          placeholder="Think: local dishes, traditions, hidden gems, cultural significance..."
                          className="min-h-[100px]"
                        />
                        <p className="text-xs text-gray-500">
                          💡 Tip: Include specific cultural details, traditions, and what makes this experience unique
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Target Audience</Label>
                          <Select defaultValue="cultural-travelers">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cultural-travelers">Cultural Travelers</SelectItem>
                              <SelectItem value="food-enthusiasts">Food Enthusiasts</SelectItem>
                              <SelectItem value="art-lovers">Art Lovers</SelectItem>
                              <SelectItem value="luxury-travelers">Luxury Travelers</SelectItem>
                              <SelectItem value="adventure-seekers">Adventure Seekers</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Tone</Label>
                          <Select defaultValue="friendly">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="friendly">Friendly & Approachable</SelectItem>
                              <SelectItem value="luxury">Luxury & Premium</SelectItem>
                              <SelectItem value="adventurous">Adventurous & Exciting</SelectItem>
                              <SelectItem value="educational">Educational & Informative</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button 
                        onClick={handleGenerateContent}
                        disabled={isGenerating}
                        className="w-full bg-culturin-indigo hover:bg-culturin-indigo/90"
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
                        {generatedContent.platform} • {generatedContent.wordCount} words • {generatedContent.tone} tone
                      </CardDescription>
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
                  <pre className="whitespace-pre-wrap text-sm">{generatedContent.content}</pre>
                </div>

                {/* Quick Edit Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleQuickEdit("shorter")}>
                    <Minimize2 className="h-3 w-3 mr-1" />
                    Make Shorter
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleQuickEdit("more playful")}>
                    <Sparkles className="h-3 w-3 mr-1" />
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
                    <Select value={brandVoice.tone} onValueChange={(value) => setBrandVoice({...brandVoice, tone: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly">Friendly & Approachable</SelectItem>
                        <SelectItem value="luxury">Luxury & Premium</SelectItem>
                        <SelectItem value="adventurous">Adventurous & Exciting</SelectItem>
                        <SelectItem value="educational">Educational & Informative</SelectItem>
                        <SelectItem value="professional">Professional & Trustworthy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Writing Style</Label>
                    <Select value={brandVoice.style} onValueChange={(value) => setBrandVoice({...brandVoice, style: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conversational">Conversational</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="storytelling">Storytelling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Brand Keywords</Label>
                    <Input 
                      placeholder="authentic, immersive, cultural, local..."
                      value={brandVoice.keywords.join(", ")}
                      onChange={(e) => setBrandVoice({...brandVoice, keywords: e.target.value.split(", ")})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Upload Past Content (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Upload 2-3 past posts or website copy to help AI learn your style
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
                <p>No saved content yet. Generate some content to see it here!</p>
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
                <p>Analytics will appear here once you start using generated content</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentCreator;
