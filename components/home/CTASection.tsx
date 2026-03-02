"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Emblem } from "@/components/ui/Emblem";
import { staggerContainer, heroText } from "@/lib/animations";
import Image from "next/image";

export function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.52_0.1_155)_0%,transparent_60%)] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.72_0.12_75/15%)_0%,transparent_60%)]" />
        {/* Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center gap-6"
        >
          <motion.div variants={heroText} className="animate-float">
         <Image alt='logo' width={100} height={100} src='/logo.webp' className="object-cover" />
          </motion.div>

          <motion.p variants={heroText} className="text-sm font-semibold tracking-[0.3em] text-white/60 uppercase">
            Join the Brotherhood
          </motion.p>

          <motion.h2
            variants={heroText}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
          >
            Are You a male Indigene of Nomeh Unateze without a questionable character <br className="hidden sm:block" />
            <span className="text-gradient-gold animate-shimmer">Born between 1980–1986?</span>
          </motion.h2>

          <motion.p
            variants={heroText}
            className="text-white/75 text-lg max-w-2xl leading-relaxed"
          >
            If you are a male indigene of Nomeh Unateze without questionable character, born between 1980 and 1986,
            we warmly invite you to join your brothers in the
            LikeMinds family. Together, let us continue to build our community
            and uphold the spirit of{" "}
            <em className="text-white font-semibold">Ofu Obi Umunwanne</em>.
          </motion.p>

          <motion.div variants={heroText} className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              className=" bg-teal-700 hover:bg-gold/90 text-white px-8 rounded-full"
            >
              <Link href="/join">
                Apply for Membership
                <ArrowRightIcon className="size-4 ml-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="link"
              size="lg"
              className="border bg-black/30 text-white px-8 rounded-full"
            >
              <a href="mailto:info@likeminds-nomeh.org">
                <MailIcon className="size-4" />
                Contact Us
              </a>
            </Button>
          </motion.div>

     
        </motion.div>
      </div>
    </section>
  );
}
