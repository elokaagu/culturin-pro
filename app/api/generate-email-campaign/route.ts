import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      culturalElements,
      location,
      duration,
      writingStyle,
      campaignType,
      offer,
    } = await request.json();

    // Validate required fields
    if (!title || !culturalElements || !location) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: title, culturalElements, and location are required",
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
    const prompt = `Write an engaging email campaign for a cultural experience with the following details:

Title: ${title}
Location: ${location}
Duration: ${duration || "Not specified"}
Cultural Elements: ${culturalElements}
Writing Style: ${writingStyle || "Engaging & Exciting"}
Campaign Type: ${campaignType || "Promotional"}
Special Offer: ${offer || "None"}

Please create an email campaign that includes:
- An attention-grabbing subject line
- A compelling opening that hooks the reader
- Clear value proposition for the cultural experience
- Engaging description of what makes this experience special
- Cultural significance and local traditions
- Practical details (duration, location, what's included)
- A strong call to action
- Professional email signature
- Uses a ${writingStyle?.toLowerCase() || "engaging and exciting"} tone
- Is approximately 300-500 words long
- Includes personal touches that make it feel authentic

Format the email with proper paragraphs and make it ready to send.`;

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
              "You are an expert email marketer specializing in cultural tourism. You create compelling email campaigns that inspire travelers to book authentic cultural experiences.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      return NextResponse.json(
        { error: "Failed to generate email campaign. Please try again." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedEmail = data.choices[0]?.message?.content?.trim();

    if (!generatedEmail) {
      return NextResponse.json(
        { error: "No email campaign generated. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ emailCampaign: generatedEmail });
  } catch (error) {
    console.error("Error generating email campaign:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
