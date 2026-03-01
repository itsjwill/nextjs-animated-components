"use client";

import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

// Best 4 photos for the grid
const gridPhotos = [foodPhotos[0], foodPhotos[3], foodPhotos[1], foodPhotos[2]];

function LensCard({ photo, index }: { photo: typeof foodPhotos[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const LENS_SIZE = 180;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
    >
      <div
        ref={cardRef}
        className="relative rounded-2xl overflow-hidden border border-zinc-800/60 bg-zinc-900 cursor-none group"
        style={{ aspectRatio: "3 / 4" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Before photo (base layer) — muted */}
        <Image
          src={photo.before}
          alt={`${photo.restaurant} — Original`}
          fill
          className="object-cover brightness-[0.6] saturate-[0.3]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* After photo revealed through circular mask */}
        <div
          className="absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            opacity: isHovering ? 1 : 0,
            clipPath: isHovering
              ? `circle(${LENS_SIZE / 2}px at ${mouse.x}px ${mouse.y}px)`
              : `circle(0px at ${mouse.x}px ${mouse.y}px)`,
            transition: "clip-path 0.15s ease-out, opacity 0.3s",
          }}
        >
          <Image
            src={photo.after}
            alt={`${photo.restaurant} — Enhanced`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Lens ring */}
          <div
            className="absolute border-2 border-amber-400/50 rounded-full pointer-events-none shadow-lg shadow-amber-500/10"
            style={{
              width: LENS_SIZE,
              height: LENS_SIZE,
              left: mouse.x - LENS_SIZE / 2,
              top: mouse.y - LENS_SIZE / 2,
            }}
          />
        </div>

        {/* Custom cursor dot when hovering */}
        {isHovering && (
          <div
            className="absolute z-30 pointer-events-none"
            style={{
              left: mouse.x - 4,
              top: mouse.y - 4,
            }}
          >
            <div className="w-2 h-2 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50" />
          </div>
        )}

        {/* Overlay text */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-5 z-20">
          <p className="text-white font-semibold text-sm">{photo.restaurant}</p>
          <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider mt-1">
            {isHovering ? "FoodShot Enhanced" : "Hover to reveal"}
          </p>
        </div>

        {/* "BEFORE" chip */}
        <div className="absolute top-3 left-3 z-20">
          <span className="px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-sm border border-zinc-700/40 text-zinc-500 text-[9px] font-mono uppercase tracking-wider">
            Original
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function MagicLens() {
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
          See the{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            magic
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Move your cursor over any photo. The lens reveals what FoodShot sees.
        </p>
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <span className="text-zinc-600 text-xs">Original</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="text-zinc-600 text-xs">Enhanced</span>
          </div>
        </div>
      </motion.div>

      {/* 2x2 grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {gridPhotos.map((photo, i) => (
          <LensCard key={i} photo={photo} index={i} />
        ))}
      </div>

      {/* Mobile fallback note */}
      <p className="text-zinc-700 text-[10px] text-center mt-8 md:hidden font-mono">
        Best experienced on desktop — hover to reveal
      </p>
    </section>
  );
}
