import { DEFAULT_PARAGRAPH_LENGTH, INTRO_OUTRO_WORD_COUNT } from "@/config";
import {  getContent } from "./getContent";

const getPodcastScript = async (topic: string, chapters: Array<{ topic: string, description: string }>) => {

    const basePrompt = `
    Podcast topics:
    The podcast has the following chapters:
    ${chapters.map((chapter, index) => `${index + 1}. ${chapter.topic}`).join('\n')}
    Follow this narrative!
  
    Formatting:
    Don't use asterisk (*) or any special characters.
    Don't add comments or staging instructions.
    Don't write "Host:" or "Guest:".
  
    Tone:
    Keep the script concise, conversational, informal, and engaging.
    Avoid using too many superlatives or exclamations.
    Use the following SSML tags to enhance the tone of the script in moderation to accentuate important parts:
      <prosody> tags with attributes rate and volume to control the speed and volume of the speech. Valid values for volume are: x-soft, soft, medium, loud.
      <break time="..."/> tags to add pauses where needed. Break tags should always be self-closing, with break time specified in integer numbers and units (s or ms).
      <emphasis level="..."> tags with valid levels: strong, moderate, reduced.
  `;
  
    const scriptPromises: Array<Promise<string>> = chapters.map((chapter, index) => {
      let chapterPrompt = '';
  
      if (index === 0) {
        chapterPrompt = `
          You are writing a podcast about ${topic}.
          
          Start with an opener:
          Welcome to AI Nexus, where your curiosity fuels our conversation. I'm your AI host, ready to dive deep into today's topic, specially chosen by you. Let's explore together!. 
          <break time="300ms"/>
  
          Write a ${INTRO_OUTRO_WORD_COUNT}-word introduction for the podcast (including the opener).
  
          ${basePrompt}
        `;
      } else if (index === chapters.length - 1) {
        chapterPrompt = `
          You are writing a podcast about ${topic}.
          Write a ${INTRO_OUTRO_WORD_COUNT}-word outro for the podcast.
          ${basePrompt}
        `;
      } else {
        chapterPrompt = `
          You are writing a podcast about ${topic}.
          Write the script for chapter ${index}, which should be approximately ${DEFAULT_PARAGRAPH_LENGTH} words, focusing on the topic "${chapter.topic}" and description "${chapter.description}".    
  
          ${basePrompt}
        `;
      }
  
      return getContent(chapterPrompt).then((scriptText) => {
        if (!scriptText) {
          throw new Error('Failed to retrieve script content.');
        }
        return scriptText;
      });
    });
  
    const scriptChunks = await Promise.all(scriptPromises);
    return (scriptChunks);
  }

  export default getPodcastScript;
  