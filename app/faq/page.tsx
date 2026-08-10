import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/primitives/Section";
import Reveal from "@/components/primitives/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBand from "@/components/CtaBand";
import { faqs } from "@/lib/content";
import { SUPPORT_EMAIL } from "@/lib/config";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers for parents and guardians: who can enter, how scoring works, camera choices, prizes, billing, safety and privacy in the RapKids TypeMaster Championship.",
};

export default function FaqPage() {
  const categories = faqs.reduce<Record<string, typeof faqs>>((acc, f) => {
    (acc[f.category] ??= []).push(f);
    return acc;
  }, {});

  return (
    <PageShell>
      <PageHeader
        eyebrow="Questions, answered"
        caret="sky"
        segments={[
          { text: "Everything a " },
          { text: "Guardian", accent: "sky" },
          { text: " Asks" },
        ]}
        intro="Grouped so you can jump straight to what matters: getting in, winning, the Grand Final, money, and keeping your child safe."
      />

      <Section tone="ink" className="!pt-8">
        <div className="space-y-16">
          {Object.entries(categories).map(([category, items], i) => (
            <div key={category} className="grid gap-6 md:grid-cols-[0.4fr_1fr] md:gap-10">
              <Reveal>
                <h2 className="font-display text-2xl font-bold text-cream md:sticky md:top-28">
                  <span className="mr-2 font-mono text-sm text-punch">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {category}
                </h2>
              </Reveal>
              <Reveal delay={0.05}>
                <FaqAccordion items={items} idPrefix={`faq-${i}`} />
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 rounded-3xl border border-line/15 bg-surface p-8 text-center">
            <p className="font-display text-xl font-bold text-cream">
              Still Have a Question?
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
              We&apos;re happy to help before you enter your child. Email the
              championship team and we&apos;ll get back to you.
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="link-more mt-4 justify-center"
            >
              {SUPPORT_EMAIL}
            </a>
          </div>
        </Reveal>
      </Section>

      <CtaBand />
    </PageShell>
  );
}
