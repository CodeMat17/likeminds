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
} from "lucide-react";
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight, scaleIn, timelineItem } from "@/lib/animations";
import Image from "next/image";
import { Emblem } from "@/components/ui/Emblem";

const aims = [
  { icon: BuildingIcon, text: "To engage in social and community projects." },
  { icon: HeartIcon, text: "To embark on welfare and empowerment programs and ancillary activities as a means of giving back and inspiring the people of the community." },
  { icon: StarIcon, text: "To engage in, participate and encourage charitable, benevolent and other philanthropic activities within the association's location and jurisdiction." },
  { icon: UsersIcon, text: "To maintain and nurture a spirit of brotherhood, patriotism, love and cooperation among members." },
  { icon: ShieldIcon, text: "To defend and protect the rights and interests of the age grade and the entire members wherever they are domiciled." },
  { icon: TargetIcon, text: "To encourage the progress and welfare of the age grade and Nomeh in general." },
  { icon: HeartIcon, text: "To contribute to peace, unity and progress of the members and their families." },
  { icon: HeartIcon, text: "To demonstrate empathy, sympathy and benevolence to members in particular and others in need in the community in general." },
];

const coreObjectives = [
  { num: "01", title: "Social & Charitable Works", desc: "To engage in social and charitable works, render assistance to the needy and less privileged in the society." },
  { num: "02", title: "Youth Empowerment", desc: "To empower youths and all categories of unemployed or underemployed youth and adults for more productivity." },
  { num: "03", title: "Entrepreneurship Development", desc: "To encourage entrepreneurship development, capacity building and skill acquisition." },
  { num: "04", title: "Eradicate Poverty & Crime", desc: "To engage in activities that will eradicate poverty, idleness and crime in our community." },
  { num: "05", title: "Community Development", desc: "To leverage the developmental process of the community by assisting, cooperating, and encouraging the community and town." },
];



