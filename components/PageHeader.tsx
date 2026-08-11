import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import CaretHeadline, { type Segment, type Accent } from "@/components/primitives/CaretHeadline";
import CharacterImage from "@/components/primitives/CharacterImage";
import Reveal from "@/components/primitives/Reveal";

type Props = {
  eyebrow: string;
  segments: Segment[];
  intro?: string;
  caret?: Accent;
  children?: React.ReactNode;
  /** full purple->pink gradient band with white text (matches the home hero) */
  gradient?: boolean;
  /** optional character cutout shown on the right (desktop) */
  character?: { src: string; alt: string; placeholderLabel?: string };
  /** center the eyebrow/headline/intro */
  align?: "left" | "center";
};

/** Inner-page hero band, offset below the fixed nav. */
export default function PageHeader({
  eyebrow,
  segments,
  intro,
  caret = "punch",
  children,
  gradient = false,
  character,
  align = "left",
}: Props) {
  const centered = align === "center";
  const copy = (
    <div className={`${gradient ? "text-white" : ""} ${centered ? "text-center" : ""}`}>
      <Reveal>
        <Link
          href="/"
          className={`mb-8 inline-flex items-center gap-1.5 font-mono text-xs transition-colors ${
            gradient ? "text-white/70 hover:text-white" : "text-faint hover:text-cream"
          }`}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Back to the championship
        </Link>
      </Reveal>
      <p className={`eyebrow mb-4 ${gradient ? "!text-white/80" : ""}`}>{eyebrow}</p>
      <CaretHeadline
        as="h1"
        caret={caret}
        segments={segments}
        className={`text-5xl sm:text-6xl md:text-7xl ${centered ? "mx-auto max-w-4xl" : "max-w-4xl"}`}
      />
      {intro ? (
        <Reveal delay={0.08}>
          <p
            className={`mt-6 text-lg leading-relaxed text-pretty ${
              centered ? "mx-auto max-w-2xl" : "max-w-2xl"
            } ${gradient ? "text-white/90" : "text-muted"}`}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
      {children ? <div className="mt-8">{children}</div> : null}
    </div>
  );

  return (
    <header
      className={`relative overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40 ${
        gradient ? "bg-gradient-to-br from-punch via-punch to-blush" : "bg-ink"
      }`}
    >
      {gradient ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_25%,rgba(255,255,255,0.18),transparent_55%)]"
        />
      ) : (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-25" />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[40rem] -translate-x-1/2 rounded-full bg-punch/15 blur-[130px]"
          />
        </>
      )}

      {character ? (
        <div className="container-page relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {copy}
          <div className="hidden lg:block">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
              <div
                aria-hidden
                className="absolute inset-x-6 bottom-6 top-10 rounded-[2rem] bg-gradient-to-b from-white/25 via-white/10 to-transparent blur-2xl"
              />
              <CharacterImage
                src={character.src}
                alt={character.alt}
                placeholderLabel={character.placeholderLabel}
                className="relative z-10 h-full w-full object-contain drop-shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="container-page relative">{copy}</div>
      )}
    </header>
  );
}
