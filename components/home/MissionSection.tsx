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

export function MissionSection() {
  return (
    <section className="relative py-24 bg-muted/40 overflow-hidden">
      {/* Igbo uli chevron pattern */}
      <div className="absolute inset-0 pattern-uli opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <span className="text-gradient-gold animate-shimmer">United in Brotherhood</span>
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
              principles of integrity, compassion, and communal responsibility,
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
            <div className="relative bg-green-deep rounded-3xl p-8 overflow-hidden gradient-border-static">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-green-mid/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-gold/8 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
              {/* Top gold rule */}
              <div className="absolute top-0 inset-x-8 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent" />

              <div className="relative z-10">
                <p className="text-[11px] font-bold tracking-[0.3em] uppercase mb-3 text-gold/60">
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
                  
                    "Leverage community developmental processes",
                  ].map((principle, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <div className="w-6 h-6 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-gold/25 transition-colors duration-200">
                        <span className="text-[11px] font-bold text-gold/80">{i + 1}</span>
                      </div>
                      <p className="text-sm text-white/75 leading-relaxed group-hover:text-white/90 transition-colors duration-200">
                        {principle}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Objectives header */}
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

        {/* Objectives grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {objectives.map((obj, i) => (
            <motion.div
              key={obj.title}
              variants={fadeInUp}
              className="group relative bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Hover background glow */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/4 via-transparent to-gold/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Icon — lantern style with gold hover */}
              <div className="relative inline-flex p-3 rounded-xl bg-primary/8 border border-primary/15 mb-4 group-hover:bg-gold/8 group-hover:border-gold/40 group-hover:scale-110 transition-all duration-300">
                <obj.icon className="size-5 text-primary group-hover:text-gold transition-colors duration-300" />
              </div>

              {/* Number watermark */}
              <span className="absolute top-4 right-5 text-6xl font-black text-primary/5 select-none leading-none">
                {i + 1}
              </span>

              <h4 className="relative font-semibold text-foreground mb-2">{obj.title}</h4>
              <p className="relative text-sm text-muted-foreground leading-relaxed">{obj.description}</p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 inset-x-6 h-px bg-linear-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/30 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
