"use client";

import { ScrollText } from "@/components/home/motion";
import { lux } from "@/lib/home";

// One centred sentence that lights up word by word as it scrolls past.
export default function Statement() {
  return (
    <section aria-label="Our promise" className="flex min-h-[80svh] items-center justify-center bg-white px-[var(--margin)] py-28">
      <ScrollText
        text={lux.statement}
        className="mx-auto max-w-[26ch] text-center text-[clamp(1.6rem,1.1rem+1.8vw,2.6rem)] font-light leading-[1.45] tracking-[-0.01em]"
      />
    </section>
  );
}
