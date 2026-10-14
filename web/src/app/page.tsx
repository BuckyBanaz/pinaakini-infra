import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeClientExtras from "@/components/HomeClientExtras";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Categories from "@/components/home/Categories";
import Properties from "@/components/home/Properties";
import Signature from "@/components/home/Signature";
import PortfolioReel from "@/components/home/PortfolioReel";
import Pillars from "@/components/home/Pillars";
import Testimonials from "@/components/home/Testimonials";
import CtaBand from "@/components/home/CtaBand";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Categories />
        <Properties />
        <Signature />
        <PortfolioReel />
        <Pillars />
        <Testimonials />
        <CtaBand />
      </main>
      <Footer />
      <HomeClientExtras />
    </>
  );
}
