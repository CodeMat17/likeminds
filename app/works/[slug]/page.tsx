import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { works, getWorkBySlug, getExcerpt } from "@/lib/data/works";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { DiamondRule } from "@/components/ui/Ornaments";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) return { title: "Project Not Found" };
  return {
    title: `${work.title} | LikeMinds Community Works`,
    description: getExcerpt(work),
  };
}

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  const currentIdx = works.findIndex((w) => w.slug === slug);
  const prev = currentIdx > 0 ? works[currentIdx - 1] : null;
  const next = currentIdx < works.length - 1 ? works[currentIdx + 1] : null;

  return (
    <>
      <PageHero eyebrow='Our Works' title={work.title} watermark={work.date} compact>
        <span className='inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70'>
          <CalendarIcon className='size-4 text-gold' />
          {work.date}
        </span>
      </PageHero>

      <section className='bg-background py-16 sm:py-24'>
        <div className='mx-auto max-w-3xl px-4 sm:px-6'>
          <Link
            href='/works'
            className='group mb-12 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground'>
            <ArrowLeftIcon className='size-4 transition-transform group-hover:-translate-x-1' />
            Back to all works
          </Link>

          <Reveal>
            <article className='prose-heritage prose prose-lg max-w-none prose-neutral dark:prose-invert prose-headings:text-foreground prose-h2:mt-14 prose-h2:text-3xl prose-p:leading-relaxed prose-p:text-foreground/80 prose-strong:text-foreground prose-li:text-foreground/80 prose-li:marker:text-clay'>
              <div>
                <ReactMarkdown>{work.content}</ReactMarkdown>
              </div>
            </article>
          </Reveal>

          <div className='mt-16 flex justify-center text-clay'>
            <DiamondRule />
          </div>

          {(prev || next) && (
            <div className='mt-12 grid gap-4 sm:grid-cols-2'>
              {prev ? (
                <Link
                  href={`/works/${prev.slug}`}
                  className='group rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40'>
                  <span className='flex items-center gap-2 text-xs font-bold tracking-widest text-muted-foreground uppercase'>
                    <ArrowLeftIcon className='size-3.5' /> Previous
                  </span>
                  <p className='font-display mt-3 line-clamp-2 text-lg text-foreground group-hover:text-primary'>
                    {prev.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {next && (
                <Link
                  href={`/works/${next.slug}`}
                  className='group rounded-3xl border border-border bg-card p-6 text-right transition-colors hover:border-primary/40'>
                  <span className='flex items-center justify-end gap-2 text-xs font-bold tracking-widest text-muted-foreground uppercase'>
                    Next <ArrowRightIcon className='size-3.5' />
                  </span>
                  <p className='font-display mt-3 line-clamp-2 text-lg text-foreground group-hover:text-primary'>
                    {next.title}
                  </p>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
