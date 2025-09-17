import { generateContent } from "@/lib/gemini-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { movie } = await req.json();

    const res = await generateContent(movie);

    return NextResponse.json(res);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to get snack suggestion" },
      { status: 500 }
    );
  }
}
