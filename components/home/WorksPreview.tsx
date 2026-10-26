"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRightIcon,
  GraduationCapIcon,
  HeartHandshakeIcon,
  WrenchIcon,
} from "lucide-react";
import { works } from "@/lib/data/works";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { WorkCard } from "@/components/works/WorkCard";

// Initiatives announced in our IMUYA 2024 report
const horizon = [
  {
    icon: GraduationCapIcon,
    title: "Scholarship awards",
    body: "For academically outstanding students of Nomeh Unateze who need support.",
  },
  {
    icon: WrenchIcon,
    title: "Youth empowerment",
    body: "Vocational skills and entrepreneurial capacity for young people.",
  },
  {
    icon: HeartHandshakeIcon,
    title: "Community welfare",
    body: "Support for widows, the elderly and vulnerable households.",
  },
];

export function WorksPreview() {
  const preview = works.slice(0, 3);

  return (
    <section className='relative bg-background py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col justify-between gap-8 lg:flex-row lg:items-end'>
          <SectionHeading
            eyebrow='Community impact'
            title='Promises kept,'
            accent='on home soil.'
            description='From co-sponsoring football tournaments to scholarships and empowerment — every project is a testament to our commitment to Nomeh Unateze.'
          />
          <Reveal delay={0.2}>
            <Link
              href='/works'
              className='group inline-flex h-12 shrink-0 items-center gap-2 rounded-full border border-foreground/15 px-6 text-sm font-bold text-foreground transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground'>
              All projects
              <ArrowUpRightIcon className='size-4 transition-transform duration-300 group-hover:rotate-45' />
            </Link>
          </Reveal>
        </div>

        <div className='mt-14 grid gap-6 lg:grid-cols-12'>
          <div className='grid gap-6 lg:col-span-8'>
            {preview.map((work, i) => (
              <Reveal key={work.id} delay={i * 0.1}>
                <WorkCard work={work} index={i} featured={i === 0} />
              </Reveal>
            ))}
          </div>

          {/* On the horizon */}
          <Reveal delay={0.15} className='lg:col-span-4'>
            <div className='relative h-full overflow-hidden rounded-3xl border border-border bg-card p-8'>
              <div className='pattern-uli pointer-events-none absolute inset-0 opacity-50' />
              <div className='relative'>
                <p className='eyebrow text-clay'>On the horizon · 2026</p>
                <p className='font-display mt-3 text-2xl leading-snug font-medium text-foreground'>
                  What we are building next
                </p>
                <ul className='mt-8 space-y-6'>
                  {horizon.map((h, i) => (
                    <motion.li
                      key={h.title}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className='flex gap-4'>
                      <span className='grid size-11 shrink-0 place-items-center rounded-2xl bg-clay-muted text-clay'>
                        <h.icon className='size-5' />
                      </span>
                      <div>
                        <p className='font-semibold text-foreground'>{h.title}</p>
                        <p className='mt-1 text-sm leading-relaxed text-muted-foreground'>{h.body}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
