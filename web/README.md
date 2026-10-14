# AVARIA — Pinaakini Infra landing page

Light-theme luxury landing page with a scroll-scrubbed cinematic hero.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## How the cinematic works
- `public/frames/d/*.webp` (1226×690, desktop) and `public/frames/m/*.webp` (854×480, phones):
  220 frames exported from the supplied Untitled_Scene PNG sequence (fade-from-black frames 1–5
  dropped, bottom 30px cropped to remove the generator watermark).
- `src/components/HeroScrub.tsx` draws them to a `<canvas>` inside a sticky 500vh section.
  Scroll progress → frame index (lerped), frames load coarse-to-fine so scrubbing works instantly.
- `src/components/SmoothScroll.tsx` — Lenis inertial scroll (off under prefers-reduced-motion).

## Editing content
All copy, stats, features, spaces, FAQ, contact and social links live in `src/lib/site.ts`.
Contact details and social URLs are **placeholders** — replace before launch.
Set `NEXT_PUBLIC_SITE_URL` to the production domain for Open Graph URLs.
