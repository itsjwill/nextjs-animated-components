# How to Prompt for MotionCraft

Get the best results from AI assistants (Claude, ChatGPT, Cursor, etc.) when using this library.

---

## Quick Reference

| Want This | Say This |
|-----------|----------|
| Premium hero | "Use `SpotlightHero` or `GradientHero`" |
| Feature grid | "Use `BentoGrid` with `FeatureIcon`" |
| Good buttons | "Use `MagneticButton` or `IconButton` - no generic AI look" |
| Cool layouts | "Use `MasonryGrid`, `Timeline`, or `SplitLayout`" |
| Star ratings in Google | "Add `AggregateRatingJsonLd`" |
| Social sharing | "Add `SocialShare` component" |
| Check SEO issues | "Add `SEOAnalyzer`" |
| Analytics | "Add `GoogleAnalytics` or `PlausibleAnalytics`" |

---

## Building a New Site

### Template Prompt

```
Build a [TYPE] landing page for [PRODUCT] using motioncraft:

- Hero: [SpotlightHero/GradientHero/AnimatedWordsHero] with [details]
- Features: BentoGrid with [X] features, use FeatureIcon (not generic icon boxes)
- [Additional sections you need]
- CTA: MagneticButton, [style]
- SEO: [Schemas needed], [Analytics provider] ([ID])

Style: [Dark/Light] theme, [Reference site]-inspired, minimal. No AI-looking elements.
```

### Example: SaaS Landing Page

```
Build a SaaS landing page for my AI writing tool using motioncraft:

- Hero: SpotlightHero with animated gradient, headline "Write 10x Faster"
- Features: BentoGrid with 6 features, use FeatureIcon (not generic icon boxes)
- Social proof: StatsCard showing "10K+ users", "50M+ words generated"
- Pricing: 3 tiers with billing toggle
- FAQ: Use FAQJsonLd for SEO
- CTA: MagneticButton, dark style
- SEO: SoftwareJsonLd ($29/mo), FAQJsonLd, GoogleAnalytics (G-XXXXX)

Style: Dark theme, Linear/Vercel-inspired, minimal. No AI-looking elements.
```

### Example: Portfolio Site

```
Build a portfolio site for a designer using motioncraft:

- Hero: MinimalHero with my name and title
- Work: MasonryGrid showcasing 8 projects with ImageHoverReveal
- About: SplitLayout with photo on left, bio on right
- Contact: AnimatedInput fields, MagneticButton submit
- Navigation: CustomCursor (MorphingCursor variant)
- SEO: PersonJsonLd, Breadcrumbs on each page

Style: Light theme with dark accents, lots of whitespace. Apple-inspired.
```

### Example: Agency Site

```
Build an agency landing page using motioncraft:

- Hero: GradientHero with FlipWords rotating through services
- Services: Timeline showing our process (4 steps)
- Work: HorizontalScroll gallery of case studies
- Team: BentoGrid with team member cards
- Testimonials: TestimonialScroll marquee
- CTA: ExpandingButton with "Let's Talk"
- Cursor: SpotlightCursor for dramatic effect
- SEO: OrganizationJsonLd, LocalBusinessJsonLd

Style: Dark theme, Awwwards-worthy, bold typography.
```

---

## Enhancing an Existing Site

### Quick Reference - What to Say

| Want This | Say This |
|-----------|----------|
| Better hero | "Replace my hero with SpotlightHero, keep my text" |
| Better buttons | "Replace all buttons with MagneticButton" |
| Better cards | "Convert my cards to TiltCard with GlowCard hover" |
| Smooth scroll | "Add Lenis smooth scroll and ScrollProgress bar" |
| Animations | "Add FadeIn to sections, StaggerOnScroll to cards" |
| SEO | "Add SoftwareJsonLd ($29/mo, 4.8 stars), GoogleAnalytics (G-XXX)" |
| Less generic | "Replace generic gradient icon boxes with FeatureIcon" |
| Dark mode | "Wrap app with ThemeProvider, add ThemeToggle to navbar" |

### Basic Enhancement (Copy-Paste This)

