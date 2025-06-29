"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Globe, Heart, Star } from "lucide-react";
import Image from "@/components/ui/image";
import { Link } from "../../lib/navigation";

// Team member data
const teamMembers = [
  {
    name: "Sofia Chen",
    role: "Founder & CEO",
    bio: "Former tech executive with a passion for cultural preservation",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
    initials: "SC",
  },
  {
    name: "Marco Rivera",
    role: "Head of Community",
    bio: "Anthropologist and former tourism consultant",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop",
    initials: "MR",
  },
  {
    name: "Amara Okafor",
    role: "Product Lead",
    bio: "UX designer with a background in sustainable tourism",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&auto=format&fit=crop",
    initials: "AO",
  },
];

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation triggers using InView
  const { ref: introRef, inView: introInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: whatWeDoRef, inView: whatWeDoInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: whyItMattersRef, inView: whyItMattersInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: visionRef, inView: visionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: teamRef, inView: teamInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: joinUsRef, inView: joinUsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      <Header type="traveler" />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2000&auto=format&fit=crop"
            alt="Cultural landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="container-custom relative z-10 text-center pt-32 pb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-playfair">
            About Us
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl text-white mb-4 font-medium">
              We believe culture is a gift.
              <br />
              And it's meant to be shared.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-20 bg-white" ref={introRef}>
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <p
              className={`text-lg md:text-xl text-gray-700 leading-relaxed transition-all duration-700 ${
                introInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Culturin was born from a simple idea: that the most meaningful
              travel experiences don't come from tour buses or bucket lists —
              they come from people.
            </p>
            <p
              className={`text-lg md:text-xl text-gray-700 leading-relaxed mt-6 transition-all duration-700 ${
                introInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              We're building a home for cultural hosts, local guides, and
              creative storytellers who want to share their world on their terms
              — and for travelers who want to experience it all with depth,
              purpose, and joy.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 md:py-20 bg-gray-50" ref={whatWeDoRef}>
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3 transition-all duration-700 ${
                whatWeDoInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Globe className="h-8 w-8 text-culturin-primary" />
              <span>What We Do</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div
                className={`transition-all duration-700 ${
                  whatWeDoInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <h3 className="text-2xl font-bold mb-6 text-culturin-accent">
                  We help cultural hosts:
                </h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Publish meaningful experiences</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Get discovered by conscious travelers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>
                      Grow their communities and income — with full creative
                      freedom
                    </span>
                  </li>
                </ul>
              </div>

              <div
                className={`transition-all duration-700 ${
                  whatWeDoInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                <h3 className="text-2xl font-bold mb-6 text-culturin-accent">
                  We help travelers:
                </h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Connect with local experts and cultural leaders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Join intimate, purpose-driven trips</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Explore the world in a more human way</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-16 md:py-20 bg-white" ref={whyItMattersRef}>
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2
                className={`text-3xl md:text-4xl font-bold flex items-center justify-center gap-3 transition-all duration-700 ${
                  whyItMattersInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <Heart className="h-8 w-8 text-red-500" />
                <span>Why It Matters</span>
              </h2>
            </div>

            <div
              className={`relative overflow-hidden rounded-xl transition-all duration-700 ${
                whyItMattersInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="aspect-video relative">
                <Image
                  src="https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=2000&auto=format&fit=crop"
                  alt="Cultural storytelling"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 rounded-xl"></div>
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center">
                  <p className="text-white text-lg md:text-xl max-w-2xl leading-relaxed">
                    <span className="font-bold block mb-4 text-xl md:text-2xl">
                      Mainstream travel platforms weren't built for cultural
                      hosts.
                    </span>
                    They flatten stories. They reward algorithms. They often
                    miss the soul.
                    <span className="block mt-4">
                      We want to change that — by building a more equitable,
                      creator-first platform that respects culture, empowers
                      local economies, and builds real connection between
                      people.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-16 md:py-20 bg-gray-50" ref={visionRef}>
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className={`text-3xl md:text-4xl font-bold mb-6 flex items-center justify-center gap-3 transition-all duration-700 ${
                  visionInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <Star className="h-8 w-8 text-yellow-500" />
                <span>Our Vision</span>
              </h2>

              <div
                className={`transition-all duration-700 ${
                  visionInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <p className="text-lg md:text-xl text-gray-700">
                  A world where cultural exchange is easy, ethical, and
                  empowering.
                </p>
                <p className="text-lg md:text-xl text-gray-700 mt-2">
                  Where local guides are celebrated as teachers, creatives, and
                  entrepreneurs.
                </p>
                <p className="text-lg md:text-xl text-gray-700 mt-2">
                  Where travel doesn't just look good on Instagram — it feels
                  good in your spirit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20 bg-white" ref={teamRef}>
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className={`text-3xl md:text-4xl font-bold transition-all duration-700 ${
                  teamInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                Our Team
              </h2>
              <p
                className={`mt-4 text-lg text-gray-600 transition-all duration-700 ${
                  teamInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                We're travelers, designers, builders, and culture lovers.
                <br />
                We've worked across tech, tourism, and the arts.
                <br />
                Now, we're here to make travel more human again.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card
                  key={member.name}
                  className={`overflow-hidden transition-all duration-700 hover:shadow-lg ${
                    teamInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="h-48 relative overflow-hidden">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                    <p className="mt-3 text-gray-700">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section
        className="py-16 md:py-24 bg-culturin-accent text-white"
        ref={joinUsRef}
      >
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 transition-all duration-700 ${
                joinUsInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Join Us
            </h2>
            <p
              className={`text-lg md:text-xl mb-10 transition-all duration-700 ${
                joinUsInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Whether you're a traveler, a host, or a supporter of the mission —
              <br />
              we'd love to build this with you.
            </p>
            <div
              className={`flex flex-wrap justify-center gap-4 transition-all duration-700 ${
                joinUsInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-[#1A1F2C] hover:bg-white/90 transition-transform hover:scale-105"
              >
                <Link to="/for-operators">Start Hosting</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 transition-transform hover:scale-105"
              >
                <Link to="/">Discover Trips</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 transition-transform hover:scale-105"
              >
                <a href="mailto:contact@culturin.com">Contact Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
