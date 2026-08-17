"use client";

import * as React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { WaitlistLaunchIllustration } from "@/components/icons/WaitlistLaunchIllustration";

const AVATARS = [
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&fm=jpg&q=80&w=96&h=96",
    alt: "Reelioport waitlist member",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=faces&fit=crop&fm=jpg&q=80&w=96&h=96",
    alt: "Reelioport waitlist member",
  },
  {
    src: "https://images.unsplash.com/photo-1757744705465-ea08b0ddc38a?crop=faces&fit=crop&fm=jpg&q=80&w=96&h=96",
    alt: "Reelioport waitlist member",
  },
  {
    src: "https://images.unsplash.com/photo-1609371497456-3a55a205d5eb?crop=faces&fit=crop&fm=jpg&q=80&w=96&h=96",
    alt: "Reelioport waitlist member",
  },
  {
    src: "https://images.unsplash.com/photo-1592234789031-94bf65f630ed?crop=faces&fit=crop&fm=jpg&q=80&w=96&h=96",
    alt: "Reelioport waitlist member",
  },
];

export type WaitlistSuccessModalProps = {
  open: boolean;
  onClose: () => void;
  memberCount?: string;
};

export function WaitlistSuccessModal({
  open,
  onClose,
  memberCount = "1,500+",
}: WaitlistSuccessModalProps) {
  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-brand-dark/60 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-success-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-[32px] bg-brand-accent/15 p-2 shadow-[0_20px_60px_-20px_rgba(1,42,45,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-[28px] bg-white">
          <div className="relative h-48 w-full sm:h-56">
            <WaitlistLaunchIllustration className="h-full w-full" />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col items-center gap-7 px-8 pt-8 pb-10 text-center sm:px-10">
            <div className="flex flex-col gap-3">
              <h2
                id="waitlist-success-title"
                className="text-2xl leading-tight font-bold text-brand-ink sm:text-[28px]"
              >
                You have been added to our{" "}
                <span className="text-brand-accent-deep">waitlist!</span>
              </h2>
              <p className="text-sm text-[#626262] sm:text-base">
                Thank you for joining, you&apos;ll be the first to know when
                we are ready!
              </p>
            </div>

            <div className="flex flex-col items-center gap-2.5">
              <div className="flex -space-x-3">
                {AVATARS.map((avatar, i) => (
                  <div
                    key={avatar.src}
                    className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white"
                    style={{ zIndex: AVATARS.length - i }}
                  >
                    <Image
                      src={avatar.src}
                      alt={avatar.alt}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#626262] sm:text-sm">
                You&apos;re not alone,{" "}
                <span className="font-semibold text-brand-accent-deep">
                  {memberCount}
                </span>{" "}
                people joined!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitlistSuccessModal;
