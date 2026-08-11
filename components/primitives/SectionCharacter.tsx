"use client";

import { motion, useReducedMotion } from "framer-motion";
import CharacterImage from "./CharacterImage";

type Props = {
  src: string;
  alt: string;
  side: "left" | "right";
  /** which corner: defaults to the section's bottom edge */
  vertical?: "top" | "bottom";
  placeholderLabel?: string;
};

/**
 * A comic-character cutout that peeks in from a section's corner, bare, no
 * card/container, sitting in the section's own whitespace so it complements
 * the content instead of covering it. Desktop only: at typical viewport
 * widths there isn't reliably enough margin outside the centered content
 * column to place it without ever overlapping copy on smaller desktop sizes,
 * so it's hidden below the xl breakpoint.
 */
export default function SectionCharacter({
  src,
  alt,
  side,
  vertical = "bottom",
  placeholderLabel,
}: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute z-0 hidden xl:block ${
        vertical === "top" ? "top-[16%]" : "bottom-0"
      } ${side === "left" ? "left-2" : "right-2"}`}
      animate={reduce ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
    >
      <CharacterImage
        src={src}
        alt={alt}
        placeholderLabel={placeholderLabel}
        className="h-48 w-auto object-contain opacity-95 drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] md:h-60"
      />
    </motion.div>
  );
}