```
I have an existing Next.js site. Enhance it with motioncraft:

- Replace hero with SpotlightHero (keep my text)
- Replace buttons with MagneticButton
- Convert feature cards to TiltCard in BentoGrid
- Add FadeIn animation to sections
- Add Lenis smooth scroll
- Add GoogleAnalytics (G-XXXXX)

Keep my existing colors and layout. Don't change navigation.
```

### Template Prompt

```
I have an existing [FRAMEWORK] site at [PATH/URL]. Enhance it with motioncraft:

Current issues:
- [List what's wrong or boring]

Add these enhancements:
- [Specific components/effects]

Keep:
- [What should stay the same]

Don't:
- [What to avoid]
```

### Example: Make Hero Section Premium

```
I have an existing Next.js site. The hero section is boring - just text and a button.

Enhance it with motioncraft:
- Add Spotlight background effect behind the hero
- Replace the button with MagneticButton
- Add TextGenerateEffect to the headline
- Add subtle FadeIn animation to the description

Keep the same text content and colors. Don't change the layout structure.
```

### Example: Add Animations to Cards

```
My site has a features section with 6 plain cards. Make them premium:

- Convert to BentoGrid layout (2 large, 4 small)
- Add TiltCard effect on hover
- Use FeatureIcon for the icons (not generic rounded boxes)
- Add StaggerOnScroll so they animate in one by one

Keep the same content. Match my existing dark theme.
```

### Example: Improve Scroll Experience

```
My landing page feels static. Add scroll-based enhancements:

- Add Lenis smooth scrolling
- Add ScrollProgress bar at the top
- Make sections FadeIn as they enter viewport
- Add Parallax effect to the hero image
- Use VelocityText for a large scrolling tagline between sections

Don't slow down page load. Keep it performant.
```

### Example: Add SEO to Existing Site

```
My SaaS site has no structured data. Add SEO infrastructure:

- Add SoftwareJsonLd to the homepage (product is $49/mo, 4.8 stars, 200 reviews)
- Add FAQJsonLd to the FAQ section (I have 8 questions)
- Add Breadcrumbs component to all pages
- Add GoogleAnalytics (my ID is G-ABC123)
- Add SEOAnalyzer so I can audit pages in dev mode
- Add SocialShare buttons to the blog posts

Don't change any visual design.
```

### Example: Fix Generic AI Look

```
My site was built with Cursor/v0 and looks like every other AI-generated site.

Replace these generic elements with motioncraft:
- The rounded gradient icon boxes → use FeatureIcon or IconButton instead
- The basic buttons → use MagneticButton or ShinyButton
- The plain cards → use GlowCard or TiltCard
- The static hero → add Spotlight background

Keep the layout. Just make it look less "template-y".
```

### Example: Add Dark Mode

```
My site is light-only. Add proper dark mode:

- Wrap app with ThemeProvider
- Add ThemeToggle to the navbar
- Make sure all motioncraft components respect the theme

Current colors: white background, black text, purple accent.
Dark mode should: black background, white text, keep purple accent.
```

### Example: Enhance Blog Post Pages

```
My blog posts are plain. Enhance the reading experience:

- Add ArticleJsonLd for SEO
- Add Breadcrumbs at the top
- Add ScrollProgress indicator
- Add SocialShare buttons at the end
- Add CharacterReveal on the title
- Add ImageReveal on the hero image

Keep the content and layout. Just add polish.
```

---

## What to Specify

### 1. Be Specific About Style

**Bad:** "Make it look good"

**Good:** "Dark theme, Vercel-inspired, minimal with lots of whitespace"

**Great:** "Dark theme (#0a0a0a background), subtle purple accents (#8b5cf6), Inter font, no shadows, clean borders"

### 2. Reference Sites You Like

```
Style it like:
- Linear.app (clean, minimal, great animations)
- Vercel.com (dark, professional, subtle effects)
- Stripe.com (light, trustworthy, polished)
- Apple.com (lots of whitespace, premium feel)
```

### 3. Say What You Hate

```
Avoid:
- Rounded gradient icon boxes (looks like every AI site)
- Too many shadows
- Overly colorful gradients
- Generic stock photos
- "AI-generated" aesthetic
```

### 4. Specify Components by Name

```
Use these specific components:
- SpotlightHero (not GradientHero)
- MagneticButton (not regular button)
- BentoGrid with FeatureIcon (not plain cards)
- GlowCard (not basic card)
```

---

