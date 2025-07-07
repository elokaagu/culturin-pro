"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import NewFooter from "@/components/sections/NewFooter";
import { CheckCircle, ChevronRight, Clock } from "lucide-react";
import { useNavigate } from "../../lib/navigation";
import { toast } from "@/components/ui/use-toast";

const DemoPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    website: "",
    experienceType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demo request submitted!",
      description:
        "We'll contact you shortly to schedule your personalized demo.",
    });

    // Redirect to sign-in, which will then redirect to Studio after login
    navigate("/sign-in");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="bg-white py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Get a personalized demo of Culturin Pro
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  See how our tour operator software can transform your cultural
                  experience business with a customized demo tailored to your
                  specific needs.
                </p>
                <Card className="bg-blue-50 border-blue-100 p-4 mb-8">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Quick response time:</span>{" "}
                      Our team typically responds within 24 hours to schedule
                      your demo.
                    </p>
                  </div>
                </Card>
              </div>
              <div className="lg:w-1/2 w-full">
                <Card className="p-6 md:p-8 shadow-md border-gray-200">
                  <h2 className="text-2xl font-bold mb-6">
                    Request your free demo
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="firstName"
                        >
                          First Name*
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          className="w-full p-3 border border-gray-300 rounded-md"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="lastName"
                        >
                          Last Name*
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          className="w-full p-3 border border-gray-300 rounded-md"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email Address*
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="phone"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="businessName"
                      >
                        Business Name*
                      </label>
                      <input
                        id="businessName"
                        name="businessName"
                        type="text"
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={formData.businessName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="website"
                      >
                        Website URL
                      </label>
                      <input
                        id="website"
                        name="website"
                        type="url"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={formData.website}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="experienceType"
                      >
                        What type of cultural experiences do you offer?*
                      </label>
                      <select
                        id="experienceType"
                        name="experienceType"
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={formData.experienceType}
                        onChange={handleChange}
                      >
                        <option value="">Please select...</option>
                        <option value="food">Food & Culinary Tours</option>
                        <option value="history">
                          Historical & Heritage Tours
                        </option>
                        <option value="art">Art & Museum Tours</option>
                        <option value="music">
                          Music & Performance Experiences
                        </option>
                        <option value="nature">
                          Nature & Outdoor Cultural Experiences
                        </option>
                        <option value="workshop">Workshops & Classes</option>
                        <option value="festival">
                          Festival & Event Experiences
                        </option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="mb-6">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="message"
                      >
                        Tell us about your business needs
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 h-auto rounded-xl"
                    >
                      Request a Demo <ChevronRight className="h-5 w-5 ml-1" />
                    </Button>

                    <p className="text-center text-sm text-gray-500 mt-4">
                      By submitting this form, you agree to our privacy policy
                      and terms of service.
                    </p>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Culturin Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Why choose Culturin Pro?
              </h2>
              <p className="text-lg text-gray-600">
                Join thousands of cultural experience creators who are growing
                their businesses with our specialized platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                "All in one platform designed specifically for cultural experiences",
                "Commission free direct bookings save you thousands",
                "Built-in marketing tools to reach more travelers",
                "Advanced CRM to build guest relationships",
                "Data driven insights to grow your business",
                "Dedicated support from our team of experts",
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <NewFooter />
    </div>
  );
};

export default DemoPage;
