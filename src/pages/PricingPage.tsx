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
      name: "Free Plan",
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
      badge: "Current",
      icon: Check,
    },
    {
      name: "Pro Plan",
      price: isAnnual ? "$79" : "$99",
      period: "/mo",
      description: "Unlimited access to all of Culturin.",
      buttonText: "Upgrade to Pro – Start Free Trial",
      buttonIcon: <ArrowRight className="h-4 w-4" />,
      buttonVariant: "default" as const,
      features: [
        "Boost bookings with conversion insights",
        "Automate reviews & follow-ups — save 10+ hours/week",
        "Collaborate with your team in real time",
        "Priority support when it matters most",
      ],
      popular: true,
      badge: "Recommended",
      icon: TrendingUp,
      trialBadge: "14-day Free Trial!",
      subtitle: "Less than $3/day to run your business on autopilot",
    },
    {
      name: "Enterprise",
      price: isAnnual ? "$150" : "$200",
      period: "/mo",
      description: "For teams who need full customization.",
      buttonText: "Talk to Sales",
      buttonIcon: null,
      buttonVariant: "outline" as const,
      features: [
        "Admin dashboard with usage analytics",
        "Team-wide knowledge and prompts",
        "Post-call AI suggestions and coaching insights",
      ],
      popular: false,
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Save 10+ Hours a Week & Grow Bookings by 32%
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Join 1,000+ operators who've switched to Culturin Pro
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

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Pricing Cards - Left 2/3 */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plans.slice(0, 2).map((plan, index) => (
                  <div
                    key={plan.name}
                    className={`relative rounded-xl p-6 ${
                      plan.popular
                        ? "border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100"
                        : "border-2 border-gray-200 bg-white"
                    } shadow-lg`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 right-4">
                        <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs px-3 py-1 shadow-lg">
                          <Trophy className="h-3 w-3 mr-1" />
                          {plan.badge}
                        </Badge>
                      </div>
                    )}

                    {!plan.popular && plan.badge && (
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                        <Badge variant="outline" className="text-gray-600">
                          {plan.badge}
                        </Badge>
                      </div>
                    )}

                    {plan.popular && (
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-blue-900 mb-2">{plan.name}</h3>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-blue-900">{plan.price}</span>
                          <span className="text-lg text-blue-700">{plan.period}</span>
                          {plan.trialBadge && (
                            <Badge className="bg-green-100 text-green-800 text-xs ml-2">
                              {plan.trialBadge}
                            </Badge>
                          )}
                        </div>
                        {plan.subtitle && (
                          <p className="text-sm text-blue-600 mt-1">{plan.subtitle}</p>
                        )}
                      </div>
                    )}

                    {!plan.popular && (
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                          <span className="text-lg text-gray-500">{plan.period}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                      </div>
                    )}

                    <div className="mb-6">
                      <Button
                        className={`w-full py-3 ${
                          plan.buttonVariant === "outline"
                            ? "border-gray-400 text-gray-900 hover:bg-gray-50"
                            : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                        }`}
                        variant={plan.buttonVariant}
                        asChild
                      >
                        <Link to={plan.name === "Free Plan" ? "/studio" : "/pro-dashboard"}>
                          {plan.buttonIcon && <span className="mr-2">{plan.buttonIcon}</span>}
                          {plan.buttonText}
                        </Link>
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          {plan.popular ? (
                            <plan.icon className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                          ) : (
                            <Check className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                          )}
                          <span className={`text-sm ${plan.popular ? "text-gray-700" : "text-gray-600"}`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Join 1,000+ cultural creators already on Pro</span>
                  <span>Secure payment via Stripe</span>
                </div>
              </div>
            </div>

            {/* Testimonial & CTA Section - Right 1/3 */}
            <div className="lg:col-span-1 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl p-8 flex flex-col justify-between">
              {/* Testimonial */}
              <div className="mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-4">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Maria Lopez</p>
                      <p className="text-xs text-blue-200">
                        Founder, Oaxaca Food Tours
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-white/90 leading-relaxed">
                    "Since upgrading to Pro, bookings are up 32% and we save 10+
                    hours/week on admin tasks!"
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-xs text-white/80">
                    <strong>Early adopters</strong> lock in $99/month for life
                  </p>
                  <p className="text-xs text-white/70 mt-1">
                    Cancel anytime • 14-day free trial • No hidden fees
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Button
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white w-full justify-center py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
                  asChild
                >
                  <Link to="/pro-dashboard">
                    Upgrade to Pro – Start Free Trial
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>

                <button className="text-white/70 hover:text-white text-sm w-full text-center py-2 transition-colors">
                  Maybe Later
                </button>
              </div>
            </div>
          </div>

          {/* Enterprise Plan - Full Width */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise Plan</h3>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plans[2].price}</span>
                  <span className="text-xl text-gray-500">{plans[2].period}</span>
                </div>
                <p className="text-gray-600">{plans[2].description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  {plans[2].features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center">
                  <Button
                    variant="outline"
                    className="border-gray-400 text-gray-900 hover:bg-gray-50 px-8 py-3"
                    asChild
                  >
                    <Link to="/contact">Talk to Sales</Link>
                  </Button>
                </div>
              </div>
            </div>
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
