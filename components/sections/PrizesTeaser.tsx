"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Crown } from "lucide-react";
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
      {primary && <Crown className="mb-2 h-6 w-6 text-gold" />}
      <div className="mb-2 text-center">
        <div
          className={`font-display font-bold ${
            primary ? "text-3xl text-gold-grad" : "text-2xl text-gold/80"
          }`}
        >
          {amount}
        </div>
      </div>
      <motion.div
        className={`relative w-full overflow-hidden rounded-t-xl ${
          primary
            ? "bg-gradient-to-t from-gold/30 to-gold"
            : "bg-gradient-to-t from-gold/15 to-gold/60"
        }`}
        style={{ height: barHeight, transformOrigin: "bottom" }}
        initial={{ scaleY: reduce ? 1 : 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease, delay }}
      >
        <span className="absolute inset-x-0 top-2 text-center font-display text-4xl font-bold text-ink/30">
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
    <Section id="prizes" tone="surface">
      <SectionHeader
        eyebrow="The prizes"
        caret="gold"
        align="center"
        segments={[
          { text: "$4,000, and 30 Ways ", accent: "gold" },
          { text: "to Win It" },
        ]}
        intro="Thirty children win cash. Hundreds more win free months, badges and a certificate, with their name in the record books."
        moreHref="/prizes"
        moreLabel="See the full prize breakdown"
      />

      {/* Grand Final podium, centered */}
      <div className="mx-auto mt-14 max-w-md">
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="chip !border-gold/30 !bg-gold/10 text-gold">
            Grand Final · 26 Sep
          </span>
          <span className="font-mono text-xs text-faint">$1,600 on finals day</span>
        </div>
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
        <p className="mt-5 text-center font-mono text-xs text-faint">
          Per bracket, live. Juniors and Seniors each crown a Grand Champion.
        </p>
      </div>

      {/* Weekly heat prizes, shown underneath as multi-line chips */}
      <div className="mx-auto mt-14 max-w-3xl">
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="chip">Every weekly heat</span>
          <span className="font-mono text-xs text-faint">
            $300 per bracket · $2,400 across 4 heats
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {weeklyPrizes.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <div className="flex h-full flex-col gap-2 rounded-lg border border-line/15 bg-cream/[0.03] px-5 py-4">
                <span className="font-display text-lg font-bold text-cream">
                  {p.name}
                </span>
                <span className="text-xs leading-snug text-muted">{p.how}</span>
                <span className="mt-1 font-display text-2xl font-bold text-gold-grad">
                  {p.amount}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
