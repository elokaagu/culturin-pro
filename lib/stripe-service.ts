import { stripe } from "./stripe";
import { SUBSCRIPTION_PLANS, PlanType } from "./stripe";

export class StripeService {
  // Create or retrieve customer
  static async createCustomer(email: string, name: string) {
    try {
      // Check if customer already exists
      const existingCustomers = await stripe.customers.list({
        email: email,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        return existingCustomers.data[0];
      }

      // Create new customer
      const customer = await stripe.customers.create({
        email: email,
        name: name,
      });

      return customer;
    } catch (error) {
      console.error("Error creating customer:", error);
      throw error;
    }
  }

  // Create subscription
  static async createSubscription(customerId: string, planType: PlanType) {
    try {
      const plan = SUBSCRIPTION_PLANS[planType];

      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: plan.stripePriceId,
          },
        ],
        payment_behavior: "default_incomplete",
        payment_settings: { save_default_payment_method: "on_subscription" },
        expand: ["latest_invoice.payment_intent"],
      });

      return subscription;
    } catch (error) {
      console.error("Error creating subscription:", error);
      throw error;
    }
  }

  // Update subscription
  static async updateSubscription(
    subscriptionId: string,
    newPlanType: PlanType
  ) {
    try {
      const plan = SUBSCRIPTION_PLANS[newPlanType];
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      const updatedSubscription = await stripe.subscriptions.update(
        subscriptionId,
        {
          items: [
            {
              id: subscription.items.data[0].id,
              price: plan.stripePriceId,
            },
          ],
          proration_behavior: "create_prorations",
        }
      );

      return updatedSubscription;
    } catch (error) {
      console.error("Error updating subscription:", error);
      throw error;
    }
  }

  // Cancel subscription
  static async cancelSubscription(
    subscriptionId: string,
    cancelAtPeriodEnd: boolean = true
  ) {
    try {
      let subscription;

      if (cancelAtPeriodEnd) {
        subscription = await stripe.subscriptions.update(subscriptionId, {
          cancel_at_period_end: true,
        });
      } else {
        subscription = await stripe.subscriptions.cancel(subscriptionId);
      }

      return subscription;
    } catch (error) {
      console.error("Error canceling subscription:", error);
      throw error;
    }
  }

  // Get customer subscriptions
  static async getCustomerSubscriptions(customerId: string) {
    try {
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: "all",
        expand: ["data.default_payment_method"],
      });

      return subscriptions.data;
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      throw error;
    }
  }

  // Get customer invoices
  static async getCustomerInvoices(customerId: string, limit: number = 10) {
    try {
      const invoices = await stripe.invoices.list({
        customer: customerId,
        limit: limit,
      });

      return invoices.data;
    } catch (error) {
      console.error("Error fetching invoices:", error);
      throw error;
    }
  }

  // Get customer payment methods
  static async getCustomerPaymentMethods(customerId: string) {
    try {
      const paymentMethods = await stripe.paymentMethods.list({
        customer: customerId,
        type: "card",
      });

      return paymentMethods.data;
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      throw error;
    }
  }

  // Create payment intent for one-time payment
  static async createPaymentIntent(
    amount: number,
    currency: string = "usd",
    customerId?: string
  ) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Convert to cents
        currency: currency,
        customer: customerId,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return paymentIntent;
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw error;
    }
  }

  // Get subscription details with plan info
  static async getSubscriptionWithPlan(subscriptionId: string) {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
        expand: ["default_payment_method", "latest_invoice"],
      });

      // Find matching plan
      const planType = Object.entries(SUBSCRIPTION_PLANS).find(
        ([_, plan]) =>
          plan.stripePriceId === subscription.items.data[0].price.id
      )?.[0] as PlanType;

      return {
        subscription,
        planType,
        plan: planType ? SUBSCRIPTION_PLANS[planType] : null,
      };
    } catch (error) {
      console.error("Error fetching subscription details:", error);
      throw error;
    }
  }
}
