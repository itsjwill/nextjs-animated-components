"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Accordion" — Expandable photo panels.
 * All 6 photos shown as compressed vertical strips.
 * Hover/click one and it expands to take up most of the width
 * while the others compress further. Like a visual accordion.
 */

export function AccordionPanels() {
  const [activeIndex, setActiveIndex] = useState(0);

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
          Expand your{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            menu
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Hover over any panel to expand it. Each restaurant gets its moment to shine.
        </p>
      </motion.div>

      {/* Accordion */}
      <div className="max-w-6xl mx-auto">
        <div
          className="flex gap-2 w-full"
          style={{ height: "clamp(400px, 60vh, 600px)" }}
        >
          {foodPhotos.map((photo, i) => {
            const isActive = activeIndex === i;

            return (
              <motion.div
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
                animate={{
                  flex: isActive ? 5 : 1,
                }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
                style={{ minWidth: 0 }}
              >
                {/* Photo */}
                <Image
                  src={photo.after}
                  alt={photo.restaurant}
                  fill
                  className="object-cover"
                  sizes={isActive ? "60vw" : "10vw"}
                />

                {/* Darkening overlay for inactive panels */}
                <motion.div
                  animate={{ opacity: isActive ? 0 : 0.5 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-black"
                />

                {/* Active border glow */}
                <motion.div
                  animate={{
                    opacity: isActive ? 1 : 0,
                    borderColor: isActive
                      ? "rgba(245, 158, 11, 0.2)"
                      : "rgba(63, 63, 70, 0.3)",
                  }}
                  className="absolute inset-0 rounded-2xl border-2 pointer-events-none z-10"
                />

                {/* Vertical label (for collapsed panels) */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center z-20"
                    >
                      <span
                        className="text-white/60 text-xs font-mono uppercase tracking-[0.3em] whitespace-nowrap"
                        style={{
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                        }}
                      >
                        {photo.restaurant}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded info */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 z-20"
                    >
                      <div className="flex items-end justify-between">
                        <div>
                          <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[9px] font-mono uppercase tracking-wider">
                            Enhanced
                          </span>
                          <h3 className="text-white text-xl font-bold mt-3">
                            {photo.restaurant}
                          </h3>
                          <p className="text-zinc-400 text-sm mt-1">
                            Enhanced by FoodShot AI
                          </p>
                        </div>
                        <div className="hidden md:block text-right">
                          <p className="text-amber-400 text-2xl font-bold">
                            +{140 + i * 23}%
                          </p>
                          <p className="text-zinc-600 text-[10px] font-mono uppercase">
                            Engagement
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Number badge */}
                <div className="absolute top-4 left-4 z-20">
                  <motion.div
                    animate={{
                      backgroundColor: isActive
                        ? "rgba(245, 158, 11, 0.1)"
                        : "rgba(0, 0, 0, 0.4)",
                      borderColor: isActive
                        ? "rgba(245, 158, 11, 0.3)"
                        : "rgba(63, 63, 70, 0.3)",
                    }}
                    className="w-8 h-8 rounded-full border flex items-center justify-center backdrop-blur-sm"
                  >
                    <span
                      className={`text-xs font-mono ${
                        isActive ? "text-amber-400" : "text-zinc-500"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-zinc-700 text-xs text-center mt-8 font-mono"
      >
        Hover to expand • 6 restaurants, one view
      </motion.p>
    </section>
  );
}
