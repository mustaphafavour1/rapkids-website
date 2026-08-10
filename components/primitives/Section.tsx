import type { ReactNode } from "react";
import SectionCharacter from "./SectionCharacter";

type Props = {
  id?: string;
  children: ReactNode;
  /** background rhythm: base ink, or a stepped surface */
  tone?: "ink" | "surface";
  className?: string;
  /** remove default container to let a child go full-bleed */
  bleed?: boolean;
  /** an optional comic-character cutout peeking from a bottom corner */
  character?: {
    src: string;
    alt: string;
    side: "left" | "right";
    placeholderLabel?: string;
  };
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
      className={`relative scroll-mt-24 overflow-hidden py-24 sm:py-28 md:py-36 ${
        tone === "surface" ? "bg-surface" : "bg-ink"
      } ${className}`}
    >
      {bleed ? children : <div className="container-page">{children}</div>}
      {character ? <SectionCharacter {...character} /> : null}
    </section>
  );
}
