"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { site } from "@/lib/site";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";

export default function Spaces() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const total = site.spaces.length;

  const nextSlide = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextSlide, prevSlide]);

  const currentSpace = site.spaces[activeIdx];

  return (
    <section 
      id="amenities" 
      className="relative overflow-hidden bg-ivory py-24 md:py-36 border-t border-ink/10 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Synchronized Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 transition-all duration-1000">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px]"
          style={{
            backgroundImage: `radial-gradient(circle, #c6ae82 0%, #171b19 80%)`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        
        {/* Header Strip */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end mb-16">
          <Reveal>
            <p className="flex items-center gap-4 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-bronze">
              <span className="h-px w-10 bg-bronze/60" />
              Living Environments
            </p>
            <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(2.6rem,6vw,5.6rem)] font-light leading-[0.98] tracking-[-0.01em] text-ink">
              Spaces made to be <em className="text-bronze">lived in</em>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="flex items-center gap-6">
            <span className="font-mono text-xs tracking-[0.2em] text-ink-soft" aria-live="polite">
              {String(activeIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-ink/20 text-ink transition-all hover:bg-ink hover:text-ivory active:scale-95 shadow-sm"
                aria-label="Previous room"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-ink/20 text-ink transition-all hover:bg-ink hover:text-ivory active:scale-95 shadow-sm"
                aria-label="Next room"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </Reveal>
        </div>

        {/* 3D Coverflow Viewport Container */}
        <div 
          className="relative h-[480px] sm:h-[540px] w-full [perspective:1400px] flex items-center justify-center overflow-visible"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const diff = touchStartX.current - e.changedTouches[0].clientX;
            if (diff > 40) nextSlide();
            if (diff < -40) prevSlide();
          }}
        >
          {site.spaces.map((space, idx) => {
            // Distance from active slide (-1, 0, 1, etc.)
            let offset = idx - activeIdx;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // Compute 3D Coverflow transform values
            const xPercent = offset * 55;
            const rotateY = offset * -32;
            const scale = isCenter ? 1 : 0.85;
            const zIndex = 20 - Math.abs(offset) * 5;
            const opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.75 : 0.35;

            return (
              <motion.div
                key={space.title}
                onClick={() => setActiveIdx(idx)}
                className={`absolute w-[82vw] max-w-[460px] h-[430px] sm:h-[480px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isCenter ? "ring-2 ring-bronze shadow-[0_20px_60px_rgba(23,27,25,0.2)]" : ""
                }`}
                style={{
                  transform: `translateX(${xPercent}%) scale(${scale}) rotateY(${rotateY}deg)`,
                  zIndex,
                  opacity,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="relative w-full h-full bg-stone-900 overflow-hidden">
                  <Image
                    src={space.image}
                    alt={space.title}
                    fill
                    sizes="(min-width: 640px) 460px, 82vw"
                    className="object-cover"
                    priority={isCenter}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Card Overlay Info */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <span className="font-mono text-xs tracking-[0.2em] text-[#f1e3c4] block mb-1">
                      SPACE 0{idx + 1}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-light text-white leading-tight">
                      {space.title}
                    </h3>
                    <p className={`mt-2 text-xs sm:text-sm text-white/85 leading-relaxed transition-opacity duration-300 ${
                      isCenter ? "opacity-100" : "opacity-0"
                    }`}>
                      {space.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Room Navigation Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {site.spaces.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                activeIdx === i ? "w-8 bg-bronze" : "w-2 bg-ink/20 hover:bg-ink/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
