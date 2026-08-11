import type { CSSProperties } from "react";
import SphereImageGrid, { type ImageData } from "@/components/ui/img-sphere";

const CREATIVE_PHOTO_IDS = [
  "1492691527719-9d1e07e534b4",
  "1500462918059-b1a0cb512f1d",
  "1440404653325-ab127d49abc1",
  "1550684848-fac1c5b4e853",
  "1478720568477-152d9b164e26",
  "1517841905240-472988babdf9",
  "1585829365295-ab7cd400c167",
  "1524678606370-a47ad25cb82a",
  "1552168324-d612d77725e3",
  "1601506521793-dc748fc80b67",
  "1520333789090-1afc82db536a",
  "1560264280-88b68371db39",
  "1499750310107-5fef28a66643",
  "1554080353-a576cf803bda",
  "1573164713988-8665fc963095",
  "1478737270239-2f02b77fc618",
];

const CREATIVE_PHOTOS: ImageData[] = CREATIVE_PHOTO_IDS.map((id, index) => ({
  id: `creative-${index}`,
  src: `https://images.unsplash.com/photo-${id}?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=400`,
  alt: `Creative work sample ${index + 1}`,
  title: "Made with ReelioPort",
  description: "Every creative deserves a professional home for their work.",
}));

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

        <SphereImageGrid
          images={CREATIVE_PHOTOS}
          containerSize={380}
          sphereRadius={150}
          dragSensitivity={0.6}
          baseImageScale={0.16}
          autoRotate
          autoRotateSpeed={0.15}
        />
      </div>
    </section>
  );
}
