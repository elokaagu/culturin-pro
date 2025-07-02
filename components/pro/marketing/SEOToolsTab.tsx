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
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Target,
  MapPin,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

const SEOToolsTab = () => {
  const [url, setUrl] = useState(
    "Enter your experience page URL or paste content to analyze..."
  );
  const [targetLocation, setTargetLocation] = useState("Paris, Rome, Tokyo...");
  const [experienceCategory, setExperienceCategory] = useState("cultural-tour");
  const [keywords, setKeywords] = useState(
    "Enter target keywords separated by commas..."
  );

  const handleRunAnalysis = () => {
    toast.success("Running SEO analysis...");
  };

  const handleKeywordResearch = () => {
    toast.success("Researching keywords...");
  };

  const handleLocalOptimization = () => {
    toast.success("Optimizing local listings...");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">SEO Optimization Tools</h2>
        <p className="text-gray-600">
          Improve your search visibility and attract more organic traffic
        </p>
      </div>

      <Tabs defaultValue="seo-analyzer" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="seo-analyzer" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            SEO Analyzer
          </TabsTrigger>
          <TabsTrigger
            value="keyword-research"
            className="flex items-center gap-2"
          >
            <Target className="h-4 w-4" />
            Keyword Research
          </TabsTrigger>
          <TabsTrigger
            value="local-listings"
            className="flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" />
            Local Listings
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="seo-analyzer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Analysis Tool</CardTitle>
                <CardDescription>
                  Analyze your experience pages and get optimization
                  recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="url-content">
                    Experience URL or Page Content
                  </Label>
                  <Textarea
                    id="url-content"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter your experience page URL or paste content to analyze..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="target-location">Target Location</Label>
                    <Input
                      id="target-location"
                      value={targetLocation}
                      onChange={(e) => setTargetLocation(e.target.value)}
                      placeholder="Paris, Rome, Tokyo..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience-category">
                      Experience Category
                    </Label>
                    <Select
                      value={experienceCategory}
                      onValueChange={setExperienceCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cultural-tour">
                          Cultural Tour
                        </SelectItem>
                        <SelectItem value="cooking-class">
                          Cooking Class
                        </SelectItem>
                        <SelectItem value="art-workshop">
                          Art Workshop
                        </SelectItem>
                        <SelectItem value="historical-tour">
                          Historical Tour
                        </SelectItem>
                        <SelectItem value="music-experience">
                          Music Experience
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="target-keywords">Target Keywords</Label>
                  <Textarea
                    id="target-keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="Enter target keywords separated by commas..."
                    className="min-h-[80px]"
                  />
                </div>

                <Button onClick={handleRunAnalysis} className="w-full">
                  Run SEO Analysis
                </Button>
              </CardContent>
            </Card>

            {/* Sample SEO Report */}
            <Card>
              <CardHeader>
                <CardTitle>Sample SEO Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">SEO Score: 68/100</h3>
                  <div className="w-32">
                    <Progress value={68} className="h-2" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Title Optimization</p>
                      <p className="text-sm text-gray-600">
                        Good - Title contains target keywords
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium">Meta Description</p>
                      <p className="text-sm text-gray-600">
                        Needs improvement - Too short, add call-to-action
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Content Quality</p>
                      <p className="text-sm text-gray-600">
                        Excellent - Rich cultural content with relevant keywords
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">
                    Recommendation
                  </p>
                  <p className="text-sm text-blue-700">
                    Focus on improving meta descriptions and adding more
                    location-specific keywords to boost local search visibility.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keyword-research">
            <Card>
              <CardHeader>
                <CardTitle>Keyword Research Tool</CardTitle>
                <CardDescription>
                  Discover high-performing keywords for your cultural
                  experiences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="seed-keywords">Seed Keywords</Label>
                    <Input
                      id="seed-keywords"
                      placeholder="cultural tour, cooking class..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Barcelona, Spain" />
                  </div>
                </div>

                <Button onClick={handleKeywordResearch} className="w-full">
                  Research Keywords
                </Button>

                <div className="mt-6">
                  <h4 className="font-medium mb-3">Suggested Keywords</h4>
                  <div className="space-y-2">
                    {[
                      {
                        keyword: "Barcelona cooking class",
                        volume: "1.2K",
                        difficulty: "Medium",
                      },
                      {
                        keyword: "Traditional Spanish cooking",
                        volume: "890",
                        difficulty: "Low",
                      },
                      {
                        keyword: "Cultural food tour Barcelona",
                        volume: "650",
                        difficulty: "High",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 border rounded-lg"
                      >
                        <span className="font-medium">{item.keyword}</span>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>Volume: {item.volume}</span>
                          <span>Difficulty: {item.difficulty}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="local-listings">
            <Card>
              <CardHeader>
                <CardTitle>Local Listings Optimization</CardTitle>
                <CardDescription>
                  Improve your visibility in local search results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="business-name">Business Name</Label>
                    <Input
                      id="business-name"
                      placeholder="Your cultural experience business"
                    />
                  </div>
                  <div>
                    <Label htmlFor="business-location">Business Location</Label>
                    <Input id="business-location" placeholder="City, Country" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="business-description">
                    Business Description
                  </Label>
                  <Textarea
                    id="business-description"
                    placeholder="Describe your cultural experiences..."
                    className="min-h-[80px]"
                  />
                </div>

                <Button onClick={handleLocalOptimization} className="w-full">
                  Optimize Local Listings
                </Button>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Local SEO Checklist</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Google My Business claimed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <span>Add more customer reviews</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Business hours updated</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SEOToolsTab;
