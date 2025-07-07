"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "../../lib/navigation";
import Image from "@/components/ui/image";

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Heading Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              One simple price.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Month to month. No long term contracts. No cancellation fees. Just
              pay a flat rate to get everything on the Culturin platform.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="max-w-3xl mx-auto mb-20">
            <div className="bg-blue-600 text-white rounded-xl p-10 md:p-12 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-5xl md:text-6xl font-bold mb-2">$99</h2>
                  <p className="text-blue-100">billed monthly</p>
                </div>
                <div className="mt-6 md:mt-0">
                  <Button
                    className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 h-auto text-lg"
                    asChild
                  >
                    <Link to="/sign-in">Get started →</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Join Thousands of Operators Section */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Join thousands of operators switching to Culturin
              </h2>
              <p className="text-lg text-gray-600">
                Here's why tour operators choose Culturin to grow faster online
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Card */}
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">
                    One package with everything you need
                  </h3>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-600"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18" />
                      <path d="M9 21V9" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700">
                  With Culturin, you get all the tools you need to grow from day
                  one. Our happiest and most successful customers switched to
                  Culturin from another solution. They were paying less, but
                  weren't getting the online sales growth they were looking for.
                </p>
              </div>

              {/* Right Column - 3 Cards */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">
                      Month to month pricing
                    </h3>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                        <path d="M16 21h5v-5" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Our pricing is month to month. We don't believe in locking
                    you into long term contracts. We believe in earning your
                    business every month.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">
                        No upgrades or upsells
                      </h3>
                      <div className="bg-blue-100 p-3 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-600"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="m8 12 2 2 4-4" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      There's no upgrades or upsells. We give you everything you
                      need to grow online.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">24/7 support</h3>
                      <div className="bg-blue-100 p-3 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-600"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Work with a world-class team. You'll have 24/7 support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl uppercase font-bold tracking-wider mb-12 text-center">
              What's Included
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-7 w-7 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium mb-2">Tour Builder</h3>
                  <p className="text-gray-600">
                    Create beautiful, conversion-optimized tour pages to
                    showcase your experiences.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-7 w-7 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium mb-2">
                    Direct Booking Engine
                  </h3>
                  <p className="text-gray-600">
                    Own your customer relationships with a powerful booking
                    system built for tour operators.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-7 w-7 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium mb-2">Guest CRM</h3>
                  <p className="text-gray-600">
                    Manage your customer relationships and build loyalty with
                    every booking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-7 w-7 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium mb-2">Marketing Suite</h3>
                  <p className="text-gray-600">
                    Email marketing, social media tools, and SEO optimizations
                    to attract more guests.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-7 w-7 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium mb-2">
                    Analytics Dashboard
                  </h3>
                  <p className="text-gray-600">
                    Track performance with real time data and actionable
                    insights.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-7 w-7 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium mb-2">
                    Storytelling Toolkit
                  </h3>
                  <p className="text-gray-600">
                    Create compelling narratives around your cultural
                    experiences.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-16">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 h-auto text-lg"
                asChild
              >
                <Link to="/sign-in">Get started with Studio</Link>
              </Button>
              <p className="mt-4 text-gray-500">No credit card required</p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mt-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              FAQs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="md:col-span-2">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-medium">
                      What is included?
                    </AccordionTrigger>
                    <AccordionContent>
                      Everything you need to run your tour business online -
                      booking system, website, marketing tools, analytics, and
                      CRM. One simple monthly price gets you access to the
                      entire platform.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-medium">
                      What fees do I pay as an operator?
                    </AccordionTrigger>
                    <AccordionContent>
                      Just the flat monthly rate - there are no hidden fees, no
                      commission on bookings, and no additional charges for
                      features or support.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-medium">
                      How long are your contracts?
                    </AccordionTrigger>
                    <AccordionContent>
                      We offer month to month pricing with no long term
                      contracts. You can cancel anytime with no penalties or
                      hidden fees.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-lg font-medium">
                      How long does it take to get started?
                    </AccordionTrigger>
                    <AccordionContent>
                      Most operators are up and running within 24-48 hours. our
                      onboarding team will help you set up your account, import
                      your existing tours, and configure your booking system.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-lg font-medium">
                      Should I stop using third-party booking platforms?
                    </AccordionTrigger>
                    <AccordionContent>
                      Not necessarily. Many successful operators use both
                      Culturin for direct bookings and third-party platforms for
                      additional visibility. The difference is you'll now have a
                      professional booking system for your direct customers.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="max-w-md mx-auto mt-20">
            <div className="bg-black rounded-xl overflow-hidden">
              <div className="aspect-[4/5] relative">
                <Image
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop"
                  alt="Testimonial"
                  className="w-full h-full object-cover"
                  fill
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent p-6">
                  <div className="text-white">
                    <p className="text-xl font-medium mb-6">
                      "After we switched to Culturin, we've saved probably
                      thousands of dollars in fees and increased our bookings by
                      30%."
                    </p>
                    <p className="text-gray-300">Sofia Martinez</p>
                    <p className="text-gray-400 text-sm">
                      Owner of Barcelona Food Tours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <NewFooter />
    </div>
  );
};

export default PricingPage;
