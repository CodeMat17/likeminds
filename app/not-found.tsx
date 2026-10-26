import Link from "next/link";
import { ArrowLeftIcon, HomeIcon } from "lucide-react";
import { Emblem } from "@/components/ui/Emblem";
import { UliBand } from "@/components/ui/Ornaments";

export default function NotFound() {
  return (
    <div className='noise relative flex min-h-svh items-center justify-center overflow-hidden bg-green-deep px-4 pt-24 pb-16'>
      <div className='pattern-nsibidi mask-radial pointer-events-none absolute inset-0' />
      <div className='pointer-events-none absolute -top-40 -right-40 size-[36rem] rounded-full bg-clay/25 blur-[140px]' />
      <p
        aria-hidden
        className='font-display pointer-events-none absolute inset-0 grid place-items-center text-[38vw] leading-none font-semibold text-white/[0.04] italic select-none'>
        404
      </p>

      <div className='relative z-10 max-w-lg text-center'>
        <Emblem size={84} className='mx-auto mb-8 animate-float' />
        <p className='eyebrow text-gold'>Page not found</p>
        <h1 className='font-display mt-4 text-5xl leading-tight font-medium text-white sm:text-6xl'>
          This path leads <em className='font-display-wonk text-gradient-warm'>nowhere.</em>
        </h1>
        <p className='mt-5 leading-relaxed text-white/60'>
          The page you are looking for does not exist or has been moved. Let us take you
          back to the brotherhood.
        </p>
        <div className='mt-10 flex flex-col justify-center gap-3 sm:flex-row'>
          <Link
            href='/'
            className='inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 font-bold text-green-deep transition-colors hover:bg-gold-light'>
            <HomeIcon className='size-4' />
            Go home
          </Link>
          <Link
            href='/works'
            className='inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-7 font-semibold text-white transition-colors hover:bg-white/10'>
            <ArrowLeftIcon className='size-4' />
            View our works
          </Link>
        </div>
        <p className='font-display mt-10 text-lg text-gold italic'>&ldquo;Ofu Obi Umunwanne&rdquo;</p>
      </div>
      <UliBand className='absolute inset-x-0 bottom-0 text-gold/50' height={10} />
    </div>
  );
}
