import { cn } from "@/lib/utils";

// CSS-driven infinite marquee. Children are rendered twice so the -50% loop is seamless.
// For spacing, pass matching gap + right padding in trackClassName (e.g. "gap-4 pr-4").
export function Marquee({
  children,
  className,
  trackClassName,
  duration = 40,
  reverse = false,
  pauseOnHover = false,
}: {
  children: React.ReactNode;
  className?: string;
  trackClassName?: string;
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={cn("marquee overflow-hidden", className)}>
      <div
        className='marquee-track'
        data-reverse={reverse}
        data-pause={pauseOnHover}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}>
        <div className={cn("flex shrink-0", trackClassName)}>{children}</div>
        <div className={cn("flex shrink-0", trackClassName)} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
