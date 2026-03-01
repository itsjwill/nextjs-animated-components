"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

// Order by visual impact
const stackOrder = [
  { photo: foodPhotos[0], tagline: "Studio-quality steak & fries", stat: "+142% clicks" },
  { photo: foodPhotos[3], tagline: "Seafood that sells itself", stat: "+89% orders" },
  { photo: foodPhotos[1], tagline: "Sashimi that stops the scroll", stat: "+215% saves" },
  { photo: foodPhotos[2], tagline: "Comfort food, elevated", stat: "+167% visits" },
  { photo: foodPhotos[5], tagline: "Fine dining made irresistible", stat: "+94% shares" },
];

function StackCard({
  item,
  index,
  total,
  scrollYProgress,
}: {
  item: typeof stackOrder[0];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  // Each card occupies a segment of the scroll range
  const segmentSize = 1 / total;
  const start = index * segmentSize;
  const end = start + segmentSize;

  // Card scale: starts slightly smaller, grows to full, then stays
  const scale = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.3, end],
    [0.88, 1, 1]
  );

  // Card opacity: fades in, stays, then fades slightly for next
  const opacity = useTransform(
    scrollYProgress,
    index < total - 1
      ? [start, start + segmentSize * 0.2, end - segmentSize * 0.2, end]
      : [start, start + segmentSize * 0.2, 1, 1],
    index < total - 1 ? [0, 1, 1, 0.3] : [0, 1, 1, 1]
  );

  // Y position: slides up from below
  const y = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.3],
    [80, 0]
  );

  // Z-index based on which card should be on top
  const zIndex = useTransform(
    scrollYProgress,
    [start, end],
    [total - index, total - index]
  );

  // Rotation for a natural card-dealing feel
  const rotate = useTransform(
    scrollYProgress,
    [start, start + segmentSize * 0.3],
    [index % 2 === 0 ? 3 : -3, 0]
  );

  return (
    <motion.div
      style={{
        scale,
        opacity,
        y,
        zIndex,
        rotate,
      }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="w-full max-w-md mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/10 bg-zinc-900 shadow-2xl shadow-black/60" style={{ aspectRatio: "3 / 4" }}>
          <Image
            src={item.photo.after}
            alt={`${item.photo.restaurant} — Enhanced`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 448px"
            priority={index < 2}
          />

          {/* Bottom gradient */}
          <div className="absolute bottom-0 inset-x-0 h-2/5 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />

          {/* Card content */}
          <div className="absolute bottom-0 inset-x-0 p-7 z-20">
            <p className="text-amber-400/60 text-[10px] font-mono uppercase tracking-[0.2em] mb-2">
              {item.photo.restaurant}
            </p>
            <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-2">
              {item.tagline}
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-amber-400 text-lg font-bold">{item.stat}</span>
              <span className="text-zinc-600 text-[10px] font-mono">after FoodShot</span>
            </div>
          </div>

          {/* Card number chip */}
          <div className="absolute top-4 right-4 z-20">
            <span className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-amber-500/20 flex items-center justify-center text-amber-400 text-xs font-bold">
              {index + 1}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function CardStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Progress indicator
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#060606]"
      style={{ height: `${stackOrder.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Header */}
        <div className="absolute top-8 left-0 right-0 z-30 text-center px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            The{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              collection
            </span>
          </h2>
          <p className="text-zinc-600 text-sm mt-2">
            Scroll to deal the deck
          </p>
        </div>

        {/* Card area */}
        <div className="absolute inset-0 flex items-center justify-center px-6 pt-16">
          {stackOrder.map((item, i) => (
            <StackCard
              key={i}
              item={item}
              index={i}
              total={stackOrder.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Progress bar at bottom */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 z-30">
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full"
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-zinc-700 text-[8px] font-mono">1</span>
            <span className="text-zinc-700 text-[8px] font-mono">{stackOrder.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
