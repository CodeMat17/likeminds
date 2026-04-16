"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, ChevronLeftIcon, ChevronRightIcon, ZoomInIcon } from "lucide-react";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";


type GalleryItem = {
  id: string;
  src: string;
  caption: string;
  year: string;
  category: "community" | "projects" | "events" | "welfare";
};

const categoryConfig: Record<GalleryItem["category"], { label: string; color: string }> = {
  community: { label: "Community", color: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" },
  projects: { label: "Projects", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300" },
  events: { label: "Events & Outings", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" },
  welfare: { label: "Welfare", color: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300" },
};

// Placeholder gallery using public domain images — replace src values with real photos
const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    src: "/gallery/meeting-2023.jpg",
    caption: "Annual General Meeting, Nomeh Town Hall — 2023",
    year: "2023",
    category: "community",
  },
  {
    id: "g2",
    src: "/gallery/borehole-commissioning.jpg",
    caption: "Borehole commissioning ceremony, Amaenyi quarters",
    year: "2022",
    category: "projects",
  },
  {
    id: "g3",
    src: "/gallery/christmas-outing.jpg",
    caption: "Christmas outing & solidarity dinner — December 2023",
    year: "2023",
    category: "events",
  },
  {
    id: "g4",
    src: "/gallery/scholarship-2022.jpg",
    caption: "Scholarship presentation to students of Nomeh secondary school",
    year: "2022",
    category: "welfare",
  },
  {
    id: "g5",
    src: "/gallery/road-project.jpg",
    caption: "Rehabilitation of Nnokwa road — groundbreaking ceremony",
    year: "2021",
    category: "projects",
  },
  {
    id: "g6",
    src: "/gallery/new-year-outing.jpg",
    caption: "New Year outing & cultural display, Enugu — 2022",
    year: "2022",
    category: "events",
  },
  {
    id: "g7",
    src: "/gallery/health-outreach.jpg",
    caption: "Free medical outreach — Nomeh Primary Health Centre",
    year: "2023",
    category: "welfare",
  },
  {
    id: "g8",
    src: "/gallery/group-photo.jpg",
    caption: "Full membership photograph — 2023 Annual Convention",
    year: "2023",
    category: "community",
  },
  {
    id: "g9",
    src: "/gallery/empowerment-2021.jpg",
    caption: "Skills & entrepreneurship empowerment programme",
    year: "2021",
    category: "welfare",
  },
  {
    id: "g10",
    src: "/gallery/july-outing.jpg",
    caption: "Mid-year solidarity outing — July 2021",
    year: "2021",
    category: "events",
  },
  {
    id: "g11",
    src: "/gallery/community-clean.jpg",
    caption: "Community clean-up exercise, Nomeh Unateze",
    year: "2022",
    category: "community",
  },
  {
    id: "g12",
    src: "/gallery/constitution-signing.jpg",
    caption: "Constitutional amendment signing ceremony",
    year: "2020",
    category: "community",
  },
];

const allCategories: { value: "all" | GalleryItem["category"]; label: string }[] = [
  { value: "all", label: "All Photos" },
  { value: "community", label: "Community" },
  { value: "projects", label: "Projects" },
  { value: "events", label: "Events & Outings" },
  { value: "welfare", label: "Welfare" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | GalleryItem["category"]>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = galleryItems.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  const openLightbox = (idx: number) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  const next = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));

  const currentItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.52_0.1_155)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-4"
          >
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-4xl sm:text-5xl font-bold text-white"
            >
              Photo Gallery
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-white/75 text-lg max-w-2xl">
              Memories of togetherness — outings, projects, and milestones captured in pictures.
              Our story, told through the faces of{" "}
              <em className="text-gold font-semibold">Ofu Obi Umunwanne</em>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex gap-2 flex-wrap">
              {allCategories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeCategory === cat.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-14 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            {filtered.map((item, idx) => {
              const cat = categoryConfig[item.category];
              return (
                <motion.div
                  key={item.id}
                  variants={scaleIn}
                  className="break-inside-avoid group cursor-pointer"
                  onClick={() => openLightbox(idx)}
                >
                  <div className="relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                    {/* Placeholder image — using aspect ratio box until real photos are added */}
                    <div className="relative aspect-4/3 bg-muted overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary/10 to-gold/10">
                        <span className="text-5xl opacity-20">📷</span>
                      </div>
                      {/* Uncomment when real images exist:
                      <Image
                        src={item.src}
                        alt={item.caption}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      />
                      */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                          <ZoomInIcon className="size-5 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-foreground/80 leading-snug mb-2">{item.caption}</p>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-[10px] ${cat.color}`}>{cat.label}</Badge>
                        <span className="text-[10px] text-muted-foreground ml-auto">{item.year}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-muted-foreground">No photos in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && currentItem && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={closeLightbox}
            >
              <XIcon className="size-5" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeftIcon className="size-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRightIcon className="size-6" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-4/3 bg-muted rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary/10 to-gold/10">
                  <span className="text-8xl opacity-20">📷</span>
                </div>
                {/* Uncomment when real images exist:
                <Image
                  src={currentItem.src}
                  alt={currentItem.caption}
                  fill
                  className="object-contain"
                  sizes="(max-width:900px) 100vw, 800px"
                />
                */}
              </div>
              <div className="mt-3 text-center">
                <p className="text-white/85 text-sm">{currentItem.caption}</p>
                <p className="text-white/40 text-xs mt-1">
                  {lightboxIndex + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
