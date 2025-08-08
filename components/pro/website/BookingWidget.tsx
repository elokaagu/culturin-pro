import React, { useState, useEffect, useCallback } from "react";
import { Itinerary } from "@/hooks/useItineraries";
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
import {
  Calendar,
  Clock,
  CreditCard,
  Users,
  Check,
  Globe,
  TrendingUp,
  AlertCircle,
  Loader2,
  Mail,
  Phone,
  MapPin,
  Wallet,
  Gift,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useUserData } from "../../../src/contexts/UserDataContext";

interface BookingWidgetProps {
  tour: Itinerary & {
    price?: number;
    currency?: string;
    groupSize?: { min: number; max: number };
  };
  primaryColor: string;
  companyName: string;
}

interface CurrencyRate {
  code: string;
  name: string;
  rate: number;
  symbol: string;
}

interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
}

const BookingWidget: React.FC<BookingWidgetProps> = ({
  tour,
  primaryColor,
  companyName,
}) => {
  const { userData } = useUserData();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState(2);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingReference, setBookingReference] = useState("");
  const [formData, setFormData] = useState<BookingData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("credit-card");
  const [loyaltyCardBalance, setLoyaltyCardBalance] = useState(1000); // Mock balance
  const [loyaltyCardRewards, setLoyaltyCardRewards] = useState(150); // Mock rewards

  // Generate available dates (next 30 days)
  const generateAvailableDates = useCallback(() => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  }, []);

  const availableDates = generateAvailableDates();
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
  const calculatePrice = useCallback(() => {
    const basePrice = tour.price || tour.days * 50;

    // Apply currency conversion
    const currencyRate =
      supportedCurrencies.find((c) => c.code === selectedCurrency)?.rate || 1;
    const finalPrice = basePrice * currencyRate;

    return Math.round(finalPrice * 100) / 100;
  }, [tour.price, tour.days, selectedCurrency, supportedCurrencies]);

  const getCurrencySymbol = (code: string) => {
    return supportedCurrencies.find((c) => c.code === code)?.symbol || "$";
  };

  const basePrice = tour.price || tour.days * 50;
  const totalPrice = calculatePrice() * guestCount;
  const serviceFee =
    5 *
    (supportedCurrencies.find((c) => c.code === selectedCurrency)?.rate || 1);
  const finalTotal = totalPrice + serviceFee;

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

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validateCardNumber = (cardNumber: string) => {
    const cleanNumber = cardNumber.replace(/\s/g, "");
    return cleanNumber.length >= 13 && cleanNumber.length <= 19;
  };

  const validateExpiry = (expiry: string) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(expiry)) return false;

    const [month, year] = expiry.split("/");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    const expYear = parseInt(year);
    const expMonth = parseInt(month);

    return (
      expYear > currentYear ||
      (expYear === currentYear && expMonth >= currentMonth)
    );
  };

  const validateCVC = (cvc: string) => {
    return cvc.length >= 3 && cvc.length <= 4;
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
    // Validate required fields
    if (!formData.firstName.trim()) {
      toast.error("First name is required");
      return;
    }
    if (!formData.lastName.trim()) {
      toast.error("Last name is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (formData.phone && !validatePhone(formData.phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setStep(4);
    window.scrollTo(0, 0);
  };

  const handleCompleteBooking = async () => {
    // Validate payment details based on selected method
    if (selectedPaymentMethod === "credit-card") {
      if (!formData.cardName.trim()) {
        toast.error("Card holder name is required");
        return;
      }
      if (!validateCardNumber(formData.cardNumber)) {
        toast.error("Please enter a valid card number");
        return;
      }
      if (!validateExpiry(formData.cardExpiry)) {
        toast.error("Please enter a valid expiry date (MM/YY)");
        return;
      }
      if (!validateCVC(formData.cardCVC)) {
        toast.error("Please enter a valid CVC");
        return;
      }
    } else if (selectedPaymentMethod === "loyalty-card") {
      if (loyaltyCardBalance < finalTotal) {
        toast.error("Insufficient loyalty card balance");
        return;
      }
    }

    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate booking reference
      const ref = `CULT-${Date.now().toString().slice(-6)}`;
      setBookingReference(ref);

      // Calculate rewards if using loyalty card
      let rewardsEarned = 0;
      if (selectedPaymentMethod === "loyalty-card") {
        rewardsEarned = finalTotal * 0.02; // 2% rewards rate
        setLoyaltyCardBalance((prev) => prev - finalTotal);
        setLoyaltyCardRewards((prev) => prev + rewardsEarned);
      }

      // Save booking to localStorage (in a real app, this would go to a database)
      const booking = {
        id: ref,
        tourId: tour.id,
        tourTitle: tour.title,
        date: selectedDate,
        time: selectedTime,
        guestCount,
        totalPrice: finalTotal,
        currency: selectedCurrency,
        paymentMethod: selectedPaymentMethod,
        rewardsEarned,
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          specialRequests: formData.specialRequests,
        },
        status: "confirmed",
        createdAt: new Date().toISOString(),
        companyName,
      };

      const existingBookings = JSON.parse(
        localStorage.getItem("culturin_bookings") || "[]"
      );
      existingBookings.push(booking);
      localStorage.setItem(
        "culturin_bookings",
        JSON.stringify(existingBookings)
      );

      toast.success("Payment processed successfully!");
      setStep(5);
      window.scrollTo(0, 0);
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToHome = () => {
    // Reset form and go back to step 1
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setGuestCount(2);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialRequests: "",
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCVC: "",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Currency Selector */}
      <div className="flex justify-end mb-4">
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
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">{tour.title}</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
              {tour.days} {tour.days === 1 ? "day" : "days"} experience
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>Hosted by {companyName}</span>
          </div>
        </div>
      </div>

      {/* Booking Progress */}
      {step < 5 && (
        <div className="mb-6">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {availableDates.slice(0, 12).map((date) => (
              <Card
                key={date}
                className={`cursor-pointer hover:shadow-md transition-all ${
                  selectedDate === date ? "border-2 border-blue-600" : ""
                }`}
                onClick={() => handleDateSelect(date)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <Calendar className="h-4 w-4 text-blue-600 mb-1" />
                    <h3 className="font-medium text-sm">{formatDate(date)}</h3>
                  </div>
                  <div className="text-blue-600 text-sm font-medium">Select</div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {availableTimes.map((time) => (
              <Card
                key={time}
                className={`cursor-pointer hover:shadow-md transition-all ${
                  selectedTime === time ? "border-2 border-blue-600" : ""
                }`}
                onClick={() => handleTimeSelect(time)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <Clock className="h-4 w-4 text-blue-600 mb-1" />
                    <h3 className="font-medium text-sm">{time}</h3>
                  </div>
                  <div className="text-blue-600 text-sm font-medium">Select</div>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
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
                    <Label htmlFor="lastName">Last Name *</Label>
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
                    <Label htmlFor="email">Email Address *</Label>
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
                  <div className="flex items-center gap-4">
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
                        className="mx-2 text-center w-20"
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
                    <span className="text-sm text-gray-500">
                      {guestCount} {guestCount === 1 ? "guest" : "guests"}
                    </span>
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
                {/* Payment Method Selection */}
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    Payment Method
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod("credit-card")}
                      className={`p-4 border rounded-lg text-left transition-all ${
                        selectedPaymentMethod === "credit-card"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="h-5 w-5" />
                        <span className="font-medium">Credit Card</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Pay with your credit or debit card
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod("loyalty-card")}
                      className={`p-4 border rounded-lg text-left transition-all ${
                        selectedPaymentMethod === "loyalty-card"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Gift className="h-5 w-5" />
                        <span className="font-medium">Loyalty Card</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Pay with your Culturin loyalty card
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        Balance: ${loyaltyCardBalance.toFixed(2)}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod("stablecoin")}
                      className={`p-4 border rounded-lg text-left transition-all ${
                        selectedPaymentMethod === "stablecoin"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Wallet className="h-5 w-5" />
                        <span className="font-medium">USDC/USDT</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Pay with stablecoins
                      </p>
                    </button>
                  </div>
                </div>

                {/* Payment Form based on selected method */}
                {selectedPaymentMethod === "credit-card" && (
                  <>
                    <div>
                      <Label htmlFor="cardName">Name on Card *</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleFormChange}
                        placeholder="Enter the name on your card"
                        defaultValue={`${formData.firstName} ${formData.lastName}`}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number *</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleFormChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardExpiry">Expiry Date *</Label>
                        <Input
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleFormChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardCVC">CVC *</Label>
                        <Input
                          id="cardCVC"
                          name="cardCVC"
                          value={formData.cardCVC}
                          onChange={handleFormChange}
                          placeholder="123"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedPaymentMethod === "loyalty-card" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-800 mb-2">
                      <Gift className="h-4 w-4" />
                      <span className="font-medium">Loyalty Card Payment</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Available Balance:</span>
                        <span className="font-medium">
                          ${loyaltyCardBalance.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Amount:</span>
                        <span className="font-medium">
                          ${finalTotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rewards Earned:</span>
                        <span className="font-medium text-green-600">
                          +${(finalTotal * 0.02).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Remaining Balance:</span>
                        <span className="font-medium">
                          ${(loyaltyCardBalance - finalTotal).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === "stablecoin" && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-purple-800 mb-2">
                      <Wallet className="h-4 w-4" />
                      <span className="font-medium">Stablecoin Payment</span>
                    </div>
                    <p className="text-sm text-purple-700">
                      Connect your wallet to pay with USDC or USDT. You'll be
                      redirected to your wallet for payment confirmation.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-3"
                      onClick={() => {
                        // In a real implementation, this would connect to MetaMask/Coinbase Wallet
                        toast.info("Connecting to your wallet...");
                      }}
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      Connect Wallet
                    </Button>
                  </div>
                )}

                <Button
                  onClick={handleCompleteBooking}
                  disabled={isProcessing}
                  style={{ backgroundColor: primaryColor }}
                  className="w-full md:w-auto"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      {selectedPaymentMethod === "credit-card" && (
                        <CreditCard className="mr-2 h-4 w-4" />
                      )}
                      {selectedPaymentMethod === "loyalty-card" && (
                        <Gift className="mr-2 h-4 w-4" />
                      )}
                      {selectedPaymentMethod === "stablecoin" && (
                        <Wallet className="mr-2 h-4 w-4" />
                      )}
                      Complete Booking
                    </>
                  )}
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
                        <span>
                          {getCurrencySymbol(selectedCurrency)}
                          {serviceFee.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-lg mt-3 pt-2 border-t">
                        <span>Total:</span>
                        <span>
                          {getCurrencySymbol(selectedCurrency)}
                          {finalTotal.toFixed(2)}
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
            <span className="font-medium">{formData.email}</span>.
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
                <p className="font-medium">{bookingReference}</p>
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
                  {finalTotal.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Currency</p>
                <p className="font-medium">{selectedCurrency}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleBackToHome}
              style={{ backgroundColor: primaryColor }}
            >
              Book Another Experience
            </Button>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Resend Confirmation
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingWidget;
