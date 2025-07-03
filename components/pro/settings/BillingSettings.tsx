"use client";

import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Download,
  ExternalLink,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { SubscriptionManager } from "@/components/stripe/SubscriptionManager";
import { useStripeBilling } from "@/hooks/useStripe";
import { SUBSCRIPTION_PLANS, PlanType } from "@/lib/stripe";

const BillingSettings: React.FC = () => {
  const [showSubscriptionManager, setShowSubscriptionManager] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { cancelSubscription } = useStripeBilling();

  // Mock user data - in real app, this would come from auth context
  const userData = {
    email: "eloka.agu@icloud.com",
    name: "Eloka Agu",
  };

  useEffect(() => {
    // Load subscription data
    loadSubscriptionData();
  }, []);

  const loadSubscriptionData = async () => {
    try {
      setLoading(true);
      // In a real app, you'd fetch this from your backend
      // For now, we'll use mock data
      setSubscriptionData({
        subscription: {
          id: "sub_mock",
          status: "active",
          planType: "growth" as PlanType,
          currentPeriodEnd: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days from now
          cancelAtPeriodEnd: false,
        },
        paymentMethods: [
          {
            id: "pm_mock",
            type: "Visa",
            last4: "4242",
            expiry: "05/28",
            isDefault: true,
          },
        ],
        invoices: [
          {
            id: "inv-001",
            date: "May 15, 2025",
            amount: "$99.00",
            status: "Paid",
            downloadUrl: "#",
          },
          {
            id: "inv-002",
            date: "April 15, 2025",
            amount: "$99.00",
            status: "Paid",
            downloadUrl: "#",
          },
        ],
      });
    } catch (error) {
      console.error("Error loading subscription data:", error);
      toast.error("Failed to load subscription data");
    } finally {
      setLoading(false);
    }
  };

  const handleUpgradePlan = () => {
    setShowSubscriptionManager(true);
  };

  const handleCancelSubscription = async () => {
    if (!subscriptionData?.subscription?.id) {
      toast.error("No active subscription found");
      return;
    }

    try {
      await cancelSubscription(subscriptionData.subscription.id, true);
      await loadSubscriptionData(); // Refresh data
    } catch (error) {
      console.error("Error canceling subscription:", error);
    }
  };

  const handleAddPaymentMethod = () => {
    toast.info("Payment method management coming soon");
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast.info(`Downloading invoice ${invoiceId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (showSubscriptionManager) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Subscription Management</h2>
          <Button
            variant="outline"
            onClick={() => setShowSubscriptionManager(false)}
          >
            Back to Billing
          </Button>
        </div>
        <SubscriptionManager
          userEmail={userData.email}
          userName={userData.name}
          currentPlan={subscriptionData?.subscription?.planType}
        />
      </div>
    );
  }

  const currentPlan = subscriptionData?.subscription?.planType
    ? SUBSCRIPTION_PLANS[subscriptionData.subscription.planType as PlanType]
    : null;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Billing & Subscription</h2>
        <p className="text-gray-500">
          Manage your subscription plan and payment methods.
        </p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your subscription details</CardDescription>
            </div>
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              {currentPlan?.name || "No Plan"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {currentPlan ? (
            <div className="grid gap-4">
              <div className="flex justify-between items-baseline">
                <div className="text-2xl font-semibold">
                  ${currentPlan.price}
                  <span className="text-sm text-gray-500">/month</span>
                </div>
                <div className="text-sm text-gray-500">
                  Next billing on{" "}
                  <span className="font-medium">
                    {new Date(
                      subscriptionData.subscription.currentPeriodEnd * 1000
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <Separator className="my-2" />

              <div>
                <h4 className="font-medium mb-2">Plan Features</h4>
                <ul className="grid gap-1">
                  {currentPlan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg mt-2">
                <h4 className="font-medium mb-1">Key Policies</h4>
                <ul className="grid gap-1">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    No commission on bookings
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Cancel anytime, no hidden fees
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No active subscription</p>
              <Button onClick={handleUpgradePlan}>Choose a Plan</Button>
            </div>
          )}
        </CardContent>
        {currentPlan && (
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCancelSubscription}>
              Cancel Subscription
            </Button>
            <Button onClick={handleUpgradePlan}>
              {subscriptionData?.subscription?.planType === "pro"
                ? "Manage Plan"
                : "Upgrade Plan"}
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Payment Methods */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Payment Methods</h3>
          <Button variant="outline" size="sm" onClick={handleAddPaymentMethod}>
            <CreditCard className="h-4 w-4 mr-2" />
            Add Payment Method
          </Button>
        </div>

        <div className="space-y-4">
          {subscriptionData?.paymentMethods?.map((method: any) => (
            <Card key={method.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-6 w-6" />
                    <div>
                      <p className="font-medium">
                        {method.type} •••• {method.last4}
                      </p>
                      <p className="text-sm text-gray-500">
                        Expires {method.expiry}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {method.isDefault && (
                      <Badge variant="secondary">Default</Badge>
                    )}
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Billing History</h3>

        <div className="rounded-md border">
          <div className="grid grid-cols-4 p-4 font-medium border-b">
            <div>Invoice</div>
            <div>Date</div>
            <div>Amount</div>
            <div className="text-right">Actions</div>
          </div>

          {subscriptionData?.invoices?.map((invoice: any) => (
            <div
              key={invoice.id}
              className="grid grid-cols-4 p-4 border-b last:border-0"
            >
              <div className="font-mono text-sm">{invoice.id}</div>
              <div>{invoice.date}</div>
              <div>{invoice.amount}</div>
              <div className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDownloadInvoice(invoice.id)}
                >
                  <Download className="h-4 w-4 mr-1" />
                  <span className="sr-only sm:not-sr-only sm:inline">
                    Download
                  </span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download All Invoices
          </Button>

          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Billing Portal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;
