"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// Inner-page opening: a full-bleed photograph that slowly drifts, breadcrumb, big serif title.
export default function PageHero({
  kicker,
  title,
  italic,
  line,
  image,
  crumb,
  short = false,
}: {
  kicker: string;
  title: string;
  italic?: string;
  line?: string;
  image: string;
  crumb: string;
  short?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.08, 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const lines = [title, italic].filter(Boolean) as string[];

  return (
    <section ref={ref} className={`relative flex items-end overflow-hidden bg-obsidian text-white ${short ? "min-h-[62svh]" : "min-h-[82svh]"}`}>
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image src={image} alt="" fill priority quality={90} sizes="100vw" className="object-cover" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,10,10,.82)_0%,rgba(10,10,10,.35)_55%,rgba(10,10,10,.45)_100%)]" />

      <motion.div style={{ opacity: fade }} className="relative w-full px-[var(--margin)] pb-16 pt-40 md:pb-24">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="t-kicker flex items-center gap-3 text-[11px] text-white/70"
        >
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span aria-hidden className="text-gold">/</span>
          <span aria-current="page" className="text-white">
            {crumb}
          </span>
        </motion.nav>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="t-kicker mt-10 flex items-center gap-4 text-gold"
        >
          <span className="h-px w-10 bg-current" />
          {kicker}
        </motion.p>

        <h1 className="t-display mt-6 text-[clamp(3rem,1.6rem+6vw,7.5rem)]" aria-label={lines.join(" ")}>
          {lines.map((l, i) => (
            <span key={l} aria-hidden className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className={`block ${i === 1 ? "italic text-[#e9d6b0]" : ""}`}
                initial={{ y: reduce ? 0 : "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.14, ease: EASE }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>

        {line && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: EASE }}
            className="mt-8 max-w-[52ch] text-[17px] font-light leading-[1.8] text-white/85"
          >
            {line}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
