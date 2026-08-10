import type { ReactNode } from "react";

type Props = {
  id?: string;
  children: ReactNode;
  /** background rhythm: base ink, or a stepped surface */
  tone?: "ink" | "surface";
  className?: string;
  /** remove default container to let a child go full-bleed */
  bleed?: boolean;
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
}: Props) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 py-24 sm:py-28 md:py-36 ${
        tone === "surface" ? "bg-surface" : "bg-ink"
      } ${className}`}
    >
      {bleed ? children : <div className="container-page">{children}</div>}
    </section>
  );
}
