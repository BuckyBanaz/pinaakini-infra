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
        title="Let’s talk"
        line="Questions about a property, a site visit or our consultancy services? Our team is a call or a message away."
        image="/img/entrance.webp"
        action={{ label: "Reach us", href: "#reach" }}
      />
      <ContactContent />
    </PageShell>
  );
}
