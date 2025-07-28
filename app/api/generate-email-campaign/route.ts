import { NextRequest, NextResponse } from "next/server";

// Fallback email campaign generator
function generateFallbackEmailCampaign(
  title: string,
  culturalElements: string,
  location: string,
  duration: string,
  writingStyle: string,
  campaignType: string,
  offer: string
) {
  const style = writingStyle?.toLowerCase() || "engaging";
  const type = campaignType?.toLowerCase() || "promotional";

  let subjectLine = `Discover the Authentic Magic of ${location}`;
  if (type.includes("newsletter"))
    subjectLine = `Your Cultural Journey Awaits in ${location}`;
  if (type.includes("announcement"))
    subjectLine = `New Cultural Experience: ${title} in ${location}`;
  if (type.includes("follow"))
    subjectLine = `Don't Miss Out: ${title} Experience in ${location}`;

  return `Subject: ${subjectLine}

Dear Cultural Explorer,

Are you ready to experience the authentic heart of ${location}? We're excited to introduce you to our newest cultural experience: ${title}.

This ${duration} journey will take you deep into local traditions where you'll experience ${culturalElements} firsthand. Our expert local guides will share the rich stories and customs that make this experience truly special.

What makes this experience unique:
• Authentic cultural immersion
• Expert local guides
• Small group sizes for personal attention
• Hands-on cultural activities
• Deep connection with local communities

${offer ? `Special Offer: ${offer}` : ""}

This isn't just another tour – it's an opportunity to transform how you see and understand ${location}. Whether you're a seasoned traveler or new to cultural experiences, this adventure promises to be both educational and deeply moving.

Ready to start your cultural journey? Book your spot today and prepare to be amazed by the authentic beauty of local culture.

Best regards,
The Culturin Team

P.S. Don't wait too long – authentic cultural experiences like this tend to fill up quickly!`;
}

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

      // Check if it's a quota error and provide fallback
      if (errorData.error?.code === "insufficient_quota") {
        console.log("OpenAI quota exceeded, using fallback content");
        const fallbackEmail = generateFallbackEmailCampaign(
          title,
          culturalElements,
          location,
          duration,
          writingStyle,
          campaignType,
          offer
        );
        return NextResponse.json({
          emailCampaign: fallbackEmail,
          note: "Generated using fallback content due to OpenAI quota limits",
        });
      }

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
