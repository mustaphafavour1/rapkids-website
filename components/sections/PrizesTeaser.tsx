"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Crown, Sparkles, BookOpen } from "lucide-react";
import Section from "@/components/primitives/Section";
import SectionHeader from "@/components/primitives/SectionHeader";
import Reveal from "@/components/primitives/Reveal";
import CharacterImage from "@/components/primitives/CharacterImage";
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
          className={`font-display font-extrabold ${
            primary ? "text-2xl text-gold-grad" : "text-xl text-gold/80"
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
        <span className="absolute inset-x-0 top-2 text-center font-display text-3xl font-extrabold text-ink/30">
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
        segments={[
          { text: "$4,000, and 30 ways ", accent: "gold" },
          { text: "to win it" },
        ]}
        intro="Thirty children win cash. Hundreds more win free months, badges and a certificate — with their name in the record books."
        moreHref="/prizes"
        moreLabel="See the full prize breakdown"
      />

      <div className="mt-16 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        {/* Grand Final podium */}
        <div>
          <div className="mb-6 flex items-center gap-2">
            <span className="chip !border-gold/30 !bg-gold/10 text-gold">
              Grand Final · 26 Sep
            </span>
            <span className="font-mono text-xs text-faint">$1,600 on finals day</span>
          </div>
          <div className="flex items-end gap-3 sm:gap-4">
            <PodiumBar
              place="2"
              label="Runner-up"
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
              label="Third place"
              amount="$100"
              barHeight={92}
              order="order-3"
              delay={0.3}
            />
          </div>
          <p className="mt-5 font-mono text-xs text-faint">
            Per bracket, live. Juniors and Seniors each crown a Grand Champion.
          </p>
        </div>

        {/* weekly heats + beyond cash */}
        <div>
          <div className="mb-5 flex items-center gap-2">
            <span className="chip">Every weekly heat</span>
            <span className="font-mono text-xs text-faint">
              $300 per bracket · $2,400 across 4 heats
            </span>
          </div>

          <ul className="divide-y divide-line/15">
            {weeklyPrizes.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 0.08}>
                <span className="flex items-center justify-between gap-4 py-4">
                  <span>
                    <span className="block font-display text-base font-bold text-cream">
                      {p.name}
                    </span>
                    <span className="block text-xs text-muted">{p.how}</span>
                  </span>
                  <span className="font-display text-xl font-extrabold text-gold/90">
                    {p.amount}
                  </span>
                </span>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-sky/20 bg-sky/[0.05] p-4">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-sky" />
              <p className="text-sm leading-relaxed text-muted">
                <span className="text-cream">Beyond cash:</span> free
                subscription months, podium &amp; streak badges, avatar frames,
                and a stats certificate for every child who plays 10+ active
                days.
              </p>
            </div>
          </Reveal>

          {/* comic-character reward */}
          <Reveal delay={0.28}>
            <div className="mt-4 flex items-center gap-4 rounded-2xl border border-gold/20 bg-gradient-to-r from-gold/[0.08] to-transparent p-4">
              <CharacterImage
                src="/characters/comic-champion.png"
                alt="A RapKids comic character"
                placeholderLabel="characters/comic-champion.png"
                className="h-16 w-16 shrink-0 object-contain"
              />
              <p className="text-sm leading-relaxed text-muted">
                <span className="inline-flex items-center gap-1.5 font-semibold text-gold">
                  <BookOpen className="h-4 w-4" /> The rarest prize:
                </span>{" "}
                the two Grand Champions are drawn into an actual RapKids comic as
                a character.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
