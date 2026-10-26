"use client";

import { motion } from "framer-motion";
import {
  ScaleIcon,
  TargetIcon,
  HeartIcon,
  UsersIcon,
  StarIcon,
  ShieldIcon,
  BookOpenIcon,
  BuildingIcon,
  HandHeartIcon,
  SunIcon,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, ScrollHighlight } from "@/components/motion/Reveal";
import { DiamondRule, UliBand } from "@/components/ui/Ornaments";

const EASE = [0.16, 1, 0.3, 1] as const;

const facts = [
  { label: "Non-Profit", value: "Organization", icon: HeartIcon },
  { label: "Non-Political", value: "Association", icon: ScaleIcon },
  { label: "Age Bracket", value: "1980 – 1986", icon: UsersIcon },
  { label: "Base", value: "Enugu, Nigeria", icon: BuildingIcon },
];

const chapters = [
  {
    heading: "A Call That Was Never Meant to Be Historic",
    body: "Sometime in May 2024, a few friends, Nomeh indigenes born between 1980 and 1986, got on a call to share pleasantries and jokes. Laughter filled the atmosphere. The kind of warmth that only old friends can stir swept through every voice on the line, gladdening every heart. Nobody planned for that call to change anything. And yet, it changed everything.",
  },
  {
    heading: "The Idea That Took Root",
    body: "In the middle of the merriment, someone paused and said something that would outlast the laughter: \"It should not end here.\" That simple thought was all it took. Since everyone on the call was born within the same window of years, 1980 to 1986, it would be beautiful to formalise what already existed between them: form an Age Grade, so that one love could keep growing. The idea landed with warmth and unanimous agreement. The friendship would not remain just a phone call. It would become a movement.",
  },
  {
    heading: "A Name and a Declaration",
    body: "In the days that followed, a name was adopted: LikeMinds - Ofu Obi Umunwanne. It was more than a name, it was a declaration. Ofu Obi Umunwanne means \"one heart, one brotherhood,\" and it perfectly captured what these men already were to one another. With that name came a sense of responsibility: to channel their collective talent, resources, and passion toward the development of Nomeh Unateze, the community that raised them.",
  },
  {
    heading: "The First of Its Kind",
    body: "What began as a phone call made history. LikeMinds 1980–1986 became the first known Age Grade group in Nomeh Unateze, and the first formally registered Age Grade with the Corporate Affairs Commission, CAC, in the community, bearing registration number RN. 7810996. Great things rarely begin with grand plans. They begin with people who love each other, who choose not to let a good thing end.",
  },
];

const aims = [
  { icon: BuildingIcon, text: "To engage in social and community projects." },
  { icon: HeartIcon, text: "To embark on welfare and empowerment programs and ancillary activities as a means of giving back and inspiring the people of the community." },
  { icon: StarIcon, text: "To engage in, participate and encourage charitable, benevolent and other philanthropic activities within the association's location and jurisdiction." },
  { icon: UsersIcon, text: "To maintain and nurture a spirit of brotherhood, patriotism, love and cooperation among members." },
  { icon: ShieldIcon, text: "To defend and protect the rights and interests of the age grade and the entire members wherever they are domiciled." },
  { icon: TargetIcon, text: "To encourage the progress and welfare of the age grade and Nomeh in general." },
  { icon: SunIcon, text: "To contribute to peace, unity and progress of the members and their families." },
  { icon: HandHeartIcon, text: "To demonstrate empathy, sympathy and benevolence to members in particular and others in need in the community in general." },
];

const coreObjectives = [
  { num: "01", title: "Social & Charitable Works", desc: "To engage in social and charitable works, render assistance to the needy and less privileged in the society." },
  { num: "02", title: "Youth Empowerment", desc: "To empower youths and all categories of unemployed or underemployed youth and adults for more productivity." },
  { num: "03", title: "Entrepreneurship Development", desc: "To encourage entrepreneurship development, capacity building and skill acquisition." },
  { num: "04", title: "Eradicate Poverty & Crime", desc: "To engage in activities that will eradicate poverty, idleness and crime in our community." },
  { num: "05", title: "Community Development", desc: "To leverage the developmental process of the community by assisting, cooperating, and encouraging the community and town." },
];

