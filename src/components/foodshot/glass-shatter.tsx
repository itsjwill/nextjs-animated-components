"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Shatter" — Click a photo and it shatters like glass,
 * exploding into triangular shards that fly outward and fade,
 * revealing the next photo underneath. Pure destruction aesthetic.
 */

// Generate triangular shard clip-paths for a grid
function generateShards(cols: number, rows: number) {
  const shards: {
    clipPath: string;
    centerX: number;
    centerY: number;
    exitX: number;
    exitY: number;
    exitRotate: number;
  }[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x1 = (c / cols) * 100;
      const y1 = (r / rows) * 100;
      const x2 = ((c + 1) / cols) * 100;
      const y2 = ((r + 1) / rows) * 100;
      const cx = (x1 + x2) / 2;
      const cy = (y1 + y2) / 2;

      // Split each cell into 2 triangles
      // Triangle 1: top-left diagonal
      shards.push({
        clipPath: `polygon(${x1}% ${y1}%, ${x2}% ${y1}%, ${x1}% ${y2}%)`,
        centerX: cx - 8,
        centerY: cy - 8,
        exitX: (cx - 50) * 6 + (Math.random() - 0.5) * 200,
        exitY: (cy - 50) * 6 + Math.random() * 300 - 100,
        exitRotate: (Math.random() - 0.5) * 180,
      });
      // Triangle 2: bottom-right diagonal
      shards.push({
        clipPath: `polygon(${x2}% ${y1}%, ${x2}% ${y2}%, ${x1}% ${y2}%)`,
        centerX: cx + 8,
        centerY: cy + 8,
        exitX: (cx - 50) * 6 + (Math.random() - 0.5) * 200,
        exitY: (cy - 50) * 6 + Math.random() * 300 + 100,
        exitRotate: (Math.random() - 0.5) * 180,
      });
    }
  }
  return shards;
}

export function GlassShatter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShattered, setIsShattered] = useState(false);
  const shards = useMemo(() => generateShards(5, 6), []);

  const currentPhoto = foodPhotos[currentIndex];
  const nextPhoto = foodPhotos[(currentIndex + 1) % foodPhotos.length];

  const handleShatter = useCallback(() => {
    if (isShattered) return;
    setIsShattered(true);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % foodPhotos.length);
      setIsShattered(false);
    }, 1200);
  }, [isShattered]);

  return (
    <section className="relative w-full bg-[#060606] overflow-hidden px-6 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Break{" "}
          <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            through
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Click to shatter the glass. The next dish awaits.
        </p>
      </motion.div>

      {/* Shatter container */}
      <div
        onClick={handleShatter}
        className="relative max-w-xl mx-auto rounded-2xl overflow-hidden cursor-pointer"
        style={{ aspectRatio: "3 / 4" }}
      >
        {/* Next photo (underneath) */}
        <Image
          src={nextPhoto.after}
          alt={nextPhoto.restaurant}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 560px"
        />

        {/* Current photo — shatters into shards */}
        <AnimatePresence>
          {!isShattered ? (
            <div className="absolute inset-0 z-10">
              <Image
                src={currentPhoto.after}
                alt={currentPhoto.restaurant}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 560px"
              />
              {/* Glass sheen */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.02] pointer-events-none" />
            </div>
          ) : (
            // Shattering shards
            shards.map((shard, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                animate={{
                  x: shard.exitX,
                  y: shard.exitY,
                  rotate: shard.exitRotate,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.8 + Math.random() * 0.4,
                  delay: Math.random() * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="absolute inset-0 z-10"
                style={{ clipPath: shard.clipPath }}
              >
                <Image
                  src={currentPhoto.after}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="560px"
                />
                {/* Glass edge highlight */}
                <div className="absolute inset-0 border border-white/10" />
              </motion.div>
            ))
          )}
        </AnimatePresence>

        {/* Impact flash */}
        <AnimatePresence>
          {isShattered && (
            <motion.div
              initial={{ opacity: 0.6 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-20 bg-white pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Photo info */}
        <div className="absolute bottom-6 left-6 z-30">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="px-4 py-3 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10"
            >
              <p className="text-red-400/60 text-[9px] font-mono uppercase tracking-wider">
                {isShattered ? "Shattering..." : "Click to break"}
              </p>
              <p className="text-white text-lg font-bold">
                {currentPhoto.restaurant}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress */}
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
    </section>
  );
}
