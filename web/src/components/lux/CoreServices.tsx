"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Building2, CalendarCheck, FileSearch, Home, LandPlot, LayoutGrid, MapPinned, Megaphone, Sprout, TrendingUp } from "lucide-react";
import { Rise } from "@/components/home/motion";
import { lux } from "@/lib/home";
import { openVisit } from "@/lib/visit";

const ICONS_L = [Home, Building2, LandPlot, Sprout, CalendarCheck];
const ICONS_R = [MapPinned, FileSearch, LayoutGrid, Megaphone, TrendingUp];
const EASE = [0.22, 1, 0.36, 1] as const;

// Develop on the left, consult on the right, one tall image in between.
export default function CoreServices() {
  const { core } = lux;
  const col = (title: string, items: string[], icons: typeof ICONS_L, side: number) => (
    <div>
      <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-soft">{title}</p>
      <ul className="m-0 mt-4 list-none p-0">
        {items.map((it, k) => {
          const Icon = icons[k % icons.length];
          return (
            <motion.li
              key={it}
              initial={{ opacity: 0, x: side * 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: k * 0.07, ease: EASE }}
              className="group flex items-center gap-4 border-b border-ink/15 py-4 text-[13px] uppercase tracking-[0.06em]"
            >
              <Icon size={20} strokeWidth={1.3} className="shrink-0 transition-transform duration-500 group-hover:scale-110" aria-hidden />
              {it}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <section id="services" className="overflow-x-clip bg-sand px-[var(--margin)] py-24 md:py-32">
      <Rise>
        <h2 className="t-head">{core.heading}</h2>
        <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.8] text-ink-soft">{core.text}</p>
      </Rise>
      <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr_1fr]">
        {col(core.left.title, core.left.items, ICONS_L, -1)}
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ clipPath: "inset(0% 0 0 0)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.4, ease: EASE }}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl"
        >
          <Image src={core.image} alt="A Pinaakini villa facade at dusk" fill quality={90} sizes="(min-width:1024px) 34vw, 100vw" className="object-cover" />
        </motion.div>
        <div>
          {col(core.right.title, core.right.items, ICONS_R, 1)}
          <button onClick={() => openVisit("Consultancy enquiry")} className="btn btn-dark mt-8">
            Talk to a consultant
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
