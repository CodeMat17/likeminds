"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { works } from "@/lib/data/works";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";

export function WorksPreview() {
  const preview = works.slice(0, 3);

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <div className="absolute inset-0 pattern-uli opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="text-sm font-bold tracking-[0.3em] text-primary uppercase">
              Community Impact
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-foreground mt-2">
              Our Works in the Community
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              From co-sponsoring football tournaments to scholarships and empowerment —
              every project is a testament to our commitment to Nomeh Unateze.
            </p>
          </div>
          <Button asChild variant="outline" className="self-start sm:self-auto shrink-0 rounded-full">
            <Link href="/works" className="gap-2">
              All Projects
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {preview.map((work) => {
            const excerpt = work.content
              .replace(/#+\s[^\n]*/g, "")
              .replace(/\*+/g, "")
              .trim()
              .slice(0, 160);

            return (
              <motion.div key={work.id} variants={scaleIn} className="group">
                <Link href={`/works/${work.slug}`} className="block h-full">
                  <article className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full flex flex-col p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <CalendarIcon className="size-3.5" />
                      <span>{work.date}</span>
                    </div>
                    <h3 className="font-sans font-bold text-foreground text-base leading-snug mb-3 group-hover:text-primary transition-colors duration-200">
                      {work.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-4">
                      {excerpt}…
                    </p>
                    <div className="mt-5 pt-4 border-t border-border flex items-center justify-end">
                      <span className="text-xs font-semibold text-primary flex items-center gap-1">
                        Read More <ArrowRightIcon className="size-3" />
                      </span>
                    </div>
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-12 text-center"
        >
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
            <Link href="/works">
              Explore All Projects
              <ArrowRightIcon className="size-4 ml-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
