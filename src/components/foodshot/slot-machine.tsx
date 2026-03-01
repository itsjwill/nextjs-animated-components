"use client";

import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Slots" — Slot machine / fruit machine with food photos.
 * Three reels spin vertically. Pull the lever (click button) to spin.
 * When all three match, you get a "JACKPOT" animation. Each reel
 * shows restaurant photos instead of cherries and sevens.
 */

const ITEM_HEIGHT = 320;
const REEL_ITEMS = [...foodPhotos, ...foodPhotos, ...foodPhotos]; // Triple for smooth looping

function Reel({
  reelIndex,
  spinning,
  targetIndex,
  onComplete,
}: {
  reelIndex: number;
  spinning: boolean;
  targetIndex: number;
  onComplete: () => void;
}) {
  const y = useMotionValue(0);
  const prevSpinning = useRef(false);

  // When spinning starts, animate
  if (spinning && !prevSpinning.current) {
    prevSpinning.current = true;
    const totalSpin = -(foodPhotos.length * ITEM_HEIGHT * 2 + targetIndex * ITEM_HEIGHT);
    animate(y, totalSpin, {
      duration: 1.5 + reelIndex * 0.5,
      ease: [0.2, 0.8, 0.3, 1],
      onComplete: () => {
        // Reset position to avoid accumulating offset
        y.set(-targetIndex * ITEM_HEIGHT);
        prevSpinning.current = false;
        onComplete();
      },
    });
  }

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950"
      style={{ height: ITEM_HEIGHT, width: "100%" }}
    >
      <motion.div style={{ y }}>
        {REEL_ITEMS.map((photo, i) => (
          <div
            key={i}
            className="relative"
            style={{ height: ITEM_HEIGHT, width: "100%" }}
          >
            <Image
              src={photo.after}
              alt={photo.restaurant}
              fill
              className="object-cover"
              sizes="200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white text-xs font-semibold truncate">
                {photo.restaurant}
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Reel sheen */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-transparent to-black/30 z-10" />

      {/* Center line indicator */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="h-px bg-amber-500/30" />
      </div>
    </div>
  );
}

export function SlotMachine() {
  const [spinning, setSpinning] = useState(false);
  const [results, setResults] = useState([0, 2, 4]);
  const [jackpot, setJackpot] = useState(false);
  const completedReels = useRef(0);

  const handleSpin = useCallback(() => {
    if (spinning) return;
    setJackpot(false);
    completedReels.current = 0;

    // Random results — 15% chance of jackpot (all same)
    const isJackpot = Math.random() < 0.15;
    const base = Math.floor(Math.random() * foodPhotos.length);
    const newResults = isJackpot
      ? [base, base, base]
      : [
          Math.floor(Math.random() * foodPhotos.length),
          Math.floor(Math.random() * foodPhotos.length),
          Math.floor(Math.random() * foodPhotos.length),
        ];

    setResults(newResults);
    setSpinning(true);
  }, [spinning]);

  const handleReelComplete = useCallback(() => {
    completedReels.current += 1;
    if (completedReels.current >= 3) {
      setSpinning(false);
      // Check for jackpot
      if (
        results[0] === results[1] &&
        results[1] === results[2]
      ) {
        setJackpot(true);
      }
    }
  }, [results]);

  return (
    <section className="relative w-full bg-[#080606] overflow-hidden px-6 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Feeling{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
            lucky?
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Pull the lever. Match three for the jackpot.
        </p>
      </motion.div>

      {/* Slot machine body */}
      <div className="max-w-2xl mx-auto">
        {/* Machine frame */}
        <div className="relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
          {/* Jackpot lights */}
          <div className="flex justify-center gap-2 mb-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  backgroundColor: jackpot
                    ? ["#f59e0b", "#ef4444", "#f59e0b"]
                    : "#27272a",
                }}
                transition={{
                  duration: 0.3,
                  delay: jackpot ? i * 0.05 : 0,
                  repeat: jackpot ? Infinity : 0,
                }}
                className="w-3 h-3 rounded-full"
              />
            ))}
          </div>

          {/* Reels */}
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((reelIndex) => (
              <Reel
                key={reelIndex}
                reelIndex={reelIndex}
                spinning={spinning}
                targetIndex={results[reelIndex]}
                onComplete={handleReelComplete}
              />
            ))}
          </div>

          {/* Jackpot overlay */}
          <AnimatePresence>
            {jackpot && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
              >
                <motion.div
                  animate={{ rotate: [0, -3, 3, -3, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-500 shadow-2xl shadow-amber-500/30"
                >
                  <span className="text-black text-3xl md:text-5xl font-black tracking-wider">
                    JACKPOT!
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Spin button */}
          <div className="flex justify-center mt-6">
            <motion.button
              onClick={handleSpin}
              whileTap={{ scale: 0.95 }}
              disabled={spinning}
              className={`px-10 py-4 rounded-xl font-bold text-lg uppercase tracking-wider transition-all ${
                spinning
                  ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:shadow-lg hover:shadow-amber-500/20 cursor-pointer"
              }`}
            >
              {spinning ? "Spinning..." : "Spin"}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Credits */}
      <p className="text-zinc-700 text-xs text-center mt-6 font-mono">
        Enhanced by FoodShot AI
      </p>
    </section>
  );
}
