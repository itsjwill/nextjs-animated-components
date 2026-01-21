# Awwwards UI

> The ultimate web animation toolkit. Build Awwwards-worthy sites without hiring a $50k agency.

**GSAP + Framer Motion + Lenis + Three.js + 80+ components. All in one.**

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

### Backgrounds
- `AuroraBackground` - Animated aurora borealis effect
- `Spotlight` / `Spotlights` - Dramatic spotlight overlays
- `Meteors` / `ShootingStars` - Falling meteor animations
- `GridBackground` / `GridBeams` / `PerspectiveGrid` - Grid patterns with effects
- `GradientBlob` / `GradientBackground` - Animated gradient meshes
- `Particles` / `Sparkles` - Canvas-based particle systems

**Shader Backgrounds (NEW!)**
- `NoiseGradientBackground` - Animated noise-based gradient with simplex noise
- `LiquidMetalBackground` - Metallic liquid surface with reflections
- `WaveDistortionBackground` - Sine wave distortion patterns
- `PlasmaBackground` - Classic plasma animation effect
- `OrganicBlobBackground` - Morphing organic blob shapes
- `GlitchBackground` - Cyberpunk glitch effect with scanlines

### Text Animations
- `TextGenerateEffect` - Word-by-word text reveal
- `TypewriterEffect` - Classic typewriter with cursor
- `FlipWords` - Rotating word carousel
- `CharacterReveal` / `WordReveal` / `LineReveal` - Scroll-triggered reveals
- `GradientText` - Animated gradient text
- `NeonText` - Neon glow effect
- `ShinyText` - Shimmer text effect

### Cards
- `TiltCard` / `Card3D` - 3D perspective on hover
- `GlowCard` - Cursor-following glow effect
- `BorderBeam` / `BeamCard` - Animated border gradient
- `EvervaultCard` - Matrix-style character scramble
- `BentoGrid` / `BentoGridItem` - Asymmetric grid layouts
- `FeatureCard` - Premium feature card
- `DirectionalHoverCard` - Direction-aware overlay
- `WobbleCard` / `FloatingCard` - Physics-based movement

### Scroll Animations
- `InfiniteScroll` / `LogoScroll` / `TestimonialScroll` - Marquee effects
- `Parallax` / `ParallaxGallery` - Depth effects
- `TextParallax` / `VelocityText` - Large scrolling text
- `StickyReveal` - Pinned scroll sections
- `HorizontalScroll` - Horizontal scroll sections
- `FadeIn` / `ScaleOnScroll` / `RotateOnScroll` - Basic scroll triggers
- `StaggerOnScroll` / `StaggerItem` - Staggered children animations
- `ScrollProgress` - Progress indicator bar
- `ZoomParallax` - Image zoom on scroll

**GSAP ScrollTrigger (NEW!)**
- `PinnedSection` - Pin content while scrolling through viewport
- `HorizontalScrollSection` - Timeline-based horizontal scroll with pinning
- `ScrubAnimation` - Animate elements based on scroll position (fade, scale, rotate, slideX, slideY)
- `ParallaxLayer` / `ParallaxContainer` - Multi-layer parallax with different speeds
- `RevealOnScroll` - Staggered reveal animations on scroll
- `TextRevealScrub` - Text that reveals character-by-character based on scroll
- `CounterAnimation` - Numbers that count up on scroll
- `SplitScreenScroll` - Two sections scrolling at different rates
- `ZoomScroll` - Element that zooms based on scroll position

### 3D Components
- `FloatingShapes` - Distorted spheres, toruses, icosahedrons
- `ParticleField` - 3D particle systems
- `Globe` - Wireframe/dotted interactive globe

### Interactive Effects
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

**Advanced Cursors (NEW!)**
- `MagneticCursor` - Cursor that sticks to interactive elements
- `MorphingCursor` - Changes shape based on hovered element (circle, arrow, text, play, drag)
- `TextLabelCursor` - Shows contextual text labels on hover
- `ParticleCursor` - Leaves particle trails when moving
- `GlowCursor` - Large circular glow that follows cursor
- `CrosshairCursor` - Precise crosshair with optional coordinates

