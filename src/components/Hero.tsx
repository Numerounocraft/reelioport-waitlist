"use client";

import { useState } from "react";
import Image from "next/image";
import PhoneMockupBasic from "@/components/ui/phone-mockups-1";
import { WaitlistSuccessModal } from "@/components/WaitlistSuccessModal";
import { isValidEmail, submitToWaitlistForm } from "@/lib/waitlist-form";
import { useRevealOnScroll } from "@/lib/use-reveal-on-scroll";

export function Hero() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const introReveal = useRevealOnScroll<HTMLDivElement>();
  const phoneReveal = useRevealOnScroll<HTMLDivElement>({ delayMs: 150 });
  const taglineReveal = useRevealOnScroll<HTMLParagraphElement>({
    delayMs: 300,
  });
  const waitlistReveal = useRevealOnScroll<HTMLDivElement>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();

    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError(null);
    submitToWaitlistForm({ name, email });
    setShowSuccess(true);
    event.currentTarget.reset();
  };

  return (
    <>
      <nav className="fixed inset-x-0 top-4 z-50 px-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-[#4B3D80] bg-brand-dark/40 py-3 pl-6 pr-4 backdrop-blur-md">
          <Image
            src="/images/reelioport-logo.png"
            alt="Reelioport"
            width={1200}
            height={290}
            priority
            className="h-6 w-auto brightness-0 invert sm:h-7"
          />
          <a
            href="#waitlist"
            className="rounded-full bg-brand-accent px-4 py-2.5 text-base leading-5 font-medium text-brand-ink"
          >
            Join The Waitlist
          </a>
        </div>
      </nav>

      <section className="bg-white">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-16">
          <div className="relative overflow-hidden rounded-t-none rounded-b-[32px] bg-brand-dark px-5 pt-32 pb-14 sm:px-10 sm:pt-36 sm:pb-20 lg:pt-[200px]">
            <div className="flex flex-col items-start gap-16 lg:flex-row lg:items-center lg:justify-between">
              <div
                ref={introReveal.ref}
                style={introReveal.style}
                className={`flex max-w-md flex-col gap-4 ${introReveal.className}`}
              >
                <h1 className="font-display text-3xl leading-9 text-brand-accent sm:text-4xl sm:leading-10">
                  One link. Every project.
                  <br />
                  Every opportunity.
                </h1>
                <p className="max-w-sm text-lg leading-[22px] tracking-[0.03em] text-brand-accent">
                  Reelioport is the professional video portfolio platform
                  built for creatives.
                </p>
              </div>

              <div
                ref={phoneReveal.ref}
                style={phoneReveal.style}
                className={`flex w-full shrink-0 justify-center lg:w-auto lg:-my-16 ${phoneReveal.className}`}
              >
                <PhoneMockupBasic />
              </div>

              <p
                ref={taglineReveal.ref}
                style={taglineReveal.style}
                className={`max-w-xs text-center font-display text-[32px] leading-10 text-brand-accent sm:text-[40px] sm:leading-[48px] lg:text-[46px] lg:leading-[56px] ${taglineReveal.className}`}
              >
                YOUR WORK DESERVES A BETTER HOME.
              </p>
            </div>
          </div>

          <div
            id="waitlist"
            className="flex flex-col items-center gap-10 pt-16 pb-6 sm:pt-24 sm:pb-7 lg:pt-[120px] lg:pb-[30px]"
          >
            <div
              ref={waitlistReveal.ref}
              style={waitlistReveal.style}
              className={`flex flex-col items-center gap-3.5 text-center ${waitlistReveal.className}`}
            >
              <h2 className="font-display text-4xl text-brand-ink sm:text-5xl">
                JOIN THE WAITLIST
              </h2>
              <p className="max-w-sm text-lg font-semibold leading-[22px] text-brand-dark">
                Exclusive discount on Reelioport Pro when we launch.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-sm flex-col items-center gap-6"
            >
              <div className="flex w-full flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full rounded-lg bg-[#F5F5F5] px-4 py-3 text-[13px] text-[#626262] placeholder:text-[#626262] focus:outline-2 focus:outline-brand-dark"
                />
                <div className="flex flex-col gap-1.5">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    aria-invalid={emailError ? true : undefined}
                    onChange={() => emailError && setEmailError(null)}
                    className={`w-full rounded-lg bg-[#F5F5F5] px-4 py-3 text-[13px] text-[#626262] placeholder:text-[#626262] focus:outline-2 ${emailError ? "outline-2 outline-red-500" : "focus:outline-brand-dark"}`}
                  />
                  {emailError && (
                    <p className="px-1 text-xs font-medium text-red-600">
                      {emailError}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-brand-accent px-4 py-3 text-[13px] font-semibold text-brand-ink transition-colors hover:bg-[#B49CFF]"
                >
                  Join Waitlist
                </button>
              </div>
              <p className="max-w-[252px] text-center text-[13px] text-brand-dark">
                Be among the 6,000+ creatives waiting to experience
                Reelioport.
              </p>
            </form>
          </div>
        </div>
      </section>

      <WaitlistSuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </>
  );
}
