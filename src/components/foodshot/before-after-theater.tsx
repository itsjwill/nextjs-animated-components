"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

// Asymmetric grid sizes — some cards larger for editorial feel
const gridConfig = [
  { colSpan: "md:col-span-2", height: "h-[480px]" },  // Culinary Dropout — large
  { colSpan: "md:col-span-1", height: "h-[360px]" },  // Tokyo Hana — medium
  { colSpan: "md:col-span-1", height: "h-[360px]" },  // El Jefe — medium
  { colSpan: "md:col-span-1", height: "h-[300px]" },  // CAPO PIZZA — compact
  { colSpan: "md:col-span-2", height: "h-[420px]" },  // Mega Burgers — large
  { colSpan: "md:col-span-1", height: "h-[300px]" },  // Roost — compact
];

function GalleryCard({ photo, index, config }: {
  photo: typeof foodPhotos[0];
  index: number;
  config: typeof gridConfig[0];
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`${config.colSpan}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative ${config.height} rounded-2xl overflow-hidden border border-amber-500/10 bg-zinc-900 cursor-pointer group`}>
        {/* After photo (default) */}
        <Image
          src={photo.after}
          alt={`${photo.restaurant} — Enhanced`}
          fill
          className={`object-cover transition-all duration-700 ${
            isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Before photo (on hover) */}
        <Image
          src={photo.before}
          alt={`${photo.restaurant} — Original`}
          fill
          className={`object-cover brightness-[0.7] saturate-[0.4] transition-all duration-700 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Hover overlay label */}
        <div className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
          <div className="px-4 py-2 rounded-lg bg-black/60 backdrop-blur-sm border border-zinc-500/30">
            <span className="text-zinc-300 text-xs font-mono uppercase tracking-wider">See Original</span>
          </div>
        </div>

        {/* Bottom gradient + name */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5 z-10">
          <p className="text-white font-semibold text-base">{photo.restaurant}</p>
          <p className={`text-xs font-mono uppercase tracking-wider mt-1 transition-colors duration-500 ${
            isHovered ? "text-zinc-400" : "text-amber-400/70"
          }`}>
            {isHovered ? "Original phone photo" : "Enhanced by FoodShot"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function BeforeAfterTheater() {
  return (
    <section className="relative w-full bg-[#0a0a0a] overflow-hidden px-6 md:px-12 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Every dish deserves its{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            moment
          </span>
        </h2>
        <p className="text-zinc-500 text-base">
          Hover over any photo to see the original. Same dish. Completely different energy.
        </p>
      </motion.div>

      {/* Asymmetric editorial grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {foodPhotos.map((photo, i) => (
          <GalleryCard
            key={i}
            photo={photo}
            index={i}
            config={gridConfig[i]}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <button className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/20">
          Transform Your Menu Photos →
        </button>
      </motion.div>
    </section>
  );
}
