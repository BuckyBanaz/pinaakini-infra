"use client";

import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { Kicker, Rise, SplitHeading } from "./motion";
import { home } from "@/lib/home";

// Client stories, shown with the 21st.dev Circular Testimonials component.
// Items are SAMPLE until the client supplies approved quotes (lib/home.ts).
export default function Voices() {
  const { testimonials } = home;
  const items = testimonials.items.map((t) => ({ quote: t.quote, name: t.name, designation: t.detail, src: t.image }));

  return (
    <section id="testimonials" className="bg-white px-[var(--margin)] py-24 md:py-32">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Rise>
            <Kicker>Client stories</Kicker>
          </Rise>
          <SplitHeading text="In their own words" className="t-head mt-6" />
        </div>
        <Rise delay={0.15}>
          <p className="max-w-[36ch] text-[14px] text-ink-soft">{testimonials.note}</p>
        </Rise>
      </div>

      <Rise delay={0.1} className="mt-10 flex justify-center">
        <CircularTestimonials
          testimonials={items}
          autoplay
          colors={{
            name: "#111111",
            designation: "#6b7280",
            testimony: "#333333",
            arrowBackground: "#111111",
            arrowForeground: "#ffffff",
            arrowHoverBackground: "#3b82f6",
          }}
          fontSizes={{ name: "28px", designation: "16px", quote: "20px" }}
        />
      </Rise>
    </section>
  );
}
