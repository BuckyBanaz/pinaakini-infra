import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Pinaakini Infra — Site visits and enquiries, Nellore",
  description: "Call, WhatsApp or write to Pinaakini Infra in Nellore. Send an enquiry or book a site visit to any of our properties.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHero
        short
        crumb="Contact"
        kicker="Contact us"
        title="Let’s talk about"
        italic="your next address."
        image="/img/entrance.webp"
      />
      <ContactContent />
    </PageShell>
  );
}
