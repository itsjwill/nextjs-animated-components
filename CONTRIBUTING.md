# Contributing to MotionCraft

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

```bash
git clone https://github.com/itsjwill/motioncraft.git
cd motioncraft
npm install
npm run dev
```

## Adding a New Component

1. Create your component in the appropriate directory under `src/components/`
2. Make it direction-aware using `useTheme()` from `@/lib/theme`
3. Add motion presets using `getMotionPreset()` from `@/lib/motion`
4. Add an entry to `src/lib/component-registry.ts`
5. Run `npm run build` to verify it compiles

### Component Guidelines

- All components must be TypeScript with proper prop interfaces
- Use `"use client"` directive for interactive components
- Support all 4 directions (luxury, cyberpunk, kinetic, freestyle)
- Keep bundle size minimal — dynamic import heavy dependencies
- Follow existing naming conventions

### Directory Structure

| Category | Directory | Examples |
|----------|-----------|----------|
| Backgrounds | `components/backgrounds/` | aurora, gradient-mesh, infinite-grid |
| Cards | `components/cards/` | stack-cards, glow-card, tilt-card |
| Effects | `components/effects/` | fluid-cursor, text-distortion |
| Layout | `components/layout/` | animated-masonry |
| Navigation | `components/navigation/` | morphing-nav |
| Scroll | `components/scroll/` | scroll-video, parallax |
| Text | `components/text/` | split-screen-text |
| Three.js | `components/three/` | particle-morph |
| Transitions | `components/transitions/` | noise-transition |

## Pull Requests

1. Fork and create a branch from `main`
2. Add your changes
3. Ensure `npm run build` passes
4. Open a PR with a clear description

## Issues

- Use the bug report template for bugs
- Use the feature request template for new component ideas
- Include browser/OS info for visual bugs

## Code Style

- Use Tailwind CSS utility classes
- Prefer Framer Motion for React-integrated animations
- Use GSAP for complex timelines and ScrollTrigger
- Keep components self-contained (no global state leaks)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
