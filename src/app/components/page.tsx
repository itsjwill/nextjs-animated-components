import Link from "next/link";
import { Metadata } from "next";
import {
  componentRegistry,
  CATEGORY_META,
  type ComponentCategory,
} from "@/lib/component-registry";

export const metadata: Metadata = {
  title: "Components — MotionCraft",
  description:
    "Browse 40+ premium animated components for React & Next.js. Direction-aware design, smooth animations, and production-ready code.",
};

export default function ComponentsPage() {
  const categories = Object.entries(CATEGORY_META) as [ComponentCategory, { label: string; description: string }][];

  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <h1 className="text-display-sm font-heading mb-4">Components</h1>
          <p className="text-body-lg text-muted-foreground">
            Premium animated components that adapt to your design direction.
            Built with React, Framer Motion, GSAP, and Three.js.
          </p>
        </div>

        <div className="grid gap-8">
          {categories.map(([key, meta]) => {
            const components = componentRegistry.filter((c) => c.category === key);
            if (components.length === 0) return null;

            return (
              <section key={key}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-heading-3 font-heading">{meta.label}</h2>
                    <p className="text-body-sm text-muted-foreground">{meta.description}</p>
                  </div>
                  <span className="text-caption text-muted-foreground bg-muted px-2 py-1 rounded">
                    {components.length} components
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {components.map((component) => (
                    <Link
                      key={component.slug}
                      href={`/components/${component.category}/${component.slug}`}
                      className="group p-4 rounded-xl border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-body-sm font-medium group-hover:text-primary transition-colors">
                          {component.name}
                        </h3>
                        {component.isNew && (
                          <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-primary/10 text-primary border border-primary/20">
                            New
                          </span>
                        )}
                        {component.isPremium && (
                          <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-accent/10 text-accent border border-accent/20">
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-caption text-muted-foreground line-clamp-2">
                        {component.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
