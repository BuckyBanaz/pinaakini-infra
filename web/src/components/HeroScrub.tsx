"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { FRAME_COUNT, site } from "@/lib/site";
import { Play, Pause, RotateCcw, Box, Video, Sun, Moon, Sparkles, ChevronDown, Calendar, ArrowRight } from "lucide-react";
import SiteVisitModal from "./SiteVisitModal";

const pad = (n: number) => String(n).padStart(3, "0");

export default function HeroScrub() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threeMountRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const [mode, setMode] = useState<"walkthrough" | "3d">("walkthrough");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGoldenHour, setIsGoldenHour] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [loadPct, setLoadPct] = useState(0);
  const [showVisitModal, setShowVisitModal] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const rail = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const shade = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0.35, 0.15, 0.25, 0.65]);

  // Canvas Frame Scrubbing Effect
  useEffect(() => {
    if (mode !== "walkthrough") return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768 && window.innerHeight > window.innerWidth;
    const base = mobile ? "/frames/m/" : "/frames/d/";
    const frames: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);

    let cur = 0;
    let drawn = -1;
    let dirty = true;
    let loadedCount = 0;
    let running = true;
    let visible = true;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      dirty = true;
    };

    const draw = (i: number) => {
      // Find nearest loaded frame
      let img = frames[i];
      if (!img) {
        for (let d = 1; d < FRAME_COUNT; d++) {
          if (frames[i - d]) { img = frames[i - d]; break; }
          if (frames[i + d]) { img = frames[i + d]; break; }
        }
      }
      if (!img) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * s;
      const h = img.naturalHeight * s;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    // Preload frame 0 immediately for instant paint
    const firstImg = new Image();
    firstImg.src = `${base}000.webp`;
    firstImg.onload = () => {
      frames[0] = firstImg;
      resize();
      draw(0);
    };

    // Progressive background load
    const loadRemaining = () => {
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.decoding = "async";
        img.src = `${base}${pad(i)}.webp`;
        img.onload = () => {
          if (!running) return;
          frames[i] = img;
          loadedCount++;
          setLoadPct(Math.round((loadedCount / FRAME_COUNT) * 100));
          dirty = true;
        };
      }
    };
    loadRemaining();

    // Render loop
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      let p = scrollYProgress.get();

      // If user enabled auto-play walkthrough
      if (isPlaying) {
        cur = (cur + 0.35) % (FRAME_COUNT - 1);
      } else {
        const target = reduce ? 0 : p * (FRAME_COUNT - 1);
        cur += (target - cur) * 0.22;
        if (Math.abs(target - cur) < 0.01) cur = target;
      }

      const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(cur)));
      if (idx !== drawn || dirty) {
        draw(idx);
        drawn = idx;
        dirty = false;
        if (counterRef.current) {
          counterRef.current.textContent = `${pad(idx + 1)} / ${FRAME_COUNT}`;
        }
      }
    };

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (sectionRef.current) io.observe(sectionRef.current);

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [scrollYProgress, isPlaying, mode]);

  // Three.js 3D Spatial Architectural Model Effect
  useEffect(() => {
    if (mode !== "3d") return;
    const mount = threeMountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf7f5ef);
    scene.fog = new THREE.FogExp2(0xf7f5ef, 0.03);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 7, 16);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, isGoldenHour ? 0.9 : 1.3);
    scene.add(ambientLight);

    const sun = new THREE.DirectionalLight(isGoldenHour ? 0xffaa5e : 0xfff8ee, isGoldenHour ? 2.4 : 2.0);
    sun.position.set(12, 16, 8);
    sun.castShadow = true;
    scene.add(sun);

    // Modern Villa 3D Geometry
    const villaGroup = new THREE.Group();
    scene.add(villaGroup);

    // Ground Plate
    const groundGeo = new THREE.PlaneGeometry(30, 30);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xede6d8,
      wireframe: isWireframe,
      roughness: 0.9,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    villaGroup.add(ground);

    // Reflecting Pool
    const poolGeo = new THREE.PlaneGeometry(10, 4);
    const poolMat = new THREE.MeshStandardMaterial({
      color: 0x2b4c59,
      roughness: 0.1,
      metalness: 0.8,
    });
    const pool = new THREE.Mesh(poolGeo, poolMat);
    pool.rotation.x = -Math.PI / 2;
    pool.position.set(0, 0.05, 3);
    villaGroup.add(pool);

    // Main Villa Lower Volume
    const lowerGeo = new THREE.BoxGeometry(8, 2.2, 5);
    const villaMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      wireframe: isWireframe,
    });
    const lower = new THREE.Mesh(lowerGeo, villaMat);
    lower.position.set(0, 1.1, -1);
    lower.castShadow = true;
    lower.receiveShadow = true;
    villaGroup.add(lower);

    // Cantilever Upper Volume
    const upperGeo = new THREE.BoxGeometry(6.5, 1.8, 4.5);
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x102b24,
      roughness: 0.1,
      metalness: 0.85,
      wireframe: isWireframe,
    });
    const upper = new THREE.Mesh(upperGeo, glassMat);
    upper.position.set(0.8, 3.1, -0.6);
    upper.castShadow = true;
    villaGroup.add(upper);

    // Travertine Accent Feature Wall
    const wallGeo = new THREE.BoxGeometry(0.4, 4.2, 5.2);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0xc6ae82,
      roughness: 0.6,
      wireframe: isWireframe,
    });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.set(-4.1, 2.1, -1);
    villaGroup.add(wall);

    // Mouse Interaction for 3D Orbit
    let rotX = 0;
    let rotY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      rotY = x * 0.4;
      rotX = y * 0.2;
    };
    mount.addEventListener("mousemove", onMouseMove);

    let animId = 0;
    const animateThree = () => {
      animId = requestAnimationFrame(animateThree);
      villaGroup.rotation.y += (rotY - villaGroup.rotation.y) * 0.05;
      villaGroup.rotation.x += (rotX - villaGroup.rotation.x) * 0.05;
      renderer.render(scene, camera);
    };
    animateThree();

    return () => {
      cancelAnimationFrame(animId);
      mount.removeEventListener("mousemove", onMouseMove);
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [mode, isGoldenHour, isWireframe]);

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="AVARIA cinematic experience"
      className="relative h-[380vh] md:h-[450vh] bg-ivory"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        
        {/* Full-Bleed Cinematic Canvas Presentation */}
        <div className="absolute inset-0 bg-[#171b19]">
          
            {/* Immediate Poster Fallback */}
            <div
              aria-hidden
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/frames/d/000.webp)" }}
            />
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" />
            <motion.div
              aria-hidden
              style={{ opacity: shade }}
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,12,14,0.45)_0%,rgba(10,12,14,0)_30%,rgba(10,12,14,0)_60%,rgba(10,12,14,0.8)_100%)] pointer-events-none"
            />



          {/* ================= CINEMATIC STORY BEATS ================= */}
          <Beat p={scrollYProgress} range={[0, 0.02, 0.14, 0.22]} first className="items-end justify-start">
            <div className="max-w-[1600px] px-6 pb-10 sm:px-10 md:pb-14 lg:px-16 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f1e3c4] animate-pulse" />
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-white/90">
                  {site.legalName} • NELLORE
                </span>
              </div>

              <h1 className="font-display text-[clamp(2.2rem,4.4vw,3.85rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white max-w-2xl [text-shadow:0_4px_30px_rgba(0,0,0,0.7)]">
                A residence you’ll never want to leave.
              </h1>

              <p className="mt-3 max-w-lg text-xs sm:text-sm leading-relaxed text-white/85 font-normal [text-shadow:0_2px_15px_rgba(0,0,0,0.7)]">
                Curating prime villas, residential layouts, and agro-farmlands across Nellore. Composed in glass, travertine stone, and natural landscape.
              </p>

              {/* Exact Quick Stats Strip matching user's image */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-mono text-white/90">
                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
                  From AED 8.5M
                </span>
                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
                  7,750 sqft
                </span>
                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
                  4 Bedrooms
                </span>
                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
                  Private Pool
                </span>
              </div>

              {/* Business-Critical Hero CTAs */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/properties"
                  className="px-7 py-3 rounded-full bg-[#f1e3c4] hover:bg-white text-ink text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-3.5 h-3.5 text-ink" />
                </Link>
                <button
                  type="button"
                  onClick={() => setShowVisitModal(true)}
                  className="px-6 py-3 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/30 text-xs font-medium tracking-wide transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#f1e3c4]" />
                  <span>Schedule a Site Visit</span>
                </button>
              </div>
            </div>
          </Beat>

          <Beat p={scrollYProgress} range={[0.26, 0.33, 0.44, 0.52]} className="items-center justify-center text-center">
            <div className="px-6 max-w-2xl">
              <span className="text-[0.68rem] uppercase tracking-[0.35em] text-[#f1e3c4] block mb-2 font-semibold">
                Natural Architecture
              </span>
              <p className="font-display text-[clamp(2rem,3.8vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white [text-shadow:0_4px_30px_rgba(0,0,0,0.7)]">
                Designed around <br />
                <span className="text-[#f1e3c4]">the shifting light.</span>
              </p>
            </div>
          </Beat>

          <Beat p={scrollYProgress} range={[0.56, 0.63, 0.74, 0.82]} className="items-end justify-end text-right">
            <div className="px-6 pb-12 sm:px-12 md:pb-16 lg:px-20 max-w-lg">
              <p className="mb-2 text-[0.68rem] uppercase tracking-[0.35em] text-[#f1e3c4] font-semibold">Private pool lifestyle</p>
              <p className="font-display text-[clamp(1.9rem,3.4vw,3.1rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white [text-shadow:0_4px_30px_rgba(0,0,0,0.7)]">
                Every room opens to the reflecting pool.
              </p>
            </div>
          </Beat>

          <Beat p={scrollYProgress} range={[0.85, 0.92, 0.98, 1]} last className="items-center justify-center text-center">
            <div className="px-6 max-w-xl bg-black/50 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/20">
              <span className="text-[0.68rem] uppercase tracking-[0.35em] text-[#f1e3c4] block mb-2 font-semibold">
                Architectural Excellence
              </span>
              <p className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold leading-tight tracking-[-0.03em] text-white">
                Step inside <span className="text-[#f1e3c4]">{site.project}</span>
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/properties"
                  className="px-7 py-3 rounded-full bg-[#f1e3c4] hover:bg-white text-ink text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer"
                >
                  Explore Active Projects
                </Link>
                <button
                  type="button"
                  onClick={() => setShowVisitModal(true)}
                  className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs font-medium tracking-wide transition-colors cursor-pointer"
                >
                  Schedule a Site Visit
                </button>
              </div>
            </div>
          </Beat>

          {/* Right Rail Frame Tracker */}
          <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex lg:right-10 z-20">
            <span ref={counterRef} className="font-mono text-[0.65rem] tracking-[0.2em] text-white/75 [writing-mode:vertical-rl]">
              001 / {FRAME_COUNT}
            </span>
            <span className="relative h-36 w-px overflow-hidden bg-white/25">
              <motion.span style={{ height: rail }} className="absolute inset-x-0 top-0 bg-[#f1e3c4]" />
            </span>
          </div>

        </div>

        {/* Scroll Indicator */}
        <ScrollCue p={scrollYProgress} />

      </div>

      <SiteVisitModal isOpen={showVisitModal} onClose={() => setShowVisitModal(false)} />
    </section>
  );
}

