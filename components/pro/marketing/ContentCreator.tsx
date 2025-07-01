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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
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
} from "lucide-react";

interface ContentTemplate {
  id: string;
  name: string;
  type: "Description" | "Blog" | "Email" | "Social" | "Website" | "Ad";
  category: string;
  description: string;
  fields: string[];
  example: string;
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
}

const ContentCreator: React.FC = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [toneValue, setToneValue] = useState<number>(50);
  const [creativityValue, setCreativityValue] = useState<number>(70);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const contentTemplates: ContentTemplate[] = [
    {
      id: "1",
      name: "Experience Description",
      type: "Description",
      category: "Marketing Copy",
      description: "Compelling descriptions for your cultural experiences",
      fields: [
        "Experience Title",
        "Location",
        "Duration",
        "Key Highlights",
        "Target Audience",
      ],
      example:
        "Immerse yourself in the authentic flavors of Barcelona with our Traditional Tapas & Wine Tour...",
    },
    {
      id: "2",
      name: "Blog Post",
      type: "Blog",
      category: "Content Marketing",
      description: "Educational blog posts about culture and travel",
      fields: [
        "Topic",
        "Target Keywords",
        "Key Points",
        "Audience",
        "Word Count",
      ],
      example:
        "Discover the Hidden Culinary Treasures of Barcelona's Gothic Quarter...",
    },
    {
      id: "3",
      name: "Email Newsletter",
      type: "Email",
      category: "Email Marketing",
      description: "Engaging newsletters for your subscribers",
      fields: [
        "Subject Line",
        "Main Topic",
        "Call to Action",
        "Tone",
        "Audience",
      ],
      example:
        "This month in culture: Exclusive access to Barcelona's hidden gems...",
    },
    {
      id: "4",
      name: "Social Media Post",
      type: "Social",
      category: "Social Media",
      description: "Engaging posts for social media platforms",
      fields: [
        "Platform",
        "Experience",
        "Key Message",
        "Hashtags",
        "Call to Action",
      ],
      example:
        "Just finished an incredible pottery workshop in Kyoto! 🏺✨ #CulturalExperience",
    },
    {
      id: "5",
      name: "Website Copy",
      type: "Website",
      category: "Web Content",
      description: "Professional copy for your website pages",
      fields: [
        "Page Type",
        "Business Name",
        "Services",
        "Unique Value",
        "Target Audience",
      ],
      example:
        "Welcome to Authentic Barcelona - Your gateway to genuine cultural experiences...",
    },
    {
      id: "6",
      name: "Advertisement Copy",
      type: "Ad",
      category: "Paid Advertising",
      description: "Compelling ad copy for digital campaigns",
      fields: [
        "Platform",
        "Experience",
        "Offer",
        "Target Audience",
        "Call to Action",
      ],
      example:
        "Book your authentic Barcelona food tour today and save 20%! Limited spots available...",
    },
  ];

  const mockGeneratedContent: GeneratedContent[] = [
    {
      id: "1",
      type: "Experience Description",
      title: "Traditional Cooking Class in Tuscany",
      content:
        "Step into a rustic Tuscan kitchen where generations of culinary wisdom come alive. Our Traditional Cooking Class offers an intimate journey through authentic Italian cuisine, guided by local nonnas who share their family recipes passed down through centuries...",
      wordCount: 156,
      tone: "Warm & Authentic",
      createdAt: "2024-05-20",
      rating: 4.8,
    },
    {
      id: "2",
      type: "Blog Post",
      title: "5 Hidden Cultural Gems in Kyoto",
      content:
        "Beyond the famous temples and bustling streets lies a Kyoto few tourists ever discover. These hidden cultural gems offer authentic glimpses into traditional Japanese life, from secret tea houses to artisan workshops...",
      wordCount: 847,
      tone: "Informative & Inspiring",
      createdAt: "2024-05-18",
      rating: 4.6,
    },
    {
      id: "3",
      type: "Email Newsletter",
      title: "Monthly Culture Digest - May 2024",
      content:
        "This month, we're excited to share some incredible cultural discoveries from our community of travelers. From underground art galleries in Berlin to traditional weaving workshops in Peru...",
      wordCount: 324,
      tone: "Engaging & Personal",
      createdAt: "2024-05-15",
      rating: 4.9,
    },
  ];

  const handleGenerateContent = async () => {
    setIsGenerating(true);

    // Simulate AI content generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Content Generated!",
        description: "Your marketing content has been created successfully.",
      });
    }, 3000);
  };

  const handleSaveContent = (contentId: string) => {
    toast({
      title: "Content Saved",
      description: "Your content has been saved to your library.",
    });
  };

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Content Copied",
      description: "The content has been copied to your clipboard.",
    });
  };

  const getToneLabel = (value: number) => {
    if (value < 25) return "Professional";
    if (value < 50) return "Informative";
    if (value < 75) return "Engaging";
    return "Enthusiastic";
  };

  const getCreativityLabel = (value: number) => {
    if (value < 30) return "Conservative";
    if (value < 60) return "Balanced";
    if (value < 80) return "Creative";
    return "Innovative";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">AI Content Creator</h2>
          <p className="text-gray-600">
            Generate compelling marketing content for your cultural experiences
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <Zap className="h-3 w-3 mr-1" />
            AI Powered
          </Badge>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="library">Library</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Content Generator</CardTitle>
                  <CardDescription>
                    Create compelling marketing content with AI assistance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Content Type</label>
                    <Select
                      value={selectedTemplate}
                      onValueChange={setSelectedTemplate}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        {contentTemplates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name} - {template.category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedTemplate && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Experience/Topic
                          </label>
                          <Input placeholder="Traditional Cooking Class" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Location
                          </label>
                          <Input placeholder="Barcelona, Spain" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Key Details
                        </label>
                        <Textarea
                          placeholder="Describe the unique aspects, cultural elements, and what makes this experience special..."
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Target Audience
                          </label>
                          <Select defaultValue="cultural-travelers">
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
                              <SelectItem value="history-buffs">
                                History Buffs
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
                          <label className="text-sm font-medium">
                            Content Length
                          </label>
                          <Select defaultValue="medium">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="short">
                                Short (100-200 words)
                              </SelectItem>
                              <SelectItem value="medium">
                                Medium (200-500 words)
                              </SelectItem>
                              <SelectItem value="long">
                                Long (500+ words)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Tone: {getToneLabel(toneValue)}
                          </label>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">
                              Professional
                            </span>
                            <Slider
                              value={[toneValue]}
                              onValueChange={(value) => setToneValue(value[0])}
                              max={100}
                              step={1}
                              className="flex-1"
                            />
                            <span className="text-sm text-gray-500">
                              Enthusiastic
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Creativity: {getCreativityLabel(creativityValue)}
                          </label>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">
                              Conservative
                            </span>
                            <Slider
                              value={[creativityValue]}
                              onValueChange={(value) =>
                                setCreativityValue(value[0])
                              }
                              max={100}
                              step={1}
                              className="flex-1"
                            />
                            <span className="text-sm text-gray-500">
                              Innovative
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Keywords (Optional)
                        </label>
                        <Input placeholder="cultural experience, authentic, traditional, local..." />
                      </div>

                      <Button
                        onClick={handleGenerateContent}
                        disabled={isGenerating}
                        className="w-full"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Generating Content...
                          </>
                        ) : (
                          <>
                            <Wand2 className="h-4 w-4 mr-2" />
                            Generate Content
                          </>
                        )}
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Generated Content</CardTitle>
                  <CardDescription>
                    Your AI-generated marketing content will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isGenerating ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-600" />
                        <p className="text-sm text-gray-600">
                          Creating your content...
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium mb-2">
                          Sample Generated Content
                        </h4>
                        <p className="text-sm text-gray-700 mb-3">
                          "Immerse yourself in Barcelona's rich culinary
                          heritage with our intimate Traditional Cooking Class.
                          Over three engaging hours, you'll work alongside local
                          chefs who share family recipes passed down through
                          generations. Discover the stories behind each dish as
                          you prepare authentic Catalan cuisine using
                          market-fresh ingredients."
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline">156 words</Badge>
                          <Badge variant="outline">Engaging tone</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopyContent("sample content")}
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSaveContent("sample")}
                          >
                            <Save className="h-3 w-3 mr-1" />
                            Save
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Content Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <p>
                        Use specific cultural details to create authenticity
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <p>Include emotional benefits, not just features</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <p>Add sensory descriptions to help readers visualize</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                      <p>End with a clear call-to-action</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contentTemplates.map((template) => (
              <Card
                key={template.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{template.category}</Badge>
                    <div className="text-right">
                      {template.type === "Description" && (
                        <FileText className="h-5 w-5 text-blue-600" />
                      )}
                      {template.type === "Blog" && (
                        <BookOpen className="h-5 w-5 text-green-600" />
                      )}
                      {template.type === "Email" && (
                        <Mail className="h-5 w-5 text-purple-600" />
                      )}
                      {template.type === "Social" && (
                        <MessageSquare className="h-5 w-5 text-pink-600" />
                      )}
                      {template.type === "Website" && (
                        <Globe className="h-5 w-5 text-orange-600" />
                      )}
                      {template.type === "Ad" && (
                        <Megaphone className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {template.description}
                  </p>
                  <div className="text-xs text-gray-500 mb-3">
                    <strong>Fields:</strong> {template.fields.join(", ")}
                  </div>
                  <div className="bg-gray-50 rounded p-2 mb-3">
                    <p className="text-xs italic">"{template.example}"</p>
                  </div>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Content Library</h3>
              <p className="text-sm text-gray-600">
                Your saved and generated content
              </p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>

          <div className="space-y-4">
            {mockGeneratedContent.map((content) => (
              <Card
                key={content.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{content.title}</h4>
                        <Badge variant="outline">{content.type}</Badge>
                        <Badge variant="outline">
                          {content.wordCount} words
                        </Badge>
                        {content.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{content.rating}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {content.content}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Tone: {content.tone}</span>
                        <span>Created: {content.createdAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyContent(content.content)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Content Created</p>
                    <p className="text-2xl font-bold">147</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 23% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Rating</p>
                    <p className="text-2xl font-bold">4.7</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 0.3 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Time Saved</p>
                    <p className="text-2xl font-bold">28h</p>
                  </div>
                  <Zap className="h-8 w-8 text-purple-600" />
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
                    <p className="text-sm text-gray-600">Usage Rate</p>
                    <p className="text-2xl font-bold">89%</p>
                  </div>
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 5% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>
                Track how your AI-generated content performs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "Experience Descriptions",
                    created: 45,
                    avgRating: 4.8,
                    used: 42,
                    performance: "Excellent",
                  },
                  {
                    type: "Blog Posts",
                    created: 23,
                    avgRating: 4.6,
                    used: 21,
                    performance: "Good",
                  },
                  {
                    type: "Email Content",
                    created: 34,
                    avgRating: 4.7,
                    used: 31,
                    performance: "Excellent",
                  },
                  {
                    type: "Social Media Posts",
                    created: 67,
                    avgRating: 4.5,
                    used: 58,
                    performance: "Good",
                  },
                  {
                    type: "Website Copy",
                    created: 12,
                    avgRating: 4.9,
                    used: 12,
                    performance: "Excellent",
                  },
                ].map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{item.type}</h4>
                      <Badge
                        className={
                          item.performance === "Excellent"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }
                      >
                        {item.performance}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Created</p>
                        <p className="font-medium">{item.created}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Avg Rating</p>
                        <p className="font-medium">{item.avgRating}/5</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Used</p>
                        <p className="font-medium">
                          {item.used}/{item.created}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Usage Rate</p>
                        <p className="font-medium">
                          {Math.round((item.used / item.created) * 100)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentCreator;
