"use client";

import { motion, useMotionValue, useSpring, animate, AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Roulette" — Game show prize wheel.
 * A large circular wheel divided into segments, each with a restaurant
 * photo. Spin it and watch it slow down to land on a winner.
 * Confetti burst when it stops. A pointer at the top indicates the selection.
 */

const SEGMENT_ANGLE = 360 / foodPhotos.length;

export function RouletteWheel() {
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { stiffness: 20, damping: 30 });
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSpin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setWinner(null);
    setShowConfetti(false);

    const extraSpins = 5 + Math.random() * 3; // 5-8 full rotations
    const targetSegment = Math.floor(Math.random() * foodPhotos.length);
    const targetAngle =
      rotation.get() +
      extraSpins * 360 +
      targetSegment * SEGMENT_ANGLE +
      SEGMENT_ANGLE / 2;

    animate(rotation, targetAngle, {
      duration: 4 + Math.random() * 2,
      ease: [0.12, 0.8, 0.3, 1],
      onComplete: () => {
        setSpinning(false);
        setWinner(targetSegment);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      },
    });
  }, [spinning, rotation]);

  return (
    <section className="relative w-full bg-[#0a0608] overflow-hidden px-6 py-24">
      {/* Confetti */}
      {showConfetti && <Confetti />}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 max-w-3xl mx-auto relative z-10"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Spin the{" "}
          <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
            wheel
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Every spin picks a winner. Will it be your favorite?
        </p>
      </motion.div>

      {/* Wheel container */}
      <div className="relative max-w-md mx-auto" style={{ aspectRatio: "1 / 1" }}>
        {/* Pointer at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-30">
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "12px solid transparent",
              borderRight: "12px solid transparent",
              borderTop: "20px solid #f43f5e",
              filter: "drop-shadow(0 2px 4px rgba(244,63,94,0.5))",
            }}
          />
        </div>

        {/* The wheel */}
        <motion.div
          style={{ rotate: smoothRotation }}
          className="relative w-full h-full rounded-full overflow-hidden border-4 border-zinc-700 shadow-2xl shadow-black/50"
        >
          {foodPhotos.map((photo, i) => {
            const startAngle = i * SEGMENT_ANGLE;
            return (
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(((startAngle - 90) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((startAngle - 90) * Math.PI) / 180)}%, ${50 + 50 * Math.cos(((startAngle + SEGMENT_ANGLE - 90) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((startAngle + SEGMENT_ANGLE - 90) * Math.PI) / 180)}%)`,
                }}
              >
                <Image
                  src={photo.after}
                  alt={photo.restaurant}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
                {/* Segment border */}
                <div className="absolute inset-0 border-r border-white/10" />
              </div>
            );
          })}

          {/* Center hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-zinc-900 border-2 border-zinc-600 flex items-center justify-center shadow-lg">
            <span className="text-rose-400 text-[9px] font-mono font-bold uppercase">
              Spin
            </span>
          </div>

          {/* Restaurant labels along the edge */}
          {foodPhotos.map((photo, i) => {
            const midAngle = (i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2 - 90) * (Math.PI / 180);
            const labelRadius = 38;
            return (
              <div
                key={`label-${i}`}
                className="absolute z-10 pointer-events-none"
                style={{
                  left: `${50 + labelRadius * Math.cos(midAngle)}%`,
                  top: `${50 + labelRadius * Math.sin(midAngle)}%`,
                  transform: `translate(-50%, -50%) rotate(${i * SEGMENT_ANGLE + SEGMENT_ANGLE / 2}deg)`,
                }}
              >
                <span className="text-white text-[7px] font-bold drop-shadow-lg whitespace-nowrap">
                  {photo.restaurant.slice(0, 8)}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* Outer ring glow */}
        <div className="absolute inset-[-4px] rounded-full border-2 border-rose-500/20 pointer-events-none" />
      </div>

      {/* Spin button */}
      <div className="flex justify-center mt-8">
        <motion.button
          onClick={handleSpin}
          whileTap={{ scale: 0.95 }}
          disabled={spinning}
          className={`px-10 py-4 rounded-full font-bold text-lg uppercase tracking-wider transition-all ${
            spinning
              ? "bg-zinc-800 text-zinc-600 cursor-not-allowed"
              : "bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:shadow-lg hover:shadow-rose-500/20 cursor-pointer"
          }`}
        >
          {spinning ? "Spinning..." : "Spin!"}
        </motion.button>
      </div>

      {/* Winner announcement */}
      <AnimatePresence>
        {winner !== null && !spinning && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center mt-8"
          >
            <p className="text-rose-400 text-sm font-mono uppercase tracking-wider mb-2">
              Winner!
            </p>
            <p className="text-white text-2xl font-bold">
              {foodPhotos[winner].restaurant}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Confetti() {
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1.5 + Math.random() * 2,
    size: 4 + Math.random() * 6,
    color: ["#f43f5e", "#f59e0b", "#10b981", "#3b82f6", "#a855f7"][i % 5],
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{
            y: "100vh",
            rotate: p.rotation + 360,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn",
          }}
          className="absolute"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
          }}
        />
      ))}
    </div>
  );
}
