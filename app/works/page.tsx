"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // still used in work cards
import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon, UsersIcon, ArrowRightIcon, SearchIcon, XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Emblem } from "@/components/ui/Emblem";
import { works, categoryConfig, type WorkCategory } from "@/lib/data/works";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

const categories: { value: "all" | WorkCategory; label: string }[] = [
  { value: "all", label: "All Projects" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "education", label: "Education" },
  { value: "health", label: "Health" },
  { value: "empowerment", label: "Empowerment" },
  { value: "welfare", label: "Welfare" },
  { value: "peace", label: "Peace & Unity" },
];

export default function WorksPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | WorkCategory>("all");
  const [query, setQuery] = useState("");

  const filtered = works.filter((w) => {
    const q = query.toLowerCase();
    const matchesSearch =
      !q ||
      w.title.toLowerCase().includes(q) ||
      w.shortDescription.toLowerCase().includes(q) ||
      w.tags.some((t) => t.toLowerCase().includes(q));
    const matchesCategory = activeCategory === "all" || w.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-16">
      {/* Hero — differentiated with green-deep + diamond pattern */}
      <section className="relative py-24 bg-green-deep overflow-hidden noise">
        <div className="absolute inset-0 pattern-diamond pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.36_0.17_152/50%)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.74_0.17_72/8%)_0%,transparent_60%)]" />
        {/* Animated gold rule */}
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
            <motion.h1 variants={fadeInUp} className="font-serif text-4xl sm:text-5xl font-bold text-white">
              Our Works in Nomeh
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-white/75 text-lg max-w-2xl">
              Every project is a promise kept — to our community, to the next generation,
              and to the spirit of <em className="text-gold font-semibold">Ofu Obi Umunwanne</em>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 pr-9"
              />
              {query && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setQuery("")}
                >
                  <XIcon className="size-3.5" />
                </button>
              )}
            </div>
            <span className="text-sm text-muted-foreground ml-auto">
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border",
                  activeCategory === cat.value
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground border-transparent hover:border-border"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Works grid */}
      <section className="py-14 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <p className="text-muted-foreground">No projects found. Try adjusting your filters.</p>
                <Button variant="outline" className="mt-4" onClick={() => { setQuery(""); setActiveCategory("all"); }}>
                  Clear filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((work) => {
                  const cat = categoryConfig[work.category];
                  return (
                    <motion.div
                      key={work.id}
                      variants={scaleIn}
                      className="group"
                    >
                      <Link href={`/works/${work.slug}`} className="block h-full">
                        <article className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                          {/* Image */}
                          <div className="relative h-52 overflow-hidden">
                            <Image
                              src={work.images[0]}
                              alt={work.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            {work.featured && (
                              <div className="absolute top-3 left-3">
                                <Badge variant="gold" className="text-[10px] font-bold">FEATURED</Badge>
                              </div>
                            )}
                            <div className="absolute bottom-3 right-3">
                              <Badge className={`text-[10px] ${cat.color}`}>
                                {cat.icon} {cat.label}
                              </Badge>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5 flex-1 flex flex-col">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                              <CalendarIcon className="size-3" />
                              <span>{work.date}</span>
                            </div>
                            <h2 className="font-serif font-bold text-foreground text-base leading-snug mb-2 group-hover:text-primary transition-colors duration-200">
                              {work.title}
                            </h2>
                            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
                              {work.shortDescription}
                            </p>
                            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <UsersIcon className="size-3" />
                                <span className="truncate max-w-[140px]">{work.beneficiaries}</span>
                              </div>
                              <span className="text-xs font-semibold text-primary flex items-center gap-1">
                                Read More <ArrowRightIcon className="size-3" />
                              </span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
