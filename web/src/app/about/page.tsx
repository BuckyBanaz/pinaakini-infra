import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Pinaakini Infra — Real estate developer and consultancy in Nellore",
  description: "Pinaakini Infra Private Limited develops villas, triplex homes, residential layouts and farmland in and around Nellore, and advises landowners, developers and buyers.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        crumb="About"
        kicker="About Pinaakini"
        title="Rooted in Nellore"
        italic="built to last"
        line="A Nellore developer and consultancy, building homes and land for the long term."
        image="/img/facade.webp"
        action={{ label: "Our story", href: "#story" }}
      />
      <AboutContent />
    </PageShell>
  );
}
