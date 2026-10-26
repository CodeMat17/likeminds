"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

// ─── Uli band: a woven strip of triangles and dots, like a wrapper's border ──
export function UliBand({
  className,
  height = 14,
}: {
  className?: string;
  height?: number;
}) {
  const id = useId();
  return (
    <svg
      aria-hidden
      className={cn("block w-full", className)}
      height={height}
      preserveAspectRatio='none'>
      <defs>
        <pattern
          id={id}
          width='28'
          height={height}
          patternUnits='userSpaceOnUse'>
          <path
            d={`M0 ${height} L7 0 L14 ${height} Z`}
            fill='currentColor'
            opacity='0.55'
          />
          <path
            d={`M14 0 L21 ${height} L28 0 Z`}
            fill='currentColor'
            opacity='0.22'
          />
          <circle cx='14' cy={height / 2} r='1.2' fill='currentColor' />
        </pattern>
      </defs>
      <rect width='100%' height='100%' fill={`url(#${id})`} />
    </svg>
  );
}

// ─── Small uli sun-mark used next to eyebrows ───────────────────────────────
export function UliMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.4'
      strokeLinecap='round'
      className={cn("size-4 shrink-0", className)}>
      <circle cx='12' cy='12' r='4' />
      <circle cx='12' cy='12' r='1' fill='currentColor' stroke='none' />
      <path d='M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1' />
    </svg>
  );
}

// ─── Diamond rule: ── ◆ ── ──────────────────────────────────────────────────
export function DiamondRule({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center gap-3", className)}>
      <span className='h-px w-12 bg-linear-to-r from-transparent to-current opacity-60' />
      <span className='size-1.5 rotate-45 bg-current' />
      <span className='h-px w-12 bg-linear-to-l from-transparent to-current opacity-60' />
    </div>
  );
}

// ─── Rotating circular inscription (a seal) ─────────────────────────────────
export function RotatingSeal({
  text = "OFU OBI UMUNWANNE • LIKEMINDS 1980–1986 • ",
  className,
  children,
}: {
  text?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const id = useId();
  return (
    <div className={cn("relative grid place-items-center", className)}>
      <svg
        aria-hidden
        viewBox='0 0 200 200'
        className='absolute inset-0 size-full animate-spin-slow'>
        <defs>
          {/* r=70 leaves an inner margin to the edge of the seal */}
          <path
            id={id}
            d='M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0'
          />
        </defs>
        <text fill='currentColor' fontSize='12' fontWeight='700'>
          {/* Stretch spacing so the inscription closes the circle exactly */}
          <textPath href={`#${id}`} textLength='436' lengthAdjust='spacing'>
            {text}
          </textPath>
        </text>
      </svg>
      {children}
    </div>
  );
}
