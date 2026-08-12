import {
  EyeOff,
  BadgeDollarSign,
  UserCheck,
  ShieldCheck,
} from "lucide-react";
import Section from "@/components/primitives/Section";
import SectionHeader from "@/components/primitives/SectionHeader";
import Reveal from "@/components/primitives/Reveal";

const guarantees = [
  {
    icon: EyeOff,
    title: "Handles, never names",
    body: "A chosen handle only; never a real name or photo.",
  },
  {
    icon: BadgeDollarSign,
    title: "Paid to you, not the child",
    body: "Prizes go to the guardian, within 10 business days.",
  },
  {
    icon: UserCheck,
    title: "A person checks every win",
    body: "A human reviews every winner before it's announced.",
  },
  {
    icon: ShieldCheck,
    title: "Off the board on request",
    body: "Ask us to remove your child; done within 24 hours.",
  },
];

export default function RulesTeaser() {
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
        intro="No cameras, no broadcast, no fuss. Just a handful of promises we build the whole championship around, so entering your child is an easy yes."
        moreHref="/rules"
        moreLabel="Read the full rules"
      />

      <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {guarantees.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.08}>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-punch shadow-sm shadow-black/5">
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
    </Section>
  );
}
