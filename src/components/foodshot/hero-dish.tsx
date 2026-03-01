"use client";

import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

export function HeroDish() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeIdx, setActiveIdx] = useState(2); // El Jefe — best aspect ratio match
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const photo = foodPhotos[activeIdx];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(3, Math.min(97, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const handlePointerDown = useCallback(() => { isDragging.current = true; }, []);
  const handlePointerUp = useCallback(() => { isDragging.current = false; }, []);
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging.current) handleMove(e.clientX);
  }, [handleMove]);
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  return (
    <section className="relative w-full min-h-screen bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center px-6 py-24">
      {/* Warm vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-amber-900/8 blur-[150px]" />
      </div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 text-center mb-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight">
          Drag to see the{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            difference
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-md mx-auto">
          Real restaurant photos enhanced by FoodShot AI.
        </p>
      </motion.div>

      {/* Slider container — contained, not full-viewport */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <div
          ref={containerRef}
          className="relative w-full max-w-xl mx-auto rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl shadow-black/60 border border-amber-500/10"
          style={{ aspectRatio: "3 / 4" }}
          onMouseDown={handlePointerDown}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
        >
          {/* AFTER layer (behind) */}
          <div className="absolute inset-0">
            <Image
              src={photo.after}
              alt={`${photo.restaurant} — Enhanced`}
              fill
              className="object-cover"
              sizes="560px"
              priority
            />
          </div>

          {/* BEFORE layer (clipped) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <Image
              src={photo.before}
              alt={`${photo.restaurant} — Original`}
              fill
              className="object-cover"
              sizes="560px"
              priority
            />
          </div>

          {/* Corner labels */}
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-sm border border-zinc-600/40 text-zinc-300 text-[11px] font-mono uppercase tracking-wider">
              Before
            </span>
          </div>
          <div className="absolute top-4 right-4 z-20">
            <span className="px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-sm border border-amber-500/30 text-amber-400 text-[11px] font-mono uppercase tracking-wider">
              After
            </span>
          </div>

          {/* Slider handle */}
          <div
            className="absolute top-0 bottom-0 z-20 pointer-events-none"
            style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
          >
            <div className="w-[2px] h-full bg-white/70 mx-auto relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-xl shadow-black/30 flex items-center justify-center transition-transform hover:scale-110">
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4L3 10L7 16" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13 4L17 10L13 16" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Restaurant thumbnails */}
      <div className="relative z-10 flex gap-3 mt-8">
        {foodPhotos.map((p, i) => (
          <button
            key={i}
            onClick={() => { setActiveIdx(i); setSliderPos(50); }}
            className={`relative w-[72px] h-[72px] rounded-xl overflow-hidden transition-all ${
              activeIdx === i
                ? "ring-2 ring-amber-500 ring-offset-2 ring-offset-[#0a0a0a] scale-105"
                : "opacity-50 hover:opacity-80"
            }`}
          >
            <Image
              src={p.after}
              alt={p.restaurant}
              fill
              className="object-cover"
              sizes="72px"
            />
          </button>
        ))}
      </div>

      {/* Restaurant name */}
      <p className="relative z-10 text-zinc-400 text-sm mt-4 font-medium">
        {photo.restaurant}
      </p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="relative z-10 mt-8"
      >
        <button className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/20">
          Get Your Photos Enhanced →
        </button>
      </motion.div>
    </section>
  );
}
