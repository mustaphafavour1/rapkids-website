"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { navLinks } from "@/lib/content";
import { REGISTER_URL } from "@/lib/config";

function Wordmark() {
  return (
    <Link href="/" className="group flex items-baseline gap-0.5" aria-label="RapKids TypeMaster Championship — home">
      <span className="font-display text-xl font-extrabold tracking-tight">
        Rap<span className="text-punch">Kids</span>
      </span>
      <span className="ml-0.5 inline-block h-[0.9em] w-[0.42ch] translate-y-[0.02em] rounded-[2px] bg-punch animate-blink" aria-hidden />
      <span className="ml-2 hidden font-mono text-[0.62rem] uppercase tracking-[0.22em] text-faint sm:inline">
        TypeMaster
      </span>
    </Link>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-colors duration-300 ${
          scrolled
            ? "border-b border-line/15 bg-ink/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between md:h-[4.5rem]">
          <Wordmark />

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted transition-colors hover:text-cream"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={REGISTER_URL}
              className="btn-primary hidden !px-5 !py-2.5 text-sm sm:inline-flex"
            >
              Register your child
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/25 text-cream md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-b border-line/15 bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-cream transition-colors hover:bg-cream/5"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={REGISTER_URL}
                className="btn-primary mt-3"
                onClick={() => setOpen(false)}
              >
                Register your child
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
