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

const TheSpotlight = dynamic(
  () => import("@/components/foodshot/spotlight-carousel").then((m) => m.SpotlightCarousel),
  { ssr: false, loading: () => <SectionLoader label="The Spotlight" /> }
);

const TheSplitScreen = dynamic(
  () => import("@/components/foodshot/split-screen").then((m) => m.SplitScreen),
  { ssr: false, loading: () => <SectionLoader label="Split Screen" /> }
);

const TheLens = dynamic(
  () => import("@/components/foodshot/magic-lens").then((m) => m.MagicLens),
  { ssr: false, loading: () => <SectionLoader label="The Lens" /> }
);

const TheMenu = dynamic(
  () => import("@/components/foodshot/restaurant-menu").then((m) => m.RestaurantMenu),
  { ssr: false, loading: () => <SectionLoader label="The Menu" /> }
);

const TheStack = dynamic(
  () => import("@/components/foodshot/card-stack").then((m) => m.CardStack),
  { ssr: false, loading: () => <SectionLoader label="The Stack" /> }
);

const TheReveal = dynamic(
  () => import("@/components/foodshot/text-reveal").then((m) => m.TextReveal),
  { ssr: false, loading: () => <SectionLoader label="The Reveal" /> }
);

const TheTilt = dynamic(
  () => import("@/components/foodshot/tilt-card").then((m) => m.TiltCard),
  { ssr: false, loading: () => <SectionLoader label="The Tilt" /> }
);

const TheFilmstrip = dynamic(
  () => import("@/components/foodshot/filmstrip").then((m) => m.Filmstrip),
  { ssr: false, loading: () => <SectionLoader label="The Filmstrip" /> }
);

const TheCounter = dynamic(
  () => import("@/components/foodshot/revenue-counter").then((m) => m.RevenueCounter),
  { ssr: false, loading: () => <SectionLoader label="The Counter" /> }
);

const TheMorph = dynamic(
  () => import("@/components/foodshot/morph-photo").then((m) => m.MorphPhoto),
  { ssr: false, loading: () => <SectionLoader label="The Morph" /> }
);

const TheOrbit = dynamic(
  () => import("@/components/foodshot/orbit-carousel").then((m) => m.OrbitCarousel),
  { ssr: false, loading: () => <SectionLoader label="The Orbit" /> }
);

const TheCurtain = dynamic(
  () => import("@/components/foodshot/curtain-reveal").then((m) => m.CurtainReveal),
  { ssr: false, loading: () => <SectionLoader label="The Curtain" /> }
);

const TheFlip = dynamic(
  () => import("@/components/foodshot/flip-card").then((m) => m.FlipCard),
  { ssr: false, loading: () => <SectionLoader label="The Flip" /> }
);

const TheAccordion = dynamic(
  () => import("@/components/foodshot/accordion-panels").then((m) => m.AccordionPanels),
  { ssr: false, loading: () => <SectionLoader label="The Accordion" /> }
);

const TheSpotlightBeam = dynamic(
  () => import("@/components/foodshot/spotlight-beam").then((m) => m.SpotlightBeam),
  { ssr: false, loading: () => <SectionLoader label="The Spotlight" /> }
);

const TheMosaic = dynamic(
  () => import("@/components/foodshot/mosaic-grid").then((m) => m.MosaicGrid),
  { ssr: false, loading: () => <SectionLoader label="The Mosaic" /> }
);

const TheScramble = dynamic(
  () => import("@/components/foodshot/scramble-reveal").then((m) => m.ScrambleReveal),
  { ssr: false, loading: () => <SectionLoader label="The Scramble" /> }
);

const TheGravity = dynamic(
  () => import("@/components/foodshot/gravity-drop").then((m) => m.GravityDrop),
  { ssr: false, loading: () => <SectionLoader label="The Gravity" /> }
);

