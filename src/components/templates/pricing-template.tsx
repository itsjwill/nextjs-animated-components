"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { MagneticButton, GradientBorderButton } from "@/components/effects/magnetic-button";
import { GradientText } from "@/components/text/gradient-text";
import { FadeIn } from "@/components/scroll";
import { Section, Container, SectionHeader, Footer } from "@/components/layout/sections";

// =============================================================================
// Pricing Page Template
// =============================================================================

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number | "custom";
  yearlyPrice?: number | "custom";
  features: PricingFeature[];
  ctaText: string;
  ctaHref: string;
  popular?: boolean;
  badge?: string;
}

export interface PricingFAQItem {
  question: string;
  answer: string;
}

export interface PricingTemplateProps {
  /** Page title */
  title?: string;
  /** Page subtitle */
  subtitle?: string;
  /** Pricing tiers */
  tiers: PricingTier[];
  /** FAQ items */
  faq?: PricingFAQItem[];
  /** Show monthly/yearly toggle */
  showBillingToggle?: boolean;
  /** Footer content */
  footer: {
    logo?: ReactNode;
    columns?: { title: string; links: { label: string; href: string }[] }[];
    bottomText?: string;
  };
  /** Currency symbol */
  currency?: string;
  /** Additional CSS class */
  className?: string;
}

export function PricingTemplate({
  title = "Simple, Transparent Pricing",
  subtitle = "Choose the plan that works best for you",
  tiers,
  faq,
  showBillingToggle = true,
  footer,
  currency = "$",
  className,
}: PricingTemplateProps) {
  const [isYearly, setIsYearly] = useState(false);

  const formatPrice = (price: number | "custom") => {
    if (price === "custom") return "Custom";
    return `${currency}${price}`;
  };

  return (
    <main className={cn("relative bg-black min-h-screen", className)}>
      {/* Header Section */}
      <Section className="pt-32">
        <Container>
          <div className="text-center mb-16">
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GradientText gradient="from-white via-zinc-300 to-zinc-500">
                {title}
              </GradientText>
            </motion.h1>

            <motion.p
              className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {subtitle}
            </motion.p>

            {/* Billing Toggle */}
            {showBillingToggle && (
              <motion.div
                className="flex items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className={cn("text-sm", !isYearly ? "text-white" : "text-zinc-500")}>
                  Monthly
                </span>
                <button
                  onClick={() => setIsYearly(!isYearly)}
                  className="relative w-14 h-7 rounded-full bg-zinc-800 transition-colors"
                >
                  <motion.div
                    className="absolute top-1 left-1 w-5 h-5 rounded-full bg-purple-500"
                    animate={{ x: isYearly ? 26 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
                <span className={cn("text-sm", isYearly ? "text-white" : "text-zinc-500")}>
                  Yearly
                  <span className="ml-2 text-green-400 text-xs">Save 20%</span>
                </span>
              </motion.div>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier, i) => (
              <FadeIn key={tier.name} delay={i * 0.1}>
                <div
                  className={cn(
                    "relative p-8 rounded-2xl border transition-all duration-300",
                    tier.popular
                      ? "bg-gradient-to-b from-purple-500/10 to-transparent border-purple-500/50 scale-105"
                      : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                  )}
                >
                  {/* Popular badge */}
                  {tier.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                        {tier.badge}
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                    <p className="text-sm text-zinc-400">{tier.description}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-white">
                        {formatPrice(
                          isYearly && tier.yearlyPrice !== undefined
                            ? tier.yearlyPrice
                            : tier.monthlyPrice
                        )}
                      </span>
                      {tier.monthlyPrice !== "custom" && (
                        <span className="text-zinc-500">
                          /{isYearly ? "year" : "month"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        {feature.included ? (
                          <svg
                            className="w-5 h-5 text-green-400 shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        )}
                        <span
                          className={cn(
                            "text-sm",
                            feature.included ? "text-zinc-300" : "text-zinc-600"
                          )}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {tier.popular ? (
                    <MagneticButton className="w-full">{tier.ctaText}</MagneticButton>
                  ) : (
                    <GradientBorderButton className="w-full">
                      {tier.ctaText}
                    </GradientBorderButton>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      {faq && faq.length > 0 && (
        <Section>
          <Container>
            <SectionHeader
              badge="FAQ"
              title="Frequently Asked Questions"
              description="Everything you need to know"
            />

            <div className="max-w-3xl mx-auto space-y-4">
              {faq.map((item, i) => (
                <FAQAccordion key={i} question={item.question} answer={item.answer} />
              ))}
            </div>
          </Container>
        </Section>
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

// =============================================================================
// FAQ Accordion Component
// =============================================================================

function FAQAccordion({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-zinc-900/50 transition-colors"
      >
        <span className="font-medium text-white">{question}</span>
        <motion.svg
          className="w-5 h-5 text-zinc-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="p-6 pt-0 text-zinc-400">{answer}</div>
      </motion.div>
    </div>
  );
}
