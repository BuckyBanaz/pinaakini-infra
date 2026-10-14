"use client";

import { motion } from "framer-motion";
import EnquiryForm from "@/components/EnquiryForm";
import Faq from "@/components/lux/Faq";
import { Rise } from "@/components/home/motion";
import { site } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ContactContent() {
  const { contact } = site;
  const cards = [
    { k: "Call", v: contact.phone, href: contact.phoneHref },
    { k: "WhatsApp", v: "Chat with our team", href: contact.whatsappHref, ext: true },
    { k: "Email", v: contact.email, href: `mailto:${contact.email}` },
    { k: "Hours", v: contact.workingHours },
  ];

  return (
    <>
      {/* big contact line */}
      <section id="reach" className="bg-white px-[var(--margin)] pb-16 pt-24 text-center md:pt-32">
        <Rise>
          <p className="text-[13px] uppercase tracking-[0.24em] text-ink-soft">Speak to our team</p>
        </Rise>
        <motion.a
          href={contact.phoneHref}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="mt-6 block text-[clamp(2.2rem,1.2rem+4vw,5rem)] font-light tracking-[-0.02em] transition-opacity hover:opacity-70"
        >
          {contact.phone}
        </motion.a>
        <a href={`mailto:${contact.email}`} className="mt-2 block text-[clamp(1.2rem,1rem+1.4vw,2.2rem)] font-light transition-opacity hover:opacity-70">
          {contact.email}
        </a>

        <ul className="m-0 mt-14 grid list-none gap-4 p-0 text-left sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <motion.li
              key={c.k}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
            >
              {c.href ? (
                <a
                  href={c.href}
                  {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-full flex-col justify-between gap-8 rounded-2xl bg-sand p-6 transition-colors duration-500 hover:bg-ink hover:text-white"
                >
                  <span className="flex items-center justify-between text-[13px] text-ink-soft group-hover:text-white/70">
                    {c.k}
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:-rotate-45 group-hover:bg-white group-hover:text-ink">→</span>
                  </span>
                  <span className="break-words text-[1.05rem]">{c.v}</span>
                </a>
              ) : (
                <div className="flex h-full flex-col justify-between gap-8 rounded-2xl bg-sand p-6">
                  <span className="text-[13px] text-ink-soft">{c.k}</span>
                  <span className="text-[1.05rem]">{c.v}</span>
                </div>
              )}
            </motion.li>
          ))}
        </ul>
      </section>

      {/* form + office */}
      <section className="grid gap-10 bg-white px-[var(--margin)] pb-24 lg:grid-cols-[1.3fr_1fr]">
        <Rise>
          <EnquiryForm />
        </Rise>
        <div className="flex flex-col gap-4">
          <Rise className="rounded-3xl bg-obsidian p-8 text-white md:p-10">
            <p className="text-[13px] uppercase tracking-[0.24em] text-white/60">Corporate office</p>
            <p className="mt-5 text-[1.2rem] font-light leading-[1.6]">{contact.address}</p>
            <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-8">
              Get directions <span className="btn-arrow">↗</span>
            </a>
          </Rise>
          <Rise delay={0.1} className="relative min-h-[320px] flex-1 overflow-hidden rounded-3xl bg-stone">
            <iframe
              title="Pinaakini Infra office on the map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale"
            />
          </Rise>
        </div>
      </section>

      <Faq />
    </>
  );
}
