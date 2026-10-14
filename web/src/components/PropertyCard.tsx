"use client";

import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { openVisit } from "@/lib/visit";
import type { Project } from "@/types/project";

export type Offer = "Buy" | "Rent";

export const offersOf = (p: Project): Offer[] => p.offer ?? ["Buy"];

/** Is this project currently on the market for the given offer? */
export const isAvailable = (p: Project, offer: Offer) =>
  offersOf(p).includes(offer) &&
  (offer === "Rent" ? p.status !== "Coming Soon" : p.status === "Now Selling" || p.status === "Coming Soon");

export default function PropertyCard({ p, offer = "Buy", tall = false }: { p: Project; offer?: Offer; tall?: boolean }) {
  const href = p.isActive ? `/properties/${p.slug}` : "/portfolio";
  const soldOut = p.status === "Sold Out";
  const wa = `${site.contact.whatsappHref}?text=${encodeURIComponent(
    `Hello Pinaakini Infra, I am interested in ${p.name} (${offer === "Rent" ? "to rent" : "to buy"}). Please share details.`,
  )}`;
  return (
    <article className="group">
      <Link href={href} className={`relative block overflow-hidden bg-stone ${tall ? "aspect-[3/4]" : "aspect-[4/5]"}`}>
        <Image
          src={p.featuredImage}
          alt={`${p.name}, ${p.location}`}
          fill
          quality={90}
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.4s] ease-(--ease-lux) group-hover:scale-[1.06]"
        />
        <span aria-hidden className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/20" />
        <span className="t-kicker absolute left-4 top-4 bg-paper px-3 py-2 text-[10px] text-ink">
          {offer === "Rent" ? "For rent" : p.status}
        </span>
        <span className="t-kicker absolute bottom-4 left-4 translate-y-3 bg-gold px-4 py-2.5 text-[10px] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {p.isActive ? "View property →" : "See in portfolio →"}
        </span>
      </Link>
      <div className="pt-6">
        <p className="t-kicker text-[10px] text-gold-deep">
          {p.category} · {p.location.split(",")[0]}
        </p>
        <h3 className="mt-3 font-display text-[2rem] font-normal leading-[1.05]">
          <Link href={href} className="transition-colors hover:text-gold-deep">
            {p.name}
          </Link>
        </h3>
        <p className="mt-3 text-[15px] font-light text-ink-soft">
          {p.extent} · {p.units}
        </p>
        <div className="mt-5 flex items-center gap-6 border-t border-ink/10 pt-5 text-[14px]">
          <span className="font-medium">{soldOut ? "Sold out" : p.priceGuide ?? "Price on request"}</span>
          <a href={wa} target="_blank" rel="noopener noreferrer" className="ml-auto text-ink-soft underline-offset-4 hover:text-ink hover:underline">
            WhatsApp
          </a>
          {!soldOut && (
            <button onClick={() => openVisit(p.name)} className="cursor-pointer text-ink underline underline-offset-4 hover:text-gold-deep">
              Book a visit
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
