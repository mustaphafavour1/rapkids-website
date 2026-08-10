import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navLinks } from "@/lib/content";
import { REGISTER_URL, SHADOW_RANK_URL } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line/15 bg-surface">
      {/* giant, near-illegible watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none font-display text-[22vw] font-extrabold leading-none text-cream/[0.03]"
      >
        RapKids
      </div>

      <div className="container-page relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-baseline gap-0.5">
              <span className="font-display text-2xl font-extrabold tracking-tight">
                Rap<span className="text-punch">Kids</span>
              </span>
              <span className="ml-0.5 inline-block h-[0.9em] w-[0.42ch] rounded-[2px] bg-punch animate-blink" aria-hidden />
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              The TypeMaster Championship — four weeks of competitive typing for
              kids 5–12, ending in a live Grand Final on 26 September.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="chip">Warm-up · 12–23 Aug</span>
              <span className="chip">Heats · 24 Aug – 20 Sep</span>
              <span className="chip text-gold">Grand Final · 26 Sep</span>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-4">Championship</p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-cream"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Get started</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={REGISTER_URL}
                  className="inline-flex items-center gap-1 text-sm text-cream transition-colors hover:text-punch"
                >
                  Register your child <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={SHADOW_RANK_URL}
                  className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-cream"
                >
                  See your child&apos;s shadow rank{" "}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 h-px w-full bg-line/15" />

        <div className="mt-6 flex flex-col gap-4 text-xs text-faint md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} RapKids. All rights reserved.</p>
          <p className="max-w-xl md:text-right">
            Requires an active RapKids subscription. The championship spans two
            monthly billing periods; full detail on the{" "}
            <Link href="/rules" className="text-muted underline underline-offset-2 hover:text-cream">
              rules page
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
