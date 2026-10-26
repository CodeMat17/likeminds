import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getExcerpt, type Work } from "@/lib/data/works";

export function WorkCard({
  work,
  index,
  featured = false,
}: {
  work: Work;
  index: number;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/works/${work.slug}`}
      className={cn(
        "group relative grid h-full overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_30px_60px_-30px_oklch(0.22_0.05_155/45%)]",
        featured && "md:grid-cols-5",
      )}>
      {/* Emblematic panel */}
      <div
        className={cn(
          "noise relative overflow-hidden bg-green-deep p-7",
          featured ? "min-h-56 md:col-span-2" : "min-h-40",
        )}>
        <div className='pattern-nsibidi absolute inset-0 opacity-80 transition-transform duration-[1.5s] ease-out group-hover:scale-110' />
        <div className='absolute -right-16 -bottom-16 size-56 rounded-full bg-clay/40 blur-3xl transition-opacity duration-700 group-hover:opacity-80' />
        <div className='relative z-10 flex h-full flex-col justify-between'>
          <span className='eyebrow text-gold/80'>Project {String(index + 1).padStart(2, "0")}</span>
          <span className='font-display text-7xl leading-none font-medium text-white/90 italic'>
            {work.date}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className={cn("flex flex-col p-7 sm:p-8", featured && "md:col-span-3")}>
        <h3 className='font-display text-2xl leading-snug font-medium text-foreground transition-colors duration-300 group-hover:text-primary'>
          {work.title}
        </h3>
        <p className='mt-4 line-clamp-4 flex-1 text-sm leading-relaxed text-muted-foreground'>
          {getExcerpt(work)}…
        </p>
        <span className='mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary'>
          Read the story
          <span className='grid size-8 place-items-center rounded-full bg-primary/10 transition-all duration-500 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground'>
            <ArrowUpRightIcon className='size-4' />
          </span>
        </span>
      </div>
    </Link>
  );
}
