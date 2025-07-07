"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "../../../lib/navigation";
import {
  BarChart,
  RefreshCcw,
  TrendingUp,
  Users,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import { useInView } from "react-intersection-observer";

const ProductAnalyticsPage = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Intersection observers for scroll animations
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    setAnimateItems(true);
  }, []);

  const features = [
    {
      icon: <TrendingUp className="h-10 w-10 text-blue-600" />,
      title: "Performance Metrics",
      description:
        "Track key performance indicators like bookings, revenue, and customer satisfaction.",
      metrics: ["98% accuracy", "Real time updates", "Custom dashboards"],
    },
    {
      icon: <Users className="h-10 w-10 text-blue-600" />,
      title: "Audience Insights",
      description:
        "Understand who your customers are, where they come from, and what they're interested in.",
      metrics: [
        "50+ data points",
        "Behavioral analysis",
        "Demographic insights",
      ],
    },
    {
      icon: <RefreshCcw className="h-10 w-10 text-blue-600" />,
      title: "Real Time Updates",
      description:
        "Get up-to-the-minute data on your business performance and customer activity.",
      metrics: ["Live data streams", "Instant notifications", "Auto refresh"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-24">
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
                  ✨ Advanced Analytics Platform
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                  Data driven insights for your cultural experiences
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Understand your business performance, identify trends, and
                  make informed decisions with our powerful analytics dashboard.
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
                    <Link to="/sign-in">Get started</Link>
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
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 aspect-video flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
                  <BarChart className="w-32 h-32 text-blue-600 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-green-500 w-3 h-3 rounded-full animate-ping"></div>
                  <div className="absolute bottom-4 left-4 text-xs text-blue-600 font-medium">
                    Live Analytics
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-6 text-center transition-all duration-1000 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {[
                { value: "98%", label: "Data Accuracy", delay: "delay-100" },
                {
                  value: "50+",
                  label: "Analytics Metrics",
                  delay: "delay-200",
                },
                {
                  value: "24/7",
                  label: "Real Time Monitoring",
                  delay: "delay-300",
                },
                { value: "5min", label: "Setup Time", delay: "delay-400" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`${stat.delay} transition-all duration-700 hover:scale-105`}
                >
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Make data driven decisions
              </h2>
              <p className="text-lg text-gray-600">
                Our analytics dashboard gives you the insights you need to
                optimize your experiences and grow your business.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`bg-white p-8 rounded-2xl border border-gray-200 shadow-sm transition-all duration-700 hover:shadow-xl hover:-translate-y-2 cursor-pointer group ${
                    featuresInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className={`mb-5 transition-transform duration-300 ${
                      hoveredCard === index ? "scale-110" : "scale-100"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.metrics.map((metric, metricIndex) => (
                      <div
                        key={metricIndex}
                        className="flex items-center text-sm text-gray-500"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        {metric}
                      </div>
                    ))}
                  </div>
                  <div
                    className={`mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                      hoveredCard === index ? "translate-y-0" : "translate-y-2"
                    }`}
                  >
                    <div className="text-blue-600 text-sm font-medium flex items-center">
                      Learn more <ChevronDown className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </div>
              ))}
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

export default ProductAnalyticsPage;
