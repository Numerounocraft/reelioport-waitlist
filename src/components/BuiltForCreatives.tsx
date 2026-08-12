import type { CSSProperties } from "react";
import { type ImageData } from "@/components/ui/img-sphere";
import { ResponsiveImgSphere } from "@/components/ui/responsive-img-sphere";

const CREATIVE_PHOTOS_RAW = [
  { id: "1663047699138-3f18f53aa36f", premium: true, alt: "Video editor reviewing footage on a multi-monitor timeline" },
  { id: "1663039900507-b428a0be2924", premium: true, alt: "Colorist grading footage on a wide monitor" },
  { id: "1618329027137-a520b57c6606", premium: false, alt: "Video editor working in Premiere Pro at night" },
  { id: "1682141028605-b2456e2bab14", premium: true, alt: "Editor's hand on a keyboard in front of a color-grading timeline" },
  { id: "1682146717223-874ac7dcc607", premium: true, alt: "Camera operator filming a commercial shoot with a monitor rig" },
  { id: "1682146720153-4d5bdf56f143", premium: true, alt: "Videographer directing a commercial shoot in studio" },
  { id: "1682146739433-5926577acb7a", premium: true, alt: "Cinematographer holding a steadicam rig under studio lighting" },
  { id: "1682130336901-10452a5dd5f4", premium: true, alt: "Content creator recording a video in a home studio" },
  { id: "1695408246612-584543865997", premium: false, alt: "Videographer filming a lifestyle scene in a kitchen" },
  { id: "1673767297353-0a4c8ad61b05", premium: false, alt: "Creator holding a clapperboard on set" },
  { id: "1663957821802-4969fe6a0347", premium: true, alt: "Photographer shooting in a studio with softbox lighting" },
  { id: "1758613868506-9c860063a527", premium: true, alt: "Photographer reviewing shots on a laptop beside studio lights" },
  { id: "1661281412140-dfb328ae967b", premium: true, alt: "Freelance designer selecting color palettes at a desk" },
  { id: "1661679584923-e6f62b0a9834", premium: true, alt: "Sound engineer mixing a track in a recording studio" },
  { id: "1599252441131-5aafffcf7740", premium: false, alt: "Animator sketching on a drawing tablet" },
  { id: "1663040316559-8684ca45d7e9", premium: true, alt: "Two editors collaborating on a video timeline" },
];

const CREATIVE_PHOTOS: ImageData[] = CREATIVE_PHOTOS_RAW.map((photo, index) => ({
  id: `creative-${index}`,
  src: `https://${photo.premium ? "plus" : "images"}.unsplash.com/${photo.premium ? "premium_photo" : "photo"}-${photo.id}?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=400`,
  alt: photo.alt,
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

        <ResponsiveImgSphere images={CREATIVE_PHOTOS} />
      </div>
    </section>
  );
}
