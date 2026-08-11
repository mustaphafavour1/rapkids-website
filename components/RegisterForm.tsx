"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, CheckCircle2, UserPlus } from "lucide-react";
import { ease } from "@/lib/motion";
import { SUPPORT_EMAIL } from "@/lib/config";

type Child = { name: string; dob: string; nickname: string };

const emptyChild: Child = { name: "", dob: "", nickname: "" };
const MAX_CHILDREN = 2;

const fieldClass =
  "w-full rounded-xl border border-line/20 bg-[#F2ECFE] px-4 py-3 text-sm text-cream placeholder:text-faint outline-none transition-colors focus:border-punch/50 focus:bg-white";
const labelClass = "mb-1.5 block text-sm font-semibold text-cream";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [children, setChildren] = useState<Child[]>([{ ...emptyChild }]);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const addChild = () => {
    if (children.length < MAX_CHILDREN) setChildren([...children, { ...emptyChild }]);
  };

  const removeChild = (index: number) => {
    setChildren(children.filter((_, i) => i !== index));
  };

  const updateChild = (index: number, field: keyof Child, value: string) => {
    setChildren(children.map((c, i) => (i === index ? { ...c, [field]: value } : c)));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // STUB — no backend is wired up yet. This just flips the local UI to a
    // success state. Replace with a real submit (an API route, or the site's
    // standard branded-form → Google Form pre-fill pattern) before launch.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="mx-auto max-w-lg rounded-3xl border border-volt/25 bg-volt/[0.06] p-10 text-center"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-volt" />
        <h2 className="mt-4 font-display text-3xl font-bold text-cream">
          You&apos;re on the List
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          We&apos;ve got {children.length === 2 ? "both children" : "your child"}{" "}
          down for the championship. Questions in the meantime? Email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-cream underline underline-offset-2 hover:text-punch">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-line/15 bg-surface/60 p-6 backdrop-blur-sm sm:p-8">
        {/* parent email */}
        <div>
          <label htmlFor="parent-email" className={labelClass}>
            Your email
          </label>
          <input
            id="parent-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="parent@email.com"
            className={fieldClass}
          />
          <p className="mt-1.5 text-xs text-faint">
            Where we&apos;ll send confirmation, weekly results and your child&apos;s
            certificate.
          </p>
        </div>

        {/* child blocks */}
        <div className="mt-8 space-y-6">
          <AnimatePresence initial={false}>
            {children.map((child, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease }}
                className="overflow-hidden"
              >
                <div className="rounded-2xl border border-line/15 bg-cream/[0.02] p-5 sm:p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="chip !border-punch/30 !bg-punch/10 text-punch">
                      Child {i + 1}
                    </span>
                    {i === 1 && (
                      <button
                        type="button"
                        onClick={() => removeChild(i)}
                        aria-label="Remove second child"
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-line/20 text-faint transition-colors hover:border-punch/40 hover:text-punch"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor={`child-${i}-name`} className={labelClass}>
                        Child&apos;s name
                      </label>
                      <input
                        id={`child-${i}-name`}
                        type="text"
                        required
                        value={child.name}
                        onChange={(e) => updateChild(i, "name", e.target.value)}
                        placeholder="Full name"
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor={`child-${i}-dob`} className={labelClass}>
                        Date of birth
                      </label>
                      <input
                        id={`child-${i}-dob`}
                        type="date"
                        required
                        value={child.dob}
                        onChange={(e) => updateChild(i, "dob", e.target.value)}
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor={`child-${i}-nickname`} className={labelClass}>
                        Leaderboard nickname
                      </label>
                      <input
                        id={`child-${i}-nickname`}
                        type="text"
                        required
                        value={child.nickname}
                        onChange={(e) => updateChild(i, "nickname", e.target.value)}
                        placeholder="e.g. TypeStorm7"
                        className={fieldClass}
                      />
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-faint">
                    The nickname is what shows on public leaderboards; never
                    their real name.
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {children.length < MAX_CHILDREN && (
            <button
              type="button"
              onClick={addChild}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-line/25 py-4 text-sm font-semibold text-muted transition-colors hover:border-punch/40 hover:text-cream"
            >
              <UserPlus className="h-4 w-4" />
              Add a second child
            </button>
          )}
        </div>

        {/* consent */}
        <label className="mt-8 flex cursor-pointer items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-line/30 bg-cream/[0.03] accent-punch"
          />
          <span>
            I&apos;m {children.length === 2 ? "these children's" : "this child's"}{" "}
            parent or legal guardian, and I consent to their entry on my behalf.
          </span>
        </label>

        <button type="submit" className="btn-primary mt-8 w-full !px-6">
          <Plus className="h-4 w-4" />
          Register {children.length === 2 ? "both children" : "my child"}
        </button>

        <p className="mt-4 text-center text-xs text-faint">
          Requires an active RapKids subscription. One plan covers up to two
          children.
        </p>
      </div>
    </form>
  );
}
