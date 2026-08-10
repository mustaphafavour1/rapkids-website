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
| `/register` | The entry form — parent email, and up to two children each with name, date of birth and leaderboard nickname. Submission is currently stubbed client-side (see below). |

## Design system

A dark purple theme. Tokens live in `app/globals.css` (as space-separated RGB
channels) and are surfaced through Tailwind in `tailwind.config.ts`:

- **ink / surface / raise** — dark purple backgrounds and section rhythm
- **punch** (purple, `#7A3EF5`) — primary actions + the Juniors bracket
- **sky** (pink, `#E62EDF`) — secondary + the Seniors bracket
- **gold** (cream, `#FED59D`) — prizes, money, winning
- **volt** (green, `#9AC55E`) — "live" / streak / go states
- **peach** (`#F2638A`) — tertiary accent

Type: **Bubblegum Sans** (display headlines), **Nunito Sans** (body/UI),
**JetBrains Mono** (data, labels, the typing motif). Loaded via `next/font` —
self-hosted at build, no external CDN at runtime. Bubblegum Sans ships one
weight, so `.font-display` forces `font-weight: 400` globally to stop the
browser from synthesizing a fake bold.

Every major headline carries the project's one headline mechanism: one keyword
in an accent colour, trailed by a blinking "typing caret" — the through-line for
a typing championship. Motion respects `prefers-reduced-motion`.

Comic-character cutouts (`components/primitives/SectionCharacter.tsx`) peek
from alternating bottom corners on every other landing-page section, wide
desktop only (`xl:` and up) so they never crowd the copy on smaller screens.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Adding your images

Comic characters, the footer logo and the social share image go in `public/` —
see [`public/ASSETS.md`](public/ASSETS.md) for the exact filenames and sizes.
Until a file is uploaded, the site shows a tidy labelled placeholder rather than
a broken image, so you can add art whenever it's ready.

## Before launch

- **Wire up the real links.** `REGISTER_URL` in [`lib/config.ts`](lib/config.ts)
  is a placeholder pointing at the RapKids app — most "Register your child"
  CTAs now link to the on-site `/register` form instead, so update that form's
  submit handler (see below) rather than this URL.
- **Connect the register form.** `components/RegisterForm.tsx` builds the full
  branded UI (parent email, up to two children, consent) but its submit handler
  is a stub — it just flips to a local success state, no network call. Wire it
  to a real endpoint or the site's standard branded-form → Google Form pre-fill
  pattern before launch.

All championship copy and structured data (dates, prize tables, rules, FAQ) live
in one place: [`lib/content.ts`](lib/content.ts).

## Structure

```
app/                 routes (landing + about/prizes/rules/faq/register) + layout, globals
components/
  sections/          landing-page sections (Hero, Glance, HowItWorks, …)
  primitives/        reusable building blocks (CaretHeadline, CountUp, Reveal,
                      SectionCharacter, …)
  Nav, Footer, PageHeader, PageShell, CtaBand, FaqAccordion, RegisterForm
lib/                 content.ts (copy/data), config.ts (URLs), motion.ts
public/              image assets + ASSETS.md
```