const ROMAN = ["I", "II", "III", "IV"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow='About Us'
        title='A brotherhood'
        accent='built on purpose.'
        watermark='Umunwanne'
        description={
          <>
            The story of a brotherhood united in love for Nomeh Unateze, and driven by
            the timeless spirit of{" "}
            <em className='font-display text-gold'>Ofu Obi Umunwanne</em>.
          </>
        }
      />

      {/* ── Who we are ─────────────────────────────────────────────── */}
      <section className='bg-background py-24 sm:py-32'>
        <div className='mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:px-8'>
          <div className='lg:col-span-7'>
            <SectionHeading eyebrow='Our story' title='Who we are' accent='& why we exist.' />
            <Reveal delay={0.1} className='mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground'>
              <p>
                The{" "}
                <strong className='text-foreground'>
                  Nomeh Unateze Community Development LikeMinds 1980–1986 Association
                </strong>{" "}
                is a non-profit, non-political organization of indigenes of Nomeh, a proud
                community in Enugu State, Nigeria, who were born between the years 1980 and 1986.
              </p>
              <p>
                Bound together by birth, community, and a deep love for our homeland, the
                members of LikeMinds have solemnly resolved to provide for ourselves a
                constitution and to be governed by its provisions, channelling our collective
                energy, resources, and professional expertise toward the development of Nomeh.
              </p>
              <p>
                Our motto — <strong className='text-foreground italic'>Ofu Obi Umunwanne</strong> —
                captures our founding spirit perfectly. No matter where life has taken us to, we
                remain one people with one heart for Nomeh.
              </p>
            </Reveal>
          </div>

          <div className='flex flex-col gap-5 lg:col-span-5 lg:pt-16'>
            <div className='grid grid-cols-2 gap-4'>
              {facts.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
                  className='group rounded-3xl border border-border bg-card p-6 transition-colors duration-500 hover:border-clay/40'>
                  <span className='grid size-11 place-items-center rounded-2xl bg-clay-muted text-clay transition-transform duration-500 group-hover:-rotate-6'>
                    <item.icon className='size-5' />
                  </span>
                  <p className='eyebrow mt-5 text-[0.65rem] text-muted-foreground'>{item.label}</p>
                  <p className='font-display mt-1 text-lg font-medium text-foreground'>{item.value}</p>
                </motion.div>
              ))}
            </div>
            <Reveal delay={0.3} className='relative overflow-hidden rounded-3xl bg-green-deep p-7 text-white'>
              <div className='pattern-nsibidi absolute inset-0 opacity-60' />
              <div className='relative flex gap-4'>
                <BookOpenIcon className='mt-1 size-5 shrink-0 text-gold' />
                <p className='font-display text-lg leading-relaxed italic text-white/90'>
                  &ldquo;We do firmly and solemnly resolve to provide for ourselves a constitution
                  and to be governed by the provisions therein contained.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── How it began ───────────────────────────────────────────── */}
      <section className='relative overflow-hidden bg-clay-muted/60 py-24 sm:py-32 dark:bg-clay-muted/40'>
        <UliBand className='absolute inset-x-0 top-0 text-clay/40' height={8} />
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <SectionHeading
            align='center'
            eyebrow='Our beginning'
            title='How LikeMinds'
            accent='began.'
            description='A phone call. A shared laugh. A decision that made history.'
          />

          <Reveal className='mx-auto mt-16 max-w-4xl text-center'>
            <ScrollHighlight
              text='“It should not end here. Since we are all within 1980 to 1986, let us form an Age Grade so we can keep the spirit, one love, growing.”'
              className='font-display justify-center text-3xl leading-snug font-medium text-foreground italic sm:text-4xl'
            />
            <p className='eyebrow mt-6 text-clay'>— The suggestion that started it all, May 2024</p>
          </Reveal>

          {/* Chapters timeline */}
          <div className='relative mx-auto mt-20 max-w-4xl'>
            <div className='absolute top-0 bottom-0 left-6 w-px bg-linear-to-b from-clay/60 via-clay/30 to-transparent sm:left-1/2' />
            <div className='space-y-12'>
              {chapters.map((item, i) => (
                <motion.div
                  key={item.heading}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className={`relative grid gap-6 pl-16 sm:grid-cols-2 sm:gap-12 sm:pl-0 ${
                    i % 2 === 1 ? "sm:[&>div]:col-start-2" : ""
                  }`}>
                  <span className='font-display absolute top-0 left-0 grid size-12 place-items-center rounded-full border border-clay/40 bg-background text-lg text-clay italic sm:left-1/2 sm:-translate-x-1/2'>
                    {ROMAN[i]}
                  </span>
                  <div className={`rounded-3xl border border-border bg-card p-7 shadow-[0_20px_50px_-30px_oklch(0.4_0.08_45/35%)] ${i % 2 === 0 ? "sm:mr-6" : "sm:ml-6"}`}>
                    <p className='eyebrow text-clay'>Chapter {ROMAN[i]}</p>
                    <h3 className='font-display mt-3 text-2xl leading-snug font-medium text-foreground'>
                      {item.heading}
                    </h3>
                    <p className='mt-3 leading-relaxed text-muted-foreground'>{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <Reveal className='mt-16 flex flex-col items-center gap-4 text-clay'>
            <DiamondRule />
            <p className='font-display text-2xl text-foreground italic'>Ofu Obi Umunwanne.</p>
          </Reveal>
        </div>
      </section>

      {/* ── Aims & objectives ──────────────────────────────────────── */}
      <section id='objectives' className='scroll-mt-24 bg-background py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <SectionHeading
            align='center'
            eyebrow='Our mandate'
            title='Aims &'
            accent='objectives.'
            description='The aims and objectives of the Association shall include but are not limited to:'
          />

          <div className='mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-2'>
            {aims.map((aim, i) => (
              <motion.div
                key={aim.text}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: EASE }}
                className='group flex items-start gap-5 rounded-3xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/30'>
                <span className='grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground'>
                  <aim.icon className='size-5' />
                </span>
                <p className='leading-relaxed text-muted-foreground'>{aim.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core objectives ────────────────────────────────────────── */}
      <section className='noise relative overflow-hidden bg-green-deep py-24 sm:py-32'>
        <div className='pattern-nsibidi pointer-events-none absolute inset-0 opacity-50' />
        <div className='relative z-10 mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-8'>
          <div className='lg:col-span-5'>
            <div className='lg:sticky lg:top-32'>
              <SectionHeading
                tone='dark'
                eyebrow='Our mission'
                title='Five commitments'
                accent='we live by.'
                description='The core objectives written into our constitution — the measure against which every project is judged.'
              />
            </div>
          </div>
          <ol className='space-y-4 lg:col-span-7'>
            {coreObjectives.map((obj, i) => (
              <motion.li
                key={obj.num}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: EASE }}
                className='group flex gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors duration-500 hover:border-gold/40 hover:bg-white/[0.07]'>
                <span className='font-display text-4xl leading-none text-gold/40 transition-colors duration-500 group-hover:text-gold'>
                  {obj.num}
                </span>
                <div>
                  <h3 className='font-display text-xl font-medium text-white'>{obj.title}</h3>
                  <p className='mt-2 leading-relaxed text-white/60'>{obj.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
