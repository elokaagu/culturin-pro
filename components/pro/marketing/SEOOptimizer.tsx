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
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import {
  Search,
  TrendingUp,
  Globe,
  MapPin,
  Eye,
  Users,
  BarChart3,
  CheckCircle,
  AlertCircle,
  XCircle,
  Target,
  Lightbulb,
  Zap,
  Link,
  FileText,
  Star,
  Clock,
  ArrowUp,
  ArrowDown,
  Minus,
  RefreshCw,
} from "lucide-react";

interface KeywordData {
  keyword: string;
  volume: number;
  difficulty: "Low" | "Medium" | "High";
  competition: number;
  trend: "up" | "down" | "stable";
  cpc: number;
}

interface SEOIssue {
  type: "error" | "warning" | "success";
  category: string;
  title: string;
  description: string;
  impact: "High" | "Medium" | "Low";
  howToFix: string;
}

interface LocalListing {
  platform: string;
  status: "Connected" | "Not Connected" | "Needs Update";
  lastUpdated?: string;
  reviews?: number;
  rating?: number;
}

const SEOOptimizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState("analyzer");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [seoScore, setSeoScore] = useState(68);
  const { toast } = useToast();

  const keywordData: KeywordData[] = [
    {
      keyword: "cultural tours barcelona",
      volume: 5400,
      difficulty: "Medium",
      competition: 0.67,
      trend: "up",
      cpc: 2.34,
    },
    {
      keyword: "authentic cooking class",
      volume: 3200,
      difficulty: "Low",
      competition: 0.45,
      trend: "up",
      cpc: 3.12,
    },
    {
      keyword: "traditional art workshop",
      volume: 1900,
      difficulty: "Low",
      competition: 0.38,
      trend: "stable",
      cpc: 1.89,
    },
    {
      keyword: "local cultural experience",
      volume: 2800,
      difficulty: "Medium",
      competition: 0.58,
      trend: "up",
      cpc: 2.67,
    },
    {
      keyword: "heritage walking tour",
      volume: 1600,
      difficulty: "High",
      competition: 0.78,
      trend: "down",
      cpc: 4.23,
    },
    {
      keyword: "artisan workshop barcelona",
      volume: 890,
      difficulty: "Low",
      competition: 0.32,
      trend: "up",
      cpc: 1.56,
    },
  ];

  const seoIssues: SEOIssue[] = [
    {
      type: "error",
      category: "Technical SEO",
      title: "Missing Meta Descriptions",
      description: "3 pages are missing meta descriptions",
      impact: "High",
      howToFix:
        "Add unique meta descriptions (150-160 characters) to all pages",
    },
    {
      type: "warning",
      category: "Content",
      title: "Short Content Length",
      description: "Some experience pages have less than 300 words",
      impact: "Medium",
      howToFix:
        "Expand content to at least 500 words with cultural details and context",
    },
    {
      type: "warning",
      category: "Local SEO",
      title: "Incomplete Google Business Profile",
      description: "Missing business hours and photos",
      impact: "Medium",
      howToFix:
        "Complete your Google Business Profile with all required information",
    },
    {
      type: "success",
      category: "Technical SEO",
      title: "Mobile Optimization",
      description: "All pages are mobile-friendly",
      impact: "High",
      howToFix: "Continue monitoring mobile performance",
    },
    {
      type: "error",
      category: "Keywords",
      title: "Missing H1 Tags",
      description: "2 pages are missing H1 tags",
      impact: "High",
      howToFix:
        "Add descriptive H1 tags to all pages including target keywords",
    },
  ];

  const localListings: LocalListing[] = [
    {
      platform: "Google Business Profile",
      status: "Connected",
      lastUpdated: "2024-05-20",
      reviews: 47,
      rating: 4.8,
    },
    {
      platform: "TripAdvisor",
      status: "Connected",
      lastUpdated: "2024-05-18",
      reviews: 23,
      rating: 4.6,
    },
    {
      platform: "Yelp",
      status: "Needs Update",
      lastUpdated: "2024-04-15",
      reviews: 12,
      rating: 4.2,
    },
    {
      platform: "Facebook Places",
      status: "Connected",
      lastUpdated: "2024-05-19",
      reviews: 8,
      rating: 4.9,
    },
    { platform: "Foursquare", status: "Not Connected" },
    {
      platform: "Booking.com",
      status: "Connected",
      lastUpdated: "2024-05-21",
      reviews: 156,
      rating: 4.7,
    },
  ];

  const handleAnalyzeSEO = async () => {
    setIsAnalyzing(true);

    // Simulate SEO analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setSeoScore(Math.floor(Math.random() * 30) + 60); // Random score between 60-90
      toast({
        title: "SEO Analysis Complete",
        description: "Your SEO report has been generated successfully.",
      });
    }, 3000);
  };

  const handleKeywordResearch = () => {
    toast({
      title: "Keyword Research Started",
      description: "Analyzing keyword opportunities for your experiences.",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected":
        return "bg-green-100 text-green-800";
      case "Needs Update":
        return "bg-yellow-100 text-yellow-800";
      case "Not Connected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUp className="h-3 w-3 text-green-600" />;
      case "down":
        return <ArrowDown className="h-3 w-3 text-red-600" />;
      case "stable":
        return <Minus className="h-3 w-3 text-gray-600" />;
      default:
        return <Minus className="h-3 w-3 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">SEO Optimizer</h2>
          <p className="text-gray-600">
            Improve your search visibility and attract more organic traffic
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <TrendingUp className="h-3 w-3 mr-1" />
            SEO Score: {seoScore}
          </Badge>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="analyzer">SEO Analyzer</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="local">Local SEO</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="tracking">Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="analyzer" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Analysis</CardTitle>
                  <CardDescription>
                    Analyze your experience pages for SEO optimization
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Page URL or Content
                    </label>
                    <Textarea
                      placeholder="Enter your experience page URL or paste content to analyze..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Target Location
                      </label>
                      <Input placeholder="Barcelona, Spain" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Experience Category
                      </label>
                      <Select defaultValue="cultural">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cultural">
                            Cultural Tour
                          </SelectItem>
                          <SelectItem value="food">Food & Drink</SelectItem>
                          <SelectItem value="workshop">
                            Workshop & Classes
                          </SelectItem>
                          <SelectItem value="adventure">Adventure</SelectItem>
                          <SelectItem value="history">
                            History & Heritage
                          </SelectItem>
                          <SelectItem value="art">Art & Crafts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Target Keywords
                    </label>
                    <Input placeholder="cultural tour barcelona, authentic experience, local guide..." />
                  </div>

                  <Button
                    onClick={handleAnalyzeSEO}
                    disabled={isAnalyzing}
                    className="w-full"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing SEO...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Run SEO Analysis
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>SEO Score</CardTitle>
                  <CardDescription>Overall SEO performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold mb-2">
                      {seoScore}/100
                    </div>
                    <Progress value={seoScore} className="w-full" />
                    <p className="text-sm text-gray-600 mt-2">
                      {seoScore >= 80
                        ? "Excellent"
                        : seoScore >= 60
                        ? "Good"
                        : "Needs Improvement"}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Title Optimization</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-16 h-2" />
                        <span className="text-xs">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Content Quality</span>
                      <div className="flex items-center gap-2">
                        <Progress value={72} className="w-16 h-2" />
                        <span className="text-xs">72%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Local SEO</span>
                      <div className="flex items-center gap-2">
                        <Progress value={58} className="w-16 h-2" />
                        <span className="text-xs">58%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Technical SEO</span>
                      <div className="flex items-center gap-2">
                        <Progress value={91} className="w-16 h-2" />
                        <span className="text-xs">91%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>SEO Issues & Recommendations</CardTitle>
              <CardDescription>
                Fix these issues to improve your search ranking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seoIssues.map((issue, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      {getIssueIcon(issue.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{issue.title}</h4>
                          <Badge variant="outline">{issue.category}</Badge>
                          <Badge className={getImpactColor(issue.impact)}>
                            {issue.impact} Impact
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {issue.description}
                        </p>
                        <div className="bg-blue-50 rounded p-3">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                            <p className="text-sm text-blue-800">
                              {issue.howToFix}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Keyword Research</CardTitle>
                  <CardDescription>
                    Discover high-value keywords for your cultural experiences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Experience Type
                      </label>
                      <Input placeholder="e.g., Cooking Class, Art Workshop" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input placeholder="e.g., Barcelona, Tokyo" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Seed Keywords</label>
                    <Input placeholder="cultural tour, authentic experience, local guide..." />
                  </div>

                  <Button onClick={handleKeywordResearch} className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Research Keywords
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Keyword Opportunities</CardTitle>
                  <CardDescription>
                    Recommended keywords based on your experiences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {keywordData.map((keyword, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h4 className="font-medium">{keyword.keyword}</h4>
                            <Badge
                              className={getDifficultyColor(keyword.difficulty)}
                            >
                              {keyword.difficulty}
                            </Badge>
                            {getTrendIcon(keyword.trend)}
                          </div>
                          <Button size="sm" variant="outline">
                            Target
                          </Button>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Search Volume</p>
                            <p className="font-medium">
                              {keyword.volume.toLocaleString()}/mo
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Competition</p>
                            <p className="font-medium">
                              {Math.round(keyword.competition * 100)}%
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">CPC</p>
                            <p className="font-medium">${keyword.cpc}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Opportunity</p>
                            <p className="font-medium text-green-600">High</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Keyword Performance</CardTitle>
                  <CardDescription>Track your keyword rankings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        keyword: "cultural tours barcelona",
                        position: 12,
                        change: "up",
                        traffic: 234,
                      },
                      {
                        keyword: "authentic cooking class",
                        position: 8,
                        change: "up",
                        traffic: 156,
                      },
                      {
                        keyword: "traditional art workshop",
                        position: 15,
                        change: "stable",
                        traffic: 89,
                      },
                      {
                        keyword: "local cultural experience",
                        position: 22,
                        change: "down",
                        traffic: 67,
                      },
                    ].map((item, index) => (
                      <div key={index} className="border rounded p-3">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium">{item.keyword}</p>
                          {getTrendIcon(item.change)}
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>Position #{item.position}</span>
                          <span>{item.traffic} clicks</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Add Keywords to Content
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Meta Tags
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Competitor Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="local" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>
                  Ensure your business details are consistent across all
                  platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business Name</label>
                    <Input defaultValue="Barcelona Cultural Tours" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input defaultValue="+34 123 456 789" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input defaultValue="Carrer de la Cultura, 123, Barcelona, Spain" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Website</label>
                    <Input defaultValue="www.barcelonaculturaltours.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select defaultValue="cultural-tours">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cultural-tours">
                          Cultural Tours
                        </SelectItem>
                        <SelectItem value="tour-operator">
                          Tour Operator
                        </SelectItem>
                        <SelectItem value="travel-agency">
                          Travel Agency
                        </SelectItem>
                        <SelectItem value="experience-provider">
                          Experience Provider
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Business Description
                  </label>
                  <Textarea
                    defaultValue="Authentic cultural experiences in Barcelona led by local experts. Discover hidden gems and traditional culture through our immersive tours and workshops."
                    className="min-h-[80px]"
                  />
                </div>

                <Button className="w-full">Update Business Information</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Local Directory Listings</CardTitle>
                <CardDescription>
                  Manage your presence across local business directories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {localListings.map((listing, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Globe className="h-5 w-5 text-gray-400" />
                          <span className="font-medium">
                            {listing.platform}
                          </span>
                        </div>
                        <Badge className={getStatusColor(listing.status)}>
                          {listing.status}
                        </Badge>
                      </div>

                      {listing.status === "Connected" && (
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div>
                            <p className="text-gray-600">Reviews</p>
                            <p className="font-medium">{listing.reviews}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Rating</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">
                                {listing.rating}
                              </span>
                            </div>
                          </div>
                          <div>
                            <p className="text-gray-600">Updated</p>
                            <p className="font-medium">{listing.lastUpdated}</p>
                          </div>
                        </div>
                      )}

                      <div className="mt-3">
                        <Button
                          size="sm"
                          variant={
                            listing.status === "Connected"
                              ? "outline"
                              : "default"
                          }
                          className="w-full"
                        >
                          {listing.status === "Connected"
                            ? "Manage"
                            : listing.status === "Needs Update"
                            ? "Update"
                            : "Connect"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Local SEO Performance</CardTitle>
              <CardDescription>
                Track your local search visibility and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">4.7</div>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                  <p className="text-xs text-green-600">
                    ↑ 0.2 from last month
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">246</div>
                  <p className="text-sm text-gray-600">Total Reviews</p>
                  <p className="text-xs text-green-600">↑ 18 from last month</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">1,847</div>
                  <p className="text-sm text-gray-600">Profile Views</p>
                  <p className="text-xs text-green-600">
                    ↑ 12% from last month
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-sm text-gray-600">Direction Requests</p>
                  <p className="text-xs text-green-600">↑ 8% from last month</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Local Search Rankings</h4>
                {[
                  {
                    query: "cultural tours near me",
                    position: 3,
                    location: "Barcelona",
                  },
                  {
                    query: "authentic experiences barcelona",
                    position: 7,
                    location: "Barcelona",
                  },
                  {
                    query: "local guide barcelona",
                    position: 12,
                    location: "Barcelona",
                  },
                  {
                    query: "traditional workshops barcelona",
                    position: 5,
                    location: "Barcelona",
                  },
                ].map((ranking, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border rounded p-3"
                  >
                    <div>
                      <p className="font-medium text-sm">{ranking.query}</p>
                      <p className="text-xs text-gray-600">
                        {ranking.location}
                      </p>
                    </div>
                    <Badge variant="outline">
                      Position #{ranking.position}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Optimization</CardTitle>
              <CardDescription>
                Optimize your content for better search rankings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Experience Page Analysis</h4>
                {[
                  {
                    title: "Traditional Cooking Class in Barcelona",
                    url: "/experiences/cooking-class-barcelona",
                    score: 78,
                    issues: ["Missing alt text", "Short meta description"],
                    keywords: ["cooking class", "barcelona", "traditional"],
                  },
                  {
                    title: "Art Workshop in Gothic Quarter",
                    url: "/experiences/art-workshop-gothic",
                    score: 65,
                    issues: ["No H2 headings", "Low word count"],
                    keywords: ["art workshop", "gothic quarter", "barcelona"],
                  },
                  {
                    title: "Flamenco Dance Experience",
                    url: "/experiences/flamenco-dance",
                    score: 82,
                    issues: ["Missing schema markup"],
                    keywords: ["flamenco", "dance", "cultural experience"],
                  },
                ].map((page, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h5 className="font-medium">{page.title}</h5>
                        <p className="text-sm text-gray-600">{page.url}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          {page.score}/100
                        </div>
                        <Progress value={page.score} className="w-20 h-2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">
                          Issues to Fix:
                        </p>
                        <ul className="text-sm space-y-1">
                          {page.issues.map((issue, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <AlertCircle className="h-3 w-3 text-yellow-600" />
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">
                          Target Keywords:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {page.keywords.map((keyword, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline">
                        Optimize Content
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Suggestions</CardTitle>
              <CardDescription>
                AI-powered recommendations to improve your content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "Blog Post",
                    title: "The History Behind Barcelona's Gothic Quarter",
                    reason:
                      'Target keyword: "gothic quarter history" has high search volume',
                    impact: "High",
                  },
                  {
                    type: "FAQ Section",
                    title: "Common Questions About Cultural Tours",
                    reason:
                      "Answer frequent customer questions to improve rankings",
                    impact: "Medium",
                  },
                  {
                    type: "Location Page",
                    title: "Cultural Experiences in Gracia Neighborhood",
                    reason: "Expand local coverage for better local SEO",
                    impact: "High",
                  },
                  {
                    type: "Guide Article",
                    title: "What to Expect on Your First Cultural Tour",
                    reason: "Educational content builds authority and trust",
                    impact: "Medium",
                  },
                ].map((suggestion, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <h5 className="font-medium">{suggestion.title}</h5>
                          <Badge variant="outline">{suggestion.type}</Badge>
                        </div>
                      </div>
                      <Badge className={getImpactColor(suggestion.impact)}>
                        {suggestion.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {suggestion.reason}
                    </p>
                    <Button size="sm">
                      <Zap className="h-3 w-3 mr-1" />
                      Create Content
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Organic Traffic</p>
                    <p className="text-2xl font-bold">3,247</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
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
                    <p className="text-sm text-gray-600">Avg Position</p>
                    <p className="text-2xl font-bold">12.4</p>
                  </div>
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 2.1 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Click Rate</p>
                    <p className="text-2xl font-bold">3.8%</p>
                  </div>
                  <Eye className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 0.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Impressions</p>
                    <p className="text-2xl font-bold">85.2K</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-xs text-green-600 mt-1">
                  ↑ 12% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Search Performance</CardTitle>
              <CardDescription>
                Track your search rankings and performance over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">
                      Top Performing Keywords
                    </h4>
                    <div className="space-y-2">
                      {[
                        {
                          keyword: "cultural tours barcelona",
                          clicks: 234,
                          impressions: 3400,
                          position: 8,
                        },
                        {
                          keyword: "authentic cooking class",
                          clicks: 156,
                          impressions: 2100,
                          position: 12,
                        },
                        {
                          keyword: "traditional art workshop",
                          clicks: 89,
                          impressions: 1800,
                          position: 15,
                        },
                        {
                          keyword: "local cultural experience",
                          clicks: 67,
                          impressions: 1200,
                          position: 18,
                        },
                      ].map((keyword, index) => (
                        <div key={index} className="border rounded p-3">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-sm">
                              {keyword.keyword}
                            </p>
                            <Badge variant="outline">#{keyword.position}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                            <span>{keyword.clicks} clicks</span>
                            <span>
                              {keyword.impressions.toLocaleString()} impressions
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Recent Changes</h4>
                    <div className="space-y-2">
                      {[
                        {
                          page: "Cooking Class Page",
                          change: "Improved meta description",
                          impact: "+3 positions",
                        },
                        {
                          page: "Art Workshop Page",
                          change: "Added structured data",
                          impact: "+5 positions",
                        },
                        {
                          page: "About Page",
                          change: "Updated content length",
                          impact: "+2 positions",
                        },
                        {
                          page: "Contact Page",
                          change: "Fixed mobile issues",
                          impact: "+1 position",
                        },
                      ].map((change, index) => (
                        <div key={index} className="border rounded p-3">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-sm">{change.page}</p>
                            <Badge variant="outline" className="text-green-600">
                              {change.impact}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600">
                            {change.change}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SEOOptimizer;
