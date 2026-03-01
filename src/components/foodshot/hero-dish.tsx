"use client";

import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

export function HeroDish() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeIdx, setActiveIdx] = useState(0);
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
    <section className="relative w-full min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-orange-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-900/10 blur-[80px]" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center min-h-screen">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 px-8 md:px-16 py-20 lg:py-0 flex flex-col justify-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Your food photos
            <br />
            are{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              costing you
            </span>
            <br />
            customers.
          </h1>

          <p className="text-zinc-400 text-lg max-w-md mb-8 leading-relaxed">
            87% of diners check photos before choosing a restaurant.
            Bad photos = empty tables. We fix that — automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <button className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
              See Your Photos Enhanced →
            </button>
            <button className="px-8 py-3.5 border border-zinc-700 text-zinc-300 font-medium rounded-xl hover:border-zinc-500 transition-colors">
              Watch Demo
            </button>
          </div>

          <div className="flex gap-8">
            {[
              { value: "2,400+", label: "Restaurants" },
              { value: "1.2M", label: "Photos Enhanced" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-amber-400 text-xl font-bold">{stat.value}</div>
                <div className="text-zinc-600 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Large embedded before/after slider */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 px-6 lg:px-12 py-10 lg:py-0 flex flex-col items-center justify-center"
        >
          {/* Slider container */}
          <div
            ref={containerRef}
            className="relative w-full max-w-[640px] aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl shadow-black/50"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            {/* AFTER layer (behind) */}
            <div className="absolute inset-0">
              <Image
                src={photo.after}
                alt={`${photo.restaurant} — Enhanced`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute top-3 right-3 z-20">
                <div className="px-3 py-1.5 rounded-lg bg-amber-500/20 backdrop-blur-sm border border-amber-500/30">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">After</span>
                </div>
              </div>
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
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute top-3 left-3 z-20">
                <div className="px-3 py-1.5 rounded-lg bg-zinc-500/20 backdrop-blur-sm border border-zinc-500/30">
                  <span className="text-zinc-300 text-xs font-bold uppercase tracking-wider">Before</span>
                </div>
              </div>
            </div>

            {/* Slider handle */}
            <div
              className="absolute top-0 bottom-0 z-20 pointer-events-none"
              style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
            >
              <div className="w-[2px] h-full bg-white/80 mx-auto relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg shadow-white/20 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M7 4L3 10L7 16" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13 4L17 10L13 16" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Restaurant selector tabs */}
          <div className="flex gap-2 mt-5 flex-wrap justify-center">
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
        </motion.div>
      </div>
    </section>
  );
}
