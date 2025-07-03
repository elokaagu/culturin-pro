"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import NewFooter from "@/components/sections/NewFooter";
import {
  Heart,
  Globe,
  Users,
  Droplets,
  GraduationCap,
  Building,
  Leaf,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react";
import { useInView } from "react-intersection-observer";

// Mock data for pledge signatories
const pledgeSignatories = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Travel Blogger",
    location: "San Francisco, CA",
    image: "/lovable-uploads/1a12120c-6cfd-4fe3-9571-0ea00be99ff3.png",
    contributionAmount: "$2,450",
    joinedDate: "2024-03-15",
    quote:
      "Travel should leave places better than we found them. The Giving Pledge makes this possible.",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Adventure Influencer",
    location: "Barcelona, Spain",
    image: "/lovable-uploads/2e9a9e9e-af76-4913-8148-9fce248d55c9.png",
    contributionAmount: "$3,200",
    joinedDate: "2024-02-28",
    quote:
      "Every adventure can create positive change. I'm proud to be part of this movement.",
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Cultural Explorer",
    location: "Mumbai, India",
    image: "/lovable-uploads/3d2a4fd6-0242-4fb3-bfba-8d3a44eb6e71.png",
    contributionAmount: "$1,875",
    joinedDate: "2024-04-10",
    quote:
      "Supporting local communities through travel creates authentic connections and lasting impact.",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Sustainable Tourism Advocate",
    location: "Seoul, South Korea",
    image: "/lovable-uploads/57645fce-47c3-43f5-82f6-080cd2577e06.png",
    contributionAmount: "$4,100",
    joinedDate: "2024-01-20",
    quote:
      "The future of travel is responsible travel. The Giving Pledge is leading the way.",
  },
  {
    id: 5,
    name: "Elena Popov",
    role: "Photography & Travel",
    location: "Prague, Czech Republic",
    image: "/lovable-uploads/61e2237f-86de-4ec9-8712-8902092d8c9b.png",
    contributionAmount: "$2,800",
    joinedDate: "2024-03-05",
    quote:
      "Through my lens, I see the beauty of the world. Through the pledge, I help preserve it.",
  },
  {
    id: 6,
    name: "James Thompson",
    role: "Adventure Tour Guide",
    location: "Cape Town, South Africa",
    image: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
    contributionAmount: "$3,650",
    joinedDate: "2024-02-15",
    quote:
      "As a guide, I've seen firsthand how tourism can transform communities for the better.",
  },
];

const impactAreas = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "Building schools and providing educational resources",
    projects: "47 schools built",
    color: "bg-blue-100",
  },
  {
    icon: Droplets,
    title: "Clean Water",
    description: "Installing water systems and sanitation facilities",
    projects: "23 water systems installed",
    color: "bg-blue-100",
  },
  {
    icon: Building,
    title: "Infrastructure",
    description: "Developing sustainable community infrastructure",
    projects: "15 community centers built",
    color: "bg-blue-100",
  },
  {
    icon: Leaf,
    title: "Environmental",
    description: "Conservation and sustainable development projects",
    projects: "32 conservation initiatives",
    color: "bg-blue-100",
  },
];

const stats = [
  { label: "Total Pledged", value: "$2.4M", icon: Heart },
  { label: "Countries Impacted", value: "34", icon: Globe },
  { label: "Pledge Signatories", value: "1,247", icon: Users },
  { label: "Projects Funded", value: "117", icon: CheckCircle },
];

