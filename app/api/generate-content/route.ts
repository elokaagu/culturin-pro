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
  const { userInput, conversationHistory, attachments } = body;

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key not configured" },
      { status: 500 }
    );
  }

  // Check if user is requesting asset generation (images, flyers, content, etc.)
  const assetKeywords = [
    'generate', 'create', 'make', 'design', 'build', 'produce'
  ];
  
  const assetTypes = [
    'image', 'picture', 'photo', 'visual', 'graphic',
    'flyer', 'poster', 'banner', 'advertisement', 'ad',
    'instagram post', 'facebook ad', 'google ad', 'tiktok content',
    'marketing material', 'social media content', 'asset',
    'content', 'copy', 'caption', 'hook', 'script', 'email'
  ];

  const lowerInput = userInput.toLowerCase();
  const hasActionWord = assetKeywords.some(keyword => lowerInput.includes(keyword));
  const hasAssetType = assetTypes.some(type => lowerInput.includes(type));
  
  // Content generation detection (Instagram, TikTok, etc.) - Check this FIRST
  const isContentRequest = hasActionWord && (
    lowerInput.includes('instagram') ||
    lowerInput.includes('tiktok') ||
    lowerInput.includes('facebook') ||
    lowerInput.includes('google ad') ||
    lowerInput.includes('caption') ||
    lowerInput.includes('hook') ||
    lowerInput.includes('email') ||
    lowerInput.includes('script') ||
    lowerInput.includes('copy')
  );

  // Flyer generation detection (only if not a content request)
  const isFlyerRequest = !isContentRequest && hasActionWord && (
    lowerInput.includes('flyer') ||
    lowerInput.includes('poster') ||
    lowerInput.includes('advertisement') ||
    lowerInput.includes('marketing material')
  );

  // Image/visual generation detection (only if not content or flyer)
  const isImageRequest = !isContentRequest && !isFlyerRequest && hasActionWord && (
    lowerInput.includes('image') || 
    lowerInput.includes('picture') || 
    lowerInput.includes('photo') ||
    lowerInput.includes('visual') ||
    lowerInput.includes('graphic') ||
    lowerInput.includes('banner')
  );

  if (isContentRequest) {
    return handleContentGeneration(userInput, conversationHistory, attachments);
  }

  if (isFlyerRequest) {
    return handleFlyerGeneration(userInput, conversationHistory, attachments);
  }

  if (isImageRequest) {
    return handleImageGeneration(userInput, conversationHistory, attachments);
  }

  // Create conversation context for Rigo
  const systemPrompt = `You are Rigo, an AI marketing assistant specializing in cultural tourism. You help users create amazing marketing content through natural conversation.

Your personality:
- You're knowledgeable about marketing and cultural tourism
- You speak naturally and conversationally, like a helpful colleague
- You ask thoughtful questions to understand what users really need
- You provide practical, actionable advice
- You're supportive but not overly enthusiastic - keep it professional and friendly

Your expertise:
- All types of marketing content (social media, ads, blogs, emails, etc.)
- Cultural tourism marketing strategies
- Understanding target audiences and brand voice
- Content optimization for different platforms
- Analyzing reference materials to create tailored content
- Image generation for marketing materials

When helping users:
1. Have a natural conversation - don't force specific content types
2. Ask clarifying questions to understand their goals
3. Help them think through their marketing strategy
4. Provide specific examples and suggestions when relevant
5. Be helpful and supportive without being pushy
6. When users upload materials, analyze them and provide insights
7. Offer to generate images when it would be helpful

Keep responses conversational and natural. Don't use emojis or overly formal language. Just be helpful and conversational.`;

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

  // Add context about attachments if present
  let enhancedUserInput = userInput;
  if (attachments && attachments.length > 0) {
    const attachmentContext = attachments.map(att => {
      if (att.type === 'url') {
        return `Reference URL: ${att.name}`;
      } else if (att.type === 'image') {
        return `Reference image: ${att.name} (image file)`;
      } else {
        return `Reference document: ${att.name} (${att.type} file)`;
      }
    }).join(', ');
    
    enhancedUserInput = `${userInput}\n\nReference materials: ${attachmentContext}`;
    
    // Update the last message with enhanced context
    messages[messages.length - 1] = {
      role: "user",
      content: enhancedUserInput,
    };
  }

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

