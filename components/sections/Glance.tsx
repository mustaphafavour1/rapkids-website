import Section from "@/components/primitives/Section";
import CountUp from "@/components/primitives/CountUp";
import Reveal from "@/components/primitives/Reveal";
import { glance } from "@/lib/content";

export default function Glance() {
  return (
    <Section tone="surface" className="!py-16 md:!py-20">
      <Reveal>
        <p className="eyebrow mb-10 text-center">The championship at a glance</p>
      </Reveal>
      <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:divide-x md:divide-line/15">
        {glance.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.08}
            className="px-2 text-center md:px-8"
          >
            <div className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              <span className={i === 0 ? "text-gold-grad" : "text-cream"}>
                <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </span>
            </div>
            <div className="mt-3 text-sm font-semibold text-cream">{s.label}</div>
            <div className="mt-1 text-xs leading-snug text-faint">{s.sub}</div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
