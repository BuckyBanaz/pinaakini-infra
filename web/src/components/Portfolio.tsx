"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { PROJECTS } from "@/lib/projects";
import { Project } from "@/types/project";
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowRight,
  Compass, 
  CheckCircle2, 
  Trees, 
  Sparkles, 
  Phone, 
  X,
  Calendar,
  MessageCircle
} from "lucide-react";
import SiteVisitModal from "./SiteVisitModal";

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Show top featured or active projects on homepage
  const displayProjects = PROJECTS.filter((p) => {
    if (activeTab === "All") return true;
    if (activeTab === "Villas") return p.category === "Villas";
    if (activeTab === "Layouts") return p.category === "Layouts";
    if (activeTab === "Farmlands") return p.category === "Farmlands";
    return true;
  }).slice(0, 6);

  return (
    <section id="portfolio" className="relative bg-sand/40 py-24 md:py-36 border-t border-ink/10">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <Reveal>
            <p className="flex items-center gap-4 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-bronze">
              <span className="h-px w-10 bg-bronze/60" />
              Pinaakini Developments
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,6vw,5.6rem)] font-light leading-none tracking-[-0.01em] text-ink">
              Featured <em className="text-bronze">developments</em>
            </h2>
          </Reveal>

          {/* Filter Pills */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-2">
              {["All", "Villas", "Layouts", "Farmlands"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-ink text-ivory shadow-md"
                      : "bg-white/80 hover:bg-white text-ink border border-ink/10"
                  }`}
                >
                  {tab === "All" ? `All Ventures (${PROJECTS.length})` : tab}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {displayProjects.map((project, idx) => (
              <motion.article
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative flex flex-col rounded-2xl bg-white border border-ink/10 overflow-hidden shadow-sm hover:shadow-xl hover:border-bronze/40 transition-all duration-500 cursor-pointer"
              >
                {/* Image & Status Badge */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-sand">
                  <Image
                    src={project.featuredImage}
                    alt={project.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Status and Category Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md bg-white/20 text-white border border-white/20">
                      {project.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md shadow-xs ${
                        project.status === "Now Selling"
                          ? "bg-forest text-white"
                          : project.status === "Coming Soon"
                          ? "bg-amber-600 text-white"
                          : "bg-black/60 text-white/90"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1.5 text-xs text-white/80 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#f1e3c4]" />
                      <span className="truncate">{project.location}</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white line-clamp-1">
                      {project.name}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-ink-soft line-clamp-2 leading-relaxed">
                    {project.tagline}
                  </p>

                  <div className="grid grid-cols-2 gap-2 py-3 my-4 border-y border-ink/10 text-xs bg-sand/30 rounded-lg text-center">
                    <div>
                      <span className="text-[10px] text-ink-soft uppercase block font-semibold">Extent</span>
                      <span className="font-bold text-ink">{project.extent}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-ink-soft uppercase block font-semibold">Clearances</span>
                      <span className="font-bold text-bronze truncate block">{project.clearance.split(" ")[0]}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-ink font-semibold group-hover:text-bronze transition-colors flex items-center gap-1">
                      <span>{project.isActive ? "View Details & Plans" : "View Overview"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[10px] uppercase font-mono text-ink-soft">{project.units}</span>
                  </div>
                </div>

              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects Portfolio Banner */}
        <div className="mt-16 pt-8 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-2xl text-ink font-light">
              Explore all 15 ventures in our master catalog.
            </p>
            <p className="text-xs text-ink-soft mt-1">
              Plotted layouts, signature villas, triplex homes, and agro-farmlands across Nellore.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="px-8 py-3.5 rounded-full bg-ink text-ivory hover:bg-forest text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
          >
            <span>View Complete Portfolio (15)</span>
            <ArrowRight className="w-4 h-4 text-bronze" />
          </Link>
        </div>

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-ink/10 my-8"
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                className="absolute top-5 right-5 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative h-72 w-full">
                <Image
                  src={selectedProject.featuredImage}
                  alt={selectedProject.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-[#f1e3c4] font-semibold block mb-1">
                    {selectedProject.clearance}
                  </span>
                  <h3 className="font-display text-3xl font-bold">{selectedProject.name}</h3>
                  <p className="text-xs text-white/80 mt-1">{selectedProject.location}</p>
                </div>
              </div>

              <div className="p-8 space-y-4">
                <p className="text-sm text-ink-soft leading-relaxed">
                  {selectedProject.shortDescription}
                </p>

                <div className="grid grid-cols-3 gap-3 p-4 bg-sand/40 rounded-xl border border-ink/8 text-center text-xs">
                  <div>
                    <span className="text-ink-soft block text-[10px] uppercase">Extent</span>
                    <span className="font-bold text-ink text-sm">{selectedProject.extent}</span>
                  </div>
                  <div className="border-x border-ink/10">
                    <span className="text-ink-soft block text-[10px] uppercase">Availability</span>
                    <span className="font-bold text-bronze text-sm">{selectedProject.status}</span>
                  </div>
                  <div>
                    <span className="text-ink-soft block text-[10px] uppercase">Scale</span>
                    <span className="font-bold text-ink text-sm">{selectedProject.units}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  {selectedProject.isActive ? (
                    <Link
                      href={`/properties/${selectedProject.slug}`}
                      className="flex-1 py-3 px-6 rounded-full bg-forest text-white hover:bg-forest/90 text-xs font-semibold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Explore Dedicated Project Page</span>
                      <ArrowRight className="w-4 h-4 text-bronze" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProject(null);
                        setModalOpen(true);
                      }}
                      className="flex-1 py-3 px-6 rounded-full bg-ink hover:bg-forest text-ivory text-xs font-semibold uppercase tracking-wider text-center transition-colors"
                    >
                      Enquire on Similar Projects
                    </button>
                  )}

                  <a
                    href={`https://wa.me/919440289999?text=${encodeURIComponent(
                      `Hello Pinaakini Infra, I would like more details about ${selectedProject.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-6 rounded-full bg-[#25D366] text-white text-xs font-semibold tracking-wider text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <SiteVisitModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
