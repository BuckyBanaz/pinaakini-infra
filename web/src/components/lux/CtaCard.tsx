"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { lux } from "@/lib/home";
import { openVisit } from "@/lib/visit";

// The closing invitation: a rounded outlined card with two pill actions and a strip of photographs.
export default function CtaCard({
  heading = lux.cta.heading,
  text = lux.cta.text,
  images = lux.cta.images,
  project,
}: {
  heading?: string;
  text?: string;
  images?: string[];
  project?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-ink/15 px-6 py-14 text-center md:px-14 md:py-20"
    >
      <h2 className="mx-auto max-w-[18ch] text-[clamp(1.8rem,1.2rem+2vw,3rem)] font-normal leading-[1.15] tracking-[-0.02em]">{heading}</h2>
      <p className="mx-auto mt-5 max-w-[50ch] text-[14px] leading-[1.8] text-ink-soft">{text}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button onClick={() => openVisit(project)} className="btn btn-dark">
          Arrange a site visit
          <span className="btn-arrow">→</span>
        </button>
        <Link href="/contact" className="btn btn-line-dark">
          Contact our team
          <span className="btn-arrow">→</span>
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
        {images.slice(0, 4).map((src, i) => (
          <div key={src + i} className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-stone">
            <Image src={src} alt="" fill quality={85} sizes="(min-width:768px) 22vw, 45vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
