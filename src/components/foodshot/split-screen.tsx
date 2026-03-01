"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

// Best 3 for the before wall, best 3 for the after wall
const leftPhotos = [foodPhotos[0], foodPhotos[3], foodPhotos[1]]; // Culinary, CAPO, Tokyo
const rightPhotos = [foodPhotos[0], foodPhotos[3], foodPhotos[1]];

export function SplitScreen() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Diagonal divider angle shifts on scroll
  const dividerX = useTransform(scrollYProgress, [0, 1], ["45%", "55%"]);

  // Subtle parallax on the photo columns
  const leftY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#0a0a0a] overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center pt-24 pb-12 px-6 relative z-20"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Two worlds.{" "}
          <span className="bg-gradient-to-r from-zinc-500 to-zinc-400 bg-clip-text text-transparent">
            Same food.
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Left: what your customers see now. Right: what they could see.
        </p>
      </motion.div>

      {/* Split viewport */}
      <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden">
        {/* Left side — BEFORE (dark, muted) */}
        <div className="absolute inset-0" style={{ clipPath: "polygon(0 0, 52% 0, 48% 100%, 0 100%)" }}>
          <div className="absolute inset-0 bg-zinc-950">
            <motion.div
              style={{ y: leftY }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 md:p-8 h-full"
            >
              {leftPhotos.map((photo, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl overflow-hidden border border-zinc-800/50 ${
                    i === 0 ? "md:col-span-2 md:row-span-1" : ""
                  }`}
                  style={{ minHeight: i === 0 ? "55%" : "42%" }}
                >
                  <Image
                    src={photo.before}
                    alt={`${photo.restaurant} — Original`}
                    fill
                    className="object-cover brightness-[0.55] saturate-[0.25] contrast-[0.9]"
                    sizes="50vw"
                  />
                  <div className="absolute bottom-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-sm border border-zinc-700/40 text-zinc-500 text-[9px] font-mono uppercase tracking-wider">
                      Phone Photo
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* "BEFORE" label */}
          <div className="absolute top-8 left-8 z-10">
            <span className="text-zinc-600 text-sm font-mono uppercase tracking-[0.3em]">
              Before
            </span>
          </div>
        </div>

        {/* Right side — AFTER (warm, vibrant) */}
        <div className="absolute inset-0" style={{ clipPath: "polygon(52% 0, 100% 0, 100% 100%, 48% 100%)" }}>
          <div className="absolute inset-0 bg-[#0c0a08]">
            <motion.div
              style={{ y: rightY }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 md:p-8 h-full"
            >
              {rightPhotos.map((photo, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl overflow-hidden border border-amber-500/15 ${
                    i === 0 ? "md:col-span-2 md:row-span-1" : ""
                  }`}
                  style={{ minHeight: i === 0 ? "55%" : "42%" }}
                >
                  <Image
                    src={photo.after}
                    alt={`${photo.restaurant} — Enhanced`}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-sm border border-amber-500/30 text-amber-400 text-[9px] font-mono uppercase tracking-wider">
                      FoodShot AI
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* "AFTER" label */}
          <div className="absolute top-8 right-8 z-10">
            <span className="text-amber-400/70 text-sm font-mono uppercase tracking-[0.3em]">
              After
            </span>
          </div>
        </div>

        {/* Diagonal divider line */}
        <motion.div
          style={{ left: dividerX }}
          className="absolute top-0 bottom-0 w-px z-30"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-400/40 to-transparent" />
          {/* Center badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
            <div className="w-14 h-14 rounded-full bg-[#0a0a0a] border-2 border-amber-500/40 flex items-center justify-center shadow-xl shadow-amber-500/10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom stat line */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center py-12 px-6"
      >
        <p className="text-zinc-600 text-sm">
          The difference between{" "}
          <span className="text-zinc-400">scrolling past</span>
          {" "}and{" "}
          <span className="text-amber-400">walking in</span>.
        </p>
      </motion.div>
    </section>
  );
}
