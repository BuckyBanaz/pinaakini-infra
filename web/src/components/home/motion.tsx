"use client";

import { animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Heading whose words rise out of a mask, one after another. */
export function SplitHeading({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-top">
          <motion.span
            className="inline-block"
            initial={{ y: reduce ? 0 : "110%" }}
            animate={inView ? { y: 0 } : undefined}
            transition={{ duration: 1, delay: delay + i * 0.06, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Block that fades and rises into place once. */
export function Rise({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Number that counts up when it scrolls into view. */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, value, { duration: 2.2, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, value]);
  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/** Image revealed by a curtain wipe, with a slow scroll parallax inside its frame.
 *  The unclipped outer frame is what gets watched, so the reveal always triggers. */
export function RevealImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  parallax = 8,
  from = "bottom",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  parallax?: number;
  from?: "bottom" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : [`-${parallax}%`, `${parallax}%`]);
  const hidden = from === "bottom" ? "inset(100% 0% 0% 0%)" : from === "left" ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)";
  return (
    <div ref={ref} className={`${className.split(" ").includes("absolute") ? "" : "relative "}${className}`}>
      <motion.div
        initial={{ clipPath: reduce ? "inset(0% 0% 0% 0%)" : hidden }}
        animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ duration: 1.4, ease: EASE }}
        className="absolute inset-0 overflow-hidden bg-stone"
      >
        <motion.div style={{ y, scale: 1 + parallax / 50 }} className="absolute inset-0">
          <Image src={src} alt={alt} fill quality={90} sizes={sizes} priority={priority} className="object-cover" />
        </motion.div>
      </motion.div>
    </div>
  );
}

/** Small uppercase label with a short gold rule before it. */
export function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`t-kicker flex items-center gap-4 ${light ? "text-gold" : "text-gold-deep"}`}>
      <span className="h-px w-10 bg-current" />
      {children}
    </p>
  );
}

/** Paragraph whose words light up one by one as it scrolls through the screen. */
export function ScrollText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} p={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={!!reduce}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  p,
  range,
  still,
}: {
  children: string;
  p: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  still: boolean;
}) {
  const opacity = useTransform(p, range, still ? [1, 1] : [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}
