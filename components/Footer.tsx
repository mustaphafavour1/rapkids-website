import Link from "next/link";
import { navLinks } from "@/lib/content";
import BrandLogo from "@/components/primitives/BrandLogo";
import { SUPPORT_EMAIL } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-line/15 bg-gradient-to-b from-white to-surface">
      <div className="container-page py-14 text-center md:py-16">
        {/* brand lockup */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5"
          aria-label="RapKids TypeMaster Championship, home"
        >
          <BrandLogo className="h-9 w-auto object-contain" />
          <span className="font-sans text-2xl font-extrabold tracking-tight">
            Rap<span className="text-punch">Kids</span>
          </span>
        </Link>

        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
          Four weeks of competitive typing for kids 9–12, ending in a live Grand
          Final on 26 September.
        </p>

        {/* directory */}
        <nav className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted transition-colors hover:text-cream"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mx-auto mt-8 h-px max-w-[22rem] bg-line/15" />

        <div className="mt-6 flex flex-col items-center justify-center gap-2 text-xs text-faint sm:flex-row sm:gap-6">
          <p>© {new Date().getFullYear()} RapKids. All rights reserved.</p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="transition-colors hover:text-cream"
          >
            {SUPPORT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
