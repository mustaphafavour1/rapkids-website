import type { Metadata } from "next";
import Link from "next/link";
import {
  Gauge,
  Flame,
  Infinity as InfinityIcon,
  ChevronRight,
  Sparkles,
  ArrowRight,
  CalendarClock,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/primitives/Section";
import SectionHeader from "@/components/primitives/SectionHeader";
import Reveal from "@/components/primitives/Reveal";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why RapKids built the TypeMaster Championship, how runs are scored (accuracy over speed), unlimited practice with capped scored attempts, the live Grand Final, and what happens after.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About the championship"
        caret="punch"
        segments={[
          { text: "A habit worth " },
          { text: "showing up for", accent: "punch" },
        ]}
        intro="A habit sticks when there's something worth showing up for. Four weeks of daily practice, with a leaderboard, real prizes and a live final at the end of it."
      />

      {/* How scoring works */}
      <Section tone="ink">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-4">How scoring actually works</p>
            <h2 className="font-display text-3xl font-bold text-cream sm:text-4xl">
              Accuracy beats speed — on purpose
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted text-pretty">
              Every run is scored on speed and accuracy — but accuracy counts
              for more. Type fast and sloppy, and the score drops fast. That&apos;s
              the habit worth building, and the hardest one to fake.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">
              Play all seven days in a week for a 20% score boost — often worth
              more than any single great run.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-5">
            <Reveal>
              <div className="rounded-3xl border border-line/15 bg-surface/60 p-6">
                <div className="font-mono text-[0.62rem] uppercase tracking-widest text-faint">
                  Same test, different run
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex-1 rounded-xl bg-punch/10 p-4 ring-1 ring-punch/40">
                    <div className="font-display text-lg font-bold text-cream">
                      40 wpm
                    </div>
                    <div className="font-mono text-xs text-volt">98% accuracy</div>
                    <div className="mt-2 font-mono text-[0.6rem] uppercase tracking-widest text-punch">
                      wins
                    </div>
                  </div>
                  <span className="font-display text-sm text-faint">beats</span>
                  <div className="flex-1 rounded-xl bg-cream/[0.03] p-4">
                    <div className="font-display text-lg font-bold text-muted">
                      45 wpm
                    </div>
                    <div className="font-mono text-xs text-muted">90% accuracy</div>
                    <div className="mt-2 font-mono text-[0.6rem] uppercase tracking-widest text-faint">
                      faster, loses
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex items-center gap-3 rounded-2xl border border-gold/20 bg-gold/[0.05] p-4">
                <Flame className="h-6 w-6 shrink-0 text-gold" />
                <p className="text-sm text-muted">
                  <span className="text-cream">Show up all seven days</span> and
                  earn a +20% boost on the week&apos;s score.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Practice vs scored */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="Practice vs scored"
          caret="sky"
          segments={[
            { text: "Unlimited practice. " },
            { text: "Ten scored tries", accent: "sky" },
            { text: " a day." },
          ]}
          intro="Winning comes down to how well your child types, not how many hours they spend trying — screen time you don't have to feel guilty about."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-line/15 bg-cream/[0.02] p-7">
              <InfinityIcon className="h-7 w-7 text-sky" />
              <h3 className="mt-4 font-display text-xl font-bold text-cream">
                Practice is unlimited, always
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Any length, no cap, works offline. Your child can warm up as much
                as they like without it ever counting against them.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-line/15 bg-cream/[0.02] p-7">
              <Gauge className="h-7 w-7 text-punch" />
              <h3 className="mt-4 font-display text-xl font-bold text-cream">
                Scored attempts are capped at 10 a day
              </h3>
              <p className="mt-4 flex flex-wrap gap-1.5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-6 w-6 rounded-md ${
                      i < 2
                        ? "bg-gradient-to-br from-gold to-punch"
                        : "bg-cream/[0.06]"
                    }`}
                  />
                ))}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Your <span className="text-gold">best 2</span> count. It rewards
                good typing, not endless retries.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The Grand Final */}
      <Section tone="ink">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow mb-4">The Grand Final</p>
            <h2 className="font-display text-3xl font-bold text-cream sm:text-4xl">
              Sixteen finalists, live and unscripted
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted text-pretty">
              The top 8 from each bracket — 16 children in total — compete live on
              26 September, on passages nobody has seen before.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {["Heats", "Semi-finals", "Head-to-head final"].map((s, i) => (
                <span key={s} className="flex items-center gap-2">
                  <span className="chip">{s}</span>
                  {i < 2 && <ChevronRight className="h-4 w-4 text-faint" />}
                </span>
              ))}
            </div>
          </div>
          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl border border-line/15 bg-surface/60 p-7">
              <h3 className="font-display text-lg font-bold text-cream">
                Every finalist&apos;s guardian chooses how their child appears
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-punch" />
                  Full camera on the live stream
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
                  Audio and avatar only — heard, not shown
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-volt" />
                  A private, proctored session with only the score made public
                </li>
              </ul>
              <p className="mt-4 border-t border-line/15 pt-4 font-mono text-xs text-faint">
                All three are scored identically and eligible for the same prize.{" "}
                <Link href="/rules" className="text-muted underline underline-offset-2 hover:text-cream">
                  See the rules
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Beyond cash teaser + after */}
      <Section tone="surface">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-transparent p-8">
              <div>
                <Sparkles className="h-7 w-7 text-gold" />
                <h3 className="mt-4 font-display text-2xl font-bold text-cream">
                  More than cash
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Badges, free subscription months and a certificate with your
                  child&apos;s stats. The two Grand Champions also earn a spot as a
                  character in an actual RapKids comic.
                </p>
              </div>
              <Link href="/prizes" className="link-more mt-6">
                See the full prize breakdown
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-line/15 bg-cream/[0.02] p-8">
              <div>
                <CalendarClock className="h-7 w-7 text-sky" />
                <h3 className="mt-4 font-display text-2xl font-bold text-cream">
                  After the championship
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  The TypeMaster Term League opens 5 October: a free, ongoing
                  monthly competition on the same leaderboards, with new prizes
                  every month.
                </p>
              </div>
              <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-sky/25 bg-sky/[0.06] px-4 py-2 font-mono text-xs text-sky">
                Term League · from 5 Oct · free
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Give them a reason to "
        accent="show up"
        subtitle="Four weeks of daily practice, with a leaderboard, real prizes and a live final waiting at the end."
      />
    </PageShell>
  );
}
