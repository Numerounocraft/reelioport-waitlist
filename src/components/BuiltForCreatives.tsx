import type { CSSProperties } from "react";
import {
  type ImageItem,
  PhoneCarousel,
} from "@/components/ui/phone-mockups-1-utils/phone-carousel";

const PORTFOLIO_REEL_IMAGES: ImageItem[] = [
  {
    src: "https://plus.unsplash.com/premium_photo-1683147724451-33fe3f2ad914?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=600",
    alt: "Fashion editorial reel on ReelioPort",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1693330138904-125cce9af9a5?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=600",
    alt: "Culinary content reel on ReelioPort",
  },
  {
    src: "https://images.unsplash.com/photo-1770413691288-c1ce7629fa28?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=600",
    alt: "Street performance reel on ReelioPort",
  },
  {
    src: "https://images.unsplash.com/photo-1764440093608-b392dab0dac6?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=600",
    alt: "Motion graphics reel on ReelioPort",
  },
];

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

export function BuiltForCreatives() {
  return (
    <section className="bg-white px-5 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-16 sm:gap-20">
        <div className="flex flex-col items-center gap-3.5 text-center">
          <h2 className="font-display text-4xl text-brand-ink sm:text-5xl">
            BUILT FOR CREATIVES
          </h2>
          <p className="max-w-2xl text-base font-semibold leading-5 text-brand-dark">
            Whether you create films, campaigns, animations, social content,
            branded videos, motion graphics or other visual content, your
            video work deserves a professional home
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-9">
          {audiences.map((audience, index) => (
            <span
              key={`${audience.label}-${index}`}
              className="select-none rounded-full bg-brand-mint px-6 py-2 text-xl font-bold text-brand-dark transition-transform duration-300 ease-out sm:rotate-[var(--r)] sm:translate-x-[var(--x)] sm:translate-y-[var(--y)] sm:text-[25px] sm:hover:rotate-0 sm:hover:translate-x-0 sm:hover:translate-y-0"
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

        <h2 className="max-w-3xl text-center font-display text-[28px] leading-9 text-brand-ink sm:text-[40px] sm:leading-[50px]">
          WHATEVER YOU CREATE, GIVE YOUR VIDEO WORK A PROFESSIONAL HOME.
        </h2>

        <PhoneCarousel images={PORTFOLIO_REEL_IMAGES} controlsVariant="light" />
      </div>
    </section>
  );
}
