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
  ArrowRight,
  Star,
  Clock,
  Shield,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "../../../lib/navigation";
import Image from "@/components/ui/image";
import { useInView } from "react-intersection-observer";

const ProductBookingManagementPage = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(
    null
  );

  // Intersection observers for scroll animations
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: ctaRef, inView: ctaInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
      benefits: ["Centralized dashboard", "Smart filtering", "Quick actions"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Guest Management",
      description:
        "Access comprehensive guest profiles, view booking history, and manage customer information with ease.",
      icon: <Users className="h-8 w-8 text-blue-600" />,
      benefits: ["Complete profiles", "Booking history", "Custom notes"],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Calendar Integration",
      description:
        "Sync with your favorite calendar apps to stay on top of your schedule. Set reminders and avoid double bookings.",
      icon: <CalendarIcon className="h-8 w-8 text-blue-600" />,
      benefits: [
        "Multi-calendar sync",
        "Smart reminders",
        "Conflict prevention",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Financial Tracking",
      description:
        "Monitor revenue, track payments, and export financial reports for your business records.",
      icon: <BarChart4 className="h-8 w-8 text-blue-600" />,
      benefits: ["Revenue tracking", "Payment monitoring", "Financial reports"],
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Automated Notifications",
      description:
        "Send automatic booking confirmations, reminders, and follow ups to enhance guest communication.",
      icon: <CheckCircle2 className="h-8 w-8 text-blue-600" />,
      benefits: [
        "Auto confirmations",
        "Smart reminders",
        "Follow up sequences",
      ],
      color: "from-indigo-500 to-purple-500",
    },
    {
      title: "Secure Payment Processing",
      description:
        "Process payments securely and efficiently, with support for multiple payment methods and currencies.",
      icon: <CreditCard className="h-8 w-8 text-blue-600" />,
      benefits: ["Secure processing", "Multiple methods", "Global currencies"],
      color: "from-teal-500 to-cyan-500",
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
      rating: 5,
      metric: "70% less admin time",
    },
    {
      quote:
        "I can't imagine running my business without this platform. The calendar integration and automated reminders have virtually eliminated no shows.",
      name: "Ahmed Hassan",
      role: "Heritage Tour Operator, Marrakech",
      image: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
      rating: 5,
      metric: "95% attendance rate",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-6 transition-all duration-1000 ease-out ${
                heroInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
              }`}
            >
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium animate-pulse">
                🚀 Booking Management Solution
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Manage your bookings{" "}
                <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  effortlessly
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
                Streamline your booking process, reduce administrative work, and
                deliver exceptional guest experiences with our comprehensive
                booking management system.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 group transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Link to="/demo" className="text-white flex items-center">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="hover:border-blue-300 hover:shadow-md transition-all duration-300"
                >
                  <Link to="/product/booking" className="text-gray-900">
                    Watch Demo
                  </Link>
                </Button>
              </div>
            </div>
            <div
              className={`transition-all duration-1000 ease-out delay-200 ${
                heroInView
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl"></div>
                <Image
                  src="/lovable-uploads/88dfd739-180c-4ca4-8bfd-08396d3464c9.png"
                  alt="Booking management dashboard showing calendar, guest details, and revenue tracking"
                  className="w-full h-auto rounded-2xl shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-green-500 w-4 h-4 rounded-full animate-ping z-20"></div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 z-20">
                  <div className="text-sm font-medium text-gray-900">
                    Live Bookings
                  </div>
                  <div className="text-xs text-gray-600">Real time updates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 text-center transition-all duration-1000 ${
              statsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {[
              {
                value: "98%",
                label: "Customer Satisfaction",
                icon: <Star className="h-6 w-6 text-yellow-500" />,
                delay: "delay-100",
              },
              {
                value: "75%",
                label: "Admin Time Saved",
                icon: <Clock className="h-6 w-6 text-green-500" />,
                delay: "delay-200",
              },
              {
                value: "50%",
                label: "Increase in Bookings",
                icon: <TrendingUp className="h-6 w-6 text-blue-500" />,
                delay: "delay-300",
              },
              {
                value: "24/7",
                label: "Available Support",
                icon: <Shield className="h-6 w-6 text-purple-500" />,
                delay: "delay-400",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={`${stat.delay} transition-all duration-700 hover:scale-105 cursor-pointer group`}
              >
                <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
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
      <section ref={featuresRef} className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div
            className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
              featuresInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
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
                className={`transition-all duration-700 hover:shadow-xl hover:-translate-y-2 cursor-pointer group border-0 bg-white ${
                  featuresInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardContent className="p-8">
                  <div
                    className={`mb-6 transition-all duration-300 ${
                      hoveredFeature === index ? "scale-110" : "scale-100"
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                    >
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div
                        key={benefitIndex}
                        className="flex items-center text-sm text-gray-500"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        {benefit}
                      </div>
                    ))}
                  </div>
                  <div
                    className={`mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                      hoveredFeature === index
                        ? "translate-y-0"
                        : "translate-y-2"
                    }`}
                  >
                    <div className="text-blue-600 text-sm font-medium flex items-center">
                      <Zap className="mr-2 h-4 w-4" />
                      Explore feature
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div
            className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
              testimonialsInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Trusted by cultural experience creators worldwide
            </h2>
            <p className="text-lg text-gray-600">
              See how our booking management system is transforming businesses
              like yours.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`transition-all duration-700 hover:shadow-xl hover:-translate-y-1 cursor-pointer group border-0 bg-gradient-to-br from-gray-50 to-white ${
                  testimonialsInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredTestimonial(index)}
                onMouseLeave={() => setHoveredTestimonial(null)}
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        className={`w-12 h-12 rounded-full mr-4 transition-transform duration-300 ${
                          hoveredTestimonial === index
                            ? "scale-110"
                            : "scale-100"
                        }`}
                      />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-blue-600">
                        {testimonial.metric}
                      </div>
                      <div className="text-xs text-gray-500">improvement</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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

      {/* Final CTA Section */}
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
            <Button className="bg-blue-600 hover:bg-blue-700 group transition-all duration-300 hover:scale-105">
              <Link to="/sign-in" className="flex items-center text-white">
                Get Started
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="hover:border-blue-300 hover:shadow-md transition-all duration-300"
            >
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
