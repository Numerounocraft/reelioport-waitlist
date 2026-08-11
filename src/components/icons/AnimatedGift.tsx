"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

export interface AnimatedGiftHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AnimatedGiftProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BOX_VARIANTS: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: [0, -4, 4, -4, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0.4,
    },
  },
};

const LID_VARIANTS: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [0, -1.5, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0.4,
    },
  },
};

const AnimatedGift = forwardRef<AnimatedGiftHandle, AnimatedGiftProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const boxControls = useAnimation();
    const lidControls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          boxControls.start("animate");
          lidControls.start("animate");
        },
        stopAnimation: () => {
          boxControls.start("initial");
          lidControls.start("initial");
        },
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          boxControls.start("animate");
          lidControls.start("animate");
        }
      },
      [boxControls, lidControls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          boxControls.start("initial");
          lidControls.start("initial");
        }
      },
      [boxControls, lidControls, onMouseLeave]
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
            variants={BOX_VARIANTS}
            animate={boxControls}
            initial="initial"
            style={{ transformOrigin: "12px 19px" }}
          >
            <path d="M20 12v10H4V12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 7h20v5H2z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 22V7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
          <motion.path
            d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={LID_VARIANTS}
            animate={lidControls}
            initial="initial"
          />
          <motion.path
            d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={LID_VARIANTS}
            animate={lidControls}
            initial="initial"
          />
        </svg>
      </div>
    );
  }
);

AnimatedGift.displayName = "AnimatedGift";

export { AnimatedGift };
