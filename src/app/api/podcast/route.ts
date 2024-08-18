import { NextResponse } from "next/server";
import getTopicOutline from "./(functions)/getTopicOutline";
import getPodcastScript from "./(functions)/getPodcastScript";
import generateAudioFromText from "./(functions)/getAudio";
import { assembleScriptWithSSML } from "./(functions)/getContent";
import { rateLimiter } from "@/lib/rateLimiter";

const script = `<speak>Welcome to AI Nexus, where your curiosity fuels our conversation. I'm your AI host, ready to dive deep into today's topic, specially chosen by you. Let's explore together!

In life, setting goals, maintaining a healthy work-life balance, building strong relationships, and practicing self-care are all crucial components to living your best life. Today, we'll uncover the secrets to achieving greatness in each of these areas. So, grab a cup of tea, get cozy, and let's embark on this journey together. By the end of this podcast, you'll have valuable insights to help you navigate the complexities of life with grace and purpose. Let's get started.

<break time="300ms"/>

Chapter 1: Introduction.<break time="500ms" />Chapter 1: Setting Goals and Prioritizing

Today, we're diving into the essential topic of setting goals and prioritizing tasks. It's like having a roadmap to your dream life! By setting specific goals, you give yourself direction and purpose. Use <prosody rate="slow">time</prosody><break time="0.2s"/> to determine what truly matters to you. By prioritizing tasks, you ensure you're focusing on what's most important. Remember, it's not about doing everything but doing what truly moves the needle towards your happiness and success. So, grab a pen, jot down those goals, and start prioritizing like a pro for a fulfilling life!<break time="500ms" />Chapter 2: Maintaining a Healthy Work-Life Balance

Alright, folks, let's dive into maintaining a healthy work-life balance! It's crucial to prevent burnout and keep our well-being in check. Here's the deal: set clear boundaries between work and personal time. Prioritize tasks using the 80/20 rule – focus on the vital few! Remember, it's quality over quantity. Delegate when you can, and don’t forget to schedule breaks to recharge. **Remember**, balance is key to a fulfilling life. So, go ahead, take charge, and find that sweet spot where work and play harmonize seamlessly. Your future self will thank you!<break time="500ms" />Chapter 4: Building Strong Relationships

Today, we're talking about the key to a fulfilling life - building strong relationships. Whether it's with your family, friends, or colleagues, nurturing these connections is vital for your happiness and overall well-being.

<prosody rate="fast">Invest time</prosody> in meaningful conversations, show appreciation, and <prosody volume="loud">listen actively</prosody>. <break time="0.5s"/> Remember, strong relationships are a two-way street. Reach out, be present, and <emphasis level="strong">embrace</emphasis> the support and love that surrounds you.

<break time="1s"/> Prioritize these relationships, and you'll find that your life becomes richer, more joyful, and truly satisfying.<break time="500ms" />Chapter 4: Practicing Self-Care and Mindfulness

Today, we're diving into the essential topic of self-care and mindfulness. It's crucial to prioritize yourself amidst life's chaos. Self-care isn't selfish; it's necessary for your well-being. Make time for activities you love, whether it's reading, exercising, or meditating. Remember, you can't pour from an empty cup!

Mindfulness is about being present in the moment, letting go of stress, and focusing on the now. Try grounding techniques like deep breathing or body scans to center yourself. By practicing self-care and mindfulness, you'll enhance your mental health and overall quality of life. It's time to prioritize yourself!

Let's take a moment to breathe... <break time="1s"/> and remember, you deserve this care.<break time="500ms" />And there you have it, folks! We've covered everything from setting goals and maintaining a healthy work-life balance to building strong relationships and practicing self-care. Remember, life is a journey, not a destination. It's essential to prioritize what truly matters to you and to find that balance that brings you joy and fulfillment. Take the time to reflect, set intentions, and make the changes necessary to live your best life. Thank you for tuning in to our podcast, and always remember to cherish each moment, take care of yourself, and spread positivity wherever you go. Until next time, stay motivated and live your best life!</speak>`;

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

  // const topics = await getTopicOutline(topic);

  // const script = await getPodcastScript(topic, topics);

  try {
    // const url = await generateAudioFromText(assembleScriptWithSSML(script), topic);
    const url =
      "https://storage.googleapis.com/podcast_ai/podcasts/mindful-minutes";

    await new Promise((resolve) => setTimeout(resolve, 15000));

    return NextResponse.json({ script: script, url: url });
  } catch (e) {
    return NextResponse.json({
      msg: "Failed to generate script",
      errorCode: 500,
    });
  }
}
