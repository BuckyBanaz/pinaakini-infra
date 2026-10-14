"use client";

import { Counter, Kicker, Rise, ScrollText } from "./motion";
import { home } from "@/lib/home";

// The company in one sentence, lit word by word as you scroll, beside the numbers.
export default function Intro() {
  return (
    <section id="about" className="grid gap-16 bg-ivory px-[var(--margin)] py-28 md:py-40 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-8">
        <Rise>
          <Kicker>Pinaakini Infra</Kicker>
        </Rise>
        <ScrollText text={home.intro.statement} className="t-display mt-10 max-w-[22ch] text-[clamp(2.1rem,1.3rem+3.2vw,4.6rem)] leading-[1.08]" />
      </div>
      <dl className="grid grid-cols-2 content-end gap-x-6 gap-y-12 lg:col-span-4 lg:grid-cols-1 lg:pl-10">
        {home.stats.map((s, i) => (
          <Rise key={s.label} delay={i * 0.08} className="border-t border-ink/15 pt-5">
            <dd className="m-0 font-display text-[clamp(2.6rem,1.8rem+2.4vw,3.8rem)] leading-none">
              <Counter value={s.value} suffix={s.suffix} />
            </dd>
            <dt className="mt-3 text-[14px] text-ink-soft">{s.label}</dt>
          </Rise>
        ))}
      </dl>
    </section>
  );
}
