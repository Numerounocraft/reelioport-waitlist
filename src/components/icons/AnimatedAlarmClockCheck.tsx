"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

export interface AnimatedAlarmClockCheckHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AnimatedAlarmClockCheckProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const G_VARIANTS: Variants = {
  initial: {
    x: 0,
  },
  animate: {
    x: [-1, 1, -1, 1, 0],
    transition: {
      duration: 0.3,
      ease: "linear",
      delay: 0.3,
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

const PATH_1_VARIANTS: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: [0, 90],
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const PATH_2_VARIANTS: Variants = {
  initial: {
    x: 0,
  },
  animate: {
    x: [0, 0.5, -0.5, 0],
    transition: {
      duration: 0.1,
      ease: "easeInOut",
      delay: 0.3,
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

const PATH_3_VARIANTS: Variants = {
  initial: {
    x: 0,
  },
  animate: {
    x: [0, -0.5, 0.5, 0],
    transition: {
      duration: 0.1,
      ease: "easeInOut",
      delay: 0.4,
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

const AnimatedAlarmClockCheck = forwardRef<AnimatedAlarmClockCheckHandle, AnimatedAlarmClockCheckProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("initial"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("initial");
        }
      },
      [controls, onMouseLeave]
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
          <motion.g variants={G_VARIANTS} animate={controls} initial="initial">
            <motion.path
              d="M8 13H12M12 21C16.4183 21 20 17.4183 20 13C20 8.58172 16.4183 5 12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={PATH_1_VARIANTS}
              animate={controls}
              initial="initial"
            />
            <path
              d="M12 13L14 15"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <motion.path
              d="M5 3L2 6"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={PATH_2_VARIANTS}
              animate={controls}
              initial="initial"
            />
            <motion.path
              d="M22 6L19 3"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={PATH_3_VARIANTS}
              animate={controls}
              initial="initial"
            />
            <path
              d="M6.38 18.7L4 21"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.64 18.6699L20 20.9999"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>
        </svg>
      </div>
    );
  }
);

AnimatedAlarmClockCheck.displayName = "AnimatedAlarmClockCheck";

export { AnimatedAlarmClockCheck };