**Image/Video Reveal (NEW!)**
- `ImageReveal` - Various reveal animations (wipe, blinds, pixelate, curtain, zoom, split, diagonal)
- `ParallaxImage` - Image with parallax scrolling effect
- `VideoReveal` - Video that reveals on scroll (fade, scale, wipe, mask)
- `ImageComparison` - Before/after slider comparison
- `ImageHoverReveal` - Reveals different image on hover
- `MediaGallery` - Gallery with lightbox
- `ScrollVideo` - Video that scrubs based on scroll position
- `KenBurnsImage` - Slow zoom/pan Ken Burns effect
- `DistortionImage` - Image distortion on mouse movement

### Layouts
- `SpotlightHero` - Hero with spotlight background
- `GradientHero` - Hero with gradient mesh
- `AnimatedWordsHero` - Hero with rotating words
- `SplitHero` - Two-column hero
- `MinimalHero` - Clean, minimal hero
- `Section` / `Container` / `SectionHeader` - Layout primitives
- `FeaturesSection` / `BentoSection` / `StatsSection` - Pre-built sections
- `CTASection` - Call-to-action section
- `Footer` - Multi-column footer

### SEO Components (Complete SEO Toolkit!)

**Auto-SEO**
- `AutoSEO` - **DROP-IN AUTOMATIC SEO** - Extracts keywords, generates metadata, creates JSON-LD
- `SEOSetup` - Beautiful setup wizard for first-time configuration
- `SEOAnalyzer` - Real-time page audit tool (score out of 100)
- `SEOHead` - Auto-generates Organization, Website, Software schemas

**JSON-LD Schemas (15 types)**
- `JsonLd` - Type-safe base component using Google's schema-dts
- `OrganizationJsonLd` - Company/organization info
- `WebsiteJsonLd` - Site-wide data + search action
- `ArticleJsonLd` - Blog posts/articles
- `ProductJsonLd` - E-commerce products
- `FAQJsonLd` - FAQ sections (rich snippets in Google)
- `BreadcrumbJsonLd` - Navigation breadcrumbs
- `VideoJsonLd` - Video content
- `LocalBusinessJsonLd` - Physical business locations
- `EventJsonLd` - Events
- `CourseJsonLd` - Educational content
- `SoftwareJsonLd` - Software/apps
- `ReviewJsonLd` - Individual reviews
- `AggregateRatingJsonLd` - Star ratings in Google search
- `ServiceJsonLd` - Services offered
- `HowToJsonLd` - Step-by-step tutorials

**Visual Breadcrumbs**
- `Breadcrumbs` - Visual navigation + SEO schema (4 variants)
- `CollapsibleBreadcrumbs` - Collapses long paths
- `AutoBreadcrumbs` - Auto-generates from URL path

**Social Share**
- `SocialShare` - 9 platforms (Twitter, LinkedIn, Facebook, Reddit, HN, Pinterest, WhatsApp, Telegram, Email)
- `NativeShare` - Web Share API button
- `ShareCountButton` - Share with count display

**Analytics (5 providers)**
- `GoogleAnalytics` - GA4 integration
- `PlausibleAnalytics` - Privacy-friendly analytics
- `FathomAnalytics` - Simple, privacy-first
- `UmamiAnalytics` - Self-hosted option
- `PostHogAnalytics` - Product analytics
- `Analytics` - Universal component (configure multiple)

**Canonical & Pagination**
- `Canonical` - Prevents duplicate content penalties
- `HrefLangTags` - Multilingual site support
- `PaginationLinks` - rel="prev/next" for paginated content

**RSS Feeds**
- `generateRSS()` - RSS 2.0 (with podcast support)
- `generateAtom()` - Atom feed format
- `generateJsonFeed()` - Modern JSON Feed format

**Web Vitals**
- `WebVitalsReporter` - Reports CLS, FCP, FID, INP, LCP, TTFB to GA or custom endpoint
- `WebVitalsDisplay` - Visual dashboard component
- `useWebVitals` - Hook for custom handling

**Utilities**
- `generateMetadata` - Next.js metadata generator
- `extractKeywords` - NLP keyword extraction
- `getCanonicalUrl` - Canonical URL helper

### Theme System
- `ThemeProvider` - Context provider with light/dark/system mode support
- `ThemeToggle` - Animated sun/moon toggle button
- `ThemeToggleSwitch` - Pill-style toggle switch
- `ThemeSelector` - Dropdown with Light/Dark/System options
- `useTheme` - Hook to access and control theme state

