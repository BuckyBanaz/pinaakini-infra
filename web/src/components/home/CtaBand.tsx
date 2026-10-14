"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Kicker, Rise, SplitHeading } from "./motion";
import { home } from "@/lib/home";
import { site } from "@/lib/site";
import { openVisit } from "@/lib/visit";

export default function CtaBand() {
  const { cta } = home;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.25, 1]);
  const inset = useTransform(scrollYProgress, [0, 0.45], reduce ? ["0%", "0%"] : ["6%", "0%"]);
  const clip = useTransform(inset, (v) => `inset(${v} ${v} ${v} ${v})`);

  return (
    <section ref={ref} id="visit" className="bg-ivory">
      <motion.div style={{ clipPath: clip }} className="relative flex min-h-[90svh] items-center overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Image src={cta.image} alt="" fill quality={90} sizes="100vw" className="object-cover" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-obsidian/60" />
        <div className="relative w-full px-[var(--margin)] py-24 text-center text-white">
          <Rise className="flex justify-center">
            <Kicker light>Site visits</Kicker>
          </Rise>
          <SplitHeading text={cta.heading} className="t-display mx-auto mt-8 max-w-[16ch] text-[clamp(2.8rem,1.6rem+5vw,6.5rem)]" />
          <Rise delay={0.2}>
            <p className="mx-auto mt-8 max-w-[46ch] text-[17px] font-light leading-[1.8] text-white/85">{cta.body}</p>
          </Rise>
          <Rise delay={0.3} className="mt-12 flex flex-wrap justify-center gap-3">
            <button onClick={() => openVisit()} className="btn btn-gold">
              Request a site visit
            </button>
            <a href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-line text-white">
              Chat on WhatsApp
            </a>
          </Rise>
        </div>
      </motion.div>
    </section>
  );
}
