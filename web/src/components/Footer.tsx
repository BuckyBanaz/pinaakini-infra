"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/site";
import { credits } from "@/lib/home";
import { openVisit } from "@/lib/visit";

const EASE = [0.22, 1, 0.36, 1] as const;

const ICONS: Record<string, React.ReactNode> = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </>
  ),
  Facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5a.5.5 0 0 1 .5-.5Z" />,
  YouTube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10 9.5 5 2.5-5 2.5z" fill="currentColor" />
    </>
  ),
  LinkedIn: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </>
  ),
};

const COLS = [
  {
    title: "Explore",
    links: [
      { label: "Available properties", href: "/properties" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Property types",
    links: [
      { label: "Villas", href: "/properties?category=Villas" },
      { label: "Triplex houses", href: "/properties?category=Triplex%20Houses" },
      { label: "Residential layouts", href: "/properties?category=Layouts" },
      { label: "Farmlands", href: "/properties?category=Farmlands" },
    ],
  },
];

export default function Footer() {
  const { contact } = site;
  const reduce = useReducedMotion();

  const topRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: topRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-12%", "12%"]);

  return (
    <footer className="relative overflow-hidden bg-obsidian text-white">
      {/* closing statement over a dimmed photograph */}
      <div ref={topRef} className="relative overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-[-12%_0]">
          <Image src="/img/evening.webp" alt="" fill quality={90} sizes="100vw" className="object-cover opacity-30" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,15,14,.2)_0%,rgba(15,15,14,1)_100%)]" />

        <div className="relative flex flex-col gap-14 px-[var(--margin)] pb-24 pt-28 md:flex-row md:items-end md:justify-between md:pb-32 md:pt-40">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="t-kicker flex items-center gap-4 text-gold"
            >
              <span className="h-px w-10 bg-current" />
              Begin your journey
            </motion.p>
            <h2 className="t-display mt-8 text-[clamp(3rem,1.4rem+6.4vw,8rem)]" aria-label="Let's find your place in Nellore">
              {["Let’s find your", "place in Nellore."].map((line, i) => (
                <span key={line} aria-hidden className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className={`block ${i === 1 ? "italic text-[#e9d6b0]" : ""}`}
                    initial={{ y: reduce ? 0 : "105%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                    transition={{ duration: 1.2, delay: i * 0.12, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4"
            >
              <a href={contact.phoneHref} className="group font-display text-[clamp(1.6rem,1.2rem+1.2vw,2.4rem)] font-light">
                {contact.phone}
                <span className="block h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-(--ease-lux) group-hover:scale-x-100" />
              </a>
              <a href={`mailto:${contact.email}`} className="group text-[17px] font-light text-white/80 hover:text-white">
                {contact.email}
                <span className="block h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-(--ease-lux) group-hover:scale-x-100" />
              </a>
            </motion.div>
          </div>

          <VisitBadge />
        </div>
      </div>

      {/* columns */}
      <div className="grid gap-14 border-t border-white/10 px-[var(--margin)] py-20 md:grid-cols-12 md:gap-8">
        <Col i={0} className="md:col-span-4">
          <Link href="/" className="inline-flex flex-col leading-none">
            <span className="font-display text-[32px] font-medium tracking-[0.22em]">PINAAKINI</span>
            <span className="t-kicker mt-1.5 text-[10px] tracking-[0.62em] text-gold">Infra</span>
          </Link>
          <p className="mt-8 max-w-[34ch] text-[15px] font-light leading-[1.8] text-white/65">
            Villas, triplex homes, residential layouts and farmland in and around Nellore, Andhra Pradesh.
          </p>
          <div className="mt-8 flex gap-3">
            {site.social.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/75 transition-[color,border-color,transform] duration-300 hover:-translate-y-1 hover:border-gold hover:text-gold"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {ICONS[s.name]}
                </svg>
              </a>
            ))}
          </div>
        </Col>

        {COLS.map((c, ci) => (
          <Col key={c.title} i={ci + 1} className="md:col-span-2">
            <nav aria-label={c.title}>
              <h3 className="t-kicker text-[11px] text-gold">{c.title}</h3>
              <ul className="m-0 mt-6 list-none space-y-3.5 p-0">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="group inline-flex items-center gap-2 text-[15px] font-light text-white/75 transition-colors hover:text-white">
                      <span className="h-px w-0 bg-gold transition-[width] duration-500 ease-(--ease-lux) group-hover:w-4" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Col>
        ))}

        <Col i={3} className="md:col-span-4">
          <h3 className="t-kicker text-[11px] text-gold">Corporate office</h3>
          <address className="mt-6 not-italic">
            <p className="max-w-[34ch] text-[15px] font-light leading-[1.8] text-white/75">{contact.address}</p>
            <p className="mt-4 text-[14px] font-light text-white/50">{contact.workingHours}</p>
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="t-kicker mt-6 inline-flex items-center gap-3 text-[11px] text-gold transition-colors hover:text-white"
            >
              Get directions <span aria-hidden>↗</span>
            </a>
          </address>
        </Col>
      </div>

      <Wordmark />

      <div className="relative flex flex-col gap-4 border-t border-white/10 px-[var(--margin)] py-7 text-[12.5px] font-light text-white/50 md:flex-row md:items-center md:justify-between">
        <p>© 2026 {site.legalName}. All rights reserved.</p>
        <p className="max-w-[80ch] md:text-center">
          Villa images are architectural renders. Land photographs via Wikimedia Commons:{" "}
          {credits.map((c) => `${c.title} by ${c.by} (${c.licence})`).join("; ")}.
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
          className="group inline-flex min-h-11 cursor-pointer items-center gap-3 self-start text-white/70 hover:text-white md:self-auto"
        >
          Back to top
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-transform duration-500 group-hover:-translate-y-1">↑</span>
        </button>
      </div>
    </footer>
  );
}

function Col({ children, i, className }: { children: React.ReactNode; i: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// A round badge whose ring of text turns slowly; the centre is the action.
function VisitBadge() {
  const reduce = useReducedMotion();
  const ring = (
    <>
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        aria-hidden
      >
        <defs>
          <path id="ring" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-white font-sans text-[12px] uppercase">
          <textPath href="#ring" textLength="486" lengthAdjust="spacing">Schedule a site visit · Schedule a site visit · </textPath>
        </text>
      </motion.svg>
      <span className="relative flex h-[46%] w-[46%] items-center justify-center rounded-full bg-gold text-[26px] text-white transition-[transform,background-color] duration-500 ease-(--ease-lux) group-hover:scale-110 group-hover:bg-white group-hover:text-ink">
        <span className="transition-transform duration-500 group-hover:rotate-[-45deg]">→</span>
      </span>
    </>
  );
  const cls = "group relative flex h-40 w-40 shrink-0 cursor-pointer items-center justify-center md:h-52 md:w-52";
  return (
    <motion.div
      initial={{ opacity: 0, scale: reduce ? 1 : 0.6, rotate: reduce ? 0 : -60 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      <button type="button" onClick={() => openVisit()} aria-label="Schedule a site visit" className={cls}>
        {ring}
      </button>
    </motion.div>
  );
}

// The name at full width, its letters rising one after another.
function Wordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -5% 0px" });
  const reduce = useReducedMotion();
  return (
    <div ref={ref} aria-hidden className="select-none overflow-hidden px-[var(--margin)] pt-6">
      <p className="flex justify-between font-display text-[clamp(56px,15.5vw,290px)] font-light leading-[0.78] text-gold">
        {"PINAAKINI".split("").map((ch, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: reduce ? 0 : "100%" }}
              animate={inView ? { y: 0 } : undefined}
              transition={{ duration: 1.1, delay: i * 0.06, ease: EASE }}
            >
              {ch}
            </motion.span>
          </span>
        ))}
      </p>
    </div>
  );
}
