"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Counter, Rise } from "@/components/home/motion";
import CtaCard from "@/components/lux/CtaCard";
import NumbersBand from "@/components/lux/NumbersBand";
import { PROJECTS } from "@/lib/projects";
import type { Project, ProjectCategory } from "@/types/project";

const CATS: ("All" | ProjectCategory)[] = ["All", "Villas", "Triplex Houses", "Layouts", "Farmlands"];
const STAGES = ["All stages", "Completed", "Sold Out", "Ongoing"] as const;
const ongoing = (p: Project) => p.status === "Now Selling" || p.status === "Coming Soon";
const ASPECTS = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[4/3]", "aspect-[4/5]", "aspect-[5/6]"];

export default function PortfolioGallery() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [stage, setStage] = useState<(typeof STAGES)[number]>("All stages");

  const list = useMemo(
    () =>
      PROJECTS.filter(
        (p) => (cat === "All" || p.category === cat) && (stage === "All stages" || (stage === "Ongoing" ? ongoing(p) : p.status === stage)),
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
      <section id="list" className="bg-white px-[var(--margin)] pt-24 md:pt-32">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <Rise>
            <h2 className="t-head">
              From first plot
              <br />
              to final handover
            </h2>
          </Rise>
          <Rise delay={0.1}>
            <p className="max-w-[44ch] text-[15px] leading-[1.8] text-ink-soft md:justify-self-end">
              Every project Pinaakini has developed across Nellore, delivered and in progress. Sample portfolio data, to be confirmed by the client.
            </p>
          </Rise>
        </div>
        <ul className="m-0 mt-12 grid list-none grid-cols-2 gap-4 p-0 md:grid-cols-4">
          {counts.map((c, i) => (
            <motion.li
              key={c.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className="rounded-full border border-ink/20 px-6 py-6 text-center"
            >
              <span className="block text-[2rem] font-normal leading-none">
                <Counter value={c.value} />
              </span>
              <span className="mt-2 block text-[12px] text-ink-soft">{c.label}</span>
            </motion.li>
          ))}
        </ul>

        <div className="sticky top-0 z-20 -mx-[var(--margin)] mt-14 flex flex-wrap items-center gap-3 bg-white/95 px-[var(--margin)] py-4 backdrop-blur-md">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`h-10 cursor-pointer rounded-full border px-4 text-[14px] transition-colors ${cat === c ? "border-ink bg-ink text-white" : "border-ink/20 hover:border-ink"}`}
            >
              {c}
            </button>
          ))}
          <span className="mx-1 hidden h-6 w-px bg-ink/15 md:block" />
          {STAGES.map((s) => (
            <button
              key={s}
              onClick={() => setStage(s)}
              aria-pressed={stage === s}
              className={`h-10 cursor-pointer rounded-full px-4 text-[14px] transition-colors ${stage === s ? "bg-sand text-ink" : "text-ink-soft hover:text-ink"}`}
            >
              {s}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-8 columns-1 gap-5 pb-24 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, delay: Math.min(i, 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group mb-5 break-inside-avoid"
              >
                <Tile p={p} aspect={ASPECTS[i % ASPECTS.length]} />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && <p className="pb-24 text-center text-[1.4rem] font-light">No projects match these filters.</p>}
      </section>

      <NumbersBand />

      <section className="bg-white px-[var(--margin)] py-28">
        <CtaCard heading="See the quality for yourself" text="We are happy to take you around completed layouts and homes, so you can see the roads, the finish and the neighbourhood before you decide." />
      </section>
    </>
  );
}

function Tile({ p, aspect }: { p: Project; aspect: string }) {
  const body = (
    <div className={`relative overflow-hidden rounded-2xl bg-stone ${aspect}`}>
      <Image
        src={p.featuredImage}
        alt={`${p.name}, ${p.location}`}
        fill
        quality={90}
        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        className="object-cover transition-transform duration-[1.4s] ease-(--ease-lux) group-hover:scale-[1.06]"
      />
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(0deg,rgba(0,0,0,.75),rgba(0,0,0,0))]" />
      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-medium text-ink">{p.status}</span>
      <div className="absolute inset-x-5 bottom-5 text-white">
        <p className="text-[12px] text-white/80">
          {p.category} · {p.location.split(",")[0]}
        </p>
        <h3 className="mt-1 text-[1.35rem] font-normal">{p.name.replace("Pinaakini ", "")}</h3>
        <p className="mt-1 max-h-0 overflow-hidden text-[13px] text-white/80 transition-all duration-500 group-hover:max-h-10">
          {p.extent} · {p.units}
        </p>
      </div>
    </div>
  );
  return p.isActive ? (
    <Link href={`/properties/${p.slug}`} className="block">
      {body}
    </Link>
  ) : (
    body
  );
}
