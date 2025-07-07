"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "../../../lib/navigation";
import {
  Globe,
  Megaphone,
  Search,
  Zap,
  FileText,
  Instagram,
  Star,
  Calendar,
  PencilIcon,
  Image,
  LayoutGrid,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Target,
  Users,
  MessageSquare,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import NewFooter from "@/components/sections/NewFooter";
import { useInView } from "react-intersection-observer";

const ProductMarketingPage = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("description");
  const [toneValue, setToneValue] = useState<number>(50);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [activeDemo, setActiveDemo] = useState<number>(0);

  // Intersection observers for scroll animations
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: toolkitRef, inView: toolkitInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Form state for tour description
  const [formData, setFormData] = useState({
    title: "",
    culturalElements: "",
    location: "",
    duration: "",
    writingStyle: "engaging",
  });

  useEffect(() => {
    setAnimateItems(true);

    // Auto-rotate demo features
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenerateContent = async (type: string) => {
    if (type === "description") {
      // Validate required fields
      if (!formData.title || !formData.culturalElements || !formData.location) {
        alert(
          "Please fill in the Experience Title, Cultural Elements, and Location fields."
        );
        return;
      }

      setIsGenerating(true);
      setGeneratedContent("");

      try {
        const response = await fetch("/api/generate-description", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to generate description");
        }

        setGeneratedContent(data.description);
      } catch (error) {
        console.error("Error generating description:", error);
        setGeneratedContent(
          "Sorry, there was an error generating the description. Please try again."
        );
      } finally {
        setIsGenerating(false);
      }
    } else {
      // For other content types, use the existing placeholder logic
      console.log(`Generating content for: ${type}`);
    }
  };

  const features = [
    {
      icon: <Megaphone className="h-10 w-10 text-orange-600" />,
      title: "AI Content Creation",
      description:
        "Generate compelling descriptions, social media posts, and marketing copy tailored to your cultural experiences.",
      benefits: [
        "Auto-generated descriptions",
        "Social media content",
        "SEO optimization",
      ],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Search className="h-10 w-10 text-blue-600" />,
      title: "SEO Optimization",
      description:
        "Improve your search rankings with culturally-relevant keywords and optimized content structures.",
      benefits: ["Keyword research", "Content optimization", "Local SEO"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Instagram className="h-10 w-10 text-pink-600" />,
      title: "Social Media Tools",
      description:
        "Create engaging social media content that showcases your cultural experiences authentically.",
      benefits: ["Content templates", "Scheduling tools", "Analytics tracking"],
      color: "from-pink-500 to-purple-500",
    },
    {
      icon: <Target className="h-10 w-10 text-green-600" />,
      title: "Audience Targeting",
      description:
        "Reach the right travelers with precision targeting based on cultural interests and travel behavior.",
      benefits: [
        "Demographic targeting",
        "Interest-based ads",
        "Behavioral insights",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Globe className="h-10 w-10 text-indigo-600" />,
      title: "Multi-Channel Campaigns",
      description:
        "Coordinate marketing efforts across multiple platforms for maximum reach and impact.",
      benefits: [
        "Cross-platform sync",
        "Unified messaging",
        "Campaign tracking",
      ],
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-teal-600" />,
      title: "Performance Analytics",
      description:
        "Track your marketing performance and optimize campaigns based on real-time data.",
      benefits: ["ROI tracking", "Conversion metrics", "A/B testing"],
      color: "from-teal-500 to-cyan-500",
    },
  ];

  const demoFeatures = [
    {
      title: "AI Content Generator",
      description: "Create compelling descriptions instantly",
      color: "bg-orange-500",
    },
    {
      title: "SEO Optimizer",
      description: "Boost your search rankings",
      color: "bg-blue-500",
    },
    {
      title: "Social Media Planner",
      description: "Schedule and manage posts",
      color: "bg-pink-500",
    },
    {
      title: "Campaign Analytics",
      description: "Track performance metrics",
      color: "bg-green-500",
    },
  ];

  const stats = [
    {
      value: "3.2x",
      label: "Increase in Bookings",
      icon: <TrendingUp className="h-6 w-6 text-green-500" />,
    },
    {
      value: "85%",
      label: "Time Saved on Content",
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
    },
    {
      value: "94%",
      label: "Improved SEO Rankings",
      icon: <Search className="h-6 w-6 text-blue-500" />,
    },
    {
      value: "67%",
      label: "Social Engagement Boost",
      icon: <Instagram className="h-6 w-6 text-pink-500" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-24 overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div
                className={`lg:w-1/2 transition-all duration-1000 ease-out ${
                  heroInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-12"
                }`}
              >
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6 animate-pulse">
                  🚀 AI Powered Marketing Suite
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                  Market your cultural experiences effectively
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                  Reach more travelers and fill your tours with our specialized
                  marketing tools built for cultural experience creators.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8 rounded-xl h-auto group transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    asChild
                  >
                    <Link to="/demo">
                      Request a demo
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white border border-gray-300 text-gray-800 text-lg py-6 px-8 rounded-xl h-auto hover:border-blue-300 hover:shadow-md transition-all duration-300"
                    asChild
                  >
                    <Link to="/sign-in">Learn more</Link>
                  </Button>
                </div>
              </div>
              <div
                className={`lg:w-1/2 transition-all duration-1000 ease-out delay-200 ${
                  heroInView
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-12"
                }`}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-2xl blur-xl"></div>
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 aspect-video flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 animate-pulse"></div>
                    <Megaphone className="w-32 h-32 text-blue-600 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-green-500 w-3 h-3 rounded-full animate-ping"></div>
                    <div className="absolute bottom-4 left-4 text-xs text-blue-600 font-medium">
                      AI Marketing
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI-Powered Marketing Toolkit Section */}
        <section
          ref={toolkitRef}
          className="bg-gradient-to-b from-blue-50 to-white py-24"
        >
          <div className="container mx-auto px-4">
            <div
              className={`max-w-4xl mx-auto mb-16 text-center transition-all duration-1000 ${
                toolkitInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                AI-Powered Marketing Toolkit
              </h2>
              <p className="text-lg text-gray-600">
                Create professional marketing content in minutes with our AI
                tools designed specifically for cultural experience operators.
              </p>
            </div>

            <div
              className={`max-w-5xl mx-auto transition-all duration-1000 delay-200 ${
                toolkitInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Tabs
                defaultValue={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8">
                  <TabsTrigger
                    value="description"
                    className="flex items-center gap-1 transition-all duration-300 hover:scale-105"
                  >
                    <FileText className="h-4 w-4" /> Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="blog"
                    className="flex items-center gap-1 transition-all duration-300 hover:scale-105"
                  >
                    <FileText className="h-4 w-4" /> Blog
                  </TabsTrigger>
                  <TabsTrigger
                    value="social"
                    className="flex items-center gap-1 transition-all duration-300 hover:scale-105"
                  >
                    <Instagram className="h-4 w-4" /> Social
                  </TabsTrigger>
                  <TabsTrigger
                    value="visual"
                    className="flex items-center gap-1 transition-all duration-300 hover:scale-105"
                  >
                    <Image className="h-4 w-4" /> Visual
                  </TabsTrigger>
                  <TabsTrigger
                    value="seo"
                    className="flex items-center gap-1 transition-all duration-300 hover:scale-105"
                  >
                    <Search className="h-4 w-4" /> SEO
                  </TabsTrigger>
                  <TabsTrigger
                    value="calendar"
                    className="flex items-center gap-1 transition-all duration-300 hover:scale-105"
                  >
                    <Calendar className="h-4 w-4" /> Calendar
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="space-y-6">
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-blue-600" />
                        AI-Powered Tour Description Writer
                      </CardTitle>
                      <CardDescription>
                        Create compelling tour descriptions that highlight the
                        unique cultural aspects of your experiences.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Experience Title
                            </label>
                            <Input
                              placeholder="Traditional Cooking Class in Barcelona"
                              value={formData.title}
                              onChange={(e) =>
                                handleInputChange("title", e.target.value)
                              }
                              className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Key Cultural Elements
                            </label>
                            <Textarea
                              placeholder="Traditional recipes, local ingredients, family cooking traditions..."
                              value={formData.culturalElements}
                              onChange={(e) =>
                                handleInputChange(
                                  "culturalElements",
                                  e.target.value
                                )
                              }
                              className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                              rows={4}
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Location
                            </label>
                            <Input
                              placeholder="Barcelona, Spain"
                              value={formData.location}
                              onChange={(e) =>
                                handleInputChange("location", e.target.value)
                              }
                              className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Duration
                            </label>
                            <Input
                              placeholder="3 hours"
                              value={formData.duration}
                              onChange={(e) =>
                                handleInputChange("duration", e.target.value)
                              }
                              className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Writing Style
                            </label>
                            <Select
                              value={formData.writingStyle}
                              onValueChange={(value) =>
                                handleInputChange("writingStyle", value)
                              }
                            >
                              <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-blue-500">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="engaging">
                                  Engaging & Exciting
                                </SelectItem>
                                <SelectItem value="professional">
                                  Professional
                                </SelectItem>
                                <SelectItem value="storytelling">
                                  Storytelling
                                </SelectItem>
                                <SelectItem value="informative">
                                  Informative
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleGenerateContent("description")}
                        disabled={isGenerating}
                        className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                      >
                        {isGenerating ? (
                          <>
                            <Zap className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Description
                          </>
                        )}
                      </Button>
                      {generatedContent && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg border transition-all duration-300 hover:shadow-md">
                          <h4 className="font-medium mb-2">
                            Generated Description:
                          </h4>
                          <p className="text-gray-700 leading-relaxed">
                            {generatedContent}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Other tab contents would go here... */}
                <TabsContent value="blog">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        Blog Post Generator
                      </CardTitle>
                      <CardDescription>
                        Create engaging blog posts about your cultural
                        experiences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FileText className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          Blog Content Generator
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Coming soon - AI-powered blog post creation
                        </p>
                        <Badge variant="secondary">In Development</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="social">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Instagram className="h-5 w-5 text-pink-600" />
                        Social Media Content
                      </CardTitle>
                      <CardDescription>
                        Generate social media posts for your experiences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Instagram className="h-8 w-8 text-pink-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          Social Media Toolkit
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Coming soon - Social media content creation
                        </p>
                        <Badge variant="secondary">In Development</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="visual">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Image className="h-5 w-5 text-green-600" />
                        Visual Content Creator
                      </CardTitle>
                      <CardDescription>
                        Create stunning visuals for your marketing campaigns
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Image className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          Visual Content Tools
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Coming soon - AI-powered visual content
                        </p>
                        <Badge variant="secondary">In Development</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="seo">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Search className="h-5 w-5 text-indigo-600" />
                        SEO Optimizer
                      </CardTitle>
                      <CardDescription>
                        Optimize your content for search engines
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Search className="h-8 w-8 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          SEO Tools
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Coming soon - Advanced SEO optimization
                        </p>
                        <Badge variant="secondary">In Development</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="calendar">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        Content Calendar
                      </CardTitle>
                      <CardDescription>
                        Plan and schedule your marketing content
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Calendar className="h-8 w-8 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          Content Calendar
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Coming soon - Marketing calendar planning
                        </p>
                        <Badge variant="secondary">In Development</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Promote Your Experiences Section */}
        <section ref={featuresRef} className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div
              className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${
                featuresInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Promote your experiences
              </h2>
              <p className="text-lg text-gray-600">
                Our marketing tools help you showcase your cultural experiences
                to the right audience at the right time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <Search className="h-12 w-12 text-blue-600" />,
                  title: "SEO Optimization",
                  description:
                    "Get found online with our SEO tools designed specifically for tourism and cultural experiences.",
                },
                {
                  icon: <Globe className="h-12 w-12 text-blue-600" />,
                  title: "Social Media Integration",
                  description:
                    "Easily share your experiences across social platforms and track engagement.",
                },
                {
                  icon: <Zap className="h-12 w-12 text-blue-600" />,
                  title: "Promotional Campaigns",
                  description:
                    "Create and manage special offers, seasonal promotions, and discount codes.",
                },
                {
                  icon: <FileText className="h-12 w-12 text-blue-600" />,
                  title: "Content Creation",
                  description:
                    "AI-powered tools to create compelling descriptions, blogs, and marketing materials.",
                },
                {
                  icon: <Image className="h-12 w-12 text-blue-600" />,
                  title: "Visual Materials",
                  description:
                    "Design professional flyers, itineraries, and visual assets for your experiences.",
                },
                {
                  icon: <Calendar className="h-12 w-12 text-blue-600" />,
                  title: "Seasonal Planning",
                  description:
                    "Stay ahead with content calendars featuring cultural events and promotion suggestions.",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className={`transition-all duration-700 hover:shadow-xl hover:-translate-y-2 cursor-pointer group border-0 bg-white ${
                    featuresInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-8 text-center">
                    <div className="mb-6 flex justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl font-medium text-gray-900 mb-8 italic">
                "Before Culturin's Marketing Toolkit, I was spending thousands
                on a marketing agency. Now I create professional content in
                minutes that actually converts better because it's authentic to
                my experience."
              </blockquote>
              <div>
                <div className="font-semibold text-gray-900 text-lg">
                  Maria Gonzalez
                </div>
                <div className="text-gray-600">Barcelona Food Tours</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-black text-white p-8 rounded-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-2xl font-bold mb-4">Get a free demo</h3>
                  <p className="text-gray-300 mb-6">
                    See how Culturin can transform your business
                  </p>
                  <Button
                    className="bg-white text-black hover:bg-gray-100 transition-all duration-300 group px-6 py-3 text-base"
                    asChild
                  >
                    <Link to="/demo">
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
                <div className="bg-gray-50 p-8 rounded-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-2xl font-bold mb-4">See how it works</h3>
                  <p className="text-gray-600 mb-6">
                    Explore our platform features and benefits
                  </p>
                  <Button
                    variant="outline"
                    className="transition-all duration-300 hover:bg-gray-100 group px-6 py-3 text-base"
                    asChild
                  >
                    <Link to="/how-it-works">
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
};

export default ProductMarketingPage;
