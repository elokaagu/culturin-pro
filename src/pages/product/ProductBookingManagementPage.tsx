"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import NewFooter from "@/components/sections/NewFooter";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  Calendar as CalendarIcon,
  ChevronRight,
  CheckCircle2,
  BarChart4,
  CreditCard,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "../../../lib/navigation";
import Image from "@/components/ui/image";

const ProductBookingManagementPage = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);

  useEffect(() => {
    // Trigger animations after component mount
    setAnimateItems(true);

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // Features data
  const features = [
    {
      title: "Streamlined Booking Management",
      description:
        "Easily view, organize, and manage all your bookings in one centralized dashboard. Filter by date, status, or experience type.",
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Guest Management",
      description:
        "Access comprehensive guest profiles, view booking history, and manage customer information with ease.",
      icon: <Users className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Calendar Integration",
      description:
        "Sync with your favorite calendar apps to stay on top of your schedule. Set reminders and avoid double bookings.",
      icon: <CalendarIcon className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Financial Tracking",
      description:
        "Monitor revenue, track payments, and export financial reports for your business records.",
      icon: <BarChart4 className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Automated Notifications",
      description:
        "Send automatic booking confirmations, reminders, and follow ups to enhance guest communication.",
      icon: <CheckCircle2 className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Secure Payment Processing",
      description:
        "Process payments securely and efficiently, with support for multiple payment methods and currencies.",
      icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      quote:
        "The booking management system has transformed how I run my cultural tours. I've reduced admin time by 70% and can focus on creating memorable experiences.",
      name: "Maria Gonzalez",
      role: "Culinary Tour Guide, Mexico City",
      image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
    },
    {
      quote:
        "I can't imagine running my business without this platform. The calendar integration and automated reminders have virtually eliminated no shows.",
      name: "Ahmed Hassan",
      role: "Heritage Tour Operator, Marrakech",
      image: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-6 ${
                animateItems
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } transition-all duration-700 ease-out`}
            >
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Booking Management Solution
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Manage your bookings{" "}
                <span className="text-blue-600">effortlessly</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-xl">
                Streamline your booking process, reduce administrative work, and
                deliver exceptional guest experiences with our comprehensive
                booking management system.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                >
                  <Link to="/demo" className="text-white">
                    Get Started
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link to="/product/booking" className="text-gray-900">
                    Watch Demo
                  </Link>
                </Button>
              </div>
            </div>
            <div
              className={`relative ${
                animateItems
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } transition-all duration-700 delay-300 ease-out`}
            >
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-500">
                    Booking Dashboard
                  </span>
                </div>
                <div>
                  <Image
                    src="/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png"
                    alt="Booking Management Dashboard"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-200 rounded-full -z-10"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-200 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div
              className={`${
                animateItems
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } transition-all duration-700 delay-100 ease-out`}
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-600">
                98%
              </div>
              <div className="text-gray-600 mt-2">Customer Satisfaction</div>
            </div>
            <div
              className={`${
                animateItems
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } transition-all duration-700 delay-200 ease-out`}
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-600">
                75%
              </div>
              <div className="text-gray-600 mt-2">Admin Time Saved</div>
            </div>
            <div
              className={`${
                animateItems
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } transition-all duration-700 delay-300 ease-out`}
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-600">
                50%
              </div>
              <div className="text-gray-600 mt-2">Increase in Bookings</div>
            </div>
            <div
              className={`${
                animateItems
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } transition-all duration-700 delay-400 ease-out`}
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-600">
                24/7
              </div>
              <div className="text-gray-600 mt-2">Available Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Everything you need to manage bookings
            </h2>
            <p className="text-lg text-gray-600">
              Our comprehensive booking management system gives you all the
              tools you need to streamline your operations and delight your
              guests.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`border border-gray-100 hover:shadow-md transition-all duration-300 ${
                  animateItems
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100 + 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="p-3 bg-blue-50 rounded-lg inline-block mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className={`${
                animateItems
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              } transition-all duration-700 delay-200 ease-out`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to transform your booking process?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of cultural experience providers who have
                streamlined their operations with our booking management system.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <Link to="/demo" className="text-blue-600">
                    Schedule a Demo
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-blue-700 hover:text-white"
                >
                  <Link to="/pricing" className="text-white hover:text-white">
                    View Pricing
                  </Link>
                </Button>
              </div>
            </div>
            <div
              className={`${
                animateItems
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              } transition-all duration-700 delay-400 ease-out`}
            >
              <div className="bg-white p-1 rounded-xl shadow-xl">
                <Image
                  src="/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png"
                  alt="Booking Management App"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            What our customers say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-gray-50 p-8 rounded-xl ${
                  animateItems
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                } transition-all duration-700`}
                style={{ transitionDelay: `${index * 200 + 200}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Start managing your bookings the smart way
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of cultural experience providers and transform
            your booking process today.
          </p>
          <div className="flex justify-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Link to="/sign-in" className="flex items-center text-white">
                Get Started <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline">
              <Link to="/contact" className="text-gray-900">
                Contact Sales
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <NewFooter />
    </div>
  );
};

export default ProductBookingManagementPage;
