import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CalendarIcon, ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { works, getWorkBySlug } from "@/lib/data/works";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) return { title: "Project Not Found" };
  const excerpt = work.content.replace(/#+\s[^\n]*/g, "").replace(/\*+/g, "").trim().slice(0, 160);
  return {
    title: `${work.title} | LikeMinds Community Works`,
    description: excerpt,
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
    <div className="pt-16">
      {/* Back link */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
          <Link href="/works">
            <ArrowLeftIcon className="size-4" />
            Back to All Works
          </Link>
        </Button>
      </div>

      {/* Article */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <article className="bg-card rounded-2xl border border-border p-8 sm:p-12 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <CalendarIcon className="size-4" />
              <span>{work.date}</span>
            </div>
            <h1 className="font-sans text-2xl sm:text-3xl font-bold text-foreground mb-8 leading-snug">
              {work.title}
            </h1>
            <div className="prose prose-neutral dark:prose-invert prose-headings:font-sans prose-headings:font-bold prose-h2:text-xl prose-p:leading-relaxed prose-li:leading-relaxed max-w-none">
              <ReactMarkdown>{work.content}</ReactMarkdown>
            </div>
          </article>

          {/* Prev / Next */}
          {(prev || next) && (
            <>
              <Separator className="my-8" />
              <div className="flex items-center justify-between gap-4">
                {prev ? (
                  <Button asChild variant="outline" className="gap-2 max-w-xs">
                    <Link href={`/works/${prev.slug}`}>
                      <ArrowLeftIcon className="size-4 shrink-0" />
                      <span className="truncate text-left">{prev.title}</span>
                    </Link>
                  </Button>
                ) : <div />}
                {next ? (
                  <Button asChild variant="outline" className="gap-2 max-w-xs">
                    <Link href={`/works/${next.slug}`}>
                      <span className="truncate text-right">{next.title}</span>
                      <ArrowRightIcon className="size-4 shrink-0" />
                    </Link>
                  </Button>
                ) : <div />}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
