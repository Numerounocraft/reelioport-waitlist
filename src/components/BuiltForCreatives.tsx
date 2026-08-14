"use client";

import type { CSSProperties } from "react";
import { useRevealOnScroll } from "@/lib/use-reveal-on-scroll";

const audiences = [
  { label: "VIDEOGRAPHERS", rotate: -3, x: -4, y: 5 },
  { label: "3D ARTIST", rotate: 2, x: 3, y: -7 },
  { label: "STUDENTS", rotate: -2, x: -5, y: 3 },
  { label: "CONTENT CREATORS", rotate: 3, x: 4, y: -4 },
  { label: "VIDEO-EDITORS", rotate: -3, x: -3, y: 6 },
  { label: "MOTION DESIGNERS", rotate: 2, x: 4, y: -3 },
  { label: "FILMMAKERS", rotate: -2, x: -4, y: 4 },
  { label: "FREELANCERS", rotate: 3, x: 3, y: -6 },
  { label: "ANIMATORS", rotate: -2, x: -3, y: 2 },
  { label: "FREELANCERS", rotate: 2, x: 4, y: -3 },
  { label: "CREATIVE AGENCY", rotate: -3, x: -3, y: 5 },
];

// Mobile marquee splits the tags across two rows scrolling in opposite
// directions, rather than one long row.
const marqueeMidpoint = Math.ceil(audiences.length / 2);
const marqueeRowA = audiences.slice(0, marqueeMidpoint);
const marqueeRowB = audiences.slice(marqueeMidpoint);

export function BuiltForCreatives() {
  const headingReveal = useRevealOnScroll<HTMLDivElement>();

  return (
    <section className="bg-white px-5 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-16 sm:gap-20">
        <div
          ref={headingReveal.ref}
          style={headingReveal.style}
          className={`flex flex-col items-center gap-3.5 text-center ${headingReveal.className}`}
        >
          <h2 className="font-display text-4xl text-brand-ink sm:text-5xl">
            BUILT FOR CREATIVES
          </h2>
          <p className="max-w-2xl text-base font-semibold leading-5 text-brand-dark">
            Whether you create films, campaigns, animations, social content,
            branded videos, motion graphics or other visual content, your
            video work deserves a professional home
          </p>
        </div>

        <div className="flex w-full -mx-5 flex-col gap-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] sm:hidden">
          <div className="flex w-max animate-marquee gap-3">
            {[...marqueeRowA, ...marqueeRowA].map((audience, index) => (
              <span
                key={`${audience.label}-marquee-a-${index}`}
                className="select-none whitespace-nowrap rounded-full bg-brand-accent px-6 py-2 text-xl font-bold text-brand-dark"
              >
                {audience.label}
              </span>
            ))}
          </div>
          <div className="flex w-max animate-marquee gap-3 [animation-direction:reverse]">
            {[...marqueeRowB, ...marqueeRowB].map((audience, index) => (
              <span
                key={`${audience.label}-marquee-b-${index}`}
                className="select-none whitespace-nowrap rounded-full bg-brand-accent px-6 py-2 text-xl font-bold text-brand-dark"
              >
                {audience.label}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden flex-wrap items-center justify-center gap-x-6 gap-y-9 sm:flex">
          {audiences.map((audience, index) => (
            <span
              key={`${audience.label}-${index}`}
              className="select-none rounded-full bg-brand-accent px-6 py-2 text-[25px] font-bold text-brand-dark transition-transform duration-300 ease-out rotate-[var(--r)] translate-x-[var(--x)] translate-y-[var(--y)] hover:rotate-0 hover:translate-x-0 hover:translate-y-0"
              style={
                {
                  "--r": `${audience.rotate}deg`,
                  "--x": `${audience.x}px`,
                  "--y": `${audience.y}px`,
                } as CSSProperties
              }
            >
              {audience.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
