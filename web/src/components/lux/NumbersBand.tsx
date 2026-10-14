"use client";

import { motion } from "framer-motion";
import { lux } from "@/lib/home";

// Big uppercase figures on black, separated by thin lines (figures to be confirmed by the client).
export default function NumbersBand({ lines = lux.numbers }: { lines?: string[] }) {
  return (
    <section aria-label="Pinaakini in numbers" className="bg-obsidian px-[var(--margin)] py-24 text-white md:py-32">
      <ul className="m-0 mx-auto max-w-[900px] list-none p-0">
        {lines.map((n, k) => (
          <motion.li
            key={n}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1, delay: k * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`py-8 text-center text-[clamp(1.6rem,1rem+2.4vw,3rem)] font-light uppercase tracking-[0.02em] ${k > 0 ? "border-t border-white/20" : ""}`}
          >
            {n}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
