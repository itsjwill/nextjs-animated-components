"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from "@/components/text/text-generate";
import { GradientText } from "@/components/text/gradient-text";
import { FadeIn, ScrollProgress } from "@/components/scroll";
import { GridBeams } from "@/components/backgrounds/grid";
import { TiltCard } from "@/components/cards";
import { MagneticButton } from "@/components/effects/magnetic-button";
import { AnimatedNavLink } from "@/components/navigation";

const demos = [
  {
    title: "Scroll Animations",
    subtitle: "GSAP ScrollTrigger Showcase",
    description: "The crown jewel — 10 GSAP scroll animations running live. Pinned orchestration, clip-path reveals, velocity effects, 3D depth parallax, horizontal scroll, text scrub, and more.",
    href: "/demos/scroll",
    gradient: "from-green-500 to-emerald-600",
    features: ["Scroll Orchestrator", "Clip-Path Reveal", "Depth Parallax", "Velocity Effects", "Horizontal Scroll"],
  },
  {
    title: "Agency",
    subtitle: "Digital Design Studio",
    description: "A sleek agency website with smooth page transitions, project showcases, and a modern dark aesthetic. Perfect for creative studios and agencies.",
    href: "/demos/agency",
    gradient: "from-purple-600 to-pink-600",
    features: ["Page Transitions", "Project Gallery", "Animated Navigation", "Contact Section"],
  },
  {
    title: "SaaS",
    subtitle: "Product Landing Page",
    description: "A modern SaaS landing page with feature grids, pricing tables, testimonials, and a global infrastructure showcase with 3D globe.",
    href: "/demos/saas",
    gradient: "from-cyan-500 to-blue-600",
    features: ["Pricing Tables", "Feature Cards", "3D Globe", "Social Proof"],
  },
  {
    title: "Portfolio",
    subtitle: "Creative Developer",
    description: "An artistic portfolio with horizontal scroll galleries, custom cursor, aurora backgrounds, and a unique typographic hero section.",
    href: "/demos/portfolio",
    gradient: "from-red-500 to-orange-500",
    features: ["Horizontal Scroll", "Custom Cursor", "Aurora Background", "Text Effects"],
  },
  {
    title: "Interactive 3D",
    subtitle: "Spline Scenes — Live",
    description: "Three completely different interactive 3D experiences powered by Spline. A cursor-tracking robot, a draggable Earth globe, and a morphing crystal hero. No WebGL code.",
    href: "/demos/interactive-3d",
    gradient: "from-indigo-500 to-violet-600",
    features: ["Spline 3D", "Cursor Tracking", "Globe Visualization", "Product Hero", "Zero Config"],
  },
];

export default function DemosPage() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <ScrollProgress />
      <GridBeams className="fixed inset-0 opacity-30" />

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <GradientText gradient="from-purple-400 to-pink-400">
              Motion Primitives
            </GradientText>
          </Link>
          <AnimatedNavLink href="/" variant="underline" className="text-zinc-400">
            ← Back to Components
          </AnimatedNavLink>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="px-4 py-2 text-sm font-medium text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
              Live Examples
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
            <TextGenerateEffect words="Website Demos" />
          </h1>

          <motion.p
            className="text-xl text-zinc-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            See what&apos;s possible with Motion Primitives. These are complete website
            templates showcasing the components in action.
          </motion.p>
        </div>
      </section>

      {/* Demos Grid */}
      <section className="relative z-10 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {demos.map((demo, i) => (
              <FadeIn key={demo.title} delay={i * 0.15}>
                <Link href={demo.href} className="block h-full">
                  <TiltCard className="h-full group">
                    {/* Preview area */}
                    <div
                      className={cn(
                        "aspect-[4/3] rounded-xl mb-6 bg-gradient-to-br relative overflow-hidden",
                        demo.gradient
                      )}
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-black text-white/20 group-hover:text-white/30 transition-colors">
                          {demo.title.charAt(0)}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <motion.div
                          className="bg-white/10 backdrop-blur-sm rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity"
                          initial={false}
                        >
                          <span className="text-white text-sm font-medium">
                            View Demo →
                          </span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <span className="text-zinc-500 text-sm uppercase tracking-wider">
                        {demo.subtitle}
                      </span>
                      <h2 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                        {demo.title}
                      </h2>
                      <p className="text-zinc-400 mb-4 text-sm leading-relaxed">
                        {demo.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {demo.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-2 py-1 text-xs bg-zinc-900 border border-zinc-800 rounded text-zinc-500"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-32 px-6 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Build your own{" "}
              <GradientText gradient="from-purple-400 to-pink-400" animate>
                award-winning
              </GradientText>{" "}
              site
            </h2>
            <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              All components used in these demos are available in the library.
              Mix and match to create your unique design.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <MagneticButton className="px-8 py-4">
                  Explore Components
                </MagneticButton>
              </Link>
              <a
                href="https://github.com/itsjwill/motion-primitives-website"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MagneticButton className="px-8 py-4 bg-transparent border border-zinc-800">
                  View on GitHub
                </MagneticButton>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-zinc-600 text-sm">
            Built with{" "}
            <GradientText gradient="from-purple-400 to-pink-400">
              Motion Primitives
            </GradientText>
            {" "}• The ultimate animation toolkit
          </p>
        </div>
      </footer>
    </main>
  );
}
