import type { Config } from "tailwindcss";

/**
 * RapKids TypeMaster Championship — "Midnight Arena" design system.
 *
 * Colors are declared as space-separated RGB channels in globals.css so that
 * Tailwind's opacity modifier syntax (bg-punch/20) keeps working on top of the
 * theme tokens. See app/globals.css for the source-of-truth values.
 */
const withOpacity = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: withOpacity("--c-ink"), // page base — deep midnight indigo
        surface: withOpacity("--c-surface"), // a step up from ink for section rhythm
        raise: withOpacity("--c-raise"), // raised elements / hairline fills
        line: withOpacity("--c-line"), // borders / dividers
        cream: withOpacity("--c-cream"), // primary text on dark
        muted: withOpacity("--c-muted"), // secondary text
        faint: withOpacity("--c-faint"), // tertiary text / captions
        punch: withOpacity("--c-punch"), // primary action + Juniors bracket (coral)
        sky: withOpacity("--c-sky"), // secondary + Seniors bracket (cyan)
        gold: withOpacity("--c-gold"), // prizes / money / winning
        volt: withOpacity("--c-volt"), // "live" / streak / go states (lime)
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      maxWidth: {
        page: "1400px",
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        blink: "blink 1.05s steps(1) infinite",
        floaty: "floaty 6s ease-in-out infinite",
        marquee: "marquee 34s linear infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
