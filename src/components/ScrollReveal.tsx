"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";

/**
 * Pins its content for the duration of a tall scroll track and exposes
 * scroll progress (0 → 1) through that track to `children`.
 *
 * Progress is tracked with a manual scroll listener rather than Motion's
 * useScroll: in this project useScroll's internal observer never fired
 * change events after the initial (pre-hydration) measurement, leaving
 * scrollYProgress permanently stuck — reproduced with strict mode on and
 * off, so a manual rAF-throttled listener is used instead.
 */
export function ScrollPin({
  children,
  heightVh = 250,
  className = "",
}: {
  children: (progress: MotionValue<number>) => ReactNode;
  heightVh?: number;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    function measure() {
      frame = 0;
      const rect = track!.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const raw = scrollable > 0 ? -rect.top / scrollable : 0;
      progress.set(Math.min(1, Math.max(0, raw)));
    }

    function onScrollOrResize() {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [progress]);

  return (
    <div ref={trackRef} style={{ height: `${heightVh}vh` }} className={`relative ${className}`}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {children(progress)}
      </div>
    </div>
  );
}

/** Reveals `text` word by word as `progress` moves across `range`. */
export function RevealWords({
  text,
  progress,
  range = [0.15, 0.85],
  className = "",
  dimOpacity = 0.18,
}: {
  text: string;
  progress: MotionValue<number>;
  range?: [number, number];
  className?: string;
  dimOpacity?: number;
}) {
  const words = text.split(" ");
  const [start, end] = range;
  const span = end - start;

  return (
    <p className={className}>
      {words.map((word, i) => {
        const wordStart = start + (span * i) / words.length;
        const wordEnd = start + (span * (i + 1)) / words.length;
        return (
          <RevealWord
            key={`${word}-${i}`}
            progress={progress}
            range={[wordStart, wordEnd]}
            dimOpacity={dimOpacity}
          >
            {word}
          </RevealWord>
        );
      })}
    </p>
  );
}

function RevealWord({
  children,
  progress,
  range,
  dimOpacity,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  dimOpacity: number;
}) {
  const opacity = useTransform(progress, range, [dimOpacity, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}
