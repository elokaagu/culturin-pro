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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Wallet,
  Settings,
  Calendar,
  Users,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface PaymentProvider {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  isConnected: boolean;
  isRecommended?: boolean;
}

const BookingFlowBuilder: React.FC = () => {
  const [paymentProviders] = useState<PaymentProvider[]>([
    {
      id: "stripe",
      name: "Stripe",
      description: "Accept credit cards and digital wallets worldwide",
      icon: <CreditCard className="h-5 w-5" />,
      isConnected: true,
      isRecommended: true,
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "Trusted payment method for international travelers",
      icon: <Wallet className="h-5 w-5" />,
      isConnected: false,
    },
    {
      id: "crypto",
      name: "Crypto Payments",
      description: "Accept USDC, USDT, and other cryptocurrencies",
      icon: <Wallet className="h-5 w-5" />,
      isConnected: false,
    },
  ]);

  const [bookingSettings, setBookingSettings] = useState({
    requireDeposit: true,
    depositPercentage: 25,
    allowCancellations: true,
    cancellationDays: 7,
    maxGroupSize: 12,
    requireContactInfo: true,
    sendConfirmationEmail: true,
    sendReminderEmail: true,
  });

  const handleSettingChange = (key: string, value: any) => {
    setBookingSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    toast.success("Setting updated");
  };

  const handleConnectProvider = (providerId: string) => {
    // Simulate connection process
    toast.success("Payment provider connected successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Booking Flow Configuration
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Configure your booking process, payment methods, and customer
          experience settings.
        </p>
      </div>

      {/* Payment Providers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Providers
          </CardTitle>
          <CardDescription>
            Connect payment methods to accept bookings and payments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentProviders.map((provider) => (
            <div
              key={provider.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {provider.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{provider.name}</h3>
                    {provider.isRecommended && (
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        Recommended
                      </Badge>
                    )}
                    {provider.isConnected && (
                      <Badge className="bg-blue-100 text-blue-700 text-xs">
                        Connected
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {provider.description}
                  </p>
                </div>
              </div>
              <Button
                variant={provider.isConnected ? "outline" : "default"}
                size="sm"
                onClick={() => handleConnectProvider(provider.id)}
              >
                {provider.isConnected ? "Connected" : "Connect"}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Booking Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Payment Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Require Deposit</Label>
                <p className="text-xs text-gray-500">
                  Collect partial payment upfront
                </p>
              </div>
              <Switch
                checked={bookingSettings.requireDeposit}
                onCheckedChange={(checked) =>
                  handleSettingChange("requireDeposit", checked)
                }
              />
            </div>

            {bookingSettings.requireDeposit && (
              <div className="space-y-2">
                <Label htmlFor="depositPercentage">Deposit Percentage</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="depositPercentage"
                    type="number"
                    value={bookingSettings.depositPercentage}
                    onChange={(e) =>
                      handleSettingChange(
                        "depositPercentage",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-20"
                    min="0"
                    max="100"
                  />
                  <span className="text-sm text-gray-500">%</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cancellation Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Cancellation Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">
                  Allow Cancellations
                </Label>
                <p className="text-xs text-gray-500">
                  Let customers cancel bookings
                </p>
              </div>
              <Switch
                checked={bookingSettings.allowCancellations}
                onCheckedChange={(checked) =>
                  handleSettingChange("allowCancellations", checked)
                }
              />
            </div>

            {bookingSettings.allowCancellations && (
              <div className="space-y-2">
                <Label htmlFor="cancellationDays">Cancellation Window</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="cancellationDays"
                    type="number"
                    value={bookingSettings.cancellationDays}
                    onChange={(e) =>
                      handleSettingChange(
                        "cancellationDays",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-20"
                    min="0"
                  />
                  <span className="text-sm text-gray-500">
                    days before tour
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Group Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Group Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxGroupSize">Maximum Group Size</Label>
              <Input
                id="maxGroupSize"
                type="number"
                value={bookingSettings.maxGroupSize}
                onChange={(e) =>
                  handleSettingChange("maxGroupSize", parseInt(e.target.value))
                }
                min="1"
                max="50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Communication Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Communication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">
                  Require Contact Info
                </Label>
                <p className="text-xs text-gray-500">Collect phone and email</p>
              </div>
              <Switch
                checked={bookingSettings.requireContactInfo}
                onCheckedChange={(checked) =>
                  handleSettingChange("requireContactInfo", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">
                  Send Confirmation Email
                </Label>
                <p className="text-xs text-gray-500">
                  Auto-send booking confirmations
                </p>
              </div>
              <Switch
                checked={bookingSettings.sendConfirmationEmail}
                onCheckedChange={(checked) =>
                  handleSettingChange("sendConfirmationEmail", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">
                  Send Reminder Email
                </Label>
                <p className="text-xs text-gray-500">
                  Remind customers before tour
                </p>
              </div>
              <Switch
                checked={bookingSettings.sendReminderEmail}
                onCheckedChange={(checked) =>
                  handleSettingChange("sendReminderEmail", checked)
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-culturin-indigo hover:bg-culturin-indigo/90">
          <CheckCircle className="mr-2 h-4 w-4" />
          Save Booking Settings
        </Button>
      </div>
    </div>
  );
};

export default BookingFlowBuilder;
