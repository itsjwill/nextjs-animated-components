"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GradientText } from "@/components/text/gradient-text";
import { TextGenerateEffect } from "@/components/text";
import { FadeIn, StaggerOnScroll, StaggerItem } from "@/components/scroll";
import { Section, Container, SectionHeader, Footer } from "@/components/layout/sections";

// =============================================================================
// About Page Template
// =============================================================================

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface ValueItem {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface AboutTemplateProps {
  /** Hero section */
  hero: {
    badge?: string;
    title: string;
    subtitle?: string;
    image?: string;
  };
  /** Mission section */
  mission?: {
    title: string;
    description: string;
  };
  /** Company values */
  values?: ValueItem[];
  /** Team members */
  team?: {
    title?: string;
    description?: string;
    members: TeamMember[];
  };
  /** Company timeline/history */
  timeline?: TimelineItem[];
  /** Footer content */
  footer: {
    logo?: ReactNode;
    columns?: { title: string; links: { label: string; href: string }[] }[];
    bottomText?: string;
  };
  /** Additional CSS class */
  className?: string;
}

export function AboutTemplate({
  hero,
  mission,
  values,
  team,
  timeline,
  footer,
  className,
}: AboutTemplateProps) {
  return (
    <main className={cn("relative bg-black min-h-screen", className)}>
      {/* Hero Section */}
      <Section className="pt-32 pb-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            {hero.badge && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <span className="px-4 py-2 text-sm font-medium text-purple-400 bg-purple-500/10 rounded-full border border-purple-500/20">
                  {hero.badge}
                </span>
              </motion.div>
            )}

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
              <TextGenerateEffect words={hero.title} />
            </h1>

            {hero.subtitle && (
              <motion.p
                className="text-xl md:text-2xl text-zinc-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {hero.subtitle}
              </motion.p>
            )}
          </div>

          {hero.image && (
            <FadeIn className="mt-16">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-800">
                <img
                  src={hero.image}
                  alt="About us"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </FadeIn>
          )}
        </Container>
      </Section>

      {/* Mission Section */}
      {mission && (
        <Section className="bg-zinc-950">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                  <GradientText gradient="from-purple-400 via-pink-400 to-orange-400">
                    {mission.title}
                  </GradientText>
                </h2>
                <p className="text-xl text-zinc-400 leading-relaxed">{mission.description}</p>
              </FadeIn>
            </div>
          </Container>
        </Section>
      )}

      {/* Values Section */}
      {values && values.length > 0 && (
        <Section>
          <Container>
            <SectionHeader
              badge="Values"
              title="What We Stand For"
              description="The principles that guide everything we do"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
                    {value.icon && (
                      <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-400">
                        {value.icon}
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-zinc-400">{value.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Timeline Section */}
      {timeline && timeline.length > 0 && (
        <Section className="bg-zinc-950">
          <Container>
            <SectionHeader
              badge="Journey"
              title="Our Story"
              description="Key milestones that shaped who we are"
            />

            <div className="max-w-3xl mx-auto">
              {timeline.map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="relative pl-8 pb-12 border-l border-zinc-800 last:pb-0">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-0 w-3 h-3 -translate-x-1/2 rounded-full bg-purple-500" />

                    <div className="mb-2">
                      <span className="text-purple-400 font-medium">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-zinc-400">{item.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Team Section */}
      {team && team.members.length > 0 && (
        <Section>
          <Container>
            <SectionHeader
              badge="Team"
              title={team.title || "Meet Our Team"}
              description={team.description || "The people behind the magic"}
            />

            <StaggerOnScroll className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {team.members.map((member, i) => (
                <StaggerItem key={i}>
                  <div className="group text-center">
                    {/* Avatar */}
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover border-2 border-zinc-800 group-hover:border-purple-500 transition-colors"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold">
                          {member.name[0]}
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-purple-400 text-sm mb-3">{member.role}</p>
                    {member.bio && (
                      <p className="text-zinc-500 text-sm mb-4">{member.bio}</p>
                    )}

                    {/* Social links */}
                    {member.social && (
                      <div className="flex items-center justify-center gap-3">
                        {member.social.twitter && (
                          <a
                            href={member.social.twitter}
                            className="text-zinc-500 hover:text-white transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a
                            href={member.social.linkedin}
                            className="text-zinc-500 hover:text-white transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </a>
                        )}
                        {member.social.github && (
                          <a
                            href={member.social.github}
                            className="text-zinc-500 hover:text-white transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerOnScroll>
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
