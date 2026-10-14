"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { Rise } from "@/components/home/motion";
import { isAvailable, type Offer } from "@/components/PropertyCard";
import { PROJECTS } from "@/lib/projects";
import { lux } from "@/lib/home";
import { openVisit } from "@/lib/visit";
import type { Project } from "@/types/project";

const EASE = [0.22, 1, 0.36, 1] as const;

// The collection: numbered full-screen panels that stack as you scroll (Buy / Rent),
// followed by a moving row of document downloads.
export default function Collection() {
  const [offer, setOffer] = useState<Offer>("Buy");
  const list = useMemo(() => PROJECTS.filter((p) => isAvailable(p, offer)).slice(0, 5), [offer]);

  return (
    <section id="collection" className="bg-white">
      <div className="flex flex-col justify-between gap-6 px-[var(--margin)] pb-12 pt-24 md:flex-row md:items-end md:pt-32">
        <Rise>
          <h2 className="t-head">The collection</h2>
          <p className="mt-4 max-w-[44ch] text-[15px] leading-[1.8] text-ink-soft">
            Homes and land across Nellore, available to buy or rent today.
          </p>
        </Rise>
        <LayoutGroup id="coll-offer">
          <div role="tablist" aria-label="Buy or rent" className="inline-flex self-start rounded-full border border-ink/20 p-1 md:self-auto">
            {(["Buy", "Rent"] as Offer[]).map((o) => (
              <button
                key={o}
                role="tab"
                aria-selected={offer === o}
                onClick={() => setOffer(o)}
                className={`relative h-10 min-w-24 cursor-pointer rounded-full px-6 text-[14px] font-medium transition-colors ${offer === o ? "text-white" : "text-ink"}`}
              >
                {offer === o && <motion.span layoutId="coll-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
                <span className="relative">{o === "Buy" ? "To buy" : "To rent"}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>

      <div key={offer}>
        {list.map((p, i) => (
          <Panel key={p.id} p={p} i={i} offer={offer} />
        ))}
        {list.length === 0 && <p className="px-[var(--margin)] py-20 text-ink-soft">Nothing listed right now. Ask us about upcoming {offer === "Rent" ? "rentals" : "launches"}.</p>}
      </div>

      <Downloads />
    </section>
  );
}

function Panel({ p, i, offer }: { p: Project; i: number; offer: Offer }) {
  const reduce = useReducedMotion();
  const flip = i % 2 === 1;
  const href = p.isActive ? `/properties/${p.slug}` : "/portfolio";
  const thumbs = p.gallery.slice(0, 4);
  const specs = [
    { v: p.extent, k: "Extent" },
    { v: p.units, k: "Units" },
    { v: p.category, k: "Type" },
    { v: offer === "Rent" ? "On request" : p.priceGuide ?? "On request", k: offer === "Rent" ? "Rent" : "Price" },
  ];
  return (
    <article className="top-0 grid min-h-[100svh] bg-sand md:sticky md:grid-cols-2" style={{ zIndex: i + 1 }}>
      <div className={`relative min-h-[50svh] overflow-hidden ${flip ? "md:order-2" : ""}`}>
        <motion.div
          initial={{ scale: reduce ? 1 : 1.2 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.6, ease: EASE }}
          className="absolute inset-0"
        >
          <Image src={p.featuredImage} alt={`${p.name}, ${p.location}`} fill quality={90} sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
        </motion.div>
      </div>
      <div className="flex flex-col justify-between gap-10 px-[var(--margin)] py-14 md:px-14 md:py-16">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-[clamp(3rem,2rem+3vw,4.5rem)] font-light leading-none"
          >
            {String(i + 1).padStart(2, "0")}
          </motion.p>
          <h3 className="mt-6 text-[clamp(1.7rem,1.2rem+1.4vw,2.4rem)] font-normal tracking-[-0.02em]">{p.name.replace("Pinaakini ", "")}</h3>
          <p className="mt-4 max-w-[52ch] text-[14px] leading-[1.8] text-ink-soft">{p.shortDescription}</p>
          <dl className="mt-10 grid grid-cols-2 gap-y-6 sm:grid-cols-4">
            {specs.map((s, k) => (
              <div key={s.k} className={`pr-4 ${k > 0 ? "sm:border-l sm:border-ink/15 sm:pl-4" : ""}`}>
                <dd className="m-0 text-[15px] font-medium">{s.v}</dd>
                <dt className="mt-1 text-[12px] text-ink-soft">{s.k}</dt>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <div className="flex gap-3">
            {thumbs.map((t, k) => (
              <div key={t + k} className="relative h-16 w-16 overflow-hidden rounded-md bg-stone md:h-20 md:w-20">
                <Image src={t} alt="" fill sizes="80px" className="object-cover transition-transform duration-500 hover:scale-110" />
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={href} className="btn btn-dark">
              {p.isActive ? "View property" : "See in portfolio"}
              <span className="btn-arrow">→</span>
            </Link>
            <button onClick={() => openVisit(p.name)} className="btn btn-line-dark">
              Book a visit
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function Downloads() {
  const reduce = useReducedMotion();
  const row = [...lux.downloads, ...lux.downloads];
  return (
    <div className="relative z-20 overflow-hidden bg-white py-16">
      <motion.ul
        className="m-0 flex w-max list-none gap-4 p-0"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {row.map((d, k) => (
          <li key={k}>
            <button
              onClick={() => openVisit(d.replace("Download ", "").replace("Request ", "") + " request")}
              className="h-14 cursor-pointer rounded-full border border-ink/25 px-10 text-[14px] transition-colors hover:bg-ink hover:text-white"
            >
              {d}
            </button>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
