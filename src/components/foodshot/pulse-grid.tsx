"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Pulse" — Photos breathe with a heartbeat rhythm.
 * Each card pulses at slightly different frequencies,
 * creating an organic, living grid. The food is alive.
 * A warm ambient glow pulses behind each card in sync.
 */

const pulseConfigs = [
  { duration: 3.2, delay: 0, scale: [1, 1.04, 1] },
  { duration: 2.8, delay: 0.4, scale: [1, 1.05, 1] },
  { duration: 3.5, delay: 0.8, scale: [1, 1.03, 1] },
  { duration: 3.0, delay: 1.2, scale: [1, 1.06, 1] },
  { duration: 3.3, delay: 0.6, scale: [1, 1.04, 1] },
  { duration: 2.9, delay: 1.0, scale: [1, 1.05, 1] },
];

function PulseCard({
  photo,
  index,
  config,
}: {
  photo: typeof foodPhotos[0];
  index: number;
  config: typeof pulseConfigs[0];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative"
    >
      {/* Ambient glow behind card */}
      <motion.div
        animate={{
          scale: config.scale,
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: config.duration,
          delay: config.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -inset-3 bg-amber-500/10 rounded-3xl blur-xl"
      />

      {/* Card */}
      <motion.div
        animate={{
          scale: config.scale,
        }}
        transition={{
          duration: config.duration,
          delay: config.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative rounded-2xl overflow-hidden border border-amber-500/10 bg-zinc-900 shadow-xl"
      >
        <div style={{ aspectRatio: "3 / 4" }} className="relative">
          <Image
            src={photo.after}
            alt={photo.restaurant}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
          />

          {/* Subtle warm overlay that pulses */}
          <motion.div
            animate={{
              opacity: [0, 0.08, 0],
            }}
            transition={{
              duration: config.duration,
              delay: config.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-amber-500 pointer-events-none"
          />

          {/* Bottom info */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-10">
            <p className="text-white text-sm font-semibold">{photo.restaurant}</p>
            <div className="flex items-center gap-2 mt-1">
              {/* Pulse dot */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: config.duration,
                  delay: config.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-1.5 rounded-full bg-amber-400"
              />
              <span className="text-amber-400/60 text-[10px] font-mono">
                Live
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PulseGrid() {
  return (
    <section className="relative w-full bg-[#060606] overflow-hidden px-6 md:px-12 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Food that{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            breathes
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Every photo has a heartbeat. Watch them pulse with life —
          that&apos;s the energy FoodShot puts into your menu.
        </p>
      </motion.div>

      {/* Pulse grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {foodPhotos.map((photo, i) => (
          <PulseCard
            key={i}
            photo={photo}
            index={i}
            config={pulseConfigs[i]}
          />
        ))}
      </div>

      {/* Bottom heartbeat line */}
      <div className="max-w-lg mx-auto mt-12 flex items-center gap-2">
        <div className="flex-1 h-px bg-zinc-800" />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-3 h-3 rounded-full bg-amber-500/50"
        />
        <div className="flex-1 h-px bg-zinc-800" />
      </div>
      <p className="text-zinc-700 text-xs text-center mt-4 font-mono">
        6 pulses • Always alive
      </p>
    </section>
  );
}
