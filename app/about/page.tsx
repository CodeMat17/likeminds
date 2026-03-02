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
import { Emblem } from "@/components/ui/Emblem";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight, scaleIn } from "@/lib/animations";
import { excoMembers } from "@/lib/data/members";
import Image from "next/image";

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

const constitutionArticles = [
  {
    title: "Article I – Name & Identity",
    content: "The organization shall be known and called 'NOMEH UNATEZE COMMUNITY DEVELOPMENT LIKEMINDS 1980-1986 ASSOCIATION, ENUGU'. It is a non-profit and non-political organization.",
  },
  {
    title: "Article II – Motto",
    content: "The motto of the Association shall be 'OFU OBI UMUNWANNE' — One Heart, One Brotherhood. This motto shall guide all actions and decisions of the Association.",
  },
  {
    title: "Article III – Membership",
    content: "Membership is open to all indigenes of Nomeh Unateze born between 1980 and 1986 who subscribe to the aims and objectives of the Association and agree to be bound by its constitution.",
  },
  {
    title: "Article IV – Governance",
    content: "The Association shall be governed by an Executive Council comprising elected officers including a President, Vice President, General Secretary, Treasurer, Financial Secretary, Welfare Officer, Social Secretary, Legal Adviser, PRO, and Auditor.",
  },
  {
    title: "Article V – Meetings",
    content: "The Association shall hold regular general meetings, special meetings as required, and an Annual General Meeting (AGM). The Executive Council shall meet at least monthly to conduct the affairs of the Association.",
  },
  {
    title: "Article VI – Finances",
    content: "The Association shall be funded by member dues, levies, donations, grants, and proceeds from fundraising activities. All funds shall be managed transparently with proper accounting and independent auditing.",
  },
  {
    title: "Article VII – Amendment",
    content: "This constitution may be amended at an Annual General Meeting by a two-thirds majority of members present and voting, provided that the proposed amendment has been circulated to all members at least 21 days before the meeting.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.52_0.1_155)_0%,transparent_60%)]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-5"
          >
            <motion.div variants={scaleIn}>
              <Image src="/logo.webp" alt="logo" width={80} height={80} className="object-cover" />
            </motion.div>
          
            <motion.h1 variants={fadeInUp} className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white">
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
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                Who We Are & Why We Exist
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The <strong className="text-foreground">Nomeh Unateze Community Development LikeMinds 1980–1986 Association</strong> is
                  a non-profit, non-political organization of indigenes of Nomeh — a proud community in Enugu State,
                  Nigeria — who were born between the years 1980 and 1986.
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
                  <p className="font-serif font-bold text-foreground mt-1">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

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
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
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

      {/* Core Objectives */}
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
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
              Core Objectives
            </h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {coreObjectives.map((obj, i) => (
              <motion.div
                key={obj.num}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-5 bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="font-serif text-4xl font-black text-primary/20 leading-none shrink-0 w-12 text-right">
                  {obj.num}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1.5">{obj.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{obj.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Constitution */}
      {/* <section id="constitution" className="py-20 bg-muted/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">Legal Framework</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
              Our Constitution
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Key articles from the LikeMinds 1980–1986 Association Constitution
            </p>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {constitutionArticles.map((article, i) => (
                <AccordionItem
                  key={i}
                  value={`article-${i}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30 data-[state=open]:shadow-md transition-all duration-200"
                >
                  <AccordionTrigger className="font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                    {article.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {article.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section> */}

      {/* Executive Council */}
      <section id="leadership" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <span className=" font-bold tracking-[0.3em] text-primary uppercase">Leadership</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
              Executive Council
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Elected leaders guiding the Association with wisdom, integrity, and dedication.
            </p>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4 rounded-full" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {excoMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={scaleIn}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-4">
                  <Badge variant="outline" className="text-[10px] font-semibold text-primary border-primary/30 mb-2">
                    {member.role}
                  </Badge>
                  <p className="font-serif font-bold text-foreground text-sm leading-tight">
                    {member.title} {member.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {member.occupation}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
