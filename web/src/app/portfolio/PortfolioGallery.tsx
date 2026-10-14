"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Counter, Kicker, Rise, SplitHeading } from "@/components/home/motion";
import { PROJECTS } from "@/lib/projects";
import { openVisit } from "@/lib/visit";
import type { Project, ProjectCategory } from "@/types/project";

const CATS: ("All" | ProjectCategory)[] = ["All", "Villas", "Triplex Houses", "Layouts", "Farmlands"];
const STAGES = ["All", "Completed", "Sold Out", "Ongoing"] as const;
const ongoing = (p: Project) => p.status === "Now Selling" || p.status === "Coming Soon";
const ASPECTS = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[4/3]", "aspect-[4/5]", "aspect-[5/6]"];

export default function PortfolioGallery() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [stage, setStage] = useState<(typeof STAGES)[number]>("All");

  const list = useMemo(
    () =>
      PROJECTS.filter(
        (p) =>
          (cat === "All" || p.category === cat) &&
          (stage === "All" || (stage === "Ongoing" ? ongoing(p) : p.status === stage)),
      ),
    [cat, stage],
  );

  const counts = [
    { value: PROJECTS.length, label: "Developments" },
    { value: PROJECTS.filter((p) => p.status === "Completed").length, label: "Completed" },
    { value: PROJECTS.filter((p) => p.status === "Sold Out").length, label: "Sold out" },
    { value: PROJECTS.filter(ongoing).length, label: "Selling or upcoming" },
  ];

  return (
    <>
      <section className="bg-ivory px-[var(--margin)] pt-20 md:pt-28">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Rise>
              <Kicker>Across Nellore</Kicker>
            </Rise>
            <SplitHeading text="Every project, from first plot to final handover" className="t-head mt-6 max-w-[16ch]" />
          </div>
          <dl className="grid grid-cols-2 gap-y-10 self-end md:col-span-5 md:col-start-8">
            {counts.map((c, i) => (
              <Rise key={c.label} delay={i * 0.08}>
                <dd className="m-0 font-display text-[3.5rem] font-light leading-none">
                  <Counter value={c.value} />
                </dd>
                <dt className="t-kicker mt-3 text-[10px] text-ink-soft">{c.label}</dt>
              </Rise>
            ))}
          </dl>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-y border-ink/10 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-6">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={`relative min-h-11 cursor-pointer text-[15px] transition-colors ${cat === c ? "text-ink" : "text-ink-soft hover:text-ink"}`}
              >
                {c}
                {cat === c && <motion.span layoutId="pf-cat" className="absolute inset-x-0 bottom-2 h-px bg-gold" />}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {STAGES.map((s) => (
              <button
                key={s}
                onClick={() => setStage(s)}
                aria-pressed={stage === s}
                className={`t-kicker h-10 cursor-pointer border px-4 text-[10px] transition-colors ${
                  stage === s ? "border-ink bg-ink text-white" : "border-ink/15 text-ink hover:border-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory px-[var(--margin)] pb-28 pt-14">
        <motion.div layout className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, delay: Math.min(i, 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group mb-14 break-inside-avoid"
              >
                <Tile p={p} aspect={ASPECTS[i % ASPECTS.length]} />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && <p className="py-20 text-center font-display text-3xl font-light">No projects match these filters.</p>}
      </section>

      <section className="bg-sand px-[var(--margin)] py-24 text-center md:py-32">
        <Rise className="flex justify-center">
          <Kicker>Visit a delivered community</Kicker>
        </Rise>
        <SplitHeading text="See the quality for yourself" className="t-display mx-auto mt-8 max-w-[14ch] text-[clamp(2.8rem,1.6rem+4.4vw,6rem)]" />
        <Rise delay={0.2}>
          <p className="mx-auto mt-6 max-w-[48ch] text-[17px] font-light leading-[1.8] text-ink-soft">
            We are happy to take you around completed layouts and homes, so you can see the roads, the finish and the neighbourhood before you decide.
          </p>
        </Rise>
        <Rise delay={0.3} className="mt-10 flex justify-center">
          <button onClick={() => openVisit()} className="btn btn-dark">
            Arrange a visit
          </button>
        </Rise>
      </section>
    </>
  );
}

function Tile({ p, aspect }: { p: Project; aspect: string }) {
  const body = (
    <>
      <div className={`relative overflow-hidden bg-stone ${aspect}`}>
        <Image
          src={p.featuredImage}
          alt={`${p.name}, ${p.location}`}
          fill
          quality={90}
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.4s] ease-(--ease-lux) group-hover:scale-[1.06]"
        />
        <span aria-hidden className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/25" />
        <span className="t-kicker absolute left-4 top-4 bg-paper px-3 py-2 text-[10px] text-ink">{p.status}</span>
        {p.isActive && (
          <span className="t-kicker absolute bottom-4 right-4 translate-y-3 bg-gold px-4 py-2.5 text-[10px] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            View →
          </span>
        )}
      </div>
      <p className="t-kicker mt-5 text-[10px] text-gold-deep">
        {p.category} · {p.location.split(",")[0]}
      </p>
      <h3 className="mt-2 font-display text-[1.9rem] font-normal leading-tight transition-colors group-hover:text-gold-deep">{p.name}</h3>
      <p className="mt-1 text-[15px] font-light text-ink-soft">
        {p.extent} · {p.units}
      </p>
    </>
  );
  return p.isActive ? (
    <Link href={`/properties/${p.slug}`} className="block">
      {body}
    </Link>
  ) : (
    body
  );
}
