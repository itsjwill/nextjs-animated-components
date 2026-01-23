import type { Direction } from "./theme";

// =============================================================================
// Types
// =============================================================================

export interface MotionPreset {
  /** Framer Motion transition config */
  transition: {
    type: "spring" | "tween";
    duration?: number;
    stiffness?: number;
    damping?: number;
    mass?: number;
    ease?: number[] | string;
  };
  /** CSS easing for Tailwind/GSAP */
  easing: string;
  /** CSS cubic-bezier values */
  cubicBezier: [number, number, number, number];
  /** Base duration in seconds */
  duration: {
    instant: number;
    fast: number;
    base: number;
    slow: number;
    dramatic: number;
  };
  /** Stagger delay between items */
  stagger: {
    fast: number;
    base: number;
    slow: number;
  };
  /** Enter/exit animation defaults */
  enter: Record<string, number | string>;
  exit: Record<string, number | string>;
}

// =============================================================================
// Direction Presets
// =============================================================================

const luxury: MotionPreset = {
  transition: {
    type: "tween",
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1],
  },
  easing: "cubic-bezier(0.16, 1, 0.3, 1)",
  cubicBezier: [0.16, 1, 0.3, 1],
  duration: {
    instant: 0.15,
    fast: 0.3,
    base: 0.6,
    slow: 1.0,
    dramatic: 1.6,
  },
  stagger: {
    fast: 0.05,
    base: 0.1,
    slow: 0.2,
  },
  enter: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.98 },
};

const cyberpunk: MotionPreset = {
  transition: {
    type: "tween",
    duration: 0.3,
    ease: [0.76, 0, 0.24, 1],
  },
  easing: "cubic-bezier(0.76, 0, 0.24, 1)",
  cubicBezier: [0.76, 0, 0.24, 1],
  duration: {
    instant: 0.05,
    fast: 0.15,
    base: 0.3,
    slow: 0.5,
    dramatic: 0.8,
  },
  stagger: {
    fast: 0.02,
    base: 0.05,
    slow: 0.1,
  },
  enter: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: -10, filter: "blur(4px)" },
};

const kinetic: MotionPreset = {
  transition: {
    type: "spring",
    stiffness: 200,
    damping: 20,
    mass: 1,
  },
  easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  cubicBezier: [0.34, 1.56, 0.64, 1],
  duration: {
    instant: 0.1,
    fast: 0.25,
    base: 0.45,
    slow: 0.7,
    dramatic: 1.2,
  },
  stagger: {
    fast: 0.03,
    base: 0.08,
    slow: 0.15,
  },
  enter: { opacity: 1, y: 0, scale: 1, rotate: 0 },
  exit: { opacity: 0, y: 40, scale: 0.9, rotate: -5 },
};

const freestyle: MotionPreset = {
  transition: {
    type: "spring",
    stiffness: 120,
    damping: 14,
    mass: 1.2,
  },
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  cubicBezier: [0.22, 1, 0.36, 1],
  duration: {
    instant: 0.08,
    fast: 0.2,
    base: 0.5,
    slow: 0.9,
    dramatic: 1.4,
  },
  stagger: {
    fast: 0.04,
    base: 0.1,
    slow: 0.18,
  },
  enter: { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 },
  exit: { opacity: 0, y: 30, x: -20, rotate: -3, scale: 0.95 },
};

// =============================================================================
// Exports
// =============================================================================

export const motionPresets: Record<Direction, MotionPreset> = {
  luxury,
  cyberpunk,
  kinetic,
  freestyle,
};

/** Get the motion preset for a direction */
export function getMotionPreset(direction: Direction): MotionPreset {
  return motionPresets[direction];
}

// =============================================================================
// GSAP Helpers
// =============================================================================

/** Get GSAP ease string for a direction */
export function getGsapEase(direction: Direction): string {
  const [a, b, c, d] = motionPresets[direction].cubicBezier;
  return `cubic-bezier(${a}, ${b}, ${c}, ${d})`;
}

/** Get GSAP ScrollTrigger defaults for a direction */
export function getScrollTriggerDefaults(direction: Direction) {
  const preset = motionPresets[direction];
  return {
    scrub: direction === "luxury" ? 1.5 : direction === "cyberpunk" ? 0.5 : 1,
    duration: preset.duration.base,
    ease: getGsapEase(direction),
  };
}

// =============================================================================
// Framer Motion Variants
// =============================================================================

/** Get Framer Motion variants for a direction */
export function getMotionVariants(direction: Direction) {
  const preset = motionPresets[direction];

  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: preset.stagger.base,
          delayChildren: 0.1,
        },
      },
    },
    item: {
      hidden: preset.exit,
      visible: {
        ...preset.enter,
        transition: preset.transition,
      },
    },
    hover: {
      scale: direction === "kinetic" ? 1.05 : direction === "luxury" ? 1.02 : 1.03,
      transition: { ...preset.transition, duration: preset.duration.fast },
    },
    tap: {
      scale: direction === "kinetic" ? 0.92 : 0.95,
    },
  };
}
