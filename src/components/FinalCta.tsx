"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { ScrollPin, RevealWords } from "@/components/ScrollReveal";

function Subline({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.75, 1], [0, 1]);
  return (
    <motion.p
      style={{ opacity }}
      className="text-lg font-semibold text-white"
    >
      It should make people stop.
    </motion.p>
  );
}

export function FinalCta() {
  return (
    <section className="bg-white px-5 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-4xl bg-brand-dark">
        <ScrollPin heightVh={200}>
          {(progress) => (
            <div className="flex max-w-3xl flex-col items-center gap-3.5 px-6 text-center">
              <RevealWords
                text="YOUR VIDEO PORTFOLIO SHOULD DO MORE THAN EXIST."
                progress={progress}
                range={[0.1, 0.7]}
                className="font-display text-4xl leading-tight text-white sm:text-6xl sm:leading-tight"
              />
              <Subline progress={progress} />
            </div>
          )}
        </ScrollPin>
      </div>
    </section>
  );
}