async function handleContentGeneration(userInput: string, conversationHistory: any[], attachments: any[]) {
  try {
    // Extract content type from user input
    let contentType = '';
    let platform = '';
    
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('instagram')) {
      // Check if it's specifically asking for a flyer/post format
      if (lowerInput.includes('flyer') || lowerInput.includes('post')) {
        contentType = 'instagram-post';
        platform = 'Instagram';
      } else {
        contentType = 'instagram-caption';
        platform = 'Instagram';
      }
    } else if (lowerInput.includes('tiktok')) {
      contentType = 'tiktok-hook';
      platform = 'TikTok';
    } else if (lowerInput.includes('facebook')) {
      contentType = 'facebook-ad';
      platform = 'Facebook';
    } else if (lowerInput.includes('google ad')) {
      contentType = 'google-ad-copy';
      platform = 'Google Ads';
    } else if (lowerInput.includes('email')) {
      contentType = 'email-campaign';
      platform = 'Email';
    } else {
      contentType = 'marketing-copy';
      platform = 'General';
    }

    // Extract experience details from conversation history
    const recentMessages = conversationHistory.slice(-10);
    let experienceTitle = 'Cultural Experience';
    let location = 'Barcelona';
    let keyCulturalElements = 'authentic local traditions';
    
    // Try to extract details from conversation
    const conversationText = recentMessages
      .filter(msg => msg.role === 'user')
      .map(msg => msg.content)
      .join(' ');
    
    // Simple extraction patterns
    const titleMatch = conversationText.match(/(?:experience|tour|class|workshop):\s*([^.,!?]+)/i);
    if (titleMatch) experienceTitle = titleMatch[1].trim();
    
    const locationMatch = conversationText.match(/(?:in|at|location):\s*([^.,!?]+)/i);
    if (locationMatch) location = locationMatch[1].trim();

    // Generate content using the same logic as the traditional content generation
    const systemPrompt = getSystemPromptForContentType(contentType);
    const prompt = getPromptForContentType(contentType, experienceTitle, location, keyCulturalElements);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error in content generation:", errorData);
      
      // Check if it's a quota error and provide fallback
      if (errorData.error?.code === "insufficient_quota") {
        console.log("OpenAI quota exceeded, using fallback content");
        const fallbackContent = generateFallbackContentForType(contentType, experienceTitle, location);
        return NextResponse.json({ 
          response: `Here's your ${platform} content:`,
          generatedContent: fallbackContent,
          contentType: contentType,
          platform: platform,
          note: "Generated using fallback content due to OpenAI quota limits"
        });
      }
      
      throw new Error(`Failed to generate content: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0]?.message?.content?.trim();

    return NextResponse.json({ 
      response: `Here's your ${platform} content:`,
      generatedContent: generatedContent,
      contentType: contentType,
      platform: platform
    });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate content. Please try again." },
      { status: 500 }
    );
  }
}

