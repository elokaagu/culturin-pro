"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MessageSquare, Mail, User, Info, Phone, BookOpen } from "lucide-react";
import { useNavigate } from "../../lib/navigation";
import { toast } from "sonner";
import { useInView } from "react-intersection-observer";

import Header from "@/components/Header";
import NewFooter from "../components/sections/NewFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Image from "@/components/ui/image";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

const Contact = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form submitted:", data);
    toast.success("Message sent successfully! We'll get back to you soon.");

    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header type="traveler" />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-blue-600 text-white py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
              alt="Contact us"
              className="w-full h-full object-cover opacity-20"
              fill
            />
            <div className="absolute inset-0 bg-blue-600/70"></div>
          </div>
          <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Contact Us
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Have questions or feedback? Reach out to our team and we'll get
                back to you as soon as possible.
              </p>

              <div className="mt-8 relative max-w-xl mx-auto">
                <Button
                  onClick={() => {
                    const formElement = document.getElementById("contact-form");
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Send us a message
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section
          ref={ref}
          id="contact-form"
          className="py-16 md:py-24 bg-white"
        >
          <div className="container mx-auto px-6 max-w-7xl">
            <div
              className={`grid md:grid-cols-2 gap-12 lg:gap-16 transition-opacity duration-500 ${
                inView ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Get In Touch
                  </h2>
                  <p className="text-gray-600 mb-8">
                    We're here to help with any questions about our experiences,
                    becoming a host, or how Culturin works. Our team will get
                    back to you within 24 hours.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Email</h3>
                      <p className="text-gray-600">
                        <a
                          href="mailto:hello@culturin.com"
                          className="hover:underline"
                        >
                          hello@culturin.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Social Media</h3>
                      <p className="text-gray-600">
                        <a
                          href="https://instagram.com/culturin"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline mr-2"
                        >
                          Instagram
                        </a>{" "}
                        |
                        <a
                          href="https://linkedin.com/company/culturin"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline ml-2"
                        >
                          LinkedIn
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Info className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Support</h3>
                      <p className="text-gray-600">
                        See our{" "}
                        <a
                          href="/faqs"
                          className="text-blue-600 hover:underline"
                        >
                          FAQs
                        </a>{" "}
                        for quick answers to common questions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold mb-6">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <div className="mt-1 relative">
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        {...register("name")}
                        className={`pl-10 ${
                          errors.name ? "border-red-500" : ""
                        }`}
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="mt-1 relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email address"
                        {...register("email")}
                        className={`pl-10 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <div className="mt-1">
                      <Input
                        id="subject"
                        placeholder="What is your message about?"
                        {...register("subject")}
                        className={errors.subject ? "border-red-500" : ""}
                      />
                    </div>
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <div className="mt-1">
                      <Textarea
                        id="message"
                        placeholder="Your message..."
                        rows={5}
                        {...register("message")}
                        className={errors.message ? "border-red-500" : ""}
                      />
                    </div>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Resources Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-16">
              Additional Resources
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="bg-white border-none shadow-md hover:shadow-lg transition-all">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-6">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Documentation</h3>
                  <p className="text-gray-600 mb-6">
                    Explore our detailed guides and tutorials
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
                    <MessageSquare className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">Help Center</h3>
                  <p className="text-gray-600 mb-6">
                    Find answers to common questions
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/help-center")}
                    className="mt-auto border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    Visit Help Center
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

export default Contact;
