import type { Metadata } from "next";
import {
  Gift,
  Medal,
  Award,
  TrendingUp,
  Flame,
  Frame,
  Smartphone,
  Crown,
  Check,
  Trophy,
  FileBadge,
  Info,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/primitives/Section";
import SectionHeader from "@/components/primitives/SectionHeader";
import Reveal from "@/components/primitives/Reveal";
import CountUp from "@/components/primitives/CountUp";
import CharacterImage from "@/components/primitives/CharacterImage";
import CtaBand from "@/components/CtaBand";
import {
  weeklyPrizes,
  finalPrizes,
  beyondCash,
  finalistRewards,
  championRewards,
  championshipPass,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Prizes",
  description:
    "$4,000 in prizes across four weeks and two brackets. 30 children win cash; hundreds more win free months, badges, certificates — and two become characters in a real RapKids comic.",
};

const beyondIcons = [Gift, Medal, Award, TrendingUp, Flame, Frame, Smartphone];

export default function PrizesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="The prize pool"
        caret="gold"
        segments={[
          { text: "$4,000 in prizes", accent: "gold" },
          { text: ". Four weeks. Two brackets." },
        ]}
        intro="Thirty children win cash. Hundreds more win free months, badges and a spot in the record books."
      >
        <div className="flex flex-wrap gap-3">
          <div className="rounded-2xl border border-gold/25 bg-gold/[0.06] px-5 py-3">
            <div className="font-display text-2xl font-extrabold text-gold-grad">
              $<CountUp to={4000} />
            </div>
            <div className="font-mono text-[0.62rem] uppercase tracking-widest text-faint">
              total pool
            </div>
          </div>
          <div className="rounded-2xl border border-line/15 bg-cream/[0.03] px-5 py-3">
            <div className="font-display text-2xl font-extrabold text-cream">
              <CountUp to={30} />
            </div>
            <div className="font-mono text-[0.62rem] uppercase tracking-widest text-faint">
              cash winners
            </div>
          </div>
          <div className="rounded-2xl border border-line/15 bg-cream/[0.03] px-5 py-3">
            <div className="font-display text-2xl font-extrabold text-cream">
              100s
            </div>
            <div className="font-mono text-[0.62rem] uppercase tracking-widest text-faint">
              non-cash rewards
            </div>
          </div>
        </div>
      </PageHeader>

      {/* Weekly heats */}
      <Section tone="ink">
        <SectionHeader
          eyebrow="Weekly heats · both brackets"
          caret="punch"
          segments={[{ text: "Win every " }, { text: "single week", accent: "punch" }]}
          intro="Three ways to win each week, in each bracket. Boards reset every Monday — winners announced the Monday after."
        />
        <Reveal delay={0.1}>
          <div className="mt-10 overflow-hidden rounded-3xl border border-line/15">
            <div className="hidden grid-cols-[1.2fr_0.6fr_1.4fr] gap-4 border-b border-line/15 bg-surface px-6 py-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint sm:grid">
              <span>Prize</span>
              <span>Amount</span>
              <span>How it&apos;s won</span>
            </div>
            {weeklyPrizes.map((p) => (
              <div
                key={p.name}
                className="grid grid-cols-2 gap-x-4 gap-y-1 border-b border-line/10 px-6 py-5 last:border-0 sm:grid-cols-[1.2fr_0.6fr_1.4fr] sm:items-center sm:gap-4"
              >
                <span className="font-display text-base font-bold text-cream">
                  {p.name}
                </span>
                <span className="text-right font-display text-xl font-extrabold text-gold/90 sm:text-left">
                  {p.amount}
                </span>
                <span className="col-span-2 text-sm text-muted sm:col-span-1">
                  {p.how}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-5 font-mono text-xs text-faint">
            $300 per bracket, every week ·{" "}
            <span className="text-cream">$2,400 across the four weekly heats</span>
          </p>
        </Reveal>
      </Section>

      {/* Grand Final */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="Grand Final · 26 September"
          caret="gold"
          segments={[{ text: "The " }, { text: "finals-day", accent: "gold" }, { text: " podium" }]}
          intro="The biggest prizes of the championship, awarded live — per bracket."
        />
        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {finalPrizes.map((p, i) => (
              <div
                key={p.place}
                className={`relative overflow-hidden rounded-3xl border p-6 ${
                  i === 0
                    ? "border-gold/40 bg-gradient-to-b from-gold/[0.12] to-transparent sm:-translate-y-3"
                    : "border-line/15 bg-cream/[0.02]"
                }`}
              >
                {i === 0 && <Crown className="mb-3 h-6 w-6 text-gold" />}
                <div className="font-mono text-[0.62rem] uppercase tracking-widest text-faint">
                  {i === 0 ? "1st" : i === 1 ? "2nd" : "3rd"} place
                </div>
                <div className="mt-1 font-display text-lg font-bold text-cream">
                  {p.place}
                </div>
                <div
                  className={`mt-3 font-display text-4xl font-extrabold ${
                    i === 0 ? "text-gold-grad" : "text-gold/80"
                  }`}
                >
                  {p.amount}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-5 font-mono text-xs text-faint">
            $1,600 on finals day ·{" "}
            <span className="text-cream">
              Juniors and Seniors each crown a Grand Champion
            </span>
          </p>
        </Reveal>

        {/* fairness note */}
        <Reveal delay={0.2}>
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-sky/20 bg-sky/[0.05] p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-sky" />
            <p className="text-sm leading-relaxed text-muted">
              <span className="text-cream">One prize each, kept fair.</span> A
              child can win only one cash category per week — their highest-value
              one. A household can win one cash prize per bracket per week, so
              siblings in different brackets can both take home a prize; siblings
              in the same bracket share one shot at it.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* Beyond cash */}
      <Section tone="ink">
        <SectionHeader
          eyebrow="Beyond the cash"
          caret="volt"
          segments={[{ text: "Hundreds more " }, { text: "ways to win", accent: "volt" }]}
          intro="Every week hands out rewards that last longer than a payout."
        />
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {beyondCash.map((b, i) => {
            const Icon = beyondIcons[i] ?? Award;
            return (
              <Reveal key={b.title} delay={(i % 3) * 0.08}>
                <div className="flex gap-4 border-t border-line/15 pt-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream/[0.05] text-volt">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-cream">
                      {b.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {b.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Finalist & Champion */}
      <Section tone="surface">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-sky/25 bg-sky/[0.05] p-8">
              <div className="mb-2 font-mono text-[0.62rem] uppercase tracking-widest text-sky">
                Top 8 per bracket · 16 finalists
              </div>
              <h3 className="font-display text-2xl font-bold text-cream">
                If your child makes the Grand Final
              </h3>
              <ul className="mt-6 space-y-3">
                {finalistRewards.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-sm text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-gold/35 bg-gradient-to-br from-gold/[0.12] to-transparent p-8">
              <CharacterImage
                src="/characters/comic-champion.png"
                alt="A RapKids comic character"
                placeholderLabel="characters/comic-champion.png"
                className="pointer-events-none absolute -right-4 -top-2 h-28 w-28 object-contain opacity-90"
              />
              <div className="mb-2 font-mono text-[0.62rem] uppercase tracking-widest text-gold">
                2 Grand Champions
              </div>
              <h3 className="font-display text-2xl font-bold text-cream">
                If your child becomes Grand Champion
              </h3>
              <ul className="mt-6 space-y-3">
                {championRewards.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-sm text-muted">
                    <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Certificate */}
      <Section tone="ink">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">Everyone who shows up</p>
            <h2 className="font-display text-3xl font-bold text-cream sm:text-4xl">
              Play 10+ active days, get a certificate
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted text-pretty">
              Generated automatically with your child&apos;s name, avatar, final
              words-per-minute, improvement percentage and best rank — emailed
              straight to you. No podium finish required.
            </p>
          </div>
          <Reveal delay={0.1}>
            <div className="relative rounded-3xl border border-gold/25 bg-gradient-to-b from-surface to-ink p-8">
              <div className="flex items-center justify-between">
                <FileBadge className="h-7 w-7 text-gold" />
                <span className="font-mono text-[0.6rem] uppercase tracking-widest text-faint">
                  RapKids TypeMaster · 2026
                </span>
              </div>
              <div className="mt-6 font-mono text-[0.6rem] uppercase tracking-widest text-faint">
                Certificate of participation
              </div>
              <div className="mt-1 font-display text-2xl font-extrabold text-cream">
                Your Child&apos;s Name
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-line/15 pt-5">
                {[
                  ["54", "final wpm"],
                  ["+38%", "improved"],
                  ["#7", "best rank"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <div className="font-display text-xl font-extrabold text-gold/90">
                      {v}
                    </div>
                    <div className="font-mono text-[0.58rem] uppercase tracking-widest text-faint">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Championship Pass */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="Optional add-on"
          caret="gold"
          segments={[{ text: "The Championship " }, { text: "Pass", accent: "gold" }]}
          intro={championshipPass.note}
        />
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {championshipPass.perks.map((perk, i) => (
            <Reveal key={perk.title} delay={(i % 3) * 0.08}>
              <div className="border-t border-gold/20 pt-6">
                <h3 className="font-display text-base font-bold text-cream">
                  {perk.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {perk.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <p className="mt-10 max-w-2xl text-xs leading-relaxed text-faint">
            Winners may also be featured in a short clip on RapKids&apos; own
            channels — always with your consent, and always revocable.
          </p>
        </Reveal>
      </Section>

      <CtaBand
        title="Thirty winners. "
        accent="One could be yours"
        subtitle="Enter your child and get a shot at every board, every week — all the way to finals day."
      />
    </PageShell>
  );
}
