"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Split" — Giant words split horizontally through the middle.
 * Top half slides left, bottom half slides right as you scroll.
 * Between the two halves, a horizontal strip of food photos is revealed.
 * Like ripping a page apart to see what's hidden inside.
 */

const words = ["TASTE", "CRAVE", "SAVOR"];

export function SplitTypography() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#060606] overflow-hidden py-32"
    >
      {/* Multiple split word sections */}
      {words.map((word, wordIndex) => (
        <SplitWord
          key={wordIndex}
          word={word}
          photo={foodPhotos[wordIndex * 2]}
          photo2={foodPhotos[wordIndex * 2 + 1]}
          scrollProgress={scrollYProgress}
          index={wordIndex}
        />
      ))}
    </section>
  );
}

function SplitWord({
  word,
  photo,
  photo2,
  scrollProgress,
  index,
}: {
  word: string;
  photo: (typeof foodPhotos)[0];
  photo2: (typeof foodPhotos)[0];
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
}) {
  const sectionStart = index * 0.25;
  const sectionEnd = sectionStart + 0.4;

  // Top half slides left
  const topX = useTransform(
    scrollProgress,
    [sectionStart, sectionEnd],
    [0, -120]
  );

  // Bottom half slides right
  const bottomX = useTransform(
    scrollProgress,
    [sectionStart, sectionEnd],
    [0, 120]
  );

  // Gap between halves expands
  const gap = useTransform(
    scrollProgress,
    [sectionStart, sectionEnd],
    [0, 80]
  );

  // Photo strip opacity
  const photoOpacity = useTransform(
    scrollProgress,
    [sectionStart, sectionStart + 0.1, sectionEnd],
    [0, 1, 1]
  );

  return (
    <div className="relative mb-8 overflow-hidden">
      {/* Photo strip (revealed in the gap) */}
      <motion.div
        style={{ opacity: photoOpacity }}
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-20 z-0 flex"
      >
        <div className="flex-1 relative overflow-hidden">
          <Image
            src={photo.after}
            alt={photo.restaurant}
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
        <div className="flex-1 relative overflow-hidden">
          <Image
            src={photo2.after}
            alt={photo2.restaurant}
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
      </motion.div>

      {/* Top half of text */}
      <motion.div
        style={{ x: topX, marginBottom: gap }}
        className="relative z-10 overflow-hidden"
        // Clip to top half
      >
        <div
          className="text-[12vw] md:text-[10vw] font-black text-white leading-none tracking-tighter text-center select-none"
          style={{
            clipPath: "inset(0 0 50% 0)",
          }}
        >
          {word}
        </div>
      </motion.div>

      {/* Bottom half of text */}
      <motion.div
        style={{ x: bottomX }}
        className="relative z-10 overflow-hidden -mt-[6vw] md:-mt-[5vw]"
      >
        <div
          className="text-[12vw] md:text-[10vw] font-black text-white leading-none tracking-tighter text-center select-none"
          style={{
            clipPath: "inset(50% 0 0 0)",
          }}
        >
          {word}
        </div>
      </motion.div>

      {/* Restaurant names */}
      <motion.div
        style={{ opacity: photoOpacity }}
        className="flex justify-between px-6 md:px-16 mt-2"
      >
        <span className="text-amber-400/40 text-[10px] font-mono uppercase tracking-wider">
          {photo.restaurant}
        </span>
        <span className="text-amber-400/40 text-[10px] font-mono uppercase tracking-wider">
          {photo2.restaurant}
        </span>
      </motion.div>
    </div>
  );
}
