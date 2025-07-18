"use client";

import React, { useState } from "react";
import { ItineraryType } from "@/data/itineraryData";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, CreditCard, Users, Check, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface BookingWidgetProps {
  tour: ItineraryType;
  primaryColor: string;
  companyName: string;
}

interface CurrencyRate {
  code: string;
  name: string;
  rate: number;
  symbol: string;
}

const BookingWidget: React.FC<BookingWidgetProps> = ({
  tour,
  primaryColor,
  companyName,
}) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState(2);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const availableDates = [
    "2025-05-20",
    "2025-05-21",
    "2025-05-22",
    "2025-05-23",
    "2025-05-24",
  ];

  const availableTimes = ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"];

  const supportedCurrencies: CurrencyRate[] = [
    { code: "USD", name: "US Dollar", rate: 1.0, symbol: "$" },
    { code: "EUR", name: "Euro", rate: 0.85, symbol: "€" },
    { code: "GBP", name: "British Pound", rate: 0.73, symbol: "£" },
    { code: "JPY", name: "Japanese Yen", rate: 110.0, symbol: "¥" },
    { code: "CAD", name: "Canadian Dollar", rate: 1.25, symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", rate: 1.35, symbol: "A$" },
    { code: "MXN", name: "Mexican Peso", rate: 20.0, symbol: "$" },
    { code: "BRL", name: "Brazilian Real", rate: 5.2, symbol: "R$" },
  ];

  // Simple price calculation
  const calculatePrice = () => {
    const basePrice = tour.days * 50;

    // Apply currency conversion
    const currencyRate =
      supportedCurrencies.find((c) => c.code === selectedCurrency)?.rate || 1;
    const finalPrice = basePrice * currencyRate;

    return Math.round(finalPrice * 100) / 100;
  };

  const getCurrencySymbol = (code: string) => {
    return supportedCurrencies.find((c) => c.code === code)?.symbol || "$";
  };

  const basePrice = tour.days * 50;
  const totalPrice = calculatePrice() * guestCount;

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(3);
    window.scrollTo(0, 0);
  };

  const handleGuestCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    if (count >= 1 && count <= 10) {
      setGuestCount(count);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitForm = () => {
    setStep(4);
    window.scrollTo(0, 0);
  };

  const handleCompleteBooking = () => {
    toast.success("Booking Confirmed!", {
      description: "Your experience has been booked successfully.",
    });
    setTimeout(() => {
      setStep(5);
      window.scrollTo(0, 0);
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Currency Selector */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-gray-500" />
          <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {supportedCurrencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code} - {currency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Booking Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">{tour.title}</h1>
        <p className="text-gray-600">
          {tour.days} {tour.days === 1 ? "day" : "days"} experience • Hosted by{" "}
          {companyName}
        </p>
      </div>

      {/* Booking Progress */}
      {step < 5 && (
        <div className="mb-8">
          <div className="flex items-center">
            {[
              { num: 1, label: "Date" },
              { num: 2, label: "Time" },
              { num: 3, label: "Details" },
              { num: 4, label: "Payment" },
            ].map((s) => (
              <div key={s.num} className="flex flex-1 items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= s.num
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > s.num ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span>{s.num}</span>
                  )}
                </div>
                <span
                  className={`ml-2 text-sm hidden sm:inline ${
                    step >= s.num
                      ? "text-blue-600 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {s.label}
                </span>
                {s.num < 4 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${
                      step > s.num ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Select Date */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Select a Date</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {availableDates.map((date) => (
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
                  <div className="text-blue-600">Select</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Select Time */}
      {step === 2 && selectedDate && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Select a Time</h2>
            <p className="text-gray-600">
              Date selected: {formatDate(selectedDate)}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {availableTimes.map((time) => (
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
                  <div className="text-blue-600">Select</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Guest Details */}
      {step === 3 && selectedDate && selectedTime && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Guest Details</h2>
            <p className="text-gray-600">
              {formatDate(selectedDate)} • {selectedTime}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
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
                      onClick={() =>
                        guestCount > 1 && setGuestCount(guestCount - 1)
                      }
                      className="px-3"
                    >
                      -
                    </Button>
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
                      onClick={() =>
                        guestCount < 10 && setGuestCount(guestCount + 1)
                      }
                      className="px-3"
                    >
                      +
                    </Button>
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

                <Button
                  onClick={handleSubmitForm}
                  style={{ backgroundColor: primaryColor }}
                  className="w-full md:w-auto"
                >
                  Continue to Payment
                </Button>
              </div>
            </div>

            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-4">Booking Summary</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">{tour.title}</p>
                      <p className="text-sm text-gray-600">
                        {tour.days} {tour.days === 1 ? "day" : "days"}{" "}
                        experience
                      </p>
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
                    <div className="flex justify-between">
                      <span className="font-medium">Currency:</span>
                      <span>{selectedCurrency}</span>
                    </div>

                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-medium">
                        <span>Price per person:</span>
                        <span>
                          {getCurrencySymbol(selectedCurrency)}
                          {calculatePrice().toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-lg mt-2">
                        <span>Total:</span>
                        <span>
                          {getCurrencySymbol(selectedCurrency)}
                          {totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Payment */}
      {step === 4 && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Payment</h2>
            <p className="text-gray-600">
              {formatDate(selectedDate || "")} • {selectedTime} • {guestCount}{" "}
              guests
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
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
                    <Input id="expiryDate" placeholder="MM/YY" required />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" required />
                  </div>
                </div>

                <Button
                  onClick={handleCompleteBooking}
                  style={{ backgroundColor: primaryColor }}
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
                    <div>
                      <p className="font-medium">{tour.title}</p>
                      <p className="text-sm text-gray-600">
                        {tour.days} {tour.days === 1 ? "day" : "days"}{" "}
                        experience
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Date:</span>
                      <span>{formatDate(selectedDate || "")}</span>
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
                        <span>
                          Experience ({guestCount} ×{" "}
                          {getCurrencySymbol(selectedCurrency)}
                          {calculatePrice().toFixed(2)}):
                        </span>
                        <span>
                          {getCurrencySymbol(selectedCurrency)}
                          {totalPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span>Service Fee:</span>
                        <span>{getCurrencySymbol(selectedCurrency)}5.00</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg mt-3 pt-2 border-t">
                        <span>Total:</span>
                        <span>
                          {getCurrencySymbol(selectedCurrency)}
                          {(
                            totalPrice +
                            5 *
                              supportedCurrencies.find(
                                (c) => c.code === selectedCurrency
                              )?.rate!
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Step 5: Confirmation */}
      {step === 5 && (
        <div className="text-center max-w-2xl mx-auto py-8">
          <div
            className="w-16 h-16 mx-auto flex items-center justify-center mb-6 rounded-full"
            style={{ backgroundColor: `${primaryColor}20` }}
          >
            <Check className="h-8 w-8" style={{ color: primaryColor }} />
          </div>
          <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-6">
            Thank you for your booking. We've sent confirmation details to{" "}
            {formData.email}.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="font-bold text-xl mb-4">Booking Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-gray-500">Experience</p>
                <p className="font-medium">{tour.title}</p>
              </div>
              <div>
                <p className="text-gray-500">Booking Reference</p>
                <p className="font-medium">
                  CULT-{Math.floor(Math.random() * 10000)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Date & Time</p>
                <p className="font-medium">
                  {selectedDate && formatDate(selectedDate)} • {selectedTime}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Number of Guests</p>
                <p className="font-medium">{guestCount} people</p>
              </div>
              <div>
                <p className="text-gray-500">Total Paid</p>
                <p className="font-medium">
                  {getCurrencySymbol(selectedCurrency)}
                  {(
                    totalPrice +
                    5 *
                      supportedCurrencies.find(
                        (c) => c.code === selectedCurrency
                      )?.rate!
                  ).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Currency</p>
                <p className="font-medium">{selectedCurrency}</p>
              </div>
            </div>
          </div>
          <Button style={{ backgroundColor: primaryColor }}>
            Back to Homepage
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookingWidget;
