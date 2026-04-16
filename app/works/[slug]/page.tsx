import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CalendarIcon, MapPinIcon, UsersIcon, CircleDollarSignIcon, ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { works, getWorkBySlug, categoryConfig } from "@/lib/data/works";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) return { title: "Project Not Found" };
  return {
    title: `${work.title} | LikeMinds Community Works`,
    description: work.shortDescription,
    openGraph: {
      title: work.title,
      description: work.shortDescription,
      images: [{ url: work.images[0], width: 1200, height: 630 }],
    },
  };
}

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  const cat = categoryConfig[work.category];
  const currentIdx = works.findIndex((w) => w.slug === slug);
  const prev = currentIdx > 0 ? works[currentIdx - 1] : null;
  const next = currentIdx < works.length - 1 ? works[currentIdx + 1] : null;

  return (
    <div className="pt-16">
      {/* Back link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
          <Link href="/works">
            <ArrowLeftIcon className="size-4" />
            Back to All Projects
          </Link>
        </Button>
      </div>

      {/* Hero image */}
      <div className="relative h-72 sm:h-96 lg:h-[480px] overflow-hidden">
        <Image
          src={work.images[0]}
          alt={work.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <Badge className={`mb-3 ${cat.color}`}>
            {cat.icon} {cat.label}
          </Badge>
          {work.featured && (
            <Badge variant="gold" className="mb-3 ml-2 text-[10px] font-bold">FEATURED PROJECT</Badge>
          )}
          <h1 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            {work.title}
          </h1>
          <p className="text-white/70 mt-2 text-sm sm:text-base">{work.shortDescription}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Meta */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: CalendarIcon, label: work.date },
                { icon: MapPinIcon, label: work.location },
                { icon: UsersIcon, label: work.beneficiaries },
                ...(work.cost ? [{ icon: CircleDollarSignIcon, label: work.cost }] : []),
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-sm text-muted-foreground bg-muted rounded-full px-3 py-1">
                  <item.icon className="size-3.5 text-primary/70" />
                  {item.label}
                </div>
              ))}
            </div>

            {/* Content */}
            <div
              className="prose prose-sm sm:prose max-w-none text-foreground
                prose-headings:font-sans prose-headings:text-foreground prose-headings:font-bold
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
                prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: work.content }}
            />

            {/* Tags */}
            <div className="mt-10 flex flex-wrap gap-2">
              {work.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs rounded-full">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Impact card */}
            <div className="bg-primary rounded-2xl p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-gold/80 mb-4">Project Impact</p>
              <p className="text-sm leading-relaxed text-white/85">{work.impact}</p>
              {work.cost && (
                <>
                  <Separator className="my-4 bg-white/15" />
                  <div>
                    <p className="text-xs text-white/50 uppercase tracking-wider">Investment</p>
                    <p className="text-2xl font-bold text-gold font-sans mt-1">{work.cost}</p>
                  </div>
                </>
              )}
              <Separator className="my-4 bg-white/15" />
              <div>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Beneficiaries</p>
                <p className="text-sm font-semibold text-white/90">{work.beneficiaries}</p>
              </div>
            </div>

            {/* Gallery */}
            {work.images.length > 1 && (
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Photo Gallery</p>
                <div className="grid grid-cols-2 gap-2">
                  {work.images.slice(1).map((img, i) => (
                    <div key={i} className="relative h-24 rounded-xl overflow-hidden">
                      <Image
                        src={img}
                        alt={`${work.title} photo ${i + 2}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="200px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-muted rounded-2xl p-5 text-center">
              <p className="font-semibold text-foreground text-sm mb-2">Support Our Mission</p>
              <p className="text-xs text-muted-foreground mb-4">
                Help us continue delivering impactful projects to Nomeh community.
              </p>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href="/join">Join LikeMinds</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Prev / Next navigation */}
        <Separator className="my-10" />
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
      </div>
    </div>
  );
}
