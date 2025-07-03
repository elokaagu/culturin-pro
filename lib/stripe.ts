import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

// Subscription plans configuration
export const SUBSCRIPTION_PLANS = {
  starter: {
    name: "Starter Plan",
    price: 29,
    stripePriceId: process.env.STRIPE_STARTER_PRICE_ID || "price_starter",
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
    stripePriceId: process.env.STRIPE_GROWTH_PRICE_ID || "price_growth",
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
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID || "price_pro",
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
} as const;

export type PlanType = keyof typeof SUBSCRIPTION_PLANS;
