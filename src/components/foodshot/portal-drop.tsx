"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

const photo = foodPhotos[1]; // Tokyo Hana

export function PortalDrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Clip circle shrinks to reveal the after photo underneath
  const clipRadius = useTransform(scrollYProgress, [0, 0.4, 0.7], [100, 50, 0]);
  const afterOpacity = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const captionOpacity1 = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const captionOpacity2 = useTransform(scrollYProgress, [0.3, 0.45, 0.6, 0.75], [0, 1, 1, 0]);
  const captionOpacity3 = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: "250vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* BEFORE photo — full viewport, gets clipped away */}
        <motion.div
          className="absolute inset-0"
          style={{
            clipPath: useTransform(clipRadius, (r) =>
              `circle(${r}% at 50% 50%)`
            ),
          }}
        >
          <Image
            src={photo.before}
            alt={`${photo.restaurant} — Original`}
            fill
            className="object-cover brightness-[0.7] saturate-[0.4]"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>

        {/* AFTER photo — revealed underneath as circle shrinks */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: afterOpacity }}
        >
          <Image
            src={photo.after}
            alt={`${photo.restaurant} — Enhanced`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>

        {/* Stage 1 caption: Start */}
        <motion.div
          style={{ opacity: captionOpacity1 }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        >
          <div className="text-center">
            <h2 className="text-4xl md:text-7xl font-bold text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.8)]">
              Drop your photo.
            </h2>
            <p className="text-zinc-400 text-lg mt-3 drop-shadow-lg">
              {photo.restaurant} — scroll to transform
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8 text-zinc-500"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Stage 2 caption: Processing */}
        <motion.div
          style={{ opacity: captionOpacity2 }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="px-8 py-4 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-500/30"
          >
            <span className="text-amber-400 text-lg font-mono tracking-wider">ENHANCING...</span>
          </motion.div>
        </motion.div>

        {/* Stage 3 caption: Result */}
        <motion.div
          style={{ opacity: captionOpacity3 }}
          className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
        >
          <div className="bg-black/50 backdrop-blur-xl border-t border-white/10 px-6 py-6">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-2">
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Watch the magic.
                </span>
              </h3>
              <p className="text-amber-400 text-sm font-medium">
                {photo.restaurant} — Studio quality in seconds
              </p>
            </div>
          </div>
        </motion.div>

        {/* Before/After corner badges */}
        <div className="absolute top-6 left-6 z-30">
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]) }}
            className="px-4 py-2 rounded-lg bg-black/50 backdrop-blur-md border border-zinc-500/30"
          >
            <span className="text-zinc-300 text-sm font-bold uppercase tracking-wider">Original</span>
          </motion.div>
        </div>
        <div className="absolute top-6 right-6 z-30">
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0.7, 0.85], [0, 1]) }}
            className="px-4 py-2 rounded-lg bg-black/50 backdrop-blur-md border border-amber-500/30"
          >
            <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">Enhanced</span>
          </motion.div>
        </div>

        {/* Scroll progress bar */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 z-30">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 origin-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
