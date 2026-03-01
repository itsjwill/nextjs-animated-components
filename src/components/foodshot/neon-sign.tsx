"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Neon" — Late-night neon sign aesthetic.
 * Photos appear behind a dark glass window. Neon text glows and
 * flickers above them. Clicking a neon sign "turns it on" and
 * illuminates the photo beneath with warm colored light.
 */

const neonSigns = [
  { text: "OPEN", color: "#ff3366", photo: foodPhotos[0] },
  { text: "EAT", color: "#00ff88", photo: foodPhotos[1] },
  { text: "FRESH", color: "#3388ff", photo: foodPhotos[2] },
  { text: "HOT", color: "#ff6622", photo: foodPhotos[3] },
  { text: "BITE", color: "#cc44ff", photo: foodPhotos[4] },
  { text: "YUM", color: "#ffcc00", photo: foodPhotos[5] },
];

export function NeonSign() {
  return (
    <section className="relative w-full bg-[#0a0808] overflow-hidden px-6 py-24">
      {/* Brick wall texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 30px,
            rgba(255,255,255,0.05) 30px,
            rgba(255,255,255,0.05) 31px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 60px,
            rgba(255,255,255,0.03) 60px,
            rgba(255,255,255,0.03) 61px
          )`,
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-3xl mx-auto relative z-10"
      >
        <h2
          className="text-5xl md:text-8xl font-bold mb-4 tracking-tight"
          style={{
            color: "#ff3366",
            textShadow:
              "0 0 10px rgba(255,51,102,0.5), 0 0 40px rgba(255,51,102,0.3), 0 0 80px rgba(255,51,102,0.15)",
          }}
        >
          Late night
        </h2>
        <p className="text-zinc-600 text-base max-w-lg mx-auto">
          Click the signs to turn them on. The food lights up.
        </p>
      </motion.div>

      {/* Neon grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
        {neonSigns.map((sign, i) => (
          <NeonCard key={i} sign={sign} index={i} />
        ))}
      </div>
    </section>
  );
}

function NeonCard({
  sign,
  index,
}: {
  sign: (typeof neonSigns)[0];
  index: number;
}) {
  const [isOn, setIsOn] = useState(false);
  const [flicker, setFlicker] = useState(false);

  const handleClick = () => {
    // Flicker effect on toggle
    setFlicker(true);
    setTimeout(() => {
      setIsOn(!isOn);
      setFlicker(false);
    }, 200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={handleClick}
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      style={{ aspectRatio: "3 / 4" }}
    >
      {/* Photo underneath — dark until "turned on" */}
      <Image
        src={sign.photo.after}
        alt={sign.photo.restaurant}
        fill
        className="object-cover transition-all duration-700"
        sizes="(max-width: 768px) 50vw, 33vw"
        style={{
          filter: isOn
            ? "brightness(0.9) saturate(1.1)"
            : "brightness(0.15) saturate(0)",
        }}
      />

      {/* Dark glass overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: isOn
            ? `radial-gradient(circle at center, ${sign.color}10 0%, transparent 70%)`
            : "rgba(10,8,8,0.7)",
        }}
      />

      {/* Neon text */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <motion.span
          animate={{
            opacity: flicker ? [1, 0.2, 0.8, 0.1, 1] : isOn ? 1 : 0.4,
            textShadow: isOn
              ? [
                  `0 0 7px ${sign.color}, 0 0 20px ${sign.color}, 0 0 40px ${sign.color}80, 0 0 80px ${sign.color}40`,
                  `0 0 5px ${sign.color}, 0 0 15px ${sign.color}, 0 0 30px ${sign.color}60, 0 0 60px ${sign.color}30`,
                  `0 0 7px ${sign.color}, 0 0 20px ${sign.color}, 0 0 40px ${sign.color}80, 0 0 80px ${sign.color}40`,
                ]
              : `0 0 2px ${sign.color}40`,
          }}
          transition={{
            opacity: { duration: flicker ? 0.2 : 0.5 },
            textShadow: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="text-5xl md:text-7xl font-black tracking-wider select-none"
          style={{
            color: isOn ? sign.color : `${sign.color}60`,
            WebkitTextStroke: `1px ${sign.color}${isOn ? "" : "40"}`,
          }}
        >
          {sign.text}
        </motion.span>
      </div>

      {/* Restaurant name */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <motion.div
          animate={{ opacity: isOn ? 1 : 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-white/80 text-sm font-medium">
            {sign.photo.restaurant}
          </p>
          <p
            className="text-[10px] mt-0.5 font-mono uppercase tracking-wider"
            style={{ color: `${sign.color}80` }}
          >
            {isOn ? "Sign on" : "Tap to light up"}
          </p>
        </motion.div>
      </div>

      {/* Neon tube reflections on the glass */}
      {isOn && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `linear-gradient(180deg, ${sign.color}08 0%, transparent 30%, transparent 70%, ${sign.color}05 100%)`,
          }}
        />
      )}

      {/* Wire detail */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-6 bg-zinc-700/50 z-30" />
    </motion.div>
  );
}
