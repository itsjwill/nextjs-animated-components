"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Ripple" — Click-to-reveal with expanding circle.
 * The current photo is visible. Click anywhere and a ripple
 * expands from that point, revealing the next photo underneath.
 * Like dropping a stone in water that washes away the image.
 */

export function RippleClick() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [ripple, setRipple] = useState<{
    x: number;
    y: number;
    id: number;
  } | null>(null);
  const [rippleCount, setRippleCount] = useState(0);

  const currentPhoto = foodPhotos[currentIndex];
  const nextPhoto = foodPhotos[nextIndex];

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (ripple) return; // debounce

      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setRipple({ x, y, id: rippleCount });
      setRippleCount((c) => c + 1);

      // After animation, swap photos
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % foodPhotos.length);
        setRipple(null);
      }, 800);
    },
    [ripple, rippleCount, nextIndex]
  );

  return (
    <section className="relative w-full bg-[#0a0a0a] overflow-hidden px-6 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Make a{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            splash
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Click anywhere to ripple into the next photo
        </p>
      </motion.div>

      {/* Ripple container */}
      <div
        onClick={handleClick}
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

        {/* Current photo (on top, gets clipped away by ripple) */}
        <div
          className="absolute inset-0 z-10"
          style={
            ripple
              ? {
                  clipPath: `circle(0% at ${ripple.x}% ${ripple.y}%)`,
                  animation: "ripple-expand 0.8s ease-out forwards",
                }
              : undefined
          }
        >
          <Image
            src={currentPhoto.after}
            alt={currentPhoto.restaurant}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 560px"
          />
        </div>

        {/* Ripple ring animation */}
        <AnimatePresence>
          {ripple && (
            <>
              {[0, 1, 2].map((ring) => (
                <motion.div
                  key={`${ripple.id}-${ring}`}
                  initial={{
                    width: 0,
                    height: 0,
                    opacity: 0.6,
                    left: `${ripple.x}%`,
                    top: `${ripple.y}%`,
                    x: "-50%",
                    y: "-50%",
                  }}
                  animate={{
                    width: 1200,
                    height: 1200,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 1,
                    delay: ring * 0.15,
                    ease: "easeOut",
                  }}
                  className="absolute rounded-full border-2 border-cyan-400/40 pointer-events-none z-20"
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Photo labels */}
        <div className="absolute bottom-6 left-6 z-30">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="px-4 py-3 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10"
            >
              <p className="text-cyan-400/60 text-[9px] font-mono uppercase tracking-wider">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(foodPhotos.length).padStart(2, "0")}
              </p>
              <p className="text-white text-lg font-bold">
                {currentPhoto.restaurant}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Click indicator */}
        <div className="absolute top-4 right-4 z-30">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400/50" />
          </motion.div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="max-w-xl mx-auto mt-6 flex gap-1.5">
        {foodPhotos.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              i === currentIndex
                ? "bg-cyan-400"
                : i < currentIndex
                  ? "bg-cyan-400/30"
                  : "bg-zinc-800"
            }`}
          />
        ))}
      </div>

      {/* CSS animation for ripple clip-path */}
      <style jsx>{`
        @keyframes ripple-expand {
          0% {
            clip-path: circle(150% at ${ripple?.x ?? 50}% ${ripple?.y ?? 50}%);
          }
          100% {
            clip-path: circle(0% at ${ripple?.x ?? 50}% ${ripple?.y ?? 50}%);
          }
        }
      `}</style>
    </section>
  );
}
