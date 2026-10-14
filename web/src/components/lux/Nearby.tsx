"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Rise } from "@/components/home/motion";
import { lux } from "@/lib/home";

// Landmarks around Nellore in a sideways slider with a progress line.
export default function Nearby() {
  const track = useRef<HTMLUListElement>(null);
  const { scrollXProgress } = useScroll({ container: track });

  return (
    <section aria-label="Around Nellore" className="overflow-hidden bg-white pb-24 md:pb-32">
      <Rise className="px-[var(--margin)]">
        <h2 className="t-head">Around Nellore</h2>
      </Rise>
      <ul
        ref={track}
        data-lenis-prevent
        className="no-scrollbar m-0 mt-12 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--margin)] p-0"
      >
        {lux.nearby.map((n, i) => (
          <motion.li
            key={n.name}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative h-[44vh] w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl bg-stone sm:w-[46vw] lg:w-[30vw]"
          >
            <Image src={n.image} alt={n.name} fill quality={90} sizes="(min-width:1024px) 30vw, 78vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(0deg,rgba(0,0,0,.7),rgba(0,0,0,0))]" />
            <span className="absolute bottom-5 left-5 text-white">
              <span className="block text-[12px] text-white/80">{n.note}</span>
              <span className="mt-1 block text-[18px] font-medium uppercase tracking-[0.04em]">{n.name}</span>
            </span>
          </motion.li>
        ))}
      </ul>
      <div className="mx-[var(--margin)] mt-8 h-[2px] bg-ink/10">
        <motion.div style={{ scaleX: scrollXProgress }} className="h-full origin-left bg-ink" />
      </div>
      <p className="mx-[var(--margin)] mt-4 text-[12px] text-ink-soft">Landmark photographs via Wikimedia Commons; see credits in the footer.</p>
    </section>
  );
}
