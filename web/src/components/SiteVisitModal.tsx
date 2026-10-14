"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Phone, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import { PROJECTS } from "@/lib/projects";

interface SiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProject?: string;
}

export default function SiteVisitModal({
  isOpen,
  onClose,
  preselectedProject = "AVARIA Signature Villa",
}: SiteVisitModalProps) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState(preselectedProject);
  const [preferredDate, setPreferredDate] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);
  const [honeypot, setHoneypot] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [delivered, setDelivered] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (preselectedProject) {
      setProject(preselectedProject);
    }
  }, [preselectedProject]);

  useEffect(() => {
    if (!isOpen) {
      setStatus("idle");
      setErrorMessage("");
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    const cleanPhone = phoneNumber.replace(/[\s-]/g, "");
    if (!cleanPhone || cleanPhone.length < 8) {
      setErrorMessage("Please enter a valid contact phone number.");
      return;
    }

    if (!consent) {
      setErrorMessage("Please check the consent box to proceed.");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phoneNumber,
          email,
          projectName: project,
          enquiryType: "Schedule Site Visit",
          preferredDate,
          message,
          consent,
          honeypot,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setDelivered(data.delivered !== false);
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Unable to submit your request. Please try calling or WhatsApp directly.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred. Please call our desk at +91 94402 89999.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappUrl = `https://wa.me/919440289999?text=${encodeURIComponent(
    `Hello Pinaakini Infra team, I would like to schedule a private site visit for ${project}. Please get in touch with me.`
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl rounded-3xl bg-ivory p-6 sm:p-10 shadow-2xl border border-ink/10 z-10 my-8 overflow-hidden"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute right-5 top-5 p-2 rounded-full bg-sand hover:bg-ink/10 text-ink transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {status === "success" ? (
              <div className="py-8 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-forest/10 text-forest mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl text-ink font-light">
                  {delivered ? "Site visit requested" : "Almost there"}
                </h3>
                <p className="text-ink-soft text-sm max-w-md mx-auto leading-relaxed">
                  {delivered ? (
                    <>
                      Thank you, <strong className="text-ink">{fullName}</strong>. Our team will call you at{" "}
                      <strong className="text-ink">{phoneNumber}</strong> to fix a time for your visit to{" "}
                      <strong className="text-ink">{project}</strong>.
                    </>
                  ) : (
                    <>
                      This website is not yet connected to our enquiry inbox, so your request was not sent. Please send it
                      on WhatsApp or call <strong className="text-ink">{site.contact.phone}</strong>.
                    </>
                  )}
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <span>Instant WhatsApp Update</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-sand text-ink text-xs font-semibold uppercase tracking-wider hover:bg-ink/10 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="pr-8 mb-6">
                  <span className="text-[0.68rem] uppercase tracking-[0.3em] text-bronze font-semibold block">
                    Pinaakini Infra Concierge
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-ink font-light mt-1">
                    Schedule a Private Site Visit
                  </h3>
                  <p className="text-xs text-ink-soft mt-1.5 leading-relaxed">
                    Complimentary VIP transportation from Nellore town center with certified engineering walkthrough.
                  </p>
                </div>

                {status === "error" && (
                  <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field for bot spam prevention */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="hp_field"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="modal-name" className="block text-[0.72rem] uppercase tracking-wider text-ink font-semibold mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="modal-name"
                        type="text"
                        required
                        placeholder="e.g. Rajesh Kumar"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-ink/15 text-ink text-sm focus:outline-none focus:border-forest transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="modal-phone" className="block text-[0.72rem] uppercase tracking-wider text-ink font-semibold mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="modal-phone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-ink/15 text-ink text-sm focus:outline-none focus:border-forest transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project and Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="modal-project" className="block text-[0.72rem] uppercase tracking-wider text-ink font-semibold mb-1">
                        Project of Interest
                      </label>
                      <select
                        id="modal-project"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-ink/15 text-ink text-sm focus:outline-none focus:border-forest transition-colors"
                      >
                        {PROJECTS.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name} ({p.status})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="modal-date" className="block text-[0.72rem] uppercase tracking-wider text-ink font-semibold mb-1">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <input
                          id="modal-date"
                          type="date"
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-ink/15 text-ink text-sm focus:outline-none focus:border-forest transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Optional Email */}
                  <div>
                    <label htmlFor="modal-email" className="block text-[0.72rem] uppercase tracking-wider text-ink font-semibold mb-1">
                      Email Address <span className="text-ink-soft text-[0.65rem] lowercase">(optional)</span>
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-ink/15 text-ink text-sm focus:outline-none focus:border-forest transition-colors"
                    />
                  </div>

                  {/* Consent */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      id="modal-consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-ink/20 text-forest focus:ring-forest cursor-pointer"
                    />
                    <label htmlFor="modal-consent" className="text-xs text-ink-soft leading-relaxed cursor-pointer">
                      I agree to receive project floor plans, site location coordinates, and visit coordination from Pinaakini Infra.
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:flex-1 py-3 px-6 rounded-full bg-forest text-white text-xs font-semibold uppercase tracking-wider hover:bg-forest/90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Booking...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm Site Visit</span>
                          <Calendar className="w-4 h-4 text-bronze" />
                        </>
                      )}
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto py-3 px-5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>WhatsApp Directly</span>
                    </a>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
