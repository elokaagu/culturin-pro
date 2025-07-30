import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { searchParams } = new URL(request.url);
    const operatorId = searchParams.get("operatorId");

    if (!operatorId) {
      return NextResponse.json(
        { error: "Operator ID is required" },
        { status: 400 }
      );
    }

    // Get all cards for the operator
    const { data: cards, error: cardsError } = await supabase
      .from("cards")
      .select(
        `
        *,
        cardholder:users!cards_cardholder_id_fkey(
          id,
          full_name,
          email
        )
      `
      )
      .eq("operator_id", operatorId)
      .order("created_at", { ascending: false });

    if (cardsError) {
      console.error("Error fetching cards:", cardsError);
      return NextResponse.json(
        { error: "Failed to fetch cards" },
        { status: 500 }
      );
    }

    // Get transaction summaries for each card
    const cardsWithTransactions = await Promise.all(
      cards.map(async (card) => {
        const { data: transactions } = await supabase
          .from("card_transactions")
          .select("amount, status, created_at")
          .eq("card_id", card.id)
          .gte(
            "created_at",
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              1
            ).toISOString()
          );

        const spendThisMonth =
          transactions
            ?.filter((t) => t.status === "completed")
            ?.reduce((sum, t) => sum + parseFloat(t.amount.toString()), 0) || 0;

        return {
          ...card,
          spendThisMonth,
          cardholderName: card.cardholder?.full_name || "Unknown",
          cardholderEmail: card.cardholder?.email || "Unknown",
        };
      })
    );

    return NextResponse.json({
      success: true,
      cards: cardsWithTransactions,
    });
  } catch (error) {
    console.error("Error in get cards API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const body = await request.json();
    const { cardId, action, ...updateData } = body;

    if (!cardId || !action) {
      return NextResponse.json(
        { error: "Card ID and action are required" },
        { status: 400 }
      );
    }

    let updatePayload: any = {};

    switch (action) {
      case "freeze":
        updatePayload = { status: "frozen" };
        break;
      case "unfreeze":
        updatePayload = { status: "active" };
        break;
      case "cancel":
        updatePayload = { status: "cancelled" };
        break;
      case "update_limits":
        updatePayload = {
          monthly_limit: updateData.monthlyLimit,
          daily_limit: updateData.dailyLimit || null,
          weekly_limit: updateData.weeklyLimit || null,
        };
        break;
      case "update_categories":
        updatePayload = { blocked_categories: updateData.blockedCategories };
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    // In production, this would also call the issuing partner API
    // For now, we'll just update our database
    const { data: card, error: updateError } = await supabase
      .from("cards")
      .update(updatePayload)
      .eq("id", cardId)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating card:", updateError);
      return NextResponse.json(
        { error: "Failed to update card" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      card,
      message: `Card ${action.replace("_", " ")} successful`,
    });
  } catch (error) {
    console.error("Error in update card API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
