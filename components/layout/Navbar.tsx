"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowUpRightIcon, MailIcon, PhoneIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { UliBand } from "@/components/ui/Ornaments";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "/gallery", label: "Gallery" },
  { href: "/members", label: "Members" },
  { href: "/contact", label: "Contact" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [menuOpenPath, setMenuOpenPath] = useState<string | null>(null);
  const isMobileOpen = menuOpenPath === pathname;
  const setIsMobileOpen = (open: boolean) =>
    setMenuOpenPath(open ? pathname : null);

  // Hide while scrolling down, reveal on the way back up
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setIsScrolled(y > 24);
    setIsHidden(y > 240 && y > prev);
  });

  useEffect(() => {
    document.documentElement.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Every page opens on a dark hero, so the bar is light-on-dark until scrolled
  const onDark = !isScrolled;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isHidden && !isMobileOpen ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className='fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4'>
        <div
          className={cn(
            "mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full pr-2 pl-3 transition-all duration-500 sm:pl-4",
            isScrolled
              ? "border border-border/70 bg-background/80 shadow-[0_10px_40px_-12px_oklch(0.2_0.04_150/25%)] backdrop-blur-xl"
              : "border border-transparent bg-transparent",
          )}>
          {/* Logo */}
          <Link
            href='/'
            className='group flex items-center gap-2.5'
            aria-label='LikeMinds Home'>
            <Image
              src='/logo.png'
              alt=''
              width={40}
              height={40}
              className='transition-transform duration-700 group-hover:rotate-[360deg]'
            />
            <div className='flex flex-col leading-none'>
              <span
                className={cn(
                  "font-display text-lg font-semibold tracking-tight transition-colors duration-300",
                  onDark ? "text-white" : "text-foreground",
                )}>
                LikeMinds
              </span>
              <span
                className={cn(
                  "mt-0.5 text-[10px] font-semibold tracking-[0.22em] transition-colors duration-300",
                  onDark ? "text-gold" : "text-clay",
                )}>
                1980–1986
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className='hidden items-center gap-0.5 lg:flex'>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative isolate rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200",
                    isActive
                      ? onDark
                        ? "text-green-deep"
                        : "text-primary-foreground"
                      : onDark
                        ? "text-white/75 hover:text-white"
                        : "text-foreground/70 hover:text-foreground",
                  )}>
                  {isActive && (
                    <motion.span
                      layoutId='nav-pill'
                      className={cn(
                        "absolute inset-0 -z-10 rounded-full",
                        onDark ? "bg-gold" : "bg-primary",
                      )}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className='flex items-center gap-2'>
            <ThemeToggle
              className={cn(
                "border-transparent bg-transparent shadow-none",
                onDark && "text-white hover:bg-white/10 hover:text-white",
              )}
            />
            <Link
              href='/join'
              className={cn(
                "group hidden h-11 items-center gap-2 rounded-full pr-2 pl-5 text-sm font-bold transition-all duration-300 lg:inline-flex",
                onDark
                  ? "bg-white text-green-deep hover:bg-gold"
                  : "bg-primary text-primary-foreground hover:bg-clay",
              )}>
              Become a Member
              <span
                className={cn(
                  "grid size-7 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45",
                  onDark ? "bg-green-deep text-gold" : "bg-primary-foreground/15",
                )}>
                <ArrowUpRightIcon className='size-3.5' />
              </span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              className={cn(
                "relative grid size-11 place-items-center rounded-full transition-colors lg:hidden",
                onDark || isMobileOpen
                  ? "text-white hover:bg-white/10"
                  : "text-foreground hover:bg-muted",
              )}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}>
              <span className='relative block h-3 w-5'>
                <motion.span
                  className='absolute left-0 h-[1.5px] w-5 rounded-full bg-current'
                  animate={isMobileOpen ? { top: 5, rotate: 45 } : { top: 0, rotate: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
                <motion.span
                  className='absolute left-0 h-[1.5px] rounded-full bg-current'
                  animate={
                    isMobileOpen
                      ? { top: 5, rotate: -45, width: 20 }
                      : { top: 10, rotate: 0, width: 14 }
                  }
                  transition={{ duration: 0.3, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            key='mobile-menu'
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.7, ease: EASE }}
            data-lenis-prevent
            className='noise fixed inset-0 z-40 flex flex-col overflow-y-auto bg-green-deep lg:hidden'>
            <div className='pattern-nsibidi pointer-events-none absolute inset-0 opacity-70' />
            <div className='pointer-events-none absolute -right-24 -bottom-24 size-96 rounded-full bg-clay/30 blur-[120px]' />

            <nav className='relative z-10 flex flex-1 flex-col justify-center px-8 pt-28 pb-10'>
              {[...navLinks, { href: "/join", label: "Join Us" }].map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <div key={link.href} className='overflow-hidden'>
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease: EASE }}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={cn(
                          "font-display flex items-baseline gap-4 py-2 text-[2.6rem] leading-tight font-medium transition-colors",
                          isActive ? "text-gold italic" : "text-white/85 hover:text-gold",
                        )}>
                        <span className='font-sans text-xs font-bold tracking-widest text-white/30'>
                          0{i + 1}
                        </span>
                        {link.label}
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className='relative z-10 space-y-2 px-8 pb-10 text-sm text-white/55'>
              <a
                href='mailto:info@likemindsofficial.org'
                className='flex items-center gap-2 hover:text-gold'>
                <MailIcon className='size-4' />
                info@likemindsofficial.org
              </a>
              <a href='tel:+2348037501282' className='flex items-center gap-2 hover:text-gold'>
                <PhoneIcon className='size-4' />
                +234 803 750 1282
              </a>
              <p className='font-display pt-3 text-lg text-gold italic'>Ofu Obi Umunwanne</p>
            </motion.div>
            <UliBand className='relative z-10 text-gold/50' height={10} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
