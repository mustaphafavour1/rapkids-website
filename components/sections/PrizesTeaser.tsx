"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Crown, ArrowRight } from "lucide-react";
import Section from "@/components/primitives/Section";
import SectionHeader from "@/components/primitives/SectionHeader";
import Reveal from "@/components/primitives/Reveal";
import { weeklyPrizes } from "@/lib/content";
import { ease } from "@/lib/motion";

function PodiumBar({
  place,
  label,
  amount,
  order,
  barHeight,
  primary = false,
  delay = 0,
}: {
  place: string;
  label: string;
  amount: string;
  barHeight: number;
  order: string;
  primary?: boolean;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={`flex w-full flex-col items-center justify-end ${order}`}>
      {primary && <Crown className="mb-2 h-6 w-6 text-punch" />}
      <div className="mb-2 text-center">
        <div
          className={`font-display font-bold ${
            primary ? "text-3xl text-punch" : "text-2xl text-cream/80"
          }`}
        >
          {amount}
        </div>
      </div>
      <motion.div
        className={`relative w-full overflow-hidden rounded-t-xl ${
          primary
            ? "bg-gradient-to-t from-punch/80 to-punch"
            : "bg-gradient-to-t from-punch/45 to-punch/75"
        }`}
        style={{ height: barHeight, transformOrigin: "bottom" }}
        initial={{ scaleY: reduce ? 1 : 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease, delay }}
      >
        <span className="absolute inset-x-0 top-2 text-center font-display text-4xl font-bold text-white/45">
          {place}
        </span>
      </motion.div>
      <div className="mt-3 text-center">
        <div className="text-sm font-semibold text-cream">{label}</div>
      </div>
    </div>
  );
}

export default function PrizesTeaser() {
  return (
    <Section id="prizes" tone="cream">
      <SectionHeader
        eyebrow="The prizes"
        caret="punch"
        align="center"
        tone="onColor"
        segments={[
          { text: "$4,000, and 30 Ways ", accent: "punch" },
          { text: "to Win It" },
        ]}
        intro="Thirty children win cash. Hundreds more win free months, badges and a certificate, with their name in the record books."
      />

      {/* Grand Final podium, centered */}
      <div className="mx-auto mt-8 max-w-md">
        <div className="flex items-end justify-center gap-3 sm:gap-4">
          <PodiumBar
            place="2"
            label="Runner-Up"
            amount="$200"
            barHeight={132}
            order="order-1"
            delay={0.15}
          />
          <PodiumBar
            place="1"
            label="Grand Champion"
            amount="$500"
            barHeight={208}
            order="order-2"
            primary
            delay={0}
          />
          <PodiumBar
            place="3"
            label="Third Place"
            amount="$100"
            barHeight={92}
            order="order-3"
            delay={0.3}
          />
        </div>
        <p className="mt-5 text-center font-mono text-xs text-cream/70">
          Per bracket, live. Juniors and Seniors each crown a Grand Champion.
        </p>
      </div>

      {/* Weekly heat prizes */}
      <div className="mx-auto mt-14 max-w-3xl">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          <span className="chip-solid">Weekly heats</span>
          <span className="font-mono text-xs text-cream/80">
            $300 to be won every week before the Grand Final
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {weeklyPrizes.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div className="flex h-full items-center gap-4 rounded-lg border border-cream/10 bg-white/50 px-5 py-4">
                <span className="shrink-0 font-display text-2xl font-bold text-gold-grad">
                  {p.amount}
                </span>
                <span className="h-10 w-px shrink-0 bg-cream/15" aria-hidden />
                <div className="min-w-0">
                  <div className="font-display text-base font-bold leading-tight text-cream">
                    {p.name}
                  </div>
                  <div className="mt-0.5 text-xs leading-snug text-muted">
                    {p.how}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Full breakdown link, last thing in the section */}
      <Reveal delay={0.15}>
        <div className="mt-12 flex justify-center">
          <Link href="/prizes" className="btn-ghost">
            Full Prize Breakdown
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
