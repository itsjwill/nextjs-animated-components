# Motion Craft - Website Design 2026
**For builders who want Awwwards-level sites, not another Tailwind template**

[![Last Updated](https://img.shields.io/badge/last%20updated-January%202026-brightgreen)]()
[![Components](https://img.shields.io/badge/components-95+-purple)]()
[![Directions](https://img.shields.io/badge/design%20directions-4-blue)]()
[![🏴‍☠️ Join The School](https://img.shields.io/badge/🏴‍☠️%20Join%20The%20School-black)](https://www.skool.com/ai-elite-9507/about?ref=67521860944147018da6145e3db6e51c)

Stop building sites that look like every other Next.js template. This is the **only** animation toolkit you need — 95+ components, 4 design directions, GSAP + Framer Motion + Three.js. Direction-aware design system that makes your site look like it cost $50k.

I'm tired of seeing "UI libraries" that are just repackaged Tailwind components. This one's different. Every component here is battle-tested, direction-aware, and designed to win awards.

> 🏴‍☠️ **Want to build alongside people who actually ship?** [Join the school](https://www.skool.com/ai-elite-9507/about?ref=67521860944147018da6145e3db6e51c) - we build AI products and premium sites weekly. No lurkers.

---

## See It In Action

| Cyberpunk Direction | Freestyle Direction |
|---------------------|---------------------|
| ![Cyberpunk](public/screenshots/cyberpunk.png) | ![Freestyle](public/screenshots/freestyle.png) |

**Same components. Completely different feelings.** Switch directions at runtime — colors, fonts, motion curves, and component aesthetics all adapt instantly.

---

## If You Only Try 3 Things, Try These

**DirectionPreloader** - The first thing users see. Cyberpunk gets a glitch counter, Luxury gets a gold wipe reveal, Kinetic gets a spring-bounce progress ring. Sets the tone for everything.

**MagneticButton** - Buttons that follow your cursor with spring physics. Makes every CTA feel premium. I use this on every project now.

**TiltCard + GlowCard** - 3D perspective tilt on hover with cursor-tracking glow. Makes any feature grid look $50k. Dead simple to implement.

---

## Where Should I Start?

**Building a new landing page from scratch?**
Start with → **SpotlightHero** (hero) → **BentoGrid + TiltCard** (features) → **MagneticButton** (CTAs)

**Have an existing site that looks generic?**
Go straight to → **Lenis smooth scroll** + **FadeIn animations** + **MagneticButton** replacements

**Want the full Awwwards experience?**
Add these layers: **DirectionPreloader** → **Particles/GradientMesh background** → **MouseParallax** → **ScrollReveal sections**

**Just want to play around?**
Clone it, run `npm run dev`, and switch between the 4 directions. Watch everything transform.

---

## The Real Comparison (Why Not Aceternity/Magic UI?)

| Feature | Aceternity | Magic UI | Shadcn Motion | **MotionCraft** |
|---------|------------|----------|---------------|-----------------|
| Components | ~50 | ~40 | ~20 | **95+** |
| Design Directions | 1 | 1 | 1 | **4 (runtime switch)** |
| Dark/Light Mode | Yes | Yes | Yes | **Per-direction themes** |
| Motion Presets | None | None | None | **Direction-aware curves** |
| 3D Components | Few | None | None | **5+ (Three.js)** |
| Scroll Video | No | No | No | **Apple-style frame scrub** |
| Audio Reactive | No | No | No | **Yes** |
| Fluid Cursor | No | No | No | **Metaball cursor** |
| SEO Toolkit | None | None | None | **15 JSON-LD schemas** |
| Programmatic Pages | None | None | None | **37 pages** |
| Preloader | None | None | None | **4 unique animations** |
| Mouse Parallax | No | No | No | **Interactive depth layers** |

**Quick verdict**: Others give you components. MotionCraft gives you a complete design system that adapts to your creative direction.

---

## The 4 Directions (This Is What Makes It Different)

| Direction | Vibe | Fonts | Colors | Motion |
|-----------|------|-------|--------|--------|
| **Luxury** | Pagani/Richard Mille | Space Grotesk + Inter | Black, white, gold | Slow, deliberate `[0.16, 1, 0.3, 1]` |
| **Cyberpunk** | Neon/Glitch/Terminal | JetBrains Mono + IBM Plex | Navy, cyan, magenta | Snappy, glitchy `[0.76, 0, 0.24, 1]` |
| **Kinetic** | Stripe/Vercel/Linear | Outfit + DM Sans | White, violet, teal | Spring physics `stiffness: 200` |
| **Freestyle** | Bold/Unexpected | Syne + Manrope | Warm dark, coral, emerald | Varied, unpredictable |

**Real talk**: This is the killer feature. One codebase, four completely different aesthetics. Client wants to go from "clean corporate" to "cyberpunk gaming"? Change one variable.

---

## Quick Start (Copy-Paste Ready)

```bash
git clone https://github.com/itsjwill/motioncraft.git
cd motioncraft
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — switch directions with the picker and watch everything transform.

### Drop-In Usage

```tsx
import { TiltCard, MagneticButton, FadeIn } from "motioncraft";

export default function Hero() {
  return (
    <FadeIn direction="up" delay={0.2}>
      <TiltCard intensity={15}>
        <h1>Your Next Award Winner</h1>
        <MagneticButton>Get Started</MagneticButton>
      </TiltCard>
    </FadeIn>
  );
}
```

### Make Any Hero Premium (30 seconds)

```tsx
import { SpotlightHero, TextGenerateEffect, MagneticButton } from "motioncraft";

export default function Hero() {
  return (
    <SpotlightHero>
      <TextGenerateEffect words="Build Websites That Win Awards" />
      <MagneticButton size="lg">Explore Components</MagneticButton>
    </SpotlightHero>
  );
}
```

---

## The Components That Don't Suck

### Backgrounds (12+) - Staff Pick: GradientMesh
Aurora, Spotlight, Meteors, Grid, Gradient Mesh, Particles, Sparkles, Infinite Grid, Noise Gradient Shader, Liquid Metal, Wave Distortion, Plasma, Organic Blob, Glitch

**Honest review**: GradientMesh is the one that makes clients go "whoa". Interactive, smooth, and works in all directions. Particles are solid for cyberpunk/kinetic.

### Text Animations (8+) - Staff Pick: TextGenerateEffect
Text Generate, Typewriter, Flip Words, Character/Word/Line Reveal, Gradient Text, Neon Text, Shiny Text

**Real talk**: TextGenerateEffect is the workhorse — it just works and looks premium. Character Reveal is for when you want to flex.

### Cards (10+) - Staff Pick: TiltCard + GlowCard combo
Tilt Card, 3D Card, Glow Card, Border Beam, Evervault Card, Bento Grid, Feature Card, Wobble Card, Stack Cards, Living System

**Use case**: BentoGrid with TiltCards inside is the move for any feature section. Stack Cards for case study scroll.

### Scroll Animations (15+) - Staff Pick: StickyReveal
Infinite Scroll, Parallax, Text Parallax, Sticky Reveal, Horizontal Scroll, Fade/Scale/Rotate on Scroll, Stagger, Zoom Parallax, GSAP ScrollTrigger suite

**Pro tip**: Add Lenis smooth scroll + FadeIn to any existing site and it immediately feels 10x more premium.

### Interactive Effects (15+) - Staff Pick: FluidCursor
Magnetic Button, Shiny Button, Gradient Border, Liquid Button, Glitch Button, Custom Cursor (6 variants), Cursor Trail, Spotlight Cursor, Animated Input, Image Reveal (7 modes)

**Hidden gem**: FluidCursor (metaball cursor) is the most unique thing in this library. Nobody else has it.

### Premium Buttons (10) - Staff Pick: Liquid Metal
Shader Distortion, Ink Bleed, Cloth, Portal, Swarm, Liquid Metal, Reactive Shadow, Sticker Peel, Thermal, Momentum

**Real talk**: These are the "I have time to impress" buttons. Liquid Metal and Ink Bleed are absurd in the best way.

### 3D Components (5+)
Floating Shapes, Particle Field, Interactive Globe, Particle Morph, Scroll Progress 3D

**Performance note**: All use `next/dynamic` with `ssr: false`. Won't tank your Lighthouse score.

---

## Hidden Gems Nobody Talks About

**ScrollVideo** - Apple-style video frame scrubbing on scroll. Way harder than it sounds to implement from scratch.

**AudioReactive** - Elements pulse with audio input. Perfect for music/creative portfolios.

**NoiseTransition** - Perlin noise dissolve between pages. Makes basic Next.js routing feel cinematic.

**AnimatedMasonry** - Masonry grid with staggered entrance + filter transitions. Not the boring CSS grid.

**SplitScreenText** - Text splits apart revealing content behind. Simple concept, huge visual impact.

---

## Overhyped Things to Skip (Sorry, Not Sorry)

**Basic parallax libraries** - Lenis + GSAP ScrollTrigger does everything they do, better.

**"AI-generated" UI libraries** - If every site using it looks the same, it's not premium.

**CSS-only animation libraries** - You'll hit limitations immediately. GSAP/Framer Motion exist for a reason.

**Component libraries without motion tokens** - Components without coordinated animation feel random, not designed.

---

## The Stack

| Library | Purpose | Why This One |
|---------|---------|--------------|
| **GSAP** | Complex timelines, ScrollTrigger | Industry standard, nothing touches it |
| **Framer Motion** | Declarative animations, gestures | Best React integration, period |
| **Lenis** | Smooth scroll | Smooth, predictable, lightweight |
| **React Three Fiber** | 3D scenes | Three.js without the pain |
| **Tailwind CSS** | Styling | Fast, consistent, direction-aware |
| **TypeScript** | Type safety | Full prop interfaces for everything |
| **next-sitemap** | Auto sitemaps | Zero-config SEO |
| **schema-dts** | JSON-LD types | Type-safe structured data |

---

## SEO Toolkit (Complete)

Not just animations — full SEO infrastructure:

- **AutoSEO** — Zero-config keyword extraction + JSON-LD generation
- **15 JSON-LD schemas** — Organization, Article, Product, FAQ, Software, Video, Event, and more
- **Analytics** — Google, Plausible, Fathom, Umami, PostHog
- **Social Share** — 9 platforms
- **Web Vitals** — CLS, FCP, FID, INP, LCP, TTFB tracking
- **Breadcrumbs** — Visual + structured data
- **RSS/Atom/JSON Feed** generators
- **SEOAnalyzer** — Dev-mode audit tool

---

## Performance

- First load JS: < 200KB
- All canvas/shader/Three.js: `next/dynamic` with `ssr: false`
- Fonts: `next/font` with display swap
- `prefers-reduced-motion` respected everywhere
- Lighthouse 90+

---

## The Real Talk Section

**Is this production-ready?** Yes. TypeScript throughout, proper prop interfaces, no hydration errors, accessibility considered.

**Will it slow my site down?** No. Heavy stuff (Three.js, shaders, canvas) loads async after first paint. Static fallbacks for everything.

**Can I use just some components?** Absolutely. Cherry-pick what you need. They're self-contained.

**Does it work with existing Tailwind sites?** Yes. The direction system uses CSS variables and data attributes. Won't conflict.

**What if I don't want 4 directions?** Pick one and stick with it. The direction system is opt-in.

---

## Contributing

See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for development setup and guidelines.

## Prompting Guide

See **[PROMPTING.md](./PROMPTING.md)** for AI prompt templates to build sites with MotionCraft.

---

## Credits

Inspired by [Aceternity UI](https://ui.aceternity.com), [Magic UI](https://magicui.design), [21st.dev](https://21st.dev)

Built with [GSAP](https://greensock.com/gsap/), [Framer Motion](https://framer.com/motion/), [Lenis](https://lenis.studiofreight.com/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

## License

MIT

---

<br><br>

<div align="center">

# 🏴‍☠️ Ready to Actually Build Something Award-Worthy?

### You just read through 95+ components. Now what?

**Most people bookmark this and forget about it.**

The builders who win? They pick a direction, clone this, and ship something this week.

<br>

## **[Join The School](https://www.skool.com/ai-elite-9507/about?ref=67521860944147018da6145e3db6e51c)**

**Where builders turn repos into revenue.**

<br>

🏴‍☠️ Weekly builds with real revenue potential
🏴‍☠️ Direct access to people shipping premium sites daily
🏴‍☠️ Skip the tutorial hell - build alongside people who've done it
🏴‍☠️ The shortcuts, prompts, and stacks that actually work

<br>

### This repo tells you WHAT exists. The school shows you HOW to profit from it.

<br>

[![JOIN THE SCHOOL](https://img.shields.io/badge/🏴‍☠️%20JOIN%20THE%20SCHOOL-000000?style=for-the-badge)](https://www.skool.com/ai-elite-9507/about?ref=67521860944147018da6145e3db6e51c)

<br>

**Stop building basic. Start building legendary.**

</div>
