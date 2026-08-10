import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CaretHeadline from "@/components/primitives/CaretHeadline";
import Reveal from "@/components/primitives/Reveal";

type Props = {
  title?: string;
  accent?: string;
  subtitle?: string;
};

/** Compact closing CTA reused at the foot of the inner pages. */
export default function CtaBand({
  title = "Ready. Set. ",
  accent = "Type",
  subtitle = "Every child on an active RapKids plan can enter — one subscription enters both your kids.",
}: Props) {
  return (
    <section className="relative overflow-hidden bg-surface py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-punch/12 blur-[120px]"
      />
      <div className="container-page relative text-center">
        <CaretHeadline
          as="h2"
          caret="punch"
          className="mx-auto max-w-3xl text-3xl sm:text-4xl md:text-5xl"
          segments={[{ text: title }, { text: accent, accent: "punch" }, { text: "." }]}
        />
        <Reveal delay={0.05}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted text-pretty">
            {subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-8 flex justify-center">
            <Link href="/register" className="btn-primary">
              Register your child
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