async function handleFlyerGeneration(userInput: string, conversationHistory: any[], attachments: any[]) {
  try {
    // Extract experience details from conversation history
    const recentMessages = conversationHistory.slice(-10);
    let experienceTitle = 'Cultural Experience';
    let location = 'Barcelona';
    let duration = '2 hours';
    let price = 'Contact for pricing';
    
    // Try to extract details from conversation
    const conversationText = recentMessages
      .filter(msg => msg.role === 'user')
      .map(msg => msg.content)
      .join(' ');
    
    // Simple extraction patterns
    const titleMatch = conversationText.match(/(?:experience|tour|class|workshop):\s*([^.,!?]+)/i);
    if (titleMatch) experienceTitle = titleMatch[1].trim();
    
    const locationMatch = conversationText.match(/(?:in|at|location):\s*([^.,!?]+)/i);
    if (locationMatch) location = locationMatch[1].trim();

    const durationMatch = conversationText.match(/(?:duration|time|hours?):\s*([^.,!?]+)/i);
    if (durationMatch) duration = durationMatch[1].trim();

    const priceMatch = conversationText.match(/(?:price|cost|\$):\s*([^.,!?]+)/i);
    if (priceMatch) price = priceMatch[1].trim();

    // First generate the flyer design content
    const flyerPrompt = `Create a professional marketing flyer for a cultural experience:

Experience Title: ${experienceTitle}
Location: ${location}
Duration: ${duration}
Price: ${price}

Create a flyer design that includes:
- Compelling headline
- Engaging subheading
- Description of the experience
- Key benefits and what's included
- Strong call to action
- Contact information
- Professional layout suitable for print and digital use

Format as JSON with the following structure:
{
  "headline": "string",
  "subheading": "string", 
  "description": "string",
  "benefits": ["string", "string", "string"],
  "included": ["string", "string", "string"],
  "callToAction": "string",
  "contactInfo": "string",
  "socialProof": "string"
}`;

    const contentResponse = await fetch("https://api.openai.com/v1/chat/completions", {
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
            content: "You are an expert graphic designer specializing in cultural tourism marketing. Create professional flyer designs that are engaging and conversion-focused."
          },
          { role: "user", content: flyerPrompt },
        ],
        max_tokens: 800,
        temperature: 0.7,
      }),
    });

    if (!contentResponse.ok) {
      throw new Error("Failed to generate flyer content");
    }

    const contentData = await contentResponse.json();
    const generatedContent = contentData.choices[0]?.message?.content?.trim();

    // Try to parse JSON response
    let flyerDesign;
    try {
      flyerDesign = JSON.parse(generatedContent);
    } catch (e) {
      flyerDesign = { content: generatedContent };
    }

    // Now generate a visual image of the flyer using DALL-E
    const imagePrompt = `Create a professional marketing flyer design for "${experienceTitle}" in ${location}. 

The flyer should have:
- A beautiful header with the title "${flyerDesign.headline || experienceTitle}"
- Vibrant colors that represent ${location} culture
- Professional typography and layout
- Include cultural elements and landmarks from ${location}
- Modern, clean design suitable for both print and digital
- Travel and cultural tourism theme
- Professional marketing material style
- High-quality, eye-catching design

Style: Professional marketing flyer, modern design, cultural tourism, travel brochure aesthetic, vibrant but professional colors`;

    try {
      const imageResponse = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: imagePrompt,
          n: 1,
          size: "1024x1024",
          quality: "standard",
          style: "natural",
        }),
      });

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        const generatedImage = imageData.data[0]?.url;

        if (generatedImage) {
          return NextResponse.json({ 
            response: `I've created a professional flyer design for your ${experienceTitle} experience with a beautiful visual:`,
            flyerDesign: flyerDesign,
            generatedImage: generatedImage,
            imagePrompt: imagePrompt,
            contentType: 'flyer'
          });
        }
      } else {
        console.log("Image generation failed, proceeding with flyer content only");
      }
    } catch (imageError) {
      console.log("Image generation error, proceeding with flyer content only:", imageError);
    }

    // If image generation fails, return just the flyer design
    return NextResponse.json({ 
      response: `I've created a professional flyer design for your ${experienceTitle} experience:`,
      flyerDesign: flyerDesign,
      contentType: 'flyer'
    });
  } catch (error) {
    console.error("Error generating flyer:", error);
    
    // Provide fallback flyer content
    const fallbackFlyer = {
      headline: `Experience ${userInput.includes('barcelona') ? 'Barcelona' : 'Cultural Heritage'}`,
      subheading: "Authentic Cultural Journey",
      description: "Join us for an unforgettable cultural experience that connects you with local traditions and heritage.",
      benefits: ["Expert local guides", "Authentic experiences", "Small group setting"],
      included: ["Professional guidance", "Cultural insights", "Memorable experiences"],
      callToAction: "Book Your Cultural Adventure Today!",
      contactInfo: "Contact us for booking and more information",
      socialProof: "Join hundreds of satisfied travelers"
    };

    return NextResponse.json({ 
      response: "I've created a flyer design for your cultural experience:",
      flyerDesign: fallbackFlyer,
      contentType: 'flyer',
      note: "Generated using fallback content"
    });
  }
}

