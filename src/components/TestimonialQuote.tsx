"use client";

import { useState } from "react";
import Image from "next/image";
import { WaitlistSuccessModal } from "@/components/WaitlistSuccessModal";

export function TestimonialQuote() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowSuccess(true);
    event.currentTarget.reset();
  };

  return (
    <>
      <div className="flex flex-col overflow-hidden rounded-4xl bg-brand-dark lg:h-[499px] lg:flex-row">
        <div className="relative h-64 w-full shrink-0 rounded-3xl sm:h-80 lg:h-auto lg:w-[553px]">
          <Image
            src="/images/videographer-street.png"
            alt="Videographer filming on a lively city street at night"
            fill
            sizes="(min-width: 1024px) 553px, 100vw"
            className="rounded-3xl object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-8 p-8 sm:p-12 lg:gap-16 lg:p-16">
          <div className="flex flex-col items-start gap-4 lg:gap-6">
            <h2 className="font-display text-3xl leading-9 text-white sm:text-4xl sm:leading-tight lg:w-[444px] lg:text-[40px] lg:leading-[48px]">
              YOUR NEXT OPPORTUNITY COULD START WITH ONE LINK.
            </h2>
            <p className="text-lg leading-[22px] font-semibold text-white">
              Don&apos;t wait until you need a portfolio to build one.
            </p>
          </div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-[241px] text-xs text-[#CDCDCD]">
              Join 6,000+ creatives on the ReelioPort waitlist and get your
              exclusive Pro discount.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-stretch gap-3.5 sm:flex-row sm:items-center"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="rounded-full border border-[#4B3D80] bg-[#2A1B66] py-3 pl-6 pr-4 text-[13px] font-medium text-[#CBCBCB] placeholder:text-[#CBCBCB] focus:outline-2 focus:outline-brand-accent"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-full bg-brand-accent px-4 py-3 text-[13px] font-semibold text-brand-ink transition-colors hover:bg-[#B49CFF]"
              >
                Join Waitlist
              </button>
            </form>
          </div>
        </div>
      </div>

      <WaitlistSuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
}
