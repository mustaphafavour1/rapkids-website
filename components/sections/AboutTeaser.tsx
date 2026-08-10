"use client";

import Link from "next/link";
import { ArrowRight, Infinity as InfinityIcon, Flame, Gauge } from "lucide-react";
import CaretHeadline from "@/components/primitives/CaretHeadline";
import Section from "@/components/primitives/Section";
import Reveal from "@/components/primitives/Reveal";
import CharacterImage from "@/components/primitives/CharacterImage";

const facts = [
  { icon: Gauge, text: "Accuracy counts more than raw speed" },
  { icon: Flame, text: "Play all 7 days → +20% on the week" },
  { icon: InfinityIcon, text: "Unlimited practice · 10 scored tries a day" },
];

export default function AboutTeaser() {
  return (
    <Section id="about" tone="ink">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        {/* text */}
        <div>
          <p className="eyebrow mb-4">Why it works</p>
          <CaretHeadline
            as="h2"
            caret="punch"
            className="text-4xl sm:text-5xl md:text-[3.4rem]"
            segments={[
              { text: "A Habit Worth " },
              { text: "Showing Up For", accent: "punch" },
            ]}
          />
          <Reveal delay={0.05}>
            <p className="mt-5 text-lg leading-relaxed text-muted text-pretty">
              Accuracy counts more than speed. A child at 40 wpm and 98%
              accuracy beats one racing at 45 and 90%; the habit that&apos;s
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
              Read the full story: scoring, the Grand Final &amp; more
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        {/* app screenshot */}
        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-3xl border border-line/15 bg-surface/60 p-3 backdrop-blur-sm">
            <CharacterImage
              src="/screenshots/why-it-works.png"
              alt="A screenshot of the RapKids app scoring a typing run"
              placeholderLabel="screenshots/why-it-works.png"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
