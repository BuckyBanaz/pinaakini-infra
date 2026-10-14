"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { openVisit } from "@/lib/visit";

const LINKS = [
  { label: "Properties", href: "/properties" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Transparent over the home film, ivory once you scroll; hides on the way down.
export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [solid, setSolid] = useState(!isHome);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(!isHome || y > window.innerHeight * 0.6);
      setHidden(y > last && y > 300 && !open);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, open]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const light = !solid && !open;

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        light ? "bg-transparent text-white" : "bg-ivory/95 text-ink shadow-[0_1px_0_rgba(20,20,20,0.08)] backdrop-blur-md"
      }`}
    >
      <nav aria-label="Primary" className="flex h-[76px] items-center justify-between gap-8 px-[var(--margin)] md:h-[88px]">
        <Link href="/" onClick={() => setOpen(false)} className="flex flex-col leading-none">
          <span className="font-display text-[26px] font-medium tracking-[0.22em] md:text-[28px]">PINAAKINI</span>
          <span className="t-kicker mt-1 text-[9px] tracking-[0.62em] text-gold">Infra</span>
        </Link>

        <ul className="m-0 hidden list-none items-center gap-10 p-0 lg:flex">
          {LINKS.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link href={l.href} className="group relative py-2 text-[13px] font-medium uppercase tracking-[0.2em]">
                  {l.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gold transition-transform duration-500 ease-(--ease-lux) ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-5">
          <a href={site.contact.phoneHref} className="hidden text-[14px] tracking-wide xl:block">
            {site.contact.phone}
          </a>
          <button type="button" onClick={() => openVisit()} className="btn btn-gold hidden h-11 px-5 text-[12px] sm:inline-flex">
            Enquire now
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex h-11 w-11 cursor-pointer items-center justify-center lg:hidden"
          >
            <span className={`absolute h-px w-7 bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[5px]"}`} />
            <span className={`absolute h-px w-7 bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[5px]"}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[calc(100svh-76px)] flex-col justify-between bg-ivory px-[var(--margin)] pb-10 pt-6 lg:hidden"
          >
            <ul className="m-0 list-none p-0">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-ink/10"
                >
                  <Link href={l.href} onClick={() => setOpen(false)} className="block py-5 font-display text-[2.6rem] font-light leading-none">
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="space-y-3 text-[15px]">
              <a href={site.contact.phoneHref} className="block">
                {site.contact.phone}
              </a>
              <a href={`mailto:${site.contact.email}`} className="block text-ink-soft">
                {site.contact.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
