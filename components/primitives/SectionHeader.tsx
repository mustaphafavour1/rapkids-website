import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CaretHeadline, { type Segment, type Accent } from "./CaretHeadline";
import Reveal from "./Reveal";

type Props = {
  eyebrow?: string;
  segments: Segment[];
  intro?: string;
  align?: "left" | "center";
  caret?: Accent;
  moreHref?: string;
  moreLabel?: string;
  className?: string;
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
}: Props) {
  const centered = align === "center";
  return (
    <div
      className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow ? (
        <Reveal>
          <p className="eyebrow mb-4">{eyebrow}</p>
        </Reveal>
      ) : null}
      <CaretHeadline
        as="h2"
        segments={segments}
        caret={caret}
        className="text-4xl sm:text-5xl md:text-[3.4rem]"
      />
      {intro ? (
        <Reveal delay={0.05}>
          <p
            className={`mt-5 text-lg leading-relaxed text-muted text-pretty ${
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
            className={`link-more mt-6 ${centered ? "justify-center" : ""}`}
          >
            {moreLabel ?? "See more"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      ) : null}
    </div>
  );
}
