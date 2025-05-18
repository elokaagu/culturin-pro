
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ItineraryType } from '@/data/itineraryData';
import { ArrowLeft, Calendar, Clock, Users, MapPin, CreditCard, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';

// Mock data for the itinerary
const mockItineraries: Record<string, ItineraryType> = {
  "1": {
    id: "1",
    title: "Traditional Cooking Class Experience",
    location: "Kyoto, Japan",
    days: 1,
    description: "Learn authentic Japanese cooking techniques from local chefs.",
    image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
    price: 120,
    rating: 4.8,
    ratingCount: 26,
    storyMode: false,
  },
  "2": {
    id: "2",
    title: "Heritage Journey: Ancestral Tokyo",
    location: "Tokyo, Japan",
    days: 3,
    description: "Discover your family roots through this guided cultural experience.",
    image: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
    price: 350,
    rating: 4.9,
    ratingCount: 14,
    storyMode: true,
  }
};

const BookingFlowPreview: React.FC = () => {
  const { itineraryId } = useParams<{ itineraryId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    guests: 2,
    date: "2025-06-15",
    time: "10:00 AM",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "card",
  });
  
  // Use itineraryId = "1" as default if not provided
  const currentItineraryId = itineraryId || "1";
  const itinerary = mockItineraries[currentItineraryId] || mockItineraries["1"];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking Confirmed!",
      description: `Thank you for booking ${itinerary.title}. A confirmation email has been sent to ${formData.email}.`,
    });
    setStep(4);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="traveler" />
      
      <div className="flex-1 pt-20">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handlePrevious}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> 
            {step > 1 ? "Back" : "Return to Itinerary"}
          </Button>

          {step < 4 ? (
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold">{itinerary.title}</h1>
              <div className="text-right">
                <div className="text-lg font-semibold">${itinerary.price} per person</div>
                <div className="text-sm text-gray-500">
                  {itinerary.rating} ★ ({itinerary.ratingCount} reviews)
                </div>
              </div>
            </div>
          ) : null}

          <div className="space-y-6">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Experience Details</CardTitle>
                  <CardDescription>Select date, time and number of guests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <div className="relative">
                        <Input 
                          id="date" 
                          type="date" 
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <div className="relative">
                        <Select 
                          value={formData.time}
                          onValueChange={(value) => handleSelectChange("time", value)}
                        >
                          <SelectTrigger className="pl-10">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                            <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                            <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                            <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="guests">Number of Guests</Label>
                    <div className="relative">
                      <Select 
                        value={formData.guests.toString()}
                        onValueChange={(value) => handleSelectChange("guests", value)}
                      >
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="Number of guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 guest</SelectItem>
                          <SelectItem value="2">2 guests</SelectItem>
                          <SelectItem value="3">3 guests</SelectItem>
                          <SelectItem value="4">4 guests</SelectItem>
                          <SelectItem value="5">5 guests</SelectItem>
                        </SelectContent>
                      </Select>
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Experience fee × {formData.guests}</span>
                        <span>${itinerary.price * Number(formData.guests)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Booking fee</span>
                        <span>$5.00</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t mt-2">
                        <span>Total</span>
                        <span>${itinerary.price * Number(formData.guests) + 5}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4" onClick={handleNext}>
                    Continue to Personal Details
                  </Button>
                </CardContent>
              </Card>
            )}
            
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Tell us about yourself</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Your first name"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Your last name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="specialRequests">Special Requests (optional)</Label>
                    <Input 
                      id="specialRequests" 
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      placeholder="Allergies, accessibility requirements, etc."
                      className="h-20"
                    />
                  </div>
                  
                  <div className="flex justify-between gap-4 mt-4">
                    <Button variant="outline" onClick={handlePrevious} className="w-1/2">
                      Back
                    </Button>
                    <Button onClick={handleNext} className="w-1/2">
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <Card>
                  <CardHeader>
                    <CardTitle>Payment</CardTitle>
                    <CardDescription>Complete your booking securely</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Payment Method</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div 
                          className={`border rounded-lg p-4 cursor-pointer ${formData.paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : ''}`}
                          onClick={() => handleSelectChange('paymentMethod', 'card')}
                        >
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full border ${formData.paymentMethod === 'card' ? 'border-4 border-blue-500' : 'border-gray-300'}`}></div>
                            <h4 className="font-medium ml-2">Credit Card</h4>
                          </div>
                        </div>
                        
                        <div 
                          className={`border rounded-lg p-4 cursor-pointer ${formData.paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : ''}`}
                          onClick={() => handleSelectChange('paymentMethod', 'paypal')}
                        >
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full border ${formData.paymentMethod === 'paypal' ? 'border-4 border-blue-500' : 'border-gray-300'}`}></div>
                            <h4 className="font-medium ml-2">PayPal</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {formData.paymentMethod === 'card' && (
                      <>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input 
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input 
                              id="expiry"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC</Label>
                            <Input 
                              id="cvc"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    
                    <div className="border rounded-lg p-4 space-y-2 bg-gray-50">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Date</span>
                        </div>
                        <span>{formData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Time</span>
                        </div>
                        <span>{formData.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          <span>Guests</span>
                        </div>
                        <span>{formData.guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>Location</span>
                        </div>
                        <span>{itinerary.location}</span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Experience fee × {formData.guests}</span>
                        <span>${itinerary.price * Number(formData.guests)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Booking fee</span>
                        <span>$5.00</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t mt-2">
                        <span>Total</span>
                        <span>${itinerary.price * Number(formData.guests) + 5}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between gap-4 mt-4">
                      <Button type="button" variant="outline" onClick={handlePrevious} className="w-1/2">
                        Back
                      </Button>
                      <Button type="submit" className="w-1/2">
                        <CreditCard className="h-4 w-4 mr-2" /> Complete Booking
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            )}
            
            {step === 4 && (
              <Card className="text-center">
                <CardContent className="pt-10 pb-10">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for booking {itinerary.title}.<br />
                    A confirmation email has been sent to {formData.email}.
                  </p>
                  
                  <div className="max-w-md mx-auto border rounded-lg p-4 mb-6 text-left">
                    <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Date</span>
                        </div>
                        <span>{formData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Time</span>
                        </div>
                        <span>{formData.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          <span>Guests</span>
                        </div>
                        <span>{formData.guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>Location</span>
                        </div>
                        <span>{itinerary.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-x-4">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        navigate("/pro-dashboard/itinerary");
                      }}
                    >
                      Return to Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFlowPreview;
