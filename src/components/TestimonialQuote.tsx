"use client";

import Image from "next/image";
import { ScrollPin, RevealWords } from "@/components/ScrollReveal";

export function TestimonialQuote() {
  return (
    <section className="flex flex-col gap-8 bg-white px-5 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-4xl bg-brand-dark lg:flex-row">
        <div className="relative h-64 w-full shrink-0 lg:h-auto lg:w-[45%]">
          <Image
            src="/images/videographer-street.png"
            alt="Videographer filming on a lively city street at night"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
            priority={false}
          />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-10 p-8 sm:p-12 lg:p-16">
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-3xl leading-10 text-white sm:text-4xl sm:leading-tight">
              YOUR VIDEO PORTFOLIO SHOULD DO MORE THAN EXIST.
            </h2>
            <p className="text-lg font-semibold text-white">
              Don&apos;t wait until you need a portfolio to build one.
            </p>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[241px] text-xs text-[#CDCDCD]">
              Join 6,000+ creatives on the ReelioPort waitlist and get your
              exclusive Pro discount.
            </p>
            <form className="flex flex-col items-stretch gap-3.5 sm:flex-row sm:items-center">
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="rounded-full border border-[#325456] bg-[#1B4143] px-6 py-3 text-[13px] text-[#CBCBCB] placeholder:text-[#CBCBCB] focus:outline-2 focus:outline-brand-mint"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-full bg-[#9EF7C1] px-4 py-3 text-[13px] font-semibold text-brand-ink transition-colors hover:bg-[#8CF0B4]"
              >
                Join Waitlist
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-4xl">
        <ScrollPin heightVh={220}>
          {(progress) => (
            <div className="relative flex h-full w-full items-center justify-center">
              <Image
                src="/images/videographer-night.jpg"
                alt="Videographer filming at night on a city street"
                fill
                sizes="100vw"
                className="object-cover brightness-[0.35]"
                priority={false}
              />
              <RevealWords
                text="One link. Every project. Every opportunity."
                progress={progress}
                className="relative max-w-4xl px-6 text-center font-display text-4xl leading-tight text-brand-mint sm:text-6xl sm:leading-tight"
              />
            </div>
          )}
        </ScrollPin>
      </div>
    </section>
  );
}
