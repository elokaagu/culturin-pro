import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { experienceType, keyHighlights, tone, platform, hashtags } =
      await request.json();

    // Validate required fields
    if (!experienceType || !keyHighlights) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: experienceType and keyHighlights are required",
        },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    // Create the prompt for ChatGPT
    const prompt = `Write an engaging social media caption for a cultural experience with the following details:

Experience Type: ${experienceType}
Key Highlights: ${keyHighlights}
Tone: ${tone || "Engaging"}
Platform: ${platform || "Instagram"}
Hashtags: ${hashtags || ""}

Please create a social media caption that:
- Is optimized for ${platform || "Instagram"} platform
- Uses a ${tone?.toLowerCase() || "engaging"} tone
- Highlights the unique cultural aspects
- Creates emotional connection and excitement
- Includes relevant hashtags naturally
- Is the appropriate length for ${platform || "Instagram"}
- Uses emojis strategically to enhance engagement
- Has a clear call to action
- Feels authentic and personal

Format the caption with proper line breaks and emojis for social media.`;

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an expert social media marketer specializing in cultural tourism. You create engaging, platform-optimized captions that drive engagement and inspire travelers to book authentic cultural experiences.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 300,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      return NextResponse.json(
        { error: "Failed to generate caption. Please try again." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedCaption = data.choices[0]?.message?.content?.trim();

    if (!generatedCaption) {
      return NextResponse.json(
        { error: "No caption generated. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ caption: generatedCaption });
  } catch (error) {
    console.error("Error generating caption:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
