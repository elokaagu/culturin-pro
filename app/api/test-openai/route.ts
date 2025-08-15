import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          status: "error", 
          message: "OpenAI API key not configured",
          details: "Check your .env.local file for OPENAI_API_KEY"
        },
        { status: 500 }
      );
    }

    // Validate API key format
    if (!process.env.OPENAI_API_KEY.startsWith('sk-')) {
      return NextResponse.json(
        { 
          status: "error", 
          message: "Invalid OpenAI API key format",
          details: "API key should start with 'sk-'"
        },
        { status: 500 }
      );
    }

    // Test the API key with a simple request
    try {
      const response = await fetch("https://api.openai.com/v1/models", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({
          status: "success",
          message: "OpenAI API key is valid and working",
          availableModels: data.data?.length || 0,
          apiKeyPrefix: process.env.OPENAI_API_KEY.substring(0, 10) + "..."
        });
      } else {
        const errorData = await response.json();
        return NextResponse.json({
          status: "error",
          message: "OpenAI API key validation failed",
          details: errorData.error?.message || "Unknown error",
          statusCode: response.status
        }, { status: 500 });
      }
    } catch (apiError) {
      return NextResponse.json({
        status: "error",
        message: "Failed to connect to OpenAI API",
        details: apiError instanceof Error ? apiError.message : "Unknown error"
      }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
