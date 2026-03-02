"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { UsersIcon, FolderOpenIcon, HeartHandshakeIcon, GlobeIcon } from "lucide-react";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";

const stats = [
  {
    icon: UsersIcon,
    value: 24,
    suffix: "+",
    label: "Active Members",
    description: "Professionals and community leaders from across Nigeria",
    color: "text-green-light",
    bg: "bg-green-light/10",
  },
  {
    icon: FolderOpenIcon,
    value: 3,
    suffix: "+",
    label: "Community Projects",
    description: "Infrastructure, health, education and welfare initiatives",
    color: "text-gold",
    bg: "bg-gold/10",
  },
  {
    icon: HeartHandshakeIcon,
    value: 5000,
    suffix: "+",
    label: "Lives Impacted",
    description: "Community members directly benefiting from our projects",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
  },
  {
    icon: GlobeIcon,
    value: 3,
    suffix: "+ yrs",
    label: "Years of Brotherhood",
    description: "A bond that has stood the test of time since the 1980s",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, value);
      setCount(Math.floor(current));
      if (current >= value) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="text-center mb-14"
        >
          <span className="text-sm font-bold tracking-[0.3em] text-primary uppercase">
            Our Impact
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
            Numbers That Tell Our Story
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              className="group relative bg-card rounded-2xl border border-border p-7 text-center hover:border-primary/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className={`inline-flex p-3 rounded-2xl ${stat.bg} mb-4`}>
                <stat.icon className={`size-6 ${stat.color}`} />
              </div>

              <div className={`font-serif text-4xl font-black mb-1 ${stat.color}`}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>

              <p className="font-semibold text-foreground mb-2">
                {stat.label}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
