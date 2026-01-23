"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "@/lib/theme";
import { getMotionVariants } from "@/lib/motion";
import { SectionReveal } from "@/components/scroll/section-reveal";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function StatementSection() {
  const { direction } = useTheme();
  const variants = getMotionVariants(direction);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stats = [
    { value: 80, suffix: "+", label: "Components" },
    { value: 4, suffix: "", label: "Design Directions" },
    { value: 5, suffix: "", label: "Animation Libraries" },
    { value: 100, suffix: "%", label: "TypeScript" },
  ];

  return (
    <section ref={ref} className="py-32 lg:py-40 px-6">
      <SectionReveal type="clip">
      <div className="max-w-5xl mx-auto">
        {/* Statement */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-display-sm font-heading text-center leading-tight mb-20"
        >
          Animation components for developers who{" "}
          <span className="text-primary">refuse to build boring</span> websites.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={variants.container}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={variants.item}
              className="text-center"
            >
              <div className="text-heading-1 font-heading text-primary mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-body-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      </SectionReveal>
    </section>
  );
}
