# ReelioPort Waitlist — Handoff

Last updated: 2026-08-12 (enlarged the Built for Creatives photo sphere and swapped in real creative-work photos, made its size responsive)

## What this is

A waitlist landing page for **ReelioPort**, a video portfolio platform for
creatives. Design lives in Paper (file "Graceful orchard",
fileId `01KZPBXW83X1MBH102GWE0GMNS`); this repo is the Next.js build of it.

- **Stack**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, ESLint.
- **Run it**: `npm run dev` → http://localhost:3000
- **Brand tokens**: `src/app/globals.css` — `--color-brand-dark` (#012a2d),
  `--color-brand-mint` (#9dffc4), `--color-brand-ink` (#072f32). Fonts: Anton
  (`font-display`), Geist (body/default), Tauri (`font-tauri`, nav logo only).

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
| Nav + Hero | `src/components/Hero.tsx` | ✅ Refined to exact spec (flush top, fixed nav, correct padding/type sizes); headline line-break and work-statement centering adjusted since |
| Why Join the Waitlist | `src/components/WhyJoinWaitlist.tsx` | ✅ Detail pass done — each card has a hover-animated Motion icon (gift, rocket, alarm-clock-check) in a mint circle |
| Built for Creatives | `src/components/BuiltForCreatives.tsx` | ✅ Detail pass done — draggable/auto-rotating 3D photo sphere (`src/components/ui/img-sphere.tsx`), sized responsively via `src/components/ui/responsive-img-sphere.tsx` (300px mobile / 440px tablet / 560px desktop container, up from a fixed 380px); populated with 16 verified Unsplash photos of creatives actually at work (editors, videographers, photographers, a colorist, a sound engineer, an animator) instead of generic/abstract stock photos; audience tag cloud scattered with per-pill deterministic rotate/translate (desktop only, hover settles flat) instead of a tidy grid; tags are `select-none` |
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
- **Phone mockup placeholder**: Hero reserves an empty spacer
  (`aria-hidden` div, `lg:w-[300px]`) in its middle column for a phone
  mockup image the user will provide later.

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