## SEO Setup Checklist

When asking for SEO, specify:

```
SEO Requirements:
- [ ] SoftwareJsonLd (price: $X, rating: X.X, reviews: XXX)
- [ ] FAQJsonLd (X questions)
- [ ] OrganizationJsonLd (company name, logo URL, social links)
- [ ] Breadcrumbs on all pages
- [ ] GoogleAnalytics (ID: G-XXXXX)
- [ ] SocialShare (platforms: linkedin, twitter, facebook)
- [ ] SEOAnalyzer (dev mode only)
- [ ] WebVitalsReporter (report to GA)
```

---

## Common Mistakes to Avoid

### Don't Say This

❌ "Add some animations"
❌ "Make it look modern"
❌ "Add SEO"
❌ "Use motioncraft"

### Say This Instead

✅ "Add FadeIn animation to the features section, StaggerOnScroll for the cards"
✅ "Dark theme, Linear-inspired, MagneticButton CTAs, GlowCard features"
✅ "Add SoftwareJsonLd ($29/mo, 4.8 stars), FAQJsonLd, GoogleAnalytics G-XXX"
✅ "Use SpotlightHero, BentoGrid with FeatureIcon, MagneticButton"

---

## Full Example Prompts

### Build From Scratch

```
Build a complete SaaS landing page for "TaskFlow" - a project management tool.

Components to use:
- SpotlightHero with headline "Ship Projects 2x Faster"
- FlipWords rotating: "teams", "agencies", "startups"
- BentoGrid (6 features): Kanban, Timeline, Docs, Chat, Analytics, Integrations
- Use FeatureIcon for feature icons (NOT generic gradient boxes)
- StatsSection: "10K+ teams", "1M+ tasks completed", "99.9% uptime"
- TestimonialScroll with 5 testimonials
- Pricing: 3 tiers (Free $0, Pro $12/mo, Team $29/mo)
- FAQJsonLd with 6 questions
- MagneticButton for all CTAs
- Footer with 4 columns

SEO:
- SoftwareJsonLd (Pro tier pricing, 4.9 stars, 500 reviews)
- FAQJsonLd
- OrganizationJsonLd
- GoogleAnalytics (G-ABC123)
- SocialShare (linkedin priority)

Style: Dark theme (#09090b), purple accent (#8b5cf6), Inter font.
Inspired by: Linear, Notion, Vercel
Avoid: Generic AI look, too many gradients, rounded icon boxes
```

### Enhance Existing

```
I have a Next.js marketing site at /marketing-site. It's functional but boring.

Current state:
- Plain white background
- Basic Tailwind cards
- Static text, no animations
- No SEO structured data
- Generic buttons

Enhance with motioncraft:
1. Add Lenis smooth scroll
2. Replace hero with SpotlightHero (keep my headline text)
3. Convert feature cards to TiltCard inside BentoGrid
4. Add FadeIn to all sections
5. Replace buttons with MagneticButton
6. Add CustomCursor (dot style)
7. Add SoftwareJsonLd, FAQJsonLd, Breadcrumbs
8. Add GoogleAnalytics (G-XYZ789)

Keep:
- All text content
- Color scheme (white/black/blue)
- Page structure

Don't:
- Change the navigation
- Add dark mode (client wants light only)
- Add 3D elements (keep it simple)
```

---

## Quick Wins (Copy-Paste Prompts)

### "Make my hero premium"
```
Replace my hero section with SpotlightHero. Add TextGenerateEffect to the headline. Use MagneticButton for the CTA. Keep my existing text.
```

### "Add smooth scrolling"
```
Add Lenis smooth scroll to my site. Wrap the layout with the provider. Add ScrollProgress bar at the top.
```

### "Fix generic buttons"
```
Replace all my buttons with MagneticButton. For icon buttons, use IconButton with ghost variant. No generic AI-looking buttons.
```

### "Add basic SEO"
```
Add OrganizationJsonLd (company: "X", url: "Y"), SoftwareJsonLd (price $Z), and GoogleAnalytics (G-XXX) to my layout.
```

### "Make cards interactive"
```
Convert my feature cards to TiltCard. Add a subtle GlowCard effect on hover. Use StaggerOnScroll so they animate in.
```

---

**Remember: The more specific you are, the better the output.**
