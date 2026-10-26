"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRightIcon, CheckIcon, MailIcon } from "lucide-react";
import { Reveal, WordReveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { RotatingSeal, UliBand } from "@/components/ui/Ornaments";

const criteria = ["Male indigene of Nomeh Unateze", "Good character", "Born 1980 – 1986"];

export function CTASection() {
  return (
    <section className='noise relative overflow-hidden bg-clay py-24 text-white sm:py-32 dark:bg-clay-muted'>
      <div className='pattern-diamond pointer-events-none absolute inset-0 opacity-70' />
      <div className='pointer-events-none absolute -top-32 -left-32 size-[30rem] rounded-full bg-gold/30 blur-[130px]' />
      <div className='pointer-events-none absolute -right-20 -bottom-40 size-[34rem] rounded-full bg-green-deep/50 blur-[140px]' />
      <UliBand className='absolute inset-x-0 top-0 text-white/30' height={10} />

      <div className='relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-8'>
        <div className='lg:col-span-8'>
          <Reveal y={12} className='eyebrow text-gold-light'>
            Join the brotherhood
          </Reveal>
          <h2 className='font-display mt-5 text-4xl leading-[1.05] font-medium sm:text-5xl lg:text-6xl'>
            <WordReveal
              segments={[
                { text: "Are you a son of Nomeh Unateze,", br: true },
                { text: "born 1980–1986?", className: "italic font-display-wonk text-gold-light" },
              ]}
            />
          </h2>
          <Reveal delay={0.15} className='mt-6 max-w-2xl text-lg leading-relaxed text-white/80'>
            If you are a male indigene of Nomeh Unateze with unquestionable character,
            born between 1980 and 1986, we warmly invite you to join your brothers in the
            LikeMinds family — and uphold the spirit of{" "}
            <em className='font-display text-white'>Ofu Obi Umunwanne</em>.
          </Reveal>

          <Reveal delay={0.25} className='mt-8 flex flex-wrap gap-2.5'>
            {criteria.map((c) => (
              <span
                key={c}
                className='inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm'>
                <CheckIcon className='size-3.5 text-gold-light' />
                {c}
              </span>
            ))}
          </Reveal>

          <Reveal delay={0.35} className='mt-10 flex flex-col gap-4 sm:flex-row sm:items-center'>
            <Magnetic>
              <Link
                href='/join'
                className='group inline-flex h-14 items-center gap-3 rounded-full bg-white pr-2 pl-7 text-base font-bold text-green-deep transition-colors duration-300 hover:bg-gold-light'>
                Apply for membership
                <span className='grid size-10 place-items-center rounded-full bg-green-deep text-gold transition-transform duration-500 group-hover:rotate-45'>
                  <ArrowUpRightIcon className='size-4' />
                </span>
              </Link>
            </Magnetic>
            <Link
              href='/contact'
              className='inline-flex h-14 items-center gap-2 rounded-full border border-white/30 px-7 font-semibold transition-colors duration-300 hover:bg-white/10'>
              <MailIcon className='size-4' />
              Ask us a question
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.2} className='hidden justify-center lg:col-span-4 lg:flex'>
          <RotatingSeal
            text='ONE HEART • ONE BROTHERHOOD • OFU OBI UMUNWANNE • '
            className='size-72 text-white/80'>
            <div className='grid size-44 place-items-center rounded-full border border-white/20 bg-green-deep/40 backdrop-blur-md'>
              <Image src='/logo.png' alt='' width={110} height={110} className='animate-float' />
            </div>
          </RotatingSeal>
        </Reveal>
      </div>
    </section>
  );
}
