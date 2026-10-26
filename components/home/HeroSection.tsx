"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import { executives, members, sortedMembers } from "@/lib/data/members";
import { WordReveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/ui/Marquee";
import { RotatingSeal, UliBand } from "@/components/ui/Ornaments";

const TICKER = [
  "Brotherhood",
  "Unity",
  "Community Development",
  "Ofu Obi Umunwanne",
  "Est. 2024",
  "Enugu, Nigeria",
  "Age Grade Association",
  "Nomeh Unateze",
];

const EASE = [0.16, 1, 0.3, 1] as const;
const ROTATE_MS = 4200;

const avatarStack = sortedMembers.slice(executives.length, executives.length + 5);
const at = (i: number) => sortedMembers[i % sortedMembers.length];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Restarts on every change, so a thumbnail click gets a full turn on screen
  useEffect(() => {
    const id = setTimeout(
      () => setActive((i) => (i + 1) % sortedMembers.length),
      ROTATE_MS,
    );
    return () => clearTimeout(id);
  }, [active]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const mainY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const sideAY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const sideBY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  const current = at(active);
  // The two side frames preview who is up next
  const upNext = [
    { member: at(active + 1), offset: 1 },
    { member: at(active + 2), offset: 2 },
  ];

  return (
    <section
      ref={ref}
      className='noise relative flex min-h-svh flex-col overflow-hidden bg-green-deep lg:h-svh lg:min-h-160'>
      {/* Ground: uli motifs, warm glows */}
      <div className='pattern-nsibidi pointer-events-none absolute inset-0 opacity-80' />
      <div className='pointer-events-none absolute top-1/4 -left-40 size-[40rem] rounded-full bg-green-mid/40 blur-[150px]' />
      <div className='pointer-events-none absolute -right-20 bottom-0 size-[36rem] rounded-full bg-clay/30 blur-[150px]' />
      <div className='pointer-events-none absolute top-10 right-1/3 size-80 rounded-full bg-gold/10 blur-[110px]' />

      <div className='relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-4 pt-32 pb-36 sm:px-6 lg:min-h-0 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-24 lg:pb-20'>
        {/* ── Copy ─────────────────────────────── */}
        <motion.div style={{ y: textY, opacity: fade }} className='lg:col-span-7'>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className='inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/5 py-1.5 pr-4 pl-2 text-xs text-white/75 backdrop-blur-sm'>
            <span className='relative flex size-2'>
              <span className='absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-60' />
              <span className='relative inline-flex size-2 rounded-full bg-gold' />
            </span>
            CAC Registered · RN. 7810996
          </motion.div>

          <h1 className='font-display mt-7 text-[3.4rem] leading-[0.98] font-medium tracking-tight text-white sm:text-7xl lg:mt-[clamp(1rem,3svh,1.75rem)] lg:text-[clamp(3.5rem,10svh,5.6rem)]'>
            <WordReveal
              animateOnMount
              delay={0.25}
              stagger={0.08}
              segments={[
                { text: "One heart.", br: true },
                { text: "One brotherhood.", className: "italic font-display-wonk text-gradient-warm" },
              ]}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
            className='mt-7 max-w-xl text-lg leading-relaxed text-white/65 lg:mt-[clamp(1rem,3svh,1.75rem)]'>
            <span className='font-semibold text-white'>LikeMinds 1980–1986</span> is the
            age grade of Nomeh Unateze — sons of one soil, building capacity, empowering
            youth and championing welfare under one vow:{" "}
            <em className='font-display text-gold'>Ofu Obi Umunwanne</em>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
            className='mt-10 flex flex-col gap-4 sm:flex-row sm:items-center lg:mt-[clamp(1.25rem,4svh,2.5rem)]'>
            <Magnetic>
              <Link
                href='/join'
                className='group inline-flex h-14 items-center gap-3 rounded-full bg-gold pr-2 pl-7 text-base font-bold text-green-deep shadow-[0_18px_50px_-15px_oklch(0.72_0.135_74/70%)] transition-colors duration-300 hover:bg-gold-light'>
                Join the Brotherhood
                <span className='grid size-10 place-items-center rounded-full bg-green-deep text-gold transition-transform duration-500 group-hover:rotate-45'>
                  <ArrowUpRightIcon className='size-4' />
                </span>
              </Link>
            </Magnetic>
            <Link
              href='/members'
              className='group inline-flex h-14 items-center gap-2 px-2 text-base font-semibold text-white/85 transition-colors hover:text-white'>
              <span className='bg-linear-to-r from-gold to-gold bg-[length:30%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]'>
                Meet our members
              </span>
              <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
            </Link>
          </motion.div>

          {/* Avatar stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className='mt-12 flex items-center gap-4 lg:mt-[clamp(1.25rem,4.5svh,3rem)] [@media(min-width:1024px)_and_(max-height:700px)]:hidden'>
            <div className='flex -space-x-3'>
              {avatarStack.map((m) => (
                <Image
                  key={m.id}
                  src={m.photo}
                  alt={m.name}
                  width={44}
                  height={44}
                  className='size-11 rounded-full object-cover object-top ring-2 ring-green-deep'
                />
              ))}
            </div>
            <p className='text-sm leading-snug text-white/55'>
              <span className='font-display text-xl font-semibold text-white'>
                {members.length}
              </span>{" "}
              sons of Nomeh Unateze,
              <br />
              bound by one vow.
            </p>
          </motion.div>
        </motion.div>

        {/* ── Portrait collage ─────────────────── */}
        <div className='relative mx-auto h-[30rem] w-full max-w-md sm:h-[34rem] lg:col-span-5 lg:h-[min(38rem,calc(100svh-13rem))] lg:max-w-none'>
          {/* Rotating member portrait */}
          <motion.div
            style={{ y: mainY }}
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.3, ease: EASE }}
            className='absolute inset-x-[14%] top-0 bottom-[8%]'>
            <div className='relative size-full overflow-hidden rounded-lg border border-gold/30 bg-green-mid/30 shadow-[0_40px_80px_-30px_black]'>
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4, ease: EASE }}
                  className='absolute inset-0'>
                  <Image
                    src={current.photo}
                    alt={current.name}
                    fill
                    priority={active === 0}
                    sizes='(max-width: 1024px) 70vw, 30vw'
                    className='object-cover object-top'
                  />
                </motion.div>
              </AnimatePresence>
              <div className='absolute inset-0 bg-linear-to-t from-green-deep via-green-deep/10 to-transparent' />
              <div className='absolute inset-x-0 bottom-0 p-6 text-center'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: EASE }}>
                    <p className='eyebrow text-gold'>{current.position}</p>
                    <p className='font-display mt-1.5 text-xl leading-tight text-white'>
                      {current.name}
                    </p>
                  </motion.div>
                </AnimatePresence>
                {/* Counter + progress toward the next portrait */}
                <div className='mx-auto mt-4 flex max-w-[12rem] items-center gap-3'>
                  <span className='text-[11px] font-bold text-white/70 tabular-nums'>
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <span className='relative h-0.5 flex-1 overflow-hidden rounded-full bg-white/20'>
                    <motion.span
                      key={active}
                      className='absolute inset-y-0 left-0 rounded-full bg-gold'
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
                    />
                  </span>
                  <span className='text-[11px] font-bold text-white/40 tabular-nums'>
                    {String(sortedMembers.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Up-next thumbnails: click to jump ahead */}
          {upNext.map(({ member, offset }) => (
            <motion.div
              key={offset}
              style={{ y: offset === 1 ? sideAY : sideBY }}
              initial={{ opacity: 0, x: offset === 1 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.55 + offset * 0.15, ease: EASE }}
              className={
                offset === 1
                  ? "absolute top-[12%] left-0 w-[30%]"
                  : "absolute right-0 bottom-[22%] w-[28%]"
              }>
              <button
                onClick={() => setActive((i) => (i + offset) % sortedMembers.length)}
                aria-label={`Show ${member.name}`}
                className='group relative block aspect-[3/4] w-full overflow-hidden rounded-lg border-4 border-green-deep bg-green-mid/40 shadow-2xl'>
                <AnimatePresence initial={false}>
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: EASE }}
                    className='absolute inset-0'>
                    <Image
                      src={member.photo}
                      alt=''
                      fill
                      sizes='160px'
                      className='object-cover object-top sepia-[0.35] transition-[filter] duration-500 group-hover:sepia-0'
                    />
                  </motion.div>
                </AnimatePresence>
                <span className='absolute inset-x-0 bottom-0 bg-linear-to-t from-green-deep/90 to-transparent px-2 pt-6 pb-2 text-left text-[9px] font-bold tracking-[0.2em] text-gold uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  {offset === 1 ? "Up next" : "Then"}
                </span>
              </button>
            </motion.div>
          ))}

          {/* Seal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.4, delay: 1, ease: EASE }}
            className='absolute top-[2%] right-[2%]'>
            <RotatingSeal className='size-28 rounded-full bg-green-deep/80 text-gold backdrop-blur-md sm:size-32'>
              <Image src='/logo.png' alt='' width={56} height={56} className='size-11 sm:size-13' />
            </RotatingSeal>
          </motion.div>
        </div>
      </div>

      {/* ── Ticker ─────────────────────────────── */}
      <div className='absolute inset-x-0 bottom-0 z-20'>
        <UliBand className='text-gold/50' height={8} />
        <div className='border-t border-white/10 bg-black/25 py-4 backdrop-blur-md'>
          <Marquee duration={45} trackClassName='gap-0'>
            {TICKER.map((item) => (
              <span
                key={item}
                className='flex shrink-0 items-center text-sm font-semibold tracking-[0.2em] text-white/70 uppercase'>
                <span className='px-7'>{item}</span>
                <span className='size-1.5 rotate-45 bg-clay' />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
