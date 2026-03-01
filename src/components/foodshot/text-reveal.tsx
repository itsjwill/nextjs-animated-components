"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Reveal" — Giant text with food photos visible through the letters.
 * Uses CSS background-clip: text to show food imagery through massive typography.
 * As user scrolls, the text scales up and the photo behind shifts.
 */
export function TextReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.15]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 0, 0, 0.6]);

  // Rotate through top 3 photos as sections
  const photos = [foodPhotos[0], foodPhotos[3], foodPhotos[1]];

  return (
    <section ref={sectionRef} className="relative w-full bg-[#060606] overflow-hidden">
      {/* Main hero: FOOD text with photo showing through */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background photo — large, beautiful */}
        <motion.div style={{ y: photoY }} className="absolute inset-0 scale-110">
          <Image
            src={photos[0].after}
            alt="FoodShot Enhanced"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>

        {/* Dark overlay with text punched through */}
        <div className="absolute inset-0 z-10">
          {/* The "mask" — dark background with text knockout */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Dark panels around the text */}
            <div className="absolute inset-0 bg-[#060606]" />

            {/* Text with photo visible through it */}
            <motion.div style={{ scale: textScale }} className="relative z-20">
              <h2
                className="text-[18vw] md:text-[15vw] font-black leading-none tracking-tighter text-center select-none"
                style={{
                  backgroundImage: `url(${photos[0].after})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                FOOD
                <br />
                SHOT
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Scroll overlay for depth */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-[#060606] z-30 pointer-events-none"
        />

        {/* Subtitle at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="absolute bottom-12 left-0 right-0 z-40 text-center px-6"
        >
          <p className="text-zinc-500 text-sm">
            The photo you see through the text? That&apos;s a phone photo enhanced by FoodShot.
          </p>
        </motion.div>
      </div>

      {/* Three photo reveal strips */}
      <div className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Word with photo fill */}
              <div className="flex items-center gap-6 md:gap-10">
                <h3
                  className="text-[12vw] md:text-[8vw] font-black leading-none tracking-tighter select-none flex-shrink-0"
                  style={{
                    backgroundImage: `url(${photo.after})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {["TASTE", "CRAFT", "SERVE"][i]}
                </h3>
                <div className="flex-1">
                  <p className="text-amber-400/60 text-[10px] font-mono uppercase tracking-[0.2em] mb-1">
                    {photo.restaurant}
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {[
                      "Studio-quality food photography that makes every dish irresistible. No photographer needed.",
                      "AI that understands food — from lighting and color to composition and plating.",
                      "Photos ready for your menu, website, social media, and delivery apps in minutes.",
                    ][i]}
                  </p>
                </div>
              </div>

              {/* Thin photo strip below */}
              <div className="mt-6 relative w-full h-32 md:h-48 rounded-xl overflow-hidden">
                <Image
                  src={photo.after}
                  alt={photo.restaurant}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#060606] via-transparent to-[#060606]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
