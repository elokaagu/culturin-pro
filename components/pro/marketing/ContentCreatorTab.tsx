"use client";

import React, { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  FileText,
  Edit,
  Mail,
  Sparkles,
  Loader2,
  Copy,
  Check,
} from "lucide-react";
import { toast } from "sonner";

const ContentCreatorTab = () => {
  const [experienceTitle, setExperienceTitle] = useState(
    "Traditional Cooking Class in Barcelona"
  );
  const [keyElements, setKeyElements] = useState(
    "Traditional recipes, local ingredients, family cooking traditions..."
  );
  const [location, setLocation] = useState("Barcelona, Spain");
  const [duration, setDuration] = useState("3 hours");
  const [writingStyle, setWritingStyle] = useState("engaging");

  // Additional fields for blog posts
  const [topic, setTopic] = useState("Cultural Experience");
  const [targetKeywords, setTargetKeywords] = useState(
    "cultural experience, travel, local traditions"
  );

  // Additional fields for email campaigns
  const [campaignType, setCampaignType] = useState("promotional");
  const [offer, setOffer] = useState("");

  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateContent = async (contentType: string) => {
    // Validate required fields
    if (!experienceTitle || !keyElements || !location) {
      toast.error(
        "Please fill in the Experience Title, Key Cultural Elements, and Location fields."
      );
      return;
    }

    setIsGenerating(true);
    setGeneratedContent("");

    try {
      let endpoint = "";
      let requestBody: any = {
        title: experienceTitle,
        culturalElements: keyElements,
        location: location,
        duration: duration,
        writingStyle: writingStyle,
      };

      if (contentType === "description") {
        endpoint = "/api/generate-description";
      } else if (contentType === "blog post") {
        endpoint = "/api/generate-blog-post";
        requestBody = {
          ...requestBody,
          topic: topic,
          targetKeywords: targetKeywords,
        };
      } else if (contentType === "email campaign") {
        endpoint = "/api/generate-email-campaign";
        requestBody = {
          ...requestBody,
          campaignType: campaignType,
          offer: offer,
        };
      } else {
        throw new Error("Unsupported content type");
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate content");
      }

      // Extract the appropriate field based on content type
      let content = "";
      if (contentType === "description") {
        content = data.description;
      } else if (contentType === "blog post") {
        content = data.blogPost;
      } else if (contentType === "email campaign") {
        content = data.emailCampaign;
      }

      setGeneratedContent(content);
      toast.success(`${contentType} generated successfully!`);
    } catch (error: any) {
      console.error("Error generating content:", error);
      toast.error(
        error.message || "Failed to generate content. Please try again."
      );
      setGeneratedContent(
        "Sorry, there was an error generating the content. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveTemplate = () => {
    toast.success("Template saved successfully!");
  };

  const handleCopyContent = async () => {
    if (generatedContent) {
      try {
        await navigator.clipboard.writeText(generatedContent);
        setCopied(true);
        toast.success("Content copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        toast.error("Failed to copy content");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">AI-Powered Content Creator</h2>
        <p className="text-gray-600">
          Create compelling descriptions, blog posts, and marketing copy for
          your cultural experiences
        </p>
      </div>

      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Description
          </TabsTrigger>
          <TabsTrigger value="blog-post" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Blog Post
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {/* Experience Details Form */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Experience Details</CardTitle>
              <CardDescription>
                Provide information about your cultural experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="experience-title">Experience Title</Label>
                <Input
                  id="experience-title"
                  value={experienceTitle}
                  onChange={(e) => setExperienceTitle(e.target.value)}
                  placeholder="Enter your experience title"
                />
              </div>

              <div>
                <Label htmlFor="key-elements">Key Cultural Elements</Label>
                <Textarea
                  id="key-elements"
                  value={keyElements}
                  onChange={(e) => setKeyElements(e.target.value)}
                  placeholder="Describe the key cultural elements of your experience..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Barcelona, Spain"
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="3 hours"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="writing-style">Writing Style</Label>
                <Select value={writingStyle} onValueChange={setWritingStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select writing style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engaging">
                      Engaging & Exciting
                    </SelectItem>
                    <SelectItem value="informative">
                      Informative & Educational
                    </SelectItem>
                    <SelectItem value="casual">Casual & Friendly</SelectItem>
                    <SelectItem value="professional">
                      Professional & Formal
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleSaveTemplate} variant="outline">
                  Save as Template
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Content Generation Tabs */}
          <TabsContent value="description">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  Experience Description Generator
                </CardTitle>
                <CardDescription>
                  Generate compelling descriptions that attract travelers to
                  your cultural experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => handleGenerateContent("description")}
                  disabled={isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Content...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blog-post">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-600" />
                  Blog Post Generator
                </CardTitle>
                <CardDescription>
                  Create engaging blog posts about your cultural experiences to
                  drive traffic
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="topic">Blog Topic</Label>
                    <Input
                      id="topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="Cultural Experience"
                    />
                  </div>
                  <div>
                    <Label htmlFor="target-keywords">Target Keywords</Label>
                    <Input
                      id="target-keywords"
                      value={targetKeywords}
                      onChange={(e) => setTargetKeywords(e.target.value)}
                      placeholder="cultural experience, travel, local traditions"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => handleGenerateContent("blog post")}
                  disabled={isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Blog Post...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Blog Post
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  Email Campaign Generator
                </CardTitle>
                <CardDescription>
                  Generate email marketing content to promote your cultural
                  experiences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="campaign-type">Campaign Type</Label>
                    <Select
                      value={campaignType}
                      onValueChange={setCampaignType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select campaign type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="promotional">Promotional</SelectItem>
                        <SelectItem value="newsletter">Newsletter</SelectItem>
                        <SelectItem value="announcement">
                          Announcement
                        </SelectItem>
                        <SelectItem value="follow-up">Follow-up</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="offer">Special Offer (Optional)</Label>
                    <Input
                      id="offer"
                      value={offer}
                      onChange={(e) => setOffer(e.target.value)}
                      placeholder="20% off, Free upgrade, etc."
                    />
                  </div>
                </div>
                <Button
                  onClick={() => handleGenerateContent("email campaign")}
                  disabled={isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Email Campaign...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Email Campaign
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      {/* Generated Content Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Generated Content</CardTitle>
              <CardDescription>
                {generatedContent
                  ? "Here's your AI-generated content"
                  : "Generated content will appear here"}
              </CardDescription>
            </div>
            {generatedContent && (
              <Button
                onClick={handleCopyContent}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                {copied ? (
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
            )}
          </div>
        </CardHeader>
        <CardContent>
          {generatedContent ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {generatedContent}
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 italic">
                Sample content will appear here after generation. This would
                include compelling descriptions, engaging blog posts, or
                persuasive email campaigns tailored to your cultural experience.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentCreatorTab;
