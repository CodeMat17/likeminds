"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Fade + rise on enter ────────────────────────────────────────────────────
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "li" | "section" | "article";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}>
      {children}
    </Comp>
  );
}

// ─── Masked word-by-word headline reveal ─────────────────────────────────────
// Pass segments to style parts of the line differently, e.g.
// [{ text: "One heart." }, { text: "One brotherhood.", className: "italic text-gold" }]
type Segment = { text: string; className?: string; br?: boolean };

export function WordReveal({
  text,
  segments,
  className,
  delay = 0,
  stagger = 0.06,
  animateOnMount = false,
}: {
  text?: string;
  segments?: Segment[];
  className?: string;
  delay?: number;
  stagger?: number;
  animateOnMount?: boolean;
}) {
  const parts: Segment[] = segments ?? [{ text: text ?? "" }];
  let index = 0;

  const trigger = animateOnMount
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: { once: true, margin: "-40px" } };

  return (
    <motion.span
      className={cn("inline", className)}
      initial='hidden'
      {...trigger}
      aria-label={parts.map((p) => p.text).join(" ")}>
      {parts.map((part, pi) => (
        <span key={pi} aria-hidden>
          {part.text.split(" ").map((word, wi) => {
            const i = index++;
            return (
              <span
                key={wi}
                className='inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]'>
                <motion.span
                  className={cn("inline-block", part.className)}
                  variants={{
                    hidden: { y: "105%", rotate: 4 },
                    visible: {
                      y: "0%",
                      rotate: 0,
                      transition: { duration: 1, delay: delay + i * stagger, ease: EASE },
                    },
                  }}>
                  {word}
                </motion.span>
                {" "}
              </span>
            );
          })}
          {part.br && <br />}
        </span>
      ))}
    </motion.span>
  );
}

// ─── Scroll-linked text: words brighten as the paragraph scrolls through ────
export function ScrollHighlight({
  text,
  className,
  wordClassName,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <HighlightWord
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          className={wordClassName}>
          {word}
        </HighlightWord>
      ))}
    </p>
  );
}

function HighlightWord({
  children,
  progress,
  range,
  className,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className={cn("mr-[0.25em]", className)}>
      {children}
    </motion.span>
  );
}

// ─── Parallax wrapper ────────────────────────────────────────────────────────
export function Parallax({
  children,
  className,
  offset = 60,
}: {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
