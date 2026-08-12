"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ImageItem {
  src: string;
  alt: string;
}

export interface PhoneCarouselProps {
  images: ImageItem[];
  className?: string;
  autoPlayInterval?: number;
}

export function PhoneCarousel({
  images,
  className,
  autoPlayInterval = 3200,
}: PhoneCarouselProps) {
  const [index, setIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (isHovered || images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, autoPlayInterval);
    return () => clearInterval(id);
  }, [isHovered, images.length, autoPlayInterval]);

  if (images.length === 0) return null;

  const goTo = (target: number) => {
    setIndex(((target % images.length) + images.length) % images.length);
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div
        className="relative aspect-[9/19.5] h-[280px] sm:h-[320px] lg:h-[380px] xl:h-[420px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {images.map((image, i) => {
          const total = images.length;
          let offset = i - index;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const isActive = offset === 0;
          if (Math.abs(offset) > 1) return null;

          return (
            <motion.div
              key={image.src}
              className="absolute inset-0"
              style={{ zIndex: isActive ? 20 : 10 }}
              initial={false}
              animate={{
                x: `${offset * 62}%`,
                rotate: offset * 9,
                scale: isActive ? 1 : 0.86,
                opacity: isActive ? 1 : 0.5,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] border-[6px] border-neutral-900 bg-neutral-900 shadow-2xl">
                <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-xl bg-neutral-900" />
                <div className="relative h-full w-full overflow-hidden rounded-[1.7rem]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="280px"
                    className="object-cover"
                    priority={isActive}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {images.length > 1 && (
        <div className="mt-5 flex items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => goTo(index - 1)}
            aria-label="Previous screen"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show screen ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-4 bg-white" : "w-1.5 bg-white/40",
                )}
              />
            ))}
          </div>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => goTo(index + 1)}
            aria-label="Next screen"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