function Beat({
  p,
  range,
  first = false,
  last = false,
  className = "",
  children,
}: {
  p: MotionValue<number>;
  range: [number, number, number, number];
  first?: boolean;
  last?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  // Clamped opacity transform with zero extrapolation
  const opacity = useTransform(p, (val) => {
    if (val <= range[0]) return first ? 1 : 0;
    if (val < range[1]) {
      const span = range[1] - range[0];
      return first ? 1 : span > 0 ? (val - range[0]) / span : 1;
    }
    if (val <= range[2]) return 1;
    if (val < range[3]) {
      const span = range[3] - range[2];
      return span > 0 ? (range[3] - val) / span : 0;
    }
    return last ? 1 : 0;
  });

  const y = useTransform(p, (val) => {
    if (val <= range[0]) return first ? 0 : 35;
    if (val >= range[3]) return last ? 0 : -35;
    const progress = (val - range[0]) / (range[3] - range[0]);
    return 35 - progress * 70;
  });

  const pointerEvents = useTransform(opacity, (o) => (o > 0.5 ? "auto" : "none"));
  const visibility = useTransform(opacity, (o) => (o > 0.01 ? "visible" : "hidden"));

  return (
    <motion.div
      style={{ opacity, y, visibility }}
      className={`pointer-events-none absolute inset-0 flex [text-shadow:0_2px_32px_rgba(0,0,0,0.6)] ${className}`}
    >
      <motion.div style={{ pointerEvents }} className="w-full">
        {children}
      </motion.div>
    </motion.div>
  );
}

function ScrollCue({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0, 0.06], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 md:flex z-20"
    >
      <span className="text-[0.65rem] uppercase tracking-[0.35em] text-white/80 font-medium">Scroll to fly in</span>
      <span className="relative h-7 w-px overflow-hidden bg-white/30">
        <span className="absolute inset-x-0 top-0 h-2.5 animate-[cue_1.8s_ease-in-out_infinite] bg-[#f1e3c4]" />
      </span>
      <style>{`@keyframes cue{0%{transform:translateY(-100%)}100%{transform:translateY(280%)}}`}</style>
    </motion.div>
  );
}
