"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Camera,
  Mic,
  Lock,
  EyeOff,
  BadgeDollarSign,
  UserCheck,
  ShieldCheck,
} from "lucide-react";
import Section from "@/components/primitives/Section";
import SectionHeader from "@/components/primitives/SectionHeader";
import Reveal from "@/components/primitives/Reveal";
import { ease } from "@/lib/motion";

const modes = [
  {
    key: "camera",
    icon: Camera,
    label: "Full camera",
    caption: "On the live stream",
  },
  {
    key: "avatar",
    icon: Mic,
    label: "Audio + avatar",
    caption: "Heard, not shown",
  },
  {
    key: "private",
    icon: Lock,
    label: "Private proctored",
    caption: "Only the score is public",
  },
] as const;

function Preview({ mode }: { mode: string }) {
  if (mode === "camera") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-2 rounded-full bg-punch/15 px-3 py-1">
          <span className="h-2 w-2 animate-pulse rounded-full bg-punch" />
          <span className="font-mono text-[0.62rem] uppercase tracking-widest text-punch">
            On air
          </span>
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream/10">
          <Camera className="h-7 w-7 text-cream" />
        </div>
        <p className="font-mono text-xs text-faint">Live on camera</p>
      </div>
    );
  }
  if (mode === "avatar") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sky/15 text-2xl">
          🦊
        </div>
        <div className="flex items-end gap-1">
          {[10, 20, 14, 26, 12, 22, 9].map((h, i) => (
            <motion.span
              key={i}
              className="w-1.5 rounded-full bg-sky"
              animate={{ height: [h, h * 1.7, h] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                delay: i * 0.09,
                ease,
              }}
              style={{ height: h }}
            />
          ))}
        </div>
        <p className="font-mono text-xs text-faint">Avatar &amp; audio only</p>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-volt/15">
        <Lock className="h-7 w-7 text-volt" />
      </div>
      <div className="rounded-lg bg-cream/[0.05] px-4 py-2 text-center">
        <div className="font-mono text-[0.6rem] uppercase tracking-widest text-faint">
          Public
        </div>
        <div className="font-display text-xl font-bold text-cream">Score: 96</div>
      </div>
      <p className="font-mono text-xs text-faint">Private, proctored session</p>
    </div>
  );
}

const guarantees = [
  {
    icon: EyeOff,
    title: "Handles, never names",
    body: "Public boards show your child's chosen handle only; never their real name, photo or school.",
  },
  {
    icon: BadgeDollarSign,
    title: "Paid to you, not the child",
    body: "Cash prizes go to the guardian on record, within 10 business days of the result.",
  },
  {
    icon: UserCheck,
    title: "A person checks every win",
    body: "Nothing is auto-disqualified. A human reviews every prospective winner before it's announced.",
  },
  {
    icon: ShieldCheck,
    title: "Off the board on request",
    body: "Ask us to remove your child from any public board and we'll do it within 24 hours.",
  },
];

export default function RulesTeaser() {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState<string>("camera");

  return (
    <Section
      id="rules"
      tone="volt"
      character={{
        src: "/characters/char-rules.png",
        alt: "A RapKids character giving a thumbs up",
        side: "right",
        vertical: "top",
        placeholderLabel: "characters/char-rules.png",
      }}
    >
      <SectionHeader
        eyebrow="Rules &amp; safety"
        caret="punch"
        tone="onColor"
        segments={[
          { text: "Built With " },
          { text: "Safety", accent: "punch" },
          { text: " in Mind" },
        ]}
        intro="Appearing on camera is never a condition of winning. Every finalist's guardian picks how their child takes part, and all three earn the same prizes."
        moreHref="/rules"
        moreLabel="Read the full rules"
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* broadcast selector */}
        <div>
          <div className="grid grid-cols-3 gap-2">
            {modes.map((m) => {
              const active = mode === m.key;
              return (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setMode(m.key)}
                  aria-pressed={active}
                  className={`flex flex-col items-center gap-2 rounded-xl border px-2 py-3 text-center transition-all ${
                    active
                      ? "border-cream/10 bg-white shadow-sm shadow-black/5"
                      : "border-white/50 bg-white/40 hover:bg-white/70"
                  }`}
                >
                  <m.icon
                    className={`h-5 w-5 ${active ? "text-punch" : "text-cream/55"}`}
                  />
                  <span
                    className={`text-xs font-semibold ${
                      active ? "text-cream" : "text-cream/70"
                    }`}
                  >
                    {m.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* fixed-size preview so the layout never jumps on switch */}
          <div className="mt-4 h-56 overflow-hidden rounded-2xl border border-cream/10 bg-white shadow-sm shadow-black/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                transition={{ duration: 0.28, ease }}
                className="h-full"
              >
                <Preview mode={mode} />
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-4 text-center font-mono text-xs text-cream/70">
            All three are scored identically · eligible for the full prize
          </p>
        </div>

        {/* trust guarantees */}
        <div className="divide-y divide-line/15">
          {guarantees.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.08}>
              <div className="flex items-start gap-4 py-5 first:pt-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-volt shadow-sm shadow-black/5">
                  <g.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-cream">
                    {g.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-cream/80">
                    {g.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
