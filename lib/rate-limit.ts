import "server-only";
import { Redis } from "@upstash/redis";

const hasRedisEnv = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);
const redis = hasRedisEnv ? Redis.fromEnv() : null;

/**
 * Simple fixed-window rate limit, backed by the same Redis instance as the
 * knowledge base. Not perfectly smooth (bursts possible right at a window
 * boundary), but enough to stop a stuck client or a script from running up
 * API cost — the chat route calls a paid model on every request.
 *
 * No-ops (never limits) when Redis isn't configured, so local dev keeps
 * working without extra setup.
 */
export async function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): Promise<{ allowed: boolean }> {
  if (!redis) return { allowed: true };

  const bucket = Math.floor(Date.now() / (windowSeconds * 1000));
  const redisKey = `ratelimit:${key}:${bucket}`;

  const count = await redis.incr(redisKey);
  if (count === 1) {
    await redis.expire(redisKey, windowSeconds);
  }

  return { allowed: count <= limit };
}
