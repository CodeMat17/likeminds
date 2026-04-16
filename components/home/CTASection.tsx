"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { staggerContainer, heroText } from "@/lib/animations";
import { Emblem } from "@/components/ui/Emblem";

export function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden noise">
      {/* Deep green background with layered glows */}
      <div className="absolute inset-0 bg-green-deep">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_30%_50%,oklch(0.36_0.17_152/35%)_0%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_80%_50%,oklch(0.74_0.17_72/10%)_0%,transparent_100%)]" />
      </div>

      {/* Igbo uli diamond pattern */}
      <div className="absolute inset-0 pattern-diamond pointer-events-none" />

      {/* Top & bottom gold rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Gradient-border frame around the entire CTA content */}
        <div className="gradient-border-static rounded-3xl p-10 md:p-16 bg-transparent">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center gap-6"
          >
            {/* Floating Emblem — richer than the plain logo */}
            <motion.div variants={heroText} className="animate-float">
              <div className="p-3 rounded-full bg-white/8 border border-white/12 backdrop-blur-sm">
                <motion.div
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Emblem size={100} className="text-gold" />
                </motion.div>
              </div>
            </motion.div>

            <motion.p variants={heroText} className="text-[11px] font-bold tracking-[0.35em] text-gold/70 uppercase">
              Join the Brotherhood
            </motion.p>

            <motion.h2
              variants={heroText}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              Are you a male indigene of Nomeh Unateze{" "}
              <br className="hidden sm:block" />
              <span className="text-gradient-gold animate-shimmer">
                born between 1980–1986?
              </span>
            </motion.h2>

            {/* Gold separator */}
            <motion.div
              variants={heroText}
              className="flex items-center gap-3"
            >
              <div className="h-px w-16 bg-linear-to-r from-transparent to-gold/60" />
              <span className="text-gold text-[9px]">◆</span>
              <div className="h-px w-16 bg-linear-to-l from-transparent to-gold/60" />
            </motion.div>

            <motion.p
              variants={heroText}
              className="text-white/65 text-lg max-w-2xl leading-relaxed"
            >
              If you are a male indigene of Nomeh Unateze with unquestionable character, born between 1980
              and 1986, we warmly invite you to join your brothers in the LikeMinds family.
              Together, let us continue to build our community and uphold the spirit of{" "}
              <em className="text-white/90 font-semibold not-italic">Ofu Obi Umunwanne</em>.
            </motion.p>

            <motion.div variants={heroText} className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-gold hover:bg-gold/90 text-green-deep font-bold text-base px-10 rounded-full shadow-lg shadow-gold/20 hover:shadow-gold/35 hover:shadow-xl transition-all duration-300"
              >
                <Link href="/join">
                  Apply for Membership
                  <ArrowRightIcon className="size-4 ml-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/35 font-semibold text-base px-10 rounded-full transition-all duration-300"
              >
                <a href="mailto:info@likeminds-nomeh.org">
                  <MailIcon className="size-4 mr-1" />
                  Contact Us
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
