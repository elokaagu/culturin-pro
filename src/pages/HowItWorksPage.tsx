"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import NewFooter from "@/components/sections/NewFooter";
import {
  CheckCircle,
  ChevronRight,
  Globe,
  PencilRuler,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Link } from "../../lib/navigation";

const HowItWorksPage = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);

  useEffect(() => {
    setAnimateItems(true);
  }, []);

  const steps = [
    {
      title: "Create beautiful experiences",
      description:
        "Build engaging cultural experiences with our easy-to-use experience builder",
      icon: <PencilRuler className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Get discovered online",
      description:
        "Reach more travelers with optimized listings and marketing tools",
      icon: <Globe className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Handle bookings directly",
      description: "Take reservations with our commission-free booking system",
      icon: <ShoppingCart className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Grow your audience",
      description:
        "Build relationships and encourage repeat visits with our CRM",
      icon: <Users className="h-8 w-8 text-blue-600" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Tour operator software that grows your business
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10">
                Culturin gives cultural experience creators everything needed to
                build, sell, and grow an experience business online.
              </p>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8 rounded-xl h-auto"
                asChild
              >
                <Link to="/sign-in">
                  Start with Studio <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="mt-4 text-sm text-gray-500">
                No credit card required. 14-day free trial.
              </p>
            </div>

            {/* How It Works Steps */}
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-500 ${
                      animateItems
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-4 rounded-full mr-6">
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Platform Overview Section */}
        <section className="bg-gray-50 py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                An all in one platform for tour operators
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to create, manage, and grow your cultural
                experiences business
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Experience Builder",
                    description:
                      "Create compelling experiences with our visual tour builder",
                  },
                  {
                    title: "Direct Booking System",
                    description:
                      "Take reservations with zero commissions on your bookings",
                  },
                  {
                    title: "Customer Relationship Tools",
                    description:
                      "Grow repeat business with automated communications",
                  },
                  {
                    title: "Payment Processing",
                    description: "Accept payments and deposits securely online",
                  },
                  {
                    title: "Marketing Toolkit",
                    description:
                      "Promote your experiences through optimized channels",
                  },
                  {
                    title: "Analytics Dashboard",
                    description:
                      "Make data driven decisions with powerful insights",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className={`bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-500 ${
                      animateItems
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${200 + index * 100}ms` }}
                  >
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-16 text-center">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-5 px-8 rounded-xl text-lg h-auto"
                  asChild
                >
                  <Link to="/pricing">View pricing details</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                Success stories
              </h2>
              <p className="text-lg text-gray-600 text-center">
                Tour operators are growing their businesses with Culturin
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-xl p-8">
                  <div className="flex flex-col h-full">
                    <div className="mb-8">
                      <p className="text-lg font-medium italic mb-6">
                        "After we switched to Culturin, we've saved thousands on
                        fees and increased our bookings by 30%. The platform
                        made it so much easier for customers to find and book
                        our food tours."
                      </p>
                      <div>
                        <p className="font-semibold">Sofia Martinez</p>
                        <p className="text-gray-600">Barcelona Food Tours</p>
                      </div>
                    </div>
                    <div className="flex items-center mt-auto pt-6 border-t border-gray-200">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-sm font-medium">
                          35% increase in direct bookings
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-8">
                  <div className="flex flex-col h-full">
                    <div className="mb-8">
                      <p className="text-lg font-medium italic mb-6">
                        "Culturin simplified everything. Our storytelling-first
                        approach to cultural experiences now comes through in
                        our online presence, and we've seen a massive boost in
                        customer engagement."
                      </p>
                      <div>
                        <p className="font-semibold">David Chen</p>
                        <p className="text-gray-600">Heritage Walking Tours</p>
                      </div>
                    </div>
                    <div className="flex items-center mt-auto pt-6 border-t border-gray-200">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-sm font-medium">
                          42% growth in repeat customers
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 text-center">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-5 px-8 rounded-xl text-lg h-auto"
                  asChild
                >
                  <Link to="/sign-in">Start your 14-day free trial</Link>
                </Button>
                <p className="mt-4 text-sm text-gray-500">
                  Join the community of cultural experience creators
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

export default HowItWorksPage;
