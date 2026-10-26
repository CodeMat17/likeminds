"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, ChevronLeftIcon, ChevronRightIcon, ImagesIcon, CameraIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import type { GalleryAlbum } from "@/lib/cloudinary";

type GalleryPost = GalleryAlbum;

const EASE = [0.16, 1, 0.3, 1] as const;

const hideOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = "none";
};

export function GalleryGrid({ albums: galleryPosts }: { albums: GalleryAlbum[] }) {
  const [active, setActive] = useState<{ post: GalleryPost; index: number } | null>(null);
  const [direction, setDirection] = useState(1);

  const closeLightbox = () => setActive(null);
  const step = (delta: number) => {
    setDirection(delta);
    setActive((a) =>
      a
        ? { ...a, index: (a.index + delta + a.post.images.length) % a.post.images.length }
        : null,
    );
  };

  const isOpen = active !== null;
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setActive(null);
      const delta = e.key === "ArrowLeft" ? -1 : e.key === "ArrowRight" ? 1 : 0;
      if (!delta) return;
      setDirection(delta);
      setActive((a) =>
        a
          ? { ...a, index: (a.index + delta + a.post.images.length) % a.post.images.length }
          : null,
      );
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const currentImage = active ? active.post.images[active.index] : null;

  return (
    <>
      <section className='bg-background py-20 sm:py-28'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          {galleryPosts.length === 0 && (
            <Reveal className='mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center'>
              <span className='grid size-16 place-items-center rounded-full bg-primary/10 text-primary'>
                <CameraIcon className='size-7' />
              </span>
              <h2 className='font-display text-3xl font-medium text-foreground'>
                Photos <em className='font-display-wonk text-primary'>coming soon.</em>
              </h2>
              <p className='text-muted-foreground'>
                Pictures from our outings and projects will appear here as soon as they are uploaded.
              </p>
            </Reveal>
          )}
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {galleryPosts.map((post, i) => (
              <Reveal key={post.id} delay={i * 0.08}>
                <button
                  onClick={() => {
                    setDirection(1);
                    setActive({ post, index: 0 });
                  }}
                  className='group block w-full text-left'>
                  <div className='relative'>
                    {/* Stacked-print effect */}
                    <div className='absolute inset-0 translate-x-2 translate-y-2 rotate-2 rounded-3xl border border-border bg-clay-muted transition-transform duration-500 group-hover:rotate-4' />
                    <div className='absolute inset-0 translate-x-1 translate-y-1 -rotate-1 rounded-3xl border border-border bg-gold-muted transition-transform duration-500 group-hover:-rotate-3' />
                    <div className='noise relative aspect-4/3 overflow-hidden rounded-3xl border border-border bg-green-deep'>
                      <div className='pattern-nsibidi absolute inset-0 opacity-80' />
                      <Image
                        src={post.images[0].src}
                        alt={post.title}
                        fill
                        className='object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105'
                        sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                        onError={hideOnError}
                      />
                      <div className='absolute inset-0 bg-linear-to-t from-green-deep/80 via-transparent to-transparent' />
                      <span className='absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md'>
                        <ImagesIcon className='size-3.5' />
                        {post.images.length}
                      </span>
                      <span className='absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-center pb-6 text-sm font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
                        View {post.images.length} photo{post.images.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  <div className='px-1 pt-6'>
                    <p className='eyebrow text-clay'>{post.year}</p>
                    <p className='font-display mt-2 text-xl leading-snug text-foreground transition-colors group-hover:text-primary'>
                      {post.title}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {active && currentImage && (
          <motion.div
            key='lightbox'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            data-lenis-prevent
            role='dialog'
            aria-modal='true'
            aria-label={active.post.title}
            className='fixed inset-0 z-100 flex items-center justify-center bg-green-deep/95 p-4 backdrop-blur-xl sm:p-8'
            onClick={closeLightbox}>
            <button
              className='absolute top-4 right-4 z-10 grid size-11 place-items-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white sm:top-6 sm:right-6'
              onClick={closeLightbox}
              aria-label='Close'>
              <XIcon className='size-5' />
            </button>

            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              transition={{ duration: 0.5, ease: EASE }}
              className='relative flex max-h-[calc(100dvh-4rem)] w-full max-w-3xl flex-col'
              onClick={(e) => e.stopPropagation()}>
              <div className='relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-black/40'>
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={active.index}
                    custom={direction}
                    initial={{ opacity: 0, x: direction * 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -60 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className='absolute inset-0'>
                    <Image
                      src={currentImage.src}
                      alt={currentImage.caption ?? active.post.title}
                      fill
                      className='object-contain'
                      sizes='(max-width: 900px) 100vw, 800px'
                      onError={hideOnError}
                    />
                  </motion.div>
                </AnimatePresence>

                {active.post.images.length > 1 && (
                  <>
                    <button
                      className='absolute top-1/2 left-3 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white/80 backdrop-blur-md transition-colors hover:bg-gold hover:text-green-deep'
                      onClick={() => step(-1)}
                      aria-label='Previous photo'>
                      <ChevronLeftIcon className='size-5' />
                    </button>
                    <button
                      className='absolute top-1/2 right-3 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white/80 backdrop-blur-md transition-colors hover:bg-gold hover:text-green-deep'
                      onClick={() => step(1)}
                      aria-label='Next photo'>
                      <ChevronRightIcon className='size-5' />
                    </button>
                  </>
                )}
              </div>

              <div className='space-y-2 px-2 pt-5 text-center'>
                <p className='font-display text-xl text-white'>{active.post.title}</p>
                {currentImage.caption && (
                  <p className='text-sm text-white/60'>{currentImage.caption}</p>
                )}
                {active.post.images.length > 1 && (
                  <div className='flex items-center justify-center gap-1.5 pt-2'>
                    {active.post.images.map((_, i) => (
                      <button
                        key={i}
                        aria-label={`Photo ${i + 1}`}
                        onClick={() => {
                          setDirection(i > active.index ? 1 : -1);
                          setActive((a) => (a ? { ...a, index: i } : null));
                        }}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i === active.index ? "w-8 bg-gold" : "w-1.5 bg-white/30 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
