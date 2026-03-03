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

// "LIKE" = weight 400 + white  |  "MINDS" = weight 900 + gold
const LIKE  = "LIKE".split("");
const MINDS = "MINDS".split("");

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

// 4 copies for seamless -50% loop
const TICKER_LOOP = [...TICKER_TEXT, ...TICKER_TEXT, ...TICKER_TEXT, ...TICKER_TEXT];

type BlobConfig = {
  cx: string; cy: string; size: number;
  color: string; duration: number; delay: number;
};

const BLOBS: BlobConfig[] = [
  { cx: "15%",  cy: "30%", size: 560, color: "oklch(0.28 0.068 225 / 55%)", duration: 18, delay: 0 },
  { cx: "78%",  cy: "22%", size: 420, color: "oklch(0.73 0.035 215 / 14%)", duration: 22, delay: 4 },
  { cx: "62%",  cy: "72%", size: 500, color: "oklch(0.18 0.05 225 / 65%)",  duration: 20, delay: 7 },
  { cx: "98%",  cy: "78%", size: 370, color: "oklch(0.73 0.035 215 / 9%)",  duration: 16, delay: 2 },
];

const STATS = [
  { value: "24+",  label: "Members"      },
  { value: "3+",   label: "Projects"     },
  { value: "3+",   label: "Years"        },
  { value: "5K+",  label: "Lives Touched"},
];

// Shared spring config for the stagger reveal
const SPRING = [0.22, 1, 0.36, 1] as const;

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
      {/* ── Animated background blobs ───────────────── */}
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
        {/* Bottom vignette — not inside parallax, stays fixed at bottom edge */}
        <div className='absolute bottom-0 inset-x-0 h-40 bg-linear-to-b from-transparent to-green-deep' />
      </div>

      {/* ── Cursor glow (desktop only) ──────────────── */}
      <motion.div
        className='fixed inset-0 pointer-events-none hidden md:block'
        style={{ background: glowBg }}
      />

      {/* ── Main content ────────────────────────────── */}
      <div className='relative z-10 flex flex-col items-center justify-center flex-1 px-4 sm:px-6 pt-24 pb-36'>
        {/* Registration badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className='flex items-center gap-3 mb-6'>
          <div className='hidden sm:block h-px w-12 bg-linear-to-r from-transparent to-gold/60' />
          <span className='text-[10px] font-bold tracking-[0.25em] sm:tracking-[0.35em] text-gold/70 uppercase'>
            RN. 7810996
          </span>
          <div className='hidden sm:block h-px w-12 bg-linear-to-l from-transparent to-gold/60' />
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className='mb-7 animate-pulse-gold rounded-full'>
          <Image
            alt='logo'
            priority
            width={110}
            height={110}
            src='/logo.webp'
          />
        </motion.div>

        {/* ── LIKEMINDS title ──────────────────────── */}
        {/*
            Design: "LIKE" in Cinzel weight 400 + white glow
                    "MINDS" in Cinzel weight 900 + gold/steel-blue glow
            The weight contrast creates a luxury typographic split.
        */}
        <div className='overflow-hidden mb-3 w-full'>
          <div className='flex items-baseline justify-center'>
            {/* LIKE — extrabold, white */}
            {LIKE.map((char, i) => (
              <motion.span
                key={`l${i}`}
                className='font-sans inline-block select-none'
                style={{
                  fontSize: "clamp(3.5rem, 17vw, 12rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 0.88,
                  fontWeight: 800,
                  color: "white",
                  textShadow:
                    "0 0 80px rgba(255,255,255,0.18), 0 2px 40px rgba(255,255,255,0.08)",
                }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.85,
                  delay: 0.3 + i * 0.06,
                  ease: SPRING,
                }}>
                {char}
              </motion.span>
            ))}

            {/* MINDS — extrabold, gold */}
            {MINDS.map((char, i) => (
              <motion.span
                key={`m${i}`}
                className='font-sans inline-block select-none'
                style={{
                  fontSize: "clamp(3.5rem, 17vw, 12rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 0.88,
                  fontWeight: 800,
                  color: "var(--gold)",
                  textShadow:
                    "0 0 80px oklch(0.73 0.035 215 / 35%), 0 2px 40px oklch(0.73 0.035 215 / 15%)",
                }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.85,
                  delay: 0.58 + i * 0.06,
                  ease: SPRING,
                }}>
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Motto */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05, ease: "easeOut" }}
          className='font-bold tracking-[0.18em] sm:tracking-[0.38em] text-gold text-sm sm:text-base uppercase mb-1 text-center'>
          Ofu Obi Umunwanne
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.12, ease: "easeOut" }}
          className='text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.38em] text-white/35 uppercase mb-8 text-center'>
          1980 – 1986 · Age Grade · Nomeh Unateze
        </motion.p>

        {/* Gold decorative rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 1.2, ease: SPRING }}
          className='h-px w-24 bg-linear-to-r from-transparent via-gold to-transparent mb-8 origin-center'
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.38, ease: "easeOut" }}
          className='text-base sm:text-lg text-white/50 max-w-lg text-center leading-relaxed mb-10'>
          A non-profit brotherhood of Nomeh indigenes — building capacity,
          empowering youth, and championing welfare through united action.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.52, ease: "easeOut" }}
          className='flex flex-col sm:flex-row gap-3'>
          <Button
            asChild
            size='lg'
            className='bg-gold hover:bg-gold/90 text-green-deep font-bold text-base px-10 rounded-full shadow-lg hover:shadow-gold/25 hover:shadow-xl transition-all duration-300'>
            <Link href='/members'>
              <UsersIcon className='size-4' />
              Meet Our Members
            </Link>
          </Button>
          <Button
            asChild
            size='lg'
            variant='outline'
            className='border-white/25 text-white hover:bg-white/10 hover:border-white/40 font-semibold text-base px-10 rounded-full transition-all duration-300'>
            <Link href='/join'>Join LikeMinds</Link>
          </Button>
        </motion.div>

        {/* ── Bottom ticker ────────────────────────────── */}
        <div className='absolute bottom-22 left-0 right-0 z-20 overflow-hidden border-t border-white/8 bg-black/25 backdrop-blur-sm py-3'>
          <motion.div
            className='flex whitespace-nowrap will-change-transform'
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
            {TICKER_LOOP.map((item, i) => (
              <span
                key={i}
                className='flex items-center shrink-0 text-[11px] font-semibold tracking-[0.22em] text-white/70 uppercase'>
                <span className='px-6'>{item}</span>
                <span className='text-gold text-[8px] shrink-0'>◆</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────── */}
      {/* <motion.div
        className='absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.6 }}>
        <span className='text-[9px] font-extrabold tracking-[0.3em] text-white/20 uppercase'>
          Scroll
        </span>
        <div className='w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5'>
          <motion.div className='w-1 h-2 bg-gold rounded-full animate-scroll-dot' />
        </div>
      </motion.div> */}
    </section>
  );
}
