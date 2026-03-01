"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Gravity" — Photos drop from above with physics.
 * Each card falls, bounces, and settles into a stacked layout.
 * Click "Drop" to replay the animation. Simulated weight and momentum.
 */

const dropOrder = [0, 3, 1, 4, 2, 5]; // Staggered drop order

function GravityCard({
  photo,
  index,
  dropIndex,
  shouldDrop,
}: {
  photo: typeof foodPhotos[0];
  index: number;
  dropIndex: number;
  shouldDrop: boolean;
}) {
  // Final resting position in a 3x2 grid
  const col = index % 3;
  const row = Math.floor(index / 3);

  return (
    <motion.div
      initial={{ y: -800, rotate: (dropIndex % 2 === 0 ? 1 : -1) * (8 + dropIndex * 3), opacity: 0 }}
      animate={
        shouldDrop
          ? {
              y: 0,
              rotate: 0,
              opacity: 1,
            }
          : { y: -800, rotate: (dropIndex % 2 === 0 ? 1 : -1) * (8 + dropIndex * 3), opacity: 0 }
      }
      transition={{
        delay: dropIndex * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 120,
        damping: 12,
        mass: 1.5,
      }}
      className="relative"
      style={{
        gridColumn: col + 1,
        gridRow: row + 1,
      }}
    >
      <div
        className="relative rounded-2xl overflow-hidden border border-amber-500/15 bg-zinc-900 shadow-2xl shadow-black/50"
        style={{ aspectRatio: "3 / 4" }}
      >
        <Image
          src={photo.after}
          alt={photo.restaurant}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />

        {/* Landing impact flash */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={shouldDrop ? { opacity: [0, 0.3, 0] } : {}}
          transition={{ delay: dropIndex * 0.2 + 0.7, duration: 0.3 }}
          className="absolute inset-0 bg-amber-400 pointer-events-none"
        />

        {/* Bottom info */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white text-sm font-semibold">{photo.restaurant}</p>
          <p className="text-amber-400/60 text-[10px] font-mono">Enhanced</p>
        </div>
      </div>
    </motion.div>
  );
}

export function GravityDrop() {
  const [dropped, setDropped] = useState(false);
  const [key, setKey] = useState(0);

  // Auto-drop when section comes into view
  useEffect(() => {
    const timer = setTimeout(() => setDropped(true), 500);
    return () => clearTimeout(timer);
  }, [key]);

  const replay = () => {
    setDropped(false);
    setKey((k) => k + 1);
  };

  return (
    <section className="relative w-full bg-[#060606] overflow-hidden px-6 md:px-12 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Let it{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            drop
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto mb-6">
          Watch every transformation land with impact. Real physics. Real weight.
        </p>
        <button
          onClick={replay}
          className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 hover:border-amber-500/30 hover:text-amber-400 transition-colors text-sm font-medium"
        >
          Drop Again ↓
        </button>
      </motion.div>

      {/* Drop zone */}
      <div key={key} className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {dropOrder.map((photoIndex, dropIdx) => (
          <GravityCard
            key={dropIdx}
            photo={foodPhotos[photoIndex]}
            index={dropIdx}
            dropIndex={dropIdx}
            shouldDrop={dropped}
          />
        ))}
      </div>

      {/* Impact line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={dropped ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mt-8"
      />
    </section>
  );
}
