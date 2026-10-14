import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Compass, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[75vh] flex items-center justify-center bg-ivory px-6 pt-32 pb-24 text-center">
        <div className="max-w-md space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-sand text-forest mx-auto flex items-center justify-center">
            <Compass className="w-8 h-8 text-bronze" />
          </div>
          <span className="text-xs uppercase font-mono tracking-widest text-bronze font-semibold">
            404 • Page Not Found
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-ink font-light">
            Residence or Page Not Found
          </h1>
          <p className="text-sm text-ink-soft leading-relaxed">
            The page you are looking for may have been relocated, or the property identifier has changed.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="px-6 py-3 rounded-full bg-forest text-white text-xs font-semibold uppercase tracking-wider hover:bg-forest/90 transition-colors"
            >
              Return to Homepage
            </Link>
            <Link
              href="/properties"
              className="px-6 py-3 rounded-full bg-sand text-ink text-xs font-semibold uppercase tracking-wider hover:bg-ink hover:text-white transition-colors"
            >
              View Available Properties
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
