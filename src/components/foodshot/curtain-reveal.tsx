"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Curtain" — Theatrical curtain reveal.
 * As you scroll, two curtain panels part dramatically to reveal
 * the hero photo behind them. Like opening night at a restaurant.
 */

const heroPhoto = foodPhotos[0]; // Culinary Dropout — best photo

export function CurtainReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Curtain opens from 0.2 to 0.5 of scroll
  const leftCurtain = useTransform(scrollYProgress, [0.15, 0.45], ["0%", "-100%"]);
  const rightCurtain = useTransform(scrollYProgress, [0.15, 0.45], ["0%", "100%"]);
  const photoScale = useTransform(scrollYProgress, [0.3, 0.55], [1.15, 1]);
  const photoOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0.3, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.45, 0.55], [30, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#060606] overflow-hidden"
      style={{ minHeight: "150vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Photo behind curtains */}
        <motion.div
          style={{ scale: photoScale, opacity: photoOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={heroPhoto.after}
              alt={heroPhoto.restaurant}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            {/* Warm overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </div>
        </motion.div>

        {/* Left Curtain */}
        <motion.div
          style={{ x: leftCurtain }}
          className="absolute left-0 top-0 w-[52%] h-full z-10"
        >
          <div className="w-full h-full bg-[#0a0a0a] relative">
            {/* Curtain texture — vertical lines */}
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 w-px bg-zinc-700"
                  style={{ left: `${(i + 1) * 8}%` }}
                />
              ))}
            </div>
            {/* Curtain edge shadow */}
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-black/40 to-transparent" />
            {/* Curtain fold effect */}
            <div className="absolute top-0 bottom-0 right-8 w-px bg-zinc-600/30" />
            <div className="absolute top-0 bottom-0 right-12 w-px bg-zinc-600/20" />
          </div>
        </motion.div>

        {/* Right Curtain */}
        <motion.div
          style={{ x: rightCurtain }}
          className="absolute right-0 top-0 w-[52%] h-full z-10"
        >
          <div className="w-full h-full bg-[#0a0a0a] relative">
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 w-px bg-zinc-700"
                  style={{ left: `${(i + 1) * 8}%` }}
                />
              ))}
            </div>
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-black/40 to-transparent" />
            <div className="absolute top-0 bottom-0 left-8 w-px bg-zinc-600/30" />
            <div className="absolute top-0 bottom-0 left-12 w-px bg-zinc-600/20" />
          </div>
        </motion.div>

        {/* Center text overlay (appears after curtains open) */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-20 text-center px-6"
        >
          <p className="text-amber-400/60 text-[10px] font-mono uppercase tracking-[0.4em] mb-4">
            Now Showing
          </p>
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tight mb-4">
            Opening{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              night
            </span>
          </h2>
          <p className="text-white/70 text-lg mb-2">{heroPhoto.restaurant}</p>
          <p className="text-zinc-500 text-sm max-w-md mx-auto">
            Every dish deserves a grand entrance. FoodShot makes it happen.
          </p>
        </motion.div>

        {/* Top bar (theatrical) */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#0a0a0a] to-transparent z-30" />
      </div>
    </section>
  );
}
