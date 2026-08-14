"use client";

import type { ElementType } from "react";
import { AnimatedAlarmClockCheck } from "@/components/icons/AnimatedAlarmClockCheck";
import { AnimatedGift } from "@/components/icons/AnimatedGift";
import { AnimatedRocket } from "@/components/icons/AnimatedRocket";
import { useRevealOnScroll } from "@/lib/use-reveal-on-scroll";

const features = [
  {
    title: "EXCLUSIVE PRO DISCOUNT",
    description:
      "Waitlist members get an exclusive discount when ReelioPort Pro launches.",
    icon: AnimatedGift,
  },
  {
    title: "EARLY ACCESS",
    description:
      "Be among the first creatives to experience ReelioPort before it opens to everyone.",
    icon: AnimatedRocket,
  },
  {
    title: "BE READY",
    description:
      "Have a professional home for your video work when your next opportunity comes knocking.",
    icon: AnimatedAlarmClockCheck,
  },
];

function FeatureCard({
  title,
  description,
  icon: Icon,
  delayMs,
}: {
  title: string;
  description: string;
  icon: ElementType<{ className?: string }>;
  delayMs: number;
}) {
  const reveal = useRevealOnScroll<HTMLDivElement>({ delayMs });

  return (
    <div
      ref={reveal.ref}
      style={reveal.style}
      className={`flex flex-col gap-4 ${reveal.className}`}
    >
      <Icon className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent" />
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-brand-accent">
          {title}
        </h3>
        <p className="max-w-[267px] text-[13px] leading-4 tracking-[-0.01em] text-brand-accent">
          {description}
        </p>
      </div>
    </div>
  );
}

export function WhyJoinWaitlist() {
  const headingReveal = useRevealOnScroll<HTMLHeadingElement>();

  return (
    <div className="flex flex-col gap-12 rounded-4xl bg-brand-dark p-8 sm:gap-16 sm:p-16">
      <h2
        ref={headingReveal.ref}
        style={headingReveal.style}
        className={`font-display text-[32px] leading-10 text-white ${headingReveal.className}`}
      >
        WHY JOIN THE WAITLIST?
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            delayMs={index * 120}
          />
        ))}
      </div>
    </div>
  );
}
