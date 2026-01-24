"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme, DIRECTION_META } from "@/lib/theme";

const CODE_EXAMPLE = `import { TiltCard, MagneticButton, FadeIn } from "motioncraft";

export default function Hero() {
  return (
    <FadeIn direction="up" delay={0.2}>
      <TiltCard intensity={15}>
        <h1>Your Next Award Winner</h1>
        <MagneticButton>Get Started</MagneticButton>
      </TiltCard>
    </FadeIn>
  );
}`;

export function CodePreviewSection() {
  const { direction } = useTheme();
  const meta = DIRECTION_META[direction];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [displayedCode, setDisplayedCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const timer = setInterval(() => {
      if (i <= CODE_EXAMPLE.length) {
        setDisplayedCode(CODE_EXAMPLE.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [isInView]);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_EXAMPLE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={ref} className="py-32 lg:py-40 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-caption font-medium border border-border bg-surface/50 mb-6">
            Developer Experience
          </span>
          <h2 className="text-heading-1 font-heading mb-4">
            Three Lines.{" "}
            <span className="text-primary">Award-Worthy.</span>
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
            Import, compose, ship. Every component is copy-paste ready with full TypeScript support.
          </p>
        </motion.div>

        {/* Code block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative rounded-2xl border border-border bg-surface overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-caption text-muted-foreground ml-3">hero.tsx</span>
            </div>
            <button
              onClick={handleCopy}
              className="text-caption text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Code content */}
          <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto">
            <pre className="text-muted-foreground">
              <code>
                {displayedCode.split("\n").map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-8 text-right mr-4 opacity-30 select-none text-xs">
                      {i + 1}
                    </span>
                    <span>
                      {highlightSyntax(line, meta.accent)}
                    </span>
                  </div>
                ))}
              </code>
              {displayedCode.length < CODE_EXAMPLE.length && (
                <span className="inline-block w-2 h-4 ml-0.5 animate-pulse" style={{ backgroundColor: meta.accent }} />
              )}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function highlightSyntax(line: string, accent: string) {
  // Simple syntax highlighting
  const parts: JSX.Element[] = [];
  let remaining = line;
  let key = 0;

  const patterns: [RegExp, string][] = [
    [/^(import|export|default|function|return|from|const)\b/, "#c792ea"],  // keywords
    [/"[^"]*"/, accent],  // strings
    [/<\/?[A-Z][a-zA-Z]*/, "#7ec8e3"],  // JSX tags
    [/\{|\}|\(|\)/, "#89ddff"],  // brackets
  ];

  // Simple: just return with basic coloring for imports and strings
  if (line.includes("import") || line.includes("export") || line.includes("from")) {
    return <span style={{ color: "#c792ea" }}>{line}</span>;
  }
  if (line.includes("<") && line.includes(">")) {
    return <span style={{ color: "#7ec8e3" }}>{line}</span>;
  }
  if (line.includes('"')) {
    return <span style={{ color: accent }}>{line}</span>;
  }

  return <span className="text-foreground/80">{line}</span>;
}
