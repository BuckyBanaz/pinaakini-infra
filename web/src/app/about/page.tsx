import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Pinaakini Infra — Real estate developer in Nellore",
  description: "Pinaakini Infra Private Limited develops villas, triplex homes, residential layouts and farmland in and around Nellore, Andhra Pradesh.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        crumb="About"
        kicker="About Pinaakini"
        title="Rooted in Nellore,"
        italic="built for generations."
        image="/img/facade.webp"
      />
      <AboutContent />
    </PageShell>
  );
}
