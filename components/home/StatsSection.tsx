"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { members } from "@/lib/data/members";
import { Reveal } from "@/components/motion/Reveal";
import { UliMark } from "@/components/ui/Ornaments";

const stats = [
  {
    value: members.length,
    suffix: "",
    label: "Members",
    description: "Professionals & community leaders across Nigeria and beyond",
  },
  {
    value: 3,
    suffix: "+",
    label: "Community Projects",
    description: "Sport, education, welfare and empowerment",
  },
  {
    value: 1500,
    suffix: "+",
    label: "Lives Impacted",
    description: "Beneficiaries of our community-driven work",
  },
  {
    value: 2,
    suffix: "+",
    label: "Years Active",
    description: "Rooted in brotherhood since May 2024",
  },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 2.2, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, value, count]);

  return (
    <span ref={ref} className='tabular-nums'>
      <motion.span>{display}</motion.span>
      <span className='text-clay'>{suffix}</span>
    </span>
  );
}

export function StatsSection() {
  return (
    <section className='relative bg-background py-24 sm:py-28'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col gap-14'>
          <Reveal className='max-w-2xl'>
            <p className='eyebrow flex items-center gap-2.5 text-clay'>
              <UliMark />
              Our impact in numbers
            </p>
            <p className='font-display mt-4 text-3xl leading-tight font-medium text-foreground sm:text-4xl'>
              Measured in lives touched,{" "}
              <em className='font-display-wonk text-primary'>not in words.</em>
            </p>
          </Reveal>

          <div className='grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-0'>
            {stats.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 0.1}
                className='group relative lg:border-l lg:border-border lg:px-8 lg:first:border-l-0 lg:first:pl-0'>
                <p className='font-display text-[2.6rem] leading-none font-medium whitespace-nowrap text-foreground sm:text-6xl lg:text-7xl'>
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <div className='mt-5 h-px w-10 bg-gold transition-all duration-500 group-hover:w-20' />
                <p className='mt-4 text-sm font-bold tracking-wide text-foreground'>
                  {stat.label}
                </p>
                <p className='mt-1.5 text-sm leading-relaxed text-muted-foreground'>
                  {stat.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
