import { BUCKET_NAME, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_PROJECT_ID } from "@/config";
import { v1beta1 } from "@google-cloud/text-to-speech";

const credentials = {
  "client_email": GOOGLE_CLIENT_EMAIL,
  "private_key": GOOGLE_PRIVATE_KEY,
};

const tts = new v1beta1.TextToSpeechLongAudioSynthesizeClient({
  credentials,
});

const generateAudioFromText = async (ssmlText: string, topic : string): Promise<string> => {
  const STORAGE_PATH = `gs://${BUCKET_NAME}/podcasts/`;
  const fileName = topic.replace(/\s/g, "-").toLowerCase();
  const googleCloudUri = `${STORAGE_PATH}${fileName}`;
  const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/podcasts/${fileName}`;

  const synthesisRequest = {
    parent: `projects/${GOOGLE_PROJECT_ID}/locations/global`,
    outputGcsUri: googleCloudUri,
    input: { ssml: ssmlText },
    voice: { languageCode: "en-US", name: "en-US-Neural2-F" },
    audioConfig: {
      audioEncoding: "LINEAR16" as any,
      effectsProfileId: ["small-bluetooth-speaker-class-device"],
      pitch: 0,
      speakingRate: 1,
    },
  };

  try {
    const [operation] = await tts.synthesizeLongAudio(synthesisRequest);

    if (!operation.name) {
      throw new Error("Failed to start audio synthesis operation.");
    }

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    let attemptCount = 0;
    const maxAttempts = 100;
    const checkInterval = 1500; // 1.5 seconds

    while (attemptCount < maxAttempts) {
      const operationStatus = await tts.checkSynthesizeLongAudioProgress(operation.name);
      attemptCount++;

      if (operationStatus.done) {
        if (operationStatus.error) {
          throw new Error(`Audio synthesis failed: ${operationStatus.error.message}`);
        }
        return publicUrl;
      }

      await sleep(checkInterval);
    }

    throw new Error("Audio generation timed out after multiple attempts.");
  } catch (error) {
    console.error("Error generating audio:", error);
    throw error;
  }
};


export default generateAudioFromText;
