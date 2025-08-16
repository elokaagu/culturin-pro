"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Users,
  Star,
  ArrowLeft,
  CreditCard,
  Shield,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Tour = {
  id: string;
  name: string;
  duration: string;
  price: number;
  image: string;
  description: string;
  highlights: string[];
  rating: number;
  reviews: number;
  source?: string; // Track where the tour data came from
};

type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  participants: number;
  date: string;
  specialRequests: string;
};

export default function BookingPage({
  params,
}: {
  params: { slug: string; tourId: string };
}) {
  const [loading, setLoading] = useState(true);
  const [tour, setTour] = useState<Tour | null>(null);
  const [operatorName, setOperatorName] = useState("Culturin Tours");
  const [primaryColor, setPrimaryColor] = useState("#9b87f5");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    participants: 2,
    date: "",
    specialRequests: "",
  });

  useEffect(() => {
    const loadBookingData = async () => {
      try {
        setLoading(true);

        // Load operator data from localStorage
        const publishedContentStr = localStorage.getItem(
          "publishedWebsiteContent"
        );
        if (publishedContentStr) {
          try {
            const publishedContent = JSON.parse(publishedContentStr);
            setOperatorName(publishedContent.companyName || "Culturin Tours");
            setPrimaryColor(publishedContent.primaryColor || "#9b87f5");
          } catch (e) {
            console.error("Error parsing published content:", e);
          }
        }

        // Try multiple methods to load real tour data
        let realTour = null;

        // Method 1: Try to load from selectedTour localStorage (from website builder)
        const userId = Object.keys(localStorage)
          .find((key) => key.startsWith("selectedTour_"))
          ?.split("_")[1];

        if (userId) {
          const selectedTourStr = localStorage.getItem(
            `selectedTour_${userId}`
          );
          const websiteSlug = localStorage.getItem(`websiteSlug_${userId}`);

          if (selectedTourStr && websiteSlug === params.slug) {
            try {
              realTour = JSON.parse(selectedTourStr);
              console.log(
                "✅ Tour loaded from selectedTour localStorage:",
                realTour
              );
            } catch (e) {
              console.error("Error parsing selectedTour data:", e);
            }
          }
        }

        // Method 2: Try to load from websiteData localStorage (fallback)
        if (!realTour) {
          const websiteDataStr = localStorage.getItem(
            `websiteData_${userId || "default"}`
          );
          if (websiteDataStr) {
            try {
              const websiteData = JSON.parse(websiteDataStr);
              if (
                websiteData.experiences &&
                websiteData.experiences.length > 0
              ) {
                // Find the specific tour by ID
                const foundItinerary = websiteData.experiences.find(
                  (it: any) => it.id === params.tourId
                );
                if (foundItinerary) {
                  realTour = foundItinerary;
                  console.log(
                    "✅ Tour loaded from websiteData localStorage:",
                    realTour
                  );
                }
              }
            } catch (e) {
              console.error("Error parsing websiteData:", e);
            }
          }
        }

        // Method 3: Try to load from currentTour localStorage (new method)
        if (!realTour) {
          const currentTourStr = localStorage.getItem(
            `currentTour_${params.tourId}`
          );
          const currentWebsiteSlug = localStorage.getItem("currentWebsiteSlug");

          if (currentTourStr && currentWebsiteSlug === params.slug) {
            try {
              realTour = JSON.parse(currentTourStr);
              console.log(
                "✅ Tour loaded from currentTour localStorage:",
                realTour
              );
            } catch (e) {
              console.error("Error parsing currentTour data:", e);
            }
          }
        }

        // Method 4: Try to load from publishedItineraries localStorage
        if (!realTour) {
          const publishedItinerariesStr = localStorage.getItem(
            "publishedItineraries"
          );
          if (publishedItinerariesStr) {
            try {
              const publishedItineraries = JSON.parse(publishedItinerariesStr);
              const foundItinerary = publishedItineraries.find(
                (it: any) => it.id === params.tourId
              );
              if (foundItinerary) {
                realTour = foundItinerary;
                console.log(
                  "✅ Tour loaded from publishedItineraries localStorage:",
                  realTour
                );
              }
            } catch (e) {
              console.error("Error parsing publishedItineraries:", e);
            }
          }
        }

        // Transform real tour data to match Tour interface
        if (realTour) {
          const transformedTour: Tour = {
            id: realTour.id || params.tourId,
            name: realTour.title || realTour.name || "Tour",
            duration: realTour.days
              ? `${realTour.days} day${realTour.days !== 1 ? "s" : ""}`
              : realTour.duration || "1 day",
            price: realTour.price || 99,
            image: realTour.image || "",
            description: realTour.description || "Experience this amazing tour",
            highlights: realTour.highlights || [
              "Professional guide",
              "Small groups",
              "Cultural experience",
            ],
            rating: realTour.rating || 0,
            reviews: realTour.reviews || 0,
            source: "Real Experience Data",
          };

          setTour(transformedTour);
          console.log("🎯 Final transformed tour:", transformedTour);
        } else {
          // Only fallback to sample data if no real data found
          console.warn(
            "⚠️ No real tour data found, using fallback sample data"
          );
          const sampleTours: Tour[] = [
            {
              id: "gaudi-tour",
              name: "Gaudí Masterpieces Tour",
              duration: "4 hours",
              price: 65,
              image:
                "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
              description:
                "Explore Antoni Gaudí's most famous architectural works including Sagrada Familia and Park Güell with skip-the-line access.",
              highlights: [
                "Skip-the-line Sagrada Familia tickets",
                "Expert architecture guide",
                "Small groups of max 10 people",
              ],
              rating: 4.9,
              reviews: 215,
              source: "Sample Data (Fallback)",
            },
          ];

          const foundTour =
            sampleTours.find((t) => t.id === params.tourId) || sampleTours[0];
          setTour(foundTour);
        }
      } catch (error) {
        console.error("Error loading booking data:", error);
        toast.error("Failed to load tour information");
      } finally {
        setLoading(false);
      }
    };

    loadBookingData();
  }, [params.slug, params.tourId]);

  const handleInputChange = (
    field: keyof BookingFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Process booking
      setStep(3);
    }
  };

  const getTotalPrice = () => {
    return tour ? tour.price * formData.participants : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Tour Not Found
          </h1>
          <p className="text-gray-600">
            The requested tour could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold">{operatorName}</h1>
              <p className="text-sm text-gray-600">Secure Booking</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          required
                          className="text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          required
                          className="text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                        className="text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        required
                        className="text-sm sm:text-base"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="participants">
                          Number of Participants
                        </Label>
                        <Select
                          value={formData.participants.toString()}
                          onValueChange={(value) =>
                            handleInputChange("participants", parseInt(value))
                          }
                        >
                          <SelectTrigger className="text-sm sm:text-base">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? "person" : "people"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="date">Preferred Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) =>
                            handleInputChange("date", e.target.value)
                          }
                          min={new Date().toISOString().split("T")[0]}
                          required
                          className="text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="specialRequests">
                        Special Requests (Optional)
                      </Label>
                      <Textarea
                        id="specialRequests"
                        value={formData.specialRequests}
                        onChange={(e) =>
                          handleInputChange("specialRequests", e.target.value)
                        }
                        placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                        rows={3}
                        className="text-sm sm:text-base"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full text-sm sm:text-base py-3 sm:py-4"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Continue to Payment
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center gap-2 text-blue-800">
                        <Shield className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Secure Payment
                        </span>
                      </div>
                      <p className="text-sm text-blue-700 mt-1">
                        Your payment information is encrypted and secure.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="Eloka Agu" required />
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1"
                        style={{ backgroundColor: primaryColor }}
                      >
                        Complete Booking - €{getTotalPrice()}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Booking Confirmed!
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for your booking. You will receive a confirmation
                    email shortly with all the details.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-600">Booking Reference</p>
                    <p className="font-mono text-lg font-semibold">
                      BCT-{Date.now().toString().slice(-6)}
                    </p>
                  </div>
                  <Button
                    onClick={() =>
                      (window.location.href = `/tour/${params.slug}`)
                    }
                    style={{ backgroundColor: primaryColor }}
                  >
                    Return to Tours
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Tour Summary */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <Card className="sticky top-4 sm:top-8">
              <CardContent className="p-0">
                <div className="aspect-video relative">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">
                        {tour.rating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({tour.reviews} reviews)
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {tour.name}
                  </h3>

                  {/* Debug Info - Only show in development */}
                  {process.env.NODE_ENV === "development" && (
                    <div className="text-left bg-gray-100 p-3 rounded-lg mb-4 text-xs">
                      <p className="font-medium mb-2">Debug Info:</p>
                      <p>Tour ID: {tour.id}</p>
                      <p>Price: €{tour.price}</p>
                      <p>Duration: {tour.duration}</p>
                      <p>Reviews: {tour.reviews}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>Small group</span>
                    </div>
                  </div>

                  {step >= 1 && formData.date && (
                    <div className="border-t pt-4 mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Booking Summary
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span>
                            {new Date(formData.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Participants:</span>
                          <span>{formData.participants}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Price per person:
                          </span>
                          <span>€{tour.price}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-base border-t pt-2">
                          <span>Total:</span>
                          <span>€{getTotalPrice()}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      What's Included:
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {tour.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
