"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useUserData } from "../../../src/contexts/UserDataContext";
import { toast } from "sonner";
import {
  CreditCard,
  DollarSign,
  Calendar,
  Users,
  Shield,
  FileText,
  Settings,
  Eye,
  CheckCircle,
} from "lucide-react";

const BookingFlowBuilder: React.FC = () => {
  const { userData, updateWebsiteSettings } = useUserData();
  const [previewMode, setPreviewMode] = useState(false);

  const bookingSettings = userData.websiteSettings.bookingSettings;

  const handleSettingUpdate = (key: string, value: any) => {
    updateWebsiteSettings({
      bookingSettings: {
        ...bookingSettings,
        [key]: value,
      },
    });
    toast.success("Booking setting updated");
  };

  const handleToggleBooking = (enabled: boolean) => {
    updateWebsiteSettings({ enableBooking: enabled });
    toast.success(enabled ? "Booking enabled" : "Booking disabled");
  };

  const currencies = [
    { value: "USD", label: "US Dollar ($)" },
    { value: "EUR", label: "Euro (€)" },
    { value: "GBP", label: "British Pound (£)" },
    { value: "CAD", label: "Canadian Dollar (C$)" },
    { value: "AUD", label: "Australian Dollar (A$)" },
  ];

  const paymentMethodOptions = [
    { id: "credit_card", label: "Credit/Debit Cards", icon: CreditCard },
    { id: "paypal", label: "PayPal", icon: DollarSign },
    { id: "bank_transfer", label: "Bank Transfer", icon: Shield },
  ];

  const BookingPreview = () => (
    <Card className="border-2 border-blue-200 bg-blue-50/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Booking Flow Preview
        </CardTitle>
        <CardDescription>
          This is how customers will see your booking process
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold mb-2">Step 1: Select Experience</h3>
          <div className="text-sm text-gray-600">
            Customer selects from your available experiences
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold mb-2">Step 2: Choose Date & Time</h3>
          <div className="text-sm text-gray-600">
            Interactive calendar with available slots
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold mb-2">Step 3: Guest Information</h3>
          <div className="text-sm text-gray-600">
            Contact details and special requirements
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold mb-2">Step 4: Payment</h3>
          <div className="flex gap-2 mb-2">
            {bookingSettings.paymentMethods.map((method) => {
              const option = paymentMethodOptions.find(
                (opt) => opt.id === method
              );
              return option ? (
                <Badge
                  key={method}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  <option.icon className="h-3 w-3" />
                  {option.label}
                </Badge>
              ) : null;
            })}
          </div>
          <div className="text-sm text-gray-600">
            {bookingSettings.requireDeposit
              ? `${bookingSettings.depositAmount}% deposit required`
              : "Full payment required"}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-semibold mb-2">Step 5: Confirmation</h3>
          <div className="text-sm text-gray-600">
            Booking confirmation with cancellation policy
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-medium">Booking Flow Settings</h2>
          <p className="text-sm text-gray-500">
            Configure how customers book your experiences
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={previewMode ? "default" : "outline"}
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? "Hide Preview" : "Show Preview"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Enable/Disable Booking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Booking Status
              </CardTitle>
              <CardDescription>
                Enable or disable online booking for your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label
                    htmlFor="enable-booking"
                    className="text-base font-medium"
                  >
                    Enable Online Booking
                  </Label>
                  <p className="text-sm text-gray-500">
                    Allow customers to book experiences directly from your
                    website
                  </p>
                </div>
                <Switch
                  id="enable-booking"
                  checked={userData.websiteSettings.enableBooking}
                  onCheckedChange={handleToggleBooking}
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Settings
              </CardTitle>
              <CardDescription>
                Configure payment methods and currency
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={bookingSettings.currency}
                  onValueChange={(value) =>
                    handleSettingUpdate("currency", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-medium">Payment Methods</Label>
                <p className="text-sm text-gray-500 mb-3">
                  Select which payment methods to accept
                </p>
                <div className="space-y-2">
                  {paymentMethodOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={option.id}
                        checked={bookingSettings.paymentMethods.includes(
                          option.id
                        )}
                        onCheckedChange={(checked) => {
                          const methods = checked
                            ? [...bookingSettings.paymentMethods, option.id]
                            : bookingSettings.paymentMethods.filter(
                                (m) => m !== option.id
                              );
                          handleSettingUpdate("paymentMethods", methods);
                        }}
                      />
                      <Label
                        htmlFor={option.id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <option.icon className="h-4 w-4" />
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label
                      htmlFor="require-deposit"
                      className="text-base font-medium"
                    >
                      Require Deposit
                    </Label>
                    <p className="text-sm text-gray-500">
                      Require partial payment upfront
                    </p>
                  </div>
                  <Switch
                    id="require-deposit"
                    checked={bookingSettings.requireDeposit}
                    onCheckedChange={(checked) =>
                      handleSettingUpdate("requireDeposit", checked)
                    }
                  />
                </div>

                {bookingSettings.requireDeposit && (
                  <div>
                    <Label htmlFor="deposit-amount">Deposit Percentage</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="deposit-amount"
                        type="number"
                        min="1"
                        max="100"
                        value={bookingSettings.depositAmount}
                        onChange={(e) =>
                          handleSettingUpdate(
                            "depositAmount",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-20"
                      />
                      <span className="text-sm text-gray-500">%</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Policies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Booking Policies
              </CardTitle>
              <CardDescription>
                Set cancellation policy and terms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cancellation-policy">Cancellation Policy</Label>
                <Textarea
                  id="cancellation-policy"
                  value={bookingSettings.cancellationPolicy}
                  onChange={(e) =>
                    handleSettingUpdate("cancellationPolicy", e.target.value)
                  }
                  placeholder="Describe your cancellation policy..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="terms-conditions">Terms & Conditions</Label>
                <Textarea
                  id="terms-conditions"
                  value={bookingSettings.termsAndConditions}
                  onChange={(e) =>
                    handleSettingUpdate("termsAndConditions", e.target.value)
                  }
                  placeholder="Enter your terms and conditions..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Column */}
        <div className="space-y-6">
          {previewMode && <BookingPreview />}

          {!userData.websiteSettings.enableBooking && (
            <Card className="border-orange-200 bg-orange-50/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <Shield className="h-5 w-5" />
                  Booking Disabled
                </CardTitle>
                <CardDescription className="text-orange-600">
                  Online booking is currently disabled. Enable it to start
                  accepting bookings.
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          {userData.websiteSettings.enableBooking && (
            <Card className="border-green-200 bg-green-50/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  Booking Active
                </CardTitle>
                <CardDescription className="text-green-600">
                  Your booking system is configured and ready to accept
                  reservations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Currency:</span>
                    <span className="font-medium">
                      {bookingSettings.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Methods:</span>
                    <span className="font-medium">
                      {bookingSettings.paymentMethods.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deposit Required:</span>
                    <span className="font-medium">
                      {bookingSettings.requireDeposit
                        ? `${bookingSettings.depositAmount}%`
                        : "No"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingFlowBuilder;
