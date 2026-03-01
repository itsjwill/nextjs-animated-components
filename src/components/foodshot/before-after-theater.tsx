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
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
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
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center px-6 py-20">
      <div className="absolute inset-0"
        style={{
          background: `linear-gradient(to right, rgba(60,60,70,0.1) 0%, rgba(60,60,70,0.1) ${sliderPos}%, rgba(255,107,53,0.05) ${sliderPos}%, rgba(255,107,53,0.05) 100%)`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 text-center mb-6"
      >
        <span className="inline-block px-4 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-zinc-500 to-amber-500 text-white mb-4">
          Concept 4C — Before & After Theater
        </span>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-3">
          Drag to see the{" "}
          <span className="bg-gradient-to-r from-zinc-400 to-amber-400 bg-clip-text text-transparent">
            difference
          </span>
        </h2>
        <p className="text-zinc-500 max-w-lg mx-auto">
          Real restaurant photos. Same dish. Drag the slider.
        </p>
      </motion.div>

      {/* Restaurant selector */}
      <div className="relative z-10 flex gap-2 mb-6">
        {foodPhotos.map((p, i) => (
          <button
            key={i}
            onClick={() => { setActiveIdx(i); setSliderPos(50); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeIdx === i
                ? "bg-amber-500 text-black"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            {p.restaurant}
          </button>
        ))}
      </div>

      {/* Before/After Container */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-5xl h-[550px] rounded-2xl overflow-hidden border border-zinc-800 cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* AFTER layer — full width (behind) */}
        <div className="absolute inset-0">
          <Image
            src={photo.after}
            alt={`${photo.restaurant} — FoodShot enhanced`}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
          <div className="absolute top-4 right-4 z-30">
            <div className="px-3 py-1.5 rounded-lg bg-amber-500/20 backdrop-blur-sm border border-amber-500/30">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">After — FoodShot</span>
            </div>
          </div>
        </div>

        {/* BEFORE layer — clipped by slider */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={photo.before}
              alt={`${photo.restaurant} — Original`}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
          </div>
          <div className="absolute top-4 left-4 z-30">
            <div className="px-3 py-1.5 rounded-lg bg-zinc-500/20 backdrop-blur-sm border border-zinc-500/30">
              <span className="text-zinc-300 text-xs font-bold uppercase tracking-wider">Before — Original</span>
            </div>
          </div>
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none"
          style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-0.5 h-full bg-white/80 mx-auto relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg shadow-white/20 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L3 10L7 16" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 4L17 10L13 16" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom labels */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative z-10 flex justify-between w-full max-w-5xl mt-4"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-zinc-600" />
          <span className="text-zinc-500 text-sm">Phone photo • Bad lighting • Amateur</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-amber-400 text-sm">Studio quality • Cinematic • Professional</span>
          <div className="w-3 h-3 rounded-full bg-amber-500" />
        </div>
      </motion.div>
    </section>
  );
}
