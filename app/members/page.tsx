"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRightIcon,
  BriefcaseIcon,
  GlobeIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SearchIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { PageHero } from "@/components/ui/PageHero";
import { UliBand } from "@/components/ui/Ornaments";
import { isExecutive, members, sortedMembers, type Member } from "@/lib/data/members";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const FILTERS = [
  { id: "all", label: "Everyone" },
  { id: "executive", label: "Executive Council" },
  { id: "member", label: "Members" },
] as const;
type FilterId = (typeof FILTERS)[number]["id"];

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
  const phone = member?.social?.phone ?? member?.phone;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side='right'
        data-lenis-prevent
        className='flex w-full flex-col gap-0 overflow-y-auto p-0 sm:w-[440px] sm:max-w-[440px]'>
        {member && (
          <>
            <div className='relative h-96 shrink-0'>
              <Image
                src={member.photo}
                alt={member.name}
                fill
                className='object-cover object-top'
                sizes='440px'
              />
              <div className='absolute inset-0 bg-linear-to-t from-green-deep via-green-deep/20 to-transparent' />
              <div className='absolute inset-x-0 bottom-0 p-6'>
                <span className='eyebrow inline-block rounded-full bg-gold px-3 py-1 text-[0.62rem] text-green-deep'>
                  {member.position}
                </span>
                <SheetHeader className='gap-0 p-0'>
                  <SheetTitle className='font-display mt-3 text-left text-3xl leading-tight font-medium text-white'>
                    {member.name}
                  </SheetTitle>
                </SheetHeader>
              </div>
            </div>
            <UliBand className='text-gold/60' height={8} />

            <div className='flex flex-1 flex-col gap-7 p-6'>
              <div className='grid grid-cols-2 gap-4'>
                <Meta icon={BriefcaseIcon} label='Occupation' value={member.occupation} />
                <Meta icon={MapPinIcon} label='Location' value={member.location} />
              </div>

              {member.bio && (
                <div>
                  <p className='eyebrow mb-3 text-clay'>Biography</p>
                  <p className='leading-relaxed text-foreground/80'>{member.bio}</p>
                </div>
              )}

              {(member.social?.email || member.website || phone) && (
                <div className='space-y-2'>
                  <p className='eyebrow mb-3 text-clay'>Get in touch</p>
                  {member.social?.email && (
                    <ContactRow href={`mailto:${member.social.email}`} icon={MailIcon}>
                      {member.social.email}
                    </ContactRow>
                  )}
                  {member.website && (
                    <ContactRow href={member.website} icon={GlobeIcon} external>
                      {member.website.replace(/^https?:\/\//, "")}
                    </ContactRow>
                  )}
                  {phone && (
                    <ContactRow href={`tel:${phone}`} icon={PhoneIcon}>
                      {phone}
                    </ContactRow>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Meta({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className='rounded-2xl border border-border bg-muted/40 p-4'>
      <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
        <Icon className='size-3.5' />
        {label}
      </div>
      <p className='mt-1.5 text-sm leading-snug font-semibold text-foreground'>{value}</p>
    </div>
  );
}

function ContactRow({
  href,
  icon: Icon,
  external,
  children,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className='group flex items-center gap-3 rounded-2xl border border-border p-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5'>
      <span className='grid size-9 place-items-center rounded-xl bg-primary/10 text-primary'>
        <Icon className='size-4' />
      </span>
      <span className='min-w-0 flex-1 truncate'>{children}</span>
      <ArrowUpRightIcon className='size-4 text-muted-foreground transition-transform group-hover:rotate-45' />
    </a>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function MembersPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterId>("all");
  const [selected, setSelected] = useState<Member | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const q = query.trim().toLowerCase();
  const filtered = sortedMembers.filter((m) => {
    if (filter === "executive" && !isExecutive(m)) return false;
    if (filter === "member" && isExecutive(m)) return false;
    if (!q) return true;
    return (
      m.name.toLowerCase().includes(q) ||
      m.position.toLowerCase().includes(q) ||
      m.location.toLowerCase().includes(q)
    );
  });

  function openBio(member: Member) {
    setSelected(member);
    setSheetOpen(true);
  }

  return (
    <>
      <PageHero
        eyebrow='Our Brotherhood'
        title='The LikeMinds'
        accent='family.'
        watermark='Brotherhood'
        description={
          <>
            {members.length} distinguished men united by birth, community, and the
            unbreakable spirit of <em className='font-display text-gold'>Ofu Obi Umunwanne</em>.
          </>
        }
      />

      {/* Toolbar */}
      <section className='sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl'>
        <div className='mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8'>
          <div className='relative flex-1 sm:max-w-sm'>
            <SearchIcon className='absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground' />
            <input
              placeholder='Search by name, position or location…'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label='Search members'
              className='h-11 w-full rounded-full border border-border bg-card pr-10 pl-11 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-4 focus:ring-primary/10'
            />
            {query && (
              <button
                className='absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground'
                onClick={() => setQuery("")}
                aria-label='Clear search'>
                <XIcon className='size-3.5' />
              </button>
            )}
          </div>

          <div className='flex items-center gap-1 overflow-x-auto rounded-full border border-border bg-card p-1'>
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "relative isolate shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-colors sm:text-sm",
                  filter === f.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}>
                {filter === f.id && (
                  <motion.span
                    layoutId='member-filter'
                    className='absolute inset-0 -z-10 rounded-full bg-primary'
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {f.label}
              </button>
            ))}
          </div>

          <span className='hidden shrink-0 text-sm text-muted-foreground sm:ml-auto sm:block'>
            <span className='font-display text-lg text-foreground'>{filtered.length}</span>{" "}
            {filtered.length === 1 ? "member" : "members"}
          </span>
        </div>
      </section>

      {/* Grid */}
      <section className='min-h-[60vh] bg-muted/40 py-14 sm:py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='py-24 text-center'>
              <div className='mx-auto grid size-16 place-items-center rounded-full bg-muted'>
                <UserIcon className='size-8 text-muted-foreground' />
              </div>
              <p className='mt-4 text-muted-foreground'>No members found matching your search.</p>
              <Button
                variant='outline'
                className='mt-4 rounded-full'
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                }}>
                Clear filters
              </Button>
            </motion.div>
          ) : (
            <motion.div layout className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4'>
              <AnimatePresence mode='popLayout'>
                {filtered.map((member, i) => (
                  <motion.button
                    layout
                    key={member.id}
                    initial={{ opacity: 0, y: 30, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.6, delay: Math.min(i, 12) * 0.035, ease: EASE }}
                    onClick={() => openBio(member)}
                    className='group text-left'>
                    <div className='relative rounded-lg aspect-[3/4] overflow-hidden border border-border bg-card shadow-[0_20px_40px_-30px_oklch(0.22_0.05_155/50%)] transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-25px_oklch(0.22_0.05_155/55%)]'>
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                        className='object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]'
                      />
                      <div className='absolute inset-0 bg-linear-to-t from-green-deep/85 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100' />
                      {isExecutive(member) && (
                        <span className='eyebrow absolute bottom-4 left-4 rounded-full bg-gold/95 px-3 py-1 text-[0.55rem] whitespace-nowrap text-green-deep shadow-lg'>
                          Executive
                        </span>
                      )}
                      <span className='absolute right-4 bottom-4 grid size-10 translate-y-3 place-items-center rounded-full bg-gold text-green-deep opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
                        <ArrowUpRightIcon className='size-4' />
                      </span>
                    </div>
                    <div className='px-1 pt-4'>
                      <p className='font-display text-lg leading-tight font-medium text-foreground transition-colors group-hover:text-primary'>
                        {member.name}
                      </p>
                      <p className='mt-1 text-xs font-bold tracking-wider text-clay uppercase'>
                        {member.position}
                      </p>
                      <p className='mt-1.5 flex items-center gap-1 text-sm text-muted-foreground'>
                        <MapPinIcon className='size-3.5 shrink-0' />
                        <span className='truncate'>{member.location}</span>
                      </p>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <BioSheet
        member={selected}
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open);
          if (!open) setSelected(null);
        }}
      />
    </>
  );
}
