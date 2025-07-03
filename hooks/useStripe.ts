import { useState, useEffect } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { PlanType } from "@/lib/stripe";

interface SubscriptionData {
  id: string;
  status: string;
  planType: PlanType;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
}

interface BillingData {
  subscription: SubscriptionData | null;
  paymentMethods: any[];
  invoices: any[];
  loading: boolean;
  error: string | null;
}

export const useStripeBilling = (customerId?: string) => {
  const [billingData, setBillingData] = useState<BillingData>({
    subscription: null,
    paymentMethods: [],
    invoices: [],
    loading: false,
    error: null,
  });

  const stripe = useStripe();
  const elements = useElements();

  // Create customer
  const createCustomer = async (email: string, name: string) => {
    try {
      const response = await fetch("/api/stripe/create-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      return data.customerId;
    } catch (error) {
      console.error("Error creating customer:", error);
      throw error;
    }
  };

  // Create subscription
  const createSubscription = async (planType: PlanType, customerId: string) => {
    try {
      setBillingData((prev) => ({ ...prev, loading: true, error: null }));

      const response = await fetch("/api/stripe/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: planType,
          customerId,
          planType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      // Confirm payment if needed
      if (data.clientSecret && stripe) {
        const { error } = await stripe.confirmPayment({
          elements: elements!,
          clientSecret: data.clientSecret,
          confirmParams: {
            return_url: `${window.location.origin}/pro-dashboard/settings?tab=billing`,
          },
        });

        if (error) {
          throw error;
        }
      }

      toast.success("Subscription created successfully!");
      return data.subscriptionId;
    } catch (error: any) {
      console.error("Error creating subscription:", error);
      setBillingData((prev) => ({ ...prev, error: error.message }));
      toast.error(error.message || "Failed to create subscription");
      throw error;
    } finally {
      setBillingData((prev) => ({ ...prev, loading: false }));
    }
  };

  // Update subscription
  const updateSubscription = async (
    subscriptionId: string,
    newPlanType: PlanType
  ) => {
    try {
      setBillingData((prev) => ({ ...prev, loading: true, error: null }));

      const response = await fetch("/api/stripe/update-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionId,
          newPriceId: newPlanType,
          planType: newPlanType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      toast.success("Subscription updated successfully!");
      return data;
    } catch (error: any) {
      console.error("Error updating subscription:", error);
      setBillingData((prev) => ({ ...prev, error: error.message }));
      toast.error(error.message || "Failed to update subscription");
      throw error;
    } finally {
      setBillingData((prev) => ({ ...prev, loading: false }));
    }
  };

  // Cancel subscription
  const cancelSubscription = async (
    subscriptionId: string,
    cancelAtPeriodEnd: boolean = true
  ) => {
    try {
      setBillingData((prev) => ({ ...prev, loading: true, error: null }));

      const response = await fetch("/api/stripe/cancel-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionId,
          cancelAtPeriodEnd,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      toast.success(
        cancelAtPeriodEnd
          ? "Subscription will be canceled at the end of the billing period"
          : "Subscription canceled immediately"
      );
      return data;
    } catch (error: any) {
      console.error("Error canceling subscription:", error);
      setBillingData((prev) => ({ ...prev, error: error.message }));
      toast.error(error.message || "Failed to cancel subscription");
      throw error;
    } finally {
      setBillingData((prev) => ({ ...prev, loading: false }));
    }
  };

  return {
    ...billingData,
    createCustomer,
    createSubscription,
    updateSubscription,
    cancelSubscription,
  };
};