async function handleImageGeneration(userInput: string, conversationHistory: any[], attachments: any[]) {
  try {
    // Create a prompt for image generation based on the conversation context
    let imagePrompt = "Create a professional marketing image for cultural tourism";
    
    // Extract context from conversation history
    const recentMessages = conversationHistory.slice(-5); // Last 5 messages
    const contextKeywords = recentMessages
      .filter(msg => msg.role === 'user')
      .map(msg => msg.content)
      .join(' ')
      .toLowerCase();
    
    // Build image prompt based on context
    if (contextKeywords.includes('barcelona')) {
      imagePrompt = "Professional marketing image of Barcelona cultural experiences, vibrant colors, authentic local atmosphere";
    } else if (contextKeywords.includes('cooking') || contextKeywords.includes('food')) {
      imagePrompt = "Professional marketing image of traditional cooking class, local ingredients, cultural culinary experience";
    } else if (contextKeywords.includes('instagram')) {
      imagePrompt = "Instagram-worthy marketing image for cultural tourism, vibrant, engaging, professional quality";
    } else if (contextKeywords.includes('facebook')) {
      imagePrompt = "Facebook ad image for cultural tourism, professional, engaging, clear call-to-action";
    } else if (contextKeywords.includes('google')) {
      imagePrompt = "Google Ads image for cultural tourism, professional, conversion-focused, clear value proposition";
    }

    // Add attachment context if available
    if (attachments && attachments.length > 0) {
      const attachmentContext = attachments.map(att => {
        if (att.type === 'image') {
          return "similar style to uploaded reference image";
        } else if (att.type === 'url') {
          return "inspired by reference URL content";
        }
        return "";
      }).filter(ctx => ctx).join(', ');
      
      if (attachmentContext) {
        imagePrompt += `, ${attachmentContext}`;
      }
    }

    // Call DALL-E API for image generation
    const imageResponse = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: imagePrompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        style: "natural",
      }),
    });

    if (!imageResponse.ok) {
      const errorData = await imageResponse.json();
      console.error("DALL-E API error:", errorData);
      return NextResponse.json(
        { error: "Failed to generate image. Please try again." },
        { status: 500 }
      );
    }

    const imageData = await imageResponse.json();
    const imageUrl = imageData.data[0]?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image generated. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      response: `I've generated a custom marketing image for you based on our conversation. Here's what I created:`,
      generatedImage: imageUrl,
      imagePrompt: imagePrompt
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image. Please try again." },
      { status: 500 }
    );
  }
}

// Helper functions for content generation
function getSystemPromptForContentType(contentType: string): string {
  switch (contentType) {
    case "instagram-caption":
      return "You are an expert social media marketer specializing in cultural tourism. You create engaging, Instagram-optimized captions that drive engagement and inspire travelers to book authentic cultural experiences.";
    case "instagram-post":
      return "You are an expert Instagram content creator specializing in cultural tourism. You create compelling Instagram post content that combines visual storytelling with engaging copy to promote cultural experiences.";
    case "tiktok-hook":
      return "You are an expert TikTok content creator specializing in cultural tourism. You create attention-grabbing hooks that capture viewers in the first 3 seconds.";
    case "google-ad-copy":
      return "You are an expert Google Ads copywriter specializing in cultural tourism. You create high-converting ad copy that drives clicks and bookings.";
    case "facebook-ad":
      return "You are an expert Facebook Ads specialist for cultural tourism. You create compelling ad copy that generates clicks and conversions.";
    case "email-campaign":
      return "You are an expert email marketer for cultural tourism. You create engaging email campaigns that drive bookings and build relationships.";
    default:
      return "You are an expert marketing copywriter specializing in cultural tourism. You create compelling marketing content that inspires travelers to book authentic cultural experiences.";
  }
}

