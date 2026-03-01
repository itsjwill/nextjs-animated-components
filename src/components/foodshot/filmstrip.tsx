"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Filmstrip" — Infinite horizontal scrolling cinema reel.
 * Two rows moving in opposite directions — befores scrolling left (dim),
 * afters scrolling right (vibrant). Creates a cinematic, never-ending feel.
 */

// Double the arrays for seamless loop
const befores = [...foodPhotos, ...foodPhotos];
const afters = [...foodPhotos, ...foodPhotos];

function PhotoCard({
  photo,
  type,
}: {
  photo: typeof foodPhotos[0];
  type: "before" | "after";
}) {
  const src = type === "before" ? photo.before : photo.after;

  return (
    <div className="flex-shrink-0 w-[260px] md:w-[320px]">
      <div
        className={`relative rounded-2xl overflow-hidden border ${
          type === "before"
            ? "border-zinc-800/40"
            : "border-amber-500/15"
        }`}
        style={{ aspectRatio: "3 / 4" }}
      >
        <Image
          src={src}
          alt={`${photo.restaurant} — ${type === "before" ? "Original" : "Enhanced"}`}
          fill
          className={`object-cover ${
            type === "before" ? "brightness-[0.5] saturate-[0.2]" : ""
          }`}
          sizes="320px"
        />
        {/* Label */}
        <div className={`absolute bottom-3 ${type === "before" ? "left-3" : "right-3"} z-10`}>
          <span className={`px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-sm border ${
            type === "before"
              ? "border-zinc-700/40 text-zinc-600"
              : "border-amber-500/30 text-amber-400"
          } text-[9px] font-mono uppercase tracking-wider`}>
            {type === "before" ? "Original" : "FoodShot"}
          </span>
        </div>
        {/* Restaurant name */}
        <div className="absolute bottom-3 left-3 right-3 z-10 flex justify-between items-end">
          {type === "after" && (
            <span className="text-white/80 text-xs font-medium">{photo.restaurant}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function Filmstrip() {
  const scrollDuration = 40;

  return (
    <section className="relative w-full bg-[#060606] overflow-hidden py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 px-6 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          The{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            reel
          </span>
        </h2>
        <p className="text-zinc-500 text-base">
          Top row: originals. Bottom row: enhanced. The difference never stops.
        </p>
      </motion.div>

      {/* Row 1: Befores — scrolling LEFT */}
      <div className="relative mb-5 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#060606] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#060606] to-transparent z-10" />
        <motion.div
          animate={{ x: [0, -(320 + 20) * foodPhotos.length] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: scrollDuration, ease: "linear" },
          }}
          className="flex gap-5 w-fit"
        >
          {befores.map((photo, i) => (
            <PhotoCard key={`b-${i}`} photo={photo} type="before" />
          ))}
        </motion.div>

        {/* "BEFORE" label */}
        <div className="absolute top-4 left-8 z-20">
          <span className="text-zinc-700 text-xs font-mono uppercase tracking-[0.3em]">
            Phone Photos
          </span>
        </div>
      </div>

      {/* Row 2: Afters — scrolling RIGHT */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#060606] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#060606] to-transparent z-10" />
        <motion.div
          animate={{ x: [-(320 + 20) * foodPhotos.length, 0] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: scrollDuration, ease: "linear" },
          }}
          className="flex gap-5 w-fit"
        >
          {afters.map((photo, i) => (
            <PhotoCard key={`a-${i}`} photo={photo} type="after" />
          ))}
        </motion.div>

        {/* "AFTER" label */}
        <div className="absolute top-4 right-8 z-20">
          <span className="text-amber-400/50 text-xs font-mono uppercase tracking-[0.3em]">
            FoodShot Enhanced
          </span>
        </div>
      </div>

      {/* Bottom tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-14 px-6"
      >
        <p className="text-zinc-600 text-sm">
          6 restaurants. 6 transformations. All in{" "}
          <span className="text-amber-400/70">under 30 seconds</span>.
        </p>
      </motion.div>
    </section>
  );
}
