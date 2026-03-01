"use client";

import { motion, useMotionValue, useTransform, MotionValue } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Spotlight" — Completely dark. A spotlight cone follows your cursor,
 * revealing photos hidden in the darkness. Only what's under the light is visible.
 * Like walking through a dark gallery with a flashlight.
 */

const gridPhotos = [
  foodPhotos[0],
  foodPhotos[3],
  foodPhotos[1],
  foodPhotos[2],
  foodPhotos[5],
  foodPhotos[4],
];

export function SpotlightBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [isActive, setIsActive] = useState(false);

  // Convert to percentages for the radial gradient
  const gradientX = useTransform(mouseX, [0, 1], [0, 100]);
  const gradientY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  return (
    <section className="relative w-full bg-[#030303] overflow-hidden px-6 md:px-12 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Find the{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            flavor
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Move your cursor to shine a light. The food is hiding in the dark — discover it.
        </p>
      </motion.div>

      {/* Spotlight container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden cursor-none"
        style={{ minHeight: 500 }}
      >
        {/* Photo grid underneath */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3">
          {gridPhotos.map((photo, i) => (
            <div
              key={i}
              className="relative rounded-xl overflow-hidden"
              style={{ aspectRatio: "3 / 4" }}
            >
              <Image
                src={photo.after}
                alt={photo.restaurant}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute bottom-3 left-3 z-10">
                <span className="text-white/80 text-xs font-medium">
                  {photo.restaurant}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Darkness overlay with spotlight hole */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: isActive
              ? `radial-gradient(circle 180px at ${gradientX.get()}% ${gradientY.get()}%, transparent 0%, rgba(3,3,3,0.85) 60%, rgba(3,3,3,0.97) 100%)`
              : "rgba(3,3,3,0.95)",
            transition: isActive ? "none" : "background 0.5s ease",
          }}
        >
          {/* We need to update this dynamically */}
        </motion.div>

        {/* Dynamic spotlight — uses a div that re-renders on mouse move */}
        <SpotlightOverlay
          mouseX={mouseX}
          mouseY={mouseY}
          isActive={isActive}
        />

        {/* Center prompt when not hovering */}
        {!isActive && (
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-amber-400"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <p className="text-zinc-500 text-sm">
                Hover to discover
              </p>
            </motion.div>
          </div>
        )}

        {/* Custom cursor */}
        {isActive && (
          <motion.div
            className="absolute z-40 pointer-events-none"
            style={{
              left: `calc(${mouseX.get() * 100}% - 8px)`,
              top: `calc(${mouseY.get() * 100}% - 8px)`,
              width: 16,
              height: 16,
            }}
          >
            <div className="w-full h-full rounded-full bg-amber-400/30 border border-amber-400/50" />
          </motion.div>
        )}
      </div>

      {/* Mobile note */}
      <p className="text-zinc-700 text-[10px] text-center mt-6 md:hidden font-mono">
        Best on desktop — hover for spotlight effect
      </p>
    </section>
  );
}

/** Separate component to handle reactive spotlight rendering */
function SpotlightOverlay({
  mouseX,
  mouseY,
  isActive,
}: {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  isActive: boolean;
}) {
  const percentX = useTransform(mouseX, [0, 1], [0, 100]);
  const percentY = useTransform(mouseY, [0, 1], [0, 100]);

  return (
    <motion.div
      className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
      style={{
        opacity: 1,
        background: useTransform(
          [percentX, percentY],
          ([x, y]: number[]) =>
            isActive
              ? `radial-gradient(circle 160px at ${x}% ${y}%, transparent 0%, rgba(3,3,3,0.8) 50%, rgba(3,3,3,0.97) 100%)`
              : "rgba(3,3,3,0.95)"
        ),
      }}
    />
  );
}
