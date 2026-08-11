"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

export interface AnimatedRocketHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AnimatedRocketProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BODY_VARIANTS: Variants = {
  initial: {
    y: 0,
    rotate: 0,
  },
  animate: {
    y: [0, -2, 0],
    rotate: [0, -3, 3, 0],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

const FLAME_VARIANTS: Variants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  animate: {
    scale: [1, 1.25, 0.9, 1.15, 1],
    opacity: [1, 0.7, 1, 0.8, 1],
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

const AnimatedRocket = forwardRef<AnimatedRocketHandle, AnimatedRocketProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const bodyControls = useAnimation();
    const flameControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          bodyControls.start("animate");
          flameControls.start("animate");
        },
        stopAnimation: () => {
          bodyControls.start("initial");
          flameControls.start("initial");
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          bodyControls.start("animate");
          flameControls.start("animate");
        }
      },
      [bodyControls, flameControls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          bodyControls.start("initial");
          flameControls.start("initial");
        }
      },
      [bodyControls, flameControls, onMouseLeave]
    );

    return (
      <div
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.g
            variants={BODY_VARIANTS}
            animate={bodyControls}
            initial="initial"
            style={{ transformOrigin: "12px 12px" }}
          >
            <path
              d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>
          <motion.path
            d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={FLAME_VARIANTS}
            animate={flameControls}
            initial="initial"
            style={{ transformOrigin: "3px 20px" }}
          />
        </svg>
      </div>
    );
  }
);

AnimatedRocket.displayName = "AnimatedRocket";

export { AnimatedRocket };
