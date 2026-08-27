"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { ease } from "@/lib/motion";
import { SUPPORT_EMAIL } from "@/lib/config";

/**
 * Standalone championship Q&A widget: a floating launcher + chat panel that
 * calls /api/chat (streaming) with a short rolling history. Fixed-positioned
 * and self-contained (no props, no external state), so it can be dropped
 * into any page — just import and render <ChampionshipChatbot /> once.
 */

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_INPUT_LENGTH = 500;
const HISTORY_SENT_TO_API = 12;

const GREETING =
  "Hi! Ask me anything about the RapKids TypeMaster Championship — prizes, rules, dates, how to register.";

export default function ChampionshipChatbot() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => inputRef.current?.focus(), reduce ? 0 : 200);
    return () => clearTimeout(id);
  }, [open, reduce]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isStreaming) return;

    setError(null);
    setInput("");

    const userMessage: ChatMessage = { role: "user", content: text };
    const nextMessages = [...messages, userMessage];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-HISTORY_SENT_TO_API) }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: assistantText };
          return copy;
        });
      }

      if (!assistantText.trim()) {
        throw new Error("No response received. Please try again.");
      }
    } catch (err) {
      setMessages((prev) => prev.slice(0, -1));
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsStreaming(false);
      inputRef.current?.focus();
    }
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close championship chat" : "Ask a question about the championship"}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-punch text-white shadow-xl shadow-punch/30 transition-transform hover:scale-105"
        whileTap={reduce ? undefined : { scale: 0.94 }}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease }}
            role="dialog"
            aria-label="Championship chat"
            className="fixed bottom-24 right-4 z-[60] flex h-[min(32rem,70vh)] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-line/15 bg-ink shadow-2xl sm:right-6"
          >
            {/* header */}
            <div className="flex shrink-0 items-center gap-3 bg-gradient-to-r from-punch to-blush px-5 py-4 text-white">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <div className="font-display text-lg font-bold leading-tight">Championship Assistant</div>
                <div className="truncate text-xs text-white/75">Ask about prizes, rules, dates &amp; more</div>
              </div>
            </div>

            {/* messages */}
            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-surface px-4 py-2.5 text-sm leading-relaxed text-cream">
                {GREETING}
              </div>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto rounded-br-md bg-punch text-white"
                      : "rounded-bl-md bg-surface text-cream"
                  }`}
                >
                  {m.content || (
                    <span className="inline-flex gap-1 py-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.2s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.1s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
                    </span>
                  )}
                </div>
              ))}
              {error ? (
                <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
                  {error}
                </div>
              ) : null}
            </div>

            {/* input */}
            <form onSubmit={sendMessage} className="shrink-0 border-t border-line/15 p-3">
              <div className="flex items-end gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={MAX_INPUT_LENGTH}
                  placeholder="Type a question…"
                  disabled={isStreaming}
                  className="min-w-0 flex-1 rounded-full border border-line/20 bg-[#F2ECFE] px-4 py-2.5 text-sm text-cream placeholder:text-faint outline-none transition-colors focus:border-punch/50 focus:bg-white disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={isStreaming || !input.trim()}
                  aria-label="Send"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-punch text-white transition-opacity disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-center font-mono text-[0.65rem] text-faint">
                About the championship only · questions? {SUPPORT_EMAIL}
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