export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero — distinct dark green + diamond pattern, Emblem-centred */}
      <section className="relative py-24 bg-green-deep overflow-hidden noise">
        <div className="absolute inset-0 pattern-diamond pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.36_0.17_152/50%)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.74_0.17_72/6%)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-5"
          >
            <motion.div variants={scaleIn} className="relative flex items-center justify-center">
              <motion.div
                className="absolute opacity-[0.06] pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              >
                <Emblem size={200} className="text-white" />
              </motion.div>
              <Emblem size={90} className="text-gold relative z-10" />
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold text-white">
              About LikeMinds
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-white/75 text-lg max-w-2xl leading-relaxed">
              The story of a brotherhood built on purpose, united in love for Nomeh Unateze, and
              driven by the timeless spirit of <em className="text-gold font-semibold">Ofu Obi Umunwanne</em>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Origin story */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInLeft}
              className="space-y-6"
            >
              <span className=" font-bold tracking-[0.3em] text-primary uppercase">Our Story</span>
              <h2 className="font-sans text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                Who We Are & Why We Exist
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The <strong className="text-foreground">Nomeh Unateze Community Development LikeMinds 1980–1986 Association</strong> is
                  a non-profit, non-political organization of indigenes of Nomeh, a proud community in Enugu State,
                  Nigeria, who were born between the years 1980 and 1986.
                </p>
                <p>
                  Bound together by birth, community, and a deep love for our homeland, the members of LikeMinds
                  have solemnly resolved to provide for ourselves a constitution and to be governed by its provisions,
                  channelling our collective energy, resources, and professional expertise toward the development of Nomeh.
                </p>
                <p>
                  Our motto — <strong className="text-foreground italic">Ofu Obi Umunwanne</strong> — captures our
                  founding spirit perfectly. No matter where life has taken us to, we remain one people with one heart for Nomeh.
                </p>
              </div>
              <div className="flex items-center gap-3 border-l-4 border-gold pl-5 py-2 bg-gold-muted rounded-r-lg">
                <BookOpenIcon className="size-5 text-gold shrink-0" />
                <p className="text-sm text-foreground font-medium italic">
                  &quot;We do firmly and solemnly resolve to provide for ourselves a constitution and to be governed by the provisions therein contained.&quot;
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeInRight}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Non-Profit", value: "Organization", icon: HeartIcon, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/40" },
                { label: "Non-Political", value: "Association", icon: ScaleIcon, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/40" },
                { label: "Age Bracket", value: "1980 – 1986", icon: UsersIcon, color: "text-green-light", bg: "bg-green-50 dark:bg-green-950/40" },
                { label: "Base", value: "Enugu, Nigeria", icon: BuildingIcon, color: "text-gold", bg: "bg-amber-50 dark:bg-amber-950/40" },
              ].map((item) => (
                <div key={item.label} className={`rounded-2xl p-5 ${item.bg} border border-border`}>
                  <div className={`mb-3 ${item.color}`}><item.icon className="size-5" /></div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{item.label}</p>
                  <p className="font-sans font-bold text-foreground mt-1">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emblem separator */}
      <div className="flex items-center gap-4 max-w-7xl mx-auto px-8 py-2">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent" />
        <Emblem size={32} variant="icon" className="text-gold opacity-50" />
        <div className="flex-1 h-px bg-linear-to-l from-transparent via-gold/40 to-transparent" />
      </div>

      {/* Founding History */}
      <section className="py-20 bg-muted/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <span className="font-bold tracking-[0.3em] text-primary uppercase">Our Beginning</span>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-foreground mt-2">
              How LikeMinds Began
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              A phone call. A shared laugh. A decision that made history.
            </p>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Pull quote */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={scaleIn}
              className="relative bg-green-deep rounded-3xl px-8 py-10 md:px-14 md:py-12 mb-12 overflow-hidden noise"
            >
              <div className="absolute inset-0 pattern-diamond pointer-events-none opacity-60" />
              <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />
              <div className="relative z-10 text-center">
                <span className="text-gold/30 font-sans font-black text-8xl leading-none select-none absolute -top-2 left-6">&ldquo;</span>
                <p className="text-white/90 text-xl sm:text-2xl font-semibold leading-relaxed italic relative z-10 px-4">
                  It should not end here. Since we are all within 1980 to 1986, let us form an Age Grade so we can keep the spirit, one love, growing.
                </p>
                <p className="text-gold/70 text-sm font-bold tracking-widest uppercase mt-5">
                  — The suggestion that started it all, May 2024
                </p>
              </div>
            </motion.div>

            {/* Narrative */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-6"
            >
              {[
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
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="flex gap-5 bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="shrink-0 w-1 rounded-full bg-linear-to-b from-gold/80 to-gold/20 self-stretch" />
                  <div>
                    <h3 className="font-sans font-bold text-foreground mb-2">{item.heading}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Closing statement */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mt-10 text-center"
            >
              <div className="flex items-center gap-3 justify-center mb-4">
                <div className="h-px w-16 bg-linear-to-r from-transparent to-gold/60" />
                <span className="text-gold text-[9px]">◆</span>
                <div className="h-px w-16 bg-linear-to-l from-transparent to-gold/60" />
              </div>
              <p className="text-foreground font-semibold italic text-lg">Ofu Obi Umunwanne.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emblem separator */}
      <div className="flex items-center gap-4 max-w-7xl mx-auto px-8 py-2">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent" />
        <Emblem size={32} variant="icon" className="text-gold opacity-50" />
        <div className="flex-1 h-px bg-linear-to-l from-transparent via-gold/40 to-transparent" />
      </div>

      {/* Aims & Objectives */}
      <section id="objectives" className="py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <span className=" font-bold tracking-[0.3em] text-primary uppercase">Our Mandate</span>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-foreground mt-2">
              Aims & Objectives
            </h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              The aims and objectives of the Association shall include but are not limited to:
            </p>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 max-w-4xl mx-auto"
          >
            {aims.map((aim, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex items-start gap-4 bg-card rounded-xl border border-border p-5 hover:border-primary/30 hover:shadow-md transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <aim.icon className="size-4 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{aim.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Emblem separator */}
      <div className="flex items-center gap-4 max-w-7xl mx-auto px-8 py-2">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent" />
        <Emblem size={32} variant="icon" className="text-gold opacity-50" />
        <div className="flex-1 h-px bg-linear-to-l from-transparent via-gold/40 to-transparent" />
      </div>

      {/* Core Objectives — vertical timeline layout */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">Our Mission</span>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-foreground mt-2">
              Core Objectives
            </h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {/* Gold left rail */}
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-linear-to-b from-gold/60 via-gold/30 to-transparent" />

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="space-y-6"
              >
                {coreObjectives.map((obj, i) => (
                  <motion.div
                    key={obj.num}
                    variants={timelineItem}
                    className="flex gap-6 relative"
                  >
                    {/* Gold circle badge */}
                    <div className="w-12 h-12 rounded-full bg-green-deep border-2 border-gold/60 flex items-center justify-center shrink-0 z-10 shadow-lg">
                      <span className="text-gold font-black font-sans text-sm">{obj.num}</span>
                    </div>
                    {/* Content card */}
                    <div className="flex-1 bg-card rounded-2xl border border-border p-5 hover:border-gold/30 hover:shadow-lg transition-all duration-300 mb-0">
                      <h3 className="font-sans font-bold text-foreground mb-1.5">{obj.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{obj.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}
