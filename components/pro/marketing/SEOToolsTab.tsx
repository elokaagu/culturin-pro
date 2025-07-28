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
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Target,
  MapPin,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  Sparkles,
  AlertTriangle,
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

  // SEO Analysis states
  const [seoAnalysis, setSeoAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedContent, setCopiedContent] = useState(false);

  // Keyword Research states
  const [seedKeywords, setSeedKeywords] = useState("");
  const [keywordLocation, setKeywordLocation] = useState("");
  const [keywordResearch, setKeywordResearch] = useState<any>(null);
  const [isResearching, setIsResearching] = useState(false);

  const handleRunAnalysis = async () => {
    // Validate required fields
    if (!url || !targetLocation || !experienceCategory) {
      toast.error(
        "Please fill in the URL/Content, Target Location, and Experience Category fields."
      );
      return;
    }

    setIsAnalyzing(true);
    setSeoAnalysis(null);

    try {
      const response = await fetch("/api/generate-seo-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urlContent: url,
          targetLocation,
          experienceCategory,
          targetKeywords: keywords,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate SEO analysis");
      }

      setSeoAnalysis(data.seoAnalysis);
      toast.success("SEO analysis completed successfully!");
    } catch (error: any) {
      console.error("Error generating SEO analysis:", error);
      toast.error(
        error.message || "Failed to generate SEO analysis. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeywordResearch = async () => {
    // Validate required fields
    if (!seedKeywords || !keywordLocation) {
      toast.error("Please fill in the Seed Keywords and Location fields.");
      return;
    }

    setIsResearching(true);
    setKeywordResearch(null);

    try {
      const response = await fetch("/api/generate-keyword-research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seedKeywords,
          location: keywordLocation,
          experienceCategory,
          targetAudience: "Cultural Travelers",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate keyword research");
      }

      setKeywordResearch(data.keywordResearch);
      toast.success("Keyword research completed successfully!");
    } catch (error: any) {
      console.error("Error generating keyword research:", error);
      toast.error(
        error.message ||
          "Failed to generate keyword research. Please try again."
      );
    } finally {
      setIsResearching(false);
    }
  };

  const handleCopyContent = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedContent(true);
      toast.success("Content copied to clipboard!");
      setTimeout(() => setCopiedContent(false), 2000);
    } catch (err) {
      toast.error("Failed to copy content");
    }
  };

  const handleLocalOptimization = () => {
    toast.success("Optimizing local listings...");
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "good":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "needs improvement":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "poor":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "good":
        return "text-green-600";
      case "needs improvement":
        return "text-yellow-600";
      case "poor":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  SEO Analysis Tool
                </CardTitle>
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

                <Button
                  onClick={handleRunAnalysis}
                  disabled={isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Run SEO Analysis
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* SEO Analysis Results */}
            {seoAnalysis && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>SEO Analysis Results</CardTitle>
                    <Button
                      onClick={() =>
                        handleCopyContent(JSON.stringify(seoAnalysis, null, 2))
                      }
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      {copiedContent ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy Report
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* SEO Score */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      SEO Score: {seoAnalysis.seoScore}/100
                    </h3>
                    <div className="w-32">
                      <Progress value={seoAnalysis.seoScore} className="h-2" />
                    </div>
                  </div>
                  {seoAnalysis.scoreJustification && (
                    <p className="text-sm text-gray-600">
                      {seoAnalysis.scoreJustification}
                    </p>
                  )}

                  {/* Title Analysis */}
                  {seoAnalysis.titleAnalysis && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(seoAnalysis.titleAnalysis.status)}
                        <div>
                          <p className="font-medium">Title Optimization</p>
                          <p
                            className={`text-sm ${getStatusColor(
                              seoAnalysis.titleAnalysis.status
                            )}`}
                          >
                            {seoAnalysis.titleAnalysis.status}
                          </p>
                        </div>
                      </div>
                      {seoAnalysis.titleAnalysis.suggestedTitle && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-blue-800 mb-1">
                            Suggested Title:
                          </p>
                          <p className="text-sm text-blue-700">
                            {seoAnalysis.titleAnalysis.suggestedTitle}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Meta Description */}
                  {seoAnalysis.metaDescription && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(seoAnalysis.metaDescription.status)}
                        <div>
                          <p className="font-medium">Meta Description</p>
                          <p
                            className={`text-sm ${getStatusColor(
                              seoAnalysis.metaDescription.status
                            )}`}
                          >
                            {seoAnalysis.metaDescription.status}
                          </p>
                        </div>
                      </div>
                      {seoAnalysis.metaDescription.suggestedDescription && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-blue-800 mb-1">
                            Suggested Description:
                          </p>
                          <p className="text-sm text-blue-700">
                            {seoAnalysis.metaDescription.suggestedDescription}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content Quality */}
                  {seoAnalysis.contentQuality && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(seoAnalysis.contentQuality.status)}
                        <div>
                          <p className="font-medium">Content Quality</p>
                          <p
                            className={`text-sm ${getStatusColor(
                              seoAnalysis.contentQuality.status
                            )}`}
                          >
                            {seoAnalysis.contentQuality.status}
                          </p>
                        </div>
                      </div>
                      {seoAnalysis.contentQuality.wordCount && (
                        <p className="text-sm text-gray-600">
                          Word Count: {seoAnalysis.contentQuality.wordCount}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Action Items */}
                  {seoAnalysis.actionItems &&
                    seoAnalysis.actionItems.length > 0 && (
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-medium text-yellow-800 mb-3">
                          Action Items
                        </h4>
                        <div className="space-y-2">
                          {seoAnalysis.actionItems.map(
                            (item: any, index: number) => (
                              <div
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <span className="text-yellow-600 mt-1">•</span>
                                <div>
                                  <p className="text-sm font-medium text-yellow-800">
                                    {item.action}
                                  </p>
                                  <p className="text-xs text-yellow-700">
                                    Priority: {item.priority} | Impact:{" "}
                                    {item.impact}
                                  </p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="keyword-research">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-600" />
                  Keyword Research Tool
                </CardTitle>
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
                      value={seedKeywords}
                      onChange={(e) => setSeedKeywords(e.target.value)}
                      placeholder="cultural tour, cooking class..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={keywordLocation}
                      onChange={(e) => setKeywordLocation(e.target.value)}
                      placeholder="Barcelona, Spain"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleKeywordResearch}
                  disabled={isResearching}
                  className="w-full"
                >
                  {isResearching ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Researching Keywords...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Research Keywords
                    </>
                  )}
                </Button>

                {/* Keyword Research Results */}
                {keywordResearch && (
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Keyword Research Results</h4>
                      <Button
                        onClick={() =>
                          handleCopyContent(
                            JSON.stringify(keywordResearch, null, 2)
                          )
                        }
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        {copiedContent ? (
                          <>
                            <Check className="h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy Results
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Primary Keywords */}
                    {keywordResearch.primaryKeywords &&
                      keywordResearch.primaryKeywords.length > 0 && (
                        <div>
                          <h5 className="font-medium mb-3">Primary Keywords</h5>
                          <div className="space-y-2">
                            {keywordResearch.primaryKeywords.map(
                              (keyword: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center p-3 border rounded-lg"
                                >
                                  <span className="font-medium">
                                    {keyword.keyword}
                                  </span>
                                  <div className="flex gap-2">
                                    <Badge variant="outline">
                                      {keyword.searchVolume}
                                    </Badge>
                                    <Badge
                                      className={getDifficultyColor(
                                        keyword.difficulty
                                      )}
                                    >
                                      {keyword.difficulty}
                                    </Badge>
                                    <Badge variant="outline">
                                      Score: {keyword.relevance}/10
                                    </Badge>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Local Keywords */}
                    {keywordResearch.localKeywords &&
                      keywordResearch.localKeywords.length > 0 && (
                        <div>
                          <h5 className="font-medium mb-3">Local Keywords</h5>
                          <div className="space-y-2">
                            {keywordResearch.localKeywords.map(
                              (keyword: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center p-3 border rounded-lg"
                                >
                                  <span className="font-medium">
                                    {keyword.keyword}
                                  </span>
                                  <div className="flex gap-2">
                                    <Badge variant="outline">
                                      {keyword.searchVolume}
                                    </Badge>
                                    <Badge
                                      className={getDifficultyColor(
                                        keyword.difficulty
                                      )}
                                    >
                                      {keyword.difficulty}
                                    </Badge>
                                    <Badge variant="outline">
                                      Score: {keyword.relevance}/10
                                    </Badge>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Recommendations */}
                    {keywordResearch.recommendations &&
                      keywordResearch.recommendations.length > 0 && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h5 className="font-medium text-blue-800 mb-3">
                            Recommendations
                          </h5>
                          <div className="space-y-2">
                            {keywordResearch.recommendations.map(
                              (rec: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <span className="text-blue-600 mt-1">•</span>
                                  <div>
                                    <p className="text-sm font-medium text-blue-800">
                                      {rec.keyword}
                                    </p>
                                    <p className="text-xs text-blue-700">
                                      {rec.reason} | Priority: {rec.priority}
                                    </p>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                )}
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
