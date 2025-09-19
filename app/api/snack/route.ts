import { generateContent } from "@/lib/gemini-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { movie } = await req.json();

    const res = await generateContent(movie);

    // Ensure the response is serializable
    if (res && typeof res === 'object') {
      return NextResponse.json(res);
    } else {
      return NextResponse.json(
        { error: "Invalid response format" },
        { status: 500 }
      );
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to get snack suggestion" },
      { status: 500 }
    );
  }
}
