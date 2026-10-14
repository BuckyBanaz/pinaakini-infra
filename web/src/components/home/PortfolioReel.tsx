"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Kicker } from "./motion";
import { PROJECTS } from "@/lib/projects";

// Alternate homes and land so the reel never shows two fields in a row.
const done = PROJECTS.filter((p) => p.status === "Completed" || p.status === "Sold Out");
const homes = done.filter((p) => p.category === "Villas" || p.category === "Triplex Houses");
const land = done.filter((p) => p.category === "Layouts" || p.category === "Farmlands");
const DONE = Array.from({ length: Math.max(homes.length, land.length) })
  .flatMap((_, i) => [land[i], homes[i]])
  .filter(Boolean)
  .slice(0, 8) as typeof done;

// Pinned section: scrolling down moves the portfolio sideways, each card tilting in 3D.
export default function PortfolioReel() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const measure = () => {
      const t = trackRef.current;
      if (t) setShift(Math.max(0, t.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -shift]);
  const bar = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  if (reduce) {
    return (
      <section id="portfolio" className="bg-obsidian px-[var(--margin)] py-24 text-white">
        <Header />
        <div className="no-scrollbar mt-12 flex gap-6 overflow-x-auto">
          {DONE.map((p) => (
            <Card key={p.id} p={p} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" ref={ref} className="relative bg-obsidian text-white" style={{ height: `calc(100svh + ${shift}px)` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-[76px] md:pt-[88px]">
        <div className="px-[var(--margin)]">
          <Header />
        </div>
        <motion.div ref={trackRef} style={{ x }} className="mt-12 flex w-max gap-6 px-[var(--margin)] [perspective:1600px]">
          {DONE.map((p) => (
            <Card key={p.id} p={p} />
          ))}
          <Link
            href="/portfolio"
            className="group flex aspect-[4/5] w-[70vw] shrink-0 flex-col items-start justify-end bg-gold p-8 text-white sm:w-[32vw] lg:w-[24vw]"
          >
            <span className="font-display text-[2.5rem] font-light leading-none">See the full portfolio</span>
            <span className="t-kicker mt-6 text-[11px]">
              Portfolio <span aria-hidden className="inline-block transition-transform duration-500 group-hover:translate-x-2">→</span>
            </span>
          </Link>
        </motion.div>
        <div className="mx-[var(--margin)] mt-10 h-px bg-white/15">
          <motion.div style={{ width: bar }} className="h-full bg-gold" />
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div>
        <Kicker light>Our portfolio</Kicker>
        <h2 className="t-head mt-6 max-w-[14ch]">Communities we have delivered</h2>
      </div>
      <p className="max-w-[36ch] text-[16px] font-light text-white/70">
        Completed and sold-out developments across Nellore. Scroll to move through them.
      </p>
    </div>
  );
}

function Card({ p }: { p: (typeof DONE)[number] }) {
  return (
    <motion.article
      whileHover={{ rotateY: -6, rotateX: 3, z: 30 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group w-[70vw] shrink-0 [transform-style:preserve-3d] sm:w-[32vw] lg:w-[24vw]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
        <Image
          src={p.featuredImage}
          alt={`${p.name}, ${p.location}`}
          fill
          quality={90}
          sizes="(min-width:1024px) 24vw, 70vw"
          className="object-cover transition-transform duration-[1.4s] ease-(--ease-lux) group-hover:scale-105"
        />
        <span className="t-kicker absolute left-4 top-4 bg-obsidian/80 px-3 py-2 text-[10px] text-white">{p.status}</span>
      </div>
      <p className="t-kicker mt-5 text-[10px] text-gold">{p.category}</p>
      <h3 className="mt-2 font-display text-[1.75rem] font-light leading-tight">{p.name}</h3>
      <p className="mt-1 text-[14px] font-light text-white/60">
        {p.location.split(",")[0]} · {p.extent}
      </p>
    </motion.article>
  );
}
