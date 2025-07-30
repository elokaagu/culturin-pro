import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { loyaltyUtils } from "@/lib/supabase-utils";

export async function POST(request: NextRequest) {
  try {
    const { userId, tier = "bronze" } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Generate unique card ID
    const cardId = `CULT-${Date.now().toString().slice(-8)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    // Get tier pricing
    const pricing = loyaltyUtils.getTierPricing(tier);

    // Create loyalty card
    const { data, error } = await loyaltyUtils.createLoyaltyCard({
      user_id: userId,
      card_id: cardId,
      tier,
      balance: 0,
      rewards_balance: 0,
      status: "pending",
      kyc_status: "pending",
      aml_check: "pending",
    });

    if (error) {
      console.error("Error creating loyalty card:", error);
      return NextResponse.json(
        { error: "Failed to create loyalty card" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      card: data,
      message: "Loyalty card created successfully",
    });
  } catch (error) {
    console.error("Error in create-card API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 