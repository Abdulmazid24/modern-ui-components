import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// In-memory fallback if Upstash variables are not provided (e.g. local dev)
const localCache = new Map<string, { count: number; lastReset: number }>();

function checkLocalRateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = localCache.get(ip);
  if (!record || (now - record.lastReset > windowMs)) {
    localCache.set(ip, { count: 1, lastReset: now });
    return true;
  }
  if (record.count >= limit) return false;
  record.count++;
  return true;
}

// Ensure safe initialization
let redis: Redis | null = null;
let ratelimitVerify: Ratelimit | null = null;
let ratelimitDownload: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    
    // 10 requests per minute for verification API
    ratelimitVerify = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "60 s"),
      analytics: true,
      prefix: "@upstash/ratelimit/verify",
    });

    // 20 requests per minute for component downloads
    ratelimitDownload = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "60 s"),
      analytics: true,
      prefix: "@upstash/ratelimit/download",
    });
  } catch (error) {
    console.warn("Failed to initialize Upstash Redis:", error);
  }
}

export async function verifyRateLimit(ip: string): Promise<boolean> {
  if (ratelimitVerify) {
    const { success } = await ratelimitVerify.limit(ip);
    return success;
  }
  return checkLocalRateLimit(ip + "_verify", 10, 60000);
}

export async function downloadRateLimit(ip: string): Promise<boolean> {
  if (ratelimitDownload) {
    const { success } = await ratelimitDownload.limit(ip);
    return success;
  }
  return checkLocalRateLimit(ip + "_download", 20, 60000);
}
