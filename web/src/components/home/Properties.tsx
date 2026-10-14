"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Kicker, Rise, SplitHeading } from "./motion";
import { PROJECTS } from "@/lib/projects";
import { openVisit } from "@/lib/visit";
import type { ProjectCategory } from "@/types/project";
import PropertyCard, { isAvailable, type Offer } from "@/components/PropertyCard";

const OFFERS: Offer[] = ["Buy", "Rent"];
const CATS: ("All" | ProjectCategory)[] = ["All", "Villas", "Triplex Houses", "Layouts", "Farmlands"];


export default function Properties() {
  const [offer, setOffer] = useState<Offer>("Buy");
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");

  const list = useMemo(
    () => PROJECTS.filter((p) => isAvailable(p, offer) && (cat === "All" || p.category === cat)),
    [offer, cat],
  );

  return (
    <section id="properties" className="bg-paper px-[var(--margin)] py-24 md:py-36">
      <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
        <div>
          <Rise>
            <Kicker>Available properties</Kicker>
          </Rise>
          <SplitHeading text="Homes and land, ready for you" className="t-head mt-6 max-w-[14ch]" />
        </div>

        <Rise delay={0.15} className="flex flex-col gap-5 lg:items-end">
          {/* Buy / Rent */}
          <LayoutGroup id="offer">
            <div role="tablist" aria-label="Buy or rent" className="inline-flex border border-ink/15 p-1">
              {OFFERS.map((o) => (
                <button
                  key={o}
                  role="tab"
                  aria-selected={offer === o}
                  onClick={() => setOffer(o)}
                  className={`relative h-11 min-w-28 cursor-pointer px-6 text-[13px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                    offer === o ? "text-white" : "text-ink hover:text-gold-deep"
                  }`}
                >
                  {offer === o && <motion.span layoutId="offer-pill" className="absolute inset-0 bg-ink" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
                  <span className="relative">{o}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>

          {/* category */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={`relative min-h-11 cursor-pointer text-[15px] transition-colors duration-300 ${
                  cat === c ? "text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {c}
                {cat === c && <motion.span layoutId="cat-line" className="absolute inset-x-0 bottom-2 h-px bg-gold" />}
              </button>
            ))}
          </div>
        </Rise>
      </div>

      <motion.ul layout className="m-0 mt-14 grid list-none gap-x-6 gap-y-14 p-0 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.li
              key={`${offer}-${p.id}`}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <PropertyCard p={p} offer={offer} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {list.length === 0 && (
        <div className="mt-14 bg-sand px-8 py-16 text-center">
          <p className="font-display text-3xl font-light">Nothing listed here right now.</p>
          <p className="mt-3 text-ink-soft">
            New {offer === "Rent" ? "rentals" : "properties"} open regularly. Tell us what you need and we will call you first.
          </p>
          <button onClick={() => openVisit()} className="btn btn-dark mt-8">
            Register your interest
          </button>
        </div>
      )}

      <Rise className="mt-16 flex justify-center">
        <Link href="/properties" className="btn btn-line-dark">
          View all properties <span aria-hidden>→</span>
        </Link>
      </Rise>
    </section>
  );
}
