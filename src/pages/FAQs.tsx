"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useInView } from "react-intersection-observer";
import { HelpCircle, Search, BookOpen, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "../../lib/navigation";
import NewFooter from "../components/sections/NewFooter";
import Image from "@/components/ui/image";

const faqCategories = [
  { id: "general", name: "General" },
  { id: "booking", name: "Booking" },
  { id: "experience", name: "Experiences" },
  { id: "payments", name: "Payments" },
  { id: "hosts", name: "For Hosts" },
];

const faqItems = [
  {
    category: "general",
    question: "What is Culturin?",
    answer:
      "Culturin is a platform connecting travelers with local hosts for authentic cultural experiences. Our mission is to promote meaningful travel through personalized cultural exchange and learning opportunities.",
  },
  {
    category: "general",
    question: "How does Culturin work?",
    answer:
      "Culturin connects travelers with verified local hosts who offer authentic cultural experiences. Browse experiences, book your preferred date and time, and enjoy a genuine cultural exchange with locals who are passionate about sharing their traditions, knowledge, and skills.",
  },
  {
    category: "general",
    question: "Where is Culturin available?",
    answer:
      "We currently operate in select cities across Europe, North America, and Asia. We're expanding rapidly to bring authentic cultural experiences to more destinations worldwide.",
  },
  {
    category: "booking",
    question: "How do I book an experience?",
    answer:
      "To book an experience, browse our collection, select one that interests you, choose your preferred date and group size, and complete your booking with payment. You'll receive a confirmation email with all the details.",
  },
  {
    category: "booking",
    question: "Can I cancel or reschedule my booking?",
    answer:
      "Yes, you can cancel or reschedule your booking according to our cancellation policy. Full refunds are available for cancellations made 7+ days before the experience, and partial refunds for cancellations 3-7 days prior. No refunds are available for cancellations less than 3 days before.",
  },
  {
    category: "booking",
    question: "Can I book for a group?",
    answer:
      "Absolutely! Most experiences can accommodate groups, with the maximum size specified in each listing. For larger groups, contact the host directly to arrange a private experience.",
  },
  {
    category: "experience",
    question: "What should I expect during an experience?",
    answer:
      "Each experience is unique, but all offer an authentic glimpse into local culture. Expect to learn, participate, and connect with your host and possibly other participants. Details about what's included, duration, and what to bring are listed on each experience page.",
  },
  {
    category: "experience",
    question: "Are experiences suitable for children?",
    answer:
      'Many experiences are family-friendly, indicated by a "Family Friendly" tag. The experience page will specify minimum age requirements if applicable. If you have specific questions, you can message the host before booking.',
  },
  {
    category: "payments",
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through our payment partner.",
  },
  {
    category: "payments",
    question: "Are there any hidden fees?",
    answer:
      "No, the price displayed includes all fees and taxes. There are no additional charges unless you opt for extras offered by the host.",
  },
  {
    category: "hosts",
    question: "How can I become a host?",
    answer:
      'To become a host, visit our "For Operators" page, fill out an application, and our team will review it. We look for hosts who are passionate about sharing authentic cultural experiences and have unique knowledge or skills.',
  },
  {
    category: "hosts",
    question: "How much does it cost to be a host?",
    answer:
      "There's no upfront cost to become a host. Culturin takes a percentage of each booking made through our platform. Details are provided during the application process.",
  },
];

const FAQs = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("general");

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filteredFAQs = searchQuery
    ? faqItems.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="traveler" />

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative bg-blue-600 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop"
              alt="Frequently Asked Questions"
              className="w-full h-full object-cover opacity-30"
              fill
            />
            <div className="absolute inset-0 bg-blue-600/70"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Find answers to common questions about Culturin, experiences,
                and more.
              </p>

              <div className="mt-8 relative max-w-xl mx-auto">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search for answers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-6 bg-white/95 text-gray-900 rounded-lg focus:ring-2 focus:ring-white/50 text-lg"
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                    <Search className="h-5 w-5 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section ref={ref} className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            {/* Category Tabs */}
            {!searchQuery && (
              <div className="mb-12 overflow-x-auto whitespace-nowrap">
                <div className="flex space-x-2 md:space-x-6 justify-center">
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-5 py-3 rounded-lg transition-all text-sm md:text-base font-medium ${
                        activeCategory === category.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results Label */}
            {searchQuery && (
              <div className="mb-8 text-center">
                <h2 className="text-xl font-semibold">
                  Search results for "{searchQuery}"
                </h2>
                <p className="text-gray-600 mt-2">
                  {filteredFAQs.length} results found
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSearchQuery("")}
                >
                  Clear search
                </Button>
              </div>
            )}

            {/* FAQ List */}
            <div
              className={`transition-opacity duration-500 ${
                inView ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="max-w-3xl mx-auto">
                {filteredFAQs.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFAQs.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border-b border-gray-200"
                      >
                        <AccordionTrigger className="text-lg md:text-xl text-left hover:no-underline hover:text-blue-600 py-6">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 text-base pb-6">
                          <p className="leading-relaxed">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-16">
                    <HelpCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-2xl font-medium mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your search terms or browse by category
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Support Options Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">
              Additional Support Options
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-6">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Documentation</h3>
                  <p className="text-gray-600 mb-6">
                    Explore our detailed guides, tutorials and API documentation
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => window.open("/blog", "_blank")}
                    className="mt-auto border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    View Guides
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-6">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Call Support</h3>
                  <p className="text-gray-600 mb-6">
                    Speak directly with our customer support team
                  </p>
                  <Button
                    variant="outline"
                    className="mt-auto border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    +1 (800) 555-1234
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-6">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Email Us</h3>
                  <p className="text-gray-600 mb-6">
                    Send us a message and we'll respond within 24 hours
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/contact")}
                    className="mt-auto border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    Contact Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
};

export default FAQs;
