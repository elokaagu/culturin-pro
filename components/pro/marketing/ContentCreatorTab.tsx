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
import { FileText, Edit, Mail, Sparkles } from "lucide-react";
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

  const handleGenerateContent = (contentType: string) => {
    toast.success(`Generating ${contentType} content...`);
    // In real app, this would call an AI service
  };

  const handleSaveTemplate = () => {
    toast.success("Template saved successfully!");
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
                  className="w-full"
                >
                  Generate Content
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
              <CardContent>
                <Button
                  onClick={() => handleGenerateContent("blog post")}
                  className="w-full"
                >
                  Generate Content
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
              <CardContent>
                <Button
                  onClick={() => handleGenerateContent("email campaign")}
                  className="w-full"
                >
                  Generate Content
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      {/* Sample Generated Content Section */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Generated Content</CardTitle>
          <CardDescription>
            Here's an example of AI-generated content for your experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 italic">
              Sample content will appear here after generation. This would
              include compelling descriptions, engaging blog posts, or
              persuasive email campaigns tailored to your cultural experience.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentCreatorTab;
