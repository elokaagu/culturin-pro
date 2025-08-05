import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text, voice = "rigo" } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: "Text is required for speech generation" },
        { status: 400 }
      );
    }

    // Check if ElevenLabs API key is configured
    if (!process.env.ELEVENLABS_API_KEY) {
      return NextResponse.json(
        { error: "ElevenLabs API key not configured" },
        { status: 500 }
      );
    }

    // Get voice ID based on voice name
    const getVoiceId = (voiceName: string) => {
      switch (voiceName.toLowerCase()) {
        case "rigo":
          return "pNInz6obpgDQGcFmaJgB"; // Adam voice - professional and friendly
        case "adam":
          return "pNInz6obpgDQGcFmaJgB";
        case "bella":
          return "EXAVITQu4vr4xnSDxMaL";
        case "charlie":
          return "VR6AewLTigWG4xSOukaG";
        default:
          return "pNInz6obpgDQGcFmaJgB"; // Default to Adam
      }
    };

    const voiceId = getVoiceId(voice);

    // Call ElevenLabs API
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("ElevenLabs API error:", errorData);
      return NextResponse.json(
        { error: "Failed to generate speech. Please try again." },
        { status: 500 }
      );
    }

    // Convert the audio response to base64
    const audioBuffer = await response.arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString('base64');
    const dataUrl = `data:audio/mpeg;base64,${base64Audio}`;

    return NextResponse.json({ 
      audioUrl: dataUrl,
      success: true 
    });
  } catch (error) {
    console.error("Error generating speech:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
} 