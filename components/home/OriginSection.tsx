"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon, PhoneCallIcon } from "lucide-react";
import { Reveal, ScrollHighlight } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { UliBand } from "@/components/ui/Ornaments";

const milestones = [
  {
    when: "May 2024",
    title: "A phone call",
    body: "Old friends born 1980–1986 share jokes — and an idea: “It should not end here.”",
  },
  {
    when: "2024",
    title: "A name and a vow",
    body: "LikeMinds is adopted, sealed with the motto Ofu Obi Umunwanne.",
  },
  {
    when: "2024",
    title: "First of its kind",
    body: "The first age grade in Nomeh Unateze registered with the CAC — RN. 7810996.",
  },
  {
    when: "2024",
    title: "First outing",
    body: "Co-sponsors the maiden IMUYA Football Tournament for the youth of Nomeh Unateze.",
  },
];

export function OriginSection() {
  return (
    <section className='relative overflow-hidden bg-clay-muted/60 py-24 sm:py-32 dark:bg-clay-muted/40'>
      <UliBand className='absolute inset-x-0 top-0 text-clay/40' height={8} />
      <div className='pattern-uli pointer-events-none absolute inset-0 opacity-40' />

      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid gap-14 lg:grid-cols-12 lg:gap-12'>
          <div className='lg:col-span-5'>
            <SectionHeading
              eyebrow='How it began'
              title='It started with'
              accent='a phone call.'
              description='Great things rarely begin with grand plans. They begin with people who love each other, and who choose not to let a good thing end.'
            />
            <Reveal delay={0.2} className='mt-8'>
              <Link
                href='/about'
                className='group inline-flex items-center gap-2 font-semibold text-primary'>
                <span className='bg-linear-to-r from-primary to-primary bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-1'>
                  Read our full story
                </span>
                <ArrowRightIcon className='size-4 transition-transform duration-300 group-hover:translate-x-1' />
              </Link>
            </Reveal>
          </div>

          <div className='lg:col-span-7'>
            <Reveal className='relative'>
              <span
                aria-hidden
                className='font-display absolute -top-16 -left-2 text-[10rem] leading-none text-clay/25 select-none'>
                &ldquo;
              </span>
              <ScrollHighlight
                text='It should not end here. Since we are all within 1980 to 1986, let us form an Age Grade so we can keep the spirit, one love, growing.'
                className='font-display relative text-3xl leading-snug font-medium text-foreground sm:text-4xl lg:text-[2.6rem] lg:leading-[1.2]'
              />
              <p className='mt-6 flex items-center gap-3 text-sm font-semibold text-clay'>
                <PhoneCallIcon className='size-4' />
                The suggestion that started it all — May 2024
              </p>
            </Reveal>
          </div>
        </div>

        {/* Milestones */}
        <div className='relative mt-20 grid gap-px overflow-hidden rounded-3xl border border-clay/20 bg-clay/15 sm:grid-cols-2 lg:grid-cols-4'>
          {milestones.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className='group relative bg-background/85 p-7 transition-colors duration-500 hover:bg-card'>
              <div className='flex items-center justify-between'>
                <span className='eyebrow text-clay'>{m.when}</span>
                <span className='font-display text-3xl text-clay/30 transition-colors duration-500 group-hover:text-clay'>
                  0{i + 1}
                </span>
              </div>
              <h3 className='font-display mt-6 text-xl font-medium text-foreground'>{m.title}</h3>
              <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>{m.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
