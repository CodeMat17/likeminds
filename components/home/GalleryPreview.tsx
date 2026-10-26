import Link from "next/link";
import Image from "next/image";
import { ArrowUpRightIcon } from "lucide-react";
import { listGalleryAlbums } from "@/lib/cloudinary";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const PREVIEW_COUNT = 5;

// Latest uploads from the Cloudinary gallery. Renders nothing until photos exist.
export async function GalleryPreview() {
  const albums = await listGalleryAlbums();
  // Albums are newest first; within each album, show the newest photos first.
  const photos = albums
    .flatMap((a) => [...a.images].reverse().map((img) => ({ ...img, album: a.title, year: a.year })))
    .slice(0, PREVIEW_COUNT);

  if (photos.length === 0) return null;

  return (
    <section className='relative overflow-hidden bg-muted/50 py-24 sm:py-32'>
      <div aria-hidden className='pattern-nsibidi mask-radial pointer-events-none absolute inset-0 opacity-60' />

      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col justify-between gap-8 lg:flex-row lg:items-end'>
          <SectionHeading
            eyebrow='Moments'
            title='Brotherhood,'
            accent='in pictures.'
            description='Outings, meetings and projects — the latest photographs from our gatherings.'
          />
          <Reveal delay={0.2}>
            <Link
              href='/gallery'
              className='group inline-flex h-12 shrink-0 items-center gap-2 rounded-full border border-foreground/15 px-6 text-sm font-bold text-foreground transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground'>
              View the gallery
              <ArrowUpRightIcon className='size-4 transition-transform duration-300 group-hover:rotate-45' />
            </Link>
          </Reveal>
        </div>

        <ul className='mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2'>
          {photos.map((photo, i) => {
            const featured = i === 0;
            return (
              <Reveal
                key={photo.publicId}
                as='li'
                delay={i * 0.08}
                className={cn(featured ? "col-span-2 lg:row-span-2" : "col-span-1")}>
                <Link
                  href='/gallery'
                  className={cn(
                    "group noise relative block overflow-hidden rounded-3xl border border-border bg-green-deep",
                    featured ? "aspect-4/3 lg:aspect-auto lg:h-full" : "aspect-square",
                  )}>
                  <Image
                    src={photo.src}
                    alt={photo.caption ?? photo.album}
                    fill
                    sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                    className='object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105'
                  />
                  <div
                    className={cn(
                      "absolute inset-0 bg-linear-to-t from-green-deep/85 via-transparent to-transparent transition-opacity duration-500",
                      featured ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                    )}
                  />
                  <div
                    className={cn(
                      "absolute inset-x-0 bottom-0 p-4 transition-all duration-500 sm:p-6",
                      !featured && "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
                    )}>
                    <p className='eyebrow text-[0.6rem] text-gold'>{photo.year}</p>
                    <p
                      className={cn(
                        "font-display mt-1 leading-snug text-white",
                        featured ? "text-xl sm:text-2xl" : "line-clamp-2 text-sm",
                      )}>
                      {photo.album}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
