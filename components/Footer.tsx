import Link from "next/link";
import { navLinks } from "@/lib/content";
import BrandLockup from "@/components/primitives/BrandLockup";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line/15 bg-surface">
      <div className="container-page relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3 md:items-center">
          {/* left — tagline, chips, copyright */}
          <div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              The TypeMaster Championship: four weeks of competitive typing for
              kids 5–12, ending in a live Grand Final on 26 September.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="chip-outline">Warm-up · 12–23 Aug</span>
              <span className="chip-outline">Heats · 24 Aug – 20 Sep</span>
              <span className="chip-outline text-gold">Grand Final · 26 Sep</span>
            </div>
            <p className="mt-6 text-xs text-faint">
              © {new Date().getFullYear()} RapKids. All rights reserved.
            </p>
          </div>

          {/* center — logo + wordmark lockup */}
          <div className="flex justify-center">
            <BrandLockup />
          </div>

          {/* right — championship links, far right */}
          <div className="md:text-right">
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
        </div>
      </div>
    </footer>
  );
}
