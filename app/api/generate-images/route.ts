import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {
      experienceTitle,
      location,
      keyCulturalElements,
      targetAudience,
      tone,
      contentType,
      imageStyle,
      imageAspectRatio,
      customPrompt,
    } = await request.json();

    // Validate required fields
    if (!experienceTitle || !location) {
      return NextResponse.json(
        {
          error: "Missing required fields: experienceTitle and location are required",
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

    // Create the prompt for DALL-E based on content type and modal settings
    let imagePrompt = "";
    
    // Use custom prompt if provided, otherwise generate from form data
    if (customPrompt && customPrompt.trim()) {
      imagePrompt = customPrompt;
    } else {
      // Fallback to generating prompt from form data
      if (contentType === "instagram-caption") {
        imagePrompt = `Create a stunning, high-quality Instagram-worthy image for a cultural experience: ${experienceTitle} in ${location}. 
        
Key cultural elements: ${keyCulturalElements || "local traditions, authentic experiences"}
Target audience: ${targetAudience || "cultural travelers"}
Tone: ${tone || "friendly and approachable"}

The image should be:
- Visually appealing and Instagram-worthy
- Show authentic cultural elements
- Capture the essence of the experience
- High quality, professional photography style
- Warm, inviting atmosphere
- Include local people or cultural elements
- Perfect for social media engagement

Style: Professional travel photography, vibrant colors, authentic cultural representation`;
      } else if (contentType === "tiktok-hook") {
        imagePrompt = `Create an attention-grabbing, dynamic image for TikTok content about: ${experienceTitle} in ${location}.
        
Key cultural elements: ${keyCulturalElements || "local traditions, authentic experiences"}
Target audience: ${targetAudience || "young travelers"}
Tone: ${tone || "energetic and fun"}

The image should be:
- Dynamic and energetic
- Perfect for TikTok's vertical format
- Eye-catching and shareable
- Show authentic cultural moments
- Include movement or action
- Vibrant, youthful energy
- Perfect for short-form video content

Style: Dynamic, energetic, TikTok-optimized, authentic cultural representation`;
      } else if (contentType === "google-ad-copy") {
        imagePrompt = `Create a professional, conversion-focused image for Google Ads about: ${experienceTitle} in ${location}.
        
Key cultural elements: ${keyCulturalElements || "local traditions, authentic experiences"}
Target audience: ${targetAudience || "travelers seeking authentic experiences"}
Tone: ${tone || "professional and trustworthy"}

The image should be:
- Professional and trustworthy
- Clear value proposition
- High-quality, commercial photography
- Show the experience clearly
- Include cultural authenticity
- Perfect for advertising conversion
- Clean, professional composition

Style: Professional commercial photography, clean composition, authentic cultural representation`;
      } else {
        imagePrompt = `Create a beautiful, high-quality image for a cultural experience: ${experienceTitle} in ${location}.
        
Key cultural elements: ${keyCulturalElements || "local traditions, authentic experiences"}
Target audience: ${targetAudience || "cultural travelers"}
Tone: ${tone || "friendly and approachable"}

The image should be:
- Visually stunning and professional
- Show authentic cultural elements
- Capture the essence of the experience
- High quality, professional photography
- Warm, inviting atmosphere
- Include local people or cultural elements
- Perfect for marketing and promotion

Style: Professional travel photography, vibrant colors, authentic cultural representation`;
      }
    }

    // Enhance the prompt based on modal settings
    if (imageStyle) {
      switch (imageStyle) {
        case "realistic":
          imagePrompt += " Style: Photorealistic, high-quality photography, natural lighting, authentic representation.";
          break;
        case "illustration":
          imagePrompt += " Style: Artistic illustration, vibrant colors, creative interpretation, hand-drawn aesthetic.";
          break;
        case "minimal":
          imagePrompt += " Style: Minimalist design, clean lines, simple composition, elegant and modern.";
          break;
      }
    }

    // Set image size based on aspect ratio
    let imageSize = "1024x1024"; // Default square
    if (imageAspectRatio) {
      switch (imageAspectRatio) {
        case "16:9":
          imageSize = "1792x1024"; // Landscape
          break;
        case "9:16":
          imageSize = "1024x1792"; // Portrait
          break;
        case "4:3":
          imageSize = "1408x1024"; // Classic
          break;
        default:
          imageSize = "1024x1024"; // Square
      }
    }

    // Call OpenAI DALL-E API
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: imagePrompt,
        n: 3, // Generate 3 images
        size: imageSize,
        quality: "standard",
        style: "natural",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI DALL-E API error:", errorData);

      // Check if it's a quota error and provide fallback
      if (errorData.error?.code === "insufficient_quota") {
        console.log("OpenAI quota exceeded, using fallback images");
        const fallbackImages = [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1024&h=1024&fit=crop",
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1024&h=1024&fit=crop",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1024&h=1024&fit=crop",
        ];
        return NextResponse.json({
          images: fallbackImages,
          note: "Generated using fallback images due to OpenAI quota limits",
        });
      }

      return NextResponse.json(
        { error: "Failed to generate images. Please try again." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedImages = data.data?.map((image: any) => image.url) || [];

    if (generatedImages.length === 0) {
      return NextResponse.json(
        { error: "No images generated. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ images: generatedImages });
  } catch (error) {
    console.error("Error generating images:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
} 