import "server-only";
import Anthropic from "@anthropic-ai/sdk";

/**
 * Claude Haiku 4.5 — the cheapest/fastest model currently available. Plenty
 * for a small FAQ-style championship assistant; bump this if answers ever
 * need to get noticeably smarter.
 */
export const CHAT_MODEL = "claude-haiku-4-5-20251001";

export const CHAT_MAX_TOKENS = 400;

let client: Anthropic | null = null;

export function isChatConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

/** Lazily constructed so a missing API key doesn't throw at module-load time. */
export function getAnthropicClient(): Anthropic {
  if (!client) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}
