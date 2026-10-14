"use client";

import { motion } from "framer-motion";
import { Kicker, RevealImage, Rise, SplitHeading } from "./motion";
import { home } from "@/lib/home";

export default function Pillars() {
  return (
    <section id="why" className="overflow-x-clip bg-ivory px-[var(--margin)] py-24 md:py-36">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Rise>
              <Kicker>Why Pinaakini</Kicker>
            </Rise>
            <SplitHeading text="Built on trust, delivered with care" className="t-head mt-6 max-w-[13ch]" />
            <RevealImage src="/img/entrance.webp" alt="The arrival drive of a Pinaakini villa" className="mt-12 hidden aspect-[4/3] lg:block" sizes="40vw" />
          </div>
        </div>

        <ol className="m-0 list-none p-0 lg:col-span-6 lg:col-start-7">
          {home.pillars.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 1, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group grid grid-cols-[auto_1fr] gap-x-8 border-t border-ink/12 py-10 last:border-b md:py-12"
            >
              <span className="font-display text-[3.5rem] font-light leading-none text-gold transition-transform duration-700 ease-(--ease-lux) group-hover:-translate-y-1">
                0{i + 1}
              </span>
              <div>
                <h3 className="font-display text-[2rem] font-normal leading-tight">{p.title}</h3>
                <p className="mt-3 max-w-[42ch] text-[16px] font-light leading-[1.8] text-ink-soft">{p.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
