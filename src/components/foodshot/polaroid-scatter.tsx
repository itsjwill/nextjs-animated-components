"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Polaroid" — Scattered instant photos that organize into a grid on scroll.
 * Photos start tossed across the surface at random angles and positions,
 * then smoothly fly into an organized grid as you scroll. Like cleaning
 * up a table full of Polaroids.
 */

const polaroidData = foodPhotos.map((photo, i) => ({
  photo,
  scatterX: [120, -180, 200, -140, 60, -200][i],
  scatterY: [80, -60, -120, 100, -40, 140][i],
  scatterRotate: [-18, 12, -8, 22, -14, 6][i],
  gridCol: i % 3,
  gridRow: Math.floor(i / 3),
}));

export function PolaroidScatter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] overflow-hidden px-6 py-24"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Scattered{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            memories
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Scroll to organize the chaos. Every photo finds its place.
        </p>
      </motion.div>

      {/* Polaroid field */}
      <div className="relative max-w-4xl mx-auto" style={{ height: 560 }}>
        {polaroidData.map((item, i) => (
          <PolaroidCard
            key={i}
            item={item}
            index={i}
            scrollProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* Shadow surface */}
      <div className="max-w-4xl mx-auto mt-4 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
    </section>
  );
}

function PolaroidCard({
  item,
  index,
  scrollProgress,
}: {
  item: (typeof polaroidData)[0];
  index: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Compute grid target position
  const gridX = item.gridCol * 280 - 280; // center the 3-col grid
  const gridY = item.gridRow * 340 - 170; // center the 2-row grid

  const x = useTransform(
    scrollProgress,
    [0.1, 0.5],
    [item.scatterX, gridX]
  );
  const y = useTransform(
    scrollProgress,
    [0.1, 0.5],
    [item.scatterY, gridY]
  );
  const rotate = useTransform(
    scrollProgress,
    [0.1, 0.5],
    [item.scatterRotate, 0]
  );
  const scale = useTransform(
    scrollProgress,
    [0.1, 0.3, 0.5],
    [0.85, 0.95, 1]
  );

  // Stagger z-index as they organize
  const zIndex = useTransform(
    scrollProgress,
    [0.1, 0.5],
    [6 - index, index + 1]
  );

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        scale,
        zIndex,
        position: "absolute",
        left: "50%",
        top: "50%",
        marginLeft: -120,
        marginTop: -160,
      }}
    >
      <div className="w-[240px] bg-white p-3 pb-12 rounded-sm shadow-2xl shadow-black/40">
        <div className="relative w-full" style={{ aspectRatio: "3 / 4" }}>
          <Image
            src={item.photo.after}
            alt={item.photo.restaurant}
            fill
            className="object-cover"
            sizes="240px"
          />
        </div>
        {/* Handwritten-style label */}
        <p className="absolute bottom-3 left-0 right-0 text-center text-zinc-600 text-xs italic font-serif">
          {item.photo.restaurant}
        </p>
      </div>
    </motion.div>
  );
}
