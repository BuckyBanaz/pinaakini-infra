"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import PropertyCard from "@/components/PropertyCard";
import { Kicker, Rise, SplitHeading } from "./motion";
import { PROJECTS } from "@/lib/projects";

const NOW = PROJECTS.filter((p) => p.status === "Now Selling").slice(0, 3);

// Three listings on sale now, using the 21st.dev Property Preview Card.
export default function Featured() {
  const reduce = useReducedMotion();
  return (
    <section id="properties" className="bg-background px-[var(--margin)] py-24 md:py-32">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Rise>
            <Kicker>Available now</Kicker>
          </Rise>
          <SplitHeading text="Properties you can visit this week" className="t-head mt-6 max-w-[15ch]" />
        </div>
        <Rise delay={0.15}>
          <Link href="/properties" className="btn btn-line-dark">
            All properties <span aria-hidden>→</span>
          </Link>
        </Rise>
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {NOW.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: reduce ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <PropertyCard p={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
