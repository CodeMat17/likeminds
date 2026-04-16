"use client";

import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { UsersIcon, FolderOpenIcon, HeartHandshakeIcon, CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";

const stats = [
  {
    icon: UsersIcon,
    value: 24,
    suffix: "+",
    label: "Active Members",
    description: "Professionals & community leaders across Nigeria",
  },
  {
    icon: FolderOpenIcon,
    value: 3,
    suffix: "+",
    label: "Community Projects",
    description: "Infrastructure, health, education & welfare",
  },
  {
    icon: HeartHandshakeIcon,
    value: 1500,
    suffix: "+",
    label: "Lives Impacted",
    description: "Beneficiaries of our community-driven work",
  },
  {
    icon: CalendarIcon,
    value: 3,
    suffix: "+ yrs",
    label: "Years Active",
    description: "Rooted in brotherhood",
  },
];

// Digit-flip counter: animates each digit individually
function FlipCounter({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, value);
      setDisplayValue(Math.floor(current));
      if (current >= value) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  const digits = displayValue.toLocaleString().split("");

  return (
    <div ref={ref} className="flex items-end justify-center gap-0.5" style={{ perspective: "400px" }}>
      {digits.map((char, i) => (
        <AnimatePresence key={`${i}-${char}`} mode="popLayout">
          <motion.span
            key={char + i + displayValue}
            className="inline-block tabular-nums"
            initial={{ rotateX: -90, opacity: 0, y: -16 }}
            animate={{ rotateX: 0, opacity: 1, y: 0 }}
            exit={{ rotateX: 90, opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {char}
          </motion.span>
        </AnimatePresence>
      ))}
      <span className="inline-block">{suffix}</span>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="relative py-20 bg-green-deep overflow-hidden noise">
      {/* Igbo uli diamond pattern */}
      <div className="absolute inset-0 pattern-diamond pointer-events-none" />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-green-mid/20 blur-[120px]" />
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gold/6 blur-[100px]" />
      </div>

      {/* Top & bottom gold rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-[11px] font-bold tracking-[0.35em] text-gold/70 uppercase">
            Our Impact in Numbers
          </span>
          <div className="mt-2 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col items-center text-center px-6 py-10 bg-green-deep hover:bg-white/4 transition-colors duration-300"
            >
              {/* Icon — lantern double-ring treatment */}
              <div className="mb-5 p-3 rounded-xl border border-gold/20 group-hover:border-gold/50 group-hover:bg-gold/8 transition-all duration-300">
                <div className="p-2 rounded-lg bg-white/6 group-hover:bg-gold/10 transition-all duration-300">
                  <stat.icon className="size-5 text-gold/80 group-hover:text-gold transition-colors duration-300" />
                </div>
              </div>

              {/* Digit-flip Number */}
              <div className="font-sans text-4xl sm:text-5xl font-black text-white leading-none mb-2 group-hover:text-gold transition-colors duration-300">
                <FlipCounter value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <p className="text-sm font-bold text-white/80 uppercase tracking-widest mb-2">
                {stat.label}
              </p>

              {/* Description */}
              <p className="text-xs text-white/40 leading-relaxed max-w-[14ch]">
                {stat.description}
              </p>

              {/* Bottom accent line — now actually visible on hover */}
              <div className="absolute bottom-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/60 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
