"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, Trophy, Radio } from "lucide-react";
import CaretHeadline from "@/components/primitives/CaretHeadline";
import CountUp from "@/components/primitives/CountUp";
import CharacterImage from "@/components/primitives/CharacterImage";
import Reveal from "@/components/primitives/Reveal";
import { REGISTER_URL } from "@/lib/config";
import { ease } from "@/lib/motion";

function HudStat({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
        {label}
      </span>
      <span className="font-mono text-base font-bold text-cream sm:text-lg">
        {children}
      </span>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-28 sm:pt-32 md:pb-28 md:pt-40">
      {/* ambient background: faint grid + soft color glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-punch/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[32rem] w-[32rem] rounded-full bg-sky/15 blur-[120px]"
      />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* left — the live typing run */}
        <div>
          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="chip !border-volt/30 !bg-volt/10 text-volt">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-volt" />
                </span>
                Registration open
              </span>
              <span className="chip">4-week championship · ages 5–12</span>
            </div>
          </Reveal>

          <CaretHeadline
            as="h1"
            typed
            caret="punch"
            className="mt-6 text-[2rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-[4.2rem]"
            segments={[
              { text: "The RapKids " },
              { text: "TypeMaster", accent: "punch" },
              { text: " Championship" },
            ]}
          />

          {/* HUD — reads like a live typing-test status bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 1.1 }}
            className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-2xl border border-line/15 bg-cream/[0.03] px-5 py-4 backdrop-blur-sm"
          >
            <HudStat label="Speed">
              <CountUp to={54} group={false} /> wpm
            </HudStat>
            <span className="h-8 w-px bg-line/20" aria-hidden />
            <HudStat label="Accuracy">
              <span className="text-volt">
                <CountUp to={99} group={false} suffix="%" />
              </span>
            </HudStat>
            <span className="hidden h-8 w-px bg-line/20 sm:block" aria-hidden />
            <div className="hidden min-w-[8rem] flex-1 sm:block">
              <div className="mb-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">
                Prize pool
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-cream/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-gold to-punch"
                  initial={{ width: reduce ? "100%" : 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.6, ease, delay: 0.4 }}
                />
              </div>
            </div>
            <HudStat label="Total">
              <span className="text-gold-grad">
                $<CountUp to={4000} />
              </span>
            </HudStat>
          </motion.div>

          <Reveal delay={0.15}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted text-pretty">
              Four weeks of competitive typing. $4,000 in cash prizes. A live
              Grand Final hosted by Jason — and one subscription enters your
              whole family.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={REGISTER_URL} className="btn-primary">
                Register your child
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#how-it-works" className="btn-ghost">
                <Play className="h-4 w-4" />
                See how it works
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <p className="mt-6 font-mono text-xs text-faint">
              Every child on an active RapKids plan can enter · one subscription
              covers up to 4 kids
            </p>
          </Reveal>
        </div>

        {/* right — champion character with floating credential chips */}
        <div className="relative hidden lg:block">
          <motion.div
            className="relative mx-auto aspect-[4/5] w-full max-w-sm"
            animate={reduce ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          >
            {/* glow platform behind the character */}
            <div
              aria-hidden
              className="absolute inset-x-6 bottom-6 top-10 rounded-[2rem] bg-gradient-to-b from-punch/25 via-sky/10 to-transparent blur-2xl"
            />
            <CharacterImage
              src="/characters/hero-champion.png"
              alt="A RapKids champion celebrating at the keyboard"
              placeholderLabel="characters/hero-champion.png"
              className="relative z-10 h-full w-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)]"
            />
          </motion.div>

          {/* floating credential chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 1 }}
            className="absolute -left-2 top-10 z-20 flex items-center gap-2 rounded-2xl border border-gold/25 bg-ink/80 px-4 py-3 backdrop-blur-md"
          >
            <Trophy className="h-5 w-5 text-gold" />
            <div className="leading-tight">
              <div className="font-display text-lg font-bold text-gold-grad">$4,000</div>
              <div className="font-mono text-[0.6rem] uppercase tracking-widest text-faint">
                30 cash winners
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 1.25 }}
            className="absolute -right-2 bottom-16 z-20 flex items-center gap-2 rounded-2xl border border-sky/25 bg-ink/80 px-4 py-3 backdrop-blur-md"
          >
            <Radio className="h-5 w-5 text-sky" />
            <div className="leading-tight">
              <div className="font-display text-sm font-bold text-cream">
                Live Grand Final
              </div>
              <div className="font-mono text-[0.6rem] uppercase tracking-widest text-faint">
                26 September
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
