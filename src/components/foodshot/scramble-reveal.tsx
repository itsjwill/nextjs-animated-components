"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Scramble" — Glitched/scrambled effect that resolves into the photo.
 * Small squares of the photo are randomly placed, then slide into their
 * correct positions on scroll. Like digital noise becoming clarity.
 */

const BLOCK_SIZE = 40; // px per block
const COLS = 10;
const ROWS = 12;
const TOTAL_BLOCKS = COLS * ROWS;

function ScrambleCard({
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

  // Pre-generate scrambled positions (deterministic with photo index)
  const scrambledPositions = useMemo(() => {
    return Array.from({ length: TOTAL_BLOCKS }, (_, i) => {
      const seed = (i * 97 + index * 31) % 1000;
      return {
        // Random position offset
        offsetX: ((seed * 137) % 600) - 300,
        offsetY: ((seed * 89) % 400) - 200,
        // Random rotation
        rotation: ((seed * 53) % 40) - 20,
        // Stagger timing
        delay: (i / TOTAL_BLOCKS) * 0.4,
      };
    });
  }, [index]);

  return (
    <div ref={ref} className="relative">
      <div className="max-w-sm mx-auto">
        {/* Label */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.6, 0.8], [0, 1]),
          }}
          className="flex items-center justify-between mb-3 px-1"
        >
          <span className="text-white text-sm font-semibold">
            {photo.restaurant}
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] font-mono uppercase">
            Enhanced
          </span>
        </motion.div>

        {/* Scramble grid */}
        <div
          className="relative rounded-2xl overflow-hidden border border-zinc-800/50"
          style={{
            width: COLS * BLOCK_SIZE,
            height: ROWS * BLOCK_SIZE,
            maxWidth: "100%",
            aspectRatio: `${COLS} / ${ROWS}`,
          }}
        >
          {Array.from({ length: TOTAL_BLOCKS }).map((_, blockIndex) => (
            <ScrambleBlock
              key={blockIndex}
              photo={photo}
              blockIndex={blockIndex}
              scrambledPosition={scrambledPositions[blockIndex]}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ScrambleBlock({
  photo,
  blockIndex,
  scrambledPosition,
  scrollProgress,
}: {
  photo: typeof foodPhotos[0];
  blockIndex: number;
  scrambledPosition: { offsetX: number; offsetY: number; rotation: number; delay: number };
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const col = blockIndex % COLS;
  const row = Math.floor(blockIndex / COLS);

  const start = 0.1 + scrambledPosition.delay;
  const end = Math.min(start + 0.4, 0.85);

  const x = useTransform(scrollProgress, [start, end], [scrambledPosition.offsetX, 0]);
  const y = useTransform(scrollProgress, [start, end], [scrambledPosition.offsetY, 0]);
  const rotate = useTransform(scrollProgress, [start, end], [scrambledPosition.rotation, 0]);
  const opacity = useTransform(scrollProgress, [start, start + 0.1], [0, 1]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${(col / COLS) * 100}%`,
        top: `${(row / ROWS) * 100}%`,
        width: `${(1 / COLS) * 100}%`,
        height: `${(1 / ROWS) * 100}%`,
        x,
        y,
        rotate,
        opacity,
      }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="absolute"
          style={{
            width: `${COLS * 100}%`,
            height: `${ROWS * 100}%`,
            left: `${-col * 100}%`,
            top: `${-row * 100}%`,
          }}
        >
          <Image
            src={photo.after}
            alt=""
            fill
            className="object-cover"
            sizes="400px"
          />
        </div>
      </div>
    </motion.div>
  );
}

export function ScrambleReveal() {
  return (
    <section className="relative w-full bg-[#060606] overflow-hidden px-6 md:px-12 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          From noise to{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            clarity
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Scrambled pixels resolve into perfect food photography as you scroll.
          That&apos;s what FoodShot does to your photos.
        </p>
      </motion.div>

      {/* Scramble cards in a row */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {[foodPhotos[0], foodPhotos[3], foodPhotos[1], foodPhotos[2]].map(
          (photo, i) => (
            <ScrambleCard key={i} photo={photo} index={i} />
          )
        )}
      </div>

      {/* Bottom */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-zinc-700 text-xs text-center mt-16 font-mono"
      >
        {TOTAL_BLOCKS} blocks per photo • Scroll to resolve
      </motion.p>
    </section>
  );
}
