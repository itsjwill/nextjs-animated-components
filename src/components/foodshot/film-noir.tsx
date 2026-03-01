"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Noir" — Film noir aesthetic. All photos are desaturated black & white.
 * When you hover a photo, a warm golden color bleeds in ONLY on the food,
 * creating a selective color pop effect. Like a black & white movie
 * where only the important thing has color.
 */

export function FilmNoir() {
  return (
    <section className="relative w-full bg-[#050505] overflow-hidden px-6 py-24">
      {/* Film grain overlay — covers everything */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-3xl mx-auto"
      >
        <h2
          className="text-5xl md:text-8xl font-bold text-white mb-4 tracking-tight"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          After{" "}
          <span className="italic text-amber-100/80">dark</span>
        </h2>
        <p className="text-zinc-600 text-base max-w-lg mx-auto italic">
          Hover to reveal the color. Only the food comes alive.
        </p>
      </motion.div>

      {/* Noir grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-5">
        {foodPhotos.map((photo, i) => (
          <NoirCard key={i} photo={photo} index={i} />
        ))}
      </div>

      {/* Bottom tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <p
          className="text-zinc-700 text-sm italic"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          &ldquo;In a world of gray, the food speaks in color.&rdquo;
        </p>
      </motion.div>
    </section>
  );
}

function NoirCard({
  photo,
  index,
}: {
  photo: (typeof foodPhotos)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      style={{ aspectRatio: "3 / 4" }}
    >
      {/* Black & white layer (always visible) */}
      <Image
        src={photo.after}
        alt={photo.restaurant}
        fill
        className="object-cover transition-all duration-700"
        sizes="(max-width: 768px) 50vw, 33vw"
        style={{
          filter: isHovered
            ? "grayscale(0%) brightness(1)"
            : "grayscale(100%) brightness(0.7) contrast(1.2)",
        }}
      />

      {/* Warm color overlay that fades in */}
      <div
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(245,158,11,0.08) 0%, transparent 70%)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />

      {/* Film scratches effect on hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.15) 3px, transparent 4px)",
            backgroundPosition: `${Math.random() * 100}px 0`,
          }}
        />
      )}

      {/* Restaurant name — old Hollywood style */}
      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0.6 }}
          transition={{ duration: 0.5 }}
        >
          <p
            className="text-amber-200/40 text-[9px] uppercase tracking-[0.3em] mb-1"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Presented by FoodShot
          </p>
          <p
            className="text-white text-lg font-normal italic"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {photo.restaurant}
          </p>
        </motion.div>
      </div>

      {/* Corner frame marks */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
