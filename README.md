# RapKids TypeMaster Championship

The marketing site for the **RapKids TypeMaster Championship** — four weeks of
competitive typing for kids 5–12, $4,000 in prizes, and a live Grand Final.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion**.

## Pages

| Route | What it is |
|---|---|
| `/` | The championship landing page — hero, at-a-glance stats, how it works, why it's fair, and summarized teasers for About, Prizes, Rules and FAQ, each linking to its full page. |
| `/about` | Why it was built, how scoring works, practice vs. scored attempts, the Grand Final, rewards, and what comes next. |
| `/prizes` | Full prize breakdown: weekly heats, the Grand Final podium, beyond-cash rewards, finalist & champion perks, the certificate, and the Championship Pass. |
| `/rules` | The official rules, in plain language, with a jump-to index. |
| `/faq` | Every question a guardian asks, grouped by topic. |

## Design system

A dark **"Midnight Arena"** theme. Tokens live in `app/globals.css` (as
space-separated RGB channels) and are surfaced through Tailwind in
`tailwind.config.ts`:

- **ink / surface / raise** — backgrounds and section rhythm
- **punch** (coral) — primary actions + the Juniors bracket
- **sky** (cyan) — secondary + the Seniors bracket
- **gold** — prizes, money, winning
- **volt** (lime) — "live" / streak / go states

Type: **Unbounded** (display), **Space Grotesk** (body/UI), **JetBrains Mono**
(data, labels, the typing motif). Loaded via `next/font` — self-hosted at build,
no external CDN at runtime.

Every major headline carries the project's one headline mechanism: one keyword
in an accent colour, trailed by a blinking "typing caret" — the through-line for
a typing championship. Motion respects `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Adding your images

Comic characters, patterns and the social share image go in `public/` — see
[`public/ASSETS.md`](public/ASSETS.md) for the exact filenames and sizes.
Until a file is uploaded, the site shows a tidy labelled placeholder rather than
a broken image, so you can add art whenever it's ready.

## Before launch — wire up the real links

Placeholder URLs live in [`lib/config.ts`](lib/config.ts):

- `REGISTER_URL` — the RapKids Parent Zone (registration)
- `SHADOW_RANK_URL` — the free practice / shadow-rank flow
- `SUPPORT_EMAIL` — the championship support inbox

All championship copy and structured data (dates, prize tables, rules, FAQ) live
in one place: [`lib/content.ts`](lib/content.ts).

## Structure

```
app/                 routes (landing + about/prizes/rules/faq) + layout, globals
components/
  sections/          landing-page sections (Hero, Glance, HowItWorks, …)
  primitives/        reusable building blocks (CaretHeadline, CountUp, Reveal, …)
  Nav, Footer, PageHeader, PageShell, CtaBand, FaqAccordion
lib/                 content.ts (copy/data), config.ts (URLs), motion.ts
public/              image assets + ASSETS.md
```
