"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import PropertyCard, { isAvailable, type Offer } from "@/components/PropertyCard";
import { Kicker, Rise, SplitHeading } from "@/components/home/motion";
import { PROJECTS } from "@/lib/projects";
import { site } from "@/lib/site";
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
        (p) =>
          isAvailable(p, offer) &&
          (cat === "All" || p.category === cat) &&
          (offer === "Rent" || status === "Any status" || p.status === status),
      ),
    [offer, cat, status],
  );

  return (
    <>
      {/* filter bar */}
      <div className="sticky top-0 z-30 border-b border-ink/10 bg-ivory/95 px-[var(--margin)] py-4 backdrop-blur-md">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-6">
            <LayoutGroup id="offer-page">
              <div role="tablist" aria-label="Buy or rent" className="inline-flex border border-ink/15 p-1">
                {OFFERS.map((o) => (
                  <button
                    key={o}
                    role="tab"
                    aria-selected={offer === o}
                    onClick={() => setOffer(o)}
                    className={`relative h-10 min-w-24 cursor-pointer px-5 text-[12px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                      offer === o ? "text-white" : "text-ink hover:text-gold-deep"
                    }`}
                  >
                    {offer === o && <motion.span layoutId="offer-pill-page" className="absolute inset-0 bg-ink" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
                    <span className="relative">{o}</span>
                  </button>
                ))}
              </div>
            </LayoutGroup>
            <div className="flex flex-wrap gap-x-5">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  aria-pressed={cat === c}
                  className={`relative min-h-11 cursor-pointer text-[15px] transition-colors duration-300 ${cat === c ? "text-ink" : "text-ink-soft hover:text-ink"}`}
                >
                  {c}
                  {cat === c && <motion.span layoutId="cat-line-page" className="absolute inset-x-0 bottom-2 h-px bg-gold" />}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            {offer === "Buy" && (
              <label className="flex items-center gap-3 text-[14px] text-ink-soft">
                <span className="sr-only">Status</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as (typeof STATUSES)[number])}
                  className="h-10 cursor-pointer border border-ink/15 bg-transparent px-3 text-[14px] text-ink focus:border-ink focus:outline-none"
                >
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
            )}
            <p className="text-[14px] text-ink-soft" aria-live="polite">
              <span className="font-display text-2xl text-ink">{list.length}</span> {list.length === 1 ? "property" : "properties"}
            </p>
          </div>
        </div>
      </div>

      <section className="bg-ivory px-[var(--margin)] pb-28 pt-14">
        <motion.ul layout className="m-0 grid list-none gap-x-6 gap-y-16 p-0 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="bg-sand px-8 py-20 text-center">
            <p className="font-display text-4xl font-light">Nothing listed here right now.</p>
            <p className="mx-auto mt-4 max-w-[46ch] text-ink-soft">
              New {offer === "Rent" ? "rentals" : "properties"} open regularly. Tell us what you are looking for and we will call you first.
            </p>
            <button onClick={() => openVisit()} className="btn btn-dark mt-8">
              Register your interest
            </button>
          </div>
        )}
      </section>

      {/* help band */}
      <section className="grid bg-obsidian text-white md:grid-cols-2">
        <div className="px-[var(--margin)] py-20 md:py-28">
          <Rise>
            <Kicker light>Need help choosing?</Kicker>
          </Rise>
          <SplitHeading text="Speak to someone who knows the land" className="t-head mt-6 max-w-[14ch]" />
          <Rise delay={0.2}>
            <p className="mt-6 max-w-[44ch] text-[17px] font-light leading-[1.8] text-white/75">
              Tell us your budget, the area you like and when you want to move. We will shortlist properties and walk you through them on site.
            </p>
          </Rise>
          <Rise delay={0.3} className="mt-10 flex flex-wrap gap-3">
            <button onClick={() => openVisit()} className="btn btn-gold">
              Book a site visit
            </button>
            <a href={site.contact.phoneHref} className="btn btn-line text-white">
              Call {site.contact.phone}
            </a>
          </Rise>
        </div>
        <div className="grid grid-cols-2 gap-px bg-white/10">
          {[
            { k: "Villas", v: "Private homes with gardens and pools" },
            { k: "Triplex houses", v: "Three-level homes in gated communities" },
            { k: "Layouts", v: "Plots with roads, drainage and utilities" },
            { k: "Farmlands", v: "Managed farmland near the city" },
          ].map((x, i) => (
            <Rise key={x.k} delay={i * 0.08} className="bg-obsidian p-8 md:p-10">
              <p className="font-display text-[1.75rem] font-light">{x.k}</p>
              <p className="mt-3 text-[15px] font-light text-white/60">{x.v}</p>
            </Rise>
          ))}
        </div>
      </section>
    </>
  );
}
