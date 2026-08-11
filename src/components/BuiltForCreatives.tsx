const audiences = [
  "VIDEOGRAPHERS",
  "3D ARTIST",
  "STUDENTS",
  "CONTENT CREATORS",
  "VIDEO-EDITORS",
  "MOTION DESIGNERS",
  "FILMMAKERS",
  "FREELANCERS",
  "ANIMATORS",
  "FREELANCERS",
  "CREATIVE AGENCY",
];

const offsets = [
  "sm:mt-2",
  "sm:mt-0",
  "sm:mt-6",
  "sm:mt-8",
  "sm:mt-3",
  "sm:mt-9",
  "sm:mt-14",
  "sm:mt-16",
  "sm:mt-20",
  "sm:mt-2",
  "sm:-mt-2",
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

        <div className="flex flex-wrap items-center justify-center gap-4">
          {audiences.map((audience, index) => (
            <span
              key={`${audience}-${index}`}
              className={`rounded-full bg-brand-mint px-6 py-2 text-xl font-bold text-brand-dark sm:text-[25px] ${offsets[index]}`}
            >
              {audience}
            </span>
          ))}
        </div>

        <h2 className="max-w-3xl text-center font-display text-[28px] leading-9 text-brand-ink sm:text-[40px] sm:leading-[50px]">
          WHATEVER YOU CREATE, GIVE YOUR VIDEO WORK A PROFESSIONAL HOME.
        </h2>
      </div>
    </section>
  );
}