### Page Templates
- `LandingTemplate` - Complete landing page with hero, features, stats, testimonials, CTA
- `PricingTemplate` - Pricing page with tier cards, billing toggle, FAQ accordion
- `AboutTemplate` - About page with team, timeline, values, mission sections

### Hooks
- `useLenis` / `useLenisScroll` - Smooth scroll integration
- `useGsap` / `useScrollTrigger` / `useParallax` - GSAP helpers
- `useTextReveal` / `useMagnetic` - Animation hooks
- `useMousePosition` / `useSmoothMouse` / `useMouseVelocity` - Mouse tracking
- `useWebVitals` - Track Core Web Vitals (CLS, FCP, FID, INP, LCP, TTFB)
- `WebVitalsReporter` - Drop-in component for Web Vitals tracking

### API Routes
- `/api/og` - Dynamic OG Image generator for social sharing

---

## 📖 Prompting Guide

**Want the best results when using AI to build with Awwwards UI?**

See **[PROMPTING.md](./PROMPTING.md)** for:
- Template prompts for building new sites
- Template prompts for enhancing existing sites
- Quick reference table (what to say for each component)
- SEO setup checklist
- Full example prompts you can copy-paste
- Common mistakes to avoid

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/itsjwill/awwwards-ui.git
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
  FadeIn,
  SEOHead,
  ArticleJsonLd
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

### Example: SEO with Structured Data

```tsx
// app/blog/[slug]/page.tsx
import { ArticleJsonLd, generateMetadata } from "@/components/seo";

export const metadata = generateMetadata({
  title: "How to Build Awwwards-Worthy Sites",
  description: "Learn the secrets behind award-winning web design",
  canonical: "/blog/awwwards-secrets"
});

export default function BlogPost() {
  return (
    <>
      <ArticleJsonLd
        headline="How to Build Awwwards-Worthy Sites"
        description="Learn the secrets behind award-winning web design"
        url="https://awwwards-ui.com/blog/awwwards-secrets"
        datePublished="2024-01-15"
        author={{ name: "itsjwill" }}
        image="/blog/hero.jpg"
      />
      <article>
        {/* Your content */}
      </article>
    </>
  );
}
```

### Example: Product Page with SEO

```tsx
import { ProductJsonLd, FAQJsonLd } from "@/components/seo";

export default function ProductPage() {
  return (
    <>
      <ProductJsonLd
        name="Awwwards UI Pro"
        description="Premium animation components for React"
        brand="Awwwards UI"
        offers={{
          price: 99,
          priceCurrency: "USD",
          availability: "InStock"
        }}
        aggregateRating={{
          ratingValue: 4.9,
          reviewCount: 127
        }}
      />

      <FAQJsonLd
        items={[
          {
            question: "What frameworks are supported?",
            answer: "Awwwards UI works with Next.js 13+ and React 18+"
          },
          {
            question: "Is it TypeScript compatible?",
            answer: "Yes! Full TypeScript support with auto-complete."
          }
        ]}
      />

      {/* Page content */}
    </>
  );
}
```

### Example: Theme Toggle

```tsx
// app/layout.tsx - Wrap your app with ThemeProvider
import { ThemeProvider } from "@/components/effects";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// In any component - Add a theme toggle
import { ThemeToggle, ThemeSelector } from "@/components/effects";

export function Navbar() {
  return (
    <nav>
      {/* Animated sun/moon button */}
      <ThemeToggle size="md" />

      {/* Or use a dropdown selector */}
      <ThemeSelector />
    </nav>
  );
}
```

### Example: Web Vitals Tracking

```tsx
// Track Core Web Vitals with custom handler
import { useWebVitals, WebVitalsReporter } from "@/hooks";

// Option 1: Hook for custom handling
function MyApp() {
  useWebVitals({
    onReport: (metric) => {
      // Send to your analytics
      console.log(`${metric.name}: ${metric.value} (${metric.rating})`);
    },
    debug: true, // Log to console in development
  });

  return <App />;
}

// Option 2: Drop-in component
function Layout({ children }) {
  return (
    <>
      <WebVitalsReporter
        endpoint="/api/analytics"
        debug={process.env.NODE_ENV === "development"}
      />
      {children}
    </>
  );
}
```

### Example: Dynamic OG Images

