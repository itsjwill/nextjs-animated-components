"use client";

import { motion } from "framer-motion";
import { Suspense, lazy, useCallback } from "react";
import type { Application, SPEObject } from "@splinetool/runtime";

const Spline = lazy(() => import("@splinetool/react-spline"));

const NEXBOT_URL = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

// Warm food palette — transforms the tech robot into a food industry mascot
const FOOD_THEME = {
  body: "#1a0f08",    // Deep espresso brown
  accent: "#d4a574",  // Warm caramel
  glow: "#ff6b35",    // Sizzling orange
};

function recolorForFood(obj: SPEObject) {
  const name = (obj.name || "").toLowerCase();
  try {
    if (
      name.includes("eye") || name.includes("light") || name.includes("glow") ||
      name.includes("emit") || name.includes("visor") || name.includes("screen") ||
      name.includes("led")
    ) {
      obj.color = FOOD_THEME.glow;
    } else if (
      name.includes("accent") || name.includes("detail") || name.includes("stripe") ||
      name.includes("line") || name.includes("trim") || name.includes("button") ||
      name.includes("joint") || name.includes("antenna")
    ) {
      obj.color = FOOD_THEME.accent;
    } else if (
      name.includes("body") || name.includes("torso") || name.includes("arm") ||
      name.includes("leg") || name.includes("head") || name.includes("chest") ||
      name.includes("robot") || name.includes("main") || name.includes("hull") ||
      name.includes("shell") || name.includes("frame") || name.includes("base") ||
      name.includes("shoulder") || name.includes("hand") || name.includes("foot") ||
      name.includes("neck")
    ) {
      obj.color = FOOD_THEME.body;
    }
  } catch {
    // Some objects don't support color
  }
}

export function HeroDish() {
  const onLoad = useCallback((app: Application) => {
    try {
      const objects = app.getAllObjects();
      for (const obj of objects) {
        recolorForFood(obj);
      }
    } catch {
      // Silent fail
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Warm ambient glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-orange-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-900/10 blur-[80px]" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center min-h-screen">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 px-8 md:px-16 py-20 lg:py-0 flex flex-col justify-center"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white mb-6 w-fit">
            Concept 4B — The Hero Dish
          </span>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Your food photos
            <br />
            are{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              costing you
            </span>
            <br />
            customers.
          </h1>

          <p className="text-zinc-400 text-lg max-w-md mb-8 leading-relaxed">
            87% of diners check photos before choosing a restaurant.
            Bad photos = empty tables. We fix that — automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
              See Your Photos Enhanced →
            </button>
            <button className="px-8 py-3.5 border border-zinc-700 text-zinc-300 font-medium rounded-xl hover:border-zinc-500 transition-colors">
              Watch Demo
            </button>
          </div>

          <div className="flex gap-8 mt-10">
            {[
              { value: "2,400+", label: "Restaurants" },
              { value: "1.2M", label: "Photos Enhanced" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-amber-400 text-xl font-bold">{stat.value}</div>
                <div className="text-zinc-600 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Food-Themed Robot */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 relative min-h-[500px] lg:min-h-screen"
        >
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <Spline
              scene={NEXBOT_URL}
              className="w-full h-full absolute inset-0"
              onLoad={onLoad}
            />
          </Suspense>

          {/* Floating badges around the robot */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[15%] px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-amber-500/20"
          >
            <span className="text-amber-400 text-xs font-mono">AI-Powered</span>
          </motion.div>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[30%] left-[10%] px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-orange-500/20"
          >
            <span className="text-orange-400 text-xs font-mono">Studio Quality</span>
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-[40%] left-[5%] px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-emerald-500/20"
          >
            <span className="text-emerald-400 text-xs font-mono">+127% Revenue</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
