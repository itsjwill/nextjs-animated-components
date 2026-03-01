"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

// Best photos first — Culinary Dropout, CAPO PIZZA, Tokyo Hana, El Jefe, Roost
const heroOrder = [0, 3, 1, 2, 5, 4];

export function SpotlightCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % heroOrder.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + heroOrder.length) % heroOrder.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const photo = foodPhotos[heroOrder[current]];

  return (
    <section className="relative w-full bg-[#060606] overflow-hidden">
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
        {/* Ambient glow behind photo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-[120px]" />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 text-center mb-10"
        >
          <h2 className="text-4xl md:text-7xl font-bold text-white mb-3 tracking-tight">
            One photo.{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              All the difference.
            </span>
          </h2>
          <p className="text-zinc-500 text-base max-w-md mx-auto">
            Every image below was a phone photo 30 seconds ago.
          </p>
        </motion.div>

        {/* Main hero photo */}
        <div
          className="relative z-10 w-full max-w-2xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative rounded-3xl overflow-hidden border border-amber-500/10 bg-zinc-900/60 shadow-2xl shadow-black/50" style={{ aspectRatio: "3 / 4" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={photo.after}
                  alt={`${photo.restaurant} — Enhanced by FoodShot`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 672px"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient overlay at bottom */}
            <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

            {/* Restaurant name — large editorial */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute bottom-8 left-8 right-8 z-20"
              >
                <p className="text-amber-400/70 text-[10px] font-mono uppercase tracking-[0.25em] mb-2">
                  Enhanced by FoodShot
                </p>
                <h3 className="text-white text-3xl md:text-5xl font-bold tracking-tight">
                  {photo.restaurant}
                </h3>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/60 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/60 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {heroOrder.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-8 bg-amber-400"
                    : "w-1.5 bg-zinc-700 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="relative z-10 flex items-center justify-center gap-3 mt-8">
          {heroOrder.map((photoIdx, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative rounded-xl overflow-hidden transition-all duration-500 ${
                i === current
                  ? "ring-2 ring-amber-400/60 scale-105 opacity-100"
                  : "opacity-40 hover:opacity-70 scale-95"
              }`}
              style={{ width: 64, height: 80 }}
            >
              <Image
                src={foodPhotos[photoIdx].after}
                alt={foodPhotos[photoIdx].restaurant}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
