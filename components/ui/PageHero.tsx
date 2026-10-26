"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import { WordReveal } from "@/components/motion/Reveal";
import { UliBand, UliMark } from "@/components/ui/Ornaments";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

// Shared hero for every inner page: dark forest ground, uli motifs, warm glows.
export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  watermark,
  compact = false,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: React.ReactNode;
  watermark?: string;
  compact?: boolean;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const watermarkX = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section
      ref={ref}
      className='noise relative overflow-hidden bg-green-deep pt-36 pb-24 sm:pt-44 sm:pb-28'>
      {/* Ground */}
      <div className='pattern-nsibidi mask-radial pointer-events-none absolute inset-0 opacity-90' />
      <div className='pointer-events-none absolute -top-40 -right-40 size-[38rem] rounded-full bg-clay/25 blur-[140px]' />
      <div className='pointer-events-none absolute -bottom-48 -left-32 size-[32rem] rounded-full bg-gold/12 blur-[120px]' />

      {watermark && (
        <motion.p
          aria-hidden
          style={{ x: watermarkX }}
          className='font-display pointer-events-none absolute -bottom-6 left-0 whitespace-nowrap text-[22vw] leading-none font-semibold italic text-white/[0.035] select-none sm:-bottom-10'>
          {watermark}
        </motion.p>
      )}

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className='relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6'>
        <motion.nav
          aria-label='Breadcrumb'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className='mb-6 flex items-center justify-center gap-1.5 text-xs text-white/45'>
          <Link href='/' className='transition-colors hover:text-gold'>
            Home
          </Link>
          <ChevronRightIcon className='size-3' />
          <span className='text-white/70'>{eyebrow}</span>
        </motion.nav>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className='eyebrow flex items-center justify-center gap-2.5 text-gold'>
          <UliMark />
          {eyebrow}
          <UliMark />
        </motion.p>

        <h1
          className={cn(
            "font-display mt-5 font-medium text-white",
            compact
              ? "text-4xl leading-[1.1] sm:text-5xl"
              : "text-5xl leading-[1.02] sm:text-6xl lg:text-7xl",
          )}>
          <WordReveal
            animateOnMount
            delay={0.2}
            segments={[
              { text: title, br: !!accent },
              ...(accent
                ? [{ text: accent, className: "italic font-display-wonk text-gradient-warm" }]
                : []),
            ]}
          />
        </h1>

        {description && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className='mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg'>
            {description}
          </motion.div>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            className='mt-8'>
            {children}
          </motion.div>
        )}
      </motion.div>

      <UliBand className='absolute inset-x-0 bottom-0 text-gold/60' height={10} />
    </section>
  );
}
