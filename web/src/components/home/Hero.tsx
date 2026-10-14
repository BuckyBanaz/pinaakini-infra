"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FILM, home } from "@/lib/home";
import { openVisit } from "@/lib/visit";

const pad = (n: number) => String(n).padStart(3, "0");
const EASE = [0.22, 1, 0.36, 1] as const;

// Coarse-to-fine: every 32nd frame first so the film scrubs at once, then fill the gaps.
function loadOrder(n: number) {
  const seen = new Set<number>();
  const out: number[] = [];
  for (const step of [32, 16, 8, 4, 2, 1]) {
    for (let i = 0; i < n; i += step) {
      if (seen.has(i)) continue;
      seen.add(i);
      out.push(i);
    }
  }
  return out;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const introOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.14], [0, -60]);
  const midOpacity = useTransform(scrollYProgress, [0.18, 0.26, 0.5, 0.58], [0, 1, 1, 0]);
  const midY = useTransform(scrollYProgress, [0.18, 0.58], [40, -40]);
  const midPointer = useTransform(midOpacity, (o) => (o > 0.5 ? "auto" : "none"));
  const statsOpacity = useTransform(scrollYProgress, [0.62, 0.72, 0.999, 1], [0, 1, 1, 1]);
  const statsY = useTransform(scrollYProgress, [0.62, 0.75], [60, 0]);
  const shade = useTransform(scrollYProgress, [0, 0.16, 0.9, 1], [1, 0.6, 0.6, 0.85]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const N = FILM.frames;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const portrait = window.innerWidth < 768 && window.innerHeight > window.innerWidth;
    const base = portrait ? FILM.base.phone : FILM.base.desktop;
    const frames: (HTMLImageElement | null)[] = new Array(N).fill(null);

    let cur = 0;
    let drawn = -1;
    let dirty = true;
    let running = true;
    let visible = true;
    let raf = 0;
    let lastW = 0;
    let loaded = 0;

    const resize = () => {
      const w = window.innerWidth;
      if (coarse && w === lastW) return; // ignore URL-bar height changes
      lastW = w;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      ctx.imageSmoothingQuality = "high";
      dirty = true;
    };

    const nearest = (i: number) => {
      for (let d = 0; d < N; d++) {
        if (frames[i - d]) return frames[i - d];
        if (frames[i + d]) return frames[i + d];
      }
      return null;
    };

    const draw = (i: number, zoom: number) => {
      const img = nearest(i);
      if (!img) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight) * zoom;
      const w = img.naturalWidth * s;
      const h = img.naturalHeight * s;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const order = loadOrder(N);
    let qi = 0;
    let active = 0;
    const pump = () => {
      while (running && active < 8 && qi < order.length) {
        const i = order[qi++];
        active++;
        const img = new Image();
        img.decoding = "async";
        img.src = `${base}${pad(i)}.webp`;
        img
          .decode()
          .then(() => {
            if (!running) return;
            frames[i] = img;
            dirty = true;
            loaded++;
            if (barRef.current) barRef.current.style.transform = `scaleX(${loaded / N})`;
          })
          .catch(() => {})
          .finally(() => {
            active--;
            pump();
          });
      }
    };
    pump();

    // Scroll drives the camera directly; under reduced motion only the lag and push-in go.
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const p = scrollYProgress.get();
      const target = p * (N - 1);
      if (reduce) cur = target;
      else {
        cur += (target - cur) * 0.18;
        if (Math.abs(target - cur) < 0.05) cur = target;
      }
      const idx = Math.max(0, Math.min(N - 1, Math.round(cur)));
      if (idx !== drawn || dirty) {
        draw(idx, reduce ? 1 : 1 + p * 0.05);
        drawn = idx;
        dirty = false;
      }
    };

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (sectionRef.current) io.observe(sectionRef.current);

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize);
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
    };
  }, [scrollYProgress]);

  const { hero } = home;

  return (
    <section ref={sectionRef} id="top" aria-label="Pinaakini Infra" className="relative h-[480vh] bg-obsidian md:h-[560vh]">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${FILM.poster})` }} />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
        <motion.div
          aria-hidden
          style={{ opacity: shade }}
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,.72)_0%,rgba(8,8,8,.35)_45%,rgba(8,8,8,0)_75%),linear-gradient(0deg,rgba(8,8,8,.6)_0%,rgba(8,8,8,0)_45%)]"
        />

        {/* 1 · title */}
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="absolute inset-x-0 bottom-0 px-[var(--margin)] pb-[max(36px,calc(env(safe-area-inset-bottom)+24px))] text-white md:pb-16"
        >
          <h1 className="flex flex-wrap items-end gap-x-6 font-display text-[clamp(2.9rem,1.2rem+7vw,8.5rem)] font-light uppercase leading-[0.95] tracking-[-0.02em]" aria-label={hero.title.join(" ")}>
            {hero.title.map((line, li) => (
              <span key={line} aria-hidden className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.3, delay: 0.3 + li * 0.15, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <motion.a
              href="#considered"
              aria-label="Scroll down"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
              className="mb-[0.18em] flex h-[0.62em] w-[0.62em] items-center justify-center rounded-full border-2 border-white/90 text-[0.32em] transition-colors hover:bg-white hover:text-ink"
            >
              ↓
            </motion.a>
          </h1>
        </motion.div>

        {/* 2 · line + actions */}
        <motion.div
          style={{ opacity: midOpacity, y: midY }}
          className="pointer-events-none absolute left-[var(--margin)] top-1/2 w-[min(88vw,460px)] -translate-y-1/2 text-white"
        >
          <motion.div style={{ pointerEvents: midPointer }}>
            <p className="text-[16px] font-light leading-[1.75] text-white/90 md:text-[17px]">{hero.line}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={hero.primary.href} className="btn btn-gold">
                {hero.primary.label}
                <span className="btn-arrow">→</span>
              </a>
              <button type="button" onClick={() => openVisit()} className="btn btn-line">
                {hero.secondary.label}
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* 3 · glass stat cards */}
        <motion.ul
          style={{ opacity: statsOpacity, y: statsY }}
          className="pointer-events-none absolute inset-x-[var(--margin)] bottom-8 md:bottom-12 z-10 m-0 grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-4 md:gap-4"
        >
          {home.stats.map((st) => (
            <li key={st.label} className="rounded-2xl border border-white/25 bg-white/10 px-5 py-6 text-center text-white backdrop-blur-md md:py-8">
              <span className="block text-[clamp(1.6rem,1rem+1.8vw,2.6rem)] font-normal leading-none">
                {st.value.toLocaleString("en-IN")}
                {st.suffix}
              </span>
              <span className="mt-3 block text-[12px] text-white/80">{st.label}</span>
            </li>
          ))}
        </motion.ul>

        {/* scroll progress */}
        <div className="pointer-events-none absolute right-[var(--margin)] top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex">
          <span className="t-kicker text-[10px] text-white/70 [writing-mode:vertical-rl]">Scroll</span>
          <span className="relative h-28 w-px overflow-hidden bg-white/25">
            <motion.span style={{ height: progress }} className="absolute inset-x-0 top-0 bg-white" />
          </span>
        </div>

        {/* film loading */}
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-white/10">
          <span ref={barRef} className="block h-full origin-left scale-x-0 bg-white/80 transition-transform duration-300" />
        </span>
      </div>
    </section>
  );
}
