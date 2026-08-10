"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Infinity as InfinityIcon, Flame, Gauge } from "lucide-react";
import CaretHeadline from "@/components/primitives/CaretHeadline";
import Section from "@/components/primitives/Section";
import Reveal from "@/components/primitives/Reveal";
import { ease } from "@/lib/motion";

function RunRow({
  run,
  name,
  wpm,
  acc,
  score,
  winner = false,
  delay = 0,
}: {
  run: string;
  name: string;
  wpm: number;
  acc: number;
  score: number;
  winner?: boolean;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, x: reduce ? 0 : -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease, delay }}
      className={`relative flex items-center justify-between gap-4 rounded-xl px-4 py-3.5 ${
        winner
          ? "bg-punch/10 ring-1 ring-punch/40"
          : "bg-cream/[0.02]"
      }`}
    >
      {winner && !reduce && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-xl ring-2 ring-punch/30"
          animate={{ opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 2.4, ease, repeat: Infinity }}
        />
      )}
      <div className="relative flex items-center gap-3">
        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-faint">
          {run}
        </span>
        <span className="font-display text-sm font-bold text-cream">{name}</span>
      </div>
      <div className="relative flex items-center gap-4">
        <div className="text-right">
          <div className="font-mono text-xs text-muted">{wpm} wpm</div>
        </div>
        <div className="text-right">
          <div
            className={`font-mono text-xs ${winner ? "text-volt" : "text-muted"}`}
          >
            {acc}% acc
          </div>
        </div>
        <div className="flex w-16 items-center justify-end gap-1.5">
          <span
            className={`font-display text-lg font-extrabold ${
              winner ? "text-punch" : "text-faint"
            }`}
          >
            {score}
          </span>
          {winner && <Check className="h-4 w-4 text-punch" />}
        </div>
      </div>
    </motion.div>
  );
}

const facts = [
  { icon: Gauge, text: "Accuracy counts more than raw speed" },
  { icon: Flame, text: "Play all 7 days → +20% on the week" },
  { icon: InfinityIcon, text: "Unlimited practice · 10 scored tries a day" },
];

export default function AboutTeaser() {
  return (
    <Section
      id="about"
      tone="ink"
      character={{
        src: "/characters/char-about.png",
        alt: "A RapKids character typing confidently",
        side: "right",
        placeholderLabel: "characters/char-about.png",
      }}
    >
      <div className="grid items-center gap-14 lg:grid-cols-2">
        {/* text */}
        <div>
          <p className="eyebrow mb-4">Why it works</p>
          <CaretHeadline
            as="h2"
            caret="punch"
            className="text-3xl sm:text-4xl md:text-[2.9rem]"
            segments={[
              { text: "A habit worth " },
              { text: "showing up for", accent: "punch" },
            ]}
          />
          <Reveal delay={0.05}>
            <p className="mt-5 text-lg leading-relaxed text-muted text-pretty">
              Accuracy counts more than speed. A child at 40 wpm and 98%
              accuracy beats one racing at 45 and 90% — the habit that&apos;s
              hardest to fake, and the one worth building.
            </p>
          </Reveal>

          <ul className="mt-7 space-y-3">
            {facts.map((f, i) => (
              <Reveal as="li" key={f.text} delay={0.1 + i * 0.07}>
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cream/[0.05] text-sky">
                    <f.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-cream">{f.text}</span>
                </span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.3}>
            <Link href="/about" className="link-more mt-8">
              Read the full story — scoring, the Grand Final &amp; more
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        {/* face-off readout */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-line/15 bg-surface/60 p-5 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2 border-b border-line/15 pb-3">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-punch/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-volt/70" />
              </span>
              <span className="ml-1 font-mono text-[0.68rem] text-faint">
                same-test.run — who wins?
              </span>
            </div>
            <div className="space-y-2.5">
              <RunRow
                run="A"
                name="Ada"
                wpm={40}
                acc={98}
                score={96}
                winner
                delay={0.1}
              />
              <RunRow
                run="B"
                name="Zed"
                wpm={45}
                acc={90}
                score={88}
                delay={0.25}
              />
            </div>
            <p className="mt-4 font-mono text-[0.72rem] leading-relaxed text-faint">
              <span className="text-cream">Fewer mistakes win.</span> Slow down a
              little and your score barely moves; type fast and sloppy and it
              drops fast.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
