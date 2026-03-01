"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { GradientText } from "@/components/text/gradient-text";
import { AnimatedNavLink } from "@/components/navigation";
import { ScrollProgress } from "@/components/scroll";

const TastingMenu = dynamic(
  () => import("@/components/foodshot/before-after-theater").then((m) => m.BeforeAfterTheater),
  { ssr: false, loading: () => <SectionLoader label="Tasting Menu" /> }
);

const TheProof = dynamic(
  () => import("@/components/foodshot/glow-up-machine").then((m) => m.GlowUpMachine),
  { ssr: false, loading: () => <SectionLoader label="The Proof" /> }
);

const TheSlider = dynamic(
  () => import("@/components/foodshot/hero-dish").then((m) => m.HeroDish),
  { ssr: false, loading: () => <SectionLoader label="The Slider" /> }
);

const TheProcess = dynamic(
  () => import("@/components/foodshot/assembly-line").then((m) => m.AssemblyLine),
  { ssr: false, loading: () => <SectionLoader label="The Process" /> }
);

const ThePitch = dynamic(
  () => import("@/components/foodshot/money-plate").then((m) => m.MoneyPlate),
  { ssr: false, loading: () => <SectionLoader label="The Pitch" /> }
);

const TheWall = dynamic(
  () => import("@/components/foodshot/portal-drop").then((m) => m.PortalDrop),
  { ssr: false, loading: () => <SectionLoader label="The Wall" /> }
);

function SectionLoader({ label }: { label: string }) {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-zinc-600 text-sm">Loading {label}...</span>
      </div>
    </div>
  );
}

const concepts = [
  { id: "tasting-menu", label: "Tasting Menu", desc: "Editorial Gallery" },
  { id: "the-proof", label: "The Proof", desc: "Side-by-Side" },
  { id: "the-slider", label: "The Slider", desc: "Interactive" },
  { id: "the-process", label: "The Process", desc: "Scroll Pipeline" },
  { id: "the-pitch", label: "The Pitch", desc: "Homepage Hero" },
  { id: "the-wall", label: "The Wall", desc: "Portfolio Grid" },
];

export default function FoodShotShowcase() {
  return (
    <main className="relative bg-[#0a0a0a] text-white">
      <ScrollProgress />

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <GradientText gradient="from-amber-400 to-orange-500">
              FoodShot
            </GradientText>
          </Link>
          <div className="hidden md:flex items-center gap-1.5">
            {concepts.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="px-3 py-1.5 text-[10px] font-medium rounded-full border border-zinc-800 text-zinc-500 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
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
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/5 via-[#0a0a0a] to-[#0a0a0a]" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-8">
            6 Hero Concepts for FoodShot
          </span>
          <h1 className="text-5xl md:text-8xl font-bold mb-6 leading-[1.05] tracking-tight">
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              FoodShot
            </span>
            <br />
            <span className="text-white text-3xl md:text-5xl font-medium">
              Homepage Hero Concepts
            </span>
          </h1>
          <p className="text-zinc-500 text-lg max-w-xl mx-auto mb-10">
            6 distinct visual experiences, each selling FoodShot from a unique angle.
            Real restaurant photos. No stock imagery.
          </p>

          {/* Concept pills */}
          <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
            {concepts.map((c, i) => (
              <motion.a
                key={c.id}
                href={`#${c.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/30 transition-colors group"
              >
                <span className="text-white text-sm font-medium">{c.label}</span>
                <span className="text-zinc-600 text-[10px] ml-2 group-hover:text-amber-400/60 transition-colors">{c.desc}</span>
              </motion.a>
            ))}
          </div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="mt-14 text-zinc-700"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Concepts */}
      <div className="space-y-0">
        <div id="tasting-menu">
          <TastingMenu />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-proof">
          <TheProof />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-slider">
          <TheSlider />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-process">
          <TheProcess />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-pitch">
          <ThePitch />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-wall">
          <TheWall />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-zinc-600 text-sm mb-6">
            6 concepts • Real restaurant photography • Contained images at proper resolution
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/demos/spline-worlds"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 hover:border-zinc-600 transition-colors text-sm"
            >
              ← Spline Worlds
            </Link>
            <Link
              href="/demos"
              className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-800 rounded-xl text-zinc-300 hover:border-zinc-600 transition-colors text-sm"
            >
              All Demos
            </Link>
          </div>
          <p className="text-zinc-800 text-xs mt-10">
            Built with{" "}
            <GradientText gradient="from-amber-400 to-orange-400">
              Framer Motion + FoodShot AI
            </GradientText>
          </p>
        </div>
      </footer>
    </main>
  );
}
