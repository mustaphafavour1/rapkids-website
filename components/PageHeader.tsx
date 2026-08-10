import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import CaretHeadline, { type Segment, type Accent } from "@/components/primitives/CaretHeadline";
import Reveal from "@/components/primitives/Reveal";

type Props = {
  eyebrow: string;
  segments: Segment[];
  intro?: string;
  caret?: Accent;
  children?: React.ReactNode;
};

/** Inner-page hero band, offset below the fixed nav. */
export default function PageHeader({
  eyebrow,
  segments,
  intro,
  caret = "punch",
  children,
}: Props) {
  return (
    <header className="relative overflow-hidden bg-ink pb-16 pt-32 md:pb-20 md:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[40rem] -translate-x-1/2 rounded-full bg-punch/15 blur-[130px]"
      />
      <div className="container-page relative">
        <Reveal>
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 font-mono text-xs text-faint transition-colors hover:text-cream"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Back to the championship
          </Link>
        </Reveal>
        <p className="eyebrow mb-4">{eyebrow}</p>
        <CaretHeadline
          as="h1"
          caret={caret}
          segments={segments}
          className="max-w-4xl text-4xl sm:text-5xl md:text-6xl"
        />
        {intro ? (
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted text-pretty">
              {intro}
            </p>
          </Reveal>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </header>
  );
}
