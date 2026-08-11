import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CaretHeadline, { type Segment, type Accent } from "./CaretHeadline";
import Reveal from "./Reveal";

/**
 * tone controls how the header reads against its section background:
 *  - "page"    default dark-on-light for white / surface sections
 *  - "onColor" dark text tuned for a bright solid-color section (gold / lime)
 *  - "onDark"  white text for a dark solid-color section (peach / gradient)
 */
type Tone = "page" | "onColor" | "onDark";

type Props = {
  eyebrow?: string;
  segments: Segment[];
  intro?: string;
  align?: "left" | "center";
  caret?: Accent;
  moreHref?: string;
  moreLabel?: string;
  className?: string;
  tone?: Tone;
  /** purple-outline the accent keyword (keeps a cream accent legible on light) */
  accentOutline?: boolean;
};

const eyebrowTone: Record<Tone, string> = {
  page: "",
  onColor: "!text-cream/90",
  onDark: "!text-white/80",
};

const introTone: Record<Tone, string> = {
  page: "text-muted",
  onColor: "text-cream/85",
  onDark: "text-white/90",
};

const linkTone: Record<Tone, string> = {
  page: "",
  onColor: "",
  onDark: "!text-white hover:!text-white",
};

/** Eyebrow + caret headline + optional intro and see-more link. */
export default function SectionHeader({
  eyebrow,
  segments,
  intro,
  align = "left",
  caret = "punch",
  moreHref,
  moreLabel,
  className = "",
  tone = "page",
  accentOutline = false,
}: Props) {
  const centered = align === "center";
  return (
    <div
      className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${
        tone === "onDark" ? "text-white" : ""
      } ${className}`}
    >
      {eyebrow ? (
        <Reveal>
          <p className={`eyebrow mb-4 ${eyebrowTone[tone]}`}>{eyebrow}</p>
        </Reveal>
      ) : null}
      <CaretHeadline
        as="h2"
        segments={segments}
        caret={caret}
        accentOutline={accentOutline}
        className="text-4xl sm:text-5xl md:text-[3.4rem]"
      />
      {intro ? (
        <Reveal delay={0.05}>
          <p
            className={`mt-5 text-lg leading-relaxed text-pretty ${introTone[tone]} ${
              centered ? "mx-auto" : ""
            }`}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
      {moreHref ? (
        <Reveal delay={0.1}>
          <Link
            href={moreHref}
            className={`link-more mt-6 ${linkTone[tone]} ${centered ? "justify-center" : ""}`}
          >
            {moreLabel ?? "See more"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      ) : null}
    </div>
  );
}
