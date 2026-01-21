# Awwwards UI ⚡

> The ultimate web animation toolkit. Build Awwwards-worthy sites without hiring a $50k agency.

**GSAP + Framer Motion + Lenis + Three.js + 50+ components. All in one.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)

---

## Why Awwwards UI?

Nobody combines these tools. They pick ONE:
- "I use Framer Motion"
- "I use GSAP"
- "I installed Aceternity"

And call it a day.

**Awwwards UI stacks them all** with proper orchestration. That's what makes Awwwards winners different from "yet another React site."

---

## What's Inside

### 🎨 Backgrounds
- `AuroraBackground` - Animated aurora borealis effect
- `Spotlight` / `Spotlights` - Dramatic spotlight overlays
- `Meteors` / `ShootingStars` - Falling meteor animations
- `GridBackground` / `GridBeams` / `PerspectiveGrid` - Grid patterns with effects
- `GradientBlob` / `GradientBackground` - Animated gradient meshes
- `Particles` / `Sparkles` - Canvas-based particle systems

### ✨ Text Animations
- `TextGenerateEffect` - Word-by-word text reveal
- `TypewriterEffect` - Classic typewriter with cursor
- `FlipWords` - Rotating word carousel
- `CharacterReveal` / `WordReveal` / `LineReveal` - Scroll-triggered reveals
- `GradientText` - Animated gradient text
- `NeonText` - Neon glow effect
- `ShinyText` - Shimmer text effect

### 🃏 Cards
- `TiltCard` / `Card3D` - 3D perspective on hover
- `GlowCard` - Cursor-following glow effect
- `BorderBeam` / `BeamCard` - Animated border gradient
- `EvervaultCard` - Matrix-style character scramble
- `BentoGrid` / `BentoGridItem` - Asymmetric grid layouts
- `FeatureCard` - Premium feature card
- `DirectionalHoverCard` - Direction-aware overlay
- `WobbleCard` / `FloatingCard` - Physics-based movement

### 📜 Scroll Animations
- `InfiniteScroll` / `LogoScroll` / `TestimonialScroll` - Marquee effects
- `Parallax` / `ParallaxGallery` - Depth effects
- `TextParallax` / `VelocityText` - Large scrolling text
- `StickyReveal` - Pinned scroll sections
- `HorizontalScroll` - Horizontal scroll sections
- `FadeIn` / `ScaleOnScroll` / `RotateOnScroll` - Basic scroll triggers
- `StaggerOnScroll` / `StaggerItem` - Staggered children animations
- `ScrollProgress` - Progress indicator bar
- `ZoomParallax` - Image zoom on scroll

### 🌐 3D Components
- `FloatingShapes` - Distorted spheres, toruses, icosahedrons
- `ParticleField` - 3D particle systems
- `Globe` - Wireframe/dotted interactive globe

### 🎯 Interactive Effects
- `MagneticButton` - Cursor-following button
- `ShinyButton` - Shine on hover
- `GradientBorderButton` - Animated gradient border
- `LiquidButton` - Liquid fill effect
- `GlitchButton` - RGB glitch effect
- `ExpandingButton` - Expand on hover
- `CustomCursor` - Dot, ring, blend modes
- `CursorTrail` - Trail effect
- `SpotlightCursor` - Spotlight follows cursor
- `AnimatedInput` - Floating label inputs
- `GlowingSearch` - Search with glow effect
- `AnimatedCheckbox` - Animated checkmark

### 📐 Layouts
- `SpotlightHero` - Hero with spotlight background
- `GradientHero` - Hero with gradient mesh
- `AnimatedWordsHero` - Hero with rotating words
- `SplitHero` - Two-column hero
- `MinimalHero` - Clean, minimal hero
- `Section` / `Container` / `SectionHeader` - Layout primitives
- `FeaturesSection` / `BentoSection` / `StatsSection` - Pre-built sections
- `CTASection` - Call-to-action section
- `Footer` - Multi-column footer

### 🪝 Hooks
- `useLenis` / `useLenisScroll` - Smooth scroll integration
- `useGsap` / `useScrollTrigger` / `useParallax` - GSAP helpers
- `useTextReveal` / `useMagnetic` - Animation hooks
- `useMousePosition` / `useSmoothMouse` / `useMouseVelocity` - Mouse tracking

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/yourusername/awwwards-ui.git
cd awwwards-ui

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the demo.

---

## Usage

### Import Components

