"use client";

import { motion } from "framer-motion";
import { Counter, Rise } from "@/components/home/motion";
import { home, lux } from "@/lib/home";
import CtaCard from "./CtaCard";

const EASE = [0.22, 1, 0.36, 1] as const;

// Why Nellore, the numbers in pills, then the closing invitation card.
export default function Invest() {
  const { invest } = lux;
  return (
    <section id="visit" className="bg-white px-[var(--margin)] pb-28">
      <div className="grid gap-8 border-t border-ink/10 pt-20 md:grid-cols-2 md:items-end">
        <h2 className="t-head">
          {invest.heading.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </h2>
        <Rise>
          <p className="max-w-[46ch] text-[15px] leading-[1.8] text-ink-soft md:justify-self-end">{invest.text}</p>
        </Rise>
      </div>
      <ul className="m-0 mt-12 grid list-none grid-cols-2 gap-4 p-0 md:grid-cols-4">
        {home.stats.map((s, i) => (
          <motion.li
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
            className="rounded-full border border-ink/20 px-6 py-6 text-center"
          >
            <span className="block text-[clamp(1.4rem,1rem+1vw,2rem)] font-normal leading-none">
              <Counter value={s.value} suffix={s.suffix} />
            </span>
            <span className="mt-2 block text-[12px] text-ink-soft">{s.label}</span>
          </motion.li>
        ))}
      </ul>

      <div className="mt-24">
        <CtaCard />
      </div>
    </section>
  );
}
