"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Components
import { SpotlightHero } from "@/components/layout/hero-sections";
import {
  Section,
  Container,
  SectionHeader,
  FeaturesSection,
  StatsSection,
  CTASection,
  Footer,
} from "@/components/layout/sections";
import { TiltCard, BeamCard, FeatureCard } from "@/components/cards";
import { TextGenerateEffect, FlipWords, CharacterReveal } from "@/components/text";
import { GradientText, NeonText } from "@/components/text/gradient-text";
import { InfiniteScroll, FadeIn, ScrollProgress, TextParallax } from "@/components/scroll";
import { AuroraBackground } from "@/components/backgrounds/aurora";
import { Meteors } from "@/components/backgrounds/meteors";
import { GridBeams } from "@/components/backgrounds/grid";
import { Sparkles } from "@/components/backgrounds/particles";
import {
  MagneticButton,
  ShinyButton,
  GradientBorderButton,
  LiquidButton,
} from "@/components/effects/magnetic-button";

// Dynamic imports for Three.js components (no SSR)
const FloatingShapes = dynamic(
  () => import("@/components/three/floating-shapes").then((mod) => mod.FloatingShapes),
  { ssr: false }
);

const Globe = dynamic(
  () => import("@/components/three/globe").then((mod) => mod.Globe),
  { ssr: false }
);

