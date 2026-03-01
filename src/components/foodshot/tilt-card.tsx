"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useCallback } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Tilt" — 3D perspective cards that respond to mouse movement.
 * Each card tilts, shifts, and has a light reflection effect following the cursor.
 * Premium feel — like holding a holographic trading card.
 */

const heroPhotos = [foodPhotos[0], foodPhotos[3], foodPhotos[1]];

function TiltableCard({ photo, index }: { photo: typeof foodPhotos[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Spring-smoothed rotations for natural feel
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [12, -12]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), { stiffness: 200, damping: 30 });

  // Light reflection position
  const lightX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const lightY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

  // Subtle parallax on inner elements
  const innerX = useTransform(mouseX, [0, 1], [-8, 8]);
  const innerY = useTransform(mouseY, [0, 1], [-8, 8]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7 }}
      className="w-full max-w-xs mx-auto"
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-3xl overflow-hidden border border-amber-500/15 bg-zinc-900 shadow-2xl shadow-black/40 cursor-default group"
      >
        <div style={{ aspectRatio: "3 / 4" }} className="relative">
          {/* Photo */}
          <Image
            src={photo.after}
            alt={`${photo.restaurant} — Enhanced`}
            fill
            className="object-cover"
            sizes="320px"
          />

          {/* Light reflection (follows mouse) */}
          <motion.div
            style={{ left: lightX, top: lightY }}
            className="absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 bg-white/[0.06] rounded-full blur-3xl pointer-events-none z-10"
          />

          {/* Glass border glow */}
          <div className="absolute inset-0 rounded-3xl border border-white/[0.08] pointer-events-none z-20" />

          {/* Bottom info — parallaxed */}
          <motion.div
            style={{ x: innerX, y: innerY }}
            className="absolute bottom-6 left-6 right-6 z-30"
          >
            <div className="px-5 py-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/[0.06]">
              <p className="text-amber-400/60 text-[9px] font-mono uppercase tracking-[0.2em] mb-1">
                Enhanced by FoodShot
              </p>
              <p className="text-white text-lg font-bold tracking-tight">
                {photo.restaurant}
              </p>
            </div>
          </motion.div>

          {/* Top-right badge — parallaxed opposite */}
          <motion.div
            style={{ x: useTransform(mouseX, [0, 1], [5, -5]), y: useTransform(mouseY, [0, 1], [5, -5]) }}
            className="absolute top-4 right-4 z-30"
          >
            <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center backdrop-blur-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TiltCard() {
  return (
    <section className="relative w-full bg-[#060606] overflow-hidden px-6 md:px-12 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Hold the{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            quality
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Move your mouse over any card. The depth you feel? That&apos;s the difference between a phone photo and a FoodShot.
        </p>
      </motion.div>

      {/* 3 cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {heroPhotos.map((photo, i) => (
          <TiltableCard key={i} photo={photo} index={i} />
        ))}
      </div>

      {/* Mobile note */}
      <p className="text-zinc-700 text-[10px] text-center mt-10 md:hidden font-mono">
        Best on desktop — hover for 3D effect
      </p>
    </section>
  );
}
