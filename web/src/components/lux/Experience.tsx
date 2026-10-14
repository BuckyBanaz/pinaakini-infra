"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { lux } from "@/lib/home";
import { openVisit } from "@/lib/visit";
import NumbersBand from "./NumbersBand";

const EASE = [0.22, 1, 0.36, 1] as const;

// Big uppercase lines with a small inline image that grows into a full picture,
// then the numbers band on black.
export default function Experience() {
  const { experience } = lux;
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const w = useTransform(scrollYProgress, [0, 0.6], reduce ? ["86vw", "86vw"] : ["10vw", "86vw"]);
  const h = useTransform(scrollYProgress, [0, 0.6], reduce ? ["44vh", "44vh"] : ["9vw", "74vh"]);
  const r = useTransform(scrollYProgress, [0, 0.6], [12, 24]);
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.35], [1, 0]);

  return (
    <section id="experience" aria-label="Why buy with us" className="bg-white">
      <div ref={ref} className="relative h-[220vh]">
        <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-end overflow-hidden px-[var(--margin)] pb-[8vh]">
          <motion.p style={{ opacity: textOpacity }} className="pointer-events-none absolute inset-x-[var(--margin)] top-[12vh] text-right text-[clamp(2.2rem,1rem+5.4vw,6.4rem)] font-normal uppercase leading-[1.05] tracking-[-0.02em]">
            {experience.words.map((wd, k) => (
              <span key={wd} className="block" style={{ paddingRight: k === 1 ? "0" : `${k * 6}vw` }}>
                {wd}
              </span>
            ))}
          </motion.p>
          <motion.div style={{ width: w, height: h, borderRadius: r }} className="relative z-10 overflow-hidden bg-stone">
            <Image src={experience.image} alt="Paddy fields and palms near Nellore" fill quality={90} sizes="86vw" className="object-cover" />
          </motion.div>
        </div>
      </div>

      <div className="px-[var(--margin)] pb-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="mx-auto max-w-[60ch] text-[15px] leading-[1.9] text-ink-soft"
        >
          {experience.body}
        </motion.p>
        <button onClick={() => openVisit()} className="btn btn-dark mt-8">
          Speak with an advisor
          <span className="btn-arrow">→</span>
        </button>
      </div>

      <NumbersBand />
    </section>
  );
}
