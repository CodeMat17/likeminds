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
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";

const objectives = [
  {
    icon: BuildingIcon,
    title: "Social & Community Projects",
    description:
      "Engaging in infrastructure development and community improvement projects that enhance the quality of life in Nomeh.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/40",
  },
  {
    icon: GraduationCapIcon,
    title: "Welfare & Empowerment",
    description:
      "Providing empowerment programmes, scholarships, and skill acquisition training to uplift community members.",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/40",
  },
  {
    icon: HeartIcon,
    title: "Charitable Activities",
    description:
      "Rendering compassionate assistance to the needy, less privileged, and vulnerable within and beyond Nomeh.",
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/40",
  },
  {
    icon: HandshakeIcon,
    title: "Brotherhood & Unity",
    description:
      "Maintaining and nurturing a spirit of brotherhood, patriotism, love, and cooperation among all members.",
    color: "text-gold",
    bg: "bg-amber-50 dark:bg-amber-950/40",
  },
  {
    icon: ShieldIcon,
    title: "Rights & Advocacy",
    description:
      "Defending and protecting the rights and interests of the age grade and its members wherever they are domiciled.",
    color: "text-green-light",
    bg: "bg-green-50 dark:bg-green-950/40",
  },
  {
    icon: SparklesIcon,
    title: "Peace & Progress",
    description:
      "Contributing to peace, unity, and progress of members, their families, and the broader Nomeh community.",
    color: "text-teal-500",
    bg: "bg-teal-50 dark:bg-teal-950/40",
  },
];

export function MissionSection() {
  return (
    <section className="py-24 bg-muted/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInLeft}
          >
            <span className="text-sm font-bold tracking-[0.3em] text-primary uppercase">
              Who We Are
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-5 leading-tight">
              Driven by Purpose,
              <br />
              <span className="text-gradient-green">United in Brotherhood</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The{" "}
              <strong className="text-foreground">
                Nomeh Unateze Community Development LikeMinds 1980–1986 Association
              </strong>{" "}
              is a non-profit, non-political organisation of male indigenes of Nomeh Unateze
              born between 1980 and 1986. We are firmly bound by the motto{" "}
              <em className="text-gold font-semibold">Ofu Obi Umunwanne</em> —
              One Heart, One Brotherhood.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              From our inception, we have resolved to be governed by the highest
              principles of integrity, compassion, and communal responsibility —
              contributing to the development of Nomeh Unateze and ensuring quality representation.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-10 h-0.5 bg-gold rounded-full" />
              <p className="text-sm italic text-gold font-semibold">
                &quot;Ofu Obi Umunwanne&quot;
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInRight}
            className="relative"
          >
            <div className="relative bg-primary rounded-3xl p-8 overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/15 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <p className="text-sm font-bold tracking-[0.25em]  uppercase mb-3 text-white/70">
                  Our Constitution
                </p>
                <h3 className="font-serif text-2xl font-bold text-white mb-6">
                  Core Principles
                </h3>
                <div className="space-y-4">
                  {[
                    "Engage in social and charitable works",
                    "Empower youth and underemployed adults",
                    "Encourage entrepreneurship and skill acquisition",
                    "Eradicate poverty, idleness and crime",
                    "Leverage community developmental processes",
                  ].map((principle, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-gold/20 border border-white/70 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-white/70">{i + 1}</span>
                      </div>
                      <p className="text-sm text-white/80 leading-relaxed">{principle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Objectives grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="text-center mb-10"
        >
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            Aims & Objectives
          </h3>
          <div className="w-12 h-0.5 bg-gold mx-auto mt-3 rounded-full" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {objectives.map((obj) => (
            <motion.div
              key={obj.title}
              variants={fadeInUp}
              className="group bg-card rounded-2xl border border-border p-6 hover:border-primary/25 hover:shadow-lg transition-all duration-300"
            >
              <div className={`inline-flex p-3 rounded-xl ${obj.bg} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <obj.icon className={`size-5 ${obj.color}`} />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{obj.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{obj.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
