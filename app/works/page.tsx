"use client";

import { works } from "@/lib/data/works";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { WorkCard } from "@/components/works/WorkCard";

export default function WorksPage() {
  return (
    <>
      <PageHero
        eyebrow='Our Works'
        title='Promises kept'
        accent='in Nomeh.'
        watermark='Nomeh Unateze'
        description={
          <>
            Every project is a promise kept to our community, to the next generation, and
            to the spirit of <em className='font-display text-gold'>Ofu Obi Umunwanne</em>.
          </>
        }
      />

      <section className='bg-background py-20 sm:py-28'>
        <div className='mx-auto max-w-5xl px-4 sm:px-6 lg:px-8'>
          <div className='grid gap-8'>
            {works.map((work, i) => (
              <Reveal key={work.id} delay={i * 0.08}>
                <WorkCard work={work} index={i} featured />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
