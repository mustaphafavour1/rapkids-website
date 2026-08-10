"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import Section from "@/components/primitives/Section";
import SectionHeader from "@/components/primitives/SectionHeader";
import Reveal from "@/components/primitives/Reveal";
import { fairness } from "@/lib/content";
import { SHADOW_RANK_URL } from "@/lib/config";
import { ease } from "@/lib/motion";

/* 1 — two brackets: kids matched within their own age lane */
function BracketLanes() {
  const reduce = useReducedMotion();
  const Lane = ({
    label,
    ages,
    color,
    count,
  }: {
    label: string;
    ages: string;
    color: "punch" | "sky";
    count: number;
  }) => (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 ${
        color === "punch"
          ? "border-punch/25 bg-punch/[0.07]"
          : "border-sky/25 bg-sky/[0.07]"
      }`}
    >
      <div className="leading-tight">
        <div className="font-display text-sm font-bold text-cream">{label}</div>
        <div className="font-mono text-[0.6rem] uppercase tracking-widest text-faint">
          Ages {ages}
        </div>
      </div>
      <div className="flex -space-x-1.5">
        {Array.from({ length: count }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease, delay: i * 0.07 }}
            className={`h-6 w-6 rounded-full border-2 border-surface ${
              color === "punch" ? "bg-punch" : "bg-sky"
            }`}
          />
        ))}
      </div>
    </div>
  );
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <Lane label="Juniors" ages="5–8" color="punch" count={5} />
      <div className="flex items-center justify-center gap-2">
        <span className="h-px w-8 bg-line/20" />
        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-faint">
          never mixed
        </span>
        <span className="h-px w-8 bg-line/20" />
      </div>
      <Lane label="Seniors" ages="9–12" color="sky" count={5} />
    </div>
  );
}

/* 2 — clean slate Monday: the leaderboard collapses to zero and refills */
function MondayReset() {
  const reduce = useReducedMotion();
  const bars = [0.9, 0.62, 0.78, 0.45];
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="mb-2 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-widest text-faint">
        <span>Leaderboard</span>
        <span className="text-volt">MON · 00:00</span>
      </div>
      <div className="flex h-24 items-end gap-2.5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-punch/40 to-punch"
            style={{ transformOrigin: "bottom" }}
            initial={{ scaleY: h }}
            animate={
              reduce
                ? { scaleY: h }
                : { scaleY: [h, 0.04, 0.04, h] }
            }
            transition={{
              duration: 3.6,
              times: [0, 0.35, 0.5, 1],
              ease,
              repeat: Infinity,
              repeatDelay: 1.2,
              delay: i * 0.05,
            }}
          >
            <div className="h-24 w-full" />
          </motion.div>
        ))}
      </div>
      <div className="mt-2 h-px w-full bg-line/20" />
      <div className="mt-1 font-mono text-[0.6rem] text-faint">
        every board back to zero
      </div>
    </div>
  );
}

/* 3 — one subscription, up to four children each with their own board */
function FamilyFanout() {
  const reduce = useReducedMotion();
  const kids = ["Ada", "Zed", "Kai", "Mia"];
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="flex items-center gap-2 self-start rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5">
        <Users className="h-3.5 w-3.5 text-gold" />
        <span className="font-mono text-[0.62rem] uppercase tracking-widest text-gold">
          1 subscription
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {kids.map((k, i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease, delay: 0.15 + i * 0.09 }}
            className="flex items-center justify-between rounded-lg border border-line/15 bg-cream/[0.03] px-2.5 py-2"
          >
            <span className="text-sm font-semibold text-cream">{k}</span>
            <span className="font-mono text-[0.62rem] text-volt">
              #{i + 1}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="font-mono text-[0.6rem] text-faint">
        up to 4 kids · 4 boards · 4 chances
      </div>
    </div>
  );
}

const visuals = [BracketLanes, MondayReset, FamilyFanout];

export default function Fairness() {
  return (
    <Section tone="surface">
      <SectionHeader
        eyebrow="Built to be fair"
        caret="sky"
        segments={[
          { text: "Always a " },
          { text: "fair fight", accent: "sky" },
        ]}
        intro="No child is ever out of it. Same-age brackets, a clean slate every week, and a plan that lets your whole family compete."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line/15 bg-line/10 md:grid-cols-3">
        {fairness.map((f, i) => {
          const Visual = visuals[i];
          return (
            <Reveal
              key={f.key}
              delay={i * 0.1}
              className="flex flex-col gap-6 bg-surface p-7"
            >
              <div className="h-40">
                <Visual />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold leading-snug text-cream">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {f.body}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* shadow-rank band */}
      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl border border-line/15 bg-gradient-to-r from-ink to-surface p-7 sm:flex-row sm:items-center md:p-9">
          <div className="max-w-xl">
            <div className="mb-2 flex items-center gap-2 font-mono text-xs text-faint">
              <span>shadow rank</span>
              <span className="text-line/40">›</span>
              <span className="text-cream">#—</span>
              <ArrowRight className="h-3 w-3 text-faint" />
              <span className="text-volt">#12 this week</span>
            </div>
            <h3 className="font-display text-xl font-bold text-cream sm:text-2xl">
              Not subscribed yet?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Try a free practice round and see exactly where your child would
              rank today — no card, no commitment.
            </p>
          </div>
          <a href={SHADOW_RANK_URL} className="btn-ghost shrink-0">
            See your child&apos;s shadow rank
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
