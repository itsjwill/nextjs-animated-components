"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { CharacterReveal } from "@/components/text/text-reveal";
import { GradientText, NeonText } from "@/components/text/gradient-text";
import { FadeIn, ScrollProgress, TextParallax } from "@/components/scroll";
import { AuroraBackground } from "@/components/backgrounds/aurora";
import { Meteors } from "@/components/backgrounds/meteors";
import { TiltCard } from "@/components/cards";
import {
  MagneticButton,
  ElasticButton,
  SplitButton,
  BorderFlowButton,
} from "@/components/effects/magnetic-button";
import { CustomCursor } from "@/components/effects/custom-cursor";
import {
  Hamburger,
  SlidingNav,
  MagneticNavItem,
  AnimatedNavLink,
} from "@/components/navigation";
import { MaskReveal, SlideReveal } from "@/components/transitions";

const FloatingShapes = dynamic(
  () => import("@/components/three/floating-shapes").then((mod) => mod.FloatingShapes),
  { ssr: false }
);

// Demo data
const works = [
  {
    id: 1,
    title: "Ethereal",
    category: "Art Direction",
    year: "2024",
    color: "#ff6b6b",
    description: "A journey through light and shadow",
  },
  {
    id: 2,
    title: "Synthesis",
    category: "Motion Design",
    year: "2024",
    color: "#4ecdc4",
    description: "Where technology meets nature",
  },
  {
    id: 3,
    title: "Void",
    category: "3D / Visual",
    year: "2023",
    color: "#a855f7",
    description: "Exploring the space between",
  },
  {
    id: 4,
    title: "Prism",
    category: "Brand Identity",
    year: "2023",
    color: "#f59e0b",
    description: "Refracting light into meaning",
  },
];

