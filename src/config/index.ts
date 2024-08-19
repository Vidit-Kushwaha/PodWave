const NODE_ENV = process.env.NODE_ENV || "development";
const URL = process.env.URL || "http://localhost:3000";
const INTRO_OUTRO_WORD_COUNT = 100;
const DEFAULT_PARAGRAPH_LENGTH = 100;
const OPENAI_API_KEY = process.env.OPENAI_API_KEYS || "your-openai-api-key";
const MAX_POADCAST_LIMIT_PER_DAY = process.env.MAX_POADCAST_LIMIT_PER_DAY || 10;
const BUCKET_NAME = process.env.BUCKET_NAME || "your-bucket-name";
const GOOGLE_PROJECT_ID =
  process.env.GOOGLE_PROJECT_ID || "your-google-project-id";
const GOOGLE_CLIENT_EMAIL =
  process.env.GOOGLE_CLIENT_EMAIL || "your-client-email";
const GOOGLE_PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY || "your-private-key").split(String.raw`\n`).join('\n');

export {
  NODE_ENV,
  URL,
  INTRO_OUTRO_WORD_COUNT,
  DEFAULT_PARAGRAPH_LENGTH,
  OPENAI_API_KEY,
  MAX_POADCAST_LIMIT_PER_DAY,
  BUCKET_NAME,
  GOOGLE_PROJECT_ID,
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY,
};
