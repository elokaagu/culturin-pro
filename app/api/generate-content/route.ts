import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Handle conversational flow with Rigo
    if (body.isConversation) {
      return handleConversation(body);
    }
    
    // Handle traditional content generation
    const {
      contentType,
      experienceTitle,
      location,
      keyCulturalElements,
      targetAudience,
      tone,
      copyType,
    } = body;

    // Validate required fields
    if (!contentType || !experienceTitle || !location) {
      return NextResponse.json(
        {
          error: "Missing required fields: contentType, experienceTitle, and location are required",
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

    // Create the prompt for ChatGPT based on content type
    let prompt = "";
    let systemPrompt = "";

    if (contentType === "instagram-caption") {
      systemPrompt = "You are an expert social media marketer specializing in cultural tourism. You create engaging, Instagram-optimized captions that drive engagement and inspire travelers to book authentic cultural experiences.";
      prompt = `Create an engaging Instagram caption for a cultural experience with the following details:

Experience Title: ${experienceTitle}
Location: ${location}
Key Cultural Elements: ${keyCulturalElements || "local traditions, authentic experiences"}
Target Audience: ${targetAudience || "cultural travelers"}
Tone: ${tone || "friendly and approachable"}

Please create an Instagram caption that:
- Is 50-100 words
- Uses relevant emojis strategically
- Includes a compelling hook
- Describes the experience authentically
- Uses the specified tone
- Includes a call to action
- Is optimized for Instagram engagement
- Incorporates cultural authenticity
- Uses hashtags relevant to cultural travel

Format the response as plain text with proper line breaks and emojis.`;
    } else if (contentType === "tiktok-hook") {
      systemPrompt = "You are an expert TikTok content creator specializing in cultural tourism. You create attention-grabbing hooks that capture viewers in the first 3 seconds.";
      prompt = `Create an attention-grabbing TikTok hook for a cultural experience with the following details:

Experience Title: ${experienceTitle}
Location: ${location}
Key Cultural Elements: ${keyCulturalElements || "local traditions, authentic experiences"}
Target Audience: ${targetAudience || "young travelers"}
Tone: ${tone || "energetic and fun"}

Please create a TikTok hook that:
- Is 10-20 words maximum
- Captures attention in the first 3 seconds
- Uses the specified tone
- Is perfect for TikTok's short-form format
- Creates curiosity and interest
- Uses trending language and style
- Is shareable and engaging

Format as a single, impactful sentence.`;
    } else if (contentType === "google-ad-copy") {
      systemPrompt = "You are an expert Google Ads copywriter specializing in cultural tourism. You create high-converting ad copy that drives clicks and bookings.";
      prompt = `Create high-converting Google Ads copy for a cultural experience with the following details:

Experience Title: ${experienceTitle}
Location: ${location}
Key Cultural Elements: ${keyCulturalElements || "local traditions, authentic experiences"}
Target Audience: ${targetAudience || "travelers seeking authentic experiences"}
Tone: ${tone || "professional and trustworthy"}

Please create Google Ads copy that includes:
- Headline 1 (30 characters max)
- Headline 2 (30 characters max)
- Headline 3 (30 characters max)
- Description 1 (90 characters max)
- Description 2 (90 characters max)
- Uses the specified tone
- Focuses on conversion
- Includes clear value proposition
- Uses relevant keywords
- Is optimized for Google Ads

Format as JSON with the following structure:
{
  "headline1": "string",
  "headline2": "string",
  "headline3": "string",
  "description1": "string",
  "description2": "string"
}`;
    } else if (copyType === "marketing-copy") {
      systemPrompt = "You are an expert marketing copywriter specializing in cultural tourism. You create compelling marketing copy that drives conversions and inspires travelers to book authentic cultural experiences.";
      prompt = `Create compelling marketing copy for a cultural experience with the following details:

Experience Title: ${experienceTitle}
Location: ${location}
Key Cultural Elements: ${keyCulturalElements || "local traditions, authentic experiences"}
Target Audience: ${targetAudience || "cultural travelers"}
Tone: ${tone || "friendly and approachable"}

Please create marketing copy that:
- Is compelling and conversion-focused
- Uses the specified tone
- Describes the experience authentically
- Includes a clear value proposition
- Has a strong call to action
- Incorporates cultural authenticity
- Is optimized for the target audience
- Uses persuasive language
- Addresses pain points and desires
- Creates urgency and excitement

Format as plain text with proper structure and flow.`;
    } else {
      systemPrompt = "You are an expert marketing copywriter specializing in cultural tourism. You create compelling marketing content that inspires travelers to book authentic cultural experiences.";
      prompt = `Create engaging marketing content for a cultural experience with the following details:

Experience Title: ${experienceTitle}
Location: ${location}
Key Cultural Elements: ${keyCulturalElements || "local traditions, authentic experiences"}
Target Audience: ${targetAudience || "cultural travelers"}
Tone: ${tone || "friendly and approachable"}

Please create marketing content that:
- Is compelling and engaging
- Uses the specified tone
- Describes the experience authentically
- Includes a clear value proposition
- Has a strong call to action
- Incorporates cultural authenticity
- Is optimized for the target audience

Format as plain text with proper structure and flow.`;
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
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);

      // Check if it's a quota error and provide fallback
      if (errorData.error?.code === "insufficient_quota") {
        console.log("OpenAI quota exceeded, using fallback content");
        const fallbackContent = generateFallbackContent(contentType, experienceTitle, location, keyCulturalElements, targetAudience, tone);
        return NextResponse.json({
          content: fallbackContent,
          note: "Generated using fallback content due to OpenAI quota limits",
        });
      }

      return NextResponse.json(
        { error: "Failed to generate content. Please try again." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedContent = data.choices[0]?.message?.content?.trim();

    if (!generatedContent) {
      return NextResponse.json(
        { error: "No content generated. Please try again." },
        { status: 500 }
      );
    }

    // Try to parse JSON if it's Google Ads copy
    if (contentType === "google-ad-copy") {
      try {
        const parsedContent = JSON.parse(generatedContent);
        return NextResponse.json({ content: parsedContent });
      } catch (error) {
        // If JSON parsing fails, return the raw content
        return NextResponse.json({ content: generatedContent });
      }
    }

    return NextResponse.json({ content: generatedContent });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

async function handleConversation(body: any) {
  const { userInput, conversationHistory } = body;

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key not configured" },
      { status: 500 }
    );
  }

  // Create conversation context for Rigo
  const systemPrompt = `You are Rigo, an AI marketing assistant inspired by the great explorer Amerigo Vespucci. You help users create amazing marketing content for cultural tourism experiences.

Your personality:
- You're enthusiastic and adventurous, like a modern-day explorer
- You use nautical and exploration metaphors when appropriate
- You're knowledgeable about cultural tourism and marketing
- You're friendly, helpful, and encouraging
- You speak in a conversational, engaging tone
- You ask clarifying questions to better understand the user's needs
- You provide specific, actionable advice
- You can suggest content types, help refine ideas, and guide users through the content creation process

Your expertise:
- Instagram captions, TikTok hooks, Google Ads, Facebook ads, blog posts, email newsletters, WhatsApp scripts, event flyers
- Cultural tourism marketing
- Target audience analysis
- Tone and voice development
- Content optimization for different platforms

When helping users:
1. Ask clarifying questions to understand their needs
2. Suggest specific content types based on their goals
3. Help them define their target audience and tone
4. Guide them through the content creation process
5. Provide examples and best practices
6. Be encouraging and supportive

Keep responses conversational and under 150 words unless the user specifically asks for longer content.`;

  // Prepare conversation messages
  const messages = [
    {
      role: "system",
      content: systemPrompt,
    },
    ...conversationHistory,
    {
      role: "user",
      content: userInput,
    },
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: 300,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      return NextResponse.json(
        { error: "Failed to get response from Rigo. Please try again." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content?.trim();

    if (!aiResponse) {
      return NextResponse.json(
        { error: "No response generated. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("Error in conversation:", error);
    return NextResponse.json(
      { error: "Failed to get response from Rigo. Please try again." },
      { status: 500 }
    );
  }
}

// Fallback content generator
function generateFallbackContent(
  contentType: string,
  experienceTitle: string,
  location: string,
  keyCulturalElements: string,
  targetAudience: string,
  tone: string
) {
  if (contentType === "instagram-caption") {
    return `🌟 Experience the authentic magic of ${location} with our ${experienceTitle}! 

Immerse yourself in local traditions and discover the heart of ${location} through authentic cultural experiences. From traditional cooking classes to hidden gem discoveries, every moment is crafted to connect you with the local community.

Perfect for ${targetAudience || "cultural travelers"} who want more than just a tour - they want a genuine connection to the culture and people of ${location}.

Ready to create memories that last a lifetime? Book your spot today and save 20% with code: CULTURE20 ✨

#CulturalTravel #${location.replace(/\s+/g, '')} #AuthenticExperiences #CulturalImmersion #TravelWithPurpose`;
  } else if (contentType === "tiktok-hook") {
    return `You won't believe what we discovered in ${location}... 🤯`;
  } else if (contentType === "google-ad-copy") {
    return {
      headline1: `Authentic ${location} Experience`,
      headline2: `${experienceTitle} - Book Now`,
      headline3: "Cultural Immersion Tours",
      description1: `Discover the real ${location} with authentic cultural experiences. Expert local guides, small groups, unforgettable memories.`,
      description2: "Book your cultural adventure today and save 20%. Limited spots available!"
    };
  } else {
    return `Experience the authentic magic of ${location} with our ${experienceTitle}! 

Immerse yourself in local traditions and discover the heart of ${location} through authentic cultural experiences. Perfect for ${targetAudience || "cultural travelers"} who want more than just a tour - they want a genuine connection to the culture and people.

Book your spot today and create memories that last a lifetime!`;
  }
} 