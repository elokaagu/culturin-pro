import { NextRequest, NextResponse } from "next/server";

// Fallback marketing copy generator
function generateFallbackMarketingCopy(
  experienceTitle: string,
  location: string,
  duration: string,
  price: string,
  keyDetails: string,
  assetType: string,
  templateStyle: string,
  colorTheme: string
) {
  const style = templateStyle?.toLowerCase() || "modern";
  const asset = assetType?.toLowerCase() || "social";

  let copyObj: any = {};

  if (asset.includes("social")) {
    copyObj = {
      headline: `Discover the Authentic Magic of ${location}`,
      subheadline: `Experience ${experienceTitle} - A ${duration} Cultural Journey`,
      description: `Immerse yourself in the rich traditions and local culture of ${location}. This ${duration} experience offers you the unique opportunity to ${keyDetails} in the most authentic way possible.`,
      cta: "Book Your Cultural Adventure Today",
      features: [
        "Expert local guides",
        "Small group experiences",
        "Authentic cultural immersion",
        "Hands-on activities",
        "Deep community connections",
      ],
    };
  } else if (asset.includes("email")) {
    copyObj = {
      subject: `Experience the Authentic Heart of ${location}`,
      headline: `Discover ${experienceTitle}`,
      subheadline: `A ${duration} Cultural Journey in ${location}`,
      body: `Ready to experience the authentic magic of ${location}? Our ${experienceTitle} experience offers you the unique opportunity to ${keyDetails} in the most authentic way possible.`,
      cta: "Book Your Spot Today",
      footer:
        "Don't miss this opportunity to connect with local culture and traditions.",
    };
  } else {
    copyObj = {
      headline: `Experience ${experienceTitle}`,
      subheadline: `${duration} Cultural Journey in ${location}`,
      description: `Discover the authentic heart of ${location} through our ${experienceTitle} experience. Immerse yourself in local culture and traditions like never before.`,
      cta: "Book Now",
      price: price || "Contact for pricing",
    };
  }

  return JSON.stringify(copyObj);
}

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

    if (assetType === "social-media") {
      systemPrompt =
        "You are an expert social media marketer specializing in cultural tourism. You create engaging, platform-optimized content that drives engagement and inspires travelers to book authentic cultural experiences.";
      prompt = `Create engaging social media marketing copy for a cultural experience with the following details:

Experience Title: ${experienceTitle}
Location: ${location}
Duration: ${duration}
Price: ${price || "Contact for pricing"}
Key Details: ${keyDetails}
Template Style: ${templateStyle || "Modern"}
Color Theme: ${colorTheme || "Warm"}

Please create marketing copy that includes:
- An attention-grabbing headline
- Compelling subheadline
- Engaging description (2-3 sentences)
- Clear value proposition
- Strong call to action
- 3-5 key features/benefits
- Uses a ${templateStyle?.toLowerCase() || "modern"} style
- Incorporates cultural authenticity and local connection
- Is optimized for social media engagement

Format as JSON with the following structure:
{
  "headline": "string",
  "subheadline": "string", 
  "description": "string",
  "cta": "string",
  "features": ["string", "string", "string"]
}`;
    } else if (assetType === "email") {
      systemPrompt =
        "You are an expert email marketer specializing in cultural tourism. You create compelling email content that inspires travelers to book authentic cultural experiences.";
      prompt = `Create engaging email marketing copy for a cultural experience with the following details:

Experience Title: ${experienceTitle}
Location: ${location}
Duration: ${duration}
Price: ${price || "Contact for pricing"}
Key Details: ${keyDetails}
Template Style: ${templateStyle || "Professional"}
Color Theme: ${colorTheme || "Warm"}

Please create email marketing copy that includes:
- An attention-grabbing subject line
- Compelling headline
- Engaging subheadline
- Body copy (3-4 sentences)
- Strong call to action
- Professional footer
- Uses a ${templateStyle?.toLowerCase() || "professional"} style
- Incorporates cultural authenticity and local connection

Format as JSON with the following structure:
{
  "subject": "string",
  "headline": "string",
  "subheadline": "string",
  "body": "string", 
  "cta": "string",
  "footer": "string"
}`;
    } else {
      systemPrompt =
        "You are an expert marketing copywriter specializing in cultural tourism. You create compelling marketing content that inspires travelers to book authentic cultural experiences.";
      prompt = `Create engaging marketing copy for a cultural experience with the following details:

Experience Title: ${experienceTitle}
Location: ${location}
Duration: ${duration}
Price: ${price || "Contact for pricing"}
Key Details: ${keyDetails}
Template Style: ${templateStyle || "Modern"}
Color Theme: ${colorTheme || "Warm"}

Please create marketing copy that includes:
- An attention-grabbing headline
- Compelling subheadline
- Engaging description (2-3 sentences)
- Clear value proposition
- Strong call to action
- Uses a ${templateStyle?.toLowerCase() || "modern"} style
- Incorporates cultural authenticity and local connection

Format as JSON with the following structure:
{
  "headline": "string",
  "subheadline": "string",
  "description": "string",
  "cta": "string",
  "price": "string"
}`;
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

      // Check if it's a quota error and provide fallback
      if (errorData.error?.code === "insufficient_quota") {
        console.log("OpenAI quota exceeded, using fallback content");
        const fallbackCopy = generateFallbackMarketingCopy(
          experienceTitle,
          location,
          duration,
          price,
          keyDetails,
          assetType,
          templateStyle,
          colorTheme
        );
        return NextResponse.json({
          marketingCopy: JSON.parse(fallbackCopy),
          note: "Generated using fallback content due to OpenAI quota limits",
        });
      }

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
