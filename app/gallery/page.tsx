"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, ChevronLeftIcon, ChevronRightIcon, ImagesIcon } from "lucide-react";
import { Emblem } from "@/components/ui/Emblem";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";

type GalleryPost = {
  id: string;
  title: string;
  year: string;
  images: { src: string; caption?: string }[];
};

const galleryPosts: GalleryPost[] = [
 
  {
    id: "p1",
    title: "Christmas Solidarity Outing 2023",
    year: "2023",
    images: [
      { src: "/gallery/christmas-2023-1.jpg", caption: "Christmas outing & solidarity dinner" },
      { src: "/gallery/christmas-2023-2.jpg", caption: "Group photograph at the event venue" },
      { src: "/gallery/christmas-2023-3.jpg", caption: "Welfare packages ready for distribution" },
      { src: "/gallery/christmas-2023-4.jpg", caption: "Smiles all around during the celebration" },
    ],
  },
];

export default function GalleryPage() {
  const [active, setActive] = useState<{ post: GalleryPost; index: number } | null>(null);

  const openLightbox = (post: GalleryPost, index = 0) => setActive({ post, index });
  const closeLightbox = () => setActive(null);

  const goPrev = () =>
    setActive((a) =>
      a ? { ...a, index: (a.index - 1 + a.post.images.length) % a.post.images.length } : null
    );
  const goNext = () =>
    setActive((a) =>
      a ? { ...a, index: (a.index + 1) % a.post.images.length } : null
    );

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
    if (e.key === "Escape") closeLightbox();
  };

  const currentImage = active ? active.post.images[active.index] : null;

  return (
    <div className="pt-16" onKeyDown={handleKey} tabIndex={-1}>
      {/* Hero */}
      <section className="relative py-24 bg-green-deep overflow-hidden noise">
        <div className="absolute inset-0 pattern-diamond pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.36_0.17_152/50%)_0%,transparent_60%)]" />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold/60 to-transparent origin-center"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-4"
          >
            <motion.div variants={scaleIn}>
              <Emblem size={90} className="text-gold" />
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-sans text-4xl sm:text-5xl font-bold text-white">
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

      {/* Gallery grid */}
      <section className="py-14 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {galleryPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={scaleIn}
                className="group cursor-pointer"
                onClick={() => openLightbox(post, 0)}
              >
                <article className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                  {/* Cover image */}
                  <div className="relative aspect-4/3 overflow-hidden bg-muted">
                    <Image
                      src={post.images[0].src}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-white text-sm font-medium">
                        <ImagesIcon className="size-4" />
                        View {post.images.length} photo{post.images.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                    {/* Image count badge */}
                    {post.images.length > 1 && (
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-full px-2.5 py-1 flex items-center gap-1">
                        <ImagesIcon className="size-3" />
                        {post.images.length}
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-4">
                    <p className="font-sans font-semibold text-foreground text-sm leading-snug">
                      {post.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{post.year}</p>
                  </div>
                </article>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox carousel */}
      <AnimatePresence>
        {active && currentImage && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-3 right-3 sm:top-5 sm:right-5 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              onClick={closeLightbox}
            >
              <XIcon className="size-5" />
            </button>

            {/* Modal panel — never touches screen edges */}
            <motion.div
              key={active.index}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-2xl max-h-[calc(100dvh-4rem)] flex flex-col rounded-2xl overflow-hidden bg-zinc-900"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev */}
              {active.post.images.length > 1 && (
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors z-10"
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                >
                  <ChevronLeftIcon className="size-5" />
                </button>
              )}

              {/* Next */}
              {active.post.images.length > 1 && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors z-10"
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                >
                  <ChevronRightIcon className="size-5" />
                </button>
              )}

              {/* Image */}
              <div className="relative w-full aspect-4/3 bg-black shrink-0">
                <Image
                  src={currentImage.src}
                  alt={currentImage.caption ?? active.post.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 900px) 100vw, 800px"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              </div>

              {/* Caption + dots */}
              <div className="px-4 py-3 text-center space-y-2 shrink-0">
                <p className="text-white font-semibold text-sm leading-snug">{active.post.title}</p>
                {currentImage.caption && (
                  <p className="text-white/60 text-xs">{currentImage.caption}</p>
                )}
                {active.post.images.length > 1 && (
                  <>
                    <p className="text-white/40 text-xs">{active.index + 1} / {active.post.images.length}</p>
                    <div className="flex justify-center gap-1.5 pb-1">
                      {active.post.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => { e.stopPropagation(); setActive((a) => a ? { ...a, index: i } : null); }}
                          className={`rounded-full transition-all duration-200 ${
                            i === active.index
                              ? "w-5 h-2 bg-white"
                              : "w-2 h-2 bg-white/30 hover:bg-white/60"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
