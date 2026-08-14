import type { CSSProperties } from "react";

type WaitlistLaunchIllustrationProps = {
  className?: string;
};

const STARS = [
  { cx: 58, cy: 42, r: 2.5, fill: "#C9B8FF", opacity: 0.85, delay: "0s" },
  { cx: 340, cy: 52, r: 2, fill: "#ffffff", opacity: 0.7, delay: "0.3s" },
  { cx: 108, cy: 88, r: 1.8, fill: "#ffffff", opacity: 0.6, delay: "0.6s" },
  { cx: 302, cy: 98, r: 2.2, fill: "#C9B8FF", opacity: 0.7, delay: "0.9s" },
  { cx: 200, cy: 28, r: 1.6, fill: "#ffffff", opacity: 0.55, delay: "1.2s" },
  { cx: 260, cy: 60, r: 1.6, fill: "#ffffff", opacity: 0.5, delay: "1.5s" },
];

/** Exhaust puffs left at the pad as the rocket climbs away; each drifts on its own --puff-x. */
const SMOKE_PUFFS = [
  { cx: 186, cy: 182, r: 15, driftX: -14, delay: "0s" },
  { cx: 200, cy: 188, r: 18, driftX: 4, delay: "-0.35s" },
  { cx: 214, cy: 181, r: 14, driftX: 16, delay: "-0.15s" },
  { cx: 193, cy: 190, r: 12, driftX: -6, delay: "-0.55s" },
  { cx: 208, cy: 190, r: 13, driftX: 9, delay: "-0.75s" },
];

/**
 * Rocket on a launch pad, in the ReelioPort brand palette: it jitters in
 * place as if building up thrust, then lifts off and climbs out of frame,
 * leaving exhaust smoke behind — then resets and repeats.
 */
export function WaitlistLaunchIllustration({
  className,
}: WaitlistLaunchIllustrationProps) {
  return (
    <svg
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
    >
      <defs>
        <radialGradient id="wli-glow-tl" cx="15%" cy="8%" r="65%">
          <stop offset="0%" stopColor="#3B2A7A" stopOpacity="1" />
          <stop offset="100%" stopColor="#1E1354" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="wli-glow-tr" cx="88%" cy="14%" r="60%">
          <stop offset="0%" stopColor="#3B2A7A" stopOpacity="1" />
          <stop offset="100%" stopColor="#1E1354" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="wli-trail-glow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#C9B8FF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C9B8FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wli-flame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9B8FF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#C9B8FF" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="400" height="220" fill="#1E1354" />
      <rect width="400" height="220" fill="url(#wli-glow-tl)" />
      <rect width="400" height="220" fill="url(#wli-glow-tr)" />

      <g>
        {STARS.map((star, i) => (
          <circle
            key={i}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill={star.fill}
            className="animate-star-twinkle"
            style={
              {
                "--star-opacity": star.opacity,
                animationDelay: star.delay,
              } as CSSProperties
            }
          />
        ))}
      </g>

      <ellipse
        cx="200"
        cy="150"
        rx="90"
        ry="70"
        fill="url(#wli-trail-glow)"
        className="animate-engine-glow"
        style={{ transformOrigin: "200px 150px" }}
      />

      <g
        fill="#C9B8FF"
        opacity="0.22"
        className="animate-cloud-drift"
        style={{ animationDuration: "6s", animationDelay: "-1s" }}
      >
        <ellipse cx="55" cy="198" rx="70" ry="30" />
        <ellipse cx="185" cy="204" rx="95" ry="34" />
        <ellipse cx="330" cy="196" rx="80" ry="28" />
      </g>

      <g
        className="animate-rocket-launch"
        style={{ transformOrigin: "200px 120px" }}
      >
        <path
          d="M190 148 Q200 214 210 148 Z"
          fill="url(#wli-flame)"
          className="animate-flame-flicker"
          style={{ transformOrigin: "200px 148px" }}
        />
        <path d="M178 142 L158 168 L182 159 Z" fill="#ffffff" />
        <path d="M222 142 L242 168 L218 159 Z" fill="#ffffff" />
        <rect x="181" y="88" width="38" height="66" rx="19" fill="#ffffff" />
        <path d="M181 90 Q200 48 219 90 Z" fill="#ffffff" />
        <circle cx="200" cy="108" r="8" fill="#C9B8FF" />
      </g>

      <g>
        {SMOKE_PUFFS.map((puff, i) => (
          <circle
            key={i}
            cx={puff.cx}
            cy={puff.cy}
            r={puff.r}
            fill="#ffffff"
            className="animate-smoke-puff"
            style={
              {
                transformOrigin: `${puff.cx}px ${puff.cy}px`,
                animationDelay: puff.delay,
                "--puff-x": `${puff.driftX}px`,
              } as CSSProperties
            }
          />
        ))}
      </g>

      <g
        fill="#ffffff"
        className="animate-cloud-drift"
        style={{
          animationDuration: "4.5s",
          animationDirection: "reverse",
          animationDelay: "-0.4s",
        }}
      >
        <ellipse cx="38" cy="216" rx="76" ry="32" />
        <ellipse cx="140" cy="223" rx="86" ry="36" />
        <ellipse cx="200" cy="210" rx="70" ry="30" />
        <ellipse cx="272" cy="221" rx="92" ry="35" />
        <ellipse cx="372" cy="213" rx="76" ry="30" />
      </g>
    </svg>
  );
}

export default WaitlistLaunchIllustration;
