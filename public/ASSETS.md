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
| `hero-champion.png` | Home hero (right side) | A single hero character celebrating / at the keyboard, **transparent background** | Portrait, ~800 × 1000px (4:5), PNG |
| `comic-champion.png` | Home "Prizes" teaser, Prizes page | A comic character bust/badge, **transparent background** | Square-ish, ~600 × 600px, PNG |
| `char-howitworks.png` | Home "How it works" (bottom-left corner) | A character cheering, no background | ~500px tall, PNG, cropped tight to the figure |
| `char-about.png` | Home "About" teaser (bottom-right corner) | A character typing confidently, no background | ~500px tall, PNG, cropped tight to the figure |
| `char-rules.png` | Home "Rules & safety" teaser (bottom-left corner) | A character giving a thumbs up, no background | ~500px tall, PNG, cropped tight to the figure |
| `char-cta.png` | Home closing CTA (bottom-right corner) | A character waving, no background | ~500px tall, PNG, cropped tight to the figure |

These four sit bare in the corner of their section — no card or frame around
them — so a tight crop with a fully transparent background (no drop shadow
baked in) is what makes them "just fit in." They only show on wide desktop
screens (xl breakpoint and up) since narrower viewports don't have the side
margin to fit them without overlapping the copy.

**Optional extra characters** you can add and I can wire in on request:
`junior-kid.png`, `senior-kid.png`, `mascot.png`, `champion-trophy.png`.

---

## 2. Brand & social — `public/brand/`

| Filename | Used on | What it should be | Recommended size |
|---|---|---|---|
| `og-image.png` | Link previews (WhatsApp, X, Facebook, iMessage) | A branded share card: title + "$4,000 · Live Grand Final" + a character | **1200 × 630px**, PNG or JPG |
| `rapkids-footer.png` | Footer, centered lockup | The RapKids logo mark, transparent background | ~200px tall, PNG (height-constrained, width flexes) |

---

## 3. Background images & patterns — `public/backgrounds/` and `public/patterns/`

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
