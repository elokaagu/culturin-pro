"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "../../lib/navigation";
import Header from "@/components/Header";
import NewFooter from "@/components/sections/NewFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingCart,
  BarChart,
  Users,
  CalendarCheck,
  ArrowRight,
  CheckCircle2,
  MessagesSquare,
} from "lucide-react";
import Image from "@/components/ui/image";

const ForOperators = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setAnimateItems(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header type="operator" />

      {/* Main content wrapper with proper top padding for fixed header */}
      <div className="pt-16">
        {" "}
        {/* Reduced from pt-20 to pt-16 to match header height */}
        {/* Hero Section */}
        <section className="pt-20 pb-20 bg-gradient-to-br from-[#f1f0fb] to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div
                className={`space-y-6 ${
                  animateItems
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                } transition-all duration-700`}
              >
                <h1 className="text-4xl md:text-5xl font-medium text-gray-900 leading-tight">
                  Tour Operator Platform for{" "}
                  <span className="text-[#9b87f5]">Cultural Experiences</span>
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed">
                  A comprehensive platform that helps you manage bookings, track
                  performance, and deliver exceptional cultural experiences
                  without complex tools.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-6 py-6 rounded-xl"
                    onClick={() => navigate("/culturin-pro")}
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    variant="outline"
                    className="px-6 py-6 rounded-xl"
                    onClick={() => navigate("/demo")}
                  >
                    Book a Demo
                  </Button>
                </div>
              </div>
              <div
                className={`${
                  animateItems
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                } transition-all duration-700 delay-300`}
              >
                <div className="relative rounded-xl overflow-hidden shadow-lg h-[400px]">
                  <Image
                    src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=1920&auto=format&fit=crop"
                    alt="Tour operator platform dashboard"
                    className="w-full h-full object-cover"
                    fill={true}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-medium mb-4">
                Manage Your Cultural Tours
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform provides the essential tools you need to manage
                bookings, analyze performance, and support your customers
                effectively.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1: Booking Management */}
              <Card className="border shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-[#f1f0fb] flex items-center justify-center mb-4">
                    <ShoppingCart className="w-6 h-6 text-[#9b87f5]" />
                  </div>
                  <CardTitle className="text-xl">Booking Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Process reservations seamlessly</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Manage availability in real-time</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Accept secure online payments</span>
                    </li>
                  </ul>
                  <Button
                    variant="ghost"
                    className="w-full mt-6 text-[#9b87f5] hover:bg-[#f1f0fb] hover:text-[#7E69AB]"
                    onClick={() => navigate("/product/booking-management")}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Feature 2: Analytics Dashboard */}
              <Card className="border shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-[#f1f0fb] flex items-center justify-center mb-4">
                    <BarChart className="w-6 h-6 text-[#9b87f5]" />
                  </div>
                  <CardTitle className="text-xl">Analytics Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Track key business metrics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Visualize booking trends</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Monitor customer satisfaction</span>
                    </li>
                  </ul>
                  <Button
                    variant="ghost"
                    className="w-full mt-6 text-[#9b87f5] hover:bg-[#f1f0fb] hover:text-[#7E69AB]"
                    onClick={() => navigate("/product/analytics")}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Feature 3: Customer Support */}
              <Card className="border shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-[#f1f0fb] flex items-center justify-center mb-4">
                    <MessagesSquare className="w-6 h-6 text-[#9b87f5]" />
                  </div>
                  <CardTitle className="text-xl">Customer Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>24/7 email support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Detailed knowledge base</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Customer communication tools</span>
                    </li>
                  </ul>
                  <Button
                    variant="ghost"
                    className="w-full mt-6 text-[#9b87f5] hover:bg-[#f1f0fb] hover:text-[#7E69AB]"
                    onClick={() => navigate("/help-center")}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        {/* Dashboard Preview Section */}
        <section className="py-20 bg-[#f1f0fb]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-medium mb-6">
                  Your Complete Dashboard
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Access all the tools you need to manage your cultural
                  experience business in one intuitive interface.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-white p-2 rounded-full shadow mr-4">
                      <CalendarCheck className="w-6 h-6 text-[#9b87f5]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-1">
                        Booking Calendar
                      </h3>
                      <p className="text-gray-600">
                        View and manage your schedule with an interactive
                        calendar that shows all upcoming bookings.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-white p-2 rounded-full shadow mr-4">
                      <Users className="w-6 h-6 text-[#9b87f5]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-1">
                        Customer Database
                      </h3>
                      <p className="text-gray-600">
                        Keep track of customer information and preferences to
                        provide personalized experiences.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  className="mt-8 bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-6 py-6 rounded-xl"
                  onClick={() => navigate("/culturin-pro")}
                >
                  Start Free Trial
                </Button>
              </div>

              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png"
                  alt="Tour operator dashboard"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Pricing Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-medium mb-4">
                Simple & Transparent Pricing
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose the plan that fits your business needs with no hidden
                fees or commissions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Basic Plan */}
              <Card className="border hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2 text-center">
                  <CardTitle className="text-xl">Starter</CardTitle>
                  <p className="text-3xl font-bold mt-2">
                    $49
                    <span className="text-base font-normal text-gray-500">
                      /month
                    </span>
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Basic booking management</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Limited analytics dashboard</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Email support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>1 admin account</span>
                    </li>
                  </ul>

                  <Button
                    className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]"
                    onClick={() => navigate("/sign-in")}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="border-2 border-[#9b87f5] shadow-lg relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#9b87f5] text-white px-4 py-1 rounded-full text-sm font-medium">
                  Popular
                </div>
                <CardHeader className="pb-2 text-center">
                  <CardTitle className="text-xl">Professional</CardTitle>
                  <p className="text-3xl font-bold mt-2">
                    $99
                    <span className="text-base font-normal text-gray-500">
                      /month
                    </span>
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Advanced booking management</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Full analytics dashboard</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Priority email support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>3 team accounts</span>
                    </li>
                  </ul>

                  <Button
                    className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]"
                    onClick={() => navigate("/sign-in")}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card className="border hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2 text-center">
                  <CardTitle className="text-xl">Enterprise</CardTitle>
                  <p className="text-3xl font-bold mt-2">
                    $199
                    <span className="text-base font-normal text-gray-500">
                      /month
                    </span>
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Custom booking solutions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Advanced analytics & reporting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Unlimited team accounts</span>
                    </li>
                  </ul>

                  <Button
                    className="w-full bg-[#9b87f5] hover:bg-[#7E69AB]"
                    onClick={() => navigate("/sign-in")}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-medium mb-6">
                Ready to transform your cultural tour business?
              </h2>
              <p className="text-xl mb-10 text-white/90">
                Join tour operators already growing their business with Culturin
                Pro
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  className="bg-white text-[#9b87f5] hover:bg-gray-100 px-6 py-6 rounded-xl"
                  onClick={() => navigate("/culturin-pro")}
                >
                  Start Free Trial
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-6 py-6 rounded-xl"
                  onClick={() => navigate("/demo")}
                >
                  Book a Demo
                </Button>
              </div>
              <p className="mt-6 text-white/80 text-sm">
                No credit card required. 14-day free trial.
              </p>
            </div>
          </div>
        </section>
      </div>

      <NewFooter />
    </div>
  );
};

export default ForOperators;
