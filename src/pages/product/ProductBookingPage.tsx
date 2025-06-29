'use client'

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "../../../lib/navigation";
import { Calendar, Clock, CreditCard, ShoppingCart, Check, ChevronRight, Users } from "lucide-react";
import NewFooter from "@/components/sections/NewFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const ProductBookingPage = () => {
  const [animateItems, setAnimateItems] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: ""
  });
  const { toast } = useToast();
  
  useEffect(() => {
    setAnimateItems(true);
  }, []);

  const experiences = [
    {
      id: "cooking-class",
      title: "Traditional Cooking Class",
      price: 65,
      image: "/lovable-uploads/ce237026-d67e-4a7a-b81a-868868b7676d.png",
      duration: "3 hours",
      description: "Learn authentic local recipes and cooking techniques with a local chef."
    },
    {
      id: "wine-tour",
      title: "Wine Tasting Tour",
      price: 85,
      image: "/lovable-uploads/6b9d2182-4ba4-43fa-b8ca-2a778431a9cb.png",
      duration: "4 hours",
      description: "Visit local vineyards and sample regional wines with expert guidance."
    },
    {
      id: "city-tour",
      title: "Cultural City Tour",
      price: 55,
      image: "/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png",
      duration: "2.5 hours",
      description: "Explore hidden cultural gems and historical landmarks in the city center."
    }
  ];

  const availableDates = [
    "2025-05-20",
    "2025-05-21", 
    "2025-05-22", 
    "2025-05-23", 
    "2025-05-24"
  ];

  const availableTimes = [
    "9:00 AM",
    "11:30 AM",
    "2:00 PM",
    "4:30 PM"
  ];

  const upsells = [
    {
      id: "photo",
      title: "Professional Photographer",
      price: 45,
      description: "Add a professional photographer to capture your experience"
    },
    {
      id: "transport",
      title: "Private Transportation",
      price: 35,
      description: "Door-to-door service from your accommodation"
    }
  ];

  const handleExperienceSelect = (id: string) => {
    setSelectedExperience(id);
    setActiveStep(2);
    window.scrollTo(0, 0);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setActiveStep(3);
    window.scrollTo(0, 0);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setActiveStep(4);
    window.scrollTo(0, 0);
  };

  const handleGuestCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    if (count >= 1 && count <= 10) {
      setGuestCount(count);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmitForm = () => {
    setActiveStep(5);
    window.scrollTo(0, 0);
  };

  const handleCompleteBooking = () => {
    toast({
      title: "Booking Confirmed!",
      description: "Your experience has been booked successfully.",
    });
    setTimeout(() => {
      setActiveStep(6);
      window.scrollTo(0, 0);
    }, 500);
  };

  const selectedExp = experiences.find(exp => exp.id === selectedExperience);
  const totalPrice = selectedExp ? selectedExp.price * guestCount : 0;

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Stepper component
  const Stepper = () => (
    <div className="mb-8">
      <ol className="flex items-center w-full">
        {[
          { step: 1, name: "Experience" },
          { step: 2, name: "Date" },
          { step: 3, name: "Time" },
          { step: 4, name: "Details" },
          { step: 5, name: "Payment" }
        ].map((item) => (
          <li key={item.step} className={`flex items-center ${item.step === 5 ? "" : "w-full"}`}>
            <div className={`flex items-center justify-center w-8 h-8 ${activeStep >= item.step ? "bg-blue-600" : "bg-gray-200"} rounded-full shrink-0`}>
              {activeStep > item.step ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <span className={`text-sm font-medium ${activeStep >= item.step ? "text-white" : "text-gray-500"}`}>{item.step}</span>
              )}
            </div>
            <span className={`ml-2 text-sm font-medium ${activeStep >= item.step ? "text-blue-600" : "text-gray-500"} hidden sm:inline-flex`}>
              {item.name}
            </span>
            {item.step !== 5 && (
              <div className={`flex-1 h-0.5 ${activeStep > item.step ? "bg-blue-600" : "bg-gray-200"} mx-2`}></div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header type="operator" />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {activeStep < 6 && <Stepper />}

          {/* Step 1: Choose Experience */}
          {activeStep === 1 && (
            <div>
              <h1 className="text-3xl font-bold mb-6">Choose Your Experience</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experiences.map((exp, index) => (
                  <Card 
                    key={exp.id}
                    className={`overflow-hidden transition-all duration-500 hover:shadow-lg cursor-pointer border-2 ${
                      animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{transitionDelay: `${index * 100}ms`}}
                    onClick={() => handleExperienceSelect(exp.id)}
                  >
                    <div className="h-48 relative">
                      <img 
                        src={exp.image} 
                        alt={exp.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-medium">
                        ${exp.price} / person
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                      <div className="flex items-center text-gray-600 mb-3">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{exp.duration}</span>
                      </div>
                      <p className="text-gray-600">{exp.description}</p>
                      <Button className="w-full mt-4">
                        Select Experience <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Date */}
          {activeStep === 2 && selectedExp && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-1">{selectedExp.title}</h2>
                <p className="text-gray-600">${selectedExp.price} per person • {selectedExp.duration}</p>
              </div>
              
              <h1 className="text-3xl font-bold mb-6">Select a Date</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {availableDates.map(date => (
                  <Card 
                    key={date}
                    className={`cursor-pointer hover:shadow-md transition-all ${
                      selectedDate === date ? "border-2 border-blue-600" : ""
                    }`}
                    onClick={() => handleDateSelect(date)}
                  >
                    <CardContent className="flex items-center justify-between p-5">
                      <div>
                        <Calendar className="h-5 w-5 text-blue-600 mb-2" />
                        <h3 className="font-medium">{formatDate(date)}</h3>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Select Time */}
          {activeStep === 3 && selectedExp && selectedDate && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-1">{selectedExp.title}</h2>
                <p className="text-gray-600">${selectedExp.price} per person • {formatDate(selectedDate)}</p>
              </div>
              
              <h1 className="text-3xl font-bold mb-6">Select a Time</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {availableTimes.map(time => (
                  <Card 
                    key={time}
                    className={`cursor-pointer hover:shadow-md transition-all ${
                      selectedTime === time ? "border-2 border-blue-600" : ""
                    }`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    <CardContent className="flex items-center justify-between p-5">
                      <div>
                        <Clock className="h-5 w-5 text-blue-600 mb-2" />
                        <h3 className="font-medium">{time}</h3>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Guest Details */}
          {activeStep === 4 && selectedExp && selectedDate && selectedTime && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-1">{selectedExp.title}</h2>
                <p className="text-gray-600">${selectedExp.price} per person • {formatDate(selectedDate)} • {selectedTime}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h1 className="text-3xl font-bold mb-6">Guest Details</h1>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          name="firstName" 
                          value={formData.firstName} 
                          onChange={handleFormChange} 
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          name="lastName" 
                          value={formData.lastName} 
                          onChange={handleFormChange} 
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email} 
                          onChange={handleFormChange} 
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleFormChange} 
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="guestCount">Number of Guests</Label>
                      <div className="flex">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => guestCount > 1 && setGuestCount(guestCount - 1)}
                          className="px-3"
                        >-</Button>
                        <Input 
                          id="guestCount" 
                          type="number" 
                          min="1" 
                          max="10"
                          value={guestCount} 
                          onChange={handleGuestCountChange}
                          className="mx-2 text-center"
                        />
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => guestCount < 10 && setGuestCount(guestCount + 1)}
                          className="px-3"
                        >+</Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="specialRequests">Special Requests</Label>
                      <Textarea 
                        id="specialRequests" 
                        name="specialRequests"
                        value={formData.specialRequests} 
                        onChange={handleFormChange} 
                        placeholder="Any dietary restrictions, accessibility needs, or other requests..."
                        rows={3}
                      />
                    </div>
                    
                    <Button onClick={handleSubmitForm} className="w-full md:w-auto">
                      Continue to Checkout
                    </Button>
                  </div>
                </div>
                
                <div className="md:col-span-1">
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-bold text-lg mb-4">Your Booking</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium">Experience:</span>
                          <span>{selectedExp.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Date:</span>
                          <span>{formatDate(selectedDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Time:</span>
                          <span>{selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Guests:</span>
                          <span>{guestCount}</span>
                        </div>
                        <div className="border-t pt-3 mt-3">
                          <div className="flex justify-between font-medium">
                            <span>Price per person:</span>
                            <span>${selectedExp.price.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-bold text-lg mt-2">
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Checkout */}
          {activeStep === 5 && selectedExp && selectedDate && selectedTime && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-1">{selectedExp.title}</h2>
                <p className="text-gray-600">${selectedExp.price} per person • {formatDate(selectedDate)} • {selectedTime}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h1 className="text-3xl font-bold mb-6">Payment Details</h1>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input 
                        id="cardName" 
                        placeholder="Enter the name on your card"
                        defaultValue={`${formData.firstName} ${formData.lastName}`}
                        required
                      />
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
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input 
                          id="expiryDate" 
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="font-bold mb-3">Enhance Your Experience</h3>
                      <div className="space-y-3">
                        {upsells.map(upsell => (
                          <Card key={upsell.id} className="overflow-hidden">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="font-medium">{upsell.title}</h4>
                                  <p className="text-sm text-gray-600">{upsell.description}</p>
                                </div>
                                <div className="flex items-center">
                                  <span className="mr-3 font-medium">${upsell.price}</span>
                                  <Button variant="outline" size="sm">Add</Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleCompleteBooking} 
                      className="w-full md:w-auto"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Complete Booking
                    </Button>
                  </div>
                </div>
                
                <div className="md:col-span-1">
                  <Card>
                    <CardContent className="p-5">
                      <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium">Experience:</span>
                          <span>{selectedExp.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Date:</span>
                          <span>{formatDate(selectedDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Time:</span>
                          <span>{selectedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <span className="font-medium mr-1">Guests:</span>
                            <Users className="h-4 w-4 inline" />
                          </div>
                          <span>{guestCount}</span>
                        </div>
                        <div className="border-t pt-3 mt-3">
                          <div className="flex justify-between">
                            <span>Experience ({guestCount} × ${selectedExp.price}):</span>
                            <span>${totalPrice.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between mt-2">
                            <span>Processing Fee:</span>
                            <span>$5.00</span>
                          </div>
                          <div className="flex justify-between font-bold text-lg mt-3 pt-2 border-t">
                            <span>Total:</span>
                            <span>${(totalPrice + 5).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Confirmation */}
          {activeStep === 6 && (
            <div className="text-center max-w-2xl mx-auto py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
              <p className="text-xl text-gray-600 mb-6">
                Thank you for your booking. We've sent confirmation details to {formData.email}.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="font-bold text-xl mb-4">Booking Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-gray-500">Experience</p>
                    <p className="font-medium">{selectedExp?.title}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Booking Reference</p>
                    <p className="font-medium">CULT-{Math.floor(Math.random() * 10000)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date & Time</p>
                    <p className="font-medium">{selectedDate && formatDate(selectedDate)} • {selectedTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Number of Guests</p>
                    <p className="font-medium">{guestCount} people</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link to="/product/booking">Browse More Experiences</Link>
                </Button>
                <Button>
                  <Link to="/">Return to Home</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <NewFooter />
    </div>
  );
};

export default ProductBookingPage;
