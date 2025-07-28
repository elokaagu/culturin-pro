import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { urlContent, targetLocation, experienceCategory, targetKeywords } =
      await request.json();

    // Validate required fields
    if (!urlContent || !targetLocation || !experienceCategory) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: urlContent, targetLocation, and experienceCategory are required",
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
    const prompt = `Analyze the following content for SEO optimization and provide detailed recommendations:

Content to Analyze: ${urlContent}
Target Location: ${targetLocation}
Experience Category: ${experienceCategory}
Target Keywords: ${targetKeywords || "Not specified"}

Please provide a comprehensive SEO analysis including:

1. SEO Score (0-100) with justification
2. Title optimization analysis and suggestions
3. Meta description analysis and improvements
4. Content quality assessment
5. Keyword usage analysis
6. Local SEO recommendations
7. Technical SEO suggestions
8. Actionable recommendations

For each section, provide:
- Current status (Good/Needs Improvement/Poor)
- Specific suggestions for improvement
- Priority level (High/Medium/Low)

Format the response as JSON with the following structure:
{
  "seoScore": number,
  "scoreJustification": "string",
  "titleAnalysis": {
    "status": "string",
    "currentTitle": "string",
    "suggestedTitle": "string",
    "recommendations": ["string"]
  },
  "metaDescription": {
    "status": "string",
    "currentDescription": "string",
    "suggestedDescription": "string",
    "recommendations": ["string"]
  },
  "contentQuality": {
    "status": "string",
    "wordCount": number,
    "keywordDensity": "string",
    "recommendations": ["string"]
  },
  "keywordAnalysis": {
    "primaryKeywords": ["string"],
    "keywordGaps": ["string"],
    "localKeywords": ["string"],
    "recommendations": ["string"]
  },
  "localSEO": {
    "status": "string",
    "recommendations": ["string"]
  },
  "technicalSEO": {
    "status": "string",
    "recommendations": ["string"]
  },
  "actionItems": [
    {
      "priority": "string",
      "action": "string",
      "impact": "string"
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
              "You are an expert SEO specialist specializing in cultural tourism and local search optimization. You provide detailed, actionable SEO recommendations that help businesses improve their search visibility and attract more organic traffic.",
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
        { error: "Failed to generate SEO analysis. Please try again." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedAnalysis = data.choices[0]?.message?.content?.trim();

    if (!generatedAnalysis) {
      return NextResponse.json(
        { error: "No SEO analysis generated. Please try again." },
        { status: 500 }
      );
    }

    // Try to parse the JSON response
    try {
      const parsedAnalysis = JSON.parse(generatedAnalysis);
      return NextResponse.json({ seoAnalysis: parsedAnalysis });
    } catch (error) {
      // If JSON parsing fails, return the raw content
      return NextResponse.json({ seoAnalysis: generatedAnalysis });
    }
  } catch (error) {
    console.error("Error generating SEO analysis:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
