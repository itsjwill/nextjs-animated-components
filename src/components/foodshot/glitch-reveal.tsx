"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Glitch" — VHS / digital glitch effect.
 * Photos display with periodic glitch bursts — RGB channel splits,
 * scan lines, horizontal tears, and static noise. Click to trigger
 * a heavy glitch that transitions to the next photo.
 */

export function GlitchReveal() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [autoGlitch, setAutoGlitch] = useState(false);

  const photo = foodPhotos[currentIndex];

  // Periodic micro-glitches
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoGlitch(true);
      setTimeout(() => setAutoGlitch(false), 150);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const triggerGlitch = useCallback(() => {
    if (isGlitching) return;
    setIsGlitching(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % foodPhotos.length);
      setTimeout(() => setIsGlitching(false), 200);
    }, 400);
  }, [isGlitching]);

  return (
    <section className="relative w-full bg-[#050505] overflow-hidden px-6 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Signal{" "}
          <span className="bg-gradient-to-r from-red-500 via-green-400 to-blue-500 bg-clip-text text-transparent">
            disrupted
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Click to glitch into the next transformation
        </p>
      </motion.div>

      {/* Glitch container */}
      <button
        onClick={triggerGlitch}
        className="relative max-w-xl mx-auto block rounded-2xl overflow-hidden cursor-pointer group focus:outline-none"
        style={{ aspectRatio: "3 / 4" }}
      >
        {/* Base image */}
        <Image
          src={photo.after}
          alt={photo.restaurant}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 560px"
        />

        {/* RGB Channel split layers */}
        {(isGlitching || autoGlitch) && (
          <>
            {/* Red channel */}
            <div
              className="absolute inset-0 mix-blend-screen opacity-70"
              style={{
                transform: `translate(${isGlitching ? 8 : 3}px, ${isGlitching ? -4 : 1}px)`,
              }}
            >
              <Image
                src={photo.after}
                alt=""
                fill
                className="object-cover"
                sizes="560px"
                style={{ filter: "url(#red-channel)" }}
              />
            </div>
            {/* Blue channel */}
            <div
              className="absolute inset-0 mix-blend-screen opacity-70"
              style={{
                transform: `translate(${isGlitching ? -8 : -3}px, ${isGlitching ? 4 : -1}px)`,
              }}
            >
              <Image
                src={photo.after}
                alt=""
                fill
                className="object-cover"
                sizes="560px"
                style={{ filter: "url(#blue-channel)" }}
              />
            </div>
          </>
        )}

        {/* Scan lines overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
          }}
        />

        {/* Horizontal tear lines during glitch */}
        {isGlitching && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            {[20, 35, 55, 72, 88].map((top) => (
              <div
                key={top}
                className="absolute left-0 right-0 h-[3px] bg-white/20"
                style={{
                  top: `${top}%`,
                  transform: `translateX(${Math.random() > 0.5 ? 15 : -15}px)`,
                }}
              />
            ))}
          </div>
        )}

        {/* Static noise during heavy glitch */}
        {isGlitching && (
          <div
            className="absolute inset-0 z-30 pointer-events-none opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            }}
          />
        )}

        {/* VHS tracking bar */}
        <motion.div
          animate={
            isGlitching || autoGlitch
              ? { top: ["0%", "100%"] }
              : { top: "110%" }
          }
          transition={{ duration: isGlitching ? 0.3 : 0.8, ease: "linear" }}
          className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-white/10 to-transparent z-20 pointer-events-none"
        />

        {/* Photo info */}
        <div className="absolute bottom-6 left-6 z-30">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="px-4 py-3 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10"
            >
              <p className="text-red-400/60 text-[9px] font-mono uppercase tracking-wider">
                CH {String(currentIndex + 1).padStart(2, "0")} {"//"} REC
              </p>
              <p className="text-white text-lg font-bold">
                {photo.restaurant}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* REC indicator */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2.5 h-2.5 rounded-full bg-red-500"
          />
          <span className="text-red-500 text-[10px] font-mono font-bold">
            REC
          </span>
        </div>

        {/* Click prompt */}
        <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-4 py-2 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg text-white text-xs font-mono">
            CLICK TO GLITCH
          </span>
        </div>
      </button>

      {/* Photo counter */}
      <div className="flex justify-center gap-2 mt-6">
        {foodPhotos.map((_, i) => (
          <div
            key={i}
            className={`w-8 h-1 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-red-500" : "bg-zinc-800"
            }`}
          />
        ))}
      </div>

      {/* SVG filters for RGB channel separation */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="red-channel">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            />
          </filter>
          <filter id="blue-channel">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
    </section>
  );
}
