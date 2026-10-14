"use client";

import { Phone, MessageCircle, Calendar } from "lucide-react";
import { site } from "@/lib/site";

interface MobileBottomBarProps {
  onOpenSiteVisit: () => void;
}

export default function MobileBottomBar({ onOpenSiteVisit }: MobileBottomBarProps) {
  const whatsappUrl = `https://wa.me/919440289999?text=${encodeURIComponent(
    "Hello Pinaakini Infra, I would like to enquire about your available properties in Nellore."
  )}`;

  return (
    <aside
      aria-label="Quick contact bar"
      className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between border-t border-ink/10 bg-ivory/95 px-4 py-2.5 backdrop-blur-lg md:hidden"
    >
      <div className="flex w-full items-center justify-between gap-2">
        <a
          href={site.contact.phoneHref}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-ink/15 bg-white py-2.5 text-[0.72rem] font-semibold text-ink shadow-xs"
        >
          <Phone className="h-3.5 w-3.5 text-forest" />
          <span>Call Desk</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#25D366] py-2.5 text-[0.72rem] font-semibold text-white shadow-xs"
        >
          <MessageCircle className="h-3.5 w-3.5 fill-white text-[#25D366]" />
          <span>WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={onOpenSiteVisit}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-forest py-2.5 text-[0.72rem] font-semibold text-white shadow-xs"
        >
          <Calendar className="h-3.5 w-3.5 text-bronze" />
          <span>Site Visit</span>
        </button>
      </div>
    </aside>
  );
}
