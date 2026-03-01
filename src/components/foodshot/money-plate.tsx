"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

export function MoneyPlate() {
  const [counter, setCounter] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((c) => c + Math.floor(Math.random() * 3 + 1));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhotoIdx((i) => (i + 1) % foodPhotos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const photo = foodPhotos[photoIdx];

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Full-bleed AFTER photo as background */}
      {foodPhotos.map((p, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: photoIdx === i ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={p.after}
            alt={p.restaurant}
            fill
            className="object-cover"
            sizes="100vw"
            priority={i === 0}
          />
        </motion.div>
      ))}

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40 z-10" />

      {/* Small before photo — top-right corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="absolute top-6 right-6 z-30"
      >
        <div className="w-48 h-48 rounded-xl overflow-hidden border-2 border-zinc-700 shadow-2xl relative">
          {foodPhotos.map((p, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: photoIdx === i ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={p.before}
                alt={`${p.restaurant} original`}
                fill
                className="object-cover brightness-75 saturate-50"
                sizes="192px"
              />
            </motion.div>
          ))}
          <div className="absolute bottom-0 inset-x-0 bg-black/70 backdrop-blur-sm px-3 py-2 z-10">
            <span className="text-zinc-500 text-[10px] font-mono uppercase">Original</span>
          </div>
        </div>
      </motion.div>

      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end px-8 md:px-16 pb-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-3 drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
            Better photos.{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent">
              More revenue.
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-lg">
            Every photo we enhance generates real, trackable revenue for your restaurant.
          </p>
        </motion.div>

        {/* Bottom row: Revenue counter + Stats */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          {/* Revenue counter — bottom-left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="px-6 py-4 rounded-xl bg-black/60 backdrop-blur-md border border-emerald-500/20">
              <div className="text-emerald-400 text-3xl md:text-4xl font-bold font-mono">
                +${counter.toLocaleString()}
              </div>
              <div className="text-zinc-500 text-xs uppercase tracking-wider mt-1">
                Revenue generated from enhanced photos
              </div>
              <div className="text-zinc-600 text-[10px] mt-1">{photo.restaurant}</div>
            </div>
          </motion.div>

          {/* 2x2 stat cards — bottom-right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3"
          >
            {[
              { value: "+127%", label: "Avg. Revenue Increase" },
              { value: "+340%", label: "More Google Clicks" },
              { value: "+89%", label: "Customer Conversion" },
              { value: "2,400+", label: "Restaurants Served" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="px-4 py-3 rounded-xl bg-black/50 backdrop-blur-md border border-white/10"
              >
                <div className="text-amber-400 text-xl font-bold">{stat.value}</div>
                <div className="text-zinc-500 text-[10px] uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Restaurant indicator dots */}
        <div className="flex gap-2 mt-6">
          {foodPhotos.map((p, i) => (
            <button
              key={i}
              onClick={() => setPhotoIdx(i)}
              className={`transition-all ${
                photoIdx === i
                  ? "w-8 h-2 rounded-full bg-amber-500"
                  : "w-2 h-2 rounded-full bg-white/20 hover:bg-white/40"
              }`}
              title={p.restaurant}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
