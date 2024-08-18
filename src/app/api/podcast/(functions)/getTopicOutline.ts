import { getContent } from "./getContent";

const getTopicOutline = async (topic: string): Promise<Array<{ topic: string; description: string }>> => {
  const topicOutlinePrompt = `
    Write a topic outline for a podcast about ${topic}.
    First topic is intro, last topic is outro.
    Add 3 more topics in between.
    Return the response as a JSON list. Each item should look like this {
      "topic": "...",
      "description": "..."
    },
    IMPORTANT! Return ONLY a JSON object. Don't add quotes or comments around it.`;

  try {
    const outlineResponse = await getContent(topicOutlinePrompt);

    if (!outlineResponse) {
      throw new Error("Failed to retrieve topic outline content.");
    }

    const response: Array<{ topic: string; description: string }> = JSON.parse(
      outlineResponse.replace("```json", "").replace("```", "")
    );

    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default getTopicOutline;
