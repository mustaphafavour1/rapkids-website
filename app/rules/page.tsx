import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/primitives/Section";
import Reveal from "@/components/primitives/Reveal";
import CtaBand from "@/components/CtaBand";
import { rules } from "@/lib/content";

export const metadata: Metadata = {
  title: "Rules",
  description:
    "The official rules of the RapKids TypeMaster Championship: eligibility, age brackets, entry, billing, fair play, prizes, the Grand Final broadcast choices, and child-protection commitments.",
};

const slug = (n: number, title: string) =>
  `rule-${n}-${title.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "")}`;

export default function RulesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Official rules"
        caret="volt"
        segments={[
          { text: "The Rules, in " },
          { text: "Plain Language", accent: "volt" },
        ]}
        intro="No fine print you need a lawyer for. Here's exactly how entry, winning, billing and your child's privacy work."
      />

      <Section tone="ink" overflowVisible className="!pt-10">
        <div className="grid gap-10 lg:grid-cols-[0.32fr_1fr] lg:gap-16">
          {/* side index */}
          <nav aria-label="Rules sections" className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-4">Jump to</p>
            <ol className="space-y-2.5">
              {rules.map((r) => (
                <li key={r.n}>
                  <a
                    href={`#${slug(r.n, r.title)}`}
                    className="group flex items-baseline gap-3 text-sm text-muted transition-colors hover:text-cream"
                  >
                    <span className="font-mono text-xs text-faint group-hover:text-punch">
                      {String(r.n).padStart(2, "0")}
                    </span>
                    {r.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* rule sections */}
          <div className="space-y-14">
            {rules.map((r) => (
              <Reveal key={r.n} as="section">
                <div id={slug(r.n, r.title)} className="scroll-mt-28">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-4xl font-extrabold text-punch/40">
                      {String(r.n).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-3xl font-bold text-cream">
                      {r.title}
                    </h2>
                  </div>
                  {r.intro ? (
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted text-pretty">
                      {r.intro}
                    </p>
                  ) : null}
                  <ul className="mt-5 space-y-3">
                    {r.points.map((p, i) => (
                      <li key={i} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                        <span
                          aria-hidden
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-punch/70"
                        />
                        <span className="text-pretty">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        title="Fair, Safe, and "
        accent="Worth It"
        subtitle="That's the whole game. Enter your child and let a fresh leaderboard do the rest."
      />
    </PageShell>
  );
}
