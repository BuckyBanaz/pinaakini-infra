"use client";

import { useEffect, useState } from "react";
import WhatsAppButton from "./WhatsAppButton";
import MobileBottomBar from "./MobileBottomBar";
import SiteVisitModal from "./SiteVisitModal";
import { OPEN_VISIT } from "@/lib/visit";

// Site-visit dialog for the home page (opened from any button via openVisit()),
// plus the WhatsApp shortcut and the phone action bar, shown once past the film.
export default function HomeClientExtras() {
  const [modalOpen, setModalOpen] = useState(false);
  const [project, setProject] = useState<string | undefined>();
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onOpen = (e: Event) => {
      setProject((e as CustomEvent<{ project?: string }>).detail?.project);
      setModalOpen(true);
    };
    const onScroll = () => {
      const hero = document.getElementById("top");
      setPastHero(window.scrollY > (hero ? hero.offsetHeight - window.innerHeight : 600));
    };
    onScroll();
    window.__pinaakiniVisit = true;
    window.addEventListener(OPEN_VISIT, onOpen);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.__pinaakiniVisit = false;
      window.removeEventListener(OPEN_VISIT, onOpen);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div className={`transition-opacity duration-500 ${pastHero ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <WhatsAppButton />
        <MobileBottomBar onOpenSiteVisit={() => setModalOpen(true)} />
      </div>
      <SiteVisitModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        {...(project ? { preselectedProject: project } : {})}
      />
    </>
  );
}
