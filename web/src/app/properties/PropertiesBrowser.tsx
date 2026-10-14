"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import PropertyCard, { isAvailable, type Offer } from "@/components/PropertyCard";
import CtaCard from "@/components/lux/CtaCard";
import { Rise } from "@/components/home/motion";
import { PROJECTS } from "@/lib/projects";
import { lux } from "@/lib/home";
import { openVisit } from "@/lib/visit";
import type { ProjectCategory } from "@/types/project";

const OFFERS: Offer[] = ["Buy", "Rent"];
const CATS: ("All" | ProjectCategory)[] = ["All", "Villas", "Triplex Houses", "Layouts", "Farmlands"];
const STATUSES = ["Any status", "Now Selling", "Coming Soon"] as const;

export default function PropertiesBrowser() {
  const [offer, setOffer] = useState<Offer>("Buy");
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("Any status");

  // Deep links: /properties?category=Villas&offer=Rent
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const c = q.get("category");
    const o = q.get("offer");
    const id = requestAnimationFrame(() => {
      if (c && (CATS as string[]).includes(c)) setCat(c as (typeof CATS)[number]);
      if (o === "Rent" || o === "Buy") setOffer(o);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const list = useMemo(
    () =>
      PROJECTS.filter(
        (p) => isAvailable(p, offer) && (cat === "All" || p.category === cat) && (offer === "Rent" || status === "Any status" || p.status === status),
      ),
    [offer, cat, status],
  );

  return (
    <div id="list" className="bg-white">
      <section className="px-[var(--margin)] pt-24 md:pt-32">
        <div className="grid gap-8 md:grid-cols-2 md:items-end">
          <Rise>
            <h2 className="t-head">
              Homes and land,
              <br />
              ready for you
            </h2>
          </Rise>
          <Rise delay={0.1}>
            <p className="max-w-[44ch] text-[15px] leading-[1.8] text-ink-soft md:justify-self-end">
              Filter by how you want to own it and what kind of property you are looking for. Every listing can be visited with our team.
            </p>
          </Rise>
        </div>

        <div className="sticky top-0 z-20 -mx-[var(--margin)] mt-12 bg-white/95 px-[var(--margin)] py-4 backdrop-blur-md">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <LayoutGroup id="props-offer">
                <div role="tablist" aria-label="Buy or rent" className="inline-flex rounded-full border border-ink/20 p-1">
                  {OFFERS.map((o) => (
                    <button
                      key={o}
                      role="tab"
                      aria-selected={offer === o}
                      onClick={() => setOffer(o)}
                      className={`relative h-10 min-w-24 cursor-pointer rounded-full px-5 text-[14px] font-medium transition-colors ${offer === o ? "text-white" : "text-ink"}`}
                    >
                      {offer === o && <motion.span layoutId="props-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
                      <span className="relative">{o === "Buy" ? "To buy" : "To rent"}</span>
                    </button>
                  ))}
                </div>
              </LayoutGroup>
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  aria-pressed={cat === c}
                  className={`h-10 cursor-pointer rounded-full border px-4 text-[14px] transition-colors ${
                    cat === c ? "border-ink bg-ink text-white" : "border-ink/20 text-ink hover:border-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              {offer === "Buy" && (
                <label className="text-[14px]">
                  <span className="sr-only">Status</span>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as (typeof STATUSES)[number])}
                    className="h-10 cursor-pointer rounded-full border border-ink/20 bg-white px-4 text-[14px] focus:border-ink focus:outline-none"
                  >
                    {STATUSES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
              )}
              <p className="text-[14px] text-ink-soft" aria-live="polite">
                <span className="text-[1.4rem] text-ink">{list.length}</span> {list.length === 1 ? "property" : "properties"}
              </p>
            </div>
          </div>
        </div>

        <motion.ul layout className="m-0 mt-10 grid list-none gap-x-6 gap-y-16 p-0 pb-24 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.li
                key={`${offer}-${p.id}`}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.7, delay: Math.min(i, 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <PropertyCard p={p} offer={offer} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {list.length === 0 && (
          <div className="mb-24 rounded-3xl bg-sand px-8 py-20 text-center">
            <p className="text-[1.8rem] font-light">Nothing listed here right now.</p>
            <p className="mx-auto mt-3 max-w-[46ch] text-[14px] text-ink-soft">
              New {offer === "Rent" ? "rentals" : "properties"} open regularly. Tell us what you are looking for and we will call you first.
            </p>
            <button onClick={() => openVisit()} className="btn btn-dark mt-8">
              Register your interest <span className="btn-arrow">→</span>
            </button>
          </div>
        )}
      </section>

      <DownloadsRow />

      <section className="px-[var(--margin)] pb-28 pt-8">
        <CtaCard />
      </section>
    </div>
  );
}

function DownloadsRow() {
  return (
    <div className="overflow-hidden bg-sand py-14">
      <motion.ul className="m-0 flex w-max list-none gap-4 p-0" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, ease: "linear", repeat: Infinity }}>
        {[...lux.downloads, ...lux.downloads].map((d, k) => (
          <li key={k}>
            <button onClick={() => openVisit(d.replace("Download ", "") + " request")} className="h-14 cursor-pointer rounded-full border border-ink/25 bg-white px-10 text-[14px] transition-colors hover:bg-ink hover:text-white">
              {d}
            </button>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
