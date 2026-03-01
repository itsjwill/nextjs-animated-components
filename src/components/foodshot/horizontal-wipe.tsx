"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Wipe" — Horizontal scroll-driven wipe.
 * As you scroll vertically, a horizontal strip of full-bleed transformations
 * wipes across the screen. Each photo transitions from before → after
 * as it crosses the center of the viewport.
 */

export function HorizontalWipe() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Horizontal translate: 0% to -((n-1)/n * 100)%
  const totalSlides = foodPhotos.length;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((totalSlides - 1) / totalSlides) * 100}%`]
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#060606]"
      style={{ height: `${totalSlides * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Header overlay */}
        <div className="absolute top-0 left-0 right-0 z-30 px-6 pt-20 pb-4 bg-gradient-to-b from-[#060606] via-[#060606]/80 to-transparent">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                The{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  wipe
                </span>
              </h2>
              <p className="text-zinc-500 text-sm mt-1">
                Scroll to wipe through every transformation
              </p>
            </div>
            <ProgressDots scrollProgress={scrollYProgress} total={totalSlides} />
          </div>
        </div>

        {/* Horizontal strip */}
        <motion.div
          style={{ x }}
          className="flex h-full"
          // width = totalSlides * 100vw
        >
          {foodPhotos.map((photo, i) => (
            <WipeSlide
              key={i}
              photo={photo}
              index={i}
              scrollProgress={scrollYProgress}
              totalSlides={totalSlides}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WipeSlide({
  photo,
  index,
  scrollProgress,
  totalSlides,
}: {
  photo: typeof foodPhotos[0];
  index: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  totalSlides: number;
}) {
  // Each slide occupies 1/totalSlides of the scroll
  const slideStart = index / totalSlides;
  const slideMid = (index + 0.5) / totalSlides;
  const slideEnd = (index + 1) / totalSlides;

  // Before → After wipe (clipPath from left to right)
  const clipPercent = useTransform(
    scrollProgress,
    [slideStart, slideMid],
    [100, 0]
  );

  // Text fade
  const textOpacity = useTransform(
    scrollProgress,
    [slideStart + 0.02, slideStart + 0.08, slideEnd - 0.08, slideEnd - 0.02],
    [0, 1, 1, 0]
  );

  return (
    <div className="relative flex-shrink-0 w-screen h-full">
      {/* After photo (base layer — full color) */}
      <Image
        src={photo.after}
        alt={`${photo.restaurant} — Enhanced`}
        fill
        className="object-cover"
        sizes="100vw"
      />

      {/* Before photo (overlay — clips away) */}
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: useTransform(
            clipPercent,
            (v) => `inset(0 0 0 ${100 - v}%)`
          ),
        }}
      >
        <Image
          src={photo.before}
          alt={`${photo.restaurant} — Original`}
          fill
          className="object-cover brightness-[0.5] saturate-[0.2]"
          sizes="100vw"
        />
        {/* "BEFORE" label */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 z-10">
          <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.3em] rotate-90 inline-block origin-center">
            Original
          </span>
        </div>
      </motion.div>

      {/* Wipe line */}
      <motion.div
        className="absolute top-0 bottom-0 w-px bg-amber-500/50 z-20"
        style={{
          left: useTransform(clipPercent, (v) => `${100 - v}%`),
          opacity: useTransform(clipPercent, [0, 5, 95, 100], [0, 1, 1, 0]),
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

      {/* Restaurant info */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute bottom-12 left-8 right-8 z-20"
      >
        <div className="flex items-end justify-between">
          <div>
            <span className="px-3 py-1 rounded-lg bg-amber-500/10 backdrop-blur-sm border border-amber-500/30 text-amber-400 text-[10px] font-mono uppercase tracking-wider">
              Enhanced by FoodShot
            </span>
            <h3 className="text-white text-3xl md:text-5xl font-bold mt-3 tracking-tight">
              {photo.restaurant}
            </h3>
          </div>
          <span className="text-zinc-600 text-lg font-mono">
            {String(index + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function ProgressDots({
  scrollProgress,
  total,
}: {
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) {
  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: total }).map((_, i) => (
        <ProgressDot key={i} index={i} total={total} scrollProgress={scrollProgress} />
      ))}
    </div>
  );
}

function ProgressDot({
  index,
  total,
  scrollProgress,
}: {
  index: number;
  total: number;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const isActive = useTransform(
    scrollProgress,
    [index / total, (index + 0.5) / total, (index + 1) / total],
    [0.3, 1, 0.3]
  );

  return (
    <motion.div
      style={{ opacity: isActive }}
      className="w-2 h-2 rounded-full bg-amber-400"
    />
  );
}
