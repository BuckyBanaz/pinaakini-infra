"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { lux } from "@/lib/home";

// Dark band: a ghost wordmark stays behind while room cards float past at different speeds.
const SPOTS = [
  "left-[4%] top-[34%] w-[34vw] md:w-[24vw] aspect-[4/3]",
  "right-[6%] top-[10%] w-[30vw] md:w-[17vw] aspect-[3/4]",
  "left-[38%] top-[62%] w-[34vw] md:w-[21vw] aspect-[4/3]",
  "right-[4%] top-[70%] w-[30vw] md:w-[16vw] aspect-[3/4]",
];
const SPEED = [-180, -320, -120, -260];

export default function RoomsBand() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} aria-label="Inside the homes" className="relative overflow-hidden bg-obsidian px-[var(--margin)] pt-28 text-white">
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[36ch] text-center text-[clamp(1.4rem,1rem+1.6vw,2.3rem)] font-light leading-[1.4] text-white/90"
      >
        {lux.rooms.heading}
      </motion.p>

      <div className="relative mt-16 h-[150vh]">
        <div className="sticky top-[22vh] select-none text-center font-light uppercase leading-[0.9] text-white/[0.07]" aria-hidden>
          <span className="block text-[17vw]">Pinaakini</span>
          <span className="block text-[17vw]">Homes</span>
        </div>
        <p className="absolute left-0 top-[4%] max-w-[34ch] text-[14px] leading-[1.8] text-white/70">{lux.rooms.body}</p>
        {lux.rooms.cards.map((c, i) => (
          <Card key={c.label} c={c} i={i} p={scrollYProgress} still={!!reduce} />
        ))}
      </div>
    </section>
  );
}

function Card({ c, i, p, still }: { c: { label: string; image: string }; i: number; p: MotionValue<number>; still: boolean }) {
  const y = useTransform(p, [0, 1], still ? [0, 0] : [0, SPEED[i]]);
  return (
    <motion.figure style={{ y }} className={`absolute m-0 overflow-hidden rounded-2xl bg-white/5 ${SPOTS[i]}`}>
      <Image src={c.image} alt={c.label} fill quality={90} sizes="25vw" className="object-cover" />
      <figcaption className="absolute left-3 top-3 rounded-md bg-white/25 px-3 py-1 text-[11px] text-white backdrop-blur-md">{c.label}</figcaption>
    </motion.figure>
  );
}
