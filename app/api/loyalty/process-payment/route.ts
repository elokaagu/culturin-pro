import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { loyaltyUtils } from "@/lib/supabase-utils";

export async function POST(request: NextRequest) {
  try {
    const { 
      cardId, 
      amount, 
      bookingId, 
      paymentType = "purchase",
      stablecoinType = "USDC" 
    } = await request.json();

    if (!cardId || !amount || amount <= 0) {
      return NextResponse.json(
        { error: "Valid card ID and amount are required" },
        { status: 400 }
      );
    }

    // Get current loyalty card
    const { data: cardData, error: cardError } = await supabase
      .from("loyalty_cards")
      .select("*")
      .eq("card_id", cardId)
      .single();

    if (cardError || !cardData) {
      return NextResponse.json(
        { error: "Loyalty card not found" },
        { status: 404 }
      );
    }

    // Validate payment based on type
    if (paymentType === "purchase") {
      if (cardData.balance < amount) {
        return NextResponse.json(
          { error: "Insufficient balance" },
          { status: 400 }
        );
      }
    }

    // Calculate rewards
    const rewardsEarned = loyaltyUtils.calculateRewards(amount, cardData.tier);

    // Update card balance and rewards
    const newBalance = paymentType === "purchase" 
      ? cardData.balance - amount 
      : cardData.balance + amount;
    
    const newRewardsBalance = paymentType === "reward"
      ? cardData.rewards_balance + rewardsEarned
      : cardData.rewards_balance;

    const { error: updateError } = await loyaltyUtils.updateLoyaltyCard(cardData.id, {
      balance: newBalance,
      rewards_balance: newRewardsBalance,
    });

    if (updateError) {
      console.error("Error updating loyalty card:", updateError);
      return NextResponse.json(
        { error: "Failed to update loyalty card" },
        { status: 500 }
      );
    }

    // Create transaction record
    const { error: transactionError } = await loyaltyUtils.createLoyaltyTransaction({
      card_id: cardData.id,
      booking_id: bookingId,
      amount: paymentType === "purchase" ? -amount : amount,
      type: paymentType,
      blockchain_tx_hash: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    });

    if (transactionError) {
      console.error("Error creating transaction:", transactionError);
      // Note: We don't fail here as the payment was successful
    }

    return NextResponse.json({
      success: true,
      newBalance,
      newRewardsBalance,
      rewardsEarned: paymentType === "purchase" ? rewardsEarned : 0,
      message: "Payment processed successfully",
    });
  } catch (error) {
    console.error("Error in process-payment API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 