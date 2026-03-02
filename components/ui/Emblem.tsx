import { cn } from "@/lib/utils";

interface EmblemProps {
  className?: string;
  size?: number;
  variant?: "full" | "icon";
}

export function Emblem({ className, size = 80, variant = "full" }: EmblemProps) {
  if (variant === "icon") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("shrink-0", className)}
        aria-label="LikeMinds Association Emblem"
      >
        {/* Outer ring */}
        <circle cx="40" cy="40" r="38" fill="currentColor" className="text-primary" />
        <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold" />
        <circle cx="40" cy="40" r="32" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold opacity-50" />

        {/* Inner background */}
        <circle cx="40" cy="40" r="31" fill="currentColor" className="text-green-deep" />

        {/* LM letters */}
        <text
          x="40"
          y="46"
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
          fill="currentColor"
          className="text-gold"
          fontFamily="serif"
          letterSpacing="2"
        >
          LM
        </text>

        {/* Stars */}
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const rad = (angle - 90) * (Math.PI / 180);
          const x = 40 + 24 * Math.cos(rad);
          const y = 40 + 24 * Math.sin(rad);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1.5"
              fill="currentColor"
              className="text-gold"
            />
          );
        })}
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-label="LikeMinds Association Emblem"
    >
      {/* Outer decorative ring */}
      <circle cx="60" cy="60" r="58" fill="currentColor" className="text-primary" />
      <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold" />
      <circle cx="60" cy="60" r="51" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-gold opacity-60" />

      {/* Inner dark circle */}
      <circle cx="60" cy="60" r="48" fill="currentColor" className="text-green-deep" />

      {/* Top arc text: LIKEMINDS */}
      <defs>
        <path id="topArc" d="M 60 60 m -36 0 a 36 36 0 1 1 72 0" />
        <path id="bottomArc" d="M 60 60 m -32 0 a 32 32 0 0 0 64 0" />
      </defs>
      <text fontSize="7.5" fontWeight="700" letterSpacing="3.5" fill="currentColor" className="text-gold" fontFamily="serif">
        <textPath href="#topArc" startOffset="10%">LIKEMINDS  1980–1986</textPath>
      </text>
      <text fontSize="6" fontWeight="600" letterSpacing="2" fill="currentColor" className="text-gold opacity-80" fontFamily="serif">
        <textPath href="#bottomArc" startOffset="8%">OFU OBI UMUNWANNE</textPath>
      </text>

      {/* LM initials */}
      <text
        x="60"
        y="67"
        textAnchor="middle"
        fontSize="30"
        fontWeight="800"
        fill="currentColor"
        className="text-gold"
        fontFamily="serif"
        letterSpacing="3"
      >
        LM
      </text>

      {/* Decorative dots around inner circle */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 360) / 24 - 90;
        const rad = angle * (Math.PI / 180);
        const x = 60 + 45 * Math.cos(rad);
        const y = 60 + 45 * Math.sin(rad);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 4 === 0 ? 1.5 : 0.8}
            fill="currentColor"
            className="text-gold"
            opacity={i % 4 === 0 ? 1 : 0.5}
          />
        );
      })}

      {/* Divider lines */}
      <line x1="28" y1="60" x2="44" y2="60" stroke="currentColor" strokeWidth="0.8" className="text-gold opacity-60" />
      <line x1="76" y1="60" x2="92" y2="60" stroke="currentColor" strokeWidth="0.8" className="text-gold opacity-60" />
    </svg>
  );
}
