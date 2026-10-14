import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import PropertiesBrowser from "./PropertiesBrowser";

export const metadata: Metadata = {
  title: "Properties to buy or rent — Pinaakini Infra, Nellore",
  description: "Villas, triplex homes, plotted layouts and farmland in Nellore to buy or rent. Filter by type and book a site visit.",
};

export default function PropertiesPage() {
  return (
    <PageShell>
      <PageHero
        crumb="Properties"
        kicker="The collection"
        title="Properties"
        italic="in Nellore"
        line="Villas, triplex homes, plotted layouts and farmland across Nellore, to buy or to rent."
        image="/img/pool.webp"
        action={{ label: "Browse properties", href: "#list" }}
      />
      <PropertiesBrowser />
    </PageShell>
  );
}
