"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Rise } from "@/components/home/motion";
import { lux } from "@/lib/home";

const EASE = [0.22, 1, 0.36, 1] as const;
const SIZE: Record<number, string> = {
  0: "h-[300px] w-[220px] md:h-[380px] md:w-[280px]",
  1: "h-[120px] w-[120px] md:h-[150px] md:w-[150px]",
  2: "h-[96px] w-[96px] md:h-[124px] md:w-[124px]",
};

// Intro on a grey band, then an oval carousel of what Pinaakini builds and advises on.
export default function Considered() {
  const { considered, ovals } = lux;
  const n = ovals.length;
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, amount: 0.1 });
  const ordered = [-2, -1, 0, 1, 2].map((o) => ({ o, item: ovals[(i + o + n) % n] }));
  const go = (d: number) => setI((k) => (k + d + n) % n);
  const active = ovals[i];

  return (
    <section id="considered" className="bg-sand px-[var(--margin)] pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="grid gap-10 md:grid-cols-2 md:gap-14 items-start">
        <div ref={headingRef}>
          <Rise>
            <p className="t-kicker text-ink-soft mb-3">About Pinaakini · Nellore</p>
          </Rise>
          <h2 className="t-head text-ink" aria-label={considered.heading.join(" ")}>
            {considered.heading.map((l, k) => (
              <span key={l} aria-hidden className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: reduce ? 0 : "105%" }}
                  animate={inView ? { y: 0 } : { y: reduce ? 0 : "105%" }}
                  transition={{ duration: 0.9, delay: k * 0.12, ease: EASE }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h2>
          <Rise delay={0.25} className="mt-6 flex flex-wrap gap-3 items-center">
            <a
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white px-5 py-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-ink hover:text-white"
            >
              <span>Our Story</span>
              <span>→</span>
            </a>
            <a
              href="/properties"
              className="inline-flex items-center gap-2 rounded-full border border-transparent bg-ink px-5 py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-85"
            >
              <span>Explore Portfolio</span>
              <span>→</span>
            </a>
          </Rise>
        </div>

        <div className="space-y-5 md:max-w-[46ch] md:justify-self-end">
          {considered.body.map((p, k) => (
            <Rise key={k} delay={0.1 + k * 0.1}>
              <p className="text-[15px] leading-[1.8] text-ink-soft">{p}</p>
            </Rise>
          ))}
          <Rise delay={0.3} className="pt-2">
            <div className="grid grid-cols-2 gap-4 border-t border-ink/10 pt-4">
              <div>
                <span className="block text-[18px] font-medium text-ink">100% Clear</span>
                <span className="block text-[12px] text-ink-soft">Verified Titles & Approvals</span>
              </div>
              <div>
                <span className="block text-[18px] font-medium text-ink">Direct Developer</span>
                <span className="block text-[12px] text-ink-soft">Personal Site Walkthroughs</span>
              </div>
            </div>
          </Rise>
        </div>
      </div>

      <div className="mt-20 flex h-[320px] items-center justify-center gap-4 overflow-hidden md:h-[400px] md:gap-8">
        {ordered.map(({ o, item }) => {
          const d = Math.abs(o);
          return (
            <motion.button
              key={item.title}
              layout={!reduce}
              transition={{ duration: 0.8, ease: EASE }}
              onClick={() => o !== 0 && go(o)}
              aria-label={o === 0 ? item.title : `Show ${item.title}`}
              className={`relative shrink-0 cursor-pointer overflow-hidden rounded-full bg-stone ${SIZE[d]} ${d === 2 ? "max-sm:hidden" : ""}`}
            >
              <Image src={item.image} alt="" fill quality={90} sizes="280px" className="object-cover transition-transform duration-700 hover:scale-110" />
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8 text-center" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={active.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}>
            <p className="text-[1.5rem] font-normal tracking-[-0.01em]">{active.title}</p>
            <p className="mx-auto mt-2 max-w-[34ch] text-[14px] text-ink-soft">{active.text}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => go(-1)} aria-label="Previous" className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-ink/30 transition-colors hover:bg-ink hover:text-white">
            ←
          </button>
          <button onClick={() => go(1)} aria-label="Next" className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-ink/30 transition-colors hover:bg-ink hover:text-white">
            →
          </button>
        </div>
      </div>
    </section>
  );
}
