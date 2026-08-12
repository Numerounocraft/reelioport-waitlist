# ReelioPort Waitlist — Handoff

Last updated: 2026-08-12 (replaced the Built for Creatives 3D photo sphere with the same phone mockup carousel used in the Hero, in a light theme)

## What this is

A waitlist landing page for **ReelioPort**, a video portfolio platform for
creatives. Design lives in Paper (file "Graceful orchard",
fileId `01KZPBXW83X1MBH102GWE0GMNS`); this repo is the Next.js build of it.

- **Stack**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, ESLint,
  shadcn/ui conventions (`components.json`, `src/lib/utils.ts` with `cn()`,
  components live in `src/components/ui/`).
- **Run it**: `npm run dev` → http://localhost:3000
- **Brand tokens**: `src/app/globals.css` — `--color-brand-dark` (#012a2d),
  `--color-brand-mint` (#9dffc4), `--color-brand-ink` (#072f32). Fonts: Anton
  (`font-display`), Geist (body/default), Tauri (`font-tauri`, nav logo only).
  Also carries the standard shadcn/ui base tokens (`--primary`, `--secondary`,
  `--destructive`, `--muted`, `--accent`, `--border`, `--ring`, etc.), mapped
  onto the ReelioPort palette so shadcn components render correctly out of
  the box instead of silently losing their styling.

## Workflow

We're going **section by section**: pull exact specs from the live Paper
file for one section, build/refine it, verify in-browser, commit, then move
to the next. Not doing an all-at-once pass — earlier attempt at that needed
a redo for missing details (padding, fixed positioning, exact type sizes).

**Paper node IDs shift** every time the file is restructured — always
re-fetch `get_basic_info` → `get_tree_summary` → `get_jsx` /
`get_node_info` for the specific section before trusting any ID below.

## Section status

| Section | Component | Status |
|---|---|---|
| Nav + Hero | `src/components/Hero.tsx` | ✅ Refined to exact spec (flush top, fixed nav, correct padding/type sizes); headline line-break and work-statement centering adjusted since; the reserved middle spacer now holds an interactive phone mockup carousel (`src/components/ui/phone-mockups-1.tsx`) — see note below |
| Why Join the Waitlist | `src/components/WhyJoinWaitlist.tsx` | ✅ Detail pass done — each card has a hover-animated Motion icon (gift, rocket, alarm-clock-check) in a mint circle |
| Built for Creatives | `src/components/BuiltForCreatives.tsx` | ✅ Detail pass done — the 3D photo sphere (`img-sphere.tsx`/`responsive-img-sphere.tsx`, now **deleted**) was replaced 2026-08-12 with the same `PhoneCarousel` used in the Hero, rendered with `controlsVariant="light"` for the white section background, showing 4 portfolio-reel placeholder images (fashion editorial, culinary, street performance, motion-graphics/abstract art); audience tag cloud scattered with per-pill deterministic rotate/translate (desktop only, hover settles flat) instead of a tidy grid; tags are `select-none` |
| Testimonial banner ("Footer" in Paper) | `src/components/TestimonialQuote.tsx` | ✅ Refined to exact spec (2026-08-12) — rebuilt as a single dark card (street photo + headline + form) matching Paper's current `Footer` frame exactly; no longer has a second scroll-pinned quote block |

**Next step**: page now renders all four sections that exist in the current
Paper file — Hero, Why Join the Waitlist, Built for Creatives, and the
Footer testimonial card — in that order, all at full refinement.
`FinalCta.tsx` and `ScrollReveal.tsx` were **deleted** (2026-08-12): the
Paper file's "Waitlst Landing Page" artboard now only has 4 child frames
(`Hero`, `Why Join?`, `Built for Creatives`, `Footer`) — there's no
separate final-CTA frame anymore, and nothing else used the
`ScrollPin`/`RevealWords` helpers once `TestimonialQuote` stopped needing
them. If a final CTA ever comes back to the Paper file, note the old bug:
a `ScrollPin` with `heightVh={200}` as the very last element on the page
scrolled its pinned headline out of the viewport before the true bottom of
the page (confirmed via DOM: text opacity reached 1 but
`getBoundingClientRect().top` was ~-340px at max scroll) — would need a
smaller `heightVh` or a trailing spacer.

## Known issues / things to remember

- **Motion's `useScroll` gotcha is no longer relevant.** It never fired
  update events in this project (reproduced with React strict mode on and
  off, Motion 13.1.0 + Next.js 16.3.0 + Turbopack — `scrollYProgress` got
  stuck at its initial value), but the only two components that used the
  `ScrollReveal.tsx` workaround (`TestimonialQuote`'s old scroll-pinned
  quote block and `FinalCta`) have both been removed/rebuilt, so
  `ScrollReveal.tsx` was deleted 2026-08-12. If a future section wants a
  pinned/scrubbed scroll effect, re-test whether a newer Motion version
  fixes `useScroll` before reaching for a manual rAF listener again.
- **No backend wiring yet.** Two email-capture forms on the page (hero and
  the Footer testimonial card) have no submit handler or API route. Needs a
  real integration (email service / DB) when ready — not a mock.
- **Phone mockup carousel** (2026-08-12): `src/components/ui/phone-mockups-1.tsx`
  (entry point, used by `Hero.tsx`) + `phone-mockups-1-utils/phone-carousel.tsx`
  (the actual `PhoneCarousel` — this file's implementation isn't from an
  external source, it was written from scratch to match the given API
  surface: a fanned stack of phone frames, click-through via `shadcn/ui`
  `Button` + dot indicators, autoplay that pauses on hover, spring
  transitions via `motion/react`). Takes a `controlsVariant?: "light" |
  "dark"` prop (default `"dark"`) so the prev/next buttons and dots stay
  legible on both the Hero's dark card and `BuiltForCreatives`' white
  background — `BuiltForCreatives` now imports `PhoneCarousel` directly
  (not through the `phone-mockups-1.tsx` wrapper, since that one is fixed to
  the Hero's specific image set) and passes `controlsVariant="light"` with
  its own `PORTFOLIO_REEL_IMAGES` array. Sits in `Hero.tsx`'s middle column
  with `lg:-my-16` so it overlaps the dark hero card prominently instead of
  just sitting flush inside it. Both usages currently show Unsplash
  placeholder "reel" images standing in for real ReelioPort app
  screenshots — swap them for actual product screenshots when available.
  Remote Unsplash images required whitelisting `images.unsplash.com` /
  `plus.unsplash.com` in `next.config.ts`'s `images.remotePatterns`.
- **shadcn/ui set up this session**: no `components.json` existed before
  (project had `src/components/ui/` already by convention but no formal
  shadcn scaffolding). Added `components.json`, `src/lib/utils.ts` (`cn()`
  via `clsx` + `tailwind-merge`), and the shadcn base color tokens in
  `globals.css`. Installed `@radix-ui/react-slot`, `class-variance-authority`,
  `clsx`, `tailwind-merge`. `src/components/ui/button.tsx` is the first
  actual shadcn component in the repo.

## Git

Most recent first:

```
9b7d0fb Prevent text selection on Built for Creatives tag pills
1807984 Scatter the Built for Creatives tag cloud for an organic look
da1a967 Add animated hover icons and a 3D photo sphere for Built for Creatives
644fc58 Adjust Hero headline line break and align work statement to center
cd8e2f3 Add handoff doc for section-by-section refinement workflow
31a9b17 Refine hero section to match Paper spec exactly
ba4c5ba Build testimonial/quote banner and final CTA with scroll reveal
87500ae Build hero, why-join, and built-for-creatives sections
382ed4b Set up ReelioPort brand foundation
b21790e Initial commit from Create Next App
```

Working tree is clean as of this handoff.
