"use client";

import { motion } from "framer-motion";
import { CalendarIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Emblem } from "@/components/ui/Emblem";
import { works } from "@/lib/data/works";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";

export default function WorksPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-24 bg-green-deep overflow-hidden noise">
        <div className="absolute inset-0 pattern-diamond pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.36_0.17_152/50%)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.74_0.17_72/8%)_0%,transparent_60%)]" />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold/60 to-transparent origin-center"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-4"
          >
            <motion.div variants={scaleIn}>
              <Emblem size={90} className="text-gold" />
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-sans text-4xl sm:text-5xl font-bold text-white">
              Our Works in Nomeh
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-white/75 text-lg max-w-2xl">
              Every project is a promise kept to our community, to the next generation,
              and to the spirit of <em className="text-gold font-semibold">Ofu Obi Umunwanne</em>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-14 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {works.map((work) => {
              const excerpt = work.content.replace(/#+\s[^\n]*/g, "").replace(/\*+/g, "").trim().slice(0, 160);
              return (
                <motion.div key={work.id} variants={scaleIn} className="group">
                  <Link href={`/works/${work.slug}`} className="block h-full">
                    <article className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full flex flex-col p-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <CalendarIcon className="size-3.5" />
                        <span>{work.date}</span>
                      </div>
                      <h2 className="font-sans font-bold text-foreground text-base leading-snug mb-3 group-hover:text-primary transition-colors duration-200">
                        {work.title}
                      </h2>
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
        </div>
      </section>
    </div>
  );
}