```tsx
import {
  SpotlightHero,
  TextGenerateEffect,
  TiltCard,
  MagneticButton,
  FadeIn
} from "@/components";
```

### Example: Hero Section

```tsx
import { SpotlightHero } from "@/components/layout";
import { MagneticButton } from "@/components/effects";

export function Hero() {
  return (
    <SpotlightHero
      title="Build Something Amazing"
      subtitle="The Ultimate Toolkit"
      description="50+ premium components ready to use."
      primaryCTA={{ text: "Get Started", href: "/docs" }}
      secondaryCTA={{ text: "View Demo", href: "/demo" }}
    />
  );
}
```

### Example: Animated Text

```tsx
import { TextGenerateEffect, FlipWords, CharacterReveal } from "@/components/text";

export function TextDemo() {
  return (
    <div>
      {/* Word by word reveal */}
      <TextGenerateEffect words="Every word appears one at a time." />

      {/* Rotating words */}
      <h1>
        Build apps{" "}
        <FlipWords words={["faster", "smarter", "better"]} className="text-purple-400" />
      </h1>

      {/* Character by character */}
      <CharacterReveal text="Animated letter by letter." />
    </div>
  );
}
```

### Example: 3D Globe

```tsx
import { Globe } from "@/components/three";

export function GlobeSection() {
  return (
    <div className="h-[500px]">
      <Globe variant="dotted" color="#8B5CF6" interactive />
    </div>
  );
}
```

### Example: Scroll Animations

```tsx
import { FadeIn, Parallax, ScrollProgress } from "@/components/scroll";

export function ScrollDemo() {
  return (
    <>
      <ScrollProgress color="bg-gradient-to-r from-purple-500 to-pink-500" />

      <FadeIn direction="up" delay={0.2}>
        <h2>I fade in from below</h2>
      </FadeIn>

      <Parallax speed={0.5}>
        <img src="/image.jpg" alt="" />
      </Parallax>
    </>
  );
}
```

---

## Tech Stack

| Library | Purpose | Why |
|---------|---------|-----|
| **GSAP** | Complex timelines, ScrollTrigger | Industry standard, best performance |
| **Framer Motion** | Declarative animations, gestures | Best React DX, layout animations |
| **Lenis** | Smooth scroll | Used by top agencies |
| **React Three Fiber** | 3D scenes | Three.js for React |
| **Tailwind CSS** | Styling | Utility-first, fast iteration |
| **TypeScript** | Type safety | Full autocomplete, fewer bugs |

---

## File Structure

```
src/
├── app/
│   ├── globals.css      # Global styles + CSS variables
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Demo page
├── components/
│   ├── backgrounds/     # Aurora, spotlight, meteors, etc.
│   ├── text/            # Text animations
│   ├── cards/           # Card components
│   ├── scroll/          # Scroll animations
│   ├── three/           # 3D components
│   ├── effects/         # Buttons, cursors, inputs
│   ├── layout/          # Hero sections, layouts
│   └── index.ts         # All exports
├── hooks/               # Custom hooks
│   ├── use-lenis.ts
│   ├── use-gsap.ts
│   ├── use-mouse-position.ts
│   └── index.ts
└── lib/
    └── utils.ts         # Utility functions
```

---

## Customization

### Colors

Edit `tailwind.config.ts` to change the color scheme:

```ts
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: "hsl(var(--primary))",
        // Add your colors
      }
    }
  }
}
```

### Animations

Edit `tailwind.config.ts` to add custom animations:

```ts
animation: {
  "my-animation": "my-keyframes 2s ease infinite",
},
keyframes: {
  "my-keyframes": {
    "0%, 100%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.1)" },
  }
}
```

---

## Performance Tips

1. **Lazy load 3D components** - Use `next/dynamic` with `ssr: false`
2. **Reduce particle count** on mobile
3. **Use `will-change`** for animated elements
4. **Prefer CSS animations** for simple effects
5. **Debounce scroll handlers** where possible

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

*Note: Three.js components require WebGL support.*

---

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## Credits

Inspired by:
- [Aceternity UI](https://ui.aceternity.com)
- [Magic UI](https://magicui.design)
- [21st.dev](https://21st.dev)
- [Awwwards](https://awwwards.com)

Built with:
- [GSAP](https://greensock.com/gsap/)
- [Framer Motion](https://framer.com/motion/)
- [Lenis](https://lenis.studiofreight.com/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

---

## License

MIT © itsjwill

---

**Stop building basic. Start building legendary.**
