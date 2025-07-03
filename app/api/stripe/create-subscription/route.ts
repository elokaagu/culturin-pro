import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { SUBSCRIPTION_PLANS } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const { priceId, customerId, planType } = await request.json();

    if (!priceId || !customerId || !planType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate plan type
    if (!(planType in SUBSCRIPTION_PLANS)) {
      return NextResponse.json({ error: "Invalid plan type" }, { status: 400 });
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: priceId,
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: (subscription.latest_invoice as any)?.payment_intent
        ?.client_secret,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
