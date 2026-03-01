"use client";

import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Scratch" — Lottery scratch card.
 * Each card has a silver scratch-off coating. Drag your mouse to scratch
 * and reveal the enhanced photo underneath. A progress bar shows how
 * much you've revealed. At 60%+ it auto-reveals the rest.
 */

const GRID_SIZE = 20; // 20x20 grid of scratch cells

export function ScratchCard() {
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
          Scratch to{" "}
          <span className="bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
            reveal
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Drag across the card to scratch off the surface. Find the dish hiding underneath.
        </p>
      </motion.div>

      {/* Scratch cards grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
        {foodPhotos.map((photo, i) => (
          <ScratchableCard key={i} photo={photo} index={i} />
        ))}
      </div>
    </section>
  );
}

function ScratchableCard({
  photo,
  index,
}: {
  photo: (typeof foodPhotos)[0];
  index: number;
}) {
  const [scratched, setScratched] = useState<Set<number>>(new Set());
  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalCells = GRID_SIZE * GRID_SIZE;
  const scratchPercent = (scratched.size / totalCells) * 100;

  const scratchAt = useCallback(
    (clientX: number, clientY: number) => {
      if (revealed || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.floor(((clientX - rect.left) / rect.width) * GRID_SIZE);
      const y = Math.floor(((clientY - rect.top) / rect.height) * GRID_SIZE);

      if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return;

      const cellIndex = y * GRID_SIZE + x;
      // Also scratch neighbors for a wider brush
      const neighbors = [
        cellIndex,
        cellIndex - 1,
        cellIndex + 1,
        cellIndex - GRID_SIZE,
        cellIndex + GRID_SIZE,
        cellIndex - GRID_SIZE - 1,
        cellIndex - GRID_SIZE + 1,
        cellIndex + GRID_SIZE - 1,
        cellIndex + GRID_SIZE + 1,
      ].filter((n) => n >= 0 && n < totalCells);

      setScratched((prev) => {
        const next = new Set(prev);
        neighbors.forEach((n) => next.add(n));

        // Auto-reveal at 55%
        if (next.size / totalCells > 0.55) {
          setTimeout(() => setRevealed(true), 300);
        }
        return next;
      });
    },
    [revealed, totalCells]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsScratching(true);
      scratchAt(e.clientX, e.clientY);
    },
    [scratchAt]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isScratching) return;
      scratchAt(e.clientX, e.clientY);
    },
    [isScratching, scratchAt]
  );

  const handlePointerUp = useCallback(() => {
    setIsScratching(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative rounded-xl overflow-hidden cursor-crosshair select-none touch-none"
        style={{ aspectRatio: "3 / 4" }}
      >
        {/* Photo underneath */}
        <Image
          src={photo.after}
          alt={photo.restaurant}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />

        {/* Scratch coating */}
        {!revealed && (
          <div className="absolute inset-0 z-10">
            {/* Silver scratch surface */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, #c0c0c0 0%, #a8a8a8 25%, #d4d4d4 50%, #b0b0b0 75%, #c8c8c8 100%)`,
              }}
            />
            {/* Scratched-away cells */}
            {Array.from(scratched).map((cellIndex) => {
              const col = cellIndex % GRID_SIZE;
              const row = Math.floor(cellIndex / GRID_SIZE);
              return (
                <div
                  key={cellIndex}
                  className="absolute bg-transparent"
                  style={{
                    left: `${(col / GRID_SIZE) * 100}%`,
                    top: `${(row / GRID_SIZE) * 100}%`,
                    width: `${100 / GRID_SIZE}%`,
                    height: `${100 / GRID_SIZE}%`,
                    background: "transparent",
                    boxShadow: "0 0 4px 2px rgba(0,0,0,0.1) inset",
                  }}
                >
                  {/* Punch through the silver — show image */}
                </div>
              );
            })}
            {/* Use clip-path to cut holes */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, #c0c0c0 0%, #a8a8a8 25%, #d4d4d4 50%, #b0b0b0 75%, #c8c8c8 100%)`,
                clipPath: generateClipPath(scratched, GRID_SIZE),
              }}
            />

            {/* Scratch prompt text */}
            {scratched.size === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-zinc-600 text-lg font-bold">SCRATCH HERE</p>
                  <p className="text-zinc-500 text-[10px] font-mono mt-1">
                    Drag to reveal
                  </p>
                </div>
              </div>
            )}

            {/* Decorative scratch card border pattern */}
            <div className="absolute inset-2 border-2 border-dashed border-zinc-400/30 rounded-lg pointer-events-none" />
          </div>
        )}

        {/* Revealed overlay */}
        {revealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10 pointer-events-none"
          >
            <div className="absolute bottom-4 left-4 right-4">
              <div className="px-4 py-3 rounded-xl bg-black/50 backdrop-blur-sm border border-amber-500/20">
                <p className="text-amber-400/60 text-[9px] font-mono uppercase tracking-wider">
                  Revealed
                </p>
                <p className="text-white text-lg font-bold">
                  {photo.restaurant}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mt-2 h-1 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full"
          animate={{ width: revealed ? "100%" : `${scratchPercent}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
      <p className="text-zinc-700 text-[10px] font-mono mt-1 text-center">
        {revealed ? "100%" : `${Math.round(scratchPercent)}%`} scratched
      </p>
    </motion.div>
  );
}

function generateClipPath(scratched: Set<number>, gridSize: number): string {
  if (scratched.size === 0) return "none";

  // Create a path that EXCLUDES scratched cells
  // We do this by creating the silver overlay with holes cut out
  const rects: string[] = [];
  scratched.forEach((cellIndex) => {
    const col = cellIndex % gridSize;
    const row = Math.floor(cellIndex / gridSize);
    const x1 = (col / gridSize) * 100;
    const y1 = (row / gridSize) * 100;
    const x2 = ((col + 1) / gridSize) * 100;
    const y2 = ((row + 1) / gridSize) * 100;
    // Each scratched cell is excluded using evenodd rule
    rects.push(`${x1}% ${y1}%, ${x2}% ${y1}%, ${x2}% ${y2}%, ${x1}% ${y2}%`);
  });

  // Use polygon with evenodd — outer boundary + inner holes
  // Simplified: just use transparency for scratched cells
  return `polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, ${rects.map((r) => r).join(", ")})`;
}
