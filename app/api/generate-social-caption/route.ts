import { NextRequest, NextResponse } from "next/server";

// Fallback social media caption generator
function generateFallbackSocialCaption(
  experienceType: string,
  keyHighlights: string,
  tone: string,
  platform: string,
  hashtags: string
) {
  const style = tone?.toLowerCase() || "engaging";
  const socialPlatform = platform?.toLowerCase() || "instagram";

  let caption = "";

  if (socialPlatform.includes("instagram")) {
    caption = `🌟 Discover the authentic magic of ${experienceType}! 

✨ Experience ${keyHighlights} like never before

🌍 Immerse yourself in local culture and traditions
👥 Connect with amazing local communities
📸 Create memories that will last a lifetime

Ready for an adventure that will transform how you see the world? 🌟

#CulturalExperience #LocalCulture #AuthenticTravel #CulturalTourism #TravelInspiration #LocalTraditions #CulturalImmersion #TravelGoals #CulturalHeritage #AuthenticExperience ${hashtags}`;
  } else if (socialPlatform.includes("facebook")) {
    caption = `Ready to experience the authentic heart of local culture? 

Our ${experienceType} experience offers you the unique opportunity to ${keyHighlights} in the most authentic way possible.

Join us for an immersive journey that will connect you with local communities and traditions like never before. This isn't just a tour – it's a transformative cultural experience that will stay with you forever.

Book your spot today and prepare to be amazed by the rich cultural heritage that awaits you!

#CulturalExperience #LocalCulture #AuthenticTravel #CulturalTourism #TravelInspiration #LocalTraditions #CulturalImmersion #TravelGoals #CulturalHeritage #AuthenticExperience ${hashtags}`;
  } else {
    caption = `Discover the authentic magic of ${experienceType}! Experience ${keyHighlights} and immerse yourself in local culture. Ready for an adventure that will transform how you see the world? Book your spot today! #CulturalExperience #LocalCulture #AuthenticTravel ${hashtags}`;
  }

  return caption;
}

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

      // Check if it's a quota error and provide fallback
      if (errorData.error?.code === "insufficient_quota") {
        console.log("OpenAI quota exceeded, using fallback content");
        const fallbackCaption = generateFallbackSocialCaption(
          experienceType,
          keyHighlights,
          tone,
          platform,
          hashtags
        );
        return NextResponse.json({
          caption: fallbackCaption,
          note: "Generated using fallback content due to OpenAI quota limits",
        });
      }

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
