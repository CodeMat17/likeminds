"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRightIcon, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { featuredWorks, categoryConfig } from "@/lib/data/works";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export function WorksPreview() {
  const featuredCardRef = useRef<HTMLDivElement>(null);

  // 3D tilt values for the featured card
  const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = featuredCardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(xPct * 8);
    rotateX.set(-yPct * 8);
    // Update spotlight custom properties
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    if (featuredCardRef.current) {
      featuredCardRef.current.style.setProperty("--x", `${x}%`);
      featuredCardRef.current.style.setProperty("--y", `${y}%`);
    }
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Subtle uli pattern overlay */}
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
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
              Our Works in the Community
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              From scholarships to community football empowerment —
              every project is a testament to our commitment to Nomeh Unateze development.
            </p>
          </div>
          <Button asChild variant="outline" className="self-start sm:self-auto shrink-0 rounded-full">
            <Link href="/works" className="gap-2">
              All Projects
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Featured work — large card + two small cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6"
        >
          {/* Large featured card — 3D tilt + spotlight */}
          {featuredWorks[0] && (
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-3 group"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <Link href={`/works/${featuredWorks[0].slug}`} className="block h-full">
                <div
                  ref={featuredCardRef}
                  className="relative h-72 lg:h-full min-h-[22rem] rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
                  style={{ transform: "translateZ(0)" }}
                >
                  <Image
                    src={featuredWorks[0].images[0]}
                    alt={featuredWorks[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                    style={{ transform: "translateZ(20px) scale(1.05)" }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/5" />
                  {/* Spotlight cursor effect */}
                  <div className="absolute inset-0 spotlight rounded-2xl" />

                  <div className="absolute bottom-0 left-0 right-0 p-7" style={{ transform: "translateZ(30px)" }}>
                    <Badge className={`mb-3 text-[10px] ${categoryConfig[featuredWorks[0].category].color}`}>
                      {categoryConfig[featuredWorks[0].category].icon}{" "}
                      {categoryConfig[featuredWorks[0].category].label}
                    </Badge>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                      {featuredWorks[0].title}
                    </h3>
                    <p className="text-white/65 text-sm line-clamp-2 mb-4">
                      {featuredWorks[0].shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-white/50">
                        <CalendarIcon className="size-3" />
                        {featuredWorks[0].date}
                      </div>
                      <span className="text-xs font-semibold text-gold flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                        Read More <ArrowRightIcon className="size-3" />
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4" style={{ transform: "translateZ(30px)" }}>
                    <Badge variant="gold" className="text-[10px] font-bold">
                      FEATURED
                    </Badge>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Two smaller cards */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {featuredWorks.slice(1, 3).map((work) => (
              <motion.div key={work.id} variants={fadeInUp} className="group flex-1">
                <Link href={`/works/${work.slug}`} className="block h-full">
                  <div className="relative h-48 lg:h-full min-h-[10rem] rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/8">
                    <Image
                      src={work.images[0]}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <Badge className={`mb-2 text-[10px] ${categoryConfig[work.category].color}`}>
                        {categoryConfig[work.category].icon} {categoryConfig[work.category].label}
                      </Badge>
                      <h3 className="font-serif text-base font-bold text-white leading-tight mb-1">
                        {work.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-white/50">
                          <CalendarIcon className="size-3" />
                          {work.date}
                        </div>
                        <span className="text-xs font-semibold text-gold opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-all duration-300">
                          View <ArrowRightIcon className="size-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
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
