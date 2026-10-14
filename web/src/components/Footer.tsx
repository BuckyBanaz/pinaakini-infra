"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { credits } from "@/lib/home";

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

const LINKS = [
  { label: "Properties", href: "/properties" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Light footer fixed beneath the page on desktop: the content scrolls away to reveal it.
export default function Footer() {
  const { contact } = site;
  const ref = useRef<HTMLElement>(null);
  const [h, setH] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH(window.innerWidth >= 768 ? el.offsetHeight : 0));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <div aria-hidden style={{ height: h }} />
      <footer ref={ref} className="z-0 bg-stone text-ink md:fixed md:inset-x-0 md:bottom-0">
        <div className="flex items-center justify-between gap-6 px-[var(--margin)] pt-12">
          <div className="flex gap-2">
            {site.social.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 hover:-translate-y-1"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {ICONS[s.name]}
                </svg>
              </a>
            ))}
          </div>
          <Link href="/" className="hidden flex-col items-center leading-none sm:flex">
            <span className="text-[22px] font-medium tracking-[0.22em]">PINAAKINI</span>
            <span className="mt-1 text-[9px] tracking-[0.6em] text-ink-soft">INFRA</span>
          </Link>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
            aria-label="Back to top"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 hover:-translate-y-1"
          >
            ↑
          </button>
        </div>

        <div className="px-[var(--margin)] py-16 text-center md:py-20">
          <motion.a
            href={contact.phoneHref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="block text-[clamp(1.8rem,1.2rem+2.4vw,3.2rem)] font-light tracking-[-0.01em] hover:opacity-70"
          >
            {contact.phone}
          </motion.a>
          <a href={`mailto:${contact.email}`} className="mt-2 block text-[clamp(1.2rem,1rem+1.2vw,2.2rem)] font-light hover:opacity-70">
            {contact.email}
          </a>
          <nav aria-label="Footer" className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[14px]">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="underline-offset-4 hover:underline">
                {l.label}
              </Link>
            ))}
            <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
              WhatsApp
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-ink/10 px-[var(--margin)] py-6 text-[12px] text-ink-soft md:flex-row md:items-start md:justify-between">
          <p>© 2026 {site.legalName}</p>
          <p className="max-w-[60ch] md:text-center">{contact.address}</p>
          <p className="max-w-[46ch] md:text-right">
            Villa images are architectural renders. Photos via Wikimedia Commons: {credits.map((c) => `${c.title} by ${c.by} (${c.licence})`).join("; ")}.
          </p>
        </div>
      </footer>
    </>
  );
}
