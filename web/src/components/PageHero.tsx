"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// Lumera-style inner-page opening: full-bleed photograph, breadcrumb, huge light uppercase title,
// a short line and an optional pill action.
export default function PageHero({
  kicker,
  title,
  italic,
  line,
  image,
  crumb,
  short = false,
  action,
}: {
  kicker: string;
  title: string;
  italic?: string;
  line?: string;
  image: string;
  crumb: string;
  short?: boolean;
  action?: { label: string; href: string };
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.06, 1.16]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const lines = [title, italic].filter(Boolean) as string[];

  return (
    <section ref={ref} className={`relative flex items-end overflow-hidden bg-obsidian text-white ${short ? "min-h-[70svh]" : "min-h-[100svh]"}`}>
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image src={image} alt="" fill priority quality={90} sizes="100vw" className="object-cover" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,.7)_0%,rgba(0,0,0,.15)_55%,rgba(0,0,0,.35)_100%)]" />

      <motion.nav
        aria-label="Breadcrumb"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        className="absolute left-[var(--margin)] top-[104px] flex items-center gap-3 text-[13px] text-white/80"
      >
        <Link href="/" className="hover:text-white">
          Home
        </Link>
        <span aria-hidden>/</span>
        <span aria-current="page" className="text-white">
          {crumb}
        </span>
      </motion.nav>

      <motion.div style={{ opacity: fade }} className="relative w-full px-[var(--margin)] pb-14 pt-48 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="text-[13px] font-medium uppercase tracking-[0.24em] text-white/80"
        >
          {kicker}
        </motion.p>

        <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="font-display text-[clamp(2.7rem,1.2rem+6vw,7.5rem)] font-light uppercase leading-[0.95] tracking-[-0.02em]" aria-label={lines.join(" ")}>
            {lines.map((l, i) => (
              <span key={l} aria-hidden className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className="block"
                  initial={{ y: reduce ? 0 : "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.14, ease: EASE }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>

          {(line || action) && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: EASE }}
              className="max-w-[40ch] lg:pb-3"
            >
              {line && <p className="text-[15px] font-light leading-[1.8] text-white/85">{line}</p>}
              {action && (
                <a href={action.href} className="btn btn-gold mt-6">
                  {action.label}
                  <span className="btn-arrow">↓</span>
                </a>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
