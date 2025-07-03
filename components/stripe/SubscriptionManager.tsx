"use client";

import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe-client";
import { SUBSCRIPTION_PLANS, PlanType } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Loader2 } from "lucide-react";
import { StripePaymentForm } from "./StripePaymentForm";
import { useStripeBilling } from "@/hooks/useStripe";
import { toast } from "sonner";

interface SubscriptionManagerProps {
  userEmail: string;
  userName: string;
  currentPlan?: PlanType;
}

export const SubscriptionManager: React.FC<SubscriptionManagerProps> = ({
  userEmail,
  userName,
  currentPlan,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [isCreatingSubscription, setIsCreatingSubscription] = useState(false);

  const {
    createCustomer,
    createSubscription,
    updateSubscription,
    cancelSubscription,
    loading,
  } = useStripeBilling();

  const handlePlanSelect = async (planType: PlanType) => {
    if (currentPlan === planType) {
      toast.info("You are already on this plan");
      return;
    }

    setSelectedPlan(planType);
    setIsCreatingSubscription(true);

    try {
      // Create or get customer
      let customerIdToUse = customerId;
      if (!customerIdToUse) {
        customerIdToUse = await createCustomer(userEmail, userName);
        setCustomerId(customerIdToUse);
      }

      // Create subscription
      const response = await fetch("/api/stripe/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: SUBSCRIPTION_PLANS[planType].stripePriceId,
          customerId: customerIdToUse,
          planType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setClientSecret(data.clientSecret);
    } catch (error: any) {
      console.error("Error setting up subscription:", error);
      toast.error(error.message || "Failed to set up subscription");
      setSelectedPlan(null);
    } finally {
      setIsCreatingSubscription(false);
    }
  };

  const handlePaymentSuccess = () => {
    setClientSecret(null);
    setSelectedPlan(null);
    toast.success("Subscription activated successfully!");
    // Refresh the page or update the UI
    window.location.reload();
  };

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error);
    setClientSecret(null);
    setSelectedPlan(null);
  };

  if (clientSecret) {
    return (
      <div className="max-w-md mx-auto">
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <StripePaymentForm
            clientSecret={clientSecret}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        </Elements>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
        <p className="text-gray-600">
          Select the plan that best fits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => {
          const planKey = key as PlanType;
          const isCurrentPlan = currentPlan === planKey;
          const isPopular = planKey === "growth";

          return (
            <Card
              key={planKey}
              className={`relative ${
                isCurrentPlan ? "border-blue-500 ring-2 ring-blue-200" : ""
              } ${isPopular ? "border-purple-500" : ""}`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription className="mt-2">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-gray-500">/month</span>
                    </CardDescription>
                  </div>
                  {isCurrentPlan && (
                    <Badge variant="secondary">Current Plan</Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(planKey)}
                  disabled={isCurrentPlan || isCreatingSubscription || loading}
                  className="w-full"
                  variant={isCurrentPlan ? "secondary" : "default"}
                >
                  {isCreatingSubscription && selectedPlan === planKey ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Setting up...
                    </>
                  ) : isCurrentPlan ? (
                    "Current Plan"
                  ) : currentPlan ? (
                    "Switch Plan"
                  ) : (
                    "Get Started"
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {currentPlan && (
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Need to cancel your subscription?
          </p>
          <Button
            variant="outline"
            onClick={() => {
              // This would typically open a confirmation dialog
              toast.info("Please contact support to cancel your subscription");
            }}
          >
            Cancel Subscription
          </Button>
        </div>
      )}
    </div>
  );
};
