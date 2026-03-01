"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Flip" — 3D card flip.
 * Before photo on the front face, after photo on the back.
 * Click to flip 180°. Smooth perspective animation.
 * Like a premium playing card revealing what's underneath.
 */

function FlippableCard({
  photo,
  index,
}: {
  photo: typeof foodPhotos[0];
  index: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="w-full"
      style={{ perspective: 1200 }}
    >
      <motion.button
        onClick={() => setIsFlipped(!isFlipped)}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full rounded-2xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
        style={{
          aspectRatio: "3 / 4",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front face — BEFORE (muted) */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border border-zinc-700/50 bg-zinc-900"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src={photo.before}
            alt={`${photo.restaurant} — Original`}
            fill
            className="object-cover brightness-[0.65] saturate-[0.3]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Front label */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-zinc-700/40 text-zinc-400 text-[10px] font-mono uppercase tracking-wider">
              Original
            </span>
          </div>

          {/* Front bottom */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-5 z-10">
            <p className="text-zinc-400 text-sm font-medium">{photo.restaurant}</p>
            <p className="text-zinc-600 text-[10px] font-mono mt-1">
              Click to enhance →
            </p>
          </div>

          {/* Center flip icon */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white/60"
              >
                <path d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-9L21 12m0 0l-4.5 4.5M21 12H7.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Back face — AFTER (vibrant) */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border border-amber-500/20 bg-zinc-900"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Image
            src={photo.after}
            alt={`${photo.restaurant} — Enhanced`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Back label */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 rounded-lg bg-amber-500/10 backdrop-blur-sm border border-amber-500/30 text-amber-400 text-[10px] font-mono uppercase tracking-wider">
              Enhanced
            </span>
          </div>

          {/* Warm glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950/20 to-transparent pointer-events-none" />

          {/* Back bottom */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-5 z-10">
            <p className="text-white text-sm font-semibold">{photo.restaurant}</p>
            <p className="text-amber-400/60 text-[10px] font-mono mt-1">
              Enhanced by FoodShot
            </p>
          </div>

          {/* Center flip icon */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm border border-amber-500/20 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-amber-400/60"
              >
                <path d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-9L21 12m0 0l-4.5 4.5M21 12H7.5" />
              </svg>
            </div>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

export function FlipCard() {
  return (
    <section className="relative w-full bg-[#0a0a0a] overflow-hidden px-6 md:px-12 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Flip the{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            script
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Every card has two sides. Click to flip between the original and the
          FoodShot version. The difference is night and day.
        </p>
      </motion.div>

      {/* 2x3 grid of flip cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {foodPhotos.map((photo, i) => (
          <FlippableCard key={i} photo={photo} index={i} />
        ))}
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-zinc-700 text-xs text-center mt-10 font-mono"
      >
        6 restaurants • Click any card to flip
      </motion.p>
    </section>
  );
}
