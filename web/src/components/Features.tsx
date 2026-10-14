"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { site } from "@/lib/site";
import { 
  Compass, 
  Layers, 
  RotateCw, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles, 
  Maximize2, 
  Box, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

interface FeatureDetail {
  zone: string;
  specs: string[];
  dimensions: string;
  finishes: string;
  tag: string;
}

const FEATURE_SPECS: Record<string, FeatureDetail> = {
  "4BR + Maid Room Villa": {
    zone: "Upper Living & Sanctuary",
    tag: "Upper Level",
    specs: [
      "4 En-suite Master Suites with private walk-in wardrobes",
      "Dedicated Maid Quarters with independent bath & access",
      "Acoustically insulated partition masonry with double glazed glass",
      "Glazed terrace framing sunrise over landscape",
    ],
    dimensions: "Master: 28' x 20' | Guest: 22' x 18'",
    finishes: "Natural French Oak & Calacatta Marble",
  },
  "Private Pool Lifestyle": {
    zone: "Aquatic Reflecting Terrace",
    tag: "Ground Terrace",
    specs: [
      "25-meter infinity-edge reflecting pool along primary lounge",
      "Integrated hydrotherapy spa heated jacuzzi bench",
      "Thermal non-slip limestone sunbathing deck",
      "Submerged fibre-optic architectural night illumination",
    ],
    dimensions: "Pool: 82ft x 16ft | Depth: 4.5ft to 6ft",
    finishes: "Handcrafted Bali Sukabumi Green Stone",
  },
  "Modern Kitchen": {
    zone: "Culinary & Dining Suite",
    tag: "Ground Floor",
    specs: [
      "Exhibition island kitchen opening directly onto pool terrace",
      "Integrated German Miele & Gaggenau culinary appliances",
      "Solid waterfall quartzite counter & concealed chef pantry",
      "Temperature-controlled 120-bottle architectural wine display",
    ],
    dimensions: "Kitchen & Dining: 34' x 22'",
    finishes: "Matte Anthracite & Brushed Champagne Brass",
  },
  "Bright Open Interiors": {
    zone: "Grand Atrium & Living Volume",
    tag: "14ft Clear Volume",
    specs: [
      "Floor-to-ceiling 3.8m curtain walls with concealed frames",
      "Double glazed UV solar reflective low-E architectural glass",
      "Motorised acoustic blackout and natural linen sheer drapery",
      "Seamless indoor-to-outdoor travertine slab transition",
    ],
    dimensions: "Grand Volume: 42' x 28' (14ft ceiling)",
    finishes: "Honed Roman Travertine Stone Slabs",
  },
};

export default function Features() {
  return (
    <section id="villa" className="relative bg-[#F4F1EA] px-5 py-24 sm:px-8 md:py-36 lg:px-10 overflow-hidden border-t border-ink/8">
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#171B19 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-[1440px]">
        {/* Editorial Section Header */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end mb-16">
          <Reveal>
            <div className="flex items-center gap-4 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-bronze">
              <span className="h-px w-10 bg-bronze/60" />
              <span>Architectural Specification • AVARIA Villa</span>
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,6vw,5.6rem)] font-light leading-none tracking-[-0.01em] text-ink">
              Residence <em className="text-bronze">features</em>
            </h2>
          </Reveal>
          
          <Reveal delay={0.1}>
            <div className="max-w-md">
              <p className="text-[0.95rem] leading-[1.8] text-ink-soft">
                Explore the volumetric proportions and bespoke material palette. Select <strong className="text-ink font-semibold">Blueprint Specs</strong> on any card to inspect technical engineering tolerances.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Professional 3D Flip Card Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {site.features.map((f, i) => {
            const detail = FEATURE_SPECS[f.title] || {
              zone: "Bespoke Spatial Volume",
              tag: "Signature Space",
              specs: [
                "Engineered with premium structural tolerances",
                "Custom architectural millwork and integrated lighting",
                "High thermal and acoustic dampening performance",
              ],
              dimensions: "Generous Floor Plan",
              finishes: "Roman Travertine & French Oak",
            };

            return (
              <Reveal key={f.title} delay={i * 0.1}>
                <LuxuryArchitecturalCard
                  index={i}
                  title={f.title}
                  text={f.text}
                  image={f.image}
                  alt={f.alt}
                  detail={detail}
                />
              </Reveal>
            );
          })}
        </div>

        {/* Bottom Specification Guarantee Banner */}
        <div className="mt-16 pt-8 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-soft">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-forest" />
            <span>All architectural elevations and specifications conform to sanctioned structural engineering drawings.</span>
          </div>
          <a
            href="#faq"
            className="text-forest hover:text-bronze font-semibold flex items-center gap-1 transition-colors"
          >
            <span>Have custom interior questions? Review FAQ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function LuxuryArchitecturalCard({
  index,
  title,
  text,
  image,
  alt,
  detail,
}: {
  index: number;
  title: string;
  text: string;
  image: string;
  alt: string;
  detail: FeatureDetail;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, scale: 1 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // Subtle, buttery-smooth damping
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) * 6;

    setTilt({ rotX, rotY, scale: 1.015 });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.12,
    });
  };

  const onMouseLeave = () => {
    setTilt({ rotX: 0, rotY: 0, scale: 1 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative h-[530px] w-full [perspective:1400px] select-none group"
    >
      {/* 3D Transform Container */}
      <div
        className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-3xl"
        style={{
          transform: isFlipped
            ? "rotateY(180deg)"
            : `rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale3d(${tilt.scale}, ${tilt.scale}, ${tilt.scale})`,
        }}
      >
        {/* ========================================================= */}
        {/* CARD FRONT — LUXURY ARCHITECTURAL ELEVATION               */}
        {/* ========================================================= */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-3xl border border-ink/10 shadow-[0_12px_40px_rgba(23,27,25,0.06)] overflow-hidden flex flex-col justify-between group-hover:border-bronze/40 group-hover:shadow-[0_20px_50px_rgba(23,27,25,0.12)] transition-all duration-500">
          
          {/* Top Photography Area */}
          <div className="relative aspect-[16/11] w-full overflow-hidden bg-sand">
            <Image
              src={image}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108"
            />
            {/* Smooth architectural gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Top Bar: Zone Badge & Index */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md bg-white/20 text-white border border-white/25">
                {detail.tag}
              </span>
              <span className="font-mono text-[11px] tracking-widest text-[#f1e3c4] font-semibold">
                0{index + 1} / 04
              </span>
            </div>

            {/* Bottom-right Blueprint Trigger */}
            <button
              type="button"
              onClick={() => setIsFlipped(true)}
              className="absolute bottom-3.5 right-3.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-ink text-[11px] font-semibold tracking-wide backdrop-blur-md shadow-lg flex items-center gap-1.5 transition-transform duration-200 hover:scale-105 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-bronze" />
              <span>Blueprint Specs</span>
            </button>
          </div>

          {/* Bottom Editorial Content */}
          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="font-display text-[1.65rem] leading-tight text-ink group-hover:text-forest transition-colors">
                {title}
              </h3>
              <p className="mt-2 text-xs text-ink-soft leading-relaxed line-clamp-3">
                {text}
              </p>
            </div>

            {/* Architecture Metrics Pill */}
            <div className="space-y-3 pt-3 border-t border-ink/8">
              <div className="flex items-center justify-between text-xs bg-sand/40 rounded-xl px-3 py-2 border border-ink/5">
                <span className="text-[10px] uppercase font-mono text-ink-soft font-semibold">Finish</span>
                <span className="text-[11px] font-medium text-bronze truncate max-w-[170px] text-right">
                  {detail.finishes.split("&")[0]}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsFlipped(true)}
                className="w-full text-xs font-semibold text-ink group-hover:text-forest flex items-center justify-between pt-1 cursor-pointer"
              >
                <span>Inspect Technical Dossier</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-bronze transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Dynamic Light Sheen overlay */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 65%)`,
            }}
          />
        </div>

        {/* ========================================================= */}
        {/* CARD BACK — ARCHITECTURAL BLUEPRINT & TECHNICAL DOSSIER    */}
        {/* ========================================================= */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#102B24] text-white rounded-3xl border border-[#c6ae82]/40 p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
          
          {/* Subtle blueprint grid overlay */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#c6ae82 1px, transparent 1px), linear-gradient(90deg, #c6ae82 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative z-10">
            {/* Dossier Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/15">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#f1e3c4] block">
                  Blueprint Specification
                </span>
                <h4 className="font-display text-xl font-normal text-white mt-0.5">
                  {title}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setIsFlipped(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#f1e3c4] transition-colors cursor-pointer"
                title="Return to elevation view"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            {/* Engineering Clearances List */}
            <div className="mt-4 space-y-2.5">
              <span className="text-[10px] uppercase font-mono tracking-wider text-white/60 block">
                Engineering Clearances
              </span>
              <ul className="space-y-2 text-xs text-white/90">
                {detail.specs.map((spec, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#f1e3c4] shrink-0 mt-0.5" />
                    <span className="leading-snug">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Volumetric Dimensions Box */}
          <div className="relative z-10 pt-4">
            <div className="p-3.5 rounded-2xl bg-black/30 border border-white/15 text-xs space-y-1.5 backdrop-blur-md">
              <div className="flex justify-between items-center">
                <span className="text-white/60 text-[10px] uppercase font-mono">Dimensions</span>
                <span className="font-semibold text-[#f1e3c4] font-mono text-[11px]">{detail.dimensions}</span>
              </div>
              <div className="flex justify-between items-center border-t border-white/10 pt-1.5">
                <span className="text-white/60 text-[10px] uppercase font-mono">Materials</span>
                <span className="font-medium text-white text-[11px] truncate max-w-[170px]">{detail.finishes}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsFlipped(false)}
              className="mt-3.5 w-full py-2.5 rounded-full bg-[#f1e3c4] text-[#102B24] hover:bg-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>Return to Elevation</span>
              <RotateCw className="w-3 h-3 text-[#102B24]" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
