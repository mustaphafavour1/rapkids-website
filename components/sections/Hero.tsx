"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Trophy, CalendarDays } from "lucide-react";
import CaretHeadline from "@/components/primitives/CaretHeadline";
import CountUp from "@/components/primitives/CountUp";
import CharacterImage from "@/components/primitives/CharacterImage";
import Reveal from "@/components/primitives/Reveal";
import { ease } from "@/lib/motion";

function HudStat({
  label,
  size = "md",
  children,
}: {
  label: string;
  size?: "md" | "sm";
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <span
        className={`font-mono uppercase tracking-[0.18em] text-faint ${
          size === "sm" ? "text-[0.55rem]" : "text-[0.62rem]"
        }`}
      >
        {label}
      </span>
      <span
        className={`font-mono font-bold text-cream ${
          size === "sm" ? "text-sm" : "text-base sm:text-lg"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-gradient-to-br from-punch via-punch to-blush pb-20 pt-28 sm:pt-32 md:pb-24 md:pt-36">
      {/* soft sheen on the character side for depth on the saturated gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(255,255,255,0.20),transparent_55%)]"
      />

      <div className="container-page relative grid w-full items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* left — headline, offer, action */}
        <div className="text-white">
          {/* min-height reserves ~3 lines so the subtitle and buttons don't jump
             as the headline types itself out */}
          <CaretHeadline
            as="h1"
            typed
            caret="spark"
            className="min-h-[3.4em] text-[2.35rem] leading-[1.08] sm:text-6xl md:text-7xl lg:text-[4.6rem]"
            segments={[
              { text: "$4,000", accent: "spark" },
              { text: " Up for Grabs for Kids in the TypeMaster Championship" },
            ]}
          />

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 text-pretty">
              Four weeks of competitive typing game. $4,000 in cash prizes. For
              kids between ages 9 to 12.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/register" className="btn-on-color">
                Register your child
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#how-it-works" className="btn-ghost-on-color">
                See how it works
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <span className="chip-on-dark">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                Registration open
              </span>
              <span className="chip-on-dark">4-week championship</span>
              <span className="chip-on-dark">Ages 9 to 12</span>
            </div>
          </Reveal>
        </div>

        {/* right — champion character with floating credential chips + a mini HUD */}
        <div className="hidden lg:block">
          <div className="relative">
            <motion.div
              className="relative mx-auto aspect-[4/5] w-full max-w-sm"
              animate={reduce ? undefined : { y: [0, -12, 0] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            >
              {/* glow platform behind the character */}
              <div
                aria-hidden
                className="absolute inset-x-6 bottom-6 top-10 rounded-[2rem] bg-gradient-to-b from-white/25 via-white/10 to-transparent blur-2xl"
              />
              <CharacterImage
                src="/characters/hero-champion.png"
                alt="A RapKids champion celebrating at the keyboard"
                placeholderLabel="characters/hero-champion.png"
                className="relative z-10 h-full w-full object-contain drop-shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
              />
            </motion.div>

            {/* floating credential chips */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 1 }}
              className="absolute -left-2 top-10 z-20 flex items-center gap-2 rounded-2xl border border-gold/25 bg-ink/90 px-4 py-3 shadow-xl shadow-black/10 backdrop-blur-md"
            >
              <Trophy className="h-5 w-5 text-gold" />
              <div className="leading-tight">
                <div className="font-display text-xl font-bold text-gold-grad">$4,000</div>
                <div className="font-mono text-[0.6rem] uppercase tracking-widest text-faint">
                  15 cash winners
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 1.25 }}
              className="absolute -right-2 bottom-16 z-20 flex items-center gap-2 rounded-2xl border border-sky/25 bg-ink/90 px-4 py-3 shadow-xl shadow-black/10 backdrop-blur-md"
            >
              <CalendarDays className="h-5 w-5 text-sky" />
              <div className="leading-tight">
                <div className="font-display text-base font-bold text-cream">
                  Live Grand Final
                </div>
                <div className="font-mono text-[0.6rem] uppercase tracking-widest text-faint">
                  26 September
                </div>
              </div>
            </motion.div>
          </div>

          {/* mini typing HUD, half the size of the old in-column version */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 1.4 }}
            className="mx-auto mt-6 flex max-w-sm items-center justify-center gap-x-4 rounded-xl border border-line/10 bg-ink/90 px-3 py-2 shadow-lg shadow-black/10 backdrop-blur-sm"
          >
            <HudStat label="Speed" size="sm">
              <CountUp to={54} group={false} /> wpm
            </HudStat>
            <span className="h-5 w-px bg-line/20" aria-hidden />
            <HudStat label="Accuracy" size="sm">
              <span className="text-punch">
                <CountUp to={99} group={false} suffix="%" />
              </span>
            </HudStat>
            <span className="h-5 w-px bg-line/20" aria-hidden />
            <HudStat label="Total" size="sm">
              <span className="text-gold-grad">
                $<CountUp to={4000} />
              </span>
            </HudStat>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
