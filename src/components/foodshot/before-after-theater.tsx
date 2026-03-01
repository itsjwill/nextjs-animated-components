"use client";

import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

export function BeforeAfterTheater() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeIdx, setActiveIdx] = useState(3); // CAPO PIZZA
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const photo = foodPhotos[activeIdx];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const handleMouseDown = useCallback(() => { isDragging.current = true; }, []);
  const handleMouseUp = useCallback(() => { isDragging.current = false; }, []);
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging.current) handleMove(e.clientX);
  }, [handleMove]);
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Full-viewport slider container */}
      <div
        ref={containerRef}
        className="absolute inset-0 cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* AFTER layer — full viewport (behind) */}
        <div className="absolute inset-0">
          <Image
            src={photo.after}
            alt={`${photo.restaurant} — FoodShot enhanced`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* BEFORE layer — clipped by slider */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <Image
            src={photo.before}
            alt={`${photo.restaurant} — Original`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Desaturate overlay on before */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Before / After labels */}
        <div className="absolute top-6 left-6 z-30">
          <div className="px-4 py-2 rounded-lg bg-black/50 backdrop-blur-md border border-zinc-500/30">
            <span className="text-zinc-300 text-sm font-bold uppercase tracking-wider">Before — Original</span>
          </div>
        </div>
        <div className="absolute top-6 right-6 z-30">
          <div className="px-4 py-2 rounded-lg bg-black/50 backdrop-blur-md border border-amber-500/30">
            <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">After — FoodShot</span>
          </div>
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none"
          style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-[2px] h-full bg-white/90 mx-auto relative shadow-[0_0_12px_rgba(255,255,255,0.4)]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white shadow-lg shadow-white/30 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L3 10L7 16" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 4L17 10L13 16" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Glass overlay bar at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 z-40"
      >
        <div className="bg-black/60 backdrop-blur-xl border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Restaurant selector */}
            <div className="flex gap-2 flex-wrap justify-center">
              {foodPhotos.map((p, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveIdx(i); setSliderPos(50); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeIdx === i
                      ? "bg-amber-500 text-black shadow-lg shadow-amber-500/25"
                      : "bg-white/10 text-zinc-400 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {p.restaurant}
                </button>
              ))}
            </div>

            {/* CTA */}
            <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap">
              Get Your Photos Enhanced →
            </button>
          </div>

          {/* Bottom labels */}
          <div className="max-w-7xl mx-auto px-6 pb-4 flex justify-between">
            <span className="text-zinc-500 text-xs">Phone photo • Bad lighting • Amateur</span>
            <span className="text-amber-400/70 text-xs">Studio quality • Cinematic • Professional</span>
          </div>
        </div>
      </motion.div>

      {/* Title overlay */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-20 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
          Drag to see the{" "}
          <span className="bg-gradient-to-r from-zinc-300 to-amber-400 bg-clip-text text-transparent">
            difference
          </span>
        </h2>
      </motion.div>
    </section>
  );
}
