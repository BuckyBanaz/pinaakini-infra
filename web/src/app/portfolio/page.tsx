import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import PortfolioGallery from "./PortfolioGallery";

export const metadata: Metadata = {
  title: "Portfolio — Pinaakini Infra developments in Nellore",
  description: "Completed, sold-out and ongoing villas, triplex homes, plotted layouts and farmland developed by Pinaakini Infra in Nellore.",
};

export default function PortfolioPage() {
  return (
    <PageShell>
      <PageHero
        crumb="Portfolio"
        kicker="Our portfolio"
        title="Communities"
        italic="we have built."
        line="Villas, triplex homes, plotted layouts and farmland, delivered and in progress across Nellore."
        image="/img/evening.webp"
      />
      <PortfolioGallery />
    </PageShell>
  );
}
