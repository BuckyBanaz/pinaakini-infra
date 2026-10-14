"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { home } from "@/lib/home";
import { openVisit } from "@/lib/visit";

const EASE = [0.22, 1, 0.36, 1] as const;

// Two sides of the business: what Pinaakini builds, and how it advises others.
// The panel you point at opens wider; its photograph fades in behind the text.
export default function Services() {
  const { develop, consult } = home.services;
  const [open, setOpen] = useState<0 | 1>(0);
  const reduce = useReducedMotion();
  const panels = [develop, consult];

  return (
    <section id="services" aria-label="What we do" className="flex flex-col bg-ivory md:h-[92svh] md:flex-row">
      {panels.map((s, i) => {
        const on = open === i;
        const dark = i === 1;
        return (
          <motion.div
            key={s.title}
            onMouseEnter={() => setOpen(i as 0 | 1)}
            onFocus={() => setOpen(i as 0 | 1)}
            animate={{ flexGrow: reduce ? 1 : on ? 1.6 : 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className={`group relative flex min-h-[78svh] basis-0 flex-col justify-end overflow-hidden px-[var(--margin)] py-16 md:min-h-0 md:px-14 md:py-20 ${
              dark ? "bg-obsidian text-ivory" : "bg-sand text-ink"
            }`}
          >
            <motion.div
              aria-hidden
              animate={{ opacity: on ? (dark ? 0.32 : 0.2) : dark ? 0.12 : 0.08, scale: on ? 1 : 1.08 }}
              transition={{ duration: 1.2, ease: EASE }}
              className="absolute inset-0"
            >
              <Image src={s.image} alt="" fill quality={85} sizes="60vw" className="object-cover" />
            </motion.div>
            <div className="relative max-w-[30rem]">
              <p className={`t-kicker ${dark ? "text-gold" : "text-gold-deep"}`}>{s.kicker}</p>
              <h2 className="t-head mt-5">{s.title}</h2>
              <p className={`mt-5 text-[17px] font-light leading-[1.7] ${dark ? "text-ivory/80" : "text-ink-soft"}`}>{s.text}</p>
              <ul className="m-0 mt-8 list-none space-y-0 p-0">
                {s.items.map((it, k) => (
                  <motion.li
                    key={it}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 + k * 0.07, ease: EASE }}
                    className={`flex items-center justify-between border-t py-3.5 text-[16px] ${dark ? "border-ivory/15" : "border-ink/12"}`}
                  >
                    {it}
                    <span aria-hidden className={`transition-transform duration-500 group-hover:translate-x-1 ${dark ? "text-gold" : "text-gold-deep"}`}>
                      →
                    </span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-10">
                {"href" in s.cta && s.cta.href ? (
                  <Link href={s.cta.href} className="btn btn-dark">
                    {s.cta.label}
                  </Link>
                ) : (
                  <button onClick={() => openVisit("Consultancy enquiry")} className="btn btn-gold">
                    {s.cta.label}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
