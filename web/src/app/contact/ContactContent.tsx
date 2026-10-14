"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Kicker, Rise, SplitHeading } from "@/components/home/motion";
import { PROJECTS } from "@/lib/projects";
import { site } from "@/lib/site";
import type { EnquirySubmission } from "@/types/project";

type EnquiryType = EnquirySubmission["enquiryType"];
const TYPES: EnquiryType[] = ["General Enquiry", "Schedule Site Visit", "Brochure Request", "Pricing Details"];
const EASE = [0.22, 1, 0.36, 1] as const;

const field =
  "peer h-14 w-full border-0 border-b border-ink/20 bg-transparent px-0 pt-4 text-[16px] text-ink placeholder-transparent transition-colors focus:border-ink focus:outline-none focus:ring-0";
const label =
  "pointer-events-none absolute left-0 top-0 text-[12px] uppercase tracking-[0.18em] text-ink-soft transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-[15px] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-0 peer-focus:text-[12px] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-gold-deep";

export default function ContactContent() {
  const { contact } = site;
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    projectName: "General Enquiry",
    enquiryType: "General Enquiry" as EnquiryType,
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
    const phone = form.phoneNumber.replace(/[\s-]/g, "");
    if (!/^\+?[0-9]{8,15}$/.test(phone)) return setError("Please enter a valid phone number.");
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
      setError(`Network problem. Please call ${contact.phone}.`);
    }
  };

  const details = [
    { k: "Call", v: contact.phone, href: contact.phoneHref },
    { k: "WhatsApp", v: "Chat with our team", href: contact.whatsappHref, ext: true },
    { k: "Email", v: contact.email, href: `mailto:${contact.email}` },
    { k: "Office", v: contact.address, href: contact.mapsUrl, ext: true },
    { k: "Hours", v: contact.workingHours },
  ];

  return (
    <>
      <section className="grid gap-20 bg-ivory px-[var(--margin)] py-24 md:py-32 lg:grid-cols-12 lg:gap-10">
        {/* details */}
        <div className="lg:col-span-5">
          <Rise>
            <Kicker>Reach us</Kicker>
          </Rise>
          <SplitHeading text="We would love to show you around" className="t-head mt-6 max-w-[13ch]" />
          <ul className="m-0 mt-14 list-none p-0">
            {details.map((d, i) => (
              <motion.li
                key={d.k}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
                className="grid grid-cols-[110px_1fr] gap-4 border-t border-ink/10 py-6 last:border-b"
              >
                <span className="t-kicker pt-1 text-[10px] text-gold-deep">{d.k}</span>
                {d.href ? (
                  <a
                    href={d.href}
                    {...(d.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group text-[17px] leading-[1.6] transition-colors hover:text-gold-deep"
                  >
                    {d.v}
                    <span aria-hidden className="ml-2 inline-block opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">→</span>
                  </a>
                ) : (
                  <span className="text-[17px] leading-[1.6]">{d.v}</span>
                )}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* form */}
        <Rise delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <div className="bg-paper p-8 md:p-14">
            <AnimatePresence mode="wait">
              {state === "sent" || state === "demo" ? (
                <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="py-10 text-center">
                  <p className="font-display text-[3rem] font-light leading-none">{state === "sent" ? "Thank you." : "Almost there."}</p>
                  <p className="mx-auto mt-6 max-w-[40ch] text-[16px] font-light leading-[1.8] text-ink-soft">
                    {state === "sent"
                      ? `Your enquiry has reached our team. We will call you on ${form.phoneNumber} shortly.`
                      : "This website is not yet connected to our enquiry inbox, so your message was not sent. Please send it on WhatsApp or call us."}
                  </p>
                  <div className="mt-10 flex flex-wrap justify-center gap-3">
                    <a
                      href={`${contact.whatsappHref}?text=${encodeURIComponent(`Hello Pinaakini Infra, I am ${form.fullName}. ${form.enquiryType} — ${form.projectName}. ${form.message}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-gold"
                    >
                      Send on WhatsApp
                    </a>
                    <button onClick={() => setState("idle")} className="btn btn-line-dark">
                      New enquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 className="font-display text-[2.4rem] font-light leading-none">Send an enquiry</h2>
                  <p className="mt-3 text-[15px] font-light text-ink-soft">We usually reply within one working day.</p>

                  <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                    <div className="relative">
                      <input id="fullName" className={field} placeholder="Full name" value={form.fullName} onChange={set("fullName")} autoComplete="name" required />
                      <label htmlFor="fullName" className={label}>Full name *</label>
                    </div>
                    <div className="relative">
                      <input id="phone" type="tel" className={field} placeholder="Phone" value={form.phoneNumber} onChange={set("phoneNumber")} autoComplete="tel" required />
                      <label htmlFor="phone" className={label}>Phone *</label>
                    </div>
                    <div className="relative sm:col-span-2">
                      <input id="email" type="email" className={field} placeholder="Email" value={form.email} onChange={set("email")} autoComplete="email" />
                      <label htmlFor="email" className={label}>Email (optional)</label>
                    </div>
                    <div>
                      <label htmlFor="project" className="text-[12px] uppercase tracking-[0.18em] text-ink-soft">Project</label>
                      <select id="project" value={form.projectName} onChange={set("projectName")} className="mt-2 h-12 w-full cursor-pointer border-0 border-b border-ink/20 bg-transparent px-0 text-[16px] focus:border-ink focus:outline-none focus:ring-0">
                        <option>General Enquiry</option>
                        {PROJECTS.filter((p) => p.status !== "Sold Out").map((p) => (
                          <option key={p.id}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="etype" className="text-[12px] uppercase tracking-[0.18em] text-ink-soft">I would like</label>
                      <select id="etype" value={form.enquiryType} onChange={set("enquiryType")} className="mt-2 h-12 w-full cursor-pointer border-0 border-b border-ink/20 bg-transparent px-0 text-[16px] focus:border-ink focus:outline-none focus:ring-0">
                        {TYPES.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <AnimatePresence>
                      {form.enquiryType === "Schedule Site Visit" && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="sm:col-span-2">
                          <label htmlFor="date" className="text-[12px] uppercase tracking-[0.18em] text-ink-soft">Preferred date</label>
                          <input id="date" type="date" value={form.preferredDate} onChange={set("preferredDate")} className="mt-2 h-12 w-full border-0 border-b border-ink/20 bg-transparent px-0 text-[16px] focus:border-ink focus:outline-none focus:ring-0" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div className="relative sm:col-span-2">
                      <textarea id="msg" rows={3} className={`${field} h-auto resize-none pt-6`} placeholder="Message" value={form.message} onChange={set("message")} />
                      <label htmlFor="msg" className={label}>Message (optional)</label>
                    </div>
                    {/* spam trap */}
                    <input type="text" tabIndex={-1} autoComplete="off" value={form.honeypot} onChange={set("honeypot")} className="hidden" aria-hidden />
                  </div>

                  <label className="mt-8 flex cursor-pointer items-start gap-3 text-[14px] font-light leading-[1.6] text-ink-soft">
                    <input type="checkbox" checked={form.consent} onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))} className="mt-1 h-4 w-4 accent-[#141414]" />
                    I agree to be contacted by Pinaakini Infra by phone, WhatsApp or email about this enquiry.
                  </label>

                  {error && (
                    <p role="alert" className="mt-6 text-[14px] text-[#9b2c2c]">
                      {error}
                    </p>
                  )}

                  <button type="submit" disabled={state === "sending"} className="btn btn-dark mt-10 w-full disabled:opacity-60 sm:w-auto">
                    {state === "sending" ? "Sending…" : "Send enquiry"}
                    <span aria-hidden>→</span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Rise>
      </section>

      {/* map */}
      <section aria-label="Map" className="relative h-[70vh] bg-stone">
        <iframe
          title="Pinaakini Infra office on the map"
          src={`https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0 grayscale-[0.85] contrast-[1.05]"
        />
        <div className="pointer-events-none absolute inset-x-[var(--margin)] bottom-8 md:inset-x-auto md:left-[var(--margin)]">
          <div className="pointer-events-auto max-w-sm bg-obsidian p-8 text-white">
            <p className="t-kicker text-[10px] text-gold">Corporate office</p>
            <p className="mt-4 text-[15px] font-light leading-[1.7] text-white/85">{contact.address}</p>
            <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="t-kicker mt-6 inline-flex items-center gap-3 text-[11px] text-gold hover:text-white">
              Open in Google Maps <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
