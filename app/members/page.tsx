"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
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
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { PageHero } from "@/components/ui/PageHero";
import { UliBand } from "@/components/ui/Ornaments";
import { MemberAvatar } from "@/components/members/MemberAvatar";
import { isExecutive, members, sortedMembers, type Member } from "@/lib/data/members";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const FILTERS = [
  { id: "all", label: "Everyone" },
  { id: "executive", label: "Executive Council" },
  { id: "member", label: "Members" },
] as const;
type FilterId = (typeof FILTERS)[number]["id"];

// Bio sheet slides in from the right on desktop and up from the bottom on phones.
const DESKTOP_QUERY = "(min-width: 640px)";
function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(DESKTOP_QUERY);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => true,
  );
}

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
  const isDesktop = useIsDesktop();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isDesktop ? "right" : "bottom"}
        data-lenis-prevent
        className={cn(
          "flex flex-col gap-0 overflow-y-auto overscroll-contain p-0",
          isDesktop
            ? "w-full sm:w-110 sm:max-w-110"
            : "max-h-[92dvh] rounded-t-[2rem] border-0 pb-[env(safe-area-inset-bottom)]",
        )}>
        {member && (
          <>
            <div className='relative h-72 shrink-0 sm:h-96'>
              <Image
                src={member.photo}
                alt={member.name}
                fill
                className='object-cover object-top'
                sizes='(min-width: 640px) 440px, 100vw'
              />
              <div className='absolute inset-0 bg-linear-to-t from-green-deep via-green-deep/20 to-transparent' />
              {!isDesktop && (
                <span aria-hidden className='absolute top-3 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/70' />
              )}
              <div className='absolute inset-x-0 bottom-0 p-5 sm:p-6'>
                <span className='eyebrow inline-block rounded-full bg-gold px-3 py-1 text-[0.62rem] text-green-deep'>
                  {member.position}
                </span>
                <SheetHeader className='gap-0 p-0'>
                  <SheetTitle className='font-display mt-3 text-left text-2xl leading-tight font-medium text-white sm:text-3xl'>
                    {member.name}
                  </SheetTitle>
                  <SheetDescription className='sr-only'>
                    {member.position} — {member.occupation}
                  </SheetDescription>
                </SheetHeader>
              </div>
            </div>
            <UliBand className='text-gold/60' height={8} />

            <div className='flex flex-1 flex-col gap-7 p-5 sm:p-6'>
              <div className='grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:gap-4'>
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

  // Homepage portraits link here as /members?member=<id>; open that member's sheet.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("member");
    const match = id && members.find((m) => m.id === id);
    if (!match) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelected(match);
    setSheetOpen(true);
  }, []);

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
      <section className='relative min-h-[60vh] overflow-hidden bg-muted/50 py-14 sm:py-20'>
        <div aria-hidden className='pattern-nsibidi mask-radial pointer-events-none absolute inset-0 opacity-60' />
        <div className='relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
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
            <motion.ul
              layout
              className='grid grid-cols-3 gap-x-3 gap-y-8 min-[480px]:grid-cols-4 sm:gap-x-6 sm:gap-y-10 md:grid-cols-5 lg:grid-cols-6'>
              <AnimatePresence mode='popLayout'>
                {filtered.map((member, i) => (
                  <motion.li
                    layout
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.85, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.7, delay: Math.min(i, 18) * 0.03, ease: EASE }}>
                    <button
                      onClick={() => openBio(member)}
                      aria-label={`View profile of ${member.name}, ${member.position}`}
                      className='group block w-full text-center outline-none'>
                      <MemberAvatar
                        member={member}
                        sizes='(min-width: 1024px) 160px, (min-width: 768px) 18vw, (min-width: 480px) 22vw, 30vw'
                        className='mx-auto w-full max-w-36'
                      />
                      <p className='font-display mt-3 line-clamp-2 text-[13px] leading-tight font-medium text-foreground transition-colors group-hover:text-primary sm:mt-4 sm:text-base'>
                        {member.name}
                      </p>
                      <p
                        className={cn(
                          "mt-1 line-clamp-1 text-[9px] font-bold tracking-wider uppercase sm:text-[11px]",
                          isExecutive(member) ? "text-clay" : "text-muted-foreground",
                        )}>
                        {member.position}
                      </p>
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </div>
      </section>

      <BioSheet
        member={selected}
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open);
          if (!open) {
            setSelected(null);
            if (window.location.search) window.history.replaceState(null, "", window.location.pathname);
          }
        }}
      />
    </>
  );
}
