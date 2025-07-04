"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  CreditCard,
  Download,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

const BillingSettings = () => {
  const [currentPlan, setCurrentPlan] = useState("growth");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock subscription data
  const subscriptionData = {
    id: "sub_1234567890",
    status: "active",
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    cancelAtPeriodEnd: false,
  };

  const plans = {
    starter: {
      name: "Starter Plan",
      price: 29,
      features: [
        "Basic Booking Tools",
        "Up to 50 bookings/month",
        "Email Support",
        "Basic Analytics",
        "Website Builder",
      ],
    },
    growth: {
      name: "Growth Plan",
      price: 99,
      features: [
        "Advanced Booking Tools",
        "Unlimited bookings",
        "Full CRM functionality",
        "Comprehensive Analytics",
        "Website Builder",
        "Team Management (up to 3 members)",
        "Priority Support",
      ],
    },
    pro: {
      name: "Pro Plan",
      price: 199,
      features: [
        "Everything in Growth",
        "Unlimited team members",
        "API access",
        "Data exports",
        "Multi-language support",
        "Onboarding concierge",
        "White-label options",
      ],
    },
  };

  const handlePlanChange = async (newPlan: string) => {
    // Billing functionality disabled
    toast({
      title: "Billing Disabled",
      description:
        "Billing functionality is temporarily disabled. Please contact support for plan changes.",
      variant: "default",
    });
    setPlanDialogOpen(false);
  };

  const handleCancelSubscription = async () => {
    // Billing functionality disabled
    toast({
      title: "Billing Disabled",
      description:
        "Billing functionality is temporarily disabled. Please contact support to cancel.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Billing & Subscription</h2>
        <p className="text-gray-600">
          Manage your subscription and billing information
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">
                {plans[currentPlan]?.name}
              </h3>
              <p className="text-gray-600">
                ${plans[currentPlan]?.price}/
                {billingCycle === "monthly" ? "month" : "year"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <p>
              Next billing date:{" "}
              {subscriptionData.currentPeriodEnd.toLocaleDateString()}
            </p>
            {subscriptionData.cancelAtPeriodEnd && (
              <p className="text-amber-600 mt-1">
                <AlertCircle className="h-4 w-4 inline mr-1" />
                Your subscription will be cancelled at the end of the current
                period.
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Dialog open={planDialogOpen} onOpenChange={setPlanDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Change Plan</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Choose Your Plan</DialogTitle>
                  <DialogDescription>
                    Select the plan that best fits your needs. Billing
                    functionality is currently disabled.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {Object.entries(plans).map(([key, plan]) => (
                    <Card
                      key={key}
                      className={`cursor-pointer transition-colors ${
                        currentPlan === key
                          ? "border-blue-500 bg-blue-50"
                          : "hover:border-gray-300"
                      }`}
                      onClick={() => handlePlanChange(key)}
                    >
                      <CardContent className="p-6">
                        <div className="text-center mb-4">
                          <h3 className="text-lg font-semibold">{plan.name}</h3>
                          <div className="text-3xl font-bold text-blue-600">
                            ${plan.price}
                          </div>
                          <p className="text-gray-600">per month</p>
                        </div>
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center text-sm"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        {currentPlan === key && (
                          <Badge className="w-full mt-4 justify-center">
                            Current Plan
                          </Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-200"
                >
                  Cancel Subscription
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
                  <AlertDialogDescription>
                    Billing functionality is currently disabled. Please contact
                    support to cancel your subscription.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancelSubscription}>
                    Contact Support
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8 text-gray-500">
            <CreditCard className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>Billing functionality is temporarily disabled</p>
            <p className="text-sm">Contact support for billing inquiries</p>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No billing history available</p>
            <p className="text-sm">
              Billing functionality is temporarily disabled
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSettings;
