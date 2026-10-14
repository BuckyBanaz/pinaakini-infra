"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";
import { site } from "@/lib/site";
import SiteVisitModal from "@/components/SiteVisitModal";
import MobileBottomBar from "@/components/MobileBottomBar";
import {
  MapPin,
  Calendar,
  Phone,
  MessageCircle,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Maximize2,
  Building,
  Check
} from "lucide-react";

interface Props {
  project: Project;
  relatedProjects: Project[];
}

export default function ProjectDetailClient({ project, relatedProjects }: Props) {
  const [activeImage, setActiveImage] = useState(project.featuredImage);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

  // Form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [enquiryType, setEnquiryType] = useState<"Schedule Site Visit" | "Brochure Request" | "Pricing Details">("Schedule Site Visit");
  const [preferredDate, setPreferredDate] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);
  const [honeypot, setHoneypot] = useState("");

  const [formLoading, setFormLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    const cleanPhone = phone.replace(/[\s-]/g, "");
    if (!cleanPhone || cleanPhone.length < 8) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    if (!consent) {
      setErrorMessage("Please consent to receive project communication.");
      return;
    }

    setFormLoading(true);
    setFormStatus("idle");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phoneNumber: phone,
          email,
          projectName: project.name,
          enquiryType,
          preferredDate: enquiryType === "Schedule Site Visit" ? preferredDate : undefined,
          message,
          consent,
          honeypot,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormStatus("success");
      } else {
        setFormStatus("error");
        setErrorMessage(data.error || "Submission failed. Please call our sales desk.");
      }
    } catch {
      setFormStatus("error");
      setErrorMessage("Network error occurred. Please contact us via phone or WhatsApp.");
    } finally {
      setFormLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Pinaakini Infra team, I am interested in ${project.name} located at ${project.location}. Please share the approved layout brochure and pricing details.`
  );
  const whatsappUrl = `https://wa.me/919440289999?text=${whatsappMessage}`;

  return (
    <div className="bg-ivory min-h-screen pt-24 md:pt-32 pb-24">
      {/* 1. Project Hero Header */}
      <section className="px-5 sm:px-8 lg:px-10 max-w-[1440px] mx-auto">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-ink-soft mb-4">
          <Link href="/properties" className="hover:text-forest transition-colors">
            Available Properties
          </Link>
          <span>/</span>
          <span className="text-bronze font-semibold">{project.category}</span>
          <span>/</span>
          <span className="text-ink font-semibold">{project.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-ink/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-sand text-ink border border-ink/10">
                {project.category}
              </span>
              <span
                className={`px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                  project.status === "Now Selling"
                    ? "bg-forest text-white"
                    : project.status === "Coming Soon"
                    ? "bg-amber-600 text-white"
                    : "bg-black/60 text-white"
                }`}
              >
                {project.status}
              </span>
              <span className="text-xs text-bronze font-mono uppercase tracking-wider">
                {project.clearance}
              </span>
            </div>
            <h1 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] font-light leading-none tracking-[-0.02em] text-ink">
              {project.name}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-ink-soft flex items-center gap-2">
              <MapPin className="w-4 h-4 text-bronze shrink-0" />
              <span>{project.location}</span>
            </p>
          </div>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsVisitModalOpen(true)}
              className="px-6 py-3.5 rounded-full bg-forest text-white text-xs font-semibold uppercase tracking-wider hover:bg-forest/90 transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-bronze" />
              <span>Schedule Site Visit</span>
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-[#25D366] text-white text-xs font-semibold tracking-wider hover:opacity-95 transition-opacity flex items-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Primary Media Showcase */}
      <section className="px-5 sm:px-8 lg:px-10 max-w-[1440px] mx-auto mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Visual & Gallery */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-sand border border-ink/10 shadow-lg">
              <Image
                src={activeImage}
                alt={project.name}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                priority
                className="object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 text-white text-xs uppercase font-mono tracking-wider">
                {project.extent} • {project.units}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {project.gallery && project.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {project.gallery.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative w-24 sm:w-28 aspect-[16/10] shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImage === img ? "border-bronze scale-105 shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`${project.name} photo ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Overview Narrative */}
            <div className="pt-6 space-y-4">
              <h2 className="font-display text-3xl font-light text-ink">
                Project Overview & <em className="text-bronze">Architecture</em>
              </h2>
              {project.description.map((p, idx) => (
                <p key={idx} className="text-base leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
            </div>

            {/* Key Highlights */}
            {project.keyHighlights && project.keyHighlights.length > 0 && (
              <div className="pt-8 border-t border-ink/10">
                <h3 className="font-display text-2xl font-light text-ink mb-6">
                  Key Infrastructure Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.keyHighlights.map((hl, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-sand/40 border border-ink/8 space-y-2">
                      <div className="flex items-center gap-2 text-forest">
                        <CheckCircle2 className="w-4 h-4 text-bronze shrink-0" />
                        <h4 className="font-semibold text-sm text-ink">{hl.title}</h4>
                      </div>
                      <p className="text-xs text-ink-soft leading-relaxed pl-6">{hl.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications Table */}
            {project.specifications && project.specifications.length > 0 && (
              <div className="pt-8 border-t border-ink/10">
                <h3 className="font-display text-2xl font-light text-ink mb-6">
                  Technical Specifications & Approvals
                </h3>
                <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <tbody>
                      {project.specifications.map((spec, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-sand/20" : "bg-white"}>
                          <th className="py-3.5 px-5 font-semibold text-ink border-b border-ink/8 w-1/3">
                            {spec.label}
                          </th>
                          <td className="py-3.5 px-5 text-ink-soft border-b border-ink/8 font-mono">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Conditional Video Showcase */}
            {project.videoUrl && (
              <div className="pt-8 border-t border-ink/10">
                <h3 className="font-display text-2xl font-light text-ink mb-4">
                  Cinematic Walkthrough
                </h3>
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg">
                  <iframe
                    src={project.videoUrl}
                    title={`${project.name} video walkthrough`}
                    className="w-full h-full border-0"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Location & Map Section */}
            <div className="pt-8 border-t border-ink/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-2xl font-light text-ink">
                  Location & Connectivity
                </h3>
                {project.mapExternalUrl && (
                  <a
                    href={project.mapExternalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-forest hover:text-bronze flex items-center gap-1 transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
              <p className="text-xs text-ink-soft mb-4">
                Strategically positioned in {project.location} with direct access to arterial corridors and social infrastructure.
              </p>
              {project.mapEmbedUrl ? (
                <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden border border-ink/10 shadow-sm">
                  <iframe
                    src={project.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title={`${project.name} location map`}
                  />
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-sand/30 border border-ink/10 text-center">
                  <MapPin className="w-8 h-8 text-bronze mx-auto mb-2" />
                  <p className="text-sm font-semibold text-ink">{project.location}</p>
                  <p className="text-xs text-ink-soft mt-1">Detailed coordinates and driving directions provided upon request.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Lead Generation & Site Visit Sidebar */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-ink/10 shadow-xl space-y-6">
              <div>
                <span className="text-[0.68rem] uppercase tracking-[0.3em] text-bronze font-semibold block">
                  Direct Enquiry Desk
                </span>
                <h3 className="font-display text-2xl text-ink font-light mt-1">
                  Enquire About {project.name}
                </h3>
                {project.priceGuide && (
                  <p className="text-xs font-mono text-forest mt-1 font-semibold">
                    {project.priceGuide}
                  </p>
                )}
              </div>

              {formStatus === "success" ? (
                <div className="py-6 text-center space-y-3 bg-sand/40 rounded-2xl p-4">
                  <CheckCircle2 className="w-10 h-10 text-forest mx-auto" />
                  <h4 className="font-display text-xl text-ink">Request Submitted</h4>
                  <p className="text-xs text-ink-soft leading-relaxed">
                    Thank you. Our sales representative will connect with you at <strong>{phone}</strong> to coordinate details.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormStatus("idle")}
                    className="mt-2 text-xs font-semibold text-forest underline"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="hp_project"
                      tabIndex={-1}
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {formStatus === "error" && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-[0.72rem] uppercase tracking-wider text-ink font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Suresh Reddy"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-sand/30 border border-ink/15 text-ink text-sm focus:outline-none focus:border-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.72rem] uppercase tracking-wider text-ink font-semibold mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 94402 89999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-sand/30 border border-ink/15 text-ink text-sm focus:outline-none focus:border-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.72rem] uppercase tracking-wider text-ink font-semibold mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-sand/30 border border-ink/15 text-ink text-sm focus:outline-none focus:border-forest"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.72rem] uppercase tracking-wider text-ink font-semibold mb-1">
                      Enquiry Purpose
                    </label>
                    <select
                      value={enquiryType}
                      onChange={(e) => setEnquiryType(e.target.value as typeof enquiryType)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-sand/30 border border-ink/15 text-ink text-sm focus:outline-none focus:border-forest"
                    >
                      <option value="Schedule Site Visit">Schedule Site Visit</option>
                      <option value="Brochure Request">Request Layout Brochure</option>
                      <option value="Pricing Details">Pricing & Availability</option>
                    </select>
                  </div>

                  {enquiryType === "Schedule Site Visit" && (
                    <div>
                      <label className="block text-[0.72rem] uppercase tracking-wider text-ink font-semibold mb-1">
                        Preferred Visit Date
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-sand/30 border border-ink/15 text-ink text-sm focus:outline-none focus:border-forest"
                      />
                    </div>
                  )}

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      id="project-consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-ink/20 text-forest cursor-pointer"
                    />
                    <label htmlFor="project-consent" className="text-[0.72rem] text-ink-soft cursor-pointer">
                      I authorize Pinaakini Infra to share project details, floor plans, and pricing via WhatsApp/call.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full py-3.5 px-6 rounded-full bg-forest text-white text-xs font-semibold uppercase tracking-wider hover:bg-forest/90 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    {formLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Enquiry</span>
                        <ArrowRight className="w-4 h-4 text-bronze" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Direct Instant Channels */}
              <div className="pt-4 border-t border-ink/10 space-y-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#128C7E] hover:text-white text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire via WhatsApp</span>
                </a>

                <a
                  href="tel:+919440289999"
                  className="w-full py-3 px-4 rounded-full bg-sand hover:bg-ink hover:text-white text-ink text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-forest" />
                  <span>Call +91 94402 89999</span>
                </a>
              </div>
            </div>

            {/* Statutory Assurance Badge */}
            <div className="p-5 rounded-2xl bg-sand/40 border border-ink/10 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-forest shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink">
                  Title & Approval Guarantee
                </h4>
                <p className="text-xs text-ink-soft mt-1 leading-relaxed">
                  Every Pinaakini Infra project is backed by comprehensive legal searches, DTCP/NUDA approved layout stamps, and unencumbered marketable titles.
                </p>
              </div>
            </div>
          </aside>

        </div>
      </section>

      {/* 3. Related Projects Catalog */}
      {relatedProjects.length > 0 && (
        <section className="px-5 sm:px-8 lg:px-10 max-w-[1440px] mx-auto mt-28 pt-16 border-t border-ink/10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-[0.68rem] uppercase tracking-[0.3em] text-bronze font-semibold block">
                Related Ventures
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-ink mt-1">
                More Active Developments
              </h2>
            </div>
            <Link
              href="/properties"
              className="text-xs font-semibold uppercase tracking-wider text-forest hover:text-bronze flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((rel) => (
              <Link
                key={rel.id}
                href={`/properties/${rel.slug}`}
                className="group rounded-2xl bg-white border border-ink/10 overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand">
                  <Image
                    src={rel.featuredImage}
                    alt={rel.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-forest text-white uppercase">
                    {rel.status}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[10px] uppercase font-mono text-bronze">{rel.category}</p>
                  <h3 className="font-display text-xl font-bold text-ink mt-0.5">{rel.name}</h3>
                  <p className="text-xs text-ink-soft mt-1 line-clamp-1">{rel.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <SiteVisitModal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
        preselectedProject={project.name}
      />
      <MobileBottomBar onOpenSiteVisit={() => setIsVisitModalOpen(true)} />
    </div>
  );
}
