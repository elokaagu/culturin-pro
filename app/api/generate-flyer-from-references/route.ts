import { NextRequest, NextResponse } from "next/server";

// Fallback flyer generator when OpenAI quota is exceeded
function generateFallbackFlyer(
  experienceTitle: string,
  location: string,
  duration: string,
  price: string,
  keyDetails: string,
  templateStyle: string,
  colorTheme: string
) {
  const style = templateStyle?.toLowerCase() || "modern";
  const theme = colorTheme?.toLowerCase() || "blue-ocean";

  let flyerDesign = {
    headline: `Experience ${experienceTitle}`,
    subheading: `A ${duration} adventure in ${location}`,
    description: `Discover the authentic heart of ${location} through our ${experienceTitle}. This ${duration} experience offers you the unique opportunity to immerse yourself in local culture and traditions.`,
    benefits: [
      "Expert local guides",
      "Small group experiences",
      "Authentic cultural immersion",
      "Hands-on activities",
      "Deep community connections",
    ],
    included: [
      "Professional guidance",
      "All necessary materials",
      "Cultural insights",
      "Memorable experiences",
    ],
    callToAction: `Book your ${experienceTitle} today!`,
    contactInfo: "Contact us for booking and more information",
    socialProof:
      "Join hundreds of satisfied travelers who have experienced authentic cultural adventures",
    price: price || "Contact for pricing",
  };

  return flyerDesign;
}

export async function POST(request: NextRequest) {
  try {
    const {
      experienceTitle,
      location,
      duration,
      price,
      keyDetails,
      templateStyle,
      colorTheme,
      referenceImages,
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

    // Validate reference images
    if (!referenceImages || referenceImages.length === 0) {
      return NextResponse.json(
        {
          error: "At least one reference image is required",
        },
        { status: 400 }
      );
    }

    if (referenceImages.length > 3) {
      return NextResponse.json(
        {
          error: "Maximum 3 reference images allowed",
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

    // Create the prompt for ChatGPT with reference images
    const prompt = `Create a professional marketing flyer for a cultural experience based on the provided reference images and details:

Experience Title: ${experienceTitle}
Location: ${location}
Duration: ${duration}
Price: ${price || "Contact for pricing"}
Key Details: ${keyDetails}
Template Style: ${templateStyle || "Modern"}
Color Theme: ${colorTheme || "Blue Ocean"}

Reference Images: ${
      referenceImages.length
    } image(s) provided for design inspiration

Please analyze the reference images and create a flyer that:
- Matches the visual style, color palette, and layout patterns from the reference images
- Incorporates the cultural experience details naturally
- Uses appropriate typography and spacing based on the reference style
- Maintains the professional quality and appeal of the reference designs
- Includes all necessary information (title, location, duration, price, benefits, call to action)
- Is optimized for print and digital use
- Follows the ${templateStyle?.toLowerCase() || "modern"} style guidelines
- Uses the ${colorTheme?.toLowerCase() || "blue ocean"} color theme as a base

Format the response as JSON with the following structure:
{
  "headline": "string",
  "subheading": "string", 
  "description": "string",
  "benefits": ["string", "string", "string"],
  "included": ["string", "string", "string"],
  "callToAction": "string",
  "contactInfo": "string",
  "socialProof": "string",
  "designNotes": "string"
}`;

    // Call OpenAI API with vision capabilities
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "system",
            content:
              "You are an expert graphic designer specializing in cultural tourism marketing. You analyze reference images and create professional flyer designs that match the visual style while incorporating the provided content naturally.",
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt,
              },
              ...referenceImages.map((image: string) => ({
                type: "image_url",
                image_url: {
                  url: image,
                },
              })),
            ],
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
        const fallbackFlyer = generateFallbackFlyer(
          experienceTitle,
          location,
          duration,
          price,
          keyDetails,
          templateStyle,
          colorTheme
        );
        return NextResponse.json({
          flyerDesign: fallbackFlyer,
          note: "Generated using fallback content due to OpenAI quota limits",
        });
      }

      return NextResponse.json(
        { error: "Failed to generate flyer. Please try again." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedContent = data.choices[0]?.message?.content?.trim();

    if (!generatedContent) {
      return NextResponse.json(
        { error: "No flyer generated. Please try again." },
        { status: 500 }
      );
    }

    // Try to parse the JSON response
    try {
      const parsedFlyer = JSON.parse(generatedContent);

      // For now, return the design data (in a real implementation, you'd generate an actual image)
      return NextResponse.json({
        flyerDesign: parsedFlyer,
        flyerUrl: null, // In a real implementation, this would be a URL to the generated image
        note: "Flyer design generated from reference images. Image generation coming soon.",
      });
    } catch (error) {
      // If JSON parsing fails, return the raw content
      return NextResponse.json({
        flyerDesign: generatedContent,
        flyerUrl: null,
        note: "Raw flyer content generated from reference images",
      });
    }
  } catch (error) {
    console.error("Error generating flyer from references:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
