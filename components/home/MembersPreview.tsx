"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import { isExecutive, members, sortedMembers } from "@/lib/data/members";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function MembersPreview() {
  return (
    <section className='relative overflow-hidden bg-muted/50 py-24 sm:py-32'>
      <div aria-hidden className='pattern-nsibidi mask-radial pointer-events-none absolute inset-0 opacity-60' />

      <div className='relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <SectionHeading
          align='center'
          eyebrow='Our people'
          title='The faces of'
          accent='the brotherhood.'
          description='A distinguished group of professionals, entrepreneurs, and community champions — united by birthplace, generation, and the spirit of brotherhood.'
        />

        <motion.ul
          className='mt-16 grid grid-cols-4 gap-x-4 gap-y-6 sm:grid-cols-5 sm:gap-x-6 md:grid-cols-7 lg:grid-cols-10'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-60px" }}
          transition={{ staggerChildren: 0.04 }}>
          {sortedMembers.map((m) => (
            <motion.li
              key={m.id}
              variants={{
                hidden: { opacity: 0, scale: 0.85, y: 16 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
              }}>
              <Link
                href='/members'
                aria-label={`${m.name}, ${m.position}`}
                className='group relative block outline-none'>
                <div
                  className={cn(
                    "relative aspect-square overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-background transition-all duration-500 group-hover:-translate-y-1 group-hover:ring-gold group-hover:shadow-xl group-hover:shadow-green-deep/20 group-focus-visible:ring-clay",
                    isExecutive(m) ? "ring-gold/45" : "ring-transparent",
                  )}>
                  <Image
                    src={m.photo}
                    alt=''
                    fill
                    sizes='(min-width: 1024px) 96px, (min-width: 640px) 15vw, 22vw'
                    className='object-cover object-top grayscale-[0.6] sepia-[0.25] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 group-hover:sepia-0'
                  />
                </div>

                {/* Hover caption */}
                <span className='pointer-events-none absolute top-full left-1/2 z-10 mt-3 w-max max-w-44 -translate-x-1/2 translate-y-1 rounded-xl bg-green-deep px-3 py-2 text-center opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100'>
                  <span className='block font-display text-[13px] leading-tight text-white'>{m.name}</span>
                  <span className='mt-0.5 block text-[10px] font-semibold tracking-wider text-gold uppercase'>
                    {m.position}
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        <Reveal className='mt-16 text-center'>
          <Link
            href='/members'
            className='group inline-flex h-14 items-center gap-3 rounded-full bg-primary pr-2 pl-7 font-bold text-primary-foreground transition-colors duration-300 hover:bg-clay'>
            Meet all {members.length} members
            <span className='grid size-10 place-items-center rounded-full bg-primary-foreground/15 transition-transform duration-500 group-hover:rotate-45'>
              <ArrowUpRightIcon className='size-4' />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
