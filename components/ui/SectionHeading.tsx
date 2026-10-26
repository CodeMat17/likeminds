import { cn } from "@/lib/utils";
import { Reveal, WordReveal } from "@/components/motion/Reveal";
import { UliMark } from "@/components/ui/Ornaments";

// Eyebrow + serif headline (with optional italic accent) + supporting copy.
export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const onDark = tone === "dark";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}>
      <Reveal
        y={12}
        className={cn(
          "eyebrow flex items-center gap-2.5",
          align === "center" && "justify-center",
          onDark ? "text-gold" : "text-clay",
        )}>
        <UliMark />
        {eyebrow}
      </Reveal>
      <h2
        className={cn(
          "font-display mt-4 text-4xl leading-[1.05] font-medium sm:text-5xl lg:text-[3.5rem]",
          onDark ? "text-white" : "text-foreground",
        )}>
        <WordReveal
          segments={[
            { text: title, br: !!accent },
            ...(accent
              ? [
                  {
                    text: accent,
                    className: cn(
                      "italic font-display-wonk",
                      onDark ? "text-gold" : "text-primary",
                    ),
                  },
                ]
              : []),
          ]}
        />
      </h2>
      {description && (
        <Reveal
          delay={0.15}
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            align === "center" && "mx-auto max-w-2xl",
            onDark ? "text-white/65" : "text-muted-foreground",
          )}>
          {description}
        </Reveal>
      )}
    </div>
  );
}