const TheWipe = dynamic(
  () => import("@/components/foodshot/horizontal-wipe").then((m) => m.HorizontalWipe),
  { ssr: false, loading: () => <SectionLoader label="The Wipe" /> }
);

const TheMirror = dynamic(
  () => import("@/components/foodshot/mirror-text").then((m) => m.MirrorText),
  { ssr: false, loading: () => <SectionLoader label="The Mirror" /> }
);

const ThePulse = dynamic(
  () => import("@/components/foodshot/pulse-grid").then((m) => m.PulseGrid),
  { ssr: false, loading: () => <SectionLoader label="The Pulse" /> }
);

const TheMarquee = dynamic(
  () => import("@/components/foodshot/marquee-ticker").then((m) => m.MarqueeTicker),
  { ssr: false, loading: () => <SectionLoader label="The Marquee" /> }
);

const TheZoom = dynamic(
  () => import("@/components/foodshot/infinite-zoom").then((m) => m.InfiniteZoom),
  { ssr: false, loading: () => <SectionLoader label="The Zoom" /> }
);

const ThePolaroid = dynamic(
  () => import("@/components/foodshot/polaroid-scatter").then((m) => m.PolaroidScatter),
  { ssr: false, loading: () => <SectionLoader label="The Polaroid" /> }
);

const TheGlitch = dynamic(
  () => import("@/components/foodshot/glitch-reveal").then((m) => m.GlitchReveal),
  { ssr: false, loading: () => <SectionLoader label="The Glitch" /> }
);

const TheParallax = dynamic(
  () => import("@/components/foodshot/parallax-depth").then((m) => m.ParallaxDepth),
  { ssr: false, loading: () => <SectionLoader label="The Parallax" /> }
);

const TheRipple = dynamic(
  () => import("@/components/foodshot/ripple-click").then((m) => m.RippleClick),
  { ssr: false, loading: () => <SectionLoader label="The Ripple" /> }
);

const TheTypewriter = dynamic(
  () => import("@/components/foodshot/typewriter-stats").then((m) => m.TypewriterStats),
  { ssr: false, loading: () => <SectionLoader label="The Typewriter" /> }
);

