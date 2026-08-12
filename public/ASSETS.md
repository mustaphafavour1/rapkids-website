# Uploading your images

Drop your files into the folders below using the **exact filenames** listed.
The site references these paths directly — match the names and everything wires
up automatically. Until a file exists, the site shows a tidy labelled
placeholder in its place (never a broken image), so you can upload art whenever
it's ready.

> Tip: after uploading, commit the files to the same branch. Transparent PNGs
> look best for the comic characters.

---

## 1. Comic characters — `public/characters/`

These are the transparent PNG characters from the app.

| Filename | Used on | What it should be | Recommended size |
|---|---|---|---|
| `hero-champion.png` | Home hero (right side) **and** the Prizes page hero | A single hero character celebrating / at the keyboard, **transparent background** | Portrait, ~800 × 1000px (4:5), PNG |
| `finalist-kid.png` | Prizes page, "If Your Child Makes the Grand Final" card (fills the card's right side, full height) | A finalist character standing/cheering, **transparent background**, cropped tight | Portrait, ~600 × 900px, PNG |
| `comic-champion.png` | Prizes page, "If Your Child Becomes Grand Champion" card (fills the card's right side, full height) | A comic champion character, **transparent background**, cropped tight | Portrait, ~600 × 900px, PNG |
| `char-howitworks.png` | Home "How it works" (top-right corner) | A character cheering, no background | ~500px tall, PNG, cropped tight to the figure |
| `char-about.png` | Home "About" teaser (bottom-right corner) | A character typing confidently, no background | ~500px tall, PNG, cropped tight to the figure |
| `char-rules.png` | Home "Rules & safety" teaser (top-right corner) | A character giving a thumbs up, no background | ~500px tall, PNG, cropped tight to the figure |

These sit bare in the corner of their section — no card or frame around them —
so a tight crop with a fully transparent background (no drop shadow baked in)
is what makes them "just fit in." They only show on wide desktop screens (xl
breakpoint and up) since narrower viewports don't have the side margin to fit
them without overlapping the copy.

**Optional extra characters** you can add and I can wire in on request:
`junior-kid.png`, `senior-kid.png`, `mascot.png`, `champion-trophy.png`.

---

## 2. Brand & social — `public/brand/`

| Filename | Used on | What it should be | Recommended size |
|---|---|---|---|
| `logo.png` | **Nav bar** (left of the wordmark) and the **browser-tab favicon** | The RapKids logo mark, transparent background, ideally square-ish so it reads well as a tiny tab icon | ~256 × 256px (or height-constrained), PNG |
| `rapkids-footer.png` | **Footer** centered lockup (a higher-res version of the mark) | The RapKids logo mark, transparent background | ~200px tall, PNG (height-constrained, width flexes) |
| `og-image.png` | Link previews (WhatsApp, X, Facebook, iMessage) | A branded share card: title + "$4,000 · Live Grand Final" + a character | **1200 × 630px**, PNG or JPG |

> The nav and footer show the "RapKids" wordmark on its own until `logo.png` is
> uploaded (no broken image, no placeholder box); the mark appears automatically
> once the file lands. The favicon points at the same file via
> `app/layout.tsx` (`metadata.icons`).

---

## 3. App screenshot — `public/screenshots/`

| Filename | Used on | What it should be | Recommended size |
|---|---|---|---|
| `why-it-works.png` | Home "Why it works" section (right side, replacing the placeholder score mock-up) | A real screenshot of the RapKids app scoring a typing run | 4:3, PNG or JPG |

---

## 4. Competitor photo — `public/photos/` (already included)

`senior-bracket.jpg` (and `junior-bracket.jpg`, currently unused) are real
photos checked into the repo; `senior-bracket.jpg` fronts the "Built to Be
Fair" section's single age-group (9–12) visual, sourced from Unsplash (free to
use, no attribution required). Swap it for your own photo whenever you'd like;
same filename, square crop, face centered.

---

## 5. Background images & patterns — `public/backgrounds/` and `public/patterns/`

Optional. The site already ships with built-in ambient textures (a faint grid
and dot field) so it looks complete without these. Upload here if you'd like to
layer in real art:

- `public/patterns/keys.png` — a tileable keycap / keyboard pattern (used very
  faintly behind sections).
- `public/patterns/confetti.png` — celebratory confetti for the winners/prizes
  areas.
- `public/backgrounds/arena.jpg` — a full-bleed "arena" or stage backdrop for
  the hero or final CTA.

These optional files aren't referenced by the code yet — tell me which ones you
upload and I'll layer them in tastefully (kept low-opacity so they never fight
the text).

---

## Where the paths live in code

- Character images: `components/primitives/CharacterImage.tsx` renders them with
  a graceful fallback.
- Social image: `app/layout.tsx` (`openGraph.images` / `twitter.images`).
- Add or rename characters in the section files under `components/sections/` and
  the pages under `app/`.