```tsx
// Generate OG images dynamically
// URL: /api/og?title=My%20Title&description=Subtitle&theme=gradient

// In your page metadata:
export const metadata = {
  openGraph: {
    images: [
      {
        url: '/api/og?title=My%20Page&description=Amazing%20content',
        width: 1200,
        height: 630,
      }
    ]
  }
};

// Available parameters:
// - title: Main heading text
// - description: Subtitle text
// - theme: "dark" | "light" | "gradient"
// - badge: Small badge text above title
```

### Example: Page Templates

```tsx
// Landing Page - Complete landing page in one component
import { LandingTemplate } from "@/components/templates";

export default function Home() {
  return (
    <LandingTemplate
      hero={{
        badge: "Now in Beta",
        title: "Build Something Amazing",
        subtitle: "The ultimate toolkit for modern web development",
        primaryCTA: { text: "Get Started", href: "/signup" },
        secondaryCTA: { text: "Learn More", href: "/docs" },
      }}
      features={{
        badge: "Features",
        title: "Everything You Need",
        items: [
          { title: "Fast", description: "Blazing fast performance", icon: <ZapIcon /> },
          { title: "Secure", description: "Enterprise-grade security", icon: <ShieldIcon /> },
        ],
      }}
      stats={[
        { value: "50+", label: "Components" },
        { value: "100%", label: "TypeScript" },
      ]}
      cta={{
        title: "Ready to Start?",
        description: "Join thousands of developers building with Awwwards UI",
        primaryCTA: { text: "Get Started Free", href: "/signup" },
      }}
      footer={{
        columns: [
          { title: "Product", links: [{ label: "Features", href: "/features" }] },
        ],
        bottomText: "© 2024 Your Company",
      }}
    />
  );
}

// Pricing Page
import { PricingTemplate } from "@/components/templates";

export default function Pricing() {
  return (
    <PricingTemplate
      tiers={[
        {
          name: "Starter",
          description: "Perfect for side projects",
          monthlyPrice: 0,
          features: [
            { text: "5 projects", included: true },
            { text: "Community support", included: true },
            { text: "Priority support", included: false },
          ],
          ctaText: "Get Started",
          ctaHref: "/signup",
        },
        {
          name: "Pro",
          description: "For professional developers",
          monthlyPrice: 29,
          yearlyPrice: 290,
          popular: true,
          badge: "Most Popular",
          features: [
            { text: "Unlimited projects", included: true },
            { text: "Priority support", included: true },
            { text: "Custom domains", included: true },
          ],
          ctaText: "Start Free Trial",
          ctaHref: "/signup/pro",
        },
      ]}
      faq={[
        { question: "Can I cancel anytime?", answer: "Yes, cancel anytime with no fees." },
      ]}
      footer={{ bottomText: "© 2024 Your Company" }}
    />
  );
}
```

---

## SEO Features

Awwwards UI includes enterprise-grade SEO capabilities **that work automatically**.

### Auto-SEO (Zero Config!)

Just drop `<AutoSEO />` into any page and it:
1. **Scans your page content** automatically
2. **Extracts keywords** using NLP (no manual entry!)
3. **Generates JSON-LD** based on page type
4. **Creates metadata** from your actual content

```tsx
// That's it. Seriously.
import { AutoSEO } from "@/components/seo";

export default function AnyPage() {
  return (
    <>
      <AutoSEO />
      <h1>My Amazing Product</h1>
      <p>This content will be analyzed for keywords...</p>
    </>
  );
}
```

The component reads your page content and extracts keywords like:
- "product", "amazing", "react", "animation" (from your text)
- Tech keywords get boosted (react, nextjs, gsap, etc.)
- Stop words are filtered out automatically

### SEO Setup Wizard

First time a user installs your site, they see a beautiful wizard:

```tsx
import { SEOSetup } from "@/components/seo";

export default function Layout({ children }) {
  return (
    <>
      <SEOSetup onComplete={(config) => console.log(config)} />
      {children}
    </>
  );
}
```

The wizard asks for:
1. Site name
2. Site URL
3. Twitter handle (optional)

Then saves it to localStorage. Users can also add env vars to skip the wizard.

### Automatic Sitemap Generation

Sitemaps are auto-generated on build using `next-sitemap`:

```bash
npm run build  # Generates sitemap.xml and robots.txt
```

Configure in `next-sitemap.config.js`:

