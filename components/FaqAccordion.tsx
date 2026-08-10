"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import type { Faq } from "@/lib/content";
import { ease } from "@/lib/motion";

type Props = {
  items: Faq[];
  /** index-offset so multiple accordions on a page keep unique ids */
  idPrefix?: string;
};

export default function FaqAccordion({ items, idPrefix = "faq" }: Props) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line/15 border-y border-line/15">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={`${idPrefix}-${i}`}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 py-5 text-left"
              >
                <span
                  className={`font-mono text-sm ${
                    isOpen ? "text-punch" : "text-faint"
                  }`}
                  aria-hidden
                >
                  {">"}
                </span>
                <span
                  className={`flex-1 font-display text-lg font-bold transition-colors sm:text-xl ${
                    isOpen ? "text-cream" : "text-cream/90"
                  }`}
                >
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25, ease }}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                    isOpen
                      ? "border-punch/40 text-punch"
                      : "border-line/25 text-muted"
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: reduce ? 0 : 0.32,
                    ease,
                  }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 pl-8 pr-10 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
