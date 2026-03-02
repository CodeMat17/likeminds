"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  SearchIcon, MapPinIcon, BriefcaseIcon, XIcon,
  MailIcon, UserIcon, CalendarIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Emblem } from "@/components/ui/Emblem";
import { members, type Member } from "@/lib/data/members";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const filters = ["All", "EXCO", "Members"] as const;
type Filter = (typeof filters)[number];

function MemberModal({ member, onClose }: { member: Member; onClose: () => void }) {
  return (
    <DialogContent className="max-w-lg p-0 overflow-hidden rounded-2xl gap-0">
      <div className="relative h-56">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover object-top"
          sizes="512px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {member.isExco && (
          <div className="absolute top-4 right-4">
            <Badge variant="gold" className="text-[10px] font-bold">EXCO</Badge>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <Badge variant="outline" className="text-[10px] border-white/30 text-white bg-white/10 mb-2">
            {member.role}
          </Badge>
          <DialogTitle className="font-serif text-xl font-bold text-white leading-tight">
            {member.title} {member.name}
          </DialogTitle>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: BriefcaseIcon, label: "Occupation", value: member.occupation },
            { icon: MapPinIcon, label: "Location", value: member.location },
            { icon: CalendarIcon, label: "Birth Year", value: String(member.birthYear) },
            { icon: UserIcon, label: "Employer", value: member.employer },
          ].map((item) => (
            <div key={item.label} className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <item.icon className="size-3" />
                {item.label}
              </div>
              <p className="text-sm font-medium text-foreground truncate">{item.value}</p>
            </div>
          ))}
        </div>

        <Separator />

        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Biography</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
        </div>

        {member.social?.email && (
          <>
            <Separator />
            <a
              href={`mailto:${member.social.email}`}
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <MailIcon className="size-4" />
              {member.social.email}
            </a>
          </>
        )}
      </div>
    </DialogContent>
  );
}

export default function MembersPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<Member | null>(null);

  const filtered = members.filter((m) => {
    const q = query.toLowerCase();
    const matchesSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.occupation.toLowerCase().includes(q) ||
      m.location.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q);
    const matchesFilter =
      filter === "All" ||
      (filter === "EXCO" && m.isExco) ||
      (filter === "Members" && !m.isExco);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.52_0.1_155)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-4"
          >
            <motion.div variants={scaleIn}>
              <Emblem size={70} className="text-white" />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Badge variant="gold" className="text-xs tracking-widest">OUR BROTHERHOOD</Badge>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-serif text-4xl sm:text-5xl font-bold text-white">
              The LikeMinds Family
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-white/75 text-lg max-w-2xl">
              {members.length} distinguished men and women united by birth, community, and the
              unbreakable spirit of <em className="text-gold font-semibold">Ofu Obi Umunwanne</em>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Search bar */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, role, occupation or location..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 pr-9 w-full"
            />
            {query && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setQuery("")}
              >
                <XIcon className="size-3.5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {filters.map((f) => (
              <Button
                key={f}
                variant={filter === f ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f)}
                className={filter === f ? "bg-primary text-primary-foreground" : ""}
              >
                {f}
              </Button>
            ))}
          </div>
          <span className="text-sm text-muted-foreground shrink-0 hidden sm:block">
            {filtered.length} member{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* Members grid */}
      <section className="py-14 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <UsersIconBig />
                <p className="text-muted-foreground mt-4">No members found matching your search.</p>
                <Button variant="outline" className="mt-4" onClick={() => { setQuery(""); setFilter("All"); }}>
                  Clear filters
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
              >
                {filtered.map((member) => (
                  <motion.button
                    key={member.id}
                    variants={scaleIn}
                    whileHover={{ y: -5, transition: { duration: 0.25 } }}
                    onClick={() => setSelected(member)}
                    className="group text-left bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-pointer w-full"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {member.isExco && (
                        <div className="absolute top-2.5 right-2.5">
                          <Badge variant="gold" className="text-[9px] font-bold px-2 py-0.5">EXCO</Badge>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-[10px] text-white/60 font-medium">{member.role}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="font-serif font-bold text-foreground text-sm leading-tight mb-1">
                        {member.title} {member.name.split(" ").slice(0, 2).join(" ")}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <BriefcaseIcon className="size-3 shrink-0" />
                        <span className="truncate">{member.occupation}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                        <MapPinIcon className="size-3 shrink-0" />
                        <span>{member.location}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Member modal */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && <MemberModal member={selected} onClose={() => setSelected(null)} />}
      </Dialog>
    </div>
  );
}

function UsersIconBig() {
  return (
    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
      <UserIcon className="size-8 text-muted-foreground" />
    </div>
  );
}
