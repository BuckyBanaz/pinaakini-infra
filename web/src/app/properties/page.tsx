import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import PropertiesBrowser from "./PropertiesBrowser";

export const metadata: Metadata = {
  title: "Available properties — Pinaakini Infra, Nellore",
  description: "Villas, triplex homes, plotted layouts and farmland in Nellore to buy or rent. Filter by type and book a site visit.",
};

export default function PropertiesPage() {
  return (
    <PageShell>
      <PageHero
        crumb="Properties"
        kicker="Available properties"
        title="Homes and land,"
        italic="ready for you."
        line="Villas, triplex homes, plotted layouts and farmland across Nellore. Choose to buy or rent, then book a visit."
        image="/img/pool.webp"
      />
      <PropertiesBrowser />
    </PageShell>
  );
}
