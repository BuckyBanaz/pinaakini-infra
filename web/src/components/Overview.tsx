"use client";

import { useRef, useState, MouseEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { site } from "@/lib/site";
import { ShieldCheck, Compass, Sparkles } from "lucide-react";

export default function Overview() {
  const { overview, stats } = site;
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState("");

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setTilt(`perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const onMouseLeave = () => {
    setTilt("perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)");
  };

  return (
    <section id="overview" className="relative bg-ivory px-5 pb-24 pt-28 sm:px-8 md:pb-36 md:pt-40 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        
        {/* Eyebrow */}
        <Reveal>
          <div className="flex items-center gap-4 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-bronze">
            <span className="h-px w-10 bg-bronze/60" />
            <span>Pinaakini Signature Development</span>
          </div>
        </Reveal>

        {/* Headline & Narrative */}
        <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-10 items-start">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-[clamp(2.5rem,5.4vw,5.2rem)] font-bold leading-[1.02] tracking-[-0.03em] text-ink">
              An upgraded residence, composed for <span className="text-bronze">private pool</span> living.
            </h2>
          </Reveal>

          <div className="space-y-6 text-[1.02rem] leading-[1.8] text-ink-soft lg:col-span-4 lg:col-start-9 lg:pt-4">
            {overview.body.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Stats Strip */}
        <dl className="mt-20 grid grid-cols-1 border-y border-ink/12 sm:grid-cols-3 md:mt-28">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.12}
              className={`py-10 sm:px-8 sm:py-12 ${
                i > 0 ? "border-t border-ink/12 sm:border-l sm:border-t-0" : ""
              } ${i === 0 ? "sm:pl-0" : ""}`}
            >
              <dt className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-ink-soft font-mono">
                {s.label}
              </dt>
              <dd className="mt-4 font-display text-[clamp(2.8rem,5vw,4.6rem)] font-light leading-none text-ink">
                {s.value}
                {"unit" in s && s.unit ? (
                  <span className="ml-2 font-sans text-base font-normal tracking-wide text-ink-soft">
                    {s.unit}
                  </span>
                ) : null}
              </dd>
            </Reveal>
          ))}
        </dl>

        {/* 3D Depth Photography Grid */}
        <div className="mt-20 grid gap-8 md:mt-28 md:grid-cols-12 items-end">
          
          <Reveal className="md:col-span-8">
            <div
              ref={cardRef}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-sand shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group cursor-pointer border border-ink/10"
              style={{ transform: tilt }}
            >
              <Image
                src="/img/hero.webp"
                alt="Pinaakini Luxury Villa at dusk with illuminated pool"
                fill
                sizes="(min-width: 768px) 66vw, 100vw"
                className="object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 text-white text-xs tracking-wider uppercase font-mono">
                Perspective Elevation • South Facing Pool Terrace
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col justify-end md:col-span-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand shadow-lg group border border-ink/10">
              <Image
                src="/img/living.webp"
                alt="Open living room opening directly onto reflecting pool"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-[1.4s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
            <p className="mt-5 max-w-xs text-xs sm:text-sm leading-relaxed text-ink-soft">
              Living spaces extend straight onto the pool terrace, with unhindered flow between interior travertine and outdoor water.
            </p>
          </Reveal>

        </div>

      </div>
    </section>
  );
}
