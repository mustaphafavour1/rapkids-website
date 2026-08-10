import { ArrowRight } from "lucide-react";
import CaretHeadline from "@/components/primitives/CaretHeadline";
import Reveal from "@/components/primitives/Reveal";
import { REGISTER_URL, SHADOW_RANK_URL } from "@/lib/config";

const ribbon = [
  "$4,000 PRIZE POOL",
  "30 CASH WINNERS",
  "TWO AGE BRACKETS",
  "FOUR WEEKLY HEATS",
  "LIVE GRAND FINAL · 26 SEP",
  "ONE PLAN, THE WHOLE FAMILY",
];

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[42rem] -translate-x-1/2 rounded-full bg-punch/15 blur-[130px]"
      />

      {/* marquee ribbon */}
      <div className="relative mb-16 flex overflow-hidden border-y border-line/15 py-4">
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
          {[...ribbon, ...ribbon].map((r, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {r}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-punch" aria-hidden />
            </span>
          ))}
        </div>
        <div
          aria-hidden
          className="flex shrink-0 animate-marquee items-center gap-8 pr-8"
        >
          {[...ribbon, ...ribbon].map((r, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {r}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-punch" aria-hidden />
            </span>
          ))}
        </div>
      </div>

      <div className="container-page relative text-center">
        <CaretHeadline
          as="h2"
          caret="punch"
          className="mx-auto max-w-4xl text-4xl sm:text-6xl md:text-7xl"
          segments={[
            { text: "Ready. Set. " },
            { text: "Type", accent: "punch" },
            { text: "." },
          ]}
        />
        <Reveal delay={0.05}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">
            Every child on an active RapKids plan can enter — and one
            subscription enters your whole family. The first heat is a fresh
            leaderboard away.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={REGISTER_URL} className="btn-primary">
              Register your child
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href={SHADOW_RANK_URL} className="btn-ghost">
              See your child&apos;s shadow rank
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <span className="chip">Warm-up · 12–23 Aug</span>
            <span className="chip">Heats · 24 Aug – 20 Sep</span>
            <span className="chip !border-gold/30 !bg-gold/10 text-gold">
              Grand Final · 26 Sep
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
