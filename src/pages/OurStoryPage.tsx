"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { Users, Calendar, Briefcase } from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";

const OurStoryPage = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);

  useEffect(() => {
    setAnimateItems(true);
  }, []);

  const milestones = [
    {
      year: "2023",
      title: "The Rooftop Conversation",
      description:
        "At a rooftop in Cannes during Lions Festival week, Unik and Eloka had a conversation about how broken the travel experience felt for both explorers and experience creators.",
    },
    {
      year: "2023",
      title: "AmAfrobeat Experience",
      description:
        "Launched our signature AmAfrobeat Experience events at Cannes, UNGA, New York Fashion Week, and Notting Hill Carnival, proving the demand for authentic cultural experiences.",
    },
    {
      year: "2024",
      title: "Creator Network",
      description:
        "Built our first 500-member creator network, connecting experience makers with modern tools and a global audience.",
    },
    {
      year: "2025",
      title: "Platform Evolution",
      description:
        "Expanding from events to a full platform—bridging meaningful travel with modern infrastructure for the next generation.",
    },
  ];

  const values = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Authentic Connection",
      description:
        "Travel should feel personal, not packaged. We curate experiences that create genuine cultural connections.",
    },
    {
      icon: <Briefcase className="h-8 w-8 text-blue-600" />,
      title: "Global Community",
      description:
        "We empower local hosts, guides, and storytellers to share their culture with a worldwide audience.",
    },
    {
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      title: "Modern Infrastructure",
      description:
        "Bridging the gap between meaningful experiences and the tools needed to scale them effectively.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Our Story
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Culturin began with a simple frustration: travel was either too
                rigid or too random.
              </p>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                On one side, there were traditional travel agencies—outdated,
                overpriced, and out of touch with what modern explorers really
                wanted. On the other, there were endless recommendation lists
                and chaotic group chats that made planning feel overwhelming. We
                knew there had to be a better way—one that felt curated,
                connected, and culturally rich.
              </p>
              <p className="text-xl font-semibold text-gray-800 mb-10">
                So we built Culturin.
              </p>
            </div>
            <div className="mt-16 aspect-video max-w-5xl overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=2000&auto=format&fit=crop"
                alt="Culturin team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Milestones Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-16 text-center">
              Our Journey
            </h2>

            <div className="max-w-4xl mx-auto">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-start md:items-center mb-16 last:mb-0 transition-all duration-500 ${
                    animateItems
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="md:w-1/4 mb-4 md:mb-0">
                    <span className="text-4xl font-bold text-blue-600">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="md:w-3/4 md:pl-8">
                    <h3 className="text-2xl font-bold mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                    {index < milestones.length - 1 && (
                      <div className="hidden md:block h-16 border-l border-gray-300 mt-8 ml-4"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-16 text-center">Our Values</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`bg-white p-8 rounded-xl shadow-sm text-center transition-all duration-500 ${
                    animateItems
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Meet Our Founders
            </h2>
            <p className="text-lg text-gray-600 mb-16 text-center max-w-3xl mx-auto">
              Together, we're building more than a travel company. We're
              creating an infrastructure for the next generation of cultural
              explorers and experience-makers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {[
                {
                  name: "Unik Ernest",
                  role: "Co-Founder",
                  bio: "Cultural entrepreneur with deep roots in travel and impact. Unik leads vision, partnerships, and cultural strategy—drawing from decades of experience across travel, nightlife, and global philanthropy.",
                  image:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
                },
                {
                  name: "Eloka Agu",
                  role: "Co-Founder",
                  bio: "Creative technologist and systems designer. Eloka leads product, brand, and platform design—merging community insight with elegant technology to build meaningful connections.",
                  image:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
                },
              ].map((person, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    animateItems
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="aspect-square bg-gray-100 rounded-xl mb-6 overflow-hidden max-w-sm mx-auto">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">{person.name}</h3>
                    <p className="text-blue-600 text-lg mb-4">{person.role}</p>
                    <p className="text-gray-600 leading-relaxed">
                      {person.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                This is More Than a Platform
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                From group trips and creative retreats to behind-the-scenes
                tours and pop-up gatherings, we empower communities to design
                the kind of travel they'd want to experience themselves.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Whether you're planning your next adventure or launching your
                own travel-based brand, Culturin helps you discover, create, and
                share journeys that matter.
              </p>
              <div className="bg-blue-50 p-8 rounded-xl">
                <p className="text-xl font-semibold text-gray-800 mb-4">
                  This is travel—powered by culture, built for connection.
                </p>
                <p className="text-lg text-gray-700">
                  It's a new way to see the world—and your place in it.
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
