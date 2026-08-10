"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export type Accent = "punch" | "sky" | "gold" | "volt" | "peach";
export type Segment = { text: string; accent?: Accent };

const accentText: Record<Accent, string> = {
  punch: "text-punch",
  sky: "text-sky",
  gold: "text-gold",
  volt: "text-volt",
  peach: "text-peach",
};

const caretBg: Record<Accent, string> = {
  punch: "bg-punch",
  sky: "bg-sky",
  gold: "bg-gold",
  volt: "bg-volt",
  peach: "bg-peach",
};

type Props = {
  segments: Segment[];
  /** heading level / element */
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** type the headline out character-by-character on scroll into view */
  typed?: boolean;
  typeSpeed?: number;
  caret?: Accent;
};

/**
 * The project's single headline mechanism: display type with one keyword in an
 * accent color, trailed by a blinking block caret — the "typing" through-line
 * that ties every headline to a typing championship. The hero amplifies it by
 * typing the whole headline out; every other headline just carries the caret.
 */
export default function CaretHeadline({
  segments,
  as: Tag = "h2",
  className = "",
  typed = false,
  typeSpeed = 42,
  caret = "punch",
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const full = segments.map((s) => s.text).join("");
  const [shown, setShown] = useState(typed && !reduce ? 0 : full.length);

  useEffect(() => {
    if (!typed || reduce) return;
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= full.length) clearInterval(id);
    }, typeSpeed);
    return () => clearInterval(id);
  }, [typed, reduce, inView, full.length, typeSpeed]);

  // Slice the visible characters across the segment boundaries.
  let remaining = shown;
  const rendered = segments.map((seg, idx) => {
    const take = Math.max(0, Math.min(seg.text.length, remaining));
    remaining -= take;
    const visible = seg.text.slice(0, take);
    const cls = seg.accent ? accentText[seg.accent] : "";
    return (
      <span key={idx} className={cls}>
        {visible}
      </span>
    );
  });

  return (
    <Tag
      ref={ref}
      className={`font-display leading-[1.12] tracking-normal text-balance ${className}`}
    >
      {rendered}
      <span
        aria-hidden="true"
        className={`ml-[0.08em] inline-block h-[0.82em] w-[0.5ch] translate-y-[0.06em] rounded-[2px] align-baseline animate-blink ${caretBg[caret]}`}
      />
    </Tag>
  );
}
