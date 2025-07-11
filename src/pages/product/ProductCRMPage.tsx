"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "../../../lib/navigation";
import {
  Users,
  Award,
  Heart,
  Calendar,
  ArrowRight,
  Star,
  Zap,
  Target,
  TrendingUp,
  MessageSquare,
  Gift,
} from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useInView } from "react-intersection-observer";

const ProductCRMPage = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
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

  const { ref: demoRef, inView: demoInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    setAnimateItems(true);

    // Auto-rotate demo features
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Users className="h-10 w-10 text-blue-600" />,
      title: "Guest Profiles",
      description:
        "Comprehensive profiles with travel history, preferences, and reviews for personalized experiences.",
      benefits: [
        "Complete travel history",
        "Preference tracking",
        "Review integration",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Award className="h-10 w-10 text-blue-600" />,
      title: "Loyalty System",
      description:
        "Reward repeat guests with trip credits, special invites, and exclusive experiences.",
      benefits: ["Points & rewards", "Tier management", "Exclusive access"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Heart className="h-10 w-10 text-blue-600" />,
      title: "Referral Engine",
      description:
        "Turn guests into advocates with incentives for return visits and friend referrals.",
      benefits: ["Referral tracking", "Reward automation", "Social sharing"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Calendar className="h-10 w-10 text-blue-600" />,
      title: "Journey Automations",
      description:
        "Send birthday trip reminders, anniversary rebooking offers, and cultural festival nudges.",
      benefits: [
        "Smart triggers",
        "Personalized messages",
        "Event-based campaigns",
      ],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-blue-600" />,
      title: "Communication Hub",
      description:
        "Centralized messaging system for all guest interactions and follow-ups.",
      benefits: ["Unified inbox", "Template library", "Response tracking"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Target className="h-10 w-10 text-blue-600" />,
      title: "Guest Segmentation",
      description:
        "Create targeted campaigns based on guest behavior, preferences, and booking patterns.",
      benefits: [
        "Smart segments",
        "Behavioral triggers",
        "Campaign automation",
      ],
      color: "from-blue-500 to-blue-600",
    },
  ];

  const demoFeatures = [
    {
      title: "Guest Profiles",
      description: "Complete guest history and preferences",
      color: "bg-blue-500",
    },
    {
      title: "Loyalty Rewards",
      description: "Automated point system and rewards",
      color: "bg-blue-500",
    },
    {
      title: "Referral Tracking",
      description: "Monitor and reward referrals",
      color: "bg-blue-500",
    },
    {
      title: "Smart Automation",
      description: "Triggered campaigns and follow-ups",
      color: "bg-blue-500",
    },
  ];

  const stats = [
    {
      value: "94%",
      label: "Guest Retention Rate",
      icon: <Heart className="h-6 w-6 text-blue-500" />,
    },
    {
      value: "3.2x",
      label: "Referral Increase",
      icon: <TrendingUp className="h-6 w-6 text-blue-500" />,
    },
    {
      value: "87%",
      label: "Repeat Booking Rate",
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
    },
    {
      value: "45%",
      label: "Revenue Growth",
      icon: <Star className="h-6 w-6 text-blue-500" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1">
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
                  Advanced CRM Platform
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                  Build lasting relationships with your guests
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform one-time visitors into loyal advocates with our
                  comprehensive guest relationship management system designed
                  for cultural experiences.
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
                    <Users className="w-32 h-32 text-blue-600 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-green-500 w-3 h-3 rounded-full animate-ping"></div>
                    <div className="absolute bottom-4 left-4 text-xs text-blue-600 font-medium">
                      Guest Activity
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
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
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
                CRM + Lifecycle Automation
              </h2>
              <p className="text-lg text-gray-600">
                Connect every journey to the next with our comprehensive suite
                of guest relationship management tools.
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
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
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
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
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
                      <div className="text-blue-600 text-sm font-medium flex items-center">
                        <Zap className="mr-2 h-4 w-4" />
                        Explore feature
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section ref={demoRef} className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div
              className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${
                demoInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                See Your CRM in Action
              </h2>
              <p className="text-lg text-gray-600">
                Watch how our CRM system transforms guest relationships in real
                time.
              </p>
            </div>

            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 delay-200 ${
                demoInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="space-y-6">
                {demoFeatures.map((demo, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      activeDemo === index
                        ? "border-blue-500 bg-blue-50 shadow-lg scale-105"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                    }`}
                    onClick={() => setActiveDemo(index)}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-4 h-4 rounded-full ${demo.color} ${
                          activeDemo === index ? "animate-pulse" : ""
                        }`}
                      ></div>
                      <div>
                        <h3 className="font-semibold text-lg">{demo.title}</h3>
                        <p className="text-gray-600">{demo.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-100 to-blue-100 rounded-2xl p-8 aspect-video flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 animate-pulse"></div>
                  <div className="text-center relative z-10">
                    <div
                      className={`w-24 h-24 rounded-full ${demoFeatures[activeDemo].color} flex items-center justify-center mb-4 mx-auto animate-bounce`}
                    >
                      <Gift className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {demoFeatures[activeDemo].title}
                    </h3>
                    <p className="text-gray-600">
                      {demoFeatures[activeDemo].description}
                    </p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                  Live
                </div>
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
                    className="bg-white text-black hover:bg-gray-100 transition-all duration-300 group px-4 py-2 text-sm"
                    asChild
                  >
                    <Link to="/demo">
                      Request a demo
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
                    className="transition-all duration-300 hover:bg-gray-100 group px-4 py-2 text-sm"
                    asChild
                  >
                    <Link to="/how-it-works">
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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

export default ProductCRMPage;
