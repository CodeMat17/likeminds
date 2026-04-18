"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Emblem } from "@/components/ui/Emblem";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { scaleIn, staggerContainer } from "@/lib/animations";
import { members, type Member } from "@/lib/data/members";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  BookOpenIcon,
  BriefcaseIcon,
  GlobeIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SearchIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

// ─── Position ordering ───────────────────────────────────────────────────────
const POSITION_ORDER = [
  "chairman",
  "vice-chairman",
  "secretary",
  "assistant-secretary",
  "treasurer",
  "financial-secretary",
  "public-relations",
  "provost",
  "welfare-officer",
  "legal-adviser",
];

function normalizePosition(position: string): string {
  return position.toLowerCase().trim().replace(/\s+/g, "-");
}

function positionRank(position: string): number {
  const normalized = normalizePosition(position);
  if (normalized === "member") return POSITION_ORDER.length + 1;
  const idx = POSITION_ORDER.indexOf(normalized);
  return idx === -1 ? POSITION_ORDER.length : idx;
}

const sortedMembers = [...members].sort((a, b) => {
  const ra = positionRank(a.position);
  const rb = positionRank(b.position);
  if (ra !== rb) return ra - rb;
  // Both are regular members — sort alphabetically by first name
  return a.name.localeCompare(b.name);
});

