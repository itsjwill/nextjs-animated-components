# Next.js Animated Components — 150+ Free React Animation Components

### The free, open-source alternative to Aceternity UI, Magic UI, 21st.dev, and Shadcn Motion

<div align="center">

![Stars](https://img.shields.io/github/stars/itsjwill/nextjs-animated-components?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Components](https://img.shields.io/badge/Components-150+-purple?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge)

**[Live Demo](https://nextjs-animated-components.vercel.app)** | **[Browse Components](https://nextjs-animated-components.vercel.app/components)** | **[Showcase](https://nextjs-animated-components.vercel.app/showcase)**

</div>

> **150+ copy-paste animated components for React & Next.js.** Framer Motion, GSAP, Three.js, Tailwind CSS. Apple Liquid Glass, Stripe Mesh Gradients, SVG Path Animations, Animated Chat UI, Scroll Orchestration, 3D effects, and more. Zero paid dependencies.

---

## Live Demo

**See everything running right now** — no install needed:

| Page | What You'll See |
|------|----------------|
| **[Homepage](https://nextjs-animated-components.vercel.app)** | Full showcase with all sections, direction picker, interactive demos |
| **[Component Browser](https://nextjs-animated-components.vercel.app/components)** | Browse all 150+ components by category with live previews |
| **[Showcase](https://nextjs-animated-components.vercel.app/showcase)** | Full-page component exhibition |
| **[Scroll Animations](https://nextjs-animated-components.vercel.app/demos/scroll)** | **10 GSAP ScrollTrigger demos — orchestrator, clip-path, velocity, parallax, horizontal scroll** |
| **[SaaS Demo](https://nextjs-animated-components.vercel.app/demos/saas)** | Complete SaaS landing page built with these components |
| **[Agency Demo](https://nextjs-animated-components.vercel.app/demos/agency)** | Agency site template with animations |
| **[Portfolio Demo](https://nextjs-animated-components.vercel.app/demos/portfolio)** | Portfolio template with 3D and scroll effects |
| **[Neural Demo](https://nextjs-animated-components.vercel.app/neural)** | Three.js neural network visualization |

---

## Run It Locally

```bash
git clone https://github.com/itsjwill/nextjs-animated-components.git
cd nextjs-animated-components
npm install
npm run dev
```

Opens at `http://localhost:3000`. Use the direction picker (bottom-right corner) to switch between 4 design systems in real time.

---

## All Components

### Interactive (16 components)

| Component | What It Does | File |
|-----------|-------------|------|
| **Dock** | macOS-style magnification dock with spring physics | `interactive/dock.tsx` |
| **Marquee** | Infinite scroll marquee, horizontal/vertical, pause on hover | `interactive/marquee.tsx` |
| **Lamp** | Dramatic light cone effect (Aceternity-style) | `interactive/lamp.tsx` |
| **NumberTicker** | Animated number counter triggered on scroll | `interactive/number-ticker.tsx` |
| **MorphingText** | Text morphing, typewriter, flip, word rotate (4 variants) | `interactive/morphing-text.tsx` |
| **SpotlightCard** | Card with cursor-tracking radial spotlight | `interactive/spotlight-card.tsx` |
| **SpotlightBorderCard** | Spotlight effect on card border only | `interactive/spotlight-card.tsx` |
| **SpotlightGrid** | Grid of cards with shared spotlight | `interactive/spotlight-card.tsx` |
| **Magnetic** | Elements that attract toward cursor | `interactive/magnetic.tsx` |
| **AnimatedBeam** | SVG beam animations connecting elements | `interactive/animated-beam.tsx` |
| **RippleButton** | Material-design click ripple effect | `interactive/ripple.tsx` |
| **AnimatedTabs** | Tabs with spring animations (3 variants: pill, underline, background) | `interactive/animated-tabs.tsx` |
| **LiquidGlass** | iOS-style glassmorphism with 3D tilt | `interactive/liquid-glass.tsx` |
| **GlassCard** | Simple glassmorphism card with optional tilt | `interactive/liquid-glass.tsx` |
| **FrostedPanel** | Heavy frosted glass with noise texture | `interactive/liquid-glass.tsx` |
| **BorderBeam** | Light beam traveling around borders | `interactive/border-beam.tsx` |
| **ShimmerBorder** | Rotating gradient shimmer on borders | `interactive/border-beam.tsx` |
| **GlowingBorder** | Pulsing glow effect around elements | `interactive/border-beam.tsx` |
| **Confetti** | Particle celebration on click | `interactive/confetti.tsx` |
| **CelebrationConfetti** | Full-screen confetti rain | `interactive/confetti.tsx` |
| **ScrollReveal** | 10 reveal variants (fade, zoom, flip, blur, slide) | `interactive/scroll-reveal.tsx` |
| **StaggerReveal** | Stagger animate multiple children on scroll | `interactive/scroll-reveal.tsx` |
| **TextReveal** | Word-by-word text reveal on scroll | `interactive/scroll-reveal.tsx` |
| **OrbitingCircles** | Elements orbiting a center point | `interactive/orbit.tsx` |
| **AnimatedGridPattern** | Grid with randomly glowing cells | `interactive/wavy-background.tsx` |
| **DotPattern** | Repeating SVG dot pattern background | `interactive/wavy-background.tsx` |

### Backgrounds (13 components)

| Component | File |
|-----------|------|
| Aurora | `backgrounds/aurora.tsx` |
| Spotlight | `backgrounds/spotlight.tsx` |
| Meteors | `backgrounds/meteors.tsx` |
| Grid | `backgrounds/grid.tsx` |
| Gradient Mesh (interactive) | `backgrounds/gradient-mesh.tsx` |
| Particles | `backgrounds/particles.tsx` |
| Infinite Grid | `backgrounds/infinite-grid.tsx` |
| Gradient Blur | `backgrounds/gradient-blur.tsx` |
| Shader Backgrounds (Noise, Liquid Metal, Wave, Plasma) | `backgrounds/shader-backgrounds.tsx` |
| **MeshGradient** | `backgrounds/premium-backgrounds.tsx` |
| **DotPattern** | `backgrounds/premium-backgrounds.tsx` |
| **GridPattern** | `backgrounds/premium-backgrounds.tsx` |
| **FilmGrain** | `backgrounds/premium-backgrounds.tsx` |

### Premium Effects (5 components) **NEW**

| Component | What It Does | File |
|-----------|-------------|------|
| **LiquidGlass** | Apple iOS 26 glass — SVG refraction, specular highlights, backdrop blur, motion-responsive | `effects/premium-effects.tsx` |
| **SpotlightCard** | Linear.app-style card — radial gradient follows mouse, border glow on hover | `effects/premium-effects.tsx` |
| **AnimatedBeam** | Vercel-style SVG beam — cubic Bezier with traveling gradient connecting elements | `effects/premium-effects.tsx` |
| **CursorReveal** | Circle mask follows cursor revealing alternate content underneath, click to expand | `effects/premium-effects.tsx` |
| **ProgressiveBlur** | Linear.app edge blur — backdrop blur fades on any container edge (top/bottom/left/right) | `effects/premium-effects.tsx` |

### Premium Text (3 components) **NEW**

| Component | What It Does | File |
|-----------|-------------|------|
| **TextScramble** | Cyberpunk decode effect — random characters resolve to target text (mount/hover/inView triggers) | `text/premium-text.tsx` |
| **SpringText** | Kinetic typography — per-character spring physics, characters repel from cursor proximity | `text/premium-text.tsx` |
| **VariableFontText** | Variable font axis animation — animate weight/width per character (auto/hover/mouse modes) | `text/premium-text.tsx` |

### Premium Backgrounds (4 components) **NEW**

| Component | What It Does | File |
|-----------|-------------|------|
| **MeshGradient** | Stripe.com animated gradient — canvas FBM simplex noise with sinusoidal warp, configurable colors | `backgrounds/premium-backgrounds.tsx` |
| **DotPattern** | SVG dot grid with radial gradient fade mask — configurable spacing, radius, opacity | `backgrounds/premium-backgrounds.tsx` |
| **GridPattern** | Vercel.com grid lines with radial fade — SVG pattern with configurable cell size and opacity | `backgrounds/premium-backgrounds.tsx` |
| **FilmGrain** | Canvas animated noise overlay — analog film aesthetic with configurable intensity/fps/blend mode | `backgrounds/premium-backgrounds.tsx` |

### SVG Animations (12 components + 4 hooks) **NEW**

| Component | What It Does | File |
|-----------|-------------|------|
| **SvgPathDraw** | Self-drawing SVG paths on scroll/mount/hover/inView | `svg/animated-svg.tsx` |
| **SvgMorph** | Morph between SVG path shapes with auto/hover/click/scroll triggers | `svg/animated-svg.tsx` |
| **SvgLineOrchestra** | Choreographed sequential path drawing with GSAP timeline | `svg/animated-svg.tsx` |
| **SvgGooeyBlob** | Metaball gooey filter with physics-based circle movement | `svg/animated-svg.tsx` |
| **SvgLiquidMorph** | Organic blob with continuous rAF-based noise morphing | `svg/animated-svg.tsx` |
| **SvgTextPathScroll** | Text on SVG textPath with scroll-linked startOffset | `svg/animated-svg.tsx` |
| **SvgStrokeReveal** | Two-stage reveal — stroke draws in, then fill fades | `svg/animated-svg.tsx` |
| **SvgParticleExplosion** | SVG elements burst apart on trigger, reassemble on reset | `svg/animated-svg.tsx` |
| **SvgGlitchFilter** | Animated displacement + turbulence + color shift glitch | `svg/animated-svg.tsx` |
| **SvgWaveDistortion** | feTurbulence wave wrapper for any children | `svg/animated-svg.tsx` |
| **SvgGradientFlow** | Animated flowing linearGradient on SVG paths | `svg/animated-svg.tsx` |
| **SvgCircuitBoard** | Auto-generated circuit board with pulsing nodes and data particles | `svg/animated-svg.tsx` |

**Hooks:** `useSvgPathDraw`, `useSvgMorph`, `useSvgFilter`, `useScrollVelocity` — in `hooks/use-svg-animation.ts`

### Animated Chat UI (8 components) **NEW**

| Component | What It Does | File |
|-----------|-------------|------|
| **ChatContainer** | Auto-scrolling chat with MutationObserver, glass/dark variants | `chat/animated-chat.tsx` |
| **ChatBubble** | Spring pop-in with user/assistant/system variants, directional enter | `chat/animated-chat.tsx` |
| **TypingIndicator** | Three bouncing dots with AnimatePresence | `chat/animated-chat.tsx` |
| **StreamingText** | Word/character streaming with fade/blur/slide/typewriter animations | `chat/animated-chat.tsx` |
| **ChatInput** | Auto-resize textarea with animated send button and char count | `chat/animated-chat.tsx` |
| **MessageReaction** | Spring-animated emoji pills with count badges | `chat/animated-chat.tsx` |
| **ChatNotification** | Slide-in banner with auto-dismiss progress bar | `chat/animated-chat.tsx` |
| **AiResponseCard** | Card with animated border beam rotation and streaming text | `chat/animated-chat.tsx` |

### Scroll Orchestration (7 components) **NEW**

| Component | What It Does | File |
|-----------|-------------|------|
| **ScrollOrchestrator** | Pin + master GSAP timeline scrubbed to scroll via React Context | `scroll/scroll-orchestrator.tsx` |
| **ScrollStage** | Define animation stages within orchestrator (0-1 range) | `scroll/scroll-orchestrator.tsx` |
| **ScrollVelocityWrapper** | Apply blur/skew/scale based on scroll speed | `scroll/scroll-orchestrator.tsx` |
| **ClipPathReveal** | Scroll-linked clip-path with presets (circle/horizontal/vertical/diagonal/diamond) | `scroll/scroll-orchestrator.tsx` |
| **DepthParallax** | CSS perspective container for real 3D depth | `scroll/scroll-orchestrator.tsx` |
| **DepthLayer** | Individual layer with translateZ depth + optional scroll speed | `scroll/scroll-orchestrator.tsx` |
| **ImageSequenceScroll** | Canvas frame sequence player — Apple AirPods Pro technique | `scroll/scroll-orchestrator.tsx` |

### Scroll Animations (6 components)

GSAP ScrollTrigger, Infinite Scroll, Parallax, Text Parallax, Sticky Reveal, Horizontal Scroll, Section Reveal, Fade/Scale/Rotate on Scroll

### Text Animations (7 components)

Text Generate Effect, Character/Word/Line Reveal, Gradient Text, Split Screen Text, **TextScramble, SpringText, VariableFontText**

### Cards (7 components)

Tilt Card, Glow Card, Bento Grid, Feature Showcase, Hover Card, Stack Cards, Living System

### Effects (16 components)

Magnetic Button, Magnetic Gallery, Custom Cursor (6 variants), Fluid Cursor (metaball), Mouse Parallax, Audio Reactive, Animated Input, Media Reveal (7 modes), Text Distortion, Reveal on Hover, Theme Toggle, **LiquidGlass, SpotlightCard, AnimatedBeam, CursorReveal, ProgressiveBlur**

### Premium Buttons (10 components)

Shader Distortion, Ink Bleed, Cloth, Portal, Swarm, Liquid Metal, Reactive Shadow, Sticker Peel, Thermal, Momentum

### 3D Components (5 components)

Floating Shapes, Interactive Globe, Neural Network, Particle Morph, Scroll Progress 3D

### Layout & Navigation (5 components)

Animated Masonry, Hero Sections (multiple variants), Premium Layouts, Morphing Nav, Section Reveal

### Transitions (3 components)

Noise Transition (Perlin dissolve between pages), Page Transition, Preloader (4 direction-specific variants)

### Page Templates (3 templates)

Landing Page, About Page, Pricing Page — all direction-aware, ready to customize

### SEO Toolkit (11 utilities)

Auto SEO (zero-config keyword extraction), 15 JSON-LD schemas, Analytics integration (Google Analytics, Plausible, Fathom, Umami, PostHog), Social Share (9 platforms), Web Vitals tracking (CLS, FCP, FID, INP, LCP, TTFB), Breadcrumbs, RSS/Atom/JSON feed generators, SEO Analyzer (dev-mode audit)

### Custom Hooks (6)

| Hook | What It Does |
|------|-------------|
| `useGsap` | GSAP ScrollTrigger integration with automatic cleanup |
| `useLenis` | Smooth scroll with Lenis — scroll-to, lock/unlock, velocity |
| `useMousePosition` | Real-time mouse position tracking for cursor effects |
| `useReducedMotion` | Respect `prefers-reduced-motion` — disable animations when needed |
| `useSvgAnimation` | SVG path draw, morph, filter, and scroll velocity (4-in-1) |
| `useWebVitals` | Track CLS, FCP, FID, INP, LCP, TTFB with callback |

---

## How to Use

Every component is self-contained. Copy the file you need, or import directly:

```tsx
import { SpotlightCard } from "@/components/interactive/spotlight-card";
import { ScrollReveal } from "@/components/interactive/scroll-reveal";
import { Dock, DockItem } from "@/components/interactive/dock";
import { TiltCard } from "@/components/cards/tilt-card";
import { MagneticButton } from "@/components/effects/magnetic-button";

// Premium components
import { LiquidGlass, AnimatedBeam, CursorReveal } from "@/components/effects";
import { MeshGradient, FilmGrain } from "@/components/backgrounds";
import { TextScramble, SpringText } from "@/components/text";
import { SvgPathDraw, SvgGooeyBlob } from "@/components/svg";
import { ChatContainer, ChatBubble, StreamingText } from "@/components/chat";
import { ScrollOrchestrator, ScrollStage, ImageSequenceScroll } from "@/components/scroll";
```

### Apple Liquid Glass (iOS 26)

```tsx
<LiquidGlass blur={20} refraction={0.3} specular motionResponsive>
  <div className="p-8">
    <h3>Glass Panel</h3>
    <p>SVG refraction + specular highlights follow your cursor.</p>
  </div>
</LiquidGlass>
```

### Stripe-Style Mesh Gradient

```tsx
<MeshGradient
  colors={["#6366f1", "#8b5cf6", "#ec4899", "#06b6d4", "#10b981"]}
  speed={0.0005}
  className="w-full h-[400px]"
/>
```

### Vercel Animated Beam

```tsx
<div ref={containerRef} className="relative">
  <div ref={fromRef}>Source</div>
  <div ref={toRef}>Target</div>
  <AnimatedBeam containerRef={containerRef} fromRef={fromRef} toRef={toRef} curvature={50} />
</div>
```

### Cursor Reveal (Hidden Content)

```tsx
<CursorReveal
  radius={100}
  expandOnClick
  revealContent={<div className="bg-white text-black p-8">Secret content revealed!</div>}
>
  <div className="bg-black text-white p-8">Hover to reveal what's underneath</div>
</CursorReveal>
```

### Text Scramble (Decode Effect)

```tsx
<TextScramble text="WELCOME TO THE FUTURE" trigger="inView" duration={2000} />
```

### Spring Text (Per-Character Physics)

```tsx
<SpringText text="HOVER ME" fontSize={4} proximity={120} maxDisplacement={25} />
```

### SVG Path Drawing

```tsx
<SvgPathDraw
  paths={[{ d: "M10,80 Q95,10 180,80", stroke: "#6366f1", strokeWidth: 3 }]}
  trigger="inView"
  duration={1.5}
/>
```

### Animated Chat UI

```tsx
<ChatContainer variant="glass">
  <ChatBubble sender="user">How does this work?</ChatBubble>
  <ChatBubble sender="assistant">
    <StreamingText text="Each word animates in with spring physics." mode="word" />
  </ChatBubble>
  <TypingIndicator />
</ChatContainer>
```

### Apple-Style Image Sequence

```tsx
<ImageSequenceScroll
  frames={Array.from({ length: 120 }, (_, i) => `/frames/frame-${i}.webp`)}
  preloadCount={20}
/>
```

### Film Grain Overlay

```tsx
<div className="relative">
  <YourContent />
  <FilmGrain intensity={0.06} fps={12} blendMode="overlay" />
</div>
```

### Scroll Reveal (10 variants)

```tsx
<ScrollReveal variant="fade-up" delay={0.2}>
  <div>This fades up when scrolled into view.</div>
</ScrollReveal>
```

### macOS Dock

```tsx
<Dock magnification={60} distance={140}>
  <DockItem label="Home"><HomeIcon className="w-6 h-6" /></DockItem>
  <DockSeparator />
  <DockItem label="Settings"><GearIcon className="w-6 h-6" /></DockItem>
</Dock>
```

---

## 4 Design Directions

One codebase, four completely different aesthetics. Switch with one attribute — **every** CSS variable, font, color, animation curve, and component style transforms instantly. No rebuild required.

| Direction | Vibe | Fonts | Motion Style |
|-----------|------|-------|-------------|
| **Luxury** | Pagani, Richard Mille | Space Grotesk + Inter | Slow, deliberate `[0.16, 1, 0.3, 1]` |
| **Cyberpunk** | Neon, Glitch, Terminal | JetBrains Mono + IBM Plex | Snappy, glitchy `[0.76, 0, 0.24, 1]` |
| **Kinetic** | Stripe, Vercel, Linear | Outfit + DM Sans | Spring physics `stiffness: 200` |
| **Freestyle** | Bold, Unexpected | Syne + Manrope | Varied, unpredictable |

**What changes per direction:**
- 40+ CSS color variables (backgrounds, borders, accents, gradients)
- 8 font families with fluid scaling (12+ sizes)
- 4 distinct animation timing functions (ease curves)
- 20+ keyframe animations adapted per aesthetic
- Component border radii, shadows, spacing
- Gradient angles, glow intensities, blur values

```tsx
// Switch at runtime — no rebuild, no page reload
document.documentElement.setAttribute("data-direction", "cyberpunk");
```

Use the **DirectionPicker** component (bottom-right corner in demo) to try all 4 live.

---

## Tech Stack

| Library | Purpose |
|---------|---------|
| **Next.js 14** | App Router, React Server Components, 62 static pages |
| **React 18** | Client components with hooks |
| **Framer Motion 11** | Declarative animations, gestures, layout animations |
| **GSAP 3.12** | Complex timelines, ScrollTrigger, pin/scrub effects |
| **Three.js / React Three Fiber** | 3D scenes (globe, particles, neural network) |
| **Lenis** | Smooth scrolling with momentum |
| **Tailwind CSS 3.4** | Utility styling with direction-aware CSS variables |
| **TypeScript 5.4** | Full type safety, prop interfaces for every component |

---

## Comparison

| Feature | Aceternity UI | Magic UI | Shadcn Motion | **This Repo** |
|---------|--------------|----------|---------------|---------------|
| Price | $49-149/yr | $49/yr | Free | **Free (MIT)** |
| Components | ~50 | ~40 | ~20 | **150+** |
| Live Demo | Yes | Yes | Limited | **[Yes — 8 pages](https://nextjs-animated-components.vercel.app)** |
| Design Systems | 1 | 1 | 1 | **4 (runtime switchable)** |
| 3D Components | Few | None | None | **5 (Three.js)** |
| GSAP ScrollTrigger | No | No | No | **Yes** |
| Scroll Video | No | No | No | **Apple-style frame scrub** |
| Audio Reactive | No | No | No | **Yes** |
| Fluid Cursor | No | No | No | **Metaball cursor** |
| SEO Toolkit | None | None | None | **15 JSON-LD schemas** |
| Page Templates | None | None | None | **3 (SaaS, Agency, Portfolio)** |
| Preloader | None | None | None | **4 direction-specific variants** |
| SVG Animations | No | No | No | **12 components + 4 hooks** |
| Animated Chat UI | No | No | No | **8 components** |
| Premium Text Effects | No | No | No | **3 (scramble, spring, variable font)** |
| Scroll Orchestration | No | No | No | **7 (pin, stage, velocity, clip-path, depth)** |
| Custom Hooks | Few | Few | None | **6 (GSAP, Lenis, mouse, motion, SVG, vitals)** |

---

## Performance

- First load JS: < 200KB (87.6KB shared)
- All 3D/canvas/shader components: `next/dynamic` with `ssr: false`
- 62 statically generated pages
- Fonts: `next/font` with display swap
- `prefers-reduced-motion` respected throughout
- Lighthouse 90+

---

## Project Structure

```
src/
├── components/
│   ├── backgrounds/      # 13 animated backgrounds (aurora, spotlight, meteors, mesh gradient, film grain...)
│   ├── buttons/          # 10 premium button effects (shader, ink bleed, cloth, portal, swarm...)
│   ├── cards/            # 7 card components (tilt, glow, bento, stack, living system...)
│   ├── chat/             # 8 animated chat UI (bubbles, streaming text, typing indicator, reactions...)
│   ├── core/             # Direction picker, preloader, smooth scroll, nav
│   ├── docs/             # Code block, component preview, props table
│   ├── effects/          # 16 cursor/interaction effects + 5 premium (liquid glass, cursor reveal...)
│   ├── interactive/      # 26 interactive components (dock, marquee, spotlight, beam, glass...)
│   ├── layout/           # Hero sections, masonry, premium layouts
│   ├── navigation/       # Morphing nav
│   ├── scroll/           # 13 scroll systems (orchestrator, velocity, clip-path, depth parallax, image sequence...)
│   ├── seo/              # 11 SEO utilities (15 JSON-LD schemas, analytics, feeds, vitals...)
│   ├── svg/              # 12 SVG animations (path draw, morph, gooey blob, circuit board, glitch...)
│   ├── templates/        # 3 page templates (landing, about, pricing)
│   ├── text/             # 7 text animations (generate, reveal, gradient, scramble, spring, variable font...)
│   ├── three/            # 5 Three.js 3D components (globe, particles, neural network...)
│   └── transitions/      # 3 page transitions (noise dissolve, preloader variants)
├── hooks/
│   ├── use-gsap.ts           # GSAP ScrollTrigger integration
│   ├── use-lenis.ts          # Smooth scroll with Lenis
│   ├── use-mouse-position.ts # Mouse tracking for effects
│   ├── use-reduced-motion.ts # Accessibility: prefers-reduced-motion
│   ├── use-svg-animation.ts  # SVG path draw, morph, filter, scroll velocity
│   └── use-web-vitals.ts     # Core Web Vitals tracking
├── app/
│   ├── page.tsx          # Homepage
│   ├── _sections/        # 9 homepage demo sections
│   ├── components/       # Component browser (48+ individual pages)
│   ├── demos/            # SaaS, Agency, Portfolio templates
│   ├── showcase/         # Full component showcase
│   └── neural/           # Neural network 3D demo
└── lib/
    ├── utils.ts          # cn() helper, easings, utilities
    ├── motion.ts         # Motion utilities and presets
    ├── theme.tsx          # Theme system with direction support
    ├── fonts.ts          # Direction-aware font definitions
    ├── seo.ts            # SEO utilities
    └── component-registry.ts  # Dynamic component registry
```

---

## FAQ

**Can I use individual components in my own project?**
Yes. Every component is self-contained. Copy the `.tsx` file you need into your project. Only dependencies are React, Framer Motion, and Tailwind CSS (some components also use GSAP or Three.js).

**Does it work with existing Tailwind sites?**
Yes. The direction system uses CSS variables and `data-direction` attributes. Won't conflict with your existing Tailwind config.

**What if I only want one design direction?**
Pick one and use it. The multi-direction system is completely opt-in. Components work without it.

**Will it slow my site down?**
No. Heavy components (Three.js, shaders, canvas) load asynchronously via `next/dynamic`. Static fallbacks for everything. First load shared JS is 87.6KB.

**Is this production-ready?**
Yes. TypeScript throughout, proper prop interfaces, no hydration errors, accessibility considered. `prefers-reduced-motion` is respected.

**What are the "premium" components?**
Not paywalled — everything is free. "Premium" means these components match the quality of paid libraries: Apple Liquid Glass (iOS 26), Stripe Mesh Gradients, Linear.app Spotlight Cards, Vercel Animated Beams. They're called "premium" because they took significantly more engineering to build.

**Can I build an AI chat interface with this?**
Yes. The 8-component Animated Chat UI gives you spring-animated bubbles, streaming text with 4 modes (word/character/fade/typewriter), typing indicators, reactions, notifications, and an AI response card with animated border beam. Plug in any LLM backend.

**What about SVG animations?**
12 dedicated components: self-drawing paths, shape morphing, gooey metaballs, particle explosions, glitch filters, circuit board generators, and more. Plus 4 custom hooks for building your own SVG animations.

---

## Contributing

PRs welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Credits

Inspired by [Aceternity UI](https://ui.aceternity.com), [Magic UI](https://magicui.design), [21st.dev](https://21st.dev), [Hover.dev](https://hover.dev)

Built with [Next.js](https://nextjs.org), [Framer Motion](https://framer.com/motion/), [GSAP](https://greensock.com/gsap/), [Lenis](https://lenis.studiofreight.com/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [Tailwind CSS](https://tailwindcss.com)

## License

MIT — use however you want, commercially or personally.

---

## More Open Source

| Repo | Description |
|------|-------------|
| [vanta](https://github.com/itsjwill/vanta) | Open source AI video engine |
| [ai-agents-that-ship](https://github.com/itsjwill/ai-agents-that-ship) | Production-ready AI agent frameworks |
| [generative-ai-uncensored](https://github.com/itsjwill/generative-ai-uncensored) | The real guide to generative AI tools |

---

<div align="center">

### Want to build alongside people who ship?

**[Join the community](https://www.skool.com/ai-elite-9507/about?ref=67521860944147018da6145e3db6e51c)** — we build AI products and premium sites weekly.

[![Join](https://img.shields.io/badge/JOIN-000000?style=for-the-badge)](https://www.skool.com/ai-elite-9507/about?ref=67521860944147018da6145e3db6e51c)

</div>
