"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Section from "@/components/primitives/Section";
import SectionHeader from "@/components/primitives/SectionHeader";
import { steps } from "@/lib/content";
import { ease } from "@/lib/motion";

export default function HowItWorks() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % steps.length),
      2400
    );
    return () => clearInterval(id);
  }, [reduce]);

  const isFinal = (i: number) => i === steps.length - 1;

  return (
    <Section
      id="how-it-works"
      tone="ink"
      character={{
        src: "/characters/char-howitworks.png",
        alt: "A RapKids character cheering on the championship steps",
        side: "right",
        vertical: "top",
        placeholderLabel: "characters/char-howitworks.png",
      }}
    >
      <SectionHeader
        eyebrow="How it works"
        caret="punch"
        segments={[
          { text: "From SignUp to the " },
          { text: "Live Final", accent: "spark" },
        ]}
        intro="Four moves, four weeks. Register once, warm up, then chase a fresh leaderboard every single week, all the way to the Grand Final."
      />

      {/* ---- desktop: horizontal drawing timeline ---- */}
      <div className="mt-16 hidden md:block">
        <div className="relative">
          {/* track + self-drawing fill */}
          <div className="absolute left-0 right-0 top-[13px] h-[3px] rounded-full bg-line/15" />
          <motion.div
            className="absolute left-0 top-[13px] h-[3px] rounded-full bg-gradient-to-r from-punch via-punch to-sky"
            initial={{ width: reduce ? "100%" : 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.7, ease, delay: 0.2 }}
          />

          <div className="relative grid grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <button
                key={s.n}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group block text-left"
                aria-label={`Step ${s.n}: ${s.title}`}
              >
                {/* node */}
                <span className="relative z-10 flex h-[30px] w-[30px] items-center justify-center">
                  <span
                    className={`h-[30px] w-[30px] rounded-full border-2 transition-all duration-300 ${
                      isFinal(i)
                        ? "border-sky"
                        : active === i
                          ? "border-punch"
                          : "border-line/30"
                    } ${
                      active === i
                        ? isFinal(i)
                          ? "scale-100 bg-sky"
                          : "scale-100 bg-punch"
                        : "scale-90 bg-ink"
                    }`}
                  />
                  {active === i && (
                    <motion.span
                      layoutId="how-ring"
                      className={`absolute inset-[-6px] rounded-full ring-2 ${
                        isFinal(i) ? "ring-sky/40" : "ring-punch/40"
                      }`}
                      transition={{ duration: 0.3, ease }}
                    />
                  )}
                </span>

                <div
                  className={`mt-6 transition-opacity duration-300 ${
                    active === i || reduce ? "opacity-100" : "opacity-55"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-faint">{s.n}</span>
                    <span
                      className={`font-mono text-[0.68rem] uppercase tracking-[0.14em] ${
                        isFinal(i) ? "text-sky" : "text-punch"
                      }`}
                    >
                      {s.tag}
                    </span>
                  </div>
                  <div className="mt-2 font-mono text-xs text-muted">
                    {s.window}
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold leading-snug text-cream">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---- mobile: vertical timeline ---- */}
      <div className="mt-12 md:hidden">
        <div className="relative pl-8">
          <div className="absolute bottom-2 left-[9px] top-2 w-[3px] rounded-full bg-line/15" />
          <motion.div
            className="absolute left-[9px] top-2 w-[3px] rounded-full bg-gradient-to-b from-punch to-sky"
            initial={{ height: reduce ? "100%" : 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.6, ease }}
          />
          <div className="space-y-10">
            {steps.map((s, i) => (
              <div key={s.n} className="relative">
                <span
                  className={`absolute -left-8 top-1 h-5 w-5 rounded-full border-2 ${
                    isFinal(i) ? "border-sky bg-sky" : "border-punch bg-punch"
                  }`}
                />
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-faint">{s.n}</span>
                  <span
                    className={`font-mono text-[0.68rem] uppercase tracking-[0.14em] ${
                      isFinal(i) ? "text-punch" : "text-punch"
                    }`}
                  >
                    {s.tag}
                  </span>
                  <span className="font-mono text-xs text-muted">· {s.window}</span>
                </div>
                <h3 className="mt-2 font-display text-xl font-bold text-cream">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
