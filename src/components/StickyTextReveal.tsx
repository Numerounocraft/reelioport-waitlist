"use client";

import * as React from "react";

const HEADLINE =
  "WHATEVER YOU CREATE, GIVE YOUR VIDEO WORK A PROFESSIONAL HOME.";

const SUBTEXT_LINES = [
  "It should make people stop.",
  "It should make them watch.",
  "It should make them remember your work.",
  "And when the right opportunity comes along, you should already have one professional link ready to share.",
  "That's ReelioPort.",
];

/** Fraction of the scroll track spent revealing the headline before the subtext starts cycling. */
const HEADLINE_PHASE = 0.3;

/** Fraction of each subtext sentence's slot spent scaling in/out at its edges; the rest is held at full opacity. */
const TRANSITION = 0.2;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/**
 * Tracks scroll progress through `ref`'s element as a 0-1 value, where 0 is
 * the element's top entering the viewport and 1 is its bottom leaving.
 * Uses a plain scroll/resize listener (rAF-throttled) rather than Motion's
 * useScroll, which never fired change events in this project.
 */
function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let ticking = false;

    const measure = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        setProgress(total > 0 ? clamp(-rect.top / total, 0, 1) : 0);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return progress;
}

function HeadlineWord({
  children,
  revealed,
}: {
  children: string;
  revealed: number;
}) {
  return (
    <span
      className="inline-block transition-opacity duration-300 ease-out"
      style={{ opacity: 0.16 + revealed * 0.84 }}
    >
      {children}
    </span>
  );
}

/** Blur (px) applied while a sentence is entering/exiting; 0 once fully held. */
const BLUR_AMOUNT = 8;

/** A single subtext sentence's opacity/scale/blur for its dedicated slot of `raw` (0-N, N = sentence count). */
function sentenceStyle(raw: number, index: number) {
  const rel = raw - index;

  if (rel <= 0 || rel >= 1) {
    return { opacity: 0, scale: rel <= 0 ? 0.85 : 1.15, blur: BLUR_AMOUNT };
  }
  if (rel < TRANSITION) {
    const t = rel / TRANSITION;
    return { opacity: t, scale: 0.85 + 0.15 * t, blur: BLUR_AMOUNT * (1 - t) };
  }
  if (rel > 1 - TRANSITION) {
    const t = (rel - (1 - TRANSITION)) / TRANSITION;
    return { opacity: 1 - t, scale: 1 + 0.15 * t, blur: BLUR_AMOUNT * t };
  }
  return { opacity: 1, scale: 1, blur: 0 };
}

export function StickyTextReveal() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(trackRef);

  const words = React.useMemo(() => HEADLINE.split(" "), []);

  const headlineProgress = clamp(progress / HEADLINE_PHASE, 0, 1);
  // Capped just short of the sentence count so the last sentence holds at
  // full opacity through the end of the track instead of fading out right
  // as the section unpins.
  const subtextRawMax = SUBTEXT_LINES.length - TRANSITION;
  const subtextRaw =
    clamp((progress - HEADLINE_PHASE) / (1 - HEADLINE_PHASE), 0, 1) *
    subtextRawMax;

  return (
    <div ref={trackRef} className="relative h-[350vh] w-full">
      <div className="sticky top-0 flex h-[80vh] flex-col items-center justify-center gap-2 px-6 text-center">
        <h2 className="max-w-3xl text-balance font-display text-[28px] leading-9 text-brand-ink sm:text-[40px] sm:leading-[50px]">
          {words.map((word, i) => {
            const revealed = clamp(headlineProgress * words.length - i, 0, 1);
            return (
              <React.Fragment key={i}>
                <HeadlineWord revealed={revealed}>{word}</HeadlineWord>
                {i < words.length - 1 ? " " : ""}
              </React.Fragment>
            );
          })}
        </h2>

        <div className="relative w-full max-w-2xl min-h-[6.5rem] sm:min-h-[3.5rem]">
          {SUBTEXT_LINES.map((line, i) => {
            const { opacity, scale, blur } = sentenceStyle(subtextRaw, i);
            return (
              <p
                key={line}
                className="absolute inset-0 flex items-center justify-center text-balance text-lg leading-[22px] font-semibold text-brand-dark sm:text-xl"
                style={{
                  opacity,
                  transform: `scale(${scale})`,
                  filter: `blur(${blur}px)`,
                }}
              >
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StickyTextReveal;
