import type { ReactNode } from "react";
import SectionCharacter from "./SectionCharacter";

type Props = {
  id?: string;
  children: ReactNode;
  /** background rhythm: base white, a stepped lavender surface, or a soft accent tint */
  tone?: "ink" | "surface" | "gold" | "volt" | "peach";
  className?: string;
  /** remove default container to let a child go full-bleed */
  bleed?: boolean;
  /** an optional comic-character cutout peeking from a section corner */
  character?: {
    src: string;
    alt: string;
    side: "left" | "right";
    vertical?: "top" | "bottom";
    placeholderLabel?: string;
  };
};

const toneClass: Record<NonNullable<Props["tone"]>, string> = {
  ink: "bg-ink",
  surface: "bg-surface",
  gold: "bg-gold/[0.07]",
  volt: "bg-volt/[0.07]",
  peach: "bg-peach/[0.07]",
};

/**
 * Standard section shell. Enforces the generous vertical rhythm (~1.75x what
 * would otherwise feel enough) and the ~4% responsive page gutter.
 */
export default function Section({
  id,
  children,
  tone = "ink",
  className = "",
  bleed = false,
  character,
}: Props) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 overflow-hidden py-24 sm:py-28 md:py-36 ${toneClass[tone]} ${className}`}
    >
      {bleed ? children : <div className="container-page">{children}</div>}
      {character ? <SectionCharacter {...character} /> : null}
    </section>
  );
}
