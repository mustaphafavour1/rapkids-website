"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ease, viewportOnce } from "@/lib/motion";

type Props = {
  children: ReactNode;
  /** delay in seconds */
  delay?: number;
  /** vertical travel distance in px */
  y?: number;
  className?: string;
  as?: "div" | "span" | "li" | "p" | "section";
};

/**
 * Scroll-into-view fade + rise. Under prefers-reduced-motion it actively drives
 * the element to its visible state immediately (not gated on the viewport
 * observer), so content is never left hidden for reduced-motion users. Keeps the
 * same element type in both branches so framer-motion never leaves a stale
 * inline opacity on a reused DOM node.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  as = "div",
}: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    return (
      <MotionTag className={className} initial={false} animate={{ opacity: 1, y: 0 }}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </MotionTag>
  );
}
