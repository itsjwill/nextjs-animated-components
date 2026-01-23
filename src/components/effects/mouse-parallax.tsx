"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

interface MouseParallaxProps {
  children: React.ReactNode;
  strength?: number;
  inverted?: boolean;
  className?: string;
}

export function MouseParallax({
  children,
  strength = 0.02,
  inverted = false,
  className,
}: MouseParallaxProps) {
  const prefersReduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (prefersReduced) return;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetX = (e.clientX - centerX) * strength * (inverted ? -1 : 1);
      const offsetY = (e.clientY - centerY) * strength * (inverted ? -1 : 1);
      x.set(offsetX);
      y.set(offsetY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [strength, inverted, prefersReduced, x, y]);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} style={{ x: springX, y: springY }}>
      {children}
    </motion.div>
  );
}
