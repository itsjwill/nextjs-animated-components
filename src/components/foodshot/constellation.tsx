"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Constellation" — Photos as stars in a night sky.
 * Small thumbnail circles connected by thin lines form a constellation.
 * Hover a star to expand it into a full photo. The constellation
 * pulses gently like real stars twinkling.
 */

// Fixed positions for constellation nodes (percentage-based)
const starPositions = [
  { x: 15, y: 25 },
  { x: 45, y: 15 },
  { x: 75, y: 30 },
  { x: 30, y: 55 },
  { x: 60, y: 60 },
  { x: 85, y: 70 },
];

// Constellation lines (connections between stars by index)
const connections = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 4],
  [2, 5],
  [3, 4],
  [4, 5],
];

export function Constellation() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-[#030308] overflow-hidden px-6 py-24">
      {/* Star field background */}
      <StarField />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 max-w-3xl mx-auto relative z-10"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Food{" "}
          <span className="bg-gradient-to-r from-blue-300 to-indigo-400 bg-clip-text text-transparent">
            constellation
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Hover the stars to discover each restaurant
        </p>
      </motion.div>

      {/* Constellation map */}
      <div
        className="relative max-w-5xl mx-auto z-10"
        style={{ height: 500 }}
      >
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {connections.map(([from, to], i) => (
            <motion.line
              key={i}
              x1={`${starPositions[from].x}%`}
              y1={`${starPositions[from].y}%`}
              x2={`${starPositions[to].x}%`}
              y2={`${starPositions[to].y}%`}
              stroke={
                activeIndex === from || activeIndex === to
                  ? "rgba(147,197,253,0.4)"
                  : "rgba(147,197,253,0.1)"
              }
              strokeWidth={activeIndex === from || activeIndex === to ? 1.5 : 0.5}
              strokeDasharray="4 4"
              style={{ transition: "all 0.5s ease" }}
            />
          ))}
        </svg>

        {/* Star nodes */}
        {foodPhotos.map((photo, i) => (
          <StarNode
            key={i}
            photo={photo}
            index={i}
            position={starPositions[i]}
            isActive={activeIndex === i}
            onActivate={() => setActiveIndex(i)}
            onDeactivate={() => setActiveIndex(null)}
          />
        ))}
      </div>

      {/* Active photo detail */}
      <div className="max-w-xs mx-auto mt-8 h-16 relative z-10">
        {activeIndex !== null && (
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-white text-lg font-semibold">
              {foodPhotos[activeIndex].restaurant}
            </p>
            <p className="text-blue-300/50 text-[10px] font-mono uppercase tracking-wider mt-1">
              Star {activeIndex + 1} of {foodPhotos.length}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function StarNode({
  photo,
  index,
  position,
  isActive,
  onActivate,
  onDeactivate,
}: {
  photo: (typeof foodPhotos)[0];
  index: number;
  position: { x: number; y: number };
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const size = isActive ? 160 : 48;

  return (
    <motion.div
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      animate={{
        width: size,
        height: size,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="absolute z-10 cursor-pointer"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Outer glow */}
      <motion.div
        animate={{
          boxShadow: isActive
            ? "0 0 30px rgba(147,197,253,0.3), 0 0 60px rgba(147,197,253,0.1)"
            : "0 0 10px rgba(147,197,253,0.1)",
        }}
        className="w-full h-full rounded-full overflow-hidden border border-blue-300/20"
      >
        <Image
          src={photo.after}
          alt={photo.restaurant}
          fill
          className="object-cover rounded-full"
          sizes={isActive ? "160px" : "48px"}
        />
        {!isActive && (
          <div className="absolute inset-0 bg-blue-900/30" />
        )}
      </motion.div>

      {/* Twinkle animation (only when small) */}
      {!isActive && (
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{
            duration: 2 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-1 rounded-full bg-blue-300/10"
        />
      )}
    </motion.div>
  );
}

function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      x: (i * 37 + 13) % 100,
      y: (i * 53 + 7) % 100,
      size: ((i * 17) % 3) + 1,
      delay: (i * 0.3) % 4,
      duration: 2 + ((i * 0.7) % 3),
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.1, 0.6, 0.1] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
        />
      ))}
    </div>
  );
}
