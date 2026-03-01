"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Marquee" — Infinite ticker tape.
 * Three rows scrolling at different speeds mixing photos, stats, and text.
 * Top row: photos scrolling right. Middle: stats/text scrolling left fast.
 * Bottom: photos scrolling right slow. CNN-style news ticker meets food.
 */

const stats = [
  "2,400+ Restaurants",
  "$4.2M Revenue Generated",
  "1.2M Photos Enhanced",
  "98% Satisfaction Rate",
  "30-Second Enhancement",
  "+127% More Orders",
  "+340% Google Clicks",
  "+89% Conversion Rate",
  "Zero Stock Photos",
  "AI-Powered Quality",
];

// Triple everything for seamless loops
const triplePhotos = [...foodPhotos, ...foodPhotos, ...foodPhotos];
const tripleStats = [...stats, ...stats, ...stats];

function PhotoTile({ photo }: { photo: typeof foodPhotos[0] }) {
  return (
    <div className="flex-shrink-0 w-[200px] md:w-[280px]">
      <div
        className="relative rounded-xl overflow-hidden border border-amber-500/10"
        style={{ aspectRatio: "4 / 5" }}
      >
        <Image
          src={photo.after}
          alt={photo.restaurant}
          fill
          className="object-cover"
          sizes="280px"
        />
        <div className="absolute bottom-2 left-2 z-10">
          <span className="px-2 py-0.5 rounded bg-black/50 backdrop-blur-sm text-white text-[9px] font-medium">
            {photo.restaurant}
          </span>
        </div>
      </div>
    </div>
  );
}

export function MarqueeTicker() {
  const photoWidth = 300; // 280px + gap
  const topRowDuration = 35;
  const bottomRowDuration = 45;

  return (
    <section className="relative w-full bg-[#060606] overflow-hidden py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 px-6 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          The numbers{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            speak
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          A never-ending stream of proof. Photos, stats, results — all scrolling by.
        </p>
      </motion.div>

      {/* Row 1: Photos scrolling RIGHT */}
      <div className="relative mb-4 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#060606] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#060606] to-transparent z-10" />
        <motion.div
          animate={{ x: [0, -(photoWidth * foodPhotos.length)] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: topRowDuration, ease: "linear" },
          }}
          className="flex gap-5 w-fit"
        >
          {triplePhotos.map((photo, i) => (
            <PhotoTile key={`top-${i}`} photo={photo} />
          ))}
        </motion.div>
      </div>

      {/* Row 2: Stats ticker scrolling LEFT (fast) */}
      <div className="relative mb-4 overflow-hidden py-4">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#060606] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#060606] to-transparent z-10" />
        <motion.div
          animate={{ x: [-(200 * stats.length), 0] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" },
          }}
          className="flex gap-6 w-fit items-center"
        >
          {tripleStats.map((stat, i) => (
            <div key={`stat-${i}`} className="flex-shrink-0 flex items-center gap-4">
              <span className="text-amber-400 text-sm md:text-base font-bold whitespace-nowrap">
                {stat}
              </span>
              <span className="text-amber-500/20 text-lg">◆</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Row 3: Photos scrolling RIGHT (slower, offset) */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#060606] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#060606] to-transparent z-10" />
        <motion.div
          animate={{ x: [-(photoWidth * foodPhotos.length), 0] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: bottomRowDuration, ease: "linear" },
          }}
          className="flex gap-5 w-fit"
        >
          {triplePhotos.map((photo, i) => (
            <PhotoTile key={`bot-${i}`} photo={photo} />
          ))}
        </motion.div>
      </div>

      {/* Bottom tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-zinc-600 text-xs text-center mt-10 px-6 font-mono"
      >
        ∞ The proof never stops scrolling
      </motion.p>
    </section>
  );
}
