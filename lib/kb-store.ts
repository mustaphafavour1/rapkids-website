import "server-only";
import { Redis } from "@upstash/redis";

/**
 * Persistent storage for the chatbot's knowledge base — the admin-editable
 * free-text sections pasted in at /admin. Backed by Upstash Redis so content
 * survives across serverless invocations and redeploys.
 *
 * If UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN aren't set, this falls
 * back to an in-memory store scoped to the current server process. That's
 * fine for local `next dev`, but on Vercel each serverless invocation can get
 * a fresh instance, so nothing saved will reliably stick — isPersistent()
 * reports this so the admin UI can warn about it.
 */

export type KnowledgeBase = {
  rapkids: string;
  raptures: string;
  championship: string;
  guidelines: string;
  updatedAt: string;
};

export const KB_SECTIONS = ["rapkids", "raptures", "championship", "guidelines"] as const;
export type KbSection = (typeof KB_SECTIONS)[number];

/** Per-field cap. Four fields at this size keep the worst-case system prompt
    (which is rebuilt on every chat request) bounded to a few thousand tokens. */
export const MAX_FIELD_LENGTH = 4000;

const EMPTY_KB: KnowledgeBase = {
  rapkids: "",
  raptures: "",
  championship: "",
  guidelines: "",
  updatedAt: "",
};

const KB_KEY = "rapkids:kb:v1";

const hasRedisEnv = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

const redis = hasRedisEnv ? Redis.fromEnv() : null;

// In-memory fallback, only reachable when Redis isn't configured.
let memoryStore: KnowledgeBase | null = null;

export function isKbPersistent(): boolean {
  return hasRedisEnv;
}

export async function getKnowledgeBase(): Promise<KnowledgeBase> {
  if (redis) {
    const data = await redis.get<KnowledgeBase>(KB_KEY);
    return data ?? EMPTY_KB;
  }
  return memoryStore ?? EMPTY_KB;
}

function clampField(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  return value.slice(0, MAX_FIELD_LENGTH);
}

export async function saveKnowledgeBase(
  input: Partial<Record<KbSection, string>>
): Promise<KnowledgeBase> {
  const current = await getKnowledgeBase();
  const next: KnowledgeBase = {
    rapkids: clampField(input.rapkids, current.rapkids),
    raptures: clampField(input.raptures, current.raptures),
    championship: clampField(input.championship, current.championship),
    guidelines: clampField(input.guidelines, current.guidelines),
    updatedAt: new Date().toISOString(),
  };

  if (redis) {
    await redis.set(KB_KEY, next);
  } else {
    memoryStore = next;
  }

  return next;
}
