import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeClientExtras from "@/components/HomeClientExtras";
import Hero from "@/components/home/Hero";
import ProjectMap from "@/components/home/ProjectMap";
import Partners from "@/components/home/Partners";
import Voices from "@/components/home/Voices";
import Considered from "@/components/lux/Considered";
import Statement from "@/components/lux/Statement";
import Collection from "@/components/lux/Collection";
import Amenities from "@/components/lux/Amenities";
import RoomsBand from "@/components/lux/RoomsBand";
import CoreServices from "@/components/lux/CoreServices";
import Experience from "@/components/lux/Experience";
import Faq from "@/components/lux/Faq";
import Nearby from "@/components/lux/Nearby";
import Invest from "@/components/lux/Invest";

// Lumera-style home for Pinaakini: cinematic film hero, considered intro, the collection
// (buy/rent), amenities, rooms, the Nellore map, services, the experience, client stories,
// partners, FAQs, landmarks and the invitation to visit.
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Considered />
        <Statement />
        <Collection />
        <Amenities />
        <RoomsBand />
        <ProjectMap />
        <CoreServices />
        <Experience />
        <Voices />
        <Partners />
        <Faq />
        <Nearby />
        <Invest />
      </main>
      <Footer />
      <HomeClientExtras />
    </>
  );
}