```js
module.exports = {
  siteUrl: 'https://your-domain.com',
  generateRobotsTxt: true,
  // Custom priority for important pages
  transform: async (config, path) => ({
    loc: path,
    priority: path === '/' ? 1.0 : 0.7,
    lastmod: new Date().toISOString()
  })
};
```

### Type-Safe Structured Data

Built on Google's `schema-dts` for full TypeScript support:

```tsx
import { JsonLd } from "@/components/seo";
import type { WithContext, Product } from "schema-dts";

// Full autocomplete and type checking
const product: WithContext<Product> = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Premium UI Kit",
  offers: {
    "@type": "Offer",
    price: "99.00",
    priceCurrency: "USD"
  }
};

<JsonLd data={product} />
```

### Metadata Generator

Generate consistent metadata across pages:

```tsx
// app/components/page.tsx
import { generateMetadata } from "@/components/seo";

export const metadata = generateMetadata({
  title: "Components",
  description: "Browse 50+ premium animation components",
  keywords: ["react components", "animation"],
  canonical: "/components"
});
```

### Available Schemas

| Component | Schema Type | Use Case |
|-----------|-------------|----------|
| `OrganizationJsonLd` | Organization | Company info |
| `WebsiteJsonLd` | WebSite | Site-wide data + search |
| `ArticleJsonLd` | Article | Blog posts |
| `ProductJsonLd` | Product | E-commerce |
| `FAQJsonLd` | FAQPage | FAQ sections |
| `BreadcrumbJsonLd` | BreadcrumbList | Navigation |
| `VideoJsonLd` | VideoObject | Video content |
| `LocalBusinessJsonLd` | LocalBusiness | Physical locations |
| `EventJsonLd` | Event | Events |
| `CourseJsonLd` | Course | Educational content |
| `SoftwareJsonLd` | SoftwareApplication | Apps/tools |
| `ReviewJsonLd` | Review | Individual reviews |
| `AggregateRatingJsonLd` | AggregateRating | Star ratings in Google |
| `ServiceJsonLd` | Service | Services offered |
| `HowToJsonLd` | HowTo | Step-by-step tutorials |

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
| **next-sitemap** | Sitemap generation | Auto sitemaps on build |
| **schema-dts** | JSON-LD types | Google's official schema types |

---

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── og/
│   │       └── route.tsx    # Dynamic OG image generator
│   ├── globals.css          # Global styles + CSS variables
│   ├── layout.tsx           # Root layout with SEO metadata
│   └── page.tsx             # Demo page
├── components/
│   ├── backgrounds/         # Aurora, spotlight, meteors, etc.
│   ├── text/                # Text animations
│   ├── cards/               # Card components
│   ├── scroll/              # Scroll animations
│   ├── three/               # 3D components
│   ├── effects/             # Buttons, cursors, inputs, theme toggle
│   │   └── theme-toggle.tsx # Dark/light mode system
│   ├── layout/              # Hero sections, layouts
│   ├── seo/                 # SEO components & JSON-LD
│   │   ├── json-ld.tsx      # Type-safe structured data
│   │   ├── auto-seo.tsx     # Automatic keyword extraction
│   │   ├── seo-setup.tsx    # Setup wizard component
│   │   ├── seo-head.tsx     # Auto-generated schemas
│   │   └── index.ts         # All SEO exports
│   ├── templates/           # Pre-built page templates
│   │   ├── landing-template.tsx
│   │   ├── pricing-template.tsx
│   │   ├── about-template.tsx
│   │   └── index.ts
│   └── index.ts             # All exports
├── hooks/                   # Custom hooks
│   ├── use-lenis.ts
│   ├── use-gsap.ts
│   ├── use-mouse-position.ts
│   ├── use-web-vitals.ts    # Core Web Vitals tracking
│   └── index.ts
└── lib/
    ├── utils.ts             # Utility functions
    ├── seo.ts               # SEO utilities & config
    └── auto-seo.ts          # Auto keyword extraction engine
```

---

## Environment Variables

```env
# Required for SEO
NEXT_PUBLIC_SITE_URL=https://your-domain.com
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
- [next-sitemap](https://github.com/iamvishnusankar/next-sitemap)
- [schema-dts](https://github.com/google/schema-dts)

---

## License

MIT © itsjwill

---

**Stop building basic. Start building legendary.**
