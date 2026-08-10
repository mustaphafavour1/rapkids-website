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

A light theme: most sections are white or a pale lavender step, with a handful
of **fully-saturated colour sections** for punch. Tokens live in
`app/globals.css` (as space-separated RGB channels) and are surfaced through
Tailwind in `tailwind.config.ts`:

- **ink / surface / raise** — near-white page base, a pale lavender step for
  section rhythm, and a soft raised fill
- **cream / muted / faint** — despite the name kept from an earlier dark build,
  these are now the primary/secondary/tertiary **text** colors (dark on light)
- **punch** (purple, `#7A3EF5`) — primary actions + the Juniors bracket
- **sky** (pink, `#B825B2`) — secondary + the Seniors bracket
- **gold / volt / peach** (`#C28A1A` / `#5C8A22` / `#C73864`) — deepened amber,
  green and rose, tuned to hold up as **text/icon** colour on white (prizes/
  money, "live"/go states, tertiary accent). `peach` doubles as the closing
  CTA's solid background.

The three accents above are deepened from the brand's pastels so they read as
text on white. For the **solid colour section backgrounds** there's a second,
brighter set — light enough that dark ink text clears AA on them — plus two
helpers for headlines on colour:

- **sun** (`#F5B838`) — the Prizes section's bright-gold canvas
- **grass** (`#A6D95B`) — the Rules section's bright-lime canvas
- **blush** (`#E62EDF`) — the warm end of the hero's purple→pink gradient
- **spark** (`#FED59D`) — pale gold used as the headline keyword + caret on the
  dark colour sections (hero, closing CTA)

**Section backgrounds:** the hero is a **fully-coloured** diagonal
purple→pink gradient (`from-punch via-punch to-blush`) with white text; most
sections stay white or the pale lavender `surface` step for breathing room; and
three sections go **solid, full-strength** colour — Prizes on `sun` (bright
gold) and Rules & Safety on `grass` (bright lime), both with dark text, and the
closing CTA on `peach` (deep rose) with white text, bookending the hero. The
gold/lime canvases take dark ink text; the purple/rose ones take white — chosen
per background for AA contrast. Colour sections get white/translucent buttons
(`.btn-on-color`), chips (`.chip-solid` / `.chip-on-dark`) and cards so nothing
dissolves into the background. Set via `Section`'s `tone` prop and the
`SectionHeader` `tone` prop (`"page"` / `"onColor"` / `"onDark"`).

**Logo & wordmark:** the nav shows the RapKids logo mark
(`public/brand/logo.png`, via `BrandLogo`) and the footer shows the higher-res
`public/brand/rapkids-footer.png` (via `BrandLockup`) beside the "RapKids"
wordmark set in **Nunito Sans** (not the display face). Both hide the mark
cleanly if the file isn't present. `logo.png` is also the browser-tab favicon
(`metadata.icons` in `app/layout.tsx`).

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
