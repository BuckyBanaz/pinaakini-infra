"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Categories from "@/components/home/Categories";
import Pillars from "@/components/home/Pillars";
import CtaBand from "@/components/home/CtaBand";
import { Kicker, RevealImage, Rise, ScrollText, SplitHeading } from "@/components/home/motion";

const STEPS = [
  { title: "Choosing the land", text: "We look for land with good road access, clear records and room for the city to grow towards it." },
  { title: "Planning the layout", text: "Roads, plot sizes, drainage, green spaces and home designs are planned before anything is built." },
  { title: "Building it ourselves", text: "Our own team develops the infrastructure and the homes, so quality is checked at every stage." },
  { title: "Handing over", text: "We walk every buyer through their property and the paperwork before the keys or the plot are handed over." },
];

const STRIP = ["/img/hero.webp", "/img/living.webp", "/world/paddy-palms.webp", "/img/terrace.webp", "/img/path.webp", "/img/evening.webp", "/world/paddy.webp", "/img/entrance.webp"];

export default function AboutContent() {
  const reduce = useReducedMotion();
  return (
    <>
      {/* opening statement */}
      <section className="bg-ivory px-[var(--margin)] py-28 md:py-44">
        <Rise>
          <Kicker>Who we are</Kicker>
        </Rise>
        <ScrollText
          text="Pinaakini Infra Private Limited is a Nellore real estate developer. We create residential layouts, plotted communities, villas, triplex homes and farmland, and we build every one of them for the families who will live there for generations."
          className="t-display mt-10 max-w-[24ch] text-[clamp(2.2rem,1.4rem+3.4vw,5rem)] leading-[1.08]"
        />
      </section>

      {/* story */}
      <section className="grid gap-14 bg-ivory px-[var(--margin)] pb-28 md:grid-cols-12 md:gap-8 md:pb-40">
        <div className="md:col-span-5 md:pt-24">
          <Rise>
            <Kicker>Our story</Kicker>
          </Rise>
          <SplitHeading text="Built in Nellore, for Nellore" className="t-head mt-6 max-w-[12ch]" />
          <Rise delay={0.15}>
            <p className="mt-8 max-w-[44ch] text-[17px] font-light leading-[1.8] text-ink-soft">
              We grew up with this city and we build along its growing corridors: the highways, the ring roads and the quiet edges where farmland meets town.
            </p>
          </Rise>
          <Rise delay={0.25}>
            <p className="mt-6 max-w-[44ch] text-[17px] font-light leading-[1.8] text-ink-soft">
              Whether you are buying your first plot, building a family home or looking for land to hold, you deal with the same team from the first site visit to the day you receive your documents.
            </p>
          </Rise>
        </div>
        <div className="relative md:col-span-6 md:col-start-7">
          <RevealImage src="/img/facade.webp" alt="Facade of a Pinaakini villa at dusk" className="aspect-[4/5] w-full md:w-[85%] md:ml-auto" sizes="(min-width:768px) 45vw, 100vw" />
          <RevealImage
            src="/world/paddy-palms.webp"
            alt="Paddy fields and palms near Nellore"
            from="left"
            parallax={4}
            className="absolute -bottom-10 left-0 aspect-square w-[42%] border-[10px] border-ivory"
            sizes="20vw"
          />
        </div>
      </section>

      <Categories />

      {/* approach */}
      <section className="bg-paper px-[var(--margin)] py-28 md:py-36">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Rise>
              <Kicker>How we work</Kicker>
            </Rise>
            <SplitHeading text="From raw land to your front door" className="t-head mt-6 max-w-[14ch]" />
          </div>
          <Rise delay={0.2}>
            <p className="max-w-[40ch] text-[17px] font-light leading-[1.8] text-ink-soft">Four stages, handled by one team, for every project we take on.</p>
          </Rise>
        </div>
        <ol className="m-0 mt-20 grid list-none gap-px bg-ink/10 p-0 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: reduce ? 0 : 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-paper p-8 pb-12 transition-colors duration-700 hover:bg-obsidian hover:text-white md:min-h-[360px]"
            >
              <span className="font-display text-[4.5rem] font-light leading-none text-gold">0{i + 1}</span>
              <h3 className="mt-10 font-display text-[1.9rem] font-normal leading-tight">{s.title}</h3>
              <p className="mt-4 text-[15px] font-light leading-[1.8] text-ink-soft transition-colors duration-700 group-hover:text-white/70">{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* moving strip */}
      <section aria-label="Pinaakini projects" className="overflow-hidden bg-obsidian py-16">
        <motion.div
          className="flex w-max gap-4"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 50, ease: "linear", repeat: Infinity }}
        >
          {[...STRIP, ...STRIP].map((src, i) => (
            <div key={i} className="relative h-[38vh] w-[28vh] shrink-0 overflow-hidden md:h-[46vh] md:w-[34vh]">
              <Image src={src} alt="" fill quality={85} sizes="34vh" className="object-cover" />
            </div>
          ))}
        </motion.div>
      </section>

      <Pillars />
      <CtaBand />
    </>
  );
}
