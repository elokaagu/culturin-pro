import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { seedKeywords, location, experienceCategory, targetAudience } =
      await request.json();

    // Validate required fields
    if (!seedKeywords || !location) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: seedKeywords and location are required",
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
    const prompt = `Generate comprehensive keyword research for a cultural tourism business with the following details:

Seed Keywords: ${seedKeywords}
Location: ${location}
Experience Category: ${experienceCategory || "Cultural Tourism"}
Target Audience: ${targetAudience || "Cultural Travelers"}

Please provide keyword research including:

1. Primary Keywords (high search volume, medium competition)
2. Long-tail Keywords (lower volume, higher conversion)
3. Local Keywords (location-specific)
4. Seasonal Keywords (time-sensitive)
5. Related Keywords (semantic variations)
6. Competitor Keywords (what competitors rank for)

For each keyword, provide:
- Search volume estimate (Low/Medium/High)
- Competition difficulty (Low/Medium/High)
- Search intent (Informational/Navigational/Transactional)
- Relevance score (1-10)

Format the response as JSON with the following structure:
{
  "primaryKeywords": [
    {
      "keyword": "string",
      "searchVolume": "string",
      "difficulty": "string",
      "intent": "string",
      "relevance": number
    }
  ],
  "longTailKeywords": [
    {
      "keyword": "string",
      "searchVolume": "string",
      "difficulty": "string",
      "intent": "string",
      "relevance": number
    }
  ],
  "localKeywords": [
    {
      "keyword": "string",
      "searchVolume": "string",
      "difficulty": "string",
      "intent": "string",
      "relevance": number
    }
  ],
  "seasonalKeywords": [
    {
      "keyword": "string",
      "searchVolume": "string",
      "difficulty": "string",
      "intent": "string",
      "relevance": number,
      "season": "string"
    }
  ],
  "relatedKeywords": [
    {
      "keyword": "string",
      "searchVolume": "string",
      "difficulty": "string",
      "intent": "string",
      "relevance": number
    }
  ],
  "keywordGaps": [
    {
      "keyword": "string",
      "opportunity": "string",
      "estimatedTraffic": "string"
    }
  ],
  "recommendations": [
    {
      "priority": "string",
      "keyword": "string",
      "reason": "string",
      "action": "string"
    }
  ]
}`;

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
              "You are an expert SEO keyword researcher specializing in cultural tourism and local search. You provide comprehensive keyword research that helps businesses identify high-opportunity keywords for better search visibility and organic traffic.",
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
        { error: "Failed to generate keyword research. Please try again." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedResearch = data.choices[0]?.message?.content?.trim();

    if (!generatedResearch) {
      return NextResponse.json(
        { error: "No keyword research generated. Please try again." },
        { status: 500 }
      );
    }

    // Try to parse the JSON response
    try {
      const parsedResearch = JSON.parse(generatedResearch);
      return NextResponse.json({ keywordResearch: parsedResearch });
    } catch (error) {
      // If JSON parsing fails, return the raw content
      return NextResponse.json({ keywordResearch: generatedResearch });
    }
  } catch (error) {
    console.error("Error generating keyword research:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
