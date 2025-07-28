import { NextRequest, NextResponse } from "next/server";

// Fallback blog post generator
function generateFallbackBlogPost(
  title: string,
  culturalElements: string,
  location: string,
  duration: string,
  writingStyle: string,
  topic: string,
  targetKeywords: string
) {
  const style = writingStyle?.toLowerCase() || "engaging";

  let tone = "immersive and authentic";
  if (style.includes("casual")) tone = "friendly and approachable";
  if (style.includes("professional")) tone = "sophisticated and informative";
  if (style.includes("exciting")) tone = "thrilling and adventurous";

  return `# Discover the Magic of ${location}: An Authentic Cultural Experience

## Introduction

Are you ready to embark on a journey that will transform how you see the world? Our ${title} experience in ${location} offers travelers an unprecedented opportunity to dive deep into local culture and traditions.

## What Makes This Experience Special

This ${duration} adventure isn't your typical tourist experience. Instead, it's a carefully crafted journey that allows you to experience ${culturalElements} in their most authentic form. Our local guides, who are deeply connected to their cultural heritage, will share stories and traditions that have been passed down through generations.

## The Cultural Immersion

When you join our ${title} experience, you're not just observing – you're participating. You'll have the unique opportunity to:

- Connect with local communities on a personal level
- Learn about traditional customs and practices
- Experience cultural activities firsthand
- Understand the historical significance of local traditions
- Create meaningful connections with local artisans and storytellers

## Why Cultural Tourism Matters

Cultural tourism isn't just about seeing new places – it's about understanding different ways of life. When you choose experiences like our ${title}, you're supporting local communities and helping preserve cultural traditions for future generations.

## Planning Your Visit

The experience takes place in ${location} and lasts approximately ${duration}. We recommend booking in advance to secure your spot, as our small group sizes ensure an intimate and personal experience.

## Conclusion

Don't miss the opportunity to experience the authentic heart of ${location}. Book your ${title} experience today and prepare to be amazed by the rich cultural heritage that awaits you.

*Ready to start your cultural journey? Contact us to learn more about this incredible experience.*`;
}

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

      // Check if it's a quota error and provide fallback
      if (errorData.error?.code === "insufficient_quota") {
        console.log("OpenAI quota exceeded, using fallback content");
        const fallbackBlogPost = generateFallbackBlogPost(
          title,
          culturalElements,
          location,
          duration,
          writingStyle,
          topic,
          targetKeywords
        );
        return NextResponse.json({
          blogPost: fallbackBlogPost,
          note: "Generated using fallback content due to OpenAI quota limits",
        });
      }

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
