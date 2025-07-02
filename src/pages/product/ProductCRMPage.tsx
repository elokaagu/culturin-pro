"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "../../../lib/navigation";
import { Heart, Mail, Users, Star, Calendar, Gift, Award } from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import Image from "@/components/ui/image";

const ProductCRMPage = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);

  useEffect(() => {
    setAnimateItems(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Turn one-time guests into returning fans
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Our Guest CRM tools help you create personalized experiences,
                  build lasting relationships, and transform casual visitors
                  into loyal advocates for your cultural experiences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 px-8 rounded-xl h-auto"
                    asChild
                  >
                    <Link to="/demo">Request a demo</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white border border-gray-300 text-gray-800 text-lg py-6 px-8 rounded-xl h-auto"
                    asChild
                  >
                    <Link to="/sign-in">Get started</Link>
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-gray-100 rounded-xl p-8 aspect-video flex items-center justify-center">
                  <Image
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
                    alt="CRM Dashboard"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                CRM + Lifecycle Automation
              </h2>
              <p className="text-lg text-gray-600">
                Connect every journey to the next with our comprehensive suite
                of guest relationship management tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <Users className="h-10 w-10 text-blue-600" />,
                  title: "Guest Profiles",
                  description:
                    "Comprehensive profiles with travel history, preferences, and reviews for personalized experiences.",
                },
                {
                  icon: <Award className="h-10 w-10 text-blue-600" />,
                  title: "Loyalty System",
                  description:
                    "Reward repeat guests with trip credits, special invites, and exclusive experiences.",
                },
                {
                  icon: <Heart className="h-10 w-10 text-blue-600" />,
                  title: "Referral Engine",
                  description:
                    "Turn guests into advocates with incentives for return visits and friend referrals.",
                },
                {
                  icon: <Calendar className="h-10 w-10 text-blue-600" />,
                  title: "Journey Automations",
                  description:
                    "Send birthday trip reminders, anniversary rebooking offers, and cultural festival nudges.",
                },
                {
                  icon: <Star className="h-10 w-10 text-blue-600" />,
                  title: "Feedback Loops",
                  description:
                    "Gather NPS scores, memory prompts, and testimonials to improve your experiences.",
                },
                {
                  icon: <Gift className="h-10 w-10 text-blue-600" />,
                  title: "Personal Connections",
                  description:
                    "Build authentic relationships that transform casual visitors into loyal fans.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`bg-white p-8 rounded-xl border border-gray-200 shadow-sm transition-all duration-500 ${
                    animateItems
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="mb-5">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white py-5 px-8 rounded-xl text-lg h-auto"
                asChild
              >
                <Link to="/sign-in">Start a free trial</Link>
              </Button>
              <p className="mt-3 text-gray-500">No credit card required</p>
            </div>
          </div>
        </section>

        {/* Differentiator Section */}
        <section className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Build a real guest base, not just a spreadsheet
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Operators using Culturin's Guest CRM connect every journey
                    to the next, turning travelers into returning fans and
                    advocates for their experiences.
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700">
                        68% increase in repeat bookings
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700">
                        42% higher lifetime guest value
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                        <svg
                          className="w-4 h-4 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700">
                        3.4× more referral bookings
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/2">
                  <div className="rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop"
                      alt="CRM Testimonial"
                      className="w-full object-cover"
                      aspectRatio="wide"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="bg-gray-50 py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Trusted by experience providers worldwide
              </h2>
              <p className="text-lg text-gray-600">
                See what our customers have to say about our Guest CRM tools
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  quote:
                    "Culturin's Guest CRM helped us increase our repeat booking rate by 45%. Now we can remember each guest's preferences and create truly personalized experiences.",
                  name: "Sarah Johnson",
                  company: "Urban Art Tours",
                  image:
                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
                },
                {
                  quote:
                    "The automated anniversary and birthday reminders have generated thousands in additional bookings. Our guests love the personal touch.",
                  name: "David Chen",
                  company: "Food & History Tours",
                  image:
                    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1000&auto=format&fit=crop",
                },
                {
                  quote:
                    "Our loyalty program built with Culturin has been a game-changer. Returning guests bring friends and our business grows organically.",
                  name: "Amira Hassan",
                  company: "Desert Adventures",
                  image:
                    "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1000&auto=format&fit=crop",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all duration-500 h-full ${
                    animateItems
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100 + 200}ms` }}
                >
                  <div className="relative h-80">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name}, ${testimonial.company}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 flex flex-col justify-end p-5">
                      <h3 className="text-white font-medium text-xl">
                        {testimonial.name}
                      </h3>
                      <p className="text-white/80">{testimonial.company}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700">{testimonial.quote}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white py-5 px-8 rounded-xl text-lg h-auto"
                asChild
              >
                <Link to="/demo">Request a demo</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
};

export default ProductCRMPage;
