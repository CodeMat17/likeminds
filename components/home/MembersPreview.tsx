"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { members } from "@/lib/data/members";
import { fadeInUp } from "@/lib/animations";

// Duplicate each row for a seamless infinite loop (-50% = exactly one copy)
const row1 = [...members, ...members];
const row2 = [...[...members].reverse(), ...[...members].reverse()];

export function MembersPreview() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
              Our People
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-2">
              Meet the Members
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl">
              A distinguished group of professionals, entrepreneurs, and community champions
              united by birthplace, generation, and the spirit of brotherhood.
            </p>
          </div>
          <Button asChild variant="outline" className="self-start sm:self-auto shrink-0">
            <Link href="/members" className="gap-2">
              View All Members
              <ArrowRightIcon className="size-4" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Row 1 — drifts left, pauses on hover; fade masks on edges */}
      <div
        className="mb-4 group/row1"
        style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
      >
        <div
          className="flex gap-4 group-hover/row1:[animation-play-state:paused]"
          style={{
            width: "max-content",
            animation: "scroll-left 45s linear infinite",
          }}
        >
          {row1.map((member, idx) => (
            <MemberCard key={`r1-${idx}`} member={member} />
          ))}
        </div>
      </div>

      {/* Row 2 — drifts right, pauses on hover */}
      <div
        className="mb-14 group/row2"
        style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
      >
        <div
          className="flex gap-4 group-hover/row2:[animation-play-state:paused]"
          style={{
            width: "max-content",
            animation: "scroll-right 55s linear infinite",
          }}
        >
          {row2.map((member, idx) => (
            <MemberCard key={`r2-${idx}`} member={member} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center"
        >
          <p className="text-muted-foreground text-sm mb-4">
            {members.length} members strong — united by brotherhood
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
            <Link href="/members">
              View All {members.length} Members
              <ArrowRightIcon className="size-4 ml-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function MemberCard({ member }: { member: (typeof members)[0] }) {
  return (
    <Link
      href="/members"
      className="w-52 shrink-0 rounded-2xl overflow-hidden border border-border bg-card group cursor-pointer block ring-1 ring-transparent hover:ring-gold/50 transition-all duration-300 hover:border-gold/40"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="208px"
        />
        {/* Gradient overlay — always visible */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

        {/* Static name (hidden on hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-3 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-2">
          <p className="font-serif font-bold text-white text-sm leading-snug">
            {member.title} {member.name}
          </p>
          <p className="text-white/60 text-[11px] truncate mt-0.5">{member.position}</p>
        </div>

        {/* Glassmorphism hover panel — slides up */}
        <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-18 transition-all duration-500 overflow-hidden">
          <div className="absolute inset-0 glass border-t border-white/12 flex flex-col justify-center px-3 py-2">
            <p className="font-serif font-bold text-white text-sm truncate leading-tight">
              {member.title} {member.name}
            </p>
            <p className="text-gold/80 text-[11px] truncate mt-0.5">{member.position}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