export default function GivingPledgePage() {
  const [currentSignatory, setCurrentSignatory] = useState(0);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [animateItems, setAnimateItems] = useState(false);

  const { ref: heroRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Hero slides data
  const heroSlides = [
    {
      id: 1,
      video: "/videos/culturin-pledge-hero.mp4",
      image: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
      title: "The Giving Pledge",
      subtitle:
        "Join travelers and influencers worldwide in dedicating 1% of travel spending to local development projects that build schools, provide clean water, and foster sustainable growth in communities around the globe.",
    },
    {
      id: 2,
      video: "/videos/culturin-pledge-hero-2.mp4",
      image: "/lovable-uploads/3d2a4fd6-0242-4fb3-bfba-8d3a44eb6e71.png",
      title: "Building Communities",
      subtitle:
        "Every journey becomes a force for positive change, creating lasting impact in the places we visit while fostering meaningful connections between travelers and local communities.",
    },
    {
      id: 3,
      video: "/videos/culturin-pledge-hero-3.mp4",
      image: "/lovable-uploads/2e9a9e9e-af76-4913-8148-9fce248d55c9.png",
      title: "Sustainable Impact",
      subtitle:
        "Transform your travel experiences into powerful tools for sustainable development, supporting education, clean water initiatives, and environmental conservation projects worldwide.",
    },
  ];

  useEffect(() => {
    if (inView) {
      setAnimateItems(true);
    }
  }, [inView]);

  // Auto-rotate hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000); // Change slide every 7 seconds
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate signatories carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSignatory((prev) => (prev + 1) % pledgeSignatories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header type="operator" />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <div className="relative w-full h-full transition-all duration-1000 ease-in-out">
            <video
              key={heroSlides[currentHeroSlide].id}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-opacity duration-1000"
            >
              <source
                src={heroSlides[currentHeroSlide].video}
                type="video/mp4"
              />
              {/* Fallback for browsers that don't support video */}
            </video>
            {/* Fallback animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 animate-gradient-x">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 transition-all duration-1000"
                style={{
                  backgroundImage: `url(${heroSlides[currentHeroSlide].image})`,
                }}
              />
              {/* Animated overlay particles */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-float"></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-float-delayed"></div>
                <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/10 rounded-full animate-float-slow"></div>
                <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white/25 rounded-full animate-float"></div>
                <div className="absolute bottom-1/3 right-2/3 w-2 h-2 bg-white/15 rounded-full animate-float-delayed"></div>
              </div>
            </div>
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 max-w-4xl">
          <div className="text-center text-white">
            <div
              key={heroSlides[currentHeroSlide].id}
              className={`transition-all duration-700 ease-out ${
                animateItems
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Heart className="w-6 h-6 text-white" />
                <span className="text-lg font-medium">
                  Making Travel Matter
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight transition-all duration-500">
                {heroSlides[currentHeroSlide].title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-500">
                {heroSlides[currentHeroSlide].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-5 px-8 rounded-xl text-lg h-auto"
                >
                  Take the Pledge
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-black bg-white hover:bg-gray-100 backdrop-blur-sm py-5 px-8 rounded-xl text-lg h-auto transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>

              {/* Hero Carousel Indicators */}
              <div className="flex justify-center mt-8 gap-2">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentHeroSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      index === currentHeroSlide ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-700 ease-out ${
                  animateItems
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple, transparent, and impactful - every booking makes a
              difference
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Book Your Experience",
                description:
                  "Choose from thousands of Culturin-affiliated tours and experiences worldwide",
              },
              {
                step: "02",
                title: "Automatic Contribution",
                description:
                  "1% of your booking automatically goes to the Giving Pledge fund",
              },
              {
                step: "03",
                title: "Track Your Impact",
                description:
                  "See exactly how your contributions are making a difference in communities",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm"
              >
                <div className="text-4xl font-bold text-gray-200 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Impact Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Supporting sustainable development across four key areas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 ${area.color} rounded-full flex items-center justify-center`}
                >
                  <area.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                  {area.title}
                </h3>
                <p className="text-gray-600 mb-4 text-center text-sm">
                  {area.description}
                </p>
                <div className="text-center">
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-700"
                  >
                    {area.projects}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pledge Signatories Carousel */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pledge Signatories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join these travelers and influencers who are making a difference
            </p>
          </div>

          <div className="relative">
            <div className="bg-gray-50 rounded-xl p-8 md:p-12 border border-gray-200">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden">
                    <img
                      src={pledgeSignatories[currentSignatory].image}
                      alt={pledgeSignatories[currentSignatory].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg md:text-xl text-gray-900 mb-4 italic">
                    "{pledgeSignatories[currentSignatory].quote}"
                  </blockquote>
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {pledgeSignatories[currentSignatory].name}
                      </div>
                      <div className="text-gray-600">
                        {pledgeSignatories[currentSignatory].role} •{" "}
                        {pledgeSignatories[currentSignatory].location}
                      </div>
                    </div>
                    <div className="md:ml-auto">
                      <Badge className="bg-green-100 text-green-800">
                        Contributed{" "}
                        {pledgeSignatories[currentSignatory].contributionAmount}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {pledgeSignatories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSignatory(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSignatory ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-blue-600">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Make Your Travel Matter?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the movement of conscious travelers who believe that every
            journey should leave a positive impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 py-5 px-8 rounded-xl text-lg h-auto"
            >
              Take the Pledge Now
              <Heart className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-black bg-white hover:bg-gray-100 backdrop-blur-sm py-5 px-8 rounded-xl text-lg h-auto transition-all duration-300"
            >
              View Impact Report
            </Button>
          </div>
        </div>
      </section>

      <NewFooter />
    </div>
  );
}
