"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Inertial smooth scrolling. Lenis drives the real window scroll, so framer-motion's
// useScroll and native listeners already see it; no synthetic events needed.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.2,
      anchors: true,
    });

    let id = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return null;
}
