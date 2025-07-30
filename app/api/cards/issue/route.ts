import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      cardType,
      cardholderId,
      spendingLimit,
      dailyLimit,
      weeklyLimit,
      blockedCategories,
      operatorId,
    } = body;

    // Validate required fields
    if (!cardType || !cardholderId || !spendingLimit || !operatorId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate a unique card token (in production, this would come from the issuing partner)
    const cardToken = `card_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // In production, this would be an API call to Rain XYZ or Stripe Issuing
    // For now, we'll simulate the card creation
    const mockIssuingResponse = {
      cardId: cardToken,
      cardNumber: cardType === "virtual" ? null : "**** **** **** 1234",
      expiryDate: "12/25",
      cvv: cardType === "virtual" ? "123" : null,
      status: "active",
    };

    // Insert card into database
    const { data: card, error: cardError } = await supabase
      .from("cards")
      .insert({
        operator_id: operatorId,
        cardholder_id: cardholderId,
        card_token: cardToken,
        card_type: cardType,
        status: cardType === "virtual" ? "active" : "shipped",
        monthly_limit: spendingLimit,
        daily_limit: dailyLimit || null,
        weekly_limit: weeklyLimit || null,
        current_balance: 0.0,
        blocked_categories: blockedCategories || [],
        funding_source: "culturin-wallet",
      })
      .select()
      .single();

    if (cardError) {
      console.error("Error creating card:", cardError);
      return NextResponse.json(
        { error: "Failed to create card" },
        { status: 500 }
      );
    }

    // Return the card details
    return NextResponse.json({
      success: true,
      card: {
        id: card.id,
        cardToken: card.card_token,
        cardType: card.card_type,
        status: card.status,
        limits: {
          monthly: card.monthly_limit,
          daily: card.daily_limit,
          weekly: card.weekly_limit,
        },
        // For virtual cards, return the card details for immediate use
        ...(cardType === "virtual" && {
          cardNumber: "**** **** **** 1234",
          expiryDate: "12/25",
          cvv: "123",
        }),
      },
      message:
        cardType === "virtual"
          ? "Virtual card created successfully"
          : "Physical card ordered successfully",
    });
  } catch (error) {
    console.error("Error in issue card API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
