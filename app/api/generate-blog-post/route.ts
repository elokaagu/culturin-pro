import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      culturalElements,
      location,
      duration,
      writingStyle,
      topic,
      targetKeywords,
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
    const prompt = `Write an engaging blog post about a cultural experience with the following details:

Title: ${title}
Location: ${location}
Duration: ${duration || "Not specified"}
Cultural Elements: ${culturalElements}
Writing Style: ${writingStyle || "Engaging & Exciting"}
Topic: ${topic || "Cultural Experience"}
Target Keywords: ${
      targetKeywords || "cultural experience, travel, local traditions"
    }

Please create a blog post that:
- Has an engaging headline that captures attention
- Includes an introduction that hooks the reader
- Describes the cultural experience in vivid detail
- Explains the cultural significance and local traditions
- Includes practical information for travelers
- Has a compelling conclusion with a call to action
- Is approximately 800-1200 words long
- Incorporates the target keywords naturally
- Uses a ${writingStyle?.toLowerCase() || "engaging and exciting"} tone
- Includes subheadings for better readability
- Provides valuable insights for cultural travelers

Format the blog post with proper paragraphs and subheadings.`;

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
              "You are an expert travel blogger specializing in cultural experiences. You create engaging, informative blog posts that inspire travelers to explore local cultures and traditions.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      return NextResponse.json(
        { error: "Failed to generate blog post. Please try again." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedBlogPost = data.choices[0]?.message?.content?.trim();

    if (!generatedBlogPost) {
      return NextResponse.json(
        { error: "No blog post generated. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ blogPost: generatedBlogPost });
  } catch (error) {
    console.error("Error generating blog post:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
