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

A light theme, mostly white with a few sections carrying a soft accent-colour
wash. Tokens live in `app/globals.css` (as space-separated RGB channels) and
are surfaced through Tailwind in `tailwind.config.ts`:

- **ink / surface / raise** — near-white page base, a pale lavender step for
  section rhythm, and a soft raised fill
- **cream / muted / faint** — despite the name kept from an earlier dark build,
  these are now the primary/secondary/tertiary **text** colors (dark on light)
- **punch** (purple, `#7A3EF5`) — primary actions + the Juniors bracket
- **sky** (pink, `#B825B2`) — secondary + the Seniors bracket
- **gold** (amber, `#C28A1A`) — prizes, money, winning
- **volt** (green, `#5C8A22`) — "live" / streak / go states
- **peach** (rose, `#C73864`) — tertiary accent

Every accent is deepened from the brand's original pastel values so it holds
up as full-opacity text/icon color on white; the same token reads as a soft
pastel wash automatically wherever it's used at low alpha (`bg-gold/[0.07]`,
etc.), so section-level tints and text share one value each rather than a
separate light/dark pair.

**Section backgrounds:** the hero carries a subtle diagonal purple-to-pink
gradient (`from-punch/[0.11]` `via-sky/[0.05]`); most sections stay white or
the pale lavender `surface` step; a few carry their own accent wash — Prizes
is a warm `gold` tint, Rules & Safety a `volt` (green) tint, and the closing
CTA a `peach` tint, bookending the hero's gradient. Set via `Section`'s `tone`
prop (`components/primitives/Section.tsx`).

Type: **Bubblegum Sans** (display headlines), **Nunito Sans** (body/UI),
**JetBrains Mono** (data, labels, the typing motif). Loaded via `next/font` —
self-hosted at build, no external CDN at runtime. Bubblegum Sans ships one
weight, so `.font-display` forces `font-weight: 400` globally to stop the
browser from synthesizing a fake bold. A same-color text-stroke
(`.headline-stroke`) fakes a heavier weight on top of that, but only for the
big signature headlines — it's applied inside `CaretHeadline` specifically,
not globally, since the fixed-width stroke overwhelms small text (card
titles, FAQ questions, wordmarks all stay stroke-free).

Every major headline carries the project's one headline mechanism: one keyword
in an accent colour, trailed by a blinking "typing caret" — the through-line for
a typing championship. Motion respects `prefers-reduced-motion`.

Comic-character cutouts (`components/primitives/SectionCharacter.tsx`) peek
from a section corner (either top or bottom, left or right — set per usage),
wide desktop only (`xl:` and up) so they never crowd the copy on smaller
screens.

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
