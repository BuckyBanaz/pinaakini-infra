import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeClientExtras from "@/components/HomeClientExtras";

// Shared frame for every page: navigation, footer, site-visit dialog and WhatsApp shortcut.
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <HomeClientExtras />
    </>
  );
}
