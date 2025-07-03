import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { SUBSCRIPTION_PLANS } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const { subscriptionId, newPriceId, planType } = await request.json();

    if (!subscriptionId || !newPriceId || !planType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate plan type
    if (!(planType in SUBSCRIPTION_PLANS)) {
      return NextResponse.json({ error: "Invalid plan type" }, { status: 400 });
    }

    // Get current subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    // Update subscription
    const updatedSubscription = await stripe.subscriptions.update(
      subscriptionId,
      {
        items: [
          {
            id: subscription.items.data[0].id,
            price: newPriceId,
          },
        ],
        proration_behavior: "create_prorations",
      }
    );

    return NextResponse.json({
      subscriptionId: updatedSubscription.id,
      status: updatedSubscription.status,
      currentPeriodEnd: updatedSubscription.current_period_end,
    });
  } catch (error) {
    console.error("Error updating subscription:", error);
    return NextResponse.json(
      { error: "Failed to update subscription" },
      { status: 500 }
    );
  }
}
