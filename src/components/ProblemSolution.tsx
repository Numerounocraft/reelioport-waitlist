"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useRevealOnScroll } from "@/lib/use-reveal-on-scroll";

export function ProblemSolution() {
  const problemRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const [matchedHeight, setMatchedHeight] = useState<number>();
  const headingReveal = useRevealOnScroll<HTMLDivElement>();
  const closingReveal = useRevealOnScroll<HTMLDivElement>();

  // The Problem/Solution cards are fit-content sized (their text decides the
  // size, not a forced viewport height), but for the sticky swap below they
  // must render at the *same* height — otherwise whichever card is taller
  // unsticks earlier than the shorter one (release threshold is inversely
  // related to an element's own height under a shared sticky parent), so the
  // shorter card would flash back into view after the taller one has already
  // scrolled away. Measuring both and applying the max as a shared min-height
  // keeps them fit-content (sized to whichever is naturally tallest) while
  // keeping the swap glitch-free. The ResizeObserver re-measures on any size
  // change (including breakpoint-driven padding/wrapping changes), so this
  // stays correct at every viewport width, not just the one it first ran at.
  useLayoutEffect(() => {
    const measure = () => {
      const h1 = problemRef.current?.scrollHeight ?? 0;
      const h2 = solutionRef.current?.scrollHeight ?? 0;
      setMatchedHeight(Math.max(h1, h2));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (problemRef.current) ro.observe(problemRef.current);
    if (solutionRef.current) ro.observe(solutionRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const cardStyle = matchedHeight ? { minHeight: matchedHeight } : undefined;

  return (
    <section className="bg-white">
      <div
        ref={headingReveal.ref}
        style={headingReveal.style}
        className={`mx-auto max-w-[1313px] px-5 pt-16 text-center sm:px-10 sm:pt-20 lg:px-16 ${headingReveal.className}`}
      >
        <h2 className="font-display text-[28px] leading-tight text-brand-ink sm:text-[32px] sm:leading-10">
          YOUR VIDEO WORK. ONE PLACE.
        </h2>
      </div>

      {/* Sticky-stack: both cards share one parent, so once the Solution
          card reaches the top it doesn't get its own dwell/pin — it has no
          trailing room within this parent, so it releases the instant it
          arrives. Because both cards are matched to the same height, that
          release happens at the exact scroll position where Solution fully
          overlaps Problem, and past that point both continue scrolling up
          together in lockstep (Solution still on top, fully covering
          Problem) — no pause, no gap, no reappearance flicker. */}
      <div className="relative">
        <div className="sticky top-24 z-1 px-5 py-6 sm:px-10 lg:px-16">
          <div
            ref={problemRef}
            style={cardStyle}
            className="mx-auto flex w-fit max-w-[1313px] flex-col justify-center gap-4 rounded-4xl border border-black/5 bg-[#F7F7F5] p-10 text-left sm:p-16"
          >
            <h3 className="font-display text-xl text-brand-ink sm:text-2xl">
              THE PROBLEM
            </h3>
            <p className="max-w-xl text-lg leading-relaxed font-semibold text-brand-dark sm:text-xl">
              Your best video projects shouldn&apos;t be scattered across
              Google Drive, WeTransfer, Instagram, YouTube, Vimeo and a
              dozen random links. When someone wants to see what you can
              do, they shouldn&apos;t have to search for it.
            </p>
          </div>
        </div>

        <div className="sticky top-24 z-2 px-5 py-6 sm:px-10 lg:px-16">
          <div
            ref={solutionRef}
            style={cardStyle}
            className="mx-auto flex w-fit max-w-[1313px] flex-col justify-center gap-4 rounded-4xl bg-brand-dark p-10 text-left sm:p-16"
          >
            <h3 className="font-display text-xl text-brand-accent sm:text-2xl">
              THE SOLUTION
            </h3>
            <p className="max-w-xl text-lg leading-relaxed font-semibold text-white sm:text-xl">
              ReelioPort brings your video projects together in one
              personalised, professional video portfolio. One place to
              showcase your best work.
              <br />
              <br />
              One link to share with clients, employers, collaborators and
              anyone who needs to see what you can do.
            </p>
          </div>
        </div>
      </div>

      <div
        ref={closingReveal.ref}
        style={closingReveal.style}
        className={`mx-auto flex max-w-[1313px] flex-col items-center gap-14 px-5 py-16 text-center sm:gap-16 sm:px-10 sm:py-20 lg:px-16 ${closingReveal.className}`}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="rounded-md bg-brand-dark px-3 py-1.5 text-xs font-bold tracking-wide text-white uppercase">
            Just click play.
          </span>
          <p className="text-sm text-brand-dark/50">
            No digging. No downloading. No bouncing between links.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <h3 className="font-display text-xl text-brand-ink sm:text-2xl">
            AND THERE&apos;S MORE...
          </h3>
          <p className="max-w-2xl text-sm leading-[22px] font-semibold text-brand-dark">
            A better way to present your work is coming. ReelioPort is
            being built with exciting features designed to make showcasing
            your video work easier, more professional and more memorable.
            You&apos;ll have to join the waitlist to see what&apos;s
            coming. We&apos;ve been building ReelioPort around the way
            creatives actually work. And we&apos;re only getting started.
          </p>
        </div>
      </div>
    </section>
  );
}
