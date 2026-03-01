"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

/**
 * "The Dial" — Retro CRT television with a channel dial.
 * Photos display on an old TV screen with scanlines, curvature,
 * and static between channels. Turn the channel knob to switch.
 * Classic TV power button to turn on/off.
 */

export function TvDial() {
  const [channel, setChannel] = useState(0);
  const [isStatic, setIsStatic] = useState(false);
  const [isPowered, setIsPowered] = useState(true);

  const changeChannel = useCallback(
    (direction: 1 | -1) => {
      if (!isPowered) return;
      setIsStatic(true);
      setTimeout(() => {
        setChannel(
          (prev) =>
            (prev + direction + foodPhotos.length) % foodPhotos.length
        );
        setTimeout(() => setIsStatic(false), 200);
      }, 300);
    },
    [isPowered]
  );

  const togglePower = useCallback(() => {
    setIsPowered((prev) => !prev);
  }, []);

  const photo = foodPhotos[channel];

  return (
    <section className="relative w-full bg-[#0c0a08] overflow-hidden px-6 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Change the{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
            channel
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Turn the dial. Each channel is a different restaurant.
        </p>
      </motion.div>

      {/* TV Set */}
      <div className="max-w-2xl mx-auto">
        <div className="relative bg-gradient-to-b from-[#3a3024] to-[#2a2018] rounded-[2rem] p-6 shadow-2xl shadow-black/50">
          {/* Wood grain texture */}
          <div
            className="absolute inset-0 rounded-[2rem] opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(139,90,43,0.15) 20px, rgba(139,90,43,0.15) 21px)",
            }}
          />

          <div className="flex gap-6 relative z-10">
            {/* Screen area */}
            <div className="flex-1">
              <div className="relative rounded-xl overflow-hidden bg-black" style={{ aspectRatio: "4 / 3" }}>
                {/* CRT curvature border */}
                <div className="absolute inset-0 z-30 pointer-events-none rounded-xl shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]" />

                {isPowered ? (
                  <>
                    {/* Photo / Static */}
                    <AnimatePresence mode="wait">
                      {isStatic ? (
                        <motion.div
                          key="static"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.1 }}
                          className="absolute inset-0 z-10"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                            filter: "contrast(3) brightness(2)",
                            mixBlendMode: "overlay",
                          }}
                        />
                      ) : (
                        <motion.div
                          key={channel}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={photo.after}
                            alt={photo.restaurant}
                            fill
                            className="object-cover"
                            sizes="560px"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* CRT scanlines */}
                    <div
                      className="absolute inset-0 z-20 pointer-events-none opacity-10"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.4) 1px, rgba(0,0,0,0.4) 2px)",
                      }}
                    />

                    {/* Channel number */}
                    <div className="absolute top-4 right-4 z-20">
                      <span
                        className="text-green-400 text-2xl font-bold font-mono"
                        style={{
                          textShadow: "0 0 10px rgba(74,222,128,0.5)",
                        }}
                      >
                        CH{String(channel + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Restaurant name bar */}
                    {!isStatic && (
                      <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/70 px-4 py-2">
                        <p className="text-green-300 text-sm font-mono">
                          {photo.restaurant}
                        </p>
                      </div>
                    )}

                    {/* Green CRT glow */}
                    <div className="absolute inset-0 z-10 bg-green-500/[0.03] pointer-events-none" />
                  </>
                ) : (
                  /* Powered off — black screen with tiny dot */
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
                    <motion.div
                      initial={{ width: "100%", height: "100%" }}
                      animate={{ width: 4, height: 4, borderRadius: "50%" }}
                      transition={{ duration: 0.5, ease: "easeIn" }}
                      className="bg-white/80"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Control panel */}
            <div className="flex flex-col items-center justify-between w-20 md:w-28 py-4">
              {/* Speaker grille */}
              <div className="w-full space-y-1.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-1 bg-zinc-700/50 rounded-full"
                  />
                ))}
              </div>

              {/* Channel knob */}
              <div className="my-6">
                <p className="text-zinc-600 text-[8px] font-mono uppercase tracking-wider text-center mb-2">
                  Channel
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => changeChannel(-1)}
                    className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors flex items-center justify-center text-lg"
                  >
                    -
                  </button>
                  <button
                    onClick={() => changeChannel(1)}
                    className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors flex items-center justify-center text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Power button */}
              <button
                onClick={togglePower}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-all ${
                    isPowered
                      ? "bg-red-500 border-red-400 shadow-lg shadow-red-500/30"
                      : "bg-zinc-800 border-zinc-700"
                  }`}
                />
                <span className="text-zinc-600 text-[8px] font-mono uppercase">
                  Power
                </span>
              </button>
            </div>
          </div>

          {/* TV feet */}
          <div className="flex justify-between px-12 mt-2">
            <div className="w-16 h-2 bg-[#2a2018] rounded-b-lg" />
            <div className="w-16 h-2 bg-[#2a2018] rounded-b-lg" />
          </div>
        </div>
      </div>

      {/* Channel guide */}
      <div className="max-w-2xl mx-auto mt-8 flex justify-center gap-2">
        {foodPhotos.map((p, i) => (
          <button
            key={i}
            onClick={() => {
              if (!isPowered) return;
              setIsStatic(true);
              setTimeout(() => {
                setChannel(i);
                setTimeout(() => setIsStatic(false), 200);
              }, 300);
            }}
            className={`px-3 py-1.5 rounded-lg font-mono text-[10px] transition-all ${
              i === channel
                ? "bg-green-500/10 border border-green-500/30 text-green-400"
                : "bg-zinc-900 border border-zinc-800 text-zinc-600 hover:text-zinc-400"
            }`}
          >
            CH{String(i + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
    </section>
  );
}
