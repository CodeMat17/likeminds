"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const HERO_CHARS = "LIKEMINDS".split("");

const TICKER_TEXT = [
  "BROTHERHOOD",
  "UNITY",
  "COMMUNITY DEVELOPMENT",
  "OFU OBI UMUNWANNE",
  "EST. 2023",
  "ENUGU, NIGERIA",
  "AGE GRADE ASSOCIATION",
  "NOMEH UNATEZE",
];

// 4 copies so the -50% animation loops seamlessly
const TICKER_LOOP = [
  ...TICKER_TEXT,
  ...TICKER_TEXT,
  ...TICKER_TEXT,
  ...TICKER_TEXT,
];

type BlobConfig = {
  cx: string;
  cy: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
};

const BLOBS: BlobConfig[] = [
  { cx: "15%", cy: "30%", size: 560, color: "oklch(0.28 0.068 225 / 55%)", duration: 18, delay: 0 },
  { cx: "78%", cy: "22%", size: 420, color: "oklch(0.73 0.035 215 / 14%)", duration: 22, delay: 4 },
  { cx: "62%", cy: "72%", size: 500, color: "oklch(0.18 0.05 225 / 65%)", duration: 20, delay: 7 },
  { cx: "98%", cy: "78%", size: 370, color: "oklch(0.73 0.035 215 / 9%)", duration: 16, delay: 2 },
];

const STATS = [
  { value: "24+", label: "Members" },
  { value: "3+", label: "Projects" },
  { value: "3+", label: "Years" },
  { value: "5K+", label: "Lives Touched" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);


  // Mouse-following glow (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 });
  const glowBg = useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, oklch(0.73 0.035 215 / 6%), transparent 70%)`;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className='relative min-h-screen flex flex-col bg-green-deep'>
      {/* ── Animated background blobs with parallax ─── */}
      {/* overflow-hidden is on this wrapper only, NOT on the section,
          so content can scroll freely on mobile without being clipped */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <motion.div className='absolute inset-0' style={{ y: bgY }}>
          {BLOBS.map((blob, idx) => (
            <motion.div
              key={idx}
              className='absolute rounded-full'
              style={{
                left: `calc(${blob.cx} - ${blob.size / 2}px)`,
                top: `calc(${blob.cy} - ${blob.size / 2}px)`,
                width: blob.size,
                height: blob.size,
                background: blob.color,
                filter: "blur(80px)",
              }}
              animate={{
                x: [0, 38, -22, 30, 0],
                y: [0, -28, 20, -14, 0],
                scale: [1, 1.08, 0.95, 1.05, 1],
              }}
              transition={{
                duration: blob.duration,
                delay: blob.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
        {/* Bottom vignette — outside the parallax layer so it never shifts up over content */}
        <div className='absolute bottom-0 inset-x-0 h-0 bg-linear-to-b from-transparent to-green-deep' />
      </div>

      {/* ── Cursor glow (desktop only) ─────────────── */}
      <motion.div
        className='fixed inset-0 pointer-events-none hidden md:block'
        style={{ background: glowBg }}
      />

      {/* ── Main content ───────────────────────────── */}
      <motion.div
        className='relative z-10 flex flex-col items-center justify-center flex-1 px-4 sm:px-6 pt-24 pb-36'>
        {/* Emblem + establishment badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className='flex items-center gap-2 sm:gap-3 mb-10'>
          <div className='hidden sm:block h-px w-10 bg-gold' />
          <span className='text-sm font-bold tracking-[0.12em] sm:tracking-[0.3em] text-gold uppercase'>
            RN. 7810996
          </span>
          <div className='hidden sm:block h-px w-10 bg-gold' />
        </motion.div>

        {/* Large emblem — the centrepiece logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className='mb-6 animate-pulse-gold rounded-full'>
       <Image alt='logo' priority width={150} height={150} src='/logo.webp' />
        </motion.div>

        {/* Giant character-reveal title */}
        <div className='overflow-hidden mb-2 w-full'>
          <div className='flex items-baseline justify-center flex-wrap'>
            {HERO_CHARS.map((char, i) => (
              <motion.span
                key={i}
                className='font-serif font-extrabold leading-[0.9] inline-block select-none'
                style={{
                  fontSize: "clamp(2.5rem, 10.5vw, 9.5rem)",
                  // "LIKE" in white, "MINDS" in steel-blue accent
                  color: i >= 4 ? "var(--gold)" : "white",
                }}
                initial={{ y: "115%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.78,
                  delay: 0.35 + i * 0.065,
                  ease: [0.22, 1, 0.36, 1],
                }}>
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Sub-label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
          className='font-bold tracking-wider sm:tracking-[0.42em] text-gold uppercase mb-1 text-center'>
          Ofu Obi Umunwanne
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
          className='text-xs font-semibold tracking-wider sm:tracking-[0.42em] text-white/40 uppercase mb-10 text-center'>
          1980 – 1986 · Age Grade · Nomeh Unateze
        </motion.p>

        {/* Gold decorative rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 1.18, ease: [0.22, 1, 0.36, 1] }}
          className='h-px w-20 bg-linear-to-r from-transparent via-gold to-transparent mb-8 origin-center'
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.52, ease: "easeOut" }}
          className='text-base sm:text-lg text-white/55 max-w-lg text-center leading-relaxed mb-10'>
          A non-profit brotherhood of Nomeh indigenes — capacity building,
          empowering youth, and championing welfare through united action.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.66, ease: "easeOut" }}
          className='flex flex-col sm:flex-row gap-3 mb-14'>
          <Button
            asChild
            size='lg'
            className='bg-gold hover:bg-gold/90 text-green-deep font-bold text-base px-10 rounded-full shadow-lg hover:shadow-gold/30 hover:shadow-xl transition-all duration-300'>
            <Link href='/members'>
              <UsersIcon className='size-4' />
              Meet Our Members
            </Link>
          </Button>
          <Button
            asChild
            variant='outline'
            size='lg'
            className='border  font-semibold text-base px-10 rounded-full transition-all duration-300'>
            <Link href='/join'>Join LikeMinds</Link>
          </Button>
        </motion.div>

        {/* Stats row — 2×2 grid on mobile, single row on sm+ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.8, ease: "easeOut" }}
          className='w-full sm:w-auto pt-8 border-t border-white/10'>
          <div className='grid grid-cols-2 gap-y-6 gap-x-10 sm:flex sm:items-center sm:gap-14'>
            {STATS.map((stat) => (
              <div key={stat.label} className='text-center'>
                <p className='text-xl sm:text-2xl font-bold text-white leading-none'>
                  {stat.value}
                </p>
                <p className='text-sm text-white/50 font-medium uppercase tracking-widest mt-1'>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ───────────────────────── */}
      <motion.div
        className='absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}>
        <span className='text-[9px] font-extrabold tracking-[0.3em] text-white/25 uppercase'>
          Scroll
        </span>
        <div className='w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5'>
          <motion.div className='w-1 h-2 bg-gold rounded-full animate-scroll-dot' />
        </div>
      </motion.div>

      {/* ── Bottom ticker ──────────────────────────── */}
      <div className='absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-t border-white/10 bg-black/30 backdrop-blur-sm py-3'>
        <motion.div
          className='flex whitespace-nowrap will-change-transform'
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
          {TICKER_LOOP.map((item, i) => (
            <span
              key={i}
              className='flex items-center shrink-0 text-xs font-semibold tracking-[0.25em] text-white/80 uppercase'>
              <span className='px-6'>{item}</span>
              <span className='text-gold text-[8px] shrink-0'>◆</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
