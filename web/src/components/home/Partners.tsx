"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Kicker, Rise, SplitHeading } from "./motion";
import { home } from "@/lib/home";

// A moving wall of partner brands. Until the client sends logos it shows clearly
// marked empty slots; add entries to home.partners.items to fill it.
export default function Partners() {
  const { partners } = home;
  const reduce = useReducedMotion();
  const real = partners.items.length > 0;
  const tiles: { name: string; logo?: string }[] = real ? partners.items : Array.from({ length: partners.slots }, (_, i) => ({ name: `Partner ${i + 1}` }));
  const row = [...tiles, ...tiles];

  return (
    <section id="partners" className="overflow-hidden bg-paper py-24 md:py-32">
      <div className="flex flex-col justify-between gap-6 px-[var(--margin)] md:flex-row md:items-end">
        <div>
          <Rise>
            <Kicker>Trusted by</Kicker>
          </Rise>
          <SplitHeading text={partners.heading} className="t-head mt-6 max-w-[14ch]" />
        </div>
        {!real && (
          <Rise delay={0.15}>
            <p className="max-w-[34ch] text-[14px] text-ink-soft">{partners.note}</p>
          </Rise>
        )}
      </div>

      {[0, 1].map((r) => (
        <div key={r} className="mt-10 flex overflow-hidden first-of-type:mt-14">
          <motion.ul
            className="m-0 flex w-max list-none gap-4 p-0"
            animate={reduce ? undefined : { x: r === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
            transition={{ duration: 38, ease: "linear", repeat: Infinity }}
          >
            {row.map((t, i) => (
              <li
                key={`${r}-${i}`}
                className="group flex h-28 w-56 shrink-0 items-center justify-center border border-ink/10 bg-ivory px-6 transition-colors duration-500 hover:border-gold hover:bg-white md:h-32 md:w-64"
              >
                {t.logo ? (
                  <Image src={t.logo} alt={t.name} width={160} height={64} className="max-h-14 w-auto object-contain opacity-70 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0" />
                ) : (
                  <span className="text-center font-display text-[1.35rem] text-ink/25 transition-colors group-hover:text-ink/50">
                    {real ? t.name : "Partner logo"}
                  </span>
                )}
              </li>
            ))}
          </motion.ul>
        </div>
      ))}
    </section>
  );
}
