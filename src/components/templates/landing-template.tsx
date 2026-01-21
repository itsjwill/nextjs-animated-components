"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MagneticButton, GradientBorderButton } from "@/components/effects/magnetic-button";
import { TextGenerateEffect } from "@/components/text";
import { GradientText } from "@/components/text/gradient-text";
import { FadeIn, ScrollProgress, InfiniteScroll } from "@/components/scroll";
import {
  Section,
  Container,
  SectionHeader,
  FeaturesSection,
  StatsSection,
  CTASection,
  Footer,
} from "@/components/layout/sections";

// =============================================================================
// Landing Page Template
// =============================================================================
// A complete landing page template with hero, features, stats, CTA, and footer
// Customize by passing your own content through props

export interface HeroContent {
  badge?: string;
  title: string;
  subtitle?: string;
  primaryCTA?: { text: string; href: string; onClick?: () => void };
  secondaryCTA?: { text: string; href: string; onClick?: () => void };
}

export interface Feature {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

export interface LandingTemplateProps {
  /** Hero section content */
  hero: HeroContent;
  /** Features section (optional) */
  features?: {
    badge?: string;
    title: string;
    description?: string;
    items: Feature[];
  };
  /** Stats section (optional) */
  stats?: Stat[];
  /** Testimonials (optional) */
  testimonials?: Testimonial[];
  /** Scrolling text marquee (optional) */
  marqueeItems?: string[];
  /** CTA section (optional) */
  cta?: {
    title: string;
    description?: string;
    primaryCTA?: { text: string; href: string };
    secondaryCTA?: { text: string; href: string };
  };
  /** Footer content */
  footer: {
    logo?: ReactNode;
    columns?: { title: string; links: { label: string; href: string }[] }[];
    bottomText?: string;
  };
  /** Custom hero background (optional) */
  heroBackground?: ReactNode;
  /** Show scroll progress indicator */
  showScrollProgress?: boolean;
  /** Additional CSS class for the main container */
  className?: string;
}

export function LandingTemplate({
  hero,
  features,
  stats,
  testimonials,
  marqueeItems,
  cta,
  footer,
  heroBackground,
  showScrollProgress = true,
  className,
}: LandingTemplateProps) {
  return (
    <main className={cn("relative", className)}>
      {showScrollProgress && <ScrollProgress />}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {heroBackground}

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          {hero.badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="px-4 py-2 text-sm font-medium text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
                {hero.badge}
              </span>
            </motion.div>
          )}

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8">
            <TextGenerateEffect words={hero.title} />
          </h1>

          {hero.subtitle && (
            <motion.p
              className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              {hero.subtitle}
            </motion.p>
          )}

          {(hero.primaryCTA || hero.secondaryCTA) && (
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {hero.primaryCTA && (
                <MagneticButton onClick={hero.primaryCTA.onClick}>
                  {hero.primaryCTA.text}
                </MagneticButton>
              )}
              {hero.secondaryCTA && (
                <GradientBorderButton onClick={hero.secondaryCTA.onClick}>
                  {hero.secondaryCTA.text}
                </GradientBorderButton>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Marquee Section */}
      {marqueeItems && marqueeItems.length > 0 && (
        <Section className="bg-zinc-950 overflow-hidden py-8">
          <InfiniteScroll speed="slow">
            {marqueeItems.map((item, i) => (
              <div
                key={i}
                className="px-8 py-4 bg-zinc-900 rounded-full border border-zinc-800 whitespace-nowrap text-zinc-300"
              >
                {item}
              </div>
            ))}
          </InfiniteScroll>
        </Section>
      )}

      {/* Features Section */}
      {features && (
        <FeaturesSection
          badge={features.badge}
          title={features.title}
          description={features.description}
          features={features.items}
        />
      )}

      {/* Stats Section */}
      {stats && stats.length > 0 && <StatsSection stats={stats} />}

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <Section className="bg-black">
          <Container>
            <SectionHeader badge="Testimonials" title="What People Say" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
                    <p className="text-zinc-300 mb-6 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3">
                      {testimonial.avatar ? (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                          {testimonial.author[0]}
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-white">{testimonial.author}</div>
                        <div className="text-sm text-zinc-500">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA Section */}
      {cta && (
        <CTASection
          title={cta.title}
          description={cta.description}
          primaryCTA={cta.primaryCTA}
          secondaryCTA={cta.secondaryCTA}
        />
      )}

      {/* Footer */}
      <Footer
        logo={
          footer.logo || (
            <div className="text-2xl font-bold">
              <GradientText gradient="from-purple-400 to-pink-400">Logo</GradientText>
            </div>
          )
        }
        columns={footer.columns}
        bottomText={footer.bottomText}
      />
    </main>
  );
}
