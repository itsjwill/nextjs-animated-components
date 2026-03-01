"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Liquid" — Smooth blob-morphing transitions between photos.
 * A large organic blob shape contains the current photo. Every few
 * seconds, the blob morphs its shape while crossfading to the next
 * photo. Uses CSS clip-path with animated border-radius values
 * to create fluid, liquid-like shape transitions.
 */

// Organic blob shapes defined as border-radius values
const blobShapes = [
  "60% 40% 30% 70% / 60% 30% 70% 40%",
  "30% 60% 70% 40% / 50% 60% 30% 60%",
  "50% 50% 40% 60% / 40% 60% 50% 50%",
  "40% 60% 50% 50% / 60% 40% 60% 40%",
  "70% 30% 50% 50% / 30% 50% 60% 50%",
  "45% 55% 65% 35% / 55% 45% 35% 65%",
];

export function LiquidMorph() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shapeIndex, setShapeIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % foodPhotos.length);
      setShapeIndex((prev) => (prev + 1) % blobShapes.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const currentPhoto = foodPhotos[currentIndex];

  return (
    <section className="relative w-full bg-[#080808] overflow-hidden px-6 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Fluid{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            beauty
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Watch the shape breathe and transform. Click to advance.
        </p>
      </motion.div>

      {/* Liquid blob container */}
      <div
        className="relative max-w-lg mx-auto cursor-pointer"
        onClick={() => {
          setCurrentIndex((prev) => (prev + 1) % foodPhotos.length);
          setShapeIndex((prev) => (prev + 1) % blobShapes.length);
        }}
        style={{ aspectRatio: "1 / 1" }}
      >
        {/* Ambient glow behind blob */}
        <motion.div
          animate={{
            borderRadius: blobShapes[shapeIndex],
            background: [
              "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
            ],
          }}
          transition={{
            borderRadius: { duration: 2, ease: "easeInOut" },
            background: { duration: 4, repeat: Infinity },
          }}
          className="absolute inset-[-20px] blur-[40px]"
        />

        {/* The blob */}
        <motion.div
          animate={{ borderRadius: blobShapes[shapeIndex] }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="relative w-full h-full overflow-hidden shadow-2xl shadow-violet-500/10"
        >
          {/* Photo with crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={currentPhoto.after}
                alt={currentPhoto.restaurant}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 512px"
              />
            </motion.div>
          </AnimatePresence>

          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10 pointer-events-none" />
        </motion.div>

        {/* Floating label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute -bottom-12 left-1/2 -translate-x-1/2"
          >
            <div className="px-5 py-2.5 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-violet-500/20">
              <p className="text-white text-sm font-medium whitespace-nowrap">
                {currentPhoto.restaurant}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot navigation */}
      <div className="flex justify-center gap-2 mt-20">
        {foodPhotos.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentIndex(i);
              setShapeIndex(i % blobShapes.length);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i === currentIndex
                ? "bg-violet-400 scale-150"
                : "bg-zinc-700 hover:bg-zinc-500"
            }`}
          />
        ))}
      </div>

      {/* Shape name */}
      <p className="text-zinc-800 text-[10px] text-center mt-6 font-mono uppercase tracking-wider">
        Organic form {shapeIndex + 1}
      </p>
    </section>
  );
}
