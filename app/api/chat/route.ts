import type { NextRequest } from "next/server";
import { getAnthropicClient, isChatConfigured, CHAT_MODEL, CHAT_MAX_TOKENS } from "@/lib/anthropic";
import { buildSystemPrompt } from "@/lib/chat-context";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_MESSAGE_LENGTH = 600;
const MAX_MESSAGES = 16;

function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400 });
}

export async function POST(req: NextRequest) {
  if (!isChatConfigured()) {
    return Response.json(
      { error: "Chat isn't set up yet — the site owner needs to add an Anthropic API key." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest("Invalid request body.");
  }

  if (typeof body !== "object" || body === null || !("messages" in body)) {
    return badRequest("Send a `messages` array.");
  }

  const rawMessages = (body as { messages: unknown }).messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return badRequest("Send at least one message.");
  }
  if (rawMessages.length > MAX_MESSAGES) {
    return badRequest("Conversation is too long for this chat.");
  }

  const cleaned: ChatMessage[] = [];
  for (const raw of rawMessages) {
    if (typeof raw !== "object" || raw === null) {
      return badRequest("Invalid message in conversation.");
    }
    const m = raw as { role?: unknown; content?: unknown };
    if (
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string" ||
      !m.content.trim()
    ) {
      return badRequest("Each message needs a role of user/assistant and non-empty text.");
    }
    if (m.content.length > MAX_MESSAGE_LENGTH) {
      return badRequest(`Messages must be under ${MAX_MESSAGE_LENGTH} characters.`);
    }
    cleaned.push({ role: m.role, content: m.content });
  }

  if (cleaned[cleaned.length - 1]!.role !== "user") {
    return badRequest("The last message must be from the user.");
  }

  const system = await buildSystemPrompt();
  const client = getAnthropicClient();

  let anthropicStream;
  try {
    anthropicStream = client.messages.stream({
      model: CHAT_MODEL,
      max_tokens: CHAT_MAX_TOKENS,
      temperature: 0.4,
      system,
      messages: cleaned,
    });
  } catch (err) {
    console.error("Anthropic stream setup failed", err);
    return Response.json({ error: "The assistant is temporarily unavailable." }, { status: 502 });
  }

  // Wait for the request to actually connect before committing to a streamed
  // Response. `.stream()` fires the request in the background rather than
  // awaiting it, so a bad API key or an outage would otherwise only surface
  // once we're already mid-response — the client gets a broken pipe instead
  // of a clean error. `emitted("connect")` rejects if an error arrives first.
  try {
    await anthropicStream.emitted("connect");
  } catch (err) {
    console.error("Anthropic connect failed", err);
    return Response.json({ error: "The assistant is temporarily unavailable." }, { status: 502 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of anthropicStream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        console.error("Anthropic stream error", err);
        controller.error(err);
      }
    },
    cancel() {
      anthropicStream.abort();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
