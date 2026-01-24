"use client";

import Link from "next/link";
import { CodeBlock } from "@/components/docs/code-block";
import { PropsTable } from "@/components/docs/props-table";
import type { ComponentMeta } from "@/lib/component-registry";

interface ComponentPageProps {
  component: ComponentMeta;
  related: ComponentMeta[];
  categoryLabel: string;
}

export function ComponentPage({ component, related, categoryLabel }: ComponentPageProps) {
  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-caption text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href={`/components/${component.category}`} className="hover:text-foreground transition-colors capitalize">
            {categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-foreground">{component.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-heading-1 font-heading">{component.name}</h1>
            {component.isNew && (
              <span className="px-2 py-0.5 text-caption rounded-full bg-primary/10 text-primary border border-primary/20">
                New
              </span>
            )}
            {component.isPremium && (
              <span className="px-2 py-0.5 text-caption rounded-full bg-accent/10 text-accent border border-accent/20">
                Premium
              </span>
            )}
          </div>
          <p className="text-body-lg text-muted-foreground max-w-2xl">{component.description}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {component.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-caption rounded bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {component.dependencies && component.dependencies.length > 0 && (
            <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
              <span className="text-caption text-muted-foreground">Dependencies: </span>
              <span className="text-caption font-mono">
                {component.dependencies.join(", ")}
              </span>
            </div>
          )}
        </div>

        {/* Installation */}
        <section className="mb-12">
          <h2 className="text-heading-3 font-heading mb-4">Installation</h2>
          <CodeBlock
            code={`npx motioncraft add ${component.slug}`}
            language="bash"
            filename="Terminal"
          />
        </section>

        {/* Usage */}
        <section className="mb-12">
          <h2 className="text-heading-3 font-heading mb-4">Usage</h2>
          <CodeBlock code={component.code} language="tsx" filename={`${component.slug}.tsx`} />
        </section>

        {/* Props */}
        {component.props.length > 0 && (
          <section className="mb-12">
            <h2 className="text-heading-3 font-heading mb-4">Props</h2>
            <PropsTable props={component.props} />
          </section>
        )}

        {/* Related Components */}
        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-border">
            <h2 className="text-heading-3 font-heading mb-6">Related Components</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/components/${r.category}/${r.slug}`}
                  className="group p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-body-sm font-medium group-hover:text-primary transition-colors">
                      {r.name}
                    </h3>
                    {r.isNew && (
                      <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-primary/10 text-primary">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-caption text-muted-foreground line-clamp-2">
                    {r.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
