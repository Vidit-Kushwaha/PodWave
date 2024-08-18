import { MAX_POADCAST_LIMIT_PER_DAY } from "@/config";
import { kv } from "@vercel/kv";

const LIMIT = MAX_POADCAST_LIMIT_PER_DAY;
const TIME_WINDOW = 24 * 60 * 60;

export const rateLimiter = async (ip: string) => {
  const now = Date.now();
  const startOfDay = Math.floor(now / 1000) - (now % TIME_WINDOW) / 1000;

  const key = `rate-limit:${ip}`;
  const data = await kv.hgetall(key);

  const timestamps = data?.timestamps
    ? JSON.parse(data.timestamps.toString())
    : [];

  const validTimestamps = timestamps.filter((ts: number) => ts > startOfDay);

  if (validTimestamps.length >= LIMIT) {
    return false;
  }

  validTimestamps.push(now / 1000);
  await kv.hset(key, { timestamps: JSON.stringify(validTimestamps) });

  await kv.expire(key, TIME_WINDOW);

  return true;
};
