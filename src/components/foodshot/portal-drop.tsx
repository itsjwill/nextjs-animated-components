"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function PortfolioCard({ photo }: { photo: typeof foodPhotos[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      <div className="relative rounded-2xl overflow-hidden border border-amber-500/10 bg-zinc-900/80 shadow-lg hover:shadow-xl hover:shadow-amber-900/10 transition-shadow duration-500"
        style={{ aspectRatio: "3 / 4" }}
      >
        {/* After photo (default) */}
        <Image
          src={photo.after}
          alt={`${photo.restaurant} — Enhanced`}
          fill
          className={`object-cover transition-all duration-600 ${
            isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Before photo (hover) */}
        <Image
          src={photo.before}
          alt={`${photo.restaurant} — Original`}
          fill
          className={`object-cover brightness-[0.7] saturate-[0.4] transition-all duration-600 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Hover label */}
        <div className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-400 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
          <span className="px-4 py-2 rounded-lg bg-black/60 backdrop-blur-sm border border-zinc-500/30 text-zinc-300 text-xs font-mono uppercase tracking-wider">
            See Original
          </span>
        </div>

        {/* Bottom name */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 z-10">
          <p className="text-white font-medium text-sm">{photo.restaurant}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function PortalDrop() {
  return (
    <section className="relative w-full bg-[#0a0a0a] overflow-hidden px-6 md:px-12 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Real restaurants.{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            Real transformations.
          </span>
        </h2>
        <p className="text-zinc-500 text-base">
          Hover to see the originals. Every photo enhanced by FoodShot AI.
        </p>
      </motion.div>

      {/* 3-column grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {foodPhotos.map((photo, i) => (
          <PortfolioCard key={i} photo={photo} />
        ))}
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto mt-16"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 px-8 py-6 rounded-2xl bg-zinc-900/60 backdrop-blur-sm border border-white/5">
          {[
            { value: "+127%", label: "Avg. Revenue Increase" },
            { value: "+340%", label: "More Google Clicks" },
            { value: "+89%", label: "Customer Conversion" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-amber-400 text-2xl font-bold">{stat.value}</div>
              <div className="text-zinc-600 text-[10px] uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <div className="text-center mt-10">
        <button className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/20">
          Get Your Photos Enhanced →
        </button>
      </div>
    </section>
  );
}
