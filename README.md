# RapKids TypeMaster Championship

The marketing site for the **RapKids TypeMaster Championship** — four weeks of
competitive typing for kids 9–12, $4,000 in prizes, and a live Grand Final.

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

## Chatbot & content base

A small championship Q&A widget lives on the home page hero
(`components/Chatbot/ChampionshipChatbot.tsx`) — a floating launcher, bottom
right, that opens a chat panel. It's self-contained (fixed-position, no props,
manages its own state), so it can be added to any other page by importing it
and rendering `<ChampionshipChatbot />` once.

It talks to `POST /api/chat`, which streams a reply from **Claude Haiku 4.5**
(`claude-haiku-4-5-20251001` — the cheapest current Claude model; change it in
[`lib/anthropic.ts`](lib/anthropic.ts) if you ever want smarter-but-pricier
answers). The system prompt the model sees is built in
[`lib/chat-context.ts`](lib/chat-context.ts) from two sources:

1. **The site's own copy** — prizes, rules, FAQ, how-it-works, all pulled live
   from `lib/content.ts`, so the bot never drifts out of sync with the pages.
2. **The content base** — free-text notes pasted in at the password-protected
   `/admin` page, for anything not already on the site: RapKids, Raptures, extra
   championship notes, and a "response guidelines" field for tone/boundaries.

**Setup** (see [`.env.example`](.env.example) for the full list):

- `ANTHROPIC_API_KEY` — required for the chatbot to respond at all. Without it,
  the widget shows a friendly "not set up yet" message instead of erroring.
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — persists the content
  base across deploys and backs a light per-IP rate limit on `/api/chat`
  (8 messages/minute). Create a free database at
  [console.upstash.com](https://console.upstash.com) or via the Vercel
  Marketplace's Upstash integration, which fills these in for you. Without
  them the site still works, but `/admin` shows a banner warning that edits
  won't survive a redeploy or restart.
- `KB_ADMIN_PASSWORD` / `KB_SESSION_SECRET` — gate `/admin`. One shared
  password (no user accounts); `KB_SESSION_SECRET` signs the session cookie
  and can be any long random string (e.g. `openssl rand -hex 32`).

`/admin` isn't linked from the nav and is excluded from search indexing
(`robots: noindex`) — it's reachable only by URL.

## Design system

A light theme: most sections are white or a pale lavender step, with a handful
of **fully-saturated colour sections** for punch. Tokens live in
`app/globals.css` (as space-separated RGB channels) and are surfaced through
Tailwind in `tailwind.config.ts`:

- **ink / surface / raise** — near-white page base, a pale lavender step for
  section rhythm, and a soft raised fill
- **cream / muted / faint** — despite the name kept from an earlier dark build,
  these are now the primary/secondary/tertiary **text** colors (dark on light)
- **punch** (purple, `#7A3EF5`) — primary actions + the main accent
- **sky** (pink, `#E62EDF`) — secondary accent
- **volt** (green, `#95CF42`) — "live"/go states + the Rules section canvas
- **peach** (`#F582A1`) — tertiary accent
- **gold** (`#C28A1A`) — money/prizes as text (podium amounts, the `text-gold-grad`
  figures); the one accent that isn't in the core brand set
- **spark** (`#FED59D`) — brand cream: the Prizes section canvas **and** the
  headline keyword + caret on the dark colour sections (hero, prizes hero)
- **blush** (`#E62EDF`) — the warm end of the hero + closing-CTA gradient

`sky`, `volt`, `peach` and `spark` are the exact brand accent hexes, used
straight (not deepened). They read best as fills, section canvases and large
headline accents; where one would be used as small text/icon on white and lose
contrast, that spot falls back to `punch` or ink instead.

**Section backgrounds:** the hero and the closing CTA are a **fully-coloured**
diagonal purple→pink gradient (`from-punch via-punch to-blush`) with white text;
the Glance strip fades white→`#D6C3FC`; most sections stay white or the pale
lavender `surface` step; and two sections carry a solid brand canvas — Prizes on
`spark` (cream `#FED59D`) and Rules & Safety on `volt` (green `#95CF42`), both
with dark ink text and a purple headline accent. Colour sections get
white/translucent buttons (`.btn-on-color`), chips (`.chip-solid` /
`.chip-on-dark`) and cards so nothing dissolves into the background. Set via
`Section`'s `tone` prop (`cream` / `volt` / …) and the `SectionHeader` `tone`
prop (`"page"` / `"onColor"` / `"onDark"`). The site scrollbar is hidden
globally, and `Section` accepts `overflowVisible` so a page can host a
`position: sticky` child (the Rules jump-to index).

**Logo & wordmark:** the nav shows the RapKids logo mark
(`public/brand/logo.png`, via `BrandLogo`) and the footer shows the higher-res
`public/brand/rapkids-footer.png` (via `BrandLockup`) beside the "RapKids"
wordmark set in **Nunito** (not the display face). Both hide the mark
cleanly if the file isn't present. `logo.png` is also the browser-tab favicon
(`metadata.icons` in `app/layout.tsx`).

Type: **Bubblegum Sans** (display headlines), **Nunito** (body/UI),
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
app/                 routes (landing + about/prizes/rules/faq/register/admin) + layout, globals
  api/chat/          streaming chat endpoint (Claude Haiku 4.5)
  api/kb/            content-base GET/PUT, admin-gated
  api/admin/         login/logout (sets/clears the admin session cookie)
  admin/             /admin — password gate + content-base editor
components/
  sections/          landing-page sections (Hero, Glance, HowItWorks, …)
  primitives/        reusable building blocks (CaretHeadline, CountUp, Reveal,
                      SectionCharacter, …)
  Chatbot/           ChampionshipChatbot — the standalone chat widget
  admin/             AdminLoginForm, KnowledgeBaseEditor
  Nav, Footer, PageHeader, PageShell, CtaBand, FaqAccordion, RegisterForm
lib/                 content.ts (copy/data), config.ts (URLs), motion.ts,
                      anthropic.ts, chat-context.ts, kb-store.ts, admin-auth.ts,
                      rate-limit.ts
public/               image assets + ASSETS.md
```
