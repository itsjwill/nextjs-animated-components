"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { GradientText } from "@/components/text/gradient-text";
import { AnimatedNavLink } from "@/components/navigation";
import { ScrollProgress } from "@/components/scroll";

const GlowUpMachine = dynamic(
  () => import("@/components/foodshot/glow-up-machine").then((m) => m.GlowUpMachine),
  { ssr: false, loading: () => <SectionLoader label="Glow-Up Machine" /> }
);

const PortalDrop = dynamic(
  () => import("@/components/foodshot/portal-drop").then((m) => m.PortalDrop),
  { ssr: false, loading: () => <SectionLoader label="Portal Drop" /> }
);

const AssemblyLine = dynamic(
  () => import("@/components/foodshot/assembly-line").then((m) => m.AssemblyLine),
  { ssr: false, loading: () => <SectionLoader label="Assembly Line" /> }
);

const MoneyPlate = dynamic(
  () => import("@/components/foodshot/money-plate").then((m) => m.MoneyPlate),
  { ssr: false, loading: () => <SectionLoader label="Money Plate" /> }
);

const HeroDish = dynamic(
  () => import("@/components/foodshot/hero-dish").then((m) => m.HeroDish),
  { ssr: false, loading: () => <SectionLoader label="Hero Dish" /> }
);

const BeforeAfterTheater = dynamic(
  () => import("@/components/foodshot/before-after-theater").then((m) => m.BeforeAfterTheater),
  { ssr: false, loading: () => <SectionLoader label="Before & After Theater" /> }
);

function SectionLoader({ label }: { label: string }) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-zinc-500 text-sm">Loading {label}...</span>
      </div>
    </div>
  );
}

const concepts = [
  { id: "3a", label: "3A: Glow-Up", color: "from-violet-500 to-amber-500" },
  { id: "3b", label: "3B: Portal", color: "from-emerald-500 to-teal-500" },
  { id: "3c", label: "3C: Pipeline", color: "from-red-500 to-amber-500" },
  { id: "4a", label: "4A: Revenue", color: "from-amber-500 to-emerald-500" },
  { id: "4b", label: "4B: Hero", color: "from-orange-500 to-amber-500" },
  { id: "4c", label: "4C: Slider", color: "from-zinc-500 to-amber-500" },
];

export default function FoodShotShowcase() {
  return (
    <main className="relative bg-black text-white">
      <ScrollProgress />

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <GradientText gradient="from-amber-400 to-orange-500">
              FoodShot
            </GradientText>
          </Link>
          <div className="hidden md:flex items-center gap-2">
            {concepts.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="px-2.5 py-1 text-[10px] font-medium rounded-full border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600 transition-colors"
              >
                {c.label}
              </a>
            ))}
          </div>
          <AnimatedNavLink
            href="/demos"
            variant="underline"
            className="text-zinc-400"
          >
            ← All Demos
          </AnimatedNavLink>
        </div>
      </header>

      {/* Hero Intro */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/10 via-black to-black" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-4xl"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-medium rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-6">
            6 Hero Concepts — FoodShot Homepage
          </span>
          <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              FoodShot
            </span>
            <br />
            <span className="text-white text-4xl md:text-6xl">
              Homepage Hero Concepts
            </span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
            6 full-bleed hero sections showcasing real restaurant before/after photography.
            Scroll-driven animations, interactive sliders, and immersive food visuals.
          </p>

          {/* Concept grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
            {concepts.map((c, i) => (
              <motion.a
                key={c.id}
                href={`#${c.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`px-4 py-3 rounded-xl bg-gradient-to-r ${c.color} text-white text-sm font-medium hover:opacity-80 transition-opacity`}
              >
                {c.label}
              </motion.a>
            ))}
          </div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-12 text-zinc-600"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      {/* Pipeline Concepts (3A, 3B, 3C) */}
      <section className="relative">
        <div className="sticky top-16 z-40 py-3 px-6 bg-black/80 backdrop-blur-md border-b border-zinc-900">
          <div className="max-w-7xl mx-auto">
            <span className="text-zinc-600 text-xs uppercase tracking-wider">
              Series 3 — Phone-to-Studio Pipeline
            </span>
          </div>
        </div>

        <div id="3a">
          <GlowUpMachine />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

        <div id="3b">
          <PortalDrop />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

        <div id="3c">
          <AssemblyLine />
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      {/* Plate Concepts (4A, 4B, 4C) */}
      <section className="relative">
        <div className="sticky top-16 z-40 py-3 px-6 bg-black/80 backdrop-blur-md border-b border-zinc-900">
          <div className="max-w-7xl mx-auto">
            <span className="text-zinc-600 text-xs uppercase tracking-wider">
              Series 4 — The Plate That Sells
            </span>
          </div>
        </div>

        <div id="4a">
          <MoneyPlate />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

        <div id="4b">
          <HeroDish />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

        <div id="4c">
          <BeforeAfterTheater />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 mb-4">
            6 concepts, full-bleed food photography, scroll-driven animations, interactive sliders
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/demos/spline-worlds"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            >
              ← Spline Worlds
            </Link>
            <Link
              href="/demos"
              className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 rounded-lg text-zinc-300 hover:border-zinc-500 transition-colors"
            >
              All Demos
            </Link>
          </div>
          <p className="text-zinc-700 text-sm mt-8">
            Built with{" "}
            <GradientText gradient="from-amber-400 to-orange-400">
              Framer Motion + FoodShot
            </GradientText>
          </p>
        </div>
      </footer>
    </main>
  );
}
