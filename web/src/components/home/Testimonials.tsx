"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Kicker } from "./motion";
import { home } from "@/lib/home";

const EASE = [0.22, 1, 0.36, 1] as const;

// SAMPLE testimonials until the client supplies approved quotes (lib/home.ts).
export default function Testimonials() {
  const { testimonials } = home;
  const items = testimonials.items;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => document.visibilityState === "visible" && setI((k) => (k + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [paused, reduce, items.length]);

  const go = (d: number) => setI((k) => (k + d + items.length) % items.length);
  const t = items[i];

  return (
    <section
      id="testimonials"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="grid bg-paper md:grid-cols-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[88vh]">
        <AnimatePresence initial={false}>
          <motion.div
            key={t.image + i}
            initial={{ clipPath: reduce ? "inset(0 0 0 0)" : "inset(0 0 0 100%)" }}
            animate={{ clipPath: "inset(0 0 0 0%)" }}
            exit={{ opacity: 0.6 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="absolute inset-0"
          >
            <Image src={t.image} alt="" fill quality={90} sizes="50vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col justify-center px-[var(--margin)] py-20 md:px-16 md:py-24 lg:px-24">
        <Kicker>Client stories</Kicker>
        <span aria-hidden className="mt-8 block font-display text-[7rem] leading-[0.5] text-gold">“</span>
        <div className="relative mt-4 min-h-[16rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -16 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="m-0"
            >
              <blockquote className="m-0 font-display text-[clamp(1.6rem,1.1rem+1.4vw,2.4rem)] font-light italic leading-[1.3]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8">
                <span className="block text-[15px] font-medium">{t.name}</span>
                <span className="t-kicker mt-2 block text-[10px] text-ink-soft">{t.detail}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center gap-6">
          <button onClick={() => go(-1)} aria-label="Previous testimonial" className="flex h-12 w-12 cursor-pointer items-center justify-center border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-white">
            ←
          </button>
          <button onClick={() => go(1)} aria-label="Next testimonial" className="flex h-12 w-12 cursor-pointer items-center justify-center border border-ink/20 transition-colors hover:border-ink hover:bg-ink hover:text-white">
            →
          </button>
          <span className="font-display text-xl tabular-nums text-ink-soft">
            {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
        </div>
        <p className="mt-10 text-[13px] text-ink-soft/80">{testimonials.note}</p>
      </div>
    </section>
  );
}