const skills = [
  "Art Direction",
  "Brand Design",
  "Motion Graphics",
  "3D Animation",
  "UI/UX Design",
  "Creative Coding",
  "Typography",
  "Photography",
];

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// Horizontal scroll section component
function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={containerRef} className="h-[400vh] relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 pl-[10vw]">
          {works.map((work, i) => (
            <motion.div
              key={work.id}
              className="w-[70vw] md:w-[50vw] lg:w-[40vw] flex-shrink-0"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <TiltCard className="group cursor-pointer">
                <div
                  className="aspect-[4/5] rounded-2xl mb-6 relative overflow-hidden"
                  style={{ backgroundColor: work.color }}
                >
                  <motion.div
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="opacity-0 group-hover:opacity-100 text-white text-xl font-bold transition-opacity">
                      View Project →
                    </span>
                  </motion.div>
                  <span className="absolute top-4 left-4 text-white/80 text-sm font-mono">
                    0{work.id}
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                      {work.title}
                    </h3>
                    <p className="text-zinc-500">{work.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-600 text-sm">{work.category}</span>
                    <br />
                    <span className="text-zinc-700 text-xs">{work.year}</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function PortfolioDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<"default" | "text" | "hidden">("default");

  return (
    <main className="relative bg-[#050505] text-white overflow-hidden cursor-none">
      <CustomCursor />
      <ScrollProgress />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <MagneticNavItem href="/" className="text-2xl font-black tracking-tighter">
            <span className="text-white">JD</span>
            <span className="text-zinc-600">.</span>
          </MagneticNavItem>

          <nav className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <AnimatedNavLink key={link.href} href={link.href} variant="bracket" className="text-sm uppercase tracking-widest text-zinc-400">
                {link.label}
              </AnimatedNavLink>
            ))}
          </nav>

          <Hamburger
            isOpen={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            variant="arrow"
            size="lg"
          />
        </div>
      </header>

      <SlidingNav
        links={navLinks}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        side="right"
        width="100%"
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0">
          <AuroraBackground />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <span className="text-zinc-600 font-mono text-sm">
              Creative Developer & Designer
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-[12rem] font-black leading-[0.85] tracking-tighter mb-12">
            <motion.span
              className="block"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              JOHN
            </motion.span>
            <motion.span
              className="block text-transparent"
              style={{ WebkitTextStroke: "2px white" }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              DOE
            </motion.span>
          </h1>

          <motion.div
            className="flex flex-col md:flex-row items-start md:items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xl text-zinc-400 max-w-md">
              I craft immersive digital experiences that blur the line between
              art and technology.
            </p>
            <div className="flex gap-4">
              <ElasticButton className="px-6 py-3">View Work</ElasticButton>
              <BorderFlowButton className="px-6 py-3">Contact</BorderFlowButton>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-zinc-600 text-xs uppercase tracking-widest rotate-90 origin-center mb-8">
            Scroll
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* Horizontal Scroll Work Section */}
      <section id="work">
        <div className="py-32 px-6">
          <div className="max-w-7xl mx-auto mb-16">
            <FadeIn>
              <span className="text-zinc-600 font-mono text-sm mb-4 block">
                Selected Work
              </span>
              <h2 className="text-5xl md:text-7xl font-black">
                <CharacterReveal text="Featured Projects" staggerDelay={0.02} />
              </h2>
            </FadeIn>
          </div>
        </div>

        <HorizontalScrollSection />
      </section>

      {/* Scrolling Text */}
      <TextParallax text="CREATIVE • DEVELOPER • DESIGNER •" />

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative">
        <Meteors number={20} />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeIn direction="left">
              <span className="text-zinc-600 font-mono text-sm mb-4 block">
                About Me
              </span>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                I create{" "}
                <NeonText color="purple" className="inline">
                  digital art
                </NeonText>{" "}
                that moves people
              </h2>
              <div className="space-y-6 text-lg text-zinc-400">
                <p>
                  With over 8 years of experience in digital design and creative
                  development, I specialize in creating immersive experiences that
                  captivate and inspire.
                </p>
                <p>
                  My work spans across art direction, motion design, 3D visualization,
                  and interactive installations. I believe in pushing boundaries and
                  exploring the intersection of technology and creativity.
                </p>
                <p>
                  Currently available for freelance projects and collaborations.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="space-y-8">
                <div>
                  <span className="text-zinc-600 font-mono text-sm mb-4 block">
                    Skills & Expertise
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        className="px-4 py-2 border border-zinc-800 rounded-full text-sm hover:border-purple-500 hover:text-purple-400 transition-colors cursor-default"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div>
                    <div className="text-5xl font-black text-white mb-2">8+</div>
                    <div className="text-zinc-500">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-white mb-2">50+</div>
                    <div className="text-zinc-500">Projects Completed</div>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-white mb-2">15</div>
                    <div className="text-zinc-500">Awards Won</div>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-white mb-2">∞</div>
                    <div className="text-zinc-500">Cups of Coffee</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative">
        <div className="absolute inset-0 opacity-30">
          <FloatingShapes preset="monochrome" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <span className="text-zinc-600 font-mono text-sm mb-4 block">
              Get in Touch
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8">
              Let&apos;s create
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "2px white" }}>
                something
              </span>
              <br />
              <GradientText gradient="from-purple-400 via-pink-500 to-red-500" animate>
                extraordinary
              </GradientText>
            </h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-xl mx-auto">
              Have a project in mind or just want to chat? I&apos;m always open to
              discussing new opportunities.
            </p>
            <div className="flex flex-col items-center gap-8">
              <SplitButton className="text-4xl md:text-5xl font-black px-8 py-4">
                hello@johndoe.com
              </SplitButton>
              <div className="flex items-center gap-8 text-zinc-500">
                {["Twitter", "Instagram", "Dribbble", "GitHub"].map((social) => (
                  <MagneticNavItem key={social} href="#" className="hover:text-white transition-colors">
                    {social}
                  </MagneticNavItem>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-sm">
            © 2024 John Doe. All rights reserved.
          </p>
          <p className="text-zinc-700 text-sm">
            Designed & Built with <span className="text-red-500">♥</span> using Motion Primitives
          </p>
        </div>
      </footer>
    </main>
  );
}
