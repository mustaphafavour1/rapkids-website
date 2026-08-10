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
| `comic-champion.png` | Home "Prizes" teaser, Prizes page, About page | A comic character bust/badge, **transparent background** | Square-ish, ~600 × 600px, PNG |

**Optional extra characters** you can add and I can wire in on request:
`junior-kid.png`, `senior-kid.png`, `mascot.png`, `champion-trophy.png`.

---

## 2. Brand & social — `public/brand/`

| Filename | Used on | What it should be | Recommended size |
|---|---|---|---|
| `og-image.png` | Link previews (WhatsApp, X, Facebook, iMessage) | A branded share card: title + "$4,000 · Live Grand Final" + a character | **1200 × 630px**, PNG or JPG |
| `logo.svg` *(optional)* | Can replace the text wordmark | The RapKids logo, transparent | SVG preferred |

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
