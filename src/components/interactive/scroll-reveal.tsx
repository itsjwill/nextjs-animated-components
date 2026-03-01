"use client";

import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-out"
  | "flip-up"
  | "flip-left"
  | "blur-in"
  | "slide-up-spring";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

interface StaggerRevealProps {
  children: ReactNode[];
  className?: string;
  childClassName?: string;
  variant?: AnimationVariant;
  staggerDelay?: number;
  once?: boolean;
}

// ─── Animation Variants ─────────────────────────────────────────────────────

const variants: Record<AnimationVariant, { initial: any; animate: any }> = {
  "fade-up": {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
  "fade-down": {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
  },
  "fade-left": {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
  },
  "fade-right": {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
  },
  "zoom-in": {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  "zoom-out": {
    initial: { opacity: 0, scale: 1.2 },
    animate: { opacity: 1, scale: 1 },
  },
  "flip-up": {
    initial: { opacity: 0, rotateX: 45 },
    animate: { opacity: 1, rotateX: 0 },
  },
  "flip-left": {
    initial: { opacity: 0, rotateY: 45 },
    animate: { opacity: 1, rotateY: 0 },
  },
  "blur-in": {
    initial: { opacity: 0, filter: "blur(12px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
  },
  "slide-up-spring": {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
  },
};

// ─── ScrollReveal ───────────────────────────────────────────────────────────
// Animate elements on scroll into view with multiple presets

export function ScrollReveal({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.3,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  const v = variants[variant];

  return (
    <motion.div
      ref={ref}
      initial={v.initial}
      animate={isInView ? v.animate : v.initial}
      transition={{
        duration,
        delay,
        ease: variant === "slide-up-spring" ? [0.16, 1, 0.3, 1] : "easeOut",
      }}
      className={cn(className)}
      style={{ transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerReveal ──────────────────────────────────────────────────────────
// Stagger animate multiple children on scroll

export function StaggerReveal({
  children,
  className,
  childClassName,
  variant = "fade-up",
  staggerDelay = 0.1,
  once = true,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.2 });

  const v = variants[variant];

  return (
    <div ref={ref} className={cn(className)}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={v.initial}
          animate={isInView ? v.animate : v.initial}
          transition={{
            duration: 0.5,
            delay: i * staggerDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={childClassName}
          style={{ transformPerspective: 1000 }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

// ─── TextReveal ─────────────────────────────────────────────────────────────
// Character-by-character text reveal on scroll

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const words = text.split(" ");

  return (
    <div ref={ref} className={cn("flex flex-wrap gap-x-2 gap-y-1", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
