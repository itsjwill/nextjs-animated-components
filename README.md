# MotionCraft

> The animation toolkit that makes your site look like it cost $50k. 95+ components. 4 design directions. Zero compromise.

**GSAP + Framer Motion + Lenis + Three.js. Direction-aware design system. All in one.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Components](https://img.shields.io/badge/Components-95%2B-purple)

---

## See It In Action

### 4 Design Directions — Same Components, Completely Different Feelings

<!-- Add screenshots of each direction here -->
<!-- To add: take a screenshot of your site in each direction and save to public/screenshots/ -->

| Luxury | Cyberpunk |
|--------|-----------|
| ![Luxury](public/screenshots/luxury.png) | ![Cyberpunk](public/screenshots/cyberpunk.png) |

| Kinetic | Freestyle |
|---------|-----------|
| ![Kinetic](public/screenshots/kinetic.png) | ![Freestyle](public/screenshots/freestyle.png) |

Switch directions at runtime. Colors, fonts, motion curves, and component aesthetics all adapt instantly.

---

## What Makes This Different

### Direction-Aware Design System

Every component adapts to your chosen design direction:

| Direction | Vibe | Fonts | Colors |
|-----------|------|-------|--------|
| **Luxury** | Pagani/Richard Mille | Space Grotesk + Inter | Black, white, gold |
| **Cyberpunk** | Neon/Glitch | JetBrains Mono + IBM Plex | Navy, cyan, magenta |
| **Kinetic** | Stripe/Vercel | Outfit + DM Sans | White, violet, teal |
| **Freestyle** | Bold/Unexpected | Syne + Manrope | Warm dark, coral, emerald |

### Why Not Just Use Aceternity / Magic UI?

| Feature | Aceternity | Magic UI | **MotionCraft** |
|---------|------------|----------|-----------------|
| Components | ~50 | ~40 | **95+** |
| Design Directions | 1 | 1 | **4** |
| Dark/Light Mode | Yes | Yes | **Per-direction** |
| Motion Presets | None | None | **Direction-aware** |
| 3D Components | Few | None | **5+** |
| SEO Toolkit | None | None | **Complete** |
| Programmatic Pages | None | None | **37 pages** |
| Scroll Video | No | No | **Yes** |
| Audio Reactive | No | No | **Yes** |
| Fluid Cursor | No | No | **Yes** |

---

## Quick Start

```bash
git clone https://github.com/itsjwill/motioncraft.git
cd motioncraft
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the demo.

---

## What's Inside

### Backgrounds (12+)
Aurora, Spotlight, Meteors, Grid, Gradient Mesh, Particles, Sparkles, Infinite Grid, Noise Gradient Shader, Liquid Metal, Wave Distortion, Plasma, Organic Blob, Glitch

### Text Animations (8+)
Text Generate, Typewriter, Flip Words, Character/Word/Line Reveal, Gradient Text, Neon Text, Shiny Text

### Cards (10+)
Tilt Card, 3D Card, Glow Card, Border Beam, Evervault Card, Bento Grid, Feature Card, Wobble Card, Stack Cards, Living System

### Scroll Animations (15+)
Infinite Scroll, Parallax, Text Parallax, Sticky Reveal, Horizontal Scroll, Fade/Scale/Rotate on Scroll, Stagger, Zoom Parallax, GSAP ScrollTrigger suite

### 3D Components (3+)
Floating Shapes, Particle Field, Interactive Globe

### Interactive Effects (15+)
Magnetic Button, Shiny Button, Gradient Border, Liquid Button, Glitch Button, Custom Cursor (6 variants), Cursor Trail, Spotlight Cursor, Animated Input, Image Reveal (7 modes)

### Premium Buttons (10)
Shader Distortion, Ink Bleed, Cloth, Portal, Swarm, Liquid Metal, Reactive Shadow, Sticker Peel, Thermal, Momentum

### Navigation
Morphing Nav, Sliding Nav, Hamburger, Magnetic Nav Items, Animated Nav Links

### Page Templates (3)
Landing Page, Pricing Page, About Page — complete drop-in templates

### SEO Toolkit (Complete)
- **AutoSEO** — Zero-config keyword extraction + JSON-LD generation
- **15 JSON-LD schemas** — Organization, Article, Product, FAQ, Software, Video, Event, and more
- **Analytics** — Google, Plausible, Fathom, Umami, PostHog
- **Social Share** — 9 platforms
- **Web Vitals** — CLS, FCP, FID, INP, LCP, TTFB tracking
- **Breadcrumbs** — Visual + structured data
- **RSS/Atom/JSON Feed** generators

### Theme System
ThemeProvider, ThemeToggle (animated sun/moon), ThemeSelector dropdown, useTheme hook

### Hooks
useLenis, useGsap, useScrollTrigger, useParallax, useTextReveal, useMagnetic, useMousePosition, useSmoothMouse, useWebVitals

---

## Usage

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

---

## Tech Stack

| Library | Purpose |
|---------|---------|
| **GSAP** | Complex timelines, ScrollTrigger |
| **Framer Motion** | Declarative animations, gestures |
| **Lenis** | Smooth scroll |
| **React Three Fiber** | 3D scenes |
| **Tailwind CSS** | Styling |
| **TypeScript** | Full type safety |
| **next-sitemap** | Auto sitemaps |
| **schema-dts** | JSON-LD types |

---

## Performance

- First load JS: < 200KB
- All canvas/shader/Three.js: `next/dynamic` with `ssr: false`
- Fonts: `next/font` with display swap
- `prefers-reduced-motion` respected everywhere
- Lighthouse 90+

---

## Prompting Guide

See **[PROMPTING.md](./PROMPTING.md)** for AI prompt templates to build sites with MotionCraft.

---

## Contributing

See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for development setup and guidelines.

---

## Credits

Inspired by [Aceternity UI](https://ui.aceternity.com), [Magic UI](https://magicui.design), [21st.dev](https://21st.dev)

Built with [GSAP](https://greensock.com/gsap/), [Framer Motion](https://framer.com/motion/), [Lenis](https://lenis.studiofreight.com/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

---

## License

MIT © itsjwill

---

**Stop building basic. Start building legendary.**