// Demo components data
const features = [
  {
    title: "GSAP Integration",
    description: "Timeline animations, ScrollTrigger, morphing, and complex sequences with the industry standard.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Framer Motion",
    description: "Declarative animations, gestures, layout transitions, and AnimatePresence for React.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Smooth Scroll",
    description: "Butter-smooth scrolling with Lenis. Perfect for parallax, sticky sections, and horizontal scrolls.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    ),
  },
  {
    title: "Three.js + R3F",
    description: "3D scenes, floating shapes, globes, and particle systems with React Three Fiber.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    ),
  },
  {
    title: "50+ Components",
    description: "Cards, backgrounds, text effects, buttons, cursors, forms, and layouts ready to use.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    title: "TypeScript First",
    description: "Full TypeScript support with proper types, autocomplete, and documentation.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
];

const stats = [
  { value: "50+", label: "Components" },
  { value: "5", label: "Animation Libraries" },
  { value: "100%", label: "TypeScript" },
  { value: "0", label: "Dependencies Conflicts" },
];

const componentCategories = [
  "Aurora Background",
  "Spotlight Effect",
  "Meteor Shower",
  "Particle Systems",
  "Grid Backgrounds",
  "3D Floating Shapes",
  "Interactive Globe",
  "Text Generate",
  "Typewriter Effect",
  "Character Reveal",
  "Gradient Text",
  "Neon Glow Text",
  "Tilt Cards",
  "Glow Cards",
  "Border Beam",
  "Bento Grid",
  "Infinite Scroll",
  "Parallax Sections",
  "Magnetic Buttons",
  "Custom Cursors",
];

export default function HomePage() {
  return (
    <main className="relative">
      <ScrollProgress />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <FloatingShapes preset="vibrant" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <span className="px-4 py-2 text-sm font-medium text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
              The Ultimate Animation Toolkit
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8">
            <TextGenerateEffect words="Build Websites That Stop The Scroll" />
          </h1>

          <motion.p
            className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            GSAP + Framer Motion + Lenis + Three.js combined into one beast.
            <br />
            <span className="text-zinc-500">50+ components. Zero BS. Awwwards-ready.</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <MagneticButton>Get Started</MagneticButton>
            <GradientBorderButton>View Components</GradientBorderButton>
          </motion.div>
        </div>
      </section>

      {/* Scrolling text */}
      <TextParallax text="AWWWARDS UI" />

      {/* Features Section */}
      <FeaturesSection
        badge="Features"
        title="Everything You Need"
        description="Stop piecing together 10 different libraries. This is all of them, combined, optimized, and ready."
        features={features}
      />

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Cards Showcase */}
      <Section className="bg-zinc-950">
        <Container>
          <SectionHeader
            badge="Components"
            title="Premium UI Elements"
            description="Cards, effects, and interactions that make users say 'how did they do that?'"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn delay={0.1}>
              <TiltCard className="h-full">
                <h3 className="text-xl font-bold text-white mb-3">Tilt Card</h3>
                <p className="text-zinc-400">
                  3D perspective tilt effect that follows your cursor. Smooth spring physics.
                </p>
              </TiltCard>
            </FadeIn>

            <FadeIn delay={0.2}>
              <BeamCard className="h-full" beamProps={{ colorFrom: "#00ff88", colorTo: "#00aaff" }}>
                <h3 className="text-xl font-bold text-white mb-3">Border Beam</h3>
                <p className="text-zinc-400">
                  Animated gradient border that traces the card edge. Pure CSS magic.
                </p>
              </BeamCard>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="relative h-full rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 overflow-hidden">
                <Sparkles particleColor="#8B5CF6" particleDensity={50} />
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-3">Sparkles</h3>
                  <p className="text-zinc-400">
                    Twinkling particle effect. Adjust density, color, and animation speed.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Text Effects Showcase */}
      <Section className="bg-black">
        <Container>
          <SectionHeader
            badge="Typography"
            title="Text That Moves"
            description="Character reveals, gradients, typewriters, and neon effects."
          />

          <div className="space-y-16 text-center">
            <FadeIn>
              <p className="text-zinc-500 text-sm mb-4 uppercase tracking-wider">Character Reveal</p>
              <h3 className="text-4xl md:text-6xl font-bold text-white">
                <CharacterReveal text="Every letter animated." />
              </h3>
            </FadeIn>

            <FadeIn>
              <p className="text-zinc-500 text-sm mb-4 uppercase tracking-wider">Gradient Text</p>
              <h3 className="text-4xl md:text-6xl font-bold">
                <GradientText gradient="from-cyan-400 via-purple-400 to-pink-400" animate>
                  Animated gradient flow.
                </GradientText>
              </h3>
            </FadeIn>

            <FadeIn>
              <p className="text-zinc-500 text-sm mb-4 uppercase tracking-wider">Neon Glow</p>
              <h3 className="text-4xl md:text-6xl font-bold">
                <NeonText color="cyan">Cyberpunk vibes.</NeonText>
              </h3>
            </FadeIn>

            <FadeIn>
              <p className="text-zinc-500 text-sm mb-4 uppercase tracking-wider">Flip Words</p>
              <h3 className="text-4xl md:text-6xl font-bold text-white">
                Build{" "}
                <FlipWords
                  words={["faster", "smarter", "better", "cooler"]}
                  className="text-purple-400"
                />
              </h3>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Buttons Showcase */}
      <Section className="bg-zinc-950">
        <Container>
          <SectionHeader
            badge="Interactions"
            title="Buttons That Feel Alive"
            description="Magnetic effects, liquid fills, glitch hovers, and gradient borders."
          />

          <div className="flex flex-wrap items-center justify-center gap-6">
            <MagneticButton>Magnetic</MagneticButton>
            <ShinyButton>Shiny</ShinyButton>
            <GradientBorderButton>Gradient Border</GradientBorderButton>
            <LiquidButton>Liquid Fill</LiquidButton>
          </div>
        </Container>
      </Section>

      {/* 3D Globe Section */}
      <Section className="bg-black min-h-[80vh]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <span className="text-purple-400 font-medium mb-4 uppercase tracking-wider">
                Three.js Integration
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                3D Without The Headache
              </h2>
              <p className="text-xl text-zinc-400 mb-8">
                Floating shapes, interactive globes, particle systems.
                React Three Fiber makes 3D accessible. We made it copy-paste ready.
              </p>
              <GradientBorderButton>Explore 3D Components</GradientBorderButton>
            </FadeIn>

            <FadeIn direction="right">
              <div className="h-[500px]">
                <Globe variant="dotted" color="#8B5CF6" />
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Infinite scroll showcase */}
      <Section className="bg-zinc-950 overflow-hidden">
        <SectionHeader
          badge="Components"
          title="Everything Included"
          className="px-4"
        />

        <InfiniteScroll speed="slow" className="py-8">
          {componentCategories.map((name, i) => (
            <div
              key={i}
              className="px-8 py-4 bg-zinc-900 rounded-full border border-zinc-800 whitespace-nowrap text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
            >
              {name}
            </div>
          ))}
        </InfiniteScroll>

        <InfiniteScroll speed="slow" direction="right" className="py-8">
          {componentCategories.slice().reverse().map((name, i) => (
            <div
              key={i}
              className="px-8 py-4 bg-zinc-900 rounded-full border border-zinc-800 whitespace-nowrap text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
            >
              {name}
            </div>
          ))}
        </InfiniteScroll>
      </Section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Build Something Insane?"
        description="Stop settling for basic. Start building websites that make people stop and stare."
        primaryCTA={{ text: "Get Started Free", href: "https://github.com/itsjwill/awwwards-ui" }}
        secondaryCTA={{ text: "View on GitHub", href: "https://github.com/itsjwill/awwwards-ui" }}
      />

      {/* Footer */}
      <Footer
        logo={
          <div className="text-2xl font-bold">
            <GradientText gradient="from-purple-400 to-pink-400">
              Awwwards UI
            </GradientText>
          </div>
        }
        columns={[
          {
            title: "Product",
            links: [
              { label: "GitHub", href: "https://github.com/itsjwill/awwwards-ui" },
            ],
          },
          {
            title: "Support",
            links: [
              { label: "Issues", href: "https://github.com/itsjwill/awwwards-ui/issues" },
            ],
          },
        ]}
        bottomText="MIT © itsjwill. Built for developers who refuse to settle for basic."
      />
    </main>
  );
}
