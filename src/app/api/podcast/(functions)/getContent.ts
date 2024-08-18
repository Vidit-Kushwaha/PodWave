import OpenAI from "openai";
import { OPENAI_API_KEY } from "@/config/index";

const assembleScriptWithSSML = (scriptChunks: string[]): string => {
    return `<speak>${scriptChunks.join('<break time="1500ms" />')}</speak>`;
  }

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const getContent = async (prompt: string) => {

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: prompt }],
  });

  return completion.choices[0].message.content;
};

export { getContent, assembleScriptWithSSML };
