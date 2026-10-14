"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EnquiryForm from "@/components/EnquiryForm";
import PropertyCard from "@/components/PropertyCard";
import CtaCard from "@/components/lux/CtaCard";
import { Rise } from "@/components/home/motion";
import { site } from "@/lib/site";
import { openVisit } from "@/lib/visit";
import type { Project } from "@/types/project";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProjectDetail({ project: p, related }: { project: Project; related: Project[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const soldOut = p.status === "Sold Out";
  const gallery = p.gallery.length ? p.gallery : [p.featuredImage];
  const wa = `${site.contact.whatsappHref}?text=${encodeURIComponent(`Hello Pinaakini Infra, I would like details about ${p.name}.`)}`;
  const glance = [
    { v: p.extent, k: "Extent" },
    { v: p.units, k: "Units" },
    { v: p.category, k: "Type" },
    { v: soldOut ? "Sold out" : p.priceGuide ?? "On request", k: "Price" },
  ];

  return (
    <>
      {/* hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-obsidian text-white">
        <motion.div initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2, ease: EASE }} className="absolute inset-0">
          <Image src={p.featuredImage} alt={`${p.name}, ${p.location}`} fill priority quality={90} sizes="100vw" className="object-cover" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,.75)_0%,rgba(0,0,0,.1)_60%,rgba(0,0,0,.35)_100%)]" />
        <nav aria-label="Breadcrumb" className="absolute left-[var(--margin)] top-[104px] flex gap-3 text-[13px] text-white/80">
          <Link href="/" className="hover:text-white">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/properties" className="hover:text-white">Properties</Link>
          <span aria-hidden>/</span>
          <span aria-current="page" className="text-white">{p.name.replace("Pinaakini ", "")}</span>
        </nav>
        <div className="relative w-full px-[var(--margin)] pb-12 md:pb-16">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: EASE }} className="text-[13px] uppercase tracking-[0.24em] text-white/80">
            {p.status} · {p.location}
          </motion.p>
          <h1 className="mt-4 overflow-hidden font-display text-[clamp(2.6rem,1.2rem+5.6vw,7rem)] font-light uppercase leading-[0.95] tracking-[-0.02em]">
            <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1.2, delay: 0.3, ease: EASE }}>
              {p.name.replace("Pinaakini ", "")}
            </motion.span>
          </h1>
          <ul className="m-0 mt-10 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-4">
            {glance.map((g, i) => (
              <motion.li
                key={g.k}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6 + i * 0.08, ease: EASE }}
                className="rounded-2xl border border-white/25 bg-white/10 px-5 py-5 backdrop-blur-md"
              >
                <span className="block text-[clamp(1.05rem,0.9rem+0.6vw,1.5rem)]">{g.v}</span>
                <span className="mt-1 block text-[12px] text-white/75">{g.k}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* overview + enquiry */}
      <section className="grid gap-14 bg-white px-[var(--margin)] py-24 lg:grid-cols-[1.2fr_1fr] lg:gap-16 md:py-32">
        <div>
          <Rise>
            <h2 className="t-head">{p.tagline}</h2>
          </Rise>
          {p.description.map((d, i) => (
            <Rise key={i} delay={0.08 * i}>
              <p className="mt-6 max-w-[62ch] text-[15px] leading-[1.9] text-ink-soft">{d}</p>
            </Rise>
          ))}
          <div className="mt-10 flex flex-wrap gap-3">
            {!soldOut && (
              <button onClick={() => openVisit(p.name)} className="btn btn-dark">
                Book a site visit <span className="btn-arrow">→</span>
              </button>
            )}
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-line-dark">
              WhatsApp <span className="btn-arrow">→</span>
            </a>
            <a href={site.contact.phoneHref} className="btn btn-line-dark">
              Call {site.contact.phone}
            </a>
          </div>

          {/* highlights */}
          {p.keyHighlights.length > 0 && (
            <ul className="m-0 mt-16 grid list-none gap-3 p-0 sm:grid-cols-2">
              {p.keyHighlights.map((h, i) => (
                <motion.li
                  key={h.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.06, ease: EASE }}
                  className="rounded-2xl bg-sand p-6"
                >
                  <p className="text-[1.05rem] font-medium">{h.title}</p>
                  <p className="mt-2 text-[14px] leading-[1.7] text-ink-soft">{h.description}</p>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <EnquiryForm project={soldOut ? "General Enquiry" : p.name} title={soldOut ? "Ask about similar projects" : "Enquire about this property"} />
        </div>
      </section>

      {/* gallery */}
      <section aria-label="Gallery" className="bg-white px-[var(--margin)] pb-24">
        <Rise>
          <h2 className="t-head">Gallery</h2>
        </Rise>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
          {gallery.slice(0, 7).map((src, i) => (
            <motion.button
              key={src + i}
              onClick={() => setLightbox(i)}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: EASE }}
              aria-label={`Open photo ${i + 1}`}
              className={`group relative cursor-zoom-in overflow-hidden rounded-2xl bg-stone ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-[4/3]"}`}
            >
              <Image src={src} alt={`${p.name} photo ${i + 1}`} fill quality={90} sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
            </motion.button>
          ))}
        </div>
      </section>

      {/* specifications + location */}
      <section className="grid gap-14 bg-sand px-[var(--margin)] py-24 lg:grid-cols-2 md:py-32">
        <div>
          <Rise>
            <h2 className="t-head">Specifications</h2>
          </Rise>
          <dl className="mt-10">
            {p.specifications.map((s) => (
              <div key={s.label} className="flex justify-between gap-6 border-b border-ink/15 py-4 text-[14px]">
                <dt className="text-ink-soft">{s.label}</dt>
                <dd className="m-0 text-right font-medium">{s.value}</dd>
              </div>
            ))}
            {p.clearance && (
              <div className="flex justify-between gap-6 border-b border-ink/15 py-4 text-[14px]">
                <dt className="text-ink-soft">Approvals</dt>
                <dd className="m-0 text-right font-medium">{p.clearance}</dd>
              </div>
            )}
          </dl>
          <p className="mt-4 text-[12px] text-ink-soft">Details to be confirmed against the approved plan and sale documents.</p>
        </div>
        <div>
          <Rise>
            <h2 className="t-head">Location</h2>
            <p className="mt-4 text-[15px] leading-[1.8] text-ink-soft">{p.location}</p>
          </Rise>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={p.mapExternalUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark"
            >
              Open in Google Maps <span className="btn-arrow">↗</span>
            </a>
            <button onClick={() => openVisit(`${p.name} brochure`)} className="btn btn-line-dark">
              Request brochure
            </button>
          </div>
          {p.mapEmbedUrl && (
            <div className="mt-8 overflow-hidden rounded-2xl">
              <iframe title={`${p.name} on the map`} src={p.mapEmbedUrl} loading="lazy" className="h-[360px] w-full border-0 grayscale" />
            </div>
          )}
        </div>
      </section>

      {/* related */}
      {related.length > 0 && (
        <section aria-label="More properties" className="bg-white px-[var(--margin)] py-24 md:py-32">
          <Rise>
            <h2 className="t-head">You may also like</h2>
          </Rise>
          <ul className="m-0 mt-12 grid list-none gap-x-6 gap-y-14 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.id}>
                <PropertyCard p={r} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="bg-white px-[var(--margin)] pb-28">
        <CtaCard images={gallery.length >= 4 ? gallery : undefined} project={p.name} />
      </section>

      {/* lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div key={lightbox} initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: EASE }} className="relative h-[80vh] w-full max-w-6xl">
              <Image src={gallery[lightbox]} alt={`${p.name} photo ${lightbox + 1}`} fill quality={90} sizes="100vw" className="object-contain" />
            </motion.div>
            <button aria-label="Previous photo" onClick={(e) => (e.stopPropagation(), setLightbox((lightbox - 1 + gallery.length) % gallery.length))} className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-ink">←</button>
            <button aria-label="Next photo" onClick={(e) => (e.stopPropagation(), setLightbox((lightbox + 1) % gallery.length))} className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-ink">→</button>
            <button aria-label="Close" onClick={() => setLightbox(null)} className="absolute right-4 top-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-ink">✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
