import { NextResponse } from "next/server";
import getTopicOutline from "./(functions)/getTopicOutline";
import getPodcastScript from "./(functions)/getPodcastScript";
import generateAudioFromText from "./(functions)/getAudio";
import { assembleScriptWithSSML } from "./(functions)/getContent";
import { rateLimiter } from "@/lib/rateLimiter";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");

  if (!ip) {
    return NextResponse.json({
      message: "Rate limit exceeded. Try again later.",
      errorCode: 429,
    });
  }
  const allowed = await rateLimiter(ip);

  if (!allowed) {
    return NextResponse.json({
      message: "Rate limit exceeded. Try again later.",
      errorCode: 429,
    });
  }

  let { topic } = await req.json();
  topic
    .trim()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, " ");

  const topics = await getTopicOutline(topic);

  const script = await getPodcastScript(topic, topics);

  try {
    const url = await generateAudioFromText(
      assembleScriptWithSSML(script),
      topic
    );

    return NextResponse.json({ script: script, url: url });
  } catch (e) {
    return NextResponse.json({
      msg: "Failed to generate script",
      errorCode: 500,
    });
  }
}
