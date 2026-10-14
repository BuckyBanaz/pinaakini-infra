"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Kicker, Rise, SplitHeading } from "./motion";
import { PROJECTS } from "@/lib/projects";
import { GEO, MAP, PROJECT_COORDS, project } from "@/lib/map";
import { openVisit } from "@/lib/visit";
import type { Project } from "@/types/project";

const EASE = [0.22, 1, 0.36, 1] as const;
type Filter = "All" | "Available" | "Delivered";
const FILTERS: Filter[] = ["All", "Available", "Delivered"];
const isAvail = (p: Project) => p.status === "Now Selling" || p.status === "Coming Soon";

const PINNED = PROJECTS.filter((p) => PROJECT_COORDS[p.slug]).map((p) => ({ p, xy: project(PROJECT_COORDS[p.slug]) }));

// Map-first explorer: every Pinaakini project placed around Nellore and the Penna river.
export default function ProjectMap() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("All");
  const [activeId, setActiveId] = useState(PINNED[0]?.p.id);
  const [hoverId, setHoverId] = useState<string | null>(null);

  const shown = useMemo(
    () => PINNED.filter(({ p }) => filter === "All" || (filter === "Available" ? isAvail(p) : !isAvail(p))),
    [filter],
  );
  const active = PINNED.find(({ p }) => p.id === activeId)?.p ?? shown[0]?.p;

  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true, margin: "0px 0px -10% 0px" },
          transition: { duration: 2.2, delay, ease: EASE },
        };

  return (
    <section id="map" className="bg-obsidian px-[var(--margin)] py-24 text-ivory md:py-32">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <Rise>
            <Kicker light>Explore by location</Kicker>
          </Rise>
          <SplitHeading text="At the heart of Nellore" className="t-head mt-6 max-w-[15ch]" />
        </div>
        <Rise delay={0.15} className="flex flex-col gap-4 lg:items-end">
          <p className="max-w-[40ch] text-[16px] font-light leading-[1.7] text-ivory/70">
            Villas, layouts and farmland along the Penna, the river our name comes from. Tap a pin to see the project.
          </p>
          <div role="tablist" aria-label="Filter projects" className="inline-flex rounded-full border border-ivory/20 p-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`relative h-10 cursor-pointer rounded-full px-5 text-[13px] font-medium transition-colors ${
                  filter === f ? "text-obsidian" : "text-ivory/80 hover:text-ivory"
                }`}
              >
                {filter === f && <motion.span layoutId="map-filter" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>
        </Rise>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-12">
        {/* map */}
        <div className="relative min-w-0 overflow-hidden rounded-2xl bg-night lg:col-span-8">
          <svg viewBox={`0 0 ${MAP.w} ${MAP.h}`} className="block h-auto w-full" role="img" aria-label="Map of Nellore showing Pinaakini projects">
            <defs>
              <pattern id="grain" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#ffffff" opacity="0.06" />
              </pattern>
            </defs>
            <rect width={MAP.w} height={MAP.h} fill="url(#grain)" />
            {/* sea */}
            <path d={`${GEO.coast} L${MAP.w} ${MAP.h} L${MAP.w} 0 Z`} fill="#1f1f1f" />
            <motion.path d={GEO.coast} fill="none" stroke="#8a8a8a" strokeWidth="1.5" strokeOpacity="0.6" {...draw(0.1)} />
            <text x={MAP.w - 18} y={MAP.h / 2} fill="#a3a3a3" fillOpacity="0.8" fontSize="13" letterSpacing="4" textAnchor="middle" transform={`rotate(90 ${MAP.w - 18} ${MAP.h / 2})`}>
              BAY OF BENGAL
            </text>
            {/* roads */}
            {GEO.roads.map((r, i) => (
              <motion.path key={r.name} d={r.d} fill="none" stroke="#F7F5EF" strokeOpacity="0.16" strokeWidth={r.name === "NH 16" ? 3 : 1.5} strokeLinecap="round" {...draw(0.3 + i * 0.1)} />
            ))}
            {/* river */}
            <motion.path d={GEO.river} fill="none" stroke="#6b6b6b" strokeWidth="7" strokeLinecap="round" strokeOpacity="0.55" {...draw(0.2)} />
            <motion.path d={GEO.river} fill="none" stroke="#e5e5e5" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" {...draw(0.4)} />
            <text x="40" y="300" fill="#d4d4d4" fillOpacity="0.85" fontSize="15" letterSpacing="3">
              PENNA · PINAKINI RIVER
            </text>
            {/* city */}
            <circle cx={GEO.city[0]} cy={GEO.city[1]} r="46" fill="#F7F5EF" fillOpacity="0.05" />
            <text x={GEO.city[0] + 24} y={GEO.city[1] - 52} fill="#F7F5EF" fillOpacity="0.85" fontSize="22" fontFamily="var(--font-display)">
              Nellore
            </text>

            {/* pins */}
            {PINNED.map(({ p, xy: [x, y] }, i) => {
              const visible = shown.some((s) => s.p.id === p.id);
              const on = p.id === active?.id;
              const hot = p.id === hoverId;
              const color = isAvail(p) ? "#ffffff" : "#7a7a7a";
              return (
                <motion.g
                  key={p.id}
                  initial={{ opacity: 0, scale: reduce ? 1 : 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: reduce ? 0 : 1 + i * 0.06, ease: EASE }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                >
                <g
                  style={{ opacity: visible ? 1 : 0.12, transition: "opacity .4s", cursor: visible ? "pointer" : "default" }}
                  onClick={() => visible && setActiveId(p.id)}
                  onMouseEnter={() => setHoverId(p.id)}
                  onMouseLeave={() => setHoverId(null)}
                  role="button"
                  tabIndex={visible ? 0 : -1}
                  aria-label={`${p.name}, ${p.status}`}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && visible && setActiveId(p.id)}
                >
                  {on && !reduce && (
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="14"
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      initial={{ r: 14, opacity: 0.9 }}
                      animate={{ r: 36, opacity: 0 }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <circle cx={x} cy={y} r={on || hot ? 13 : 9} fill={color} stroke="#0a0a0a" strokeWidth="3" style={{ transition: "r .3s" }} />
                  {(on || hot) && (
                    <g pointerEvents="none">
                      <rect x={x + 18} y={y - 17} width={p.name.replace("Pinaakini ", "").length * 9.5 + 22} height="32" rx="6" fill="#ffffff" />
                      <text x={x + 29} y={y + 5} fill="#111111" fontSize="15" fontWeight="500">
                        {p.name.replace("Pinaakini ", "")}
                      </text>
                    </g>
                  )}
                </g>
                </motion.g>
              );
            })}
          </svg>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ivory/10 px-5 py-4 text-[13px] text-ivory/70">
            <span className="flex items-center gap-2">
              <i className="h-3 w-3 rounded-full bg-white" /> Selling or coming soon
            </span>
            <span className="flex items-center gap-2">
              <i className="h-3 w-3 rounded-full bg-[#7a7a7a]" /> Completed or sold out
            </span>
            <span className="ml-auto">Pin positions are approximate.</span>
          </div>
        </div>

        {/* detail + list */}
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-4">
          <div className="relative min-h-[420px] overflow-hidden rounded-2xl bg-ivory text-ink">
            <AnimatePresence mode="wait">
              {active && (
                <motion.article
                  key={active.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <motion.div initial={{ scale: reduce ? 1 : 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: EASE }} className="absolute inset-0">
                      <Image src={active.featuredImage} alt={`${active.name}, ${active.location}`} fill quality={90} sizes="(min-width:1024px) 30vw, 100vw" className="object-cover" />
                    </motion.div>
                    <span className="t-kicker absolute left-4 top-4 bg-ivory px-3 py-2 text-[10px]">{active.status}</span>
                  </div>
                  <div className="p-6">
                    <p className="t-kicker text-[10px] text-gold-deep">
                      {active.category} · {active.location.split(",")[0]}
                    </p>
                    <h3 className="mt-3 font-display text-[1.9rem] leading-[1.05]">{active.name}</h3>
                    <p className="mt-2 text-[15px] font-light text-ink-soft">
                      {active.extent} · {active.units}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link href={active.isActive ? `/properties/${active.slug}` : "/portfolio"} className="btn btn-dark h-11 px-5 text-[11px]">
                        {active.isActive ? "View property" : "See portfolio"}
                      </Link>
                      {isAvail(active) && (
                        <button onClick={() => openVisit(active.name)} className="btn btn-line-dark h-11 px-5 text-[11px]">
                          Book a visit
                        </button>
                      )}
                    </div>
                  </div>
                </motion.article>
              )}
            </AnimatePresence>
          </div>

          <ul className="no-scrollbar m-0 flex list-none gap-2 overflow-x-auto p-0 lg:max-h-[260px] lg:flex-col lg:overflow-y-auto" data-lenis-prevent>
            {shown.map(({ p }) => (
              <li key={p.id} className="shrink-0">
                <button
                  onClick={() => setActiveId(p.id)}
                  onMouseEnter={() => setHoverId(p.id)}
                  onMouseLeave={() => setHoverId(null)}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-left text-[14px] transition-colors ${
                    p.id === active?.id ? "border-white bg-white/10 text-ivory" : "border-ivory/10 text-ivory/75 hover:border-ivory/30 hover:text-ivory"
                  }`}
                >
                  <i className={`h-2.5 w-2.5 shrink-0 rounded-full ${isAvail(p) ? "bg-white" : "bg-[#7a7a7a]"}`} />
                  <span className="whitespace-nowrap">{p.name.replace("Pinaakini ", "")}</span>
                  <span className="ml-auto hidden whitespace-nowrap text-[12px] text-ivory/50 lg:inline">{p.category}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
