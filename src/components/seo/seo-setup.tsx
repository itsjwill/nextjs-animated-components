"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AutoSEOConfig } from "@/lib/auto-seo";

// =============================================================================
// SEO Setup Wizard
// =============================================================================
// A beautiful onboarding wizard that asks users for their site details
// and saves them to localStorage (or can output to .env format)

export interface SEOSetupProps {
  /** Callback when setup is complete */
  onComplete?: (config: AutoSEOConfig) => void;
  /** Skip if already configured */
  skipIfConfigured?: boolean;
  /** Custom storage key */
  storageKey?: string;
}

const STORAGE_KEY = "motion-primitives-seo-config";

export function SEOSetup({
  onComplete,
  skipIfConfigured = true,
  storageKey = STORAGE_KEY,
}: SEOSetupProps) {
  const [step, setStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<Partial<AutoSEOConfig>>({});

  // Check if already configured
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem(storageKey);
    if (saved && skipIfConfigured) {
      const parsed = JSON.parse(saved) as AutoSEOConfig;
      onComplete?.(parsed);
      return;
    }

    // Check if env vars are set
    if (
      process.env.NEXT_PUBLIC_SITE_NAME &&
      process.env.NEXT_PUBLIC_SITE_URL &&
      skipIfConfigured
    ) {
      const envConfig: AutoSEOConfig = {
        siteName: process.env.NEXT_PUBLIC_SITE_NAME,
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
        twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
      };
      onComplete?.(envConfig);
      return;
    }

    // Show setup wizard
    setIsOpen(true);
  }, [skipIfConfigured, storageKey, onComplete]);

  const steps = [
    {
      title: "What's your site name?",
      subtitle: "This appears in search results and browser tabs",
      field: "siteName",
      placeholder: "My Awesome Website",
      type: "text",
    },
    {
      title: "What's your site URL?",
      subtitle: "Your production domain (with https://)",
      field: "siteUrl",
      placeholder: "https://example.com",
      type: "url",
    },
    {
      title: "Twitter handle (optional)",
      subtitle: "For Twitter Card attribution",
      field: "twitterHandle",
      placeholder: "username",
      type: "text",
      optional: true,
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Complete setup
      const finalConfig: AutoSEOConfig = {
        siteName: config.siteName || "My Website",
        siteUrl: config.siteUrl || "https://example.com",
        twitterHandle: config.twitterHandle,
        defaultOgImage: "/og-image.png",
        language: "en",
      };

      // Save to localStorage
      localStorage.setItem(storageKey, JSON.stringify(finalConfig));

      // Close and callback
      setIsOpen(false);
      onComplete?.(finalConfig);
    }
  };

  const handleSkip = () => {
    if (steps[step].optional) {
      handleNext();
    }
  };

  const currentStep = steps[step];
  const currentValue = config[currentStep.field as keyof AutoSEOConfig] || "";

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-md mx-4"
        >
          {/* Card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/90 p-8">
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-xl" />

            <div className="relative">
              {/* Progress */}
              <div className="mb-8 flex gap-2">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i <= step ? "bg-purple-500" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>

              {/* Header */}
              <div className="mb-6">
                <span className="text-sm text-purple-400">
                  SEO Setup {step + 1}/{steps.length}
                </span>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  {currentStep.title}
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  {currentStep.subtitle}
                </p>
              </div>

              {/* Input */}
              <div className="mb-8">
                <input
                  type={currentStep.type}
                  value={currentValue}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      [currentStep.field]: e.target.value,
                    })
                  }
                  placeholder={currentStep.placeholder}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-purple-500"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleNext();
                  }}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {currentStep.optional && (
                  <button
                    onClick={handleSkip}
                    className="flex-1 rounded-lg border border-white/10 px-4 py-3 text-sm text-gray-400 transition-colors hover:bg-white/5"
                  >
                    Skip
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={!currentStep.optional && !currentValue}
                  className="flex-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {step === steps.length - 1 ? "Complete Setup" : "Next"}
                </button>
              </div>

              {/* Env hint */}
              <p className="mt-6 text-center text-xs text-gray-500">
                Pro tip: Add these to your .env.local file to skip this wizard
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// =============================================================================
// Generate .env content
// =============================================================================

export function generateEnvContent(config: AutoSEOConfig): string {
  return `# SEO Configuration (generated by Motion Primitives)
NEXT_PUBLIC_SITE_NAME="${config.siteName}"
NEXT_PUBLIC_SITE_URL="${config.siteUrl}"
${config.twitterHandle ? `NEXT_PUBLIC_TWITTER_HANDLE="${config.twitterHandle}"` : "# NEXT_PUBLIC_TWITTER_HANDLE="}
`;
}

// =============================================================================
// Hook to get stored config
// =============================================================================

export function useStoredSEOConfig(
  storageKey: string = STORAGE_KEY
): AutoSEOConfig | null {
  const [config, setConfig] = useState<AutoSEOConfig | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setConfig(JSON.parse(saved));
    }
  }, [storageKey]);

  return config;
}
