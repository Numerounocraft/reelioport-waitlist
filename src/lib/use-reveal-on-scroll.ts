"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Basic fade-up entrance animation: element starts slightly lower and
 * transparent, then settles into place the first time it scrolls into view
 * (or immediately, for anything already in the viewport on load — e.g. the
 * Hero). Fires once per element (observer unobserves after the first
 * intersection) and skips straight to the revealed state for users who
 * prefer reduced motion.
 *
 * Usage: spread the returned props onto the element you want to animate —
 * no wrapper div needed, so it can't disturb existing flex/grid layout.
 *
 *   const reveal = useRevealOnScroll<HTMLDivElement>();
 *   <div ref={reveal.ref} className={`${reveal.className} existing-classes`}>
 */
export function useRevealOnScroll<T extends HTMLElement>(
  options: { threshold?: number; delayMs?: number } = {},
) {
  const { threshold = 0.15, delayMs = 0 } = options;
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return {
    ref,
    className: `transition-all duration-700 ease-out ${
      revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    }`,
    style: revealed ? { transitionDelay: `${delayMs}ms` } : undefined,
  };
}
