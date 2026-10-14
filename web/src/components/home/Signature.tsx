"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Kicker, Rise, SplitHeading } from "./motion";
import { home } from "@/lib/home";

// Layered photographs moving at different speeds around a centred statement.
export default function Signature() {
  const { signature } = home;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const k = reduce ? 0 : 1;
  const y1 = useTransform(scrollYProgress, [0, 1], [120 * k, -160 * k]);
  const y2 = useTransform(scrollYProgress, [0, 1], [220 * k, -260 * k]);
  const y3 = useTransform(scrollYProgress, [0, 1], [60 * k, -90 * k]);
  const rot = useTransform(scrollYProgress, [0, 1], [-3 * k, 3 * k]);

  return (
    <section ref={ref} aria-label={signature.heading} className="relative overflow-hidden bg-sand px-[var(--margin)] py-32 md:py-48">
      <motion.div style={{ y: y1 }} className="absolute left-[4%] top-[8%] hidden aspect-[3/4] w-[22vw] overflow-hidden md:block">
        <Image src={signature.images[0]} alt="" fill quality={90} sizes="22vw" className="object-cover" />
      </motion.div>
      <motion.div style={{ y: y2, rotate: rot }} className="absolute right-[5%] top-[18%] hidden aspect-square w-[18vw] overflow-hidden md:block">
        <Image src={signature.images[1]} alt="" fill quality={90} sizes="18vw" className="object-cover" />
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute bottom-[-6%] left-[30%] hidden aspect-[16/10] w-[16vw] overflow-hidden md:block">
        <Image src={signature.images[2]} alt="" fill quality={90} sizes="16vw" className="object-cover" />
      </motion.div>

      <div className="relative mx-auto flex max-w-[760px] flex-col items-center text-center">
        <Rise>
          <Kicker>{signature.kicker}</Kicker>
        </Rise>
        <SplitHeading text={signature.heading} className="t-display mt-8 text-[clamp(3rem,1.8rem+5vw,7rem)]" />
        <Rise delay={0.25}>
          <p className="mx-auto mt-10 max-w-[52ch] text-[18px] font-light leading-[1.8] text-ink-soft">{signature.body}</p>
        </Rise>
        <div className="mt-14 grid w-full grid-cols-2 gap-3 md:hidden">
          {signature.images.slice(0, 2).map((s) => (
            <div key={s} className="relative aspect-[3/4] overflow-hidden">
              <Image src={s} alt="" fill quality={90} sizes="50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
