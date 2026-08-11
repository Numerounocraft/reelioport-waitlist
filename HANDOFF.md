# ReelioPort Waitlist — Handoff

Last updated: 2026-08-11

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
| Nav + Hero | `src/components/Hero.tsx` | ✅ Refined to exact spec (flush top, fixed nav, correct padding/type sizes) |
| Why Join the Waitlist | `src/components/WhyJoinWaitlist.tsx` | ⏳ First-draft only — needs the same detail pass as Hero |
| Built for Creatives | `src/components/BuiltForCreatives.tsx` | ⏳ First-draft only |
| Testimonial banner + quote ("Footer" in Paper) | `src/components/TestimonialQuote.tsx` | ⏳ First-draft only |
| Final CTA | `src/components/FinalCta.tsx` | ⏳ First-draft only |
| Shared scroll-reveal helper | `src/components/ScrollReveal.tsx` | ✅ Working (see gotcha below) |

**Next step**: pick one of the ⏳ sections and re-pull it fresh from Paper,
checking padding/corner-rounding/font-size/positioning against the actual
JSX export rather than eyeballing a screenshot — that's what was missed on
Hero the first time.

## Known issues / things to remember

- **Motion's `useScroll` doesn't fire updates in this project.** Reproduced
  with React strict mode on and off, Motion 13.1.0 + Next.js 16.3.0 +
  Turbopack — `scrollYProgress` gets stuck at its initial value. Worked
  around in `ScrollReveal.tsx`'s `ScrollPin` with a manual rAF-throttled
  `scroll`/`resize` listener driving a `useMotionValue` instead. If you
  revisit scroll effects, re-test whether a newer Motion version fixes the
  root cause before assuming the manual listener is still needed.
- **Possible duplicate headline, unresolved**: "YOUR VIDEO PORTFOLIO SHOULD
  DO MORE THAN EXIST." appears twice in Paper — once in the testimonial
  banner (subline "Don't wait until you need a portfolio to build one.")
  and again as the standalone final CTA (subline "It should make people
  stop."). Built both as-is since it could be intentional repeat-for-
  emphasis copy, but worth confirming with the design before shipping.
- **No backend wiring yet.** Three email-capture forms on the page (hero,
  testimonial banner, and implicitly the CTA) have no submit handler or API
  route. Needs a real integration (email service / DB) when ready — not a
  mock.
- **Phone mockup placeholder**: Hero reserves an empty spacer
  (`aria-hidden` div, `lg:w-[300px]`) in its middle column for a phone
  mockup image the user will provide later.

## Git

Five commits so far, most recent first:

```
31a9b17 Refine hero section to match Paper spec exactly
ba4c5ba Build testimonial/quote banner and final CTA with scroll reveal
87500ae Build hero, why-join, and built-for-creatives sections
382ed4b Set up ReelioPort brand foundation
b21790e Initial commit from Create Next App
```

Working tree is clean as of this handoff.
