"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Rise, ScrollText } from "@/components/home/motion";
import Considered from "@/components/lux/Considered";
import CoreServices from "@/components/lux/CoreServices";
import NumbersBand from "@/components/lux/NumbersBand";
import Nearby from "@/components/lux/Nearby";
import CtaCard from "@/components/lux/CtaCard";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  { title: "Choosing the land", text: "We look for land with good road access, clear records and room for the city to grow towards it." },
  { title: "Planning the layout", text: "Roads, plot sizes, drainage, green spaces and home designs are planned before anything is built." },
  { title: "Building it ourselves", text: "Our own team develops the infrastructure and the homes, so quality is checked at every stage." },
  { title: "Handing over", text: "We walk every buyer through their property and the paperwork before the keys or the plot are handed over." },
];

export default function AboutContent() {
  const reduce = useReducedMotion();
  return (
    <>
      <section id="story" className="flex min-h-[80svh] items-center justify-center bg-white px-[var(--margin)] py-28">
        <ScrollText
          text="Pinaakini Infra Private Limited is a Nellore real estate developer and consultancy. We create residential layouts, villas, triplex homes and farmland, and we build every one of them for the families who will live there for generations."
          className="mx-auto max-w-[30ch] text-center text-[clamp(1.5rem,1rem+1.8vw,2.5rem)] font-light leading-[1.45]"
        />
      </section>

      <Considered />

      {/* story */}
      <section className="grid gap-12 bg-white px-[var(--margin)] py-24 md:grid-cols-2 md:items-center md:py-32">
        <div className="grid grid-cols-2 gap-3">
          {["/img/facade.webp", "/world/paddy-palms.webp", "/img/living.webp", "/img/entrance.webp"].map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: reduce ? 0 : 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.08, ease: EASE }}
              className={`relative overflow-hidden rounded-2xl bg-stone ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"} ${i === 1 ? "mt-10" : ""}`}
            >
              <Image src={src} alt="" fill quality={90} sizes="(min-width:768px) 25vw, 50vw" className="object-cover transition-transform duration-[1.2s] hover:scale-105" />
            </motion.div>
          ))}
        </div>
        <div className="md:pl-10">
          <Rise>
            <h2 className="t-head">
              Built in Nellore,
              <br />
              for Nellore
            </h2>
          </Rise>
          <Rise delay={0.1}>
            <p className="mt-6 max-w-[48ch] text-[15px] leading-[1.9] text-ink-soft">
              We grew up with this city and we build along its growing corridors: the highways, the ring roads and the quiet edges where farmland meets town.
            </p>
          </Rise>
          <Rise delay={0.2}>
            <p className="mt-5 max-w-[48ch] text-[15px] leading-[1.9] text-ink-soft">
              Whether you are buying your first plot, building a family home, holding land or need advice on your own project, you deal with the same team from the first site visit to the day you receive your documents.
            </p>
          </Rise>
        </div>
      </section>

      {/* how we work */}
      <section className="bg-sand px-[var(--margin)] py-24 md:py-32">
        <Rise>
          <h2 className="t-head">How we work</h2>
          <p className="mt-4 max-w-[44ch] text-[15px] leading-[1.8] text-ink-soft">Four stages, handled by one team, for every project we take on.</p>
        </Rise>
        <ol className="m-0 mt-14 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: reduce ? 0 : 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1, delay: i * 0.1, ease: EASE }}
              className="group rounded-2xl bg-white p-8 transition-colors duration-500 hover:bg-ink hover:text-white md:min-h-[320px]"
            >
              <span className="block text-[3.2rem] font-light leading-none">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-10 text-[1.3rem] font-normal">{s.title}</h3>
              <p className="mt-3 text-[14px] leading-[1.8] text-ink-soft transition-colors duration-500 group-hover:text-white/75">{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      <CoreServices />
      <NumbersBand />
      <div className="pt-24 md:pt-32">
        <Nearby />
      </div>
      <section className="bg-white px-[var(--margin)] pb-28">
        <CtaCard />
      </section>
    </>
  );
}
