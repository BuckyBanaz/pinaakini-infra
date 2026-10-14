import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

// One family for everything.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://pinakiniinfra.com"),
  title: "Pinaakini Infra — Luxury villas, plots and farmland in Nellore",
  description:
    "Pinaakini Infra Private Limited develops villas, triplex homes, residential layouts and farmland in and around Nellore, Andhra Pradesh. Explore properties to buy or rent and book a site visit.",
  openGraph: {
    title: "Pinaakini Infra — Building Spaces. Creating Futures.",
    description: "Villas, triplex homes, plotted layouts and farmland in Nellore. Buy, rent or book a site visit.",
    images: ["/img/hero.webp"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${poppins.variable} antialiased`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
