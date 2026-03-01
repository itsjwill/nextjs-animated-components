"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Mosaic" — Photo shatters into a grid of tiles.
 * As you scroll, the tiles fly in from random positions and assemble
 * into the complete photo. Like a puzzle solving itself.
 */

const GRID_COLS = 4;
const GRID_ROWS = 5;
const TOTAL_TILES = GRID_COLS * GRID_ROWS;

// Pre-generate random offsets for each tile (deterministic)
const tileOffsets = Array.from({ length: TOTAL_TILES }, (_, i) => ({
  x: ((i * 137) % 500) - 250,
  y: ((i * 89) % 400) - 200,
  rotate: ((i * 53) % 60) - 30,
  delay: (i % 5) * 0.05,
}));

function MosaicPhoto({
  photo,
  index,
}: {
  photo: typeof foodPhotos[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="max-w-md mx-auto">
        {/* Restaurant label */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.7, 0.9], [0, 1]),
            y: useTransform(scrollYProgress, [0.7, 0.9], [10, 0]),
          }}
          className="text-center mb-4"
        >
          <span className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono uppercase tracking-wider">
            {photo.restaurant}
          </span>
        </motion.div>

        {/* Tile grid */}
        <div
          className="relative rounded-2xl overflow-hidden border border-amber-500/10"
          style={{ aspectRatio: "3 / 4" }}
        >
          <div
            className="absolute inset-0 grid"
            style={{
              gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
              gap: 2,
            }}
          >
            {Array.from({ length: TOTAL_TILES }).map((_, tileIndex) => {
              const col = tileIndex % GRID_COLS;
              const row = Math.floor(tileIndex / GRID_COLS);
              const offset = tileOffsets[tileIndex];

              return (
                <MosaicTile
                  key={tileIndex}
                  photo={photo}
                  col={col}
                  row={row}
                  offset={offset}
                  scrollProgress={scrollYProgress}
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MosaicTile({
  photo,
  col,
  row,
  offset,
  scrollProgress,
}: {
  photo: typeof foodPhotos[0];
  col: number;
  row: number;
  offset: typeof tileOffsets[0];
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const tileStart = 0.1 + offset.delay;
  const tileEnd = Math.min(tileStart + 0.5, 0.85);

  const x = useTransform(scrollProgress, [tileStart, tileEnd], [offset.x, 0]);
  const y = useTransform(scrollProgress, [tileStart, tileEnd], [offset.y, 0]);
  const rotate = useTransform(scrollProgress, [tileStart, tileEnd], [offset.rotate, 0]);
  const opacity = useTransform(scrollProgress, [tileStart, tileStart + 0.15], [0, 1]);
  const scale = useTransform(scrollProgress, [tileStart, tileEnd], [0.6, 1]);

  return (
    <motion.div
      style={{ x, y, rotate, opacity, scale }}
      className="relative overflow-hidden rounded-sm"
    >
      <div
        className="absolute"
        style={{
          width: `${GRID_COLS * 100}%`,
          height: `${GRID_ROWS * 100}%`,
          left: `${-col * 100}%`,
          top: `${-row * 100}%`,
        }}
      >
        <Image
          src={photo.after}
          alt={photo.restaurant}
          fill
          className="object-cover"
          sizes="400px"
        />
      </div>
    </motion.div>
  );
}

export function MosaicGrid() {
  return (
    <section className="relative w-full bg-[#0a0a0a] overflow-hidden px-6 md:px-12 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Piece by{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            piece
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Watch each photo assemble itself as you scroll. Every tile clicks into place
          to reveal the complete transformation.
        </p>
      </motion.div>

      {/* Mosaic photos — one per section for scroll room */}
      <div className="space-y-32">
        {[foodPhotos[0], foodPhotos[3], foodPhotos[1]].map((photo, i) => (
          <MosaicPhoto key={i} photo={photo} index={i} />
        ))}
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-zinc-700 text-xs text-center mt-16 font-mono"
      >
        Scroll to assemble • 20 tiles per photo
      </motion.p>
    </section>
  );
}
