# Reelioport Waitlist — Handoff

Last updated: 2026-08-12 (waitlist-success modal's rocket now runs a full launch sequence — jitter, liftoff, smoke, reset, on loop; wired into both email forms — front-end only, no backend capture yet)

## What this is

A waitlist landing page for **Reelioport**, a video portfolio platform for
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
  onto the Reelioport palette so shadcn components render correctly out of
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
| Nav + Hero | `src/components/Hero.tsx` | ✅ Refined to exact spec (flush top, fixed nav, correct padding/type sizes); headline line-break and work-statement centering adjusted since; the reserved middle spacer now holds an interactive phone mockup carousel (`src/components/ui/phone-mockups-1.tsx`) — now visible at **all** breakpoints, not just `lg:` (fixed 2026-08-12, see below) |
| Why Join the Waitlist | `src/components/WhyJoinWaitlist.tsx` | ✅ Detail pass done — each card has a hover-animated Motion icon (gift, rocket, alarm-clock-check) in a mint circle; grid was already `grid-cols-1 sm:grid-cols-3`, no responsiveness fix needed |
| Built for Creatives | `src/components/BuiltForCreatives.tsx` | ✅ Detail pass done — the closing block is now `<StickyTextReveal />` (`src/components/StickyTextReveal.tsx`), a pinned scroll-scrubbed word-by-word text reveal — see below; audience tag cloud scattered with per-pill deterministic rotate/translate for `sm:` and up (hover settles flat), and as of 2026-08-12 becomes an infinite-scroll **marquee** below `sm` instead of stacking tall — see below; tags are `select-none` |
| Testimonial banner ("Footer" in Paper) | `src/components/TestimonialQuote.tsx` | ✅ Refined to exact spec (2026-08-12) — rebuilt as a single dark card (street photo + headline + form) matching Paper's current `Footer` frame exactly; no longer has a second scroll-pinned quote block. Headline copy changed 2026-08-12 to "YOUR NEXT OPPORTUNITY COULD START WITH ONE LINK." |

### Mobile responsiveness pass (2026-08-12)

Audited all 4 sections at a real 390px CSS viewport (via an iframe test harness —
`resize_window` doesn't actually change the page viewport in this environment).
WhyJoinWaitlist and TestimonialQuote were already fine. Fixed two gaps:

- **Hero phone carousel was invisible on mobile/tablet** — its wrapper was
  `hidden ... lg:block`, so nothing filled that column below 1024px. Changed to
  `flex w-full shrink-0 justify-center lg:w-auto lg:-my-16` so it always renders;
  `PhoneCarousel`'s own `h-[280px] sm:h-[320px] lg:h-[380px]` already sizes it
  correctly per breakpoint.
- **Built for Creatives tag list → marquee below `sm`** (explicit user request).
  New `sm:hidden` block: `-mx-5 overflow-hidden` wrapper (bleeds past section
  padding) with a `[mask-image:linear-gradient(...)]` edge fade, containing a
  `flex w-max animate-marquee gap-3` track built from `[...audiences, ...audiences]`
  (duplicated once for a seamless loop via `translateX(-50%)`). `animate-marquee`
  is a new Tailwind v4 theme token in `globals.css`: `--animate-marquee: marquee
  22s linear infinite` + a matching `@keyframes marquee` block. The original
  scattered/rotated grid is untouched, just re-wrapped `hidden ... sm:flex`
  instead of always-`flex`.

**ImageStreamHero swap (same day).** Replaced Built for Creatives' closing
headline+carousel block with `src/components/ui/image-stream-hero.tsx`, a
third-party component pasted in verbatim — no new deps, just React + the
existing `cn()` util. It draws two mirrored rails of cards that ride from a
vanishing point toward the viewer using `translate3d`/`rotateY` CSS keyframes
sampled numerically in JS (see the file's own header comment for the full
geometry rationale). Fed it `CORRIDOR_IMAGES` (8 entries) reusing Unsplash
URLs already verified live elsewhere in the app (4 from the old
`PORTFOLIO_REEL_IMAGES`, 4 from Hero's `phone-mockups-1.tsx`
`exampleImages`) rather than sourcing new ones. Kept the existing headline
copy as the component's `children` overlay instead of the demo's placeholder
text. Note: `phone-mockups-1-utils/phone-carousel.tsx` is still in use by
`Hero.tsx` — only `BuiltForCreatives.tsx`'s usage of it was swapped out.
Unlike `PhoneCarousel`, `ImageStreamHero` self-clips via its own
`overflow-hidden` wrapper, so it did not need the `overflow-x: hidden`
page-level fix below.

**Follow-up (same day): carousel removed, replaced with a sticky word-reveal.**
`ImageStreamHero` was pulled out of `BuiltForCreatives.tsx` entirely (the
component file itself is left in `src/components/ui/image-stream-hero.tsx`,
just unused — not deleted). In its place: `src/components/StickyTextReveal.tsx`,
a new client component that pins the headline + subtext ("WHATEVER YOU
CREATE..." / "It should make people stop." etc.) in place while the user
scrolls, lighting up each word in sequence (opacity 0.16 → 1) via a plain
scroll/resize listener (rAF-throttled) — **not** Motion's `useScroll`, which
is on record in this project as never firing change events (see the Motion
gotcha note further down).

**Bug hit + fixed: sticky didn't stick.** After wiring this up, `position:
sticky` silently did nothing — it computed but the element scrolled with its
parent instead of pinning. Cause: `overflow-x: hidden` on `html`/`body`
(added for the Hero carousel fan-bleed fix above) disables `position: sticky`
for *every* descendant on the page — any ancestor with non-`visible` overflow
on either axis breaks it, and `html`/`body` are ancestors of everything.
Fix: removed the global rule from `globals.css`; the Hero dark card already
has its own `overflow-hidden` (see `Hero.tsx`), which is sufficient to
contain the carousel's fan bleed locally without breaking sticky elsewhere.
**Lesson: prefer a locally-scoped `overflow-hidden` over a global
`html`/`body` one** — the global version is a landmine for any future
`position: sticky` usage on the page.

**Redesign (same day): two-phase experience, one subtext sentence at a
time.** `StickyTextReveal.tsx` now splits its `h-[350vh]` scroll track into
two phases: the first 30% (`HEADLINE_PHASE`) does the word-by-word headline
reveal as before; the remaining 70% drives a `subtextRaw` value consumed by
`sentenceStyle(raw, index)`, which gives each of the 5 subtext sentences a
dedicated slot — scale/fade in over the first 20% of its slot, hold at full
opacity for the middle 60%, scale/fade out over the last 20% — so only one
sentence is ever fully visible, with a brief crossfade at slot boundaries.
All 5 render `absolute inset-0` stacked in one box to avoid layout shift
from differing sentence lengths. The sticky container is now `h-screen`
(previously `min-h-[65vh]`) with both axes centered, and the gap between
headline and subtext is `gap-4` (16px). Caught and fixed a pacing bug where
the last sentence faded to invisible at the exact instant the section
unpinned (capping `subtextRaw` at `N - TRANSITION` instead of `N` fixed it
— see the component's inline comment).

**Follow-up fix (same day): horizontal overflow.** Two causes:
- The marquee wrapper had no explicit width — as a flex item in a
  `flex-col items-center` parent, it sized to its huge `w-max` content on the
  cross axis instead of being constrained (`overflow-hidden` only clips
  rendering, not this auto-sizing). Fixed by adding `w-full` to the wrapper.
- The Hero `PhoneCarousel`'s fanned side cards (`x: offset*62%`, intentionally
  unclipped so the fan is visible) could poke past the viewport edge now that
  the carousel shows on mobile. Rather than clip the carousel itself (which
  would cut off the fan), added `overflow-x: hidden` to `html` and `body` in
  `globals.css` — standard fix for decorative bleed content.

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
  the Footer testimonial card) now `preventDefault()`, reset themselves, and
  show `WaitlistSuccessModal` on submit — but neither actually sends the
  email anywhere. Needs a real integration (email service / DB) when ready
  — not a mock. Don't mistake the success modal appearing for confirmation
  that signups are being captured.
- **Waitlist success modal** (2026-08-12): `src/components/WaitlistSuccessModal.tsx`,
  built from a user-provided screenshot reference. Self-contained (not
  shadcn Dialog-based — hand-rolled overlay + Escape/backdrop-click to
  close + body scroll lock). Uses a new `--color-brand-mint-deep: #128a53`
  token (`globals.css`) for on-white green text/badge contrast — the pale
  `brand-mint` token alone isn't legible as text on white. Avatar stack is
  5 real Unsplash headshots (`crop=faces`). Both `Hero.tsx` and
  `TestimonialQuote.tsx` are now client components (`"use client"`) to hold
  the `showSuccess` state.
- **Modal re-skin** (2026-08-12, same day): top of the modal now shows
  `src/components/icons/WaitlistLaunchIllustration.tsx` — a hand-built SVG
  (rocket launching through clouds into a starry sky), based on a second
  screenshot reference the user provided, but recolored into the Reelioport
  palette (`brand-dark` sky, `brand-mint` accents, white rocket/clouds)
  instead of the reference's generic blue. Replaced the earlier
  checkmark-badge + dot-pattern treatment; card outer frame also toned down
  from a vivid mint glow to a subtle mat + soft shadow. Copy, avatar stack,
  and member-count line are unchanged from the original build.
- **Idle pre-launch animation** (2026-08-12, same day): 5 new CSS keyframes
  in `globals.css` (`--animate-rocket-bob`, `--animate-flame-flicker`,
  `--animate-trail-pulse`, `--animate-cloud-drift`, `--animate-star-twinkle`)
  applied per-element in `WaitlistLaunchIllustration.tsx` — the rocket
  gently bobs/wobbles in place (not an actual liftoff), the flame flickers,
  the trail glow pulses in sync, both cloud layers drift at different
  speeds/directions for parallax, and stars twinkle on staggered delays.
  `transform-origin` on each animated element is set as explicit
  `<x>px <y>px` matching the SVG's own `viewBox` (400×220) — SVG shapes use
  `view-box` as the default CSS transform reference box, so raw viewBox
  coordinates line up without extra `transform-box` handling.
- **Full launch sequence** (2026-08-12, same day): replaced the idle bob
  with a single `rocket-launch` keyframe (6s, ~23 stops) that tells the
  whole story in one loop — jitter (0-42%), crouch/coil (42-49%),
  accelerating liftoff off the top of the frame while fading out
  (49-79%), fully offscreen (79-99%), then an imperceptible snap back to
  the pad in the final ~1% so the reset doesn't visibly slide back down.
  Flame now lives *inside* the rocket's `<g>` (with its own nested
  `flame-flicker`) so they move together as one body. Added
  `--animate-engine-glow` (ambient glow synced to the same
  jitter→ignite→fade timeline) and `--animate-smoke-puff` (5 exhaust
  puffs left at the old pad position, `SMOKE_PUFFS` array in the
  component, each drifting on its own `--puff-x` custom property with a
  staggered negative delay). **Verification note**: this tool's `wait`
  action and in-page `setInterval` timing loops both proved unreliable for
  confirming multi-second CSS-animation progress (returned frozen,
  byte-identical `getComputedStyle` values across calls) — plain
  consecutive tool calls with no explicit `wait` between them (e.g.
  back-to-back screenshots) reliably showed the real progression instead.
  Prefer that approach if verifying a long CSS animation here again.
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
  placeholder "reel" images standing in for real Reelioport app
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
382ed4b Set up Reelioport brand foundation
b21790e Initial commit from Create Next App
```

Working tree is clean as of this handoff.
