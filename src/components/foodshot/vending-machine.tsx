"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Vending" — Vending machine interface.
 * Photos displayed behind glass in a grid. Press a button (A1, A2, B1, etc.)
 * and the item drops with a satisfying thunk animation. The dispensed
 * photo lands in the pickup tray at the bottom.
 */

const gridLabels = ["A1", "A2", "A3", "B1", "B2", "B3"];

export function VendingMachine() {
  const [dispensing, setDispensing] = useState<number | null>(null);
  const [dispensed, setDispensed] = useState<number | null>(null);
  const [selectedCode, setSelectedCode] = useState("");

  const handleDispense = useCallback(
    (index: number) => {
      if (dispensing !== null) return;
      setSelectedCode(gridLabels[index]);
      setDispensing(index);

      // Item falls after a beat
      setTimeout(() => {
        setDispensed(index);
        setTimeout(() => {
          setDispensing(null);
        }, 1500);
      }, 800);
    },
    [dispensing]
  );

  return (
    <section className="relative w-full bg-[#080808] overflow-hidden px-6 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Make your{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            selection
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Press a button. Watch it drop. Grab your food.
        </p>
      </motion.div>

      {/* Vending Machine */}
      <div className="max-w-md mx-auto">
        <div className="relative bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-2xl border border-zinc-700 shadow-2xl overflow-hidden">
          {/* Top label */}
          <div className="bg-emerald-600 py-2 px-4 text-center">
            <span className="text-white text-sm font-bold tracking-wider uppercase">
              FoodShot Delights
            </span>
          </div>

          {/* Glass display area */}
          <div className="relative p-4 min-h-[400px]">
            {/* Glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.01] pointer-events-none z-20" />

            {/* Product grid */}
            <div className="grid grid-cols-3 gap-3 relative z-10">
              {foodPhotos.map((photo, i) => (
                <motion.div
                  key={i}
                  className="relative"
                  animate={
                    dispensing === i
                      ? {
                          y: [0, -10, 300],
                          opacity: [1, 1, 0],
                          rotateZ: [0, 0, 5],
                        }
                      : { y: 0, opacity: 1 }
                  }
                  transition={
                    dispensing === i
                      ? {
                          duration: 0.8,
                          times: [0, 0.2, 1],
                          ease: [0.2, 0, 0.8, 1],
                        }
                      : { duration: 0.3 }
                  }
                >
                  <button
                    onClick={() => handleDispense(i)}
                    disabled={dispensing !== null}
                    className="w-full relative rounded-lg overflow-hidden border border-zinc-700/50 group cursor-pointer disabled:cursor-not-allowed"
                    style={{ aspectRatio: "3 / 4" }}
                  >
                    <Image
                      src={photo.after}
                      alt={photo.restaurant}
                      fill
                      className="object-cover"
                      sizes="140px"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-colors z-10" />
                  </button>

                  {/* Item code */}
                  <div className="absolute -top-1 -left-1 z-30 px-1.5 py-0.5 bg-zinc-900 border border-zinc-700 rounded text-[8px] font-mono text-emerald-400 font-bold">
                    {gridLabels[i]}
                  </div>

                  {/* Price tag */}
                  <div className="mt-1 text-center">
                    <span className="text-zinc-500 text-[9px] font-mono">
                      {photo.restaurant.slice(0, 12)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Shelf dividers */}
            <div className="absolute left-0 right-0 top-[52%] h-px bg-zinc-700/30 z-0" />
          </div>

          {/* Dispensing display */}
          <div className="bg-zinc-950 border-t border-zinc-700 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-400 text-xs font-mono">
                  {dispensing !== null
                    ? `DISPENSING ${selectedCode}...`
                    : "SELECT ITEM"}
                </span>
              </div>
              <span className="text-zinc-600 text-[10px] font-mono">
                {selectedCode || "---"}
              </span>
            </div>
          </div>

          {/* Pickup tray */}
          <div className="bg-zinc-950 border-t border-zinc-800 p-3 min-h-[100px] relative">
            <div className="absolute inset-x-3 top-0 h-px bg-zinc-800" />

            <AnimatePresence>
              {dispensed !== null && (
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                  className="relative rounded-lg overflow-hidden border border-emerald-500/20"
                  style={{ height: 80 }}
                >
                  <Image
                    src={foodPhotos[dispensed].after}
                    alt={foodPhotos[dispensed].restaurant}
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center px-3">
                    <div>
                      <p className="text-emerald-400 text-[8px] font-mono uppercase">
                        Dispensed
                      </p>
                      <p className="text-white text-sm font-bold">
                        {foodPhotos[dispensed].restaurant}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {dispensed === null && (
              <div className="flex items-center justify-center h-[80px]">
                <p className="text-zinc-700 text-xs font-mono">
                  Pickup tray empty
                </p>
              </div>
            )}

            {/* Tray flap */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-zinc-900 border-t border-zinc-800 rounded-b-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
