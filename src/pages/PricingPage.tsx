"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CheckCircle, Apple, Star, TrendingUp, Zap, MessageSquare, Shield, Trophy, Users, Check, ArrowRight } from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import { Link } from "../../lib/navigation";
import { Badge } from "@/components/ui/badge";

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "/mo",
      description: "All essential features to get you started.",
      buttonText: "Get Started Free",
      buttonIcon: null,
      buttonVariant: "outline" as const,
      features: [
        "Basic booking management",
        "Limited analytics",
        "Standard support",
      ],
      popular: false,
      icon: Check,
    },
    {
      name: "Pro",
      price: isAnnual ? "$79" : "$99",
      period: "/mo",
      description: "Unlimited access to all of Culturin.",
      buttonText: "Subscribe",
      buttonIcon: null,
      buttonVariant: "default" as const,
      features: [
        "Boost bookings with conversion insights",
        "Automate reviews & follow-ups — save 10+ hours/week",
        "Collaborate with your team in real time",
        "Priority support when it matters most",
      ],
      popular: true,
      icon: TrendingUp,
      badge: "<250 ms Low latency",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Pricing
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're using Culturin for meetings, homework, sales calls, or just curious, it's fully free to start.
            </p>
          </div>

          {/* Pricing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  !isAnnual
                    ? "bg-gray-800 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  isAnnual
                    ? "bg-gray-800 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Annually
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className="relative rounded-xl p-8 bg-white text-gray-900 border border-gray-200 shadow-lg"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-lg text-gray-500">{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <Button
                    className={`w-full py-3 ${
                      plan.buttonVariant === "outline"
                        ? "border-gray-400 text-gray-900 hover:bg-gray-50"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                    variant={plan.buttonVariant}
                    asChild
                  >
                    <Link to={plan.name === "Free" ? "/studio" : "/pro-dashboard"}>
                      {plan.buttonIcon && <span className="mr-2">{plan.buttonIcon}</span>}
                      {plan.buttonText}
                    </Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle 
                        className="h-5 w-5 mt-0.5 flex-shrink-0 text-green-600" 
                      />
                      <span className="text-sm text-gray-600">
                        {feature}
                      </span>
                      {plan.badge && featureIndex === 1 && (
                        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              All plans include 24/7 support and a 14-day free trial
            </p>
          </div>
        </div>
      </main>

      <NewFooter />
    </div>
  );
};

export default PricingPage;
