import { NextRequest, NextResponse } from "next/server";

// Fallback content generator
function generateFallbackDescription(
  title: string,
  culturalElements: string,
  location: string,
  duration: string,
  writingStyle: string
) {
  const style = writingStyle?.toLowerCase() || "engaging";

  let tone = "immersive and authentic";
  if (style.includes("casual")) tone = "friendly and approachable";
  if (style.includes("professional")) tone = "sophisticated and informative";
  if (style.includes("exciting")) tone = "thrilling and adventurous";

  return `Discover the authentic heart of ${location} through our ${title} experience. This ${duration} journey takes you deep into the local culture, where you'll experience ${culturalElements} firsthand.

Our expert local guides will share the rich traditions and stories that make this experience truly special. You'll have the opportunity to connect with local communities, learn about their customs, and create memories that will last a lifetime.

This isn't just a tour – it's an immersive cultural journey that will transform how you see and understand ${location}. Whether you're a seasoned traveler or new to cultural experiences, this adventure promises to be both educational and deeply moving.

Book your spot today and prepare to be amazed by the authentic beauty of local culture.`;
}

export async function POST(request: NextRequest) {
  try {
    const { title, culturalElements, location, duration, writingStyle } =
      await request.json();

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
    const prompt = `Write a compelling tour description for a cultural experience with the following details:

Title: ${title}
Location: ${location}
Duration: ${duration || "Not specified"}
Cultural Elements: ${culturalElements}
Writing Style: ${writingStyle || "Engaging & Exciting"}

Please create a description that:
- Highlights the unique cultural aspects and authenticity of the experience
- Creates emotional connection and excitement for potential travelers
- Emphasizes the immersive and educational nature of the experience
- Mentions the cultural significance and local traditions
- Uses vivid, descriptive language that paints a picture
- Is approximately 150-200 words long
- Focuses on what makes this experience special and memorable

Write the description in a ${
      writingStyle?.toLowerCase() || "engaging and exciting"
    } tone.`;

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
              "You are an expert travel writer specializing in cultural experiences. You create compelling, authentic descriptions that inspire travelers to book cultural tours and experiences.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);

      // Check if it's a quota error and provide fallback
      if (errorData.error?.code === "insufficient_quota") {
        console.log("OpenAI quota exceeded, using fallback content");
        const fallbackDescription = generateFallbackDescription(
          title,
          culturalElements,
          location,
          duration,
          writingStyle
        );
        return NextResponse.json({
          description: fallbackDescription,
          note: "Generated using fallback content due to OpenAI quota limits",
        });
      }

      return NextResponse.json(
        { error: "Failed to generate description. Please try again." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedDescription = data.choices[0]?.message?.content?.trim();

    if (!generatedDescription) {
      return NextResponse.json(
        { error: "No description generated. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ description: generatedDescription });
  } catch (error) {
    console.error("Error generating description:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
