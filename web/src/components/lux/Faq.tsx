"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Rise } from "@/components/home/motion";
import { lux } from "@/lib/home";

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="bg-white px-[var(--margin)] py-24 md:py-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <Rise>
          <h2 className="t-head">FAQs</h2>
          <p className="mt-4 max-w-[34ch] text-[15px] leading-[1.8] text-ink-soft">Answers to what buyers ask us most. Anything else, ask us directly.</p>
        </Rise>
        <ul className="m-0 list-none space-y-3 p-0">
          {lux.faq.map((f, i) => {
            const on = open === i;
            return (
              <Rise key={f.q} delay={i * 0.05}>
                <li className={`rounded-xl border transition-colors duration-500 ${on ? "border-transparent bg-sand" : "border-ink/15 bg-white"}`}>
                  <button
                    onClick={() => setOpen(on ? -1 : i)}
                    aria-expanded={on}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-5 text-left text-[15px] font-medium"
                  >
                    {f.q}
                    <span
                      aria-hidden
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/40 text-[16px] transition-transform duration-500 ${on ? "rotate-45" : ""}`}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[64ch] px-6 pb-6 text-[14px] leading-[1.8] text-ink-soft">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              </Rise>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
