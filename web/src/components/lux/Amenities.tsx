"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { lux } from "@/lib/home";

// Tall rounded amenity cards that drift sideways as the section scrolls past.
export default function Amenities() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["6%", "-22%"]);

  return (
    <section ref={ref} aria-label="Amenities" className="overflow-hidden bg-white pb-24 md:pb-32">
      <motion.ul style={{ x }} className="m-0 flex w-max list-none gap-4 px-[var(--margin)] p-0">
        {lux.amenities.map((a, i) => (
          <motion.li
            key={a.label}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative h-[52vh] w-[62vw] shrink-0 overflow-hidden rounded-2xl bg-stone sm:w-[34vw] lg:w-[17vw]"
          >
            <Image src={a.image} alt={a.label} fill quality={90} sizes="(min-width:1024px) 17vw, 62vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
            <span aria-hidden className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(0,0,0,.55),rgba(0,0,0,0))]" />
            <span className="absolute left-4 top-4 text-[11px] font-medium uppercase tracking-[0.12em] text-white">{a.label}</span>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