function getPromptForContentType(contentType: string, experienceTitle: string, location: string, keyCulturalElements: string): string {
  switch (contentType) {
    case "instagram-caption":
      return `Create an engaging Instagram caption for a cultural experience:

Experience Title: ${experienceTitle}
Location: ${location}
Key Cultural Elements: ${keyCulturalElements}

Create an Instagram caption that:
- Is 50-100 words
- Uses relevant emojis strategically
- Includes a compelling hook
- Describes the experience authentically
- Includes a call to action
- Is optimized for Instagram engagement
- Uses hashtags relevant to cultural travel

Format as plain text with proper line breaks and emojis.`;

    case "instagram-post":
      return `Create compelling Instagram post content for a cultural experience:

Experience Title: ${experienceTitle}
Location: ${location}
Key Cultural Elements: ${keyCulturalElements}

Create Instagram post content that:
- Is 100-150 words
- Tells a visual story about the experience
- Uses engaging emojis and formatting
- Includes compelling details about what visitors will experience
- Has a strong call to action
- Uses relevant hashtags for cultural travel
- Is formatted for Instagram's visual platform
- Emphasizes the unique and authentic aspects

Format as an engaging Instagram post with proper structure, emojis, and hashtags.`;

    case "tiktok-hook":
      return `Create an attention-grabbing TikTok hook for:

Experience Title: ${experienceTitle}
Location: ${location}
Key Cultural Elements: ${keyCulturalElements}

Create a TikTok hook that:
- Is 10-20 words maximum
- Captures attention in the first 3 seconds
- Creates curiosity and interest
- Uses trending language and style
- Is shareable and engaging

Format as a single, impactful sentence.`;

    case "google-ad-copy":
      return `Create high-converting Google Ads copy for:

Experience Title: ${experienceTitle}
Location: ${location}
Key Cultural Elements: ${keyCulturalElements}

Create Google Ads copy with:
- Headline 1 (30 characters max)
- Headline 2 (30 characters max)
- Headline 3 (30 characters max)
- Description 1 (90 characters max)
- Description 2 (90 characters max)

Format as JSON with the structure:
{
  "headline1": "string",
  "headline2": "string",
  "headline3": "string",
  "description1": "string",
  "description2": "string"
}`;

    default:
      return `Create compelling marketing content for:

Experience Title: ${experienceTitle}
Location: ${location}
Key Cultural Elements: ${keyCulturalElements}

Create marketing content that:
- Is compelling and conversion-focused
- Describes the experience authentically
- Includes a clear value proposition
- Has a strong call to action
- Incorporates cultural authenticity
- Is optimized for the target audience`;
  }
}

// Fallback content generator for different content types
function generateFallbackContentForType(contentType: string, experienceTitle: string, location: string): string {
  switch (contentType) {
    case "instagram-caption":
    case "instagram-post":
      return `🌟 Experience the authentic magic of ${location} with our ${experienceTitle}! 

Immerse yourself in local traditions and discover the heart of ${location} through authentic cultural experiences. From traditional activities to hidden gem discoveries, every moment is crafted to connect you with the local community.

Perfect for cultural travelers who want more than just a tour - they want a genuine connection to the culture and people of ${location}.

Ready to create memories that last a lifetime? Book your spot today! ✨

#CulturalTravel #${location.replace(/\s+/g, '')} #AuthenticExperiences #CulturalImmersion #TravelWithPurpose #${experienceTitle.replace(/\s+/g, '')}`;

    case "tiktok-hook":
      return `You won't believe what we discovered in ${location}... 🤯`;

    case "google-ad-copy":
      return JSON.stringify({
        headline1: `Authentic ${location} Experience`,
        headline2: `${experienceTitle} - Book Now`,
        headline3: "Cultural Immersion Tours",
        description1: `Discover the real ${location} with authentic cultural experiences. Expert local guides, small groups, unforgettable memories.`,
        description2: "Book your cultural adventure today and save 20%. Limited spots available!"
      });

    case "facebook-ad":
      return `Experience the authentic magic of ${location} with our ${experienceTitle}! 

🌍 Authentic cultural immersion
👥 Expert local guides  
⭐ Small group experiences
💫 Unforgettable memories

Book now and save 20% on your cultural adventure!`;

    case "email-campaign":
      return `Subject: Your ${location} Cultural Adventure Awaits

Dear Cultural Explorer,

Get ready to experience ${location} like never before with our ${experienceTitle}!

This isn't just another tour - it's your gateway to authentic cultural immersion. You'll connect with local traditions, meet inspiring people, and create memories that will last a lifetime.

What makes this special:
• Authentic local experiences
• Expert cultural guides
• Small group settings
• Genuine community connections

Ready to embark on this cultural journey?

Book your ${experienceTitle} today!

Best regards,
The Cultural Experience Team`;

    default:
      return `Experience the authentic magic of ${location} with our ${experienceTitle}! 

Immerse yourself in local traditions and discover the heart of ${location} through authentic cultural experiences. Perfect for cultural travelers who want more than just a tour - they want a genuine connection to the culture and people.

Book your spot today and create memories that last a lifetime!`;
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