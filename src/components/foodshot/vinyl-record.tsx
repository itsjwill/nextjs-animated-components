"use client";

import { motion, animate, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Vinyl" — Record player / turntable.
 * A vinyl record spins on a turntable. The record label in the center
 * shows a food photo. The tonearm sits on the record. Click the
 * play/pause button. Drag the tonearm. Switch records to see
 * different restaurants.
 */

export function VinylRecord() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const rotation = useMotionValue(0);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);

  const photo = foodPhotos[currentIndex];

  // Spin animation
  useEffect(() => {
    if (isPlaying) {
      animRef.current = animate(rotation, rotation.get() + 360, {
        duration: 4,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      });
    } else {
      animRef.current?.stop();
    }
    return () => {
      animRef.current?.stop();
    };
  }, [isPlaying, rotation]);

  const switchRecord = useCallback(
    (dir: 1 | -1) => {
      animRef.current?.stop();
      setIsPlaying(false);
      rotation.set(0);
      setCurrentIndex(
        (prev) => (prev + dir + foodPhotos.length) % foodPhotos.length
      );
      // Resume after switching
      setTimeout(() => setIsPlaying(true), 500);
    },
    [rotation]
  );

  return (
    <section className="relative w-full bg-[#0a0808] overflow-hidden px-6 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Now{" "}
          <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            spinning
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Drop the needle. Every record is a different dish.
        </p>
      </motion.div>

      {/* Turntable */}
      <div className="max-w-lg mx-auto">
        <div className="relative bg-gradient-to-b from-[#1a1410] to-[#0f0c08] rounded-2xl p-8 shadow-2xl border border-zinc-800">
          {/* Platter */}
          <div
            className="relative mx-auto rounded-full bg-zinc-900 shadow-inner"
            style={{ width: 320, height: 320 }}
          >
            {/* Spinning vinyl */}
            <motion.div
              style={{ rotate: rotation }}
              className="absolute inset-2 rounded-full overflow-hidden"
            >
              {/* Vinyl grooves */}
              <div className="absolute inset-0 rounded-full bg-zinc-950">
                {/* Groove rings */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-zinc-800/40"
                    style={{
                      inset: `${15 + i * 8}px`,
                    }}
                  />
                ))}

                {/* Light reflection on vinyl */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.03) 10%, transparent 20%, rgba(255,255,255,0.02) 50%, transparent 60%)",
                  }}
                />
              </div>

              {/* Center label with photo */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-zinc-700 z-10">
                <Image
                  src={photo.after}
                  alt={photo.restaurant}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
                {/* Center hole */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-zinc-900 border border-zinc-700" />
              </div>
            </motion.div>

            {/* Spindle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-zinc-600 z-20 shadow-md" />
          </div>

          {/* Tonearm */}
          <div className="absolute top-6 right-8">
            <motion.div
              animate={{
                rotate: isPlaying ? 22 : 5,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              className="relative"
              style={{
                transformOrigin: "top right",
                width: 140,
                height: 8,
              }}
            >
              {/* Arm */}
              <div className="absolute top-0 right-0 w-full h-1.5 bg-zinc-600 rounded-full origin-right" />
              {/* Head */}
              <div className="absolute top-[-2px] left-0 w-4 h-3 bg-zinc-500 rounded-sm" />
              {/* Pivot */}
              <div className="absolute top-[-3px] right-[-3px] w-3 h-3 rounded-full bg-zinc-500 border border-zinc-400" />
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6 px-4">
            {/* Previous */}
            <button
              onClick={() => switchRecord(-1)}
              className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white transition-colors flex items-center justify-center"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            {/* Play/Pause */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 rounded-full bg-gradient-to-b from-orange-500 to-red-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-shadow"
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Next */}
            <button
              onClick={() => switchRecord(1)}
              className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white transition-colors flex items-center justify-center"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>

          {/* Now playing */}
          <div className="text-center mt-4">
            <p className="text-orange-400/60 text-[9px] font-mono uppercase tracking-wider">
              Now Playing
            </p>
            <p className="text-white text-lg font-semibold mt-1">
              {photo.restaurant}
            </p>
            <p className="text-zinc-600 text-xs mt-0.5">
              Enhanced by FoodShot AI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
