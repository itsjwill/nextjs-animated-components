"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { foodPhotos } from "./photo-data";

export function MoneyPlate() {
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhotoIdx((i) => (i + 1) % foodPhotos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const photo = foodPhotos[photoIdx];

  return (
    <section className="relative w-full min-h-screen bg-[#0a0a0a] overflow-hidden flex items-center">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 max-w-xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Your food photos
            <br />
            are{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              costing you
            </span>
            <br />
            customers.
          </h1>

          <p className="text-zinc-400 text-lg max-w-md mb-10 leading-relaxed">
            87% of diners check photos before choosing a restaurant.
            Bad photos = empty tables. We fix that — automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/20">
              See Your Photos Enhanced →
            </button>
            <button className="px-8 py-4 border border-zinc-700 text-zinc-300 font-medium rounded-xl hover:border-zinc-500 transition-colors">
              Watch Demo
            </button>
          </div>

          {/* Social proof */}
          <div className="flex gap-10">
            {[
              { value: "2,400+", label: "Restaurants" },
              { value: "1.2M", label: "Photos Enhanced" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-amber-400 text-2xl font-bold">{stat.value}</div>
                <div className="text-zinc-600 text-xs uppercase tracking-wider mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Photo showcase */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center"
        >
          <div className="relative w-full max-w-md">
            {/* Main "after" photo card */}
            <div
              className="relative w-full rounded-2xl overflow-hidden border border-amber-500/15 shadow-2xl shadow-black/50 bg-zinc-900"
              style={{ aspectRatio: "2 / 3" }}
            >
              {foodPhotos.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: photoIdx === i ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Image
                    src={p.after}
                    alt={p.restaurant}
                    fill
                    className="object-cover"
                    sizes="448px"
                    priority={i === 0}
                  />
                </motion.div>
              ))}

              {/* Restaurant name at bottom */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 z-10">
                <p className="text-white font-semibold text-lg">{photo.restaurant}</p>
                <p className="text-amber-400/80 text-xs font-mono uppercase tracking-wider mt-1">Enhanced by FoodShot</p>
              </div>

              {/* Warm glow behind card */}
              <div className="absolute -inset-8 bg-amber-500/5 blur-3xl rounded-3xl -z-10" />
            </div>

            {/* Small "before" thumbnail — top-left corner */}
            <div className="absolute -top-3 -left-3 z-20">
              <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-zinc-700 shadow-xl bg-zinc-900 relative">
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
                      className="object-cover brightness-[0.6] saturate-[0.3]"
                      sizes="96px"
                    />
                  </motion.div>
                ))}
                <div className="absolute inset-x-0 bottom-0 bg-black/80 px-2 py-1 z-10">
                  <span className="text-zinc-500 text-[8px] font-mono uppercase tracking-widest">Original</span>
                </div>
              </div>
            </div>

            {/* Photo dots */}
            <div className="flex gap-2 justify-center mt-6">
              {foodPhotos.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setPhotoIdx(i)}
                  className={`transition-all rounded-full ${
                    photoIdx === i
                      ? "w-8 h-2 bg-amber-500"
                      : "w-2 h-2 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                  title={p.restaurant}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
