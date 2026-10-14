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
      <Link href={href} className={`relative block overflow-hidden rounded-2xl bg-stone ${tall ? "aspect-[3/4]" : "aspect-[4/5]"}`}>
        <Image
          src={p.featuredImage}
          alt={`${p.name}, ${p.location}`}
          fill
          quality={90}
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.4s] ease-(--ease-lux) group-hover:scale-[1.06]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-medium text-ink backdrop-blur">
          {offer === "Rent" ? "For rent" : p.status}
        </span>
        <span className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:-rotate-45 group-hover:opacity-100">
          →
        </span>
      </Link>
      <div className="pt-5">
        <p className="text-[13px] text-ink-soft">
          {p.category} · {p.location.split(",")[0]}
        </p>
        <h3 className="mt-1 text-[1.45rem] font-normal tracking-[-0.01em]">
          <Link href={href} className="transition-opacity hover:opacity-70">
            {p.name.replace("Pinaakini ", "")}
          </Link>
        </h3>
        <dl className="mt-4 grid grid-cols-3 border-y border-ink/12 py-3 text-[13px]">
          <div>
            <dd className="m-0 font-medium">{p.extent}</dd>
            <dt className="text-[12px] text-ink-soft">Extent</dt>
          </div>
          <div className="border-l border-ink/12 pl-3">
            <dd className="m-0 font-medium">{p.units.split(" ").slice(0, 2).join(" ")}</dd>
            <dt className="text-[12px] text-ink-soft">Units</dt>
          </div>
          <div className="border-l border-ink/12 pl-3">
            <dd className="m-0 font-medium">{soldOut ? "Sold out" : p.priceGuide ? "See price" : "On request"}</dd>
            <dt className="text-[12px] text-ink-soft">Price</dt>
          </div>
        </dl>
        <div className="mt-4 flex flex-wrap gap-2">
          {!soldOut && (
            <button onClick={() => openVisit(p.name)} className="btn btn-dark h-10 text-[13px]">
              Book a visit
            </button>
          )}
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-line-dark h-10 text-[13px]">
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
