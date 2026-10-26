"use client";

import { motion } from "framer-motion";
import {
  BuildingIcon,
  GraduationCapIcon,
  HeartIcon,
  HandshakeIcon,
  ShieldIcon,
  SparklesIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const objectives = [
  {
    icon: BuildingIcon,
    title: "Social & Community Projects",
    description:
      "Engaging in infrastructure development and community improvement projects that enhance the quality of life in Nomeh.",
  },
  {
    icon: GraduationCapIcon,
    title: "Welfare & Empowerment",
    description:
      "Providing empowerment programmes, scholarships, and skill acquisition training to uplift community members.",
  },
  {
    icon: HeartIcon,
    title: "Charitable Activities",
    description:
      "Rendering compassionate assistance to the needy, less privileged, and vulnerable within and beyond Nomeh.",
  },
  {
    icon: HandshakeIcon,
    title: "Brotherhood & Unity",
    description:
      "Maintaining and nurturing a spirit of brotherhood, patriotism, love, and cooperation among all members.",
  },
  {
    icon: ShieldIcon,
    title: "Rights & Advocacy",
    description:
      "Defending and protecting the rights and interests of the age grade and its members wherever they are domiciled.",
  },
  {
    icon: SparklesIcon,
    title: "Peace & Progress",
    description:
      "Contributing to peace, unity, and progress of members, their families, and the broader Nomeh community.",
  },
];

const principles = [
  "Engage in social and charitable works",
  "Empower youth and underemployed adults",
  "Encourage entrepreneurship and skill acquisition",
  "Leverage community developmental processes",
];

export function MissionSection() {
  return (
    <section className='noise relative overflow-hidden bg-green-deep py-24 sm:py-32'>
      <div className='pattern-nsibidi pointer-events-none absolute inset-0 opacity-50' />
      <div className='pointer-events-none absolute top-1/3 -left-40 size-[34rem] rounded-full bg-green-mid/35 blur-[140px]' />

      <div className='relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid gap-16 lg:grid-cols-12 lg:gap-12'>
          {/* Sticky intro */}
          <div className='lg:col-span-5'>
            <div className='lg:sticky lg:top-32'>
              <SectionHeading
                tone='dark'
                eyebrow='What we stand for'
                title='Driven by purpose,'
                accent='united in brotherhood.'
                description={
                  <>
                    A non-profit, non-political organisation of male indigenes of Nomeh
                    Unateze born between 1980 and 1986 — governed by integrity, compassion
                    and communal responsibility.
                  </>
                }
              />

              <Reveal delay={0.2} className='mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm'>
                <p className='eyebrow text-gold/80'>Core principles</p>
                <ul className='mt-5 space-y-4'>
                  {principles.map((p, i) => (
                    <li key={p} className='flex items-start gap-4'>
                      <span className='font-display mt-0.5 text-sm text-gold'>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className='text-sm leading-relaxed text-white/75'>{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          {/* Objectives list */}
          <div id='objectives' className='lg:col-span-7'>
            <p className='eyebrow mb-6 text-white/40'>Aims & objectives</p>
            <ul className='border-t border-white/10'>
              {objectives.map((obj, i) => (
                <motion.li
                  key={obj.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className='group relative border-b border-white/10'>
                  {/* Hover wash */}
                  <span className='absolute inset-0 origin-left scale-x-0 bg-linear-to-r from-gold/10 via-clay/5 to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100' />
                  <div className='relative flex gap-5 py-8 sm:gap-8 sm:px-4'>
                    <span className='font-display w-10 shrink-0 text-2xl text-white/25 transition-colors duration-500 group-hover:text-gold sm:text-3xl'>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className='flex-1'>
                      <h3 className='font-display text-2xl font-medium text-white transition-transform duration-500 group-hover:translate-x-1 sm:text-[1.7rem]'>
                        {obj.title}
                      </h3>
                      <p className='mt-2 max-w-lg text-sm leading-relaxed text-white/55 sm:text-base'>
                        {obj.description}
                      </p>
                    </div>
                    <span className='hidden size-12 shrink-0 place-items-center rounded-full border border-white/15 text-white/50 transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-green-deep sm:grid'>
                      <obj.icon className='size-5' />
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
