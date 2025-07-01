"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar,
  Briefcase,
  MapPin,
  Heart,
  Globe,
  Sparkles,
  ArrowRight,
  Quote,
  TrendingUp,
  Award,
  Coffee,
  Plane,
  Camera,
} from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import Image from "@/components/ui/image";
import { Link } from "../../lib/navigation";

const OurStoryPage = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const [activeStory, setActiveStory] = useState(0);

  useEffect(() => {
    setAnimateItems(true);
  }, []);

  const storyMoments = [
    {
      year: "2023",
      season: "Summer",
      title: "The Rooftop Revelation",
      subtitle: "Cannes, France",
      description:
        "Two friends, a rooftop in Cannes, and a shared frustration with how broken travel had become. That conversation sparked everything.",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop",
      icon: <Coffee className="h-6 w-6" />,
      color: "from-amber-500 to-orange-600",
    },
    {
      year: "2023",
      season: "Fall",
      title: "AmAfrobeat Experience",
      subtitle: "Global Launch",
      description:
        "Our signature cultural experiences debuted at Cannes, UNGA, New York Fashion Week, and Notting Hill Carnival—proving the world was hungry for authentic connection.",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2000&auto=format&fit=crop",
      icon: <Sparkles className="h-6 w-6" />,
      color: "from-purple-500 to-pink-600",
    },
    {
      year: "2024",
      season: "All Year",
      title: "Creator Network Born",
      subtitle: "500+ Cultural Storytellers",
      description:
        "We built a community of local hosts, guides, and experience creators—each bringing their unique cultural perspective to travelers worldwide.",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2000&auto=format&fit=crop",
      icon: <Users className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-600",
    },
    {
      year: "2025",
      season: "Now",
      title: "Platform Revolution",
      subtitle: "The Future of Cultural Travel",
      description:
        "From events to a full platform—we're building the infrastructure for the next generation of cultural explorers and experience-makers.",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2000&auto=format&fit=crop",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "from-green-500 to-teal-600",
    },
  ];

  const coreValues = [
    {
      icon: <Heart className="h-10 w-10" />,
      title: "Authentic Connection",
      description:
        "Every experience should create genuine bonds between cultures, not just photo opportunities.",
      stat: "98%",
      statLabel: "meaningful connections made",
      gradient: "from-red-500 to-pink-600",
    },
    {
      icon: <Globe className="h-10 w-10" />,
      title: "Global Community",
      description:
        "We're building bridges between local storytellers and global explorers, one experience at a time.",
      stat: "50+",
      statLabel: "countries represented",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      icon: <Sparkles className="h-10 w-10" />,
      title: "Cultural Innovation",
      description:
        "Merging timeless cultural wisdom with modern technology to create unforgettable journeys.",
      stat: "500+",
      statLabel: "unique experiences created",
      gradient: "from-amber-500 to-orange-600",
    },
  ];

  const achievements = [
    { number: "500K+", label: "Cultural Connections Made" },
    { number: "50+", label: "Countries & Cultures" },
    { number: "500+", label: "Local Experience Creators" },
    { number: "98%", label: "Traveler Satisfaction" },
  ];

  const founders = [
    {
      name: "Unik Ernest",
      role: "Co-Founder & CEO",
      title: "Cultural Visionary",
      bio: "Cultural entrepreneur with deep roots in travel and impact. Unik leads vision, partnerships, and cultural strategy—drawing from decades of experience across travel, nightlife, and global philanthropy.",
      image: "/unik-ernest-headshot.png",
      expertise: [
        "Cultural Strategy",
        "Global Partnerships",
        "Community Building",
      ],
      quote: "Travel should be a bridge between cultures, not a barrier.",
      background: "from-blue-600 to-purple-700",
    },
    {
      name: "Eloka Agu",
      role: "Co-Founder & CTO",
      title: "Creative Technologist",
      bio: "Creative technologist and systems designer. Eloka leads product, brand, and platform design—merging community insight with elegant technology to build meaningful connections.",
      image: "/eloka-agu-headshot.png",
      expertise: ["Product Design", "Technology", "Brand Strategy"],
      quote: "The best technology disappears, leaving only human connection.",
      background: "from-green-600 to-teal-700",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1">
        {/* Hero Section - Completely Redesigned */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background with parallax effect */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2000&auto=format&fit=crop"
              alt="Cultural experiences around the world"
              className="w-full h-full object-cover"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              Born from a rooftop conversation in Cannes
            </Badge>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              Our
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Story
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-gray-200">
              Two friends frustrated with broken travel experiences. One rooftop
              conversation. A platform that's changing how the world explores
              culture.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100"
                asChild
              >
                <Link to="/culturin-pro">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                Watch Our Story
                <Camera className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-sm text-gray-300">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Interactive Story Timeline */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-800">
                <MapPin className="h-4 w-4 mr-2" />
                Our Journey
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                From Conversation to Revolution
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every great platform starts with a problem. Ours started with
                two friends who couldn't find the travel experiences they
                actually wanted.
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              {storyMoments.map((moment, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center mb-20 last:mb-0 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="lg:w-1/2 mb-8 lg:mb-0">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                      <Image
                        src={moment.image}
                        alt={moment.title}
                        className="w-full h-80 object-cover"
                        fill
                      />
                      <div
                        className={`absolute top-4 left-4 p-3 rounded-full bg-gradient-to-r ${moment.color} text-white`}
                      >
                        {moment.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`lg:w-1/2 ${
                      index % 2 === 1 ? "lg:pr-12" : "lg:pl-12"
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <Badge
                        className={`bg-gradient-to-r ${moment.color} text-white border-0`}
                      >
                        {moment.year} • {moment.season}
                      </Badge>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold mb-2">
                      {moment.title}
                    </h3>
                    <p className="text-lg text-blue-600 font-semibold mb-4">
                      {moment.subtitle}
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {moment.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section - Redesigned */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-purple-100 text-purple-800">
                <Heart className="h-4 w-4 mr-2" />
                What Drives Us
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These aren't just words on a wall. They're the principles that
                guide every decision, every feature, and every experience we
                create.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {coreValues.map((value, index) => (
                <div
                  key={index}
                  className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
                >
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${value.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {value.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {value.description}
                  </p>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {value.stat}
                    </div>
                    <div className="text-sm text-gray-500">
                      {value.statLabel}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founders Section - Completely Redesigned */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                <Award className="h-4 w-4 mr-2" />
                Leadership Team
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Meet the Visionaries
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Two founders with complementary expertise, united by a shared
                vision to transform how the world experiences culture.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {founders.map((founder, index) => (
                <div key={index} className="group relative">
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${founder.background} rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                  ></div>

                  <div className="relative p-8 lg:p-12">
                    {/* Profile Image */}
                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-8">
                      <div className="relative">
                        <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-white/20 group-hover:border-white/40 transition-colors duration-300">
                          <Image
                            src={founder.image}
                            alt={founder.name}
                            className="w-full h-full object-cover"
                            fill
                          />
                        </div>
                        <div
                          className={`absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r ${founder.background} rounded-full flex items-center justify-center`}
                        >
                          <Sparkles className="h-6 w-6 text-white" />
                        </div>
                      </div>

                      <div className="text-center lg:text-left">
                        <h3 className="text-3xl font-bold mb-2">
                          {founder.name}
                        </h3>
                        <p className="text-xl text-blue-400 mb-2">
                          {founder.role}
                        </p>
                        <Badge
                          className={`bg-gradient-to-r ${founder.background} text-white border-0`}
                        >
                          {founder.title}
                        </Badge>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                      <Quote className="h-8 w-8 text-blue-400 mb-4" />
                      <p className="text-lg italic text-gray-300 leading-relaxed">
                        "{founder.quote}"
                      </p>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-300 leading-relaxed mb-8">
                      {founder.bio}
                    </p>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2">
                      {founder.expertise.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors duration-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                <Plane className="h-4 w-4 mr-2" />
                Join the Journey
              </Badge>

              <h2 className="text-4xl md:text-6xl font-bold mb-8">
                Ready to Transform Travel?
              </h2>

              <p className="text-xl md:text-2xl mb-12 text-blue-100 leading-relaxed">
                Whether you're a traveler seeking authentic experiences or a
                creator ready to share your culture with the world, Culturin is
                your platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  asChild
                >
                  <Link to="/culturin-pro">
                    Start Creating Experiences
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  asChild
                >
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>

              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-blue-100 text-lg">
                  This is travel—powered by culture, built for connection.
                  <br />
                  <span className="font-semibold text-white">
                    It's a new way to see the world—and your place in it.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
};

export default OurStoryPage;
