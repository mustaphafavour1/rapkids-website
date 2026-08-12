import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/primitives/Section";
import SectionHeader from "@/components/primitives/SectionHeader";
import Reveal from "@/components/primitives/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import { faqs } from "@/lib/content";

// A curated handful for the landing page; the full set lives on /faq.
const preview = [
  faqs.find((f) => f.q.startsWith("Do I need")),
  faqs.find((f) => f.q === "How is a run scored?"),
  faqs.find((f) => f.q === "Is the Grand Final streamed or on camera?"),
  faqs.find((f) => f.q === "Can we still join once it's started?"),
  faqs.find((f) => f.q.startsWith("What do you show")),
].filter(Boolean) as typeof faqs;

export default function FaqPreview() {
  return (
    <Section id="faq" tone="surface">
      <SectionHeader
        eyebrow="Questions, answered"
        caret="sky"
        segments={[{ text: "The Parent " }, { text: "Cheat Sheet", accent: "sky" }]}
        intro="The things guardians ask first. There's more where these came from."
      />
      <Reveal delay={0.1}>
        <div className="mt-12">
          <FaqAccordion items={preview} idPrefix="home-faq" />
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <Link href="/faq" className="link-more mt-8">
          Read all {faqs.length} questions
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </Section>
  );
}
