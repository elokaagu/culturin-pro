import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      experienceTitle,
      location,
      duration,
      price,
      keyDetails,
      assetType,
      templateStyle,
      colorTheme,
    } = await request.json();

    // Validate required fields
    if (!experienceTitle || !location || !duration) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: experienceTitle, location, and duration are required",
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

    // Create the prompt for ChatGPT based on asset type
    let prompt = "";
    let systemPrompt = "";

    switch (assetType) {
      case "info-card":
        systemPrompt =
          "You are an expert marketing copywriter specializing in cultural tourism. You create compelling, concise copy for information cards that highlight the unique value of cultural experiences.";
        prompt = `Create marketing copy for an information card with the following details:

Experience Title: ${experienceTitle}
Location: ${location}
Duration: ${duration}
Price: ${price || "Not specified"}
Key Details: ${keyDetails || "Not specified"}
Template Style: ${templateStyle || "Modern"}
Color Theme: ${colorTheme || "Blue Ocean"}

Please create:
1. A compelling headline (max 8 words)
2. A brief description (2-3 sentences)
3. Key highlights/bullet points (3-4 points)
4. A call-to-action phrase
5. Suggested hashtags (3-5 relevant tags)

Make the copy:
- Concise and impactful
- Highlight cultural authenticity
- Include practical details
- Use language that creates urgency/excitement
- Optimized for the ${templateStyle} style
- Suitable for ${colorTheme} color theme

Format the response as JSON with the following structure:
{
  "headline": "string",
  "description": "string", 
  "highlights": ["string", "string", "string"],
  "callToAction": "string",
  "hashtags": ["string", "string", "string"]
}`;
        break;

      case "flyer":
        systemPrompt =
          "You are an expert marketing copywriter specializing in cultural tourism. You create compelling flyer copy that drives bookings and highlights authentic cultural experiences.";
        prompt = `Create marketing copy for a promotional flyer with the following details:

Experience Title: ${experienceTitle}
Location: ${location}
Duration: ${duration}
Price: ${price || "Not specified"}
Key Details: ${keyDetails || "Not specified"}
Template Style: ${templateStyle || "Modern"}
Color Theme: ${colorTheme || "Blue Ocean"}

Please create:
1. An attention-grabbing headline
2. A compelling subheading
3. Key benefits (4-5 bullet points)
4. What's included section
5. A strong call-to-action
6. Contact/booking information
7. Social proof element

Make the copy:
- Persuasive and action-oriented
- Highlight unique cultural aspects
- Include specific details about the experience
- Create urgency and excitement
- Professional yet approachable
- Optimized for the ${templateStyle} style
- Suitable for ${colorTheme} color theme

Format the response as JSON with the following structure:
{
  "headline": "string",
  "subheading": "string",
  "benefits": ["string", "string", "string", "string"],
  "included": ["string", "string", "string"],
  "callToAction": "string",
  "contactInfo": "string",
  "socialProof": "string"
}`;
        break;

      case "social-graphics":
        systemPrompt =
          "You are an expert social media copywriter specializing in cultural tourism. You create engaging copy for social media graphics that drive engagement and bookings.";
        prompt = `Create marketing copy for social media graphics with the following details:

Experience Title: ${experienceTitle}
Location: ${location}
Duration: ${duration}
Price: ${price || "Not specified"}
Key Details: ${keyDetails || "Not specified"}
Template Style: ${templateStyle || "Modern"}
Color Theme: ${colorTheme || "Blue Ocean"}

Please create copy for different social media formats:
1. Instagram Post (caption + hashtags)
2. Instagram Story (short, punchy text)
3. Facebook Post (engaging description)

Make the copy:
- Platform-optimized for each format
- Include relevant emojis and hashtags
- Highlight cultural authenticity
- Create FOMO (fear of missing out)
- Include clear call-to-action
- Optimized for the ${templateStyle} style
- Suitable for ${colorTheme} color theme

Format the response as JSON with the following structure:
{
  "instagramPost": {
    "caption": "string",
    "hashtags": ["string", "string", "string"]
  },
  "instagramStory": {
    "text": "string",
    "hashtags": ["string", "string"]
  },
  "facebookPost": {
    "description": "string",
    "hashtags": ["string", "string", "string"]
  }
}`;
        break;

      default:
        return NextResponse.json(
          {
            error:
              "Invalid asset type. Supported types: info-card, flyer, social-graphics",
          },
          { status: 400 }
        );
    }

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
            content: systemPrompt,
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
        { error: "Failed to generate marketing copy. Please try again." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedContent = data.choices[0]?.message?.content?.trim();

    if (!generatedContent) {
      return NextResponse.json(
        { error: "No marketing copy generated. Please try again." },
        { status: 500 }
      );
    }

    // Try to parse the JSON response
    try {
      const parsedContent = JSON.parse(generatedContent);
      return NextResponse.json({ marketingCopy: parsedContent });
    } catch (error) {
      // If JSON parsing fails, return the raw content
      return NextResponse.json({ marketingCopy: generatedContent });
    }
  } catch (error) {
    console.error("Error generating marketing copy:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
