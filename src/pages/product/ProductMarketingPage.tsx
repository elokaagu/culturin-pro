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

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="bg-gradient-to-br from-orange-50 via-white to-pink-50 py-24 overflow-hidden"
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
                <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-6 animate-pulse">
                  🚀 AI-Powered Marketing Suite
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-orange-600 bg-clip-text text-transparent">
                  Market your cultural experiences effectively
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                  Reach more travelers and fill your tours with our specialized
                  marketing tools built for cultural experience creators.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="bg-orange-600 hover:bg-orange-700 text-white text-lg py-6 px-8 rounded-xl h-auto group transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    asChild
                  >
                    <Link to="/demo">
                      Try Marketing Tools
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white border border-gray-300 text-gray-800 text-lg py-6 px-8 rounded-xl h-auto hover:border-orange-300 hover:shadow-md transition-all duration-300"
                    asChild
                  >
                    <Link to="/sign-in">Start Free Trial</Link>
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
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-pink-400/20 rounded-2xl blur-xl"></div>
                  <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-2xl p-8 aspect-video flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-pink-400/20 animate-pulse"></div>
                    <Megaphone className="w-32 h-32 text-orange-600 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-green-500 w-3 h-3 rounded-full animate-ping"></div>
                    <div className="absolute bottom-4 left-4 text-xs text-orange-600 font-medium">
                      AI Marketing
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-6 text-center transition-all duration-1000 ${
                statsInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 hover:scale-105 cursor-pointer group delay-${
                    (index + 1) * 100
                  }`}
                >
                  <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="bg-gray-50 py-24">
          <div className="container mx-auto px-4">
            <div
              className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${
                featuresInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Complete Marketing Toolkit
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to promote your cultural experiences and
                reach more travelers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`transition-all duration-700 hover:shadow-xl hover:-translate-y-2 cursor-pointer group border-0 bg-white ${
                    featuresInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <CardContent className="p-8">
                    <div
                      className={`mb-6 transition-all duration-300 ${
                        hoveredFeature === index ? "scale-110" : "scale-100"
                      }`}
                    >
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                      >
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-orange-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div
                          key={benefitIndex}
                          className="flex items-center text-sm text-gray-500"
                        >
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                          {benefit}
                        </div>
                      ))}
                    </div>
                    <div
                      className={`mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                        hoveredFeature === index
                          ? "translate-y-0"
                          : "translate-y-2"
                      }`}
                    >
                      <div className="text-orange-600 text-sm font-medium flex items-center">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Try this tool
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                How It Works
              </h2>
              <p className="text-lg text-gray-600">
                Get started with our marketing tools in just a few simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <span className="text-2xl font-bold text-orange-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Set Up Your Profile
                </h3>
                <p className="text-gray-600">
                  Tell us about your cultural experiences and target audience.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Create Content</h3>
                <p className="text-gray-600">
                  Use our AI tools to generate compelling descriptions and
                  marketing copy.
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <span className="text-2xl font-bold text-orange-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Launch & Optimize
                </h3>
                <p className="text-gray-600">
                  Publish your campaigns and track performance with detailed
                  analytics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What Our Customers Say
              </h2>
              <p className="text-lg text-gray-600">
                See how cultural experience providers are growing their
                businesses with our marketing tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Maria Rodriguez",
                  role: "Food Tour Operator",
                  location: "Barcelona, Spain",
                  content:
                    "Our bookings increased by 40% after using Culturin's marketing tools. The AI content generator saves us hours every week.",
                  rating: 5,
                },
                {
                  name: "Kenji Tanaka",
                  role: "Cultural Workshop Leader",
                  location: "Kyoto, Japan",
                  content:
                    "The SEO optimization features helped us reach travelers who are genuinely interested in authentic cultural experiences.",
                  rating: 5,
                },
                {
                  name: "Sofia Andersson",
                  role: "Heritage Tour Guide",
                  location: "Stockholm, Sweden",
                  content:
                    "Social media management became so much easier. We can now focus on creating amazing experiences instead of marketing.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonial.role}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonial.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Simple AI Demo Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Try Our AI Content Generator
                </h2>
                <p className="text-lg text-gray-600">
                  See how our AI can help you create compelling marketing
                  content in seconds.
                </p>
              </div>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-orange-600" />
                    AI Experience Description Generator
                  </CardTitle>
                  <CardDescription>
                    Create compelling descriptions that capture the essence of
                    your cultural experiences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Experience Title *
                        </label>
                        <Input
                          placeholder="e.g., Traditional Pottery Workshop"
                          value={formData.title}
                          onChange={(e) =>
                            handleInputChange("title", e.target.value)
                          }
                          className="transition-all duration-300 focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Cultural Elements *
                        </label>
                        <Textarea
                          placeholder="e.g., Traditional techniques, local artisans, historical significance"
                          value={formData.culturalElements}
                          onChange={(e) =>
                            handleInputChange(
                              "culturalElements",
                              e.target.value
                            )
                          }
                          className="transition-all duration-300 focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Location *
                        </label>
                        <Input
                          placeholder="e.g., Kyoto, Japan"
                          value={formData.location}
                          onChange={(e) =>
                            handleInputChange("location", e.target.value)
                          }
                          className="transition-all duration-300 focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Duration
                        </label>
                        <Select
                          value={formData.duration}
                          onValueChange={(value) =>
                            handleInputChange("duration", value)
                          }
                        >
                          <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-orange-500">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-2 hours">1-2 hours</SelectItem>
                            <SelectItem value="Half day">Half day</SelectItem>
                            <SelectItem value="Full day">Full day</SelectItem>
                            <SelectItem value="Multi-day">Multi-day</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleGenerateContent("description")}
                    disabled={isGenerating}
                    className="w-full bg-orange-600 hover:bg-orange-700 transition-all duration-300 hover:scale-105"
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
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-orange-600 to-pink-600 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div
                className={`transition-all duration-1000 ${
                  animateItems
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to supercharge your marketing?
                </h2>
                <p className="text-xl text-orange-100 mb-8 leading-relaxed">
                  Join thousands of cultural experience providers who are
                  growing their businesses with our marketing tools.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-orange-600 hover:bg-gray-100 group transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    asChild
                  >
                    <Link to="/demo">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-white border-white hover:bg-white hover:text-orange-600 transition-all duration-300"
                    asChild
                  >
                    <Link to="/contact">Contact Sales</Link>
                  </Button>
                </div>
                <div className="mt-6 flex justify-center space-x-8 text-orange-100">
                  <div className="flex items-center">
                    <Sparkles className="h-5 w-5 mr-2" />
                    <span>AI powered tools</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    <span>14 day free trial</span>
                  </div>
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
