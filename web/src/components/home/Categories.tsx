"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Kicker, Rise, SplitHeading } from "./motion";
import { home } from "@/lib/home";

// Four kinds of property as tall panels; hovering one opens it wider.
export default function Categories() {
  return (
    <section aria-label="What we build" className="bg-obsidian px-[var(--margin)] py-24 text-white md:py-32">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <Rise>
            <Kicker light>What we build</Kicker>
          </Rise>
          <SplitHeading text="Four ways to own a piece of Nellore" className="t-head mt-6 max-w-[16ch]" />
        </div>
        <Rise delay={0.2}>
          <Link href="/properties" className="btn btn-line text-white">
            All properties <span aria-hidden>→</span>
          </Link>
        </Rise>
      </div>

      <div className="group/row mt-16 flex flex-col gap-3 md:h-[68vh] md:flex-row">
        {home.categories.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative h-[52vh] overflow-hidden transition-[flex] duration-700 ease-(--ease-lux) md:h-auto md:flex-1 md:hover:flex-[2.2]"
          >
            <Link href={c.href} className="absolute inset-0 block">
              <Image
                src={c.image}
                alt={`${c.name} by Pinaakini Infra`}
                fill
                quality={90}
                sizes="(min-width:768px) 40vw, 100vw"
                className="object-cover transition-transform duration-[1.6s] ease-(--ease-lux) group-hover:scale-105"
              />
              <span aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgba(8,8,8,.8)_0%,rgba(8,8,8,.1)_55%,rgba(8,8,8,.25)_100%)]" />
              <span className="absolute left-6 top-6 font-display text-lg text-white/70">0{i + 1}</span>
              <span className="absolute inset-x-6 bottom-6 block">
                <span className="block font-display text-[2.25rem] font-light leading-none">{c.name}</span>
                <span className="mt-3 block max-w-[28ch] text-[15px] font-light text-white/80 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
                  {c.note}
                </span>
                <span className="t-kicker mt-5 inline-flex items-center gap-3 text-[11px] text-gold">
                  Explore <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-2">→</span>
                </span>
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
