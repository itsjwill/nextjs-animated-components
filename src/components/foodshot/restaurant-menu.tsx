"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

const menuItems = [
  {
    photo: foodPhotos[0],
    dish: "Herb-Crusted Ribeye",
    desc: "Pan-seared to perfection with truffle fries and wild arugula",
    stat: "+142%",
    statLabel: "More clicks",
  },
  {
    photo: foodPhotos[3],
    dish: "Seafood Linguine Fra Diavolo",
    desc: "Fresh mussels, shrimp, and clams in spicy San Marzano tomato sauce",
    stat: "+89%",
    statLabel: "More orders",
  },
  {
    photo: foodPhotos[1],
    dish: "Chef's Chirashi Bowl",
    desc: "Wild-caught sashimi medley over seasoned rice with ikura and micro greens",
    stat: "+215%",
    statLabel: "More saves",
  },
  {
    photo: foodPhotos[2],
    dish: "Birria con Arroz",
    desc: "Slow-braised beef in chile guajillo broth with pickled onion and crema",
    stat: "+167%",
    statLabel: "More visits",
  },
  {
    photo: foodPhotos[5],
    dish: "Burrata & Stone Fruit",
    desc: "Creamy burrata over heirloom peach tartare with aged balsamic and herbs",
    stat: "+94%",
    statLabel: "More shares",
  },
];

function MenuItem({ item, index }: { item: typeof menuItems[0]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-12 py-10`}
    >
      {/* Photo */}
      <div className="w-full md:w-[320px] flex-shrink-0">
        <div className="relative rounded-2xl overflow-hidden border border-amber-500/10 bg-zinc-900 shadow-xl shadow-black/30" style={{ aspectRatio: "3 / 4" }}>
          <Image
            src={item.photo.after}
            alt={item.dish}
            fill
            className="object-cover"
            sizes="320px"
          />
          {/* Warm glow */}
          <div className="absolute -inset-6 bg-amber-500/[0.03] blur-2xl rounded-3xl -z-10" />
        </div>
      </div>

      {/* Text */}
      <div className={`flex-1 ${isEven ? "md:text-left" : "md:text-right"} text-center`}>
        <p className="text-amber-400/60 text-[10px] font-mono uppercase tracking-[0.2em] mb-2">
          {item.photo.restaurant}
        </p>
        <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight mb-3">
          {item.dish}
        </h3>
        <p className="text-zinc-500 text-sm leading-relaxed mb-6 max-w-md mx-auto md:mx-0">
          {item.desc}
        </p>

        {/* Stat as "price" */}
        <div className={`inline-flex items-baseline gap-2 ${isEven ? "" : "md:flex-row-reverse"}`}>
          <span className="text-amber-400 text-4xl md:text-5xl font-bold tracking-tight">
            {item.stat}
          </span>
          <span className="text-zinc-600 text-xs font-mono uppercase tracking-wider">
            {item.statLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function RestaurantMenu() {
  return (
    <section className="relative w-full bg-[#0a0a0a] overflow-hidden px-6 md:px-12 py-24">
      {/* Decorative top border */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      {/* Header — styled like a menu header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-4 max-w-3xl mx-auto"
      >
        <p className="text-amber-400/50 text-[10px] font-mono uppercase tracking-[0.4em] mb-4">
          The FoodShot Menu
        </p>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          What&apos;s on the{" "}
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            table
          </span>
        </h2>
        <p className="text-zinc-500 text-base max-w-lg mx-auto">
          Every dish tells a story. Better photos tell it louder.
        </p>
      </motion.div>

      {/* Menu items */}
      <div className="max-w-4xl mx-auto">
        {menuItems.map((item, i) => (
          <div key={i}>
            <MenuItem item={item} index={i} />
            {i < menuItems.length - 1 && (
              <div className="h-px bg-gradient-to-r from-transparent via-zinc-800/60 to-transparent" />
            )}
          </div>
        ))}
      </div>

      {/* Bottom decorative border */}
      <div className="max-w-4xl mx-auto mt-16">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <p className="text-zinc-600 text-xs mb-5">
          These numbers are from real restaurants using FoodShot.
        </p>
        <button className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/20">
          Upgrade Your Menu Photos →
        </button>
      </motion.div>
    </section>
  );
}
