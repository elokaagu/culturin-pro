"use client";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "../../../lib/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Star,
  CreditCard,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { ItineraryType } from "@/data/itineraryData";

const BookingFlowPreview: React.FC = () => {
  const { itineraryId } = useParams();
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState<
    ItineraryType & {
      price?: number;
      rating?: number;
      ratingCount?: number;
      location?: string;
    }
  >({
    id: "",
    title: "",
    description: "",
    days: 0,
    storyMode: false,
    lastUpdated: "",
    status: "published",
    image: "",
    price: 149,
    rating: 4.8,
    ratingCount: 126,
    location: "Barcelona, Spain",
  });

  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVC: "",
  });

  useEffect(() => {
    // In a real app, this would fetch from an API
    setLoading(true);

    // Simulate API call to fetch itinerary data
    setTimeout(() => {
      // Try to load the itinerary from localStorage if it exists
      const allItineraries = JSON.parse(
        localStorage.getItem("itineraries") || "[]"
      );
      const foundItinerary = allItineraries.find(
        (item: any) => item.id === itineraryId
      );

      const mockItinerary: ItineraryType & {
        price?: number;
        rating?: number;
        ratingCount?: number;
        location?: string;
      } = foundItinerary || {
        id: itineraryId || "sample",
        title: foundItinerary?.title || "Barcelona Cultural Highlights",
        description:
          foundItinerary?.description ||
          "Experience the best of Barcelona's rich culture, architecture, and cuisine in this immersive tour.",
        days: foundItinerary?.days || 3,
        storyMode: foundItinerary?.storyMode || false,
        lastUpdated: foundItinerary?.lastUpdated || "2 days ago",
        status: "published",
        image:
          foundItinerary?.image ||
          "/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png",
        price: 149,
        rating: 4.8,
        ratingCount: 126,
        location: foundItinerary?.location || "Barcelona, Spain",
      };

      // Get website info from localStorage
      const companyName =
        localStorage.getItem("websiteCompanyName") ||
        "Barcelona Cultural Tours";

      // Add website info to document title
      document.title = `Book ${mockItinerary.title} - ${companyName}`;

      setItinerary(mockItinerary);
      setLoading(false);
    }, 500);
  }, [itineraryId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateSelect = (newDate: Date) => {
    setDate(newDate);
  };

  const handleNextStep = () => {
    if (step === 1 && !date) {
      toast.error("Please select a date");
      return;
    }

    if (step === 2) {
      // Validate contact details
      if (!formData.firstName || !formData.lastName || !formData.email) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address");
        return;
      }
    }

    if (step === 3) {
      // Validate payment details
      if (
        !formData.cardNumber ||
        !formData.cardName ||
        !formData.cardExpiry ||
        !formData.cardCVC
      ) {
        toast.error("Please fill in all payment details");
        return;
      }

      // Simulate payment processing
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(4);
        toast.success("Payment processed successfully!");
      }, 1500);
      return;
    }

    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleClose = () => {
    if (typeof window !== "undefined") {
      window.history.back(); // Go back to previous page
    }
  };

  if (loading && step !== 4) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-primary rounded-full mx-auto"></div>
          <p className="mt-4 text-lg">Loading booking experience...</p>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Select Date & Guests</h2>
              <p className="text-gray-600">
                Choose your preferred date and number of participants.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Available Dates</h3>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  {/* In a real app, this would be a real calendar component */}
                  <div className="grid grid-cols-7 gap-1 text-center font-medium mb-2">
                    <div>M</div>
                    <div>T</div>
                    <div>W</div>
                    <div>T</div>
                    <div>F</div>
                    <div>S</div>
                    <div>S</div>
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 31 }, (_, i) => {
                      const day = i + 1;
                      const isSelected = date?.getDate() === day;
                      const isAvailable = [
                        2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30,
                      ].includes(day);

                      return (
                        <button
                          key={day}
                          className={`
                            h-10 w-full rounded-md flex items-center justify-center text-sm 
                            ${isSelected ? "bg-primary text-white" : ""}
                            ${
                              isAvailable && !isSelected
                                ? "hover:bg-gray-100"
                                : ""
                            }
                            ${
                              !isAvailable && !isSelected
                                ? "text-gray-300 cursor-not-allowed"
                                : ""
                            }
                          `}
                          disabled={!isAvailable}
                          onClick={() => {
                            if (isAvailable) {
                              const newDate = new Date();
                              newDate.setDate(day);
                              handleDateSelect(newDate);
                            }
                          }}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-primary mr-2 rounded-full"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-100 border border-gray-300 mr-2 rounded-full"></div>
                      <span>Unavailable</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Number of Guests</h3>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Adults</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{guests}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setGuests(Math.min(10, guests + 1))}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Price Summary</h3>
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>{itinerary.title}</span>
                        <span>
                          €{itinerary.price} x {guests}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Booking fee</span>
                        <span>€{(itinerary.price || 0) * 0.05 * guests}</span>
                      </div>
                      <div className="border-t my-2"></div>
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>
                          €
                          {(itinerary.price || 0) * guests +
                            (itinerary.price || 0) * 0.05 * guests}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Contact Information</h2>
              <p className="text-gray-600">
                Please provide your contact details for booking confirmation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requests
                    </label>
                    <textarea
                      name="specialRequests"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-6">
                  <h3 className="text-lg font-medium mb-4">Booking Summary</h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-gray-600">
                          {date
                            ? date.toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "Not selected"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Guests</p>
                        <p className="text-gray-600">
                          {guests} {guests === 1 ? "person" : "people"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-gray-600">{itinerary.location}</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 my-4"></div>

                    <div className="flex justify-between">
                      <span>{itinerary.title}</span>
                      <span>
                        €{itinerary.price} x {guests}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Booking fee</span>
                      <span>€{(itinerary.price || 0) * 0.05 * guests}</span>
                    </div>

                    <div className="border-t border-gray-200 mt-2 pt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>
                          €
                          {(itinerary.price || 0) * guests +
                            (itinerary.price || 0) * 0.05 * guests}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Payment</h2>
              <p className="text-gray-600">
                Enter your payment details to complete your booking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="John Smith"
                      value={formData.cardName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="cardExpiry"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        name="cardCVC"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="123"
                        value={formData.cardCVC}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-medium mb-3">Secure Payment</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Your payment information is encrypted and secure. We never
                    store your full credit card details.
                  </p>
                  <div className="flex gap-2">
                    <div className="bg-gray-200 p-1 rounded">
                      <svg className="h-8 w-12" viewBox="0 0 48 32">
                        <rect width="48" height="32" fill="#1A1F71" rx="4" />
                        <path
                          fill="#FFF"
                          d="M17.2 12h-3.2l-2 9.6h3.2l2-9.6Zm12 6.4l1.6-4.8.8 4.8h-2.4Zm3.2 3.2h3.2L33.2 12h-3.2c-1.6 0-2 1.2-2 1.2l-3.6 8.4h3.2l.4-1.6h3.2l.4 1.6Zm-6.4-3.2c0 3.2-2.8 3.2-4.4 3.2H20l.8-2.4h1.6c.4 0 1.2 0 1.2-.8 0-1.2-2 0-2-2 0-2.8 2.4-2.8 4-2.8h1.6l-.8 2.4h-1.2c-.4 0-.8 0-.8.4 0 1.2 2 0 2 2Z"
                        />
                      </svg>
                    </div>
                    <div className="bg-gray-200 p-1 rounded">
                      <svg className="h-8 w-12" viewBox="0 0 48 32">
                        <rect width="48" height="32" fill="#252525" rx="4" />
                        <path
                          fill="#FFB600"
                          d="M30 16a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                        />
                        <path
                          fill="#F7981D"
                          d="M22 8a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-6">
                  <h3 className="text-lg font-medium mb-4">Booking Summary</h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{itinerary.title}</p>
                        <p className="text-gray-600">{itinerary.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-gray-600">
                          {date
                            ? date.toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "Not selected"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Guests</p>
                        <p className="text-gray-600">
                          {guests} {guests === 1 ? "person" : "people"}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 my-4"></div>

                    <div className="flex justify-between">
                      <span>{itinerary.title}</span>
                      <span>
                        €{itinerary.price} x {guests}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Booking fee</span>
                      <span>€{(itinerary.price || 0) * 0.05 * guests}</span>
                    </div>

                    <div className="border-t border-gray-200 mt-2 pt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>
                          €
                          {(itinerary.price || 0) * guests +
                            (itinerary.price || 0) * 0.05 * guests}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="max-w-2xl mx-auto text-center space-y-8 py-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
              <Check className="h-10 w-10 text-green-600" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Booking Confirmed!</h2>
              <p className="text-gray-600 text-lg">
                Thank you for booking {itinerary.title}. We've sent a
                confirmation to your email.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 text-left">
              <h3 className="text-xl font-semibold mb-4">Booking Details</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Booking Reference</p>
                    <p className="font-medium">
                      #BKG{Math.floor(Math.random() * 1000000)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium">{itinerary.title}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">
                      {date
                        ? date.toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Not selected"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="font-medium">
                      {guests} {guests === 1 ? "person" : "people"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Paid</p>
                    <p className="font-medium">
                      €
                      {(itinerary.price || 0) * guests +
                        (itinerary.price || 0) * 0.05 * guests}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contact Email</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Button className="mr-2" onClick={handleClose}>
                Return to Website
              </Button>
              <Button variant="outline">Download Confirmation</Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Get primary color from localStorage for theming
  const primaryColor = localStorage.getItem("websitePrimaryColor") || "#9b87f5";

  return (
    <div
      className="bg-gray-50 min-h-screen"
      style={{ "--primary": primaryColor } as React.CSSProperties}
    >
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">{itinerary.title}</h1>
              <p className="ml-4 text-sm text-gray-500">{itinerary.location}</p>
            </div>

            {step < 4 && (
              <div className="hidden md:flex items-center space-x-1 text-sm">
                <div
                  className={`flex items-center ${
                    step >= 1 ? "text-primary" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-white ${
                      step >= 1 ? "bg-primary" : "bg-gray-300"
                    }`}
                  >
                    1
                  </div>
                  <span className="ml-1">Dates</span>
                </div>

                <div className="w-8 h-px bg-gray-300" />

                <div
                  className={`flex items-center ${
                    step >= 2 ? "text-primary" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-white ${
                      step >= 2 ? "bg-primary" : "bg-gray-300"
                    }`}
                  >
                    2
                  </div>
                  <span className="ml-1">Details</span>
                </div>

                <div className="w-8 h-px bg-gray-300" />

                <div
                  className={`flex items-center ${
                    step >= 3 ? "text-primary" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-white ${
                      step >= 3 ? "bg-primary" : "bg-gray-300"
                    }`}
                  >
                    3
                  </div>
                  <span className="ml-1">Payment</span>
                </div>

                <div className="w-8 h-px bg-gray-300" />

                <div
                  className={`flex items-center ${
                    step >= 4 ? "text-primary" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-white ${
                      step >= 4 ? "bg-primary" : "bg-gray-300"
                    }`}
                  >
                    4
                  </div>
                  <span className="ml-1">Confirmation</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {step < 4 && (
          <div className="mb-8">
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
                <img
                  src={itinerary.image || "https://placehold.co/300x300"}
                  alt={itinerary.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold">{itinerary.title}</h2>
                <div className="flex items-center text-sm mt-1">
                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                  <span>{itinerary.location}</span>
                </div>
                <div className="flex items-center text-sm mt-1">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span>
                    {itinerary.rating} ({itinerary.ratingCount} reviews)
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {itinerary.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {renderStepContent()}

        {step < 4 && (
          <div className="flex justify-between mt-12">
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={step === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>

            <Button onClick={handleNextStep}>
              {step === 3 ? (
                <>
                  <CreditCard className="h-4 w-4 mr-1" /> Complete Payment
                </>
              ) : (
                <>
                  Continue <ChevronRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        )}
      </main>

      <footer className="bg-white mt-16 border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()}{" "}
            {localStorage.getItem("websiteCompanyName") || "Culturin Pro"}. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BookingFlowPreview;
