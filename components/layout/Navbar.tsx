"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, XIcon, PhoneIcon, MailIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import Image from "next/image";

type NavItem =
  | { href: string; label: string; children?: never }
  | {
      href: string;
      label: string;
      children: { href: string; label: string; description?: string }[];
    };

const navLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  {
    href: "/works",
    label: "Works & Outings",
    children: [
      { href: "/works", label: "Projects", description: "Community development projects" },
      { href: "/works/gallery", label: "Photo Gallery", description: "Memories & outings in pictures" },
    ],
  },
  { href: "/members", label: "Members" },
  { href: "/join", label: "Join Us" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpenPath, setMenuOpenPath] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isMobileOpen = menuOpenPath === pathname;
  const setIsMobileOpen = (open: boolean) => setMenuOpenPath(open ? pathname : null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navBg =
    isScrolled || !isHome
      ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
      : "bg-transparent border-b border-transparent";

  const isWorksActive = pathname.startsWith("/works");

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          navBg
        )}
      >
        {/* Grain texture when scrolled */}
        {(isScrolled || !isHome) && (
          <div className="absolute inset-0 noise pointer-events-none" />
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label="LikeMinds Home"
            >
              <Image src="/logo.webp" alt="logo" width={40} height={40} className="object-cover" />
              <div className="hidden lg:flex flex-col leading-none">
                <span
                  className={cn(
                    " font-bold text-lg leading-tight transition-colors duration-300",
                    !isScrolled && isHome ? "text-white" : "text-foreground"
                  )}
                >
                  LikeMinds
                </span>
                <span
                  className={cn(
                    "text-xs font-medium tracking-wide transition-colors duration-300",
                    !isScrolled && isHome ? "text-white/70" : "text-muted-foreground"
                  )}
                >
                  1980–1986
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              {navLinks.map((link) => {
                const isActive = link.children ? isWorksActive : pathname === link.href;

                if (link.children) {
                  const isOpen = dropdownOpen === link.href;
                  return (
                    <div key={link.href} className="relative">
                      <button
                        onClick={() => setDropdownOpen(isOpen ? null : link.href)}
                        className={cn(
                          "relative flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-md transition-all duration-200",
                          isActive
                            ? !isScrolled && isHome
                              ? "text-white bg-white/10"
                              : "text-primary bg-primary/8"
                            : !isScrolled && isHome
                            ? "text-white/85 hover:text-white hover:bg-white/10"
                            : "text-foreground/75 hover:text-foreground hover:bg-muted"
                        )}
                      >
                        {link.label}
                        <ChevronDownIcon
                          className={cn(
                            "size-3.5 transition-transform duration-200",
                            isOpen && "rotate-180"
                          )}
                        />
                        {isActive && (
                          <motion.div
                            layoutId="nav-indicator"
                            className={cn(
                              "absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full",
                              !isScrolled && isHome
                                ? "bg-gold shadow-[0_0_8px_2px_oklch(0.74_0.17_72/50%)]"
                                : "bg-primary shadow-[0_0_8px_2px_oklch(0.36_0.17_152/40%)]"
                            )}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.97 }}
                            transition={{ duration: 0.18 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-background border border-border rounded-xl shadow-xl p-1.5 z-50"
                          >
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setDropdownOpen(null)}
                                className={cn(
                                  "block px-3.5 py-2.5 rounded-lg transition-colors duration-150",
                                  pathname === child.href
                                    ? "bg-primary/10 text-primary"
                                    : "hover:bg-muted text-foreground/80 hover:text-foreground"
                                )}
                              >
                                <p className="text-sm font-medium">{child.label}</p>
                                {child.description && (
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {child.description}
                                  </p>
                                )}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-3.5 py-2 text-sm font-medium rounded-md transition-all duration-200",
                      isActive
                        ? !isScrolled && isHome
                          ? "text-white bg-white/10"
                          : "text-primary bg-primary/8"
                        : !isScrolled && isHome
                        ? "text-white/85 hover:text-white hover:bg-white/10"
                        : "text-foreground/75 hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className={cn(
                          "absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full",
                          !isScrolled && isHome ? "bg-gold" : "bg-primary"
                        )}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle
                className={cn(
                  "transition-colors",
                  !isScrolled && isHome ? " dark:text-white hover:dark:bg-white/10 " : ""
                )}
              />
              <Button
                asChild
                size="sm"
                className="hidden lg:flex bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                <Link href="/join">Become a Member</Link>
              </Button>
              {/* Mobile hamburger */}
              <button
                className={cn(
                  "lg:hidden p-2 rounded-md transition-colors",
                  !isScrolled && isHome
                    ? "text-white hover:bg-white/10"
                    : "text-foreground hover:bg-muted"
                )}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="Toggle navigation menu"
              >
                {isMobileOpen ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-background border-l border-border shadow-2xl lg:hidden flex flex-col"
            >
              {/* Header */}
              <div className="relative flex items-center justify-between p-5 border-b border-border overflow-hidden">
                {/* Uli pattern texture in drawer header */}
                <div className="absolute inset-0 pattern-uli opacity-20 pointer-events-none" />
                <div className="relative z-10 flex items-center gap-2.5">
                  <Image src="/logo.webp" alt="logo" width={36} height={36} className="object-cover" />
                  <div>
                    <p className="font-sans font-bold text-foreground">LikeMinds</p>
                    <p className="text-xs text-muted-foreground">1980–1986</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="relative z-10 p-1.5 rounded-md hover:bg-muted text-muted-foreground"
                >
                  <XIcon className="size-4" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 p-4 overflow-y-auto">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-3 mb-2">
                  Navigation
                </p>
                {navLinks.map((link, i) => {
                  if (link.children) {
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.3 }}
                      >
                        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground mt-2 mb-1">
                          {link.label}
                        </div>
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium mb-1 ml-3 transition-colors",
                              pathname === child.href
                                ? "bg-primary text-primary-foreground"
                                : "text-foreground hover:bg-muted"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    );
                  }

                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-muted"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-border space-y-3">
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href="/join">Become a Member</Link>
                </Button>
                <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                  <MailIcon className="size-3" />
                  <span>info@likeminds-nomeh.org</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                  <PhoneIcon className="size-3" />
                  <span>+234 800 000 0000</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
