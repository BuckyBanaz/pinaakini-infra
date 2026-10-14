"use client";

import { useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS } from "@/lib/projects";
import { site } from "@/lib/site";
import type { EnquirySubmission } from "@/types/project";

type EnquiryType = EnquirySubmission["enquiryType"];
const TYPES: EnquiryType[] = ["General Enquiry", "Schedule Site Visit", "Brochure Request", "Pricing Details"];
const EASE = [0.22, 1, 0.36, 1] as const;
const input =
  "h-12 w-full rounded-full border border-ink/20 bg-white px-5 text-[15px] text-ink placeholder:text-ink-soft/70 transition-colors focus:border-ink focus:outline-none";
const label = "mb-2 block text-[13px] text-ink-soft";

// Enquiry form posting to /api/enquiry. Only claims delivery when the API says it was delivered.
export default function EnquiryForm({ project = "General Enquiry", title = "Send an enquiry" }: { project?: string; title?: string }) {
  const id = useId();
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    projectName: project,
    enquiryType: (project === "General Enquiry" ? "General Enquiry" : "Schedule Site Visit") as EnquiryType,
    preferredDate: "",
    message: "",
    consent: true,
    honeypot: "",
  });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "demo" | "error">("idle");
  const [error, setError] = useState("");
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.fullName.trim().length < 2) return setError("Please enter your full name.");
    if (!/^\+?[0-9]{8,15}$/.test(form.phoneNumber.replace(/[\s-]/g, ""))) return setError("Please enter a valid phone number.");
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError("Please enter a valid email address.");
    if (!form.consent) return setError("Please allow us to contact you about your enquiry.");
    setState("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, preferredDate: form.enquiryType === "Schedule Site Visit" ? form.preferredDate : undefined }),
      });
      const data = await res.json();
      if (res.ok && data.success) setState(data.delivered === false ? "demo" : "sent");
      else {
        setState("error");
        setError(data.error || "We could not send your enquiry. Please call or WhatsApp us.");
      }
    } catch {
      setState("error");
      setError(`Network problem. Please call ${site.contact.phone}.`);
    }
  };

  const wa = `${site.contact.whatsappHref}?text=${encodeURIComponent(
    `Hello Pinaakini Infra, I am ${form.fullName || "interested"}. ${form.enquiryType} — ${form.projectName}. ${form.message}`,
  )}`;

  return (
    <div className="rounded-3xl bg-sand p-6 md:p-10">
      <AnimatePresence mode="wait">
        {state === "sent" || state === "demo" ? (
          <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="py-10 text-center">
            <p className="text-[2rem] font-light">{state === "sent" ? "Thank you." : "Almost there."}</p>
            <p className="mx-auto mt-4 max-w-[40ch] text-[15px] leading-[1.8] text-ink-soft">
              {state === "sent"
                ? `Your enquiry has reached our team. We will call you on ${form.phoneNumber} shortly.`
                : "This website is not yet connected to our enquiry inbox, so your message was not sent. Please send it on WhatsApp or call us."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                Send on WhatsApp <span className="btn-arrow">→</span>
              </a>
              <button onClick={() => setState("idle")} className="btn btn-line-dark">
                New enquiry
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2 className="text-[1.8rem] font-normal tracking-[-0.02em]">{title}</h2>
            <p className="mt-2 text-[14px] text-ink-soft">We usually reply within one working day.</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-n`} className={label}>Full name *</label>
                <input id={`${id}-n`} className={input} value={form.fullName} onChange={set("fullName")} autoComplete="name" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor={`${id}-p`} className={label}>Phone *</label>
                <input id={`${id}-p`} type="tel" className={input} value={form.phoneNumber} onChange={set("phoneNumber")} autoComplete="tel" placeholder="+91" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${id}-e`} className={label}>Email (optional)</label>
                <input id={`${id}-e`} type="email" className={input} value={form.email} onChange={set("email")} autoComplete="email" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor={`${id}-pr`} className={label}>Project</label>
                <select id={`${id}-pr`} className={`${input} cursor-pointer`} value={form.projectName} onChange={set("projectName")}>
                  <option>General Enquiry</option>
                  <option>Consultancy enquiry</option>
                  {PROJECTS.filter((p) => p.status !== "Sold Out").map((p) => (
                    <option key={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`${id}-t`} className={label}>I would like</label>
                <select id={`${id}-t`} className={`${input} cursor-pointer`} value={form.enquiryType} onChange={set("enquiryType")}>
                  {TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <AnimatePresence>
                {form.enquiryType === "Schedule Site Visit" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="sm:col-span-2">
                    <label htmlFor={`${id}-d`} className={label}>Preferred date</label>
                    <input id={`${id}-d`} type="date" className={input} value={form.preferredDate} onChange={set("preferredDate")} />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="sm:col-span-2">
                <label htmlFor={`${id}-m`} className={label}>Message (optional)</label>
                <textarea
                  id={`${id}-m`}
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-ink/20 bg-white px-5 py-4 text-[15px] focus:border-ink focus:outline-none"
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell us what you are looking for"
                />
              </div>
              <input type="text" tabIndex={-1} autoComplete="off" value={form.honeypot} onChange={set("honeypot")} className="hidden" aria-hidden />
            </div>
            <label className="mt-6 flex cursor-pointer items-start gap-3 text-[13px] leading-[1.6] text-ink-soft">
              <input type="checkbox" checked={form.consent} onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))} className="mt-0.5 h-4 w-4 accent-[#1c1b1a]" />
              I agree to be contacted by Pinaakini Infra by phone, WhatsApp or email about this enquiry.
            </label>
            {error && (
              <p role="alert" className="mt-4 text-[14px] text-[#b42318]">
                {error}
              </p>
            )}
            <button type="submit" disabled={state === "sending"} className="btn btn-dark mt-8 disabled:opacity-60">
              {state === "sending" ? "Sending…" : "Send enquiry"}
              <span className="btn-arrow">→</span>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