const TheCube = dynamic(
  () => import("@/components/foodshot/rotating-cube").then((m) => m.RotatingCube),
  { ssr: false, loading: () => <SectionLoader label="The Cube" /> }
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
  { id: "the-spotlight", label: "The Spotlight", desc: "Cinematic Carousel" },
  { id: "split-screen", label: "Split Screen", desc: "Before vs After" },
  { id: "the-lens", label: "The Lens", desc: "Magic Reveal" },
  { id: "the-menu", label: "The Menu", desc: "Restaurant Style" },
  { id: "the-stack", label: "The Stack", desc: "Card Deck" },
  { id: "the-reveal", label: "The Reveal", desc: "Text Masking" },
  { id: "the-tilt", label: "The Tilt", desc: "3D Perspective" },
  { id: "the-filmstrip", label: "The Filmstrip", desc: "Cinema Reel" },
  { id: "the-counter", label: "The Counter", desc: "Revenue Impact" },
  { id: "the-morph", label: "The Morph", desc: "Circle Reveal" },
  { id: "the-orbit", label: "The Orbit", desc: "3D Carousel" },
  { id: "the-curtain", label: "The Curtain", desc: "Theatrical Reveal" },
  { id: "the-flip", label: "The Flip", desc: "Card Flip" },
  { id: "the-accordion", label: "The Accordion", desc: "Expandable Panels" },
  { id: "the-spotlight-beam", label: "The Spotlight", desc: "Light Beam" },
  { id: "the-mosaic", label: "The Mosaic", desc: "Tile Assembly" },
  { id: "the-scramble", label: "The Scramble", desc: "Pixel Resolve" },
  { id: "the-gravity", label: "The Gravity", desc: "Physics Drop" },
  { id: "the-wipe", label: "The Wipe", desc: "Horizontal Scroll" },
  { id: "the-mirror", label: "The Mirror", desc: "Reflected Type" },
  { id: "the-pulse", label: "The Pulse", desc: "Heartbeat Grid" },
  { id: "the-marquee", label: "The Marquee", desc: "Ticker Tape" },
  { id: "the-zoom", label: "The Zoom", desc: "Infinite Zoom" },
  { id: "the-polaroid", label: "The Polaroid", desc: "Scatter & Sort" },
  { id: "the-glitch", label: "The Glitch", desc: "VHS Effect" },
  { id: "the-parallax", label: "The Parallax", desc: "Depth Layers" },
  { id: "the-ripple", label: "The Ripple", desc: "Click Ripple" },
  { id: "the-typewriter", label: "The Typewriter", desc: "Terminal Stats" },
  { id: "the-cube", label: "The Cube", desc: "3D Cube" },
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
          <div className="hidden lg:flex items-center gap-1">
            {concepts.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="px-2.5 py-1.5 text-[9px] font-medium rounded-full border border-zinc-800 text-zinc-500 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
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
            35 Hero Concepts for FoodShot
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
            35 distinct visual experiences, each selling FoodShot from a unique angle.
            Real restaurant photos. No stock imagery.
          </p>

          {/* Concept pills */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {concepts.map((c, i) => (
              <motion.a
                key={c.id}
                href={`#${c.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.06 }}
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

      {/* All 11 Concepts */}
      <div className="space-y-0">
        {/* === ORIGINAL 6 === */}
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

        {/* === NEW 5 CONCEPTS === */}
        <div className="relative py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-12" />
            <span className="inline-block px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
              5 New Concepts
            </span>
          </div>
        </div>

        <div id="the-spotlight">
          <TheSpotlight />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="split-screen">
          <TheSplitScreen />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-lens">
          <TheLens />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-menu">
          <TheMenu />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-stack">
          <TheStack />
        </div>

        {/* === BATCH 3: 5 MORE CONCEPTS === */}
        <div className="relative py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-12" />
            <span className="inline-block px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
              5 More Concepts
            </span>
          </div>
        </div>

        <div id="the-reveal">
          <TheReveal />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-tilt">
          <TheTilt />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-filmstrip">
          <TheFilmstrip />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-counter">
          <TheCounter />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-morph">
          <TheMorph />
        </div>

        {/* === BATCH 4: 7 MORE CONCEPTS === */}
        <div className="relative py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-12" />
            <span className="inline-block px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
              7 More Concepts
            </span>
          </div>
        </div>

        <div id="the-orbit">
          <TheOrbit />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-curtain">
          <TheCurtain />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-flip">
          <TheFlip />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-accordion">
          <TheAccordion />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-spotlight-beam">
          <TheSpotlightBeam />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-mosaic">
          <TheMosaic />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-scramble">
          <TheScramble />
        </div>

        {/* === BATCH 5: 6 MORE CONCEPTS === */}
        <div className="relative py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-12" />
            <span className="inline-block px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
              6 More Concepts
            </span>
          </div>
        </div>

        <div id="the-gravity">
          <TheGravity />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-wipe">
          <TheWipe />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-mirror">
          <TheMirror />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-pulse">
          <ThePulse />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-marquee">
          <TheMarquee />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-zoom">
          <TheZoom />
        </div>

        {/* === BATCH 6: 6 MORE CONCEPTS === */}
        <div className="relative py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-12" />
            <span className="inline-block px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
              6 More Concepts
            </span>
          </div>
        </div>

        <div id="the-polaroid">
          <ThePolaroid />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-glitch">
          <TheGlitch />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-parallax">
          <TheParallax />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-ripple">
          <TheRipple />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-typewriter">
          <TheTypewriter />
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />

        <div id="the-cube">
          <TheCube />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-6 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-zinc-600 text-sm mb-6">
            35 concepts • Real restaurant photography • Contained images at proper resolution
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
