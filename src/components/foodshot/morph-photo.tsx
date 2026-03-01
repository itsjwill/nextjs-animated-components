"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Morph" — Click to morph between before and after.
 * Large centered photo with a dramatic dissolve/morph animation.
 * Pixelated grid transition effect when toggling.
 */

const bestPairs = [foodPhotos[0], foodPhotos[3], foodPhotos[1], foodPhotos[2]];

function MorphCard({ photo, index }: { photo: typeof foodPhotos[0]; index: number }) {
  const [isAfter, setIsAfter] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <button
        onClick={() => setIsAfter(!isAfter)}
        className="relative w-full rounded-2xl overflow-hidden border border-amber-500/10 bg-zinc-900 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
        style={{ aspectRatio: "3 / 4" }}
      >
        {/* After photo (base) */}
        <Image
          src={photo.after}
          alt={`${photo.restaurant} — Enhanced`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Before photo (overlay with animation) */}
        <AnimatePresence>
          {!isAfter && (
            <motion.div
              initial={{ clipPath: "circle(0% at 50% 50%)" }}
              animate={{ clipPath: "circle(100% at 50% 50%)" }}
              exit={{ clipPath: "circle(0% at 50% 50%)" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0 z-10"
            >
              <Image
                src={photo.before}
                alt={`${photo.restaurant} — Original`}
                fill
                className="object-cover brightness-[0.7] saturate-[0.4]"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle indicator */}
        <div className="absolute top-4 left-4 z-20">
          <div className={`px-3 py-1.5 rounded-lg backdrop-blur-sm border transition-all duration-500 ${
            isAfter
              ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
              : "bg-black/50 border-zinc-600/40 text-zinc-400"
          }`}>
            <span className="text-[10px] font-mono uppercase tracking-wider">
              {isAfter ? "Enhanced" : "Original"}
            </span>
          </div>
        </div>

        {/* Tap/Click prompt */}
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="px-5 py-2.5 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10">
            <span className="text-white text-xs font-medium">
              {isAfter ? "Click to see original" : "Click to enhance"}
            </span>
          </div>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-5 z-20">
          <p className="text-white font-semibold text-sm">{photo.restaurant}</p>
        </div>
      </button>
    </motion.div>
  );
}

export function MorphPhoto() {
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
          Click.{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            Transform.
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Tap any photo to morph between the original and the FoodShot version.
          The circle reveal shows exactly what changes.
        </p>
      </motion.div>

      {/* 2x2 grid of morphable cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {bestPairs.map((photo, i) => (
          <MorphCard key={i} photo={photo} index={i} />
        ))}
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-zinc-700 text-xs text-center mt-10 font-mono"
      >
        Every photo was enhanced in under 30 seconds
      </motion.p>
    </section>
  );
}