// ─── Bio Sheet ───────────────────────────────────────────────────────────────
function BioSheet({
  member,
  open,
  onOpenChange,
}: {
  member: Member | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side='right'
        className={cn(
          // full-width on mobile, fixed moderate width from sm up
          "w-full sm:w-[420px] sm:max-w-[420px]",
          "p-0 overflow-y-auto flex flex-col gap-0",
        )}>
        {member && (
          <>
            {/* Photo banner */}
            <div className='relative h-75 shrink-0'>
              <Image
                src={member.photo}
                alt={member.name}
                fill
                className='object-cover object-top'
                sizes='420px'
              />
              <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent' />
              {/* Emblem watermark in corner */}
              <div className='absolute top-3 left-3 pointer-events-none opacity-[1]'>
                <Emblem size={60} />
              </div>
              <div className='absolute bottom-0 left-0 right-0 p-5'>
                <Badge
                  variant='outline'
                  className='text-[10px] border-white/30 text-white bg-white/10 mb-2'>
                  {member.position}
                </Badge>
                <SheetHeader className='p-0 gap-0'>
                  <SheetTitle className='font-sans text-xl font-bold text-white leading-tight text-left'>
                    {member.name}
                  </SheetTitle>
                </SheetHeader>
              </div>
            </div>

            {/* Details */}
            <div className='p-6 flex flex-col gap-5 flex-1'>
              {/* Meta */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-1'>
                  <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
                    <BriefcaseIcon className='size-3' />
                    Occupation
                  </div>
                  <p className='text-sm font-medium text-foreground leading-snug'>
                    {member.occupation}
                  </p>
                </div>
                <div className='space-y-1'>
                  <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
                    <MapPinIcon className='size-3' />
                    Location
                  </div>
                  <p className='text-sm font-medium text-foreground leading-snug'>
                    {member.location}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Bio */}
              <div>
                <p className='text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3'>
                  Biography
                </p>
                <p className='text-sm text-foreground/80 leading-relaxed'>
                  {member.bio}
                </p>
              </div>

              <Separator />

              <div className='space-y-1.5'>
                {/* Email */}
                {member.social?.email && (
                  <>
                    {/* <Separator /> */}
                    <a
                      href={`mailto:${member.social.email}`}
                      className='flex items-center gap-2 text-sm text-primary hover:underline'>
                      <MailIcon className='size-4' />
                      {member.social.email}
                    </a>
                  </>
                )}

                {/* Website */}
                {member.website && (
                  <>
                    {/* <Separator /> */}
                    <a
                      href={member.website}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 text-sm text-primary hover:underline'>
                      <GlobeIcon className='size-4' />
                      {member.website.replace(/^https?:\/\//, "")}
                    </a>
                  </>
                )}

                {/* Phone */}
                {(member.social?.phone || member.phone) && (
                  <>
                    <Separator />
                    <a
                      href={`tel:${member.social?.phone ?? member.phone}`}
                      className='flex items-center gap-2 text-sm text-primary hover:underline'>
                      <PhoneIcon className='size-4' />
                      {member.social?.phone ?? member.phone}
                    </a>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

// ─── TiltCard wrapper — 3D hover tilt ────────────────────────────────────────
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(xPct * 5);
      rotateX.set(-yPct * 5);
    },
    [rotateX, rotateY],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}>
      {children}
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function MembersPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Member | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? sortedMembers.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.position.toLowerCase().includes(q) ||
          m.location.toLowerCase().includes(q),
      )
    : sortedMembers;

  function openBio(member: Member) {
    setSelected(member);
    setSheetOpen(true);
  }

  return (
    <div className='pt-16'>
      {/* Hero */}
      <section className='relative py-24 bg-primary overflow-hidden'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.52_0.1_155)_0%,transparent_60%)]' />
        <div className='relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center'>
          <motion.div
            variants={staggerContainer}
            initial='hidden'
            animate='visible'
            className='flex flex-col items-center gap-4'>
            <motion.div
              variants={scaleIn}
              className='relative flex items-center justify-center'>
              {/* Ghost watermark behind */}
              <motion.div
                className='absolute opacity-[0.06] pointer-events-none'
                animate={{ rotate: 360 }}
                transition={{
                  duration: 120,
                  repeat: Infinity,
                  ease: "linear",
                }}>
                <Emblem size={200} className='text-white' />
              </motion.div>
              <Emblem size={100} className='text-gold relative z-10' />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}>
              <Badge variant='gold' className='text-xs tracking-widest'>
                OUR BROTHERHOOD
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className='font-sans text-4xl sm:text-5xl font-bold text-white'>
              The LikeMinds Family
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className='text-white/75 text-lg max-w-2xl'>
              {members.length} distinguished men united by birth, community, and
              the unbreakable spirit of{" "}
              <em className='text-gold font-semibold'>Ofu Obi Umunwanne</em>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Search bar */}
      <section className='sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex gap-3 items-center'>
          <div className='relative flex-1 max-w-md'>
            <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
            <Input
              placeholder='Search by name, position or location…'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='pl-9 pr-9 w-full'
            />
            {query && (
              <button
                className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                onClick={() => setQuery("")}>
                <XIcon className='size-3.5' />
              </button>
            )}
          </div>
          <span className='text-sm text-muted-foreground shrink-0 hidden sm:block'>
            {filtered.length} member{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      {/* Members grid */}
      <section className='py-14 bg-muted/30'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <AnimatePresence mode='wait'>
            {filtered.length === 0 ? (
              <motion.div
                key='empty'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='text-center py-24'>
                <div className='w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto'>
                  <UserIcon className='size-8 text-muted-foreground' />
                </div>
                <p className='text-muted-foreground mt-4'>
                  No members found matching your search.
                </p>
                <Button
                  variant='outline'
                  className='mt-4'
                  onClick={() => setQuery("")}>
                  Clear search
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key={q}
                variants={staggerContainer}
                initial='hidden'
                animate='visible'
                className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {filtered.map((member) => (
                  <motion.div key={member.id} variants={scaleIn}>
                    <TiltCard>
                      <div className='group bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col'>
                        {/* Photo */}
                        <div className='relative h-75 overflow-hidden shrink-0'>
                          <Image
                            src={member.photo}
                            alt={member.name}
                            fill
                            className='object-cover object-top transition-transform duration-500 group-hover:scale-105'
                            sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw'
                          />
                          <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent' />
                        </div>

                        {/* Info */}
                        <div className='p-3.5 flex flex-col flex-1'>
                          <div className='flex-1'>
                            <p className='font-sans font-bold text-foreground leading-tight mb-0.5'>
                              {member.name}
                            </p>

                            <p className=' text-primary font-medium truncate'>
                              {member.position}
                            </p>
                            <div className='flex items-center gap-1 text-sm text-muted-foreground mt-0.5'>
                              <MapPinIcon className='size-3 shrink-0' />
                              <span className='truncate'>
                                {member.location}
                              </span>
                            </div>
                            {member.website && (
                              <a
                                href={member.website}
                                target='_blank'
                                rel='noopener noreferrer'
                                onClick={(e) => e.stopPropagation()}
                                className='flex items-center gap-1 text-sm text-primary hover:underline mt-0.5'>
                                <GlobeIcon className='size-3 shrink-0' />
                                <span className='truncate'>
                                  {member.website.replace(/^https?:\/\//, "")}
                                </span>
                              </a>
                            )}
                          </div>

                          {/* View Bio button */}
                          <Button
                            size='sm'
                            variant='outline'
                            className='w-full h-7 text-[11px] font-semibold rounded-lg border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 mt-3'
                            onClick={() => openBio(member)}>
                            <BookOpenIcon className='size-3 mr-1' />
                            View Bio
                          </Button>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Bio Sheet */}
      <BioSheet
        member={selected}
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open);
          if (!open) setSelected(null);
        }}
      />
    </div>
  );
}
