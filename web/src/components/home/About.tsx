"use client";

import Link from "next/link";
import { Counter, Kicker, RevealImage, Rise, SplitHeading } from "./motion";
import { home } from "@/lib/home";

export default function About() {
  const { about, stats } = home;
  return (
    <section id="about" className="bg-ivory">
      {/* credibility ribbon */}
      <div className="px-[var(--margin)]">
        <dl className="grid grid-cols-2 border-b border-ink/10 py-14 md:grid-cols-4 md:py-20">
          {stats.map((s, i) => (
            <Rise key={s.label} delay={i * 0.08} className={`py-4 md:px-8 ${i > 0 ? "md:border-l md:border-ink/10" : "md:pl-0"}`}>
              <dd className="m-0 font-display text-[clamp(2.75rem,1.8rem+3vw,4.75rem)] font-light leading-none text-ink">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
              <dt className="t-kicker mt-4 text-[11px] text-ink-soft">{s.label}</dt>
            </Rise>
          ))}
        </dl>
      </div>

      <div className="grid gap-14 px-[var(--margin)] py-24 md:grid-cols-12 md:gap-8 md:py-36">
        <div className="relative md:col-span-7">
          <RevealImage src={about.images.main} alt="A Pinaakini villa at dusk with its pool lit" className="aspect-[4/3] w-full md:w-[88%]" sizes="(min-width:768px) 55vw, 100vw" />
          <RevealImage
            src={about.images.inset}
            alt="Living room opening onto the pool terrace"
            from="left"
            className="absolute -bottom-10 right-0 aspect-[3/4] w-[38%] border-[10px] border-ivory md:-bottom-16"
            sizes="25vw"
            parallax={4}
          />
        </div>

        <div className="flex flex-col justify-center md:col-span-5 md:pl-6">
          <Rise>
            <Kicker>{about.kicker}</Kicker>
          </Rise>
          <SplitHeading text={about.heading} className="t-head mt-6 max-w-[14ch] text-ink" />
          {about.body.map((p, i) => (
            <Rise key={i} delay={0.15 + i * 0.1}>
              <p className="mt-6 max-w-[46ch] text-[17px] font-light leading-[1.8] text-ink-soft">{p}</p>
            </Rise>
          ))}
          <Rise delay={0.35} className="mt-10">
            <Link href={about.cta.href} className="btn btn-line-dark">
              {about.cta.label}
              <span aria-hidden>→</span>
            </Link>
          </Rise>
        </div>
      </div>
    </section>
  );
}
