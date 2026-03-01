"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

// Best 3 pairs by aspect ratio compatibility
const pairs = [
  foodPhotos[2], // El Jefe — portrait/portrait (best match)
  foodPhotos[3], // CAPO PIZZA — square/portrait
  foodPhotos[1], // Tokyo Hana — square/portrait
];

function PairSection({ photo, index }: { photo: typeof foodPhotos[0]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-6 py-16">
      {/* Restaurant name */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-zinc-600 text-xs font-mono uppercase tracking-[0.2em] mb-8"
      >
        {photo.restaurant}
      </motion.p>

      {/* Side-by-side pair */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
        {/* Before card */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div
            className="relative w-[280px] md:w-[320px] rounded-2xl overflow-hidden border border-zinc-700/60 bg-zinc-900 shadow-xl"
            style={{ aspectRatio: "3 / 4" }}
          >
            <Image
              src={photo.before}
              alt={`${photo.restaurant} — Original`}
              fill
              className="object-cover brightness-[0.75] saturate-[0.5]"
              sizes="320px"
            />
            {/* Before chip */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-3 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-zinc-600/40 text-zinc-400 text-[10px] font-mono uppercase tracking-wider">
                Before
              </span>
            </div>
            {/* Bottom info */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4 z-10">
              <p className="text-zinc-500 text-[10px] font-mono">Phone Camera • No Edit</p>
            </div>
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex-shrink-0"
        >
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-amber-400 md:rotate-0 rotate-90">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </motion.div>

        {/* After card */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div
            className="relative w-[280px] md:w-[320px] rounded-2xl overflow-hidden border border-amber-500/20 bg-zinc-900 shadow-xl shadow-amber-900/10"
            style={{ aspectRatio: "3 / 4" }}
          >
            <Image
              src={photo.after}
              alt={`${photo.restaurant} — Enhanced`}
              fill
              className="object-cover"
              sizes="320px"
            />
            {/* After chip */}
            <div className="absolute top-3 right-3 z-10">
              <span className="px-3 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-amber-500/30 text-amber-400 text-[10px] font-mono uppercase tracking-wider">
                After
              </span>
            </div>
            {/* Bottom info */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4 z-10">
              <p className="text-amber-400/70 text-[10px] font-mono">Studio Quality • AI Enhanced</p>
            </div>
            {/* Warm glow */}
            <div className="absolute -inset-6 bg-amber-500/5 blur-2xl rounded-3xl -z-10" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function GlowUpMachine() {
  return (
    <section className="relative w-full bg-[#0a0a0a] overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center pt-24 pb-8 px-6"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          The{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            proof
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Same dish. Same restaurant. Completely different energy.
        </p>
      </motion.div>

      {/* 3 pair sections */}
      {pairs.map((photo, i) => (
        <PairSection key={i} photo={photo} index={i} />
      ))}
    </section>
  );
}
