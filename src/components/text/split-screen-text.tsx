"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SplitScreenTextProps {
  topText: string;
  bottomText: string;
  revealContent: React.ReactNode;
  className?: string;
}

export function SplitScreenText({
  topText,
  bottomText,
  revealContent,
  className = "",
}: SplitScreenTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const topY = useTransform(scrollYProgress, [0.2, 0.6], ["0%", "-100%"]);
  const bottomY = useTransform(scrollYProgress, [0.2, 0.6], ["0%", "100%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const contentScale = useTransform(scrollYProgress, [0.3, 0.5], [0.8, 1]);

  return (
    <div ref={containerRef} className={`relative h-[200vh] ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <motion.div
          className="absolute inset-0 flex items-end justify-center pb-[calc(50vh-2rem)] z-10"
          style={{ y: topY }}
        >
          <h2 className="text-display font-heading text-center px-6">{topText}</h2>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex items-start justify-center pt-[calc(50vh-2rem)] z-10"
          style={{ y: bottomY }}
        >
          <h2 className="text-display font-heading text-center px-6">{bottomText}</h2>
        </motion.div>

        <motion.div
          className="relative z-0 w-full max-w-4xl px-6"
          style={{ opacity: contentOpacity, scale: contentScale }}
        >
          {revealContent}
        </motion.div>
      </div>
    </div>
  );
}
