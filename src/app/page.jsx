import Hero from "@/components/Hero.jsx";
import StatsStrip from "@/components/StatsStrip.jsx";
import ServicesGrid from "@/components/ServicesGrid.jsx";
import About from "@/components/About.jsx";
import ParallaxQuote from "@/components/ParallaxQuote.jsx";
import Process from "@/components/Process.jsx";
import GalleryPreview from "@/components/GalleryPreview.jsx";
import Testimonials from "@/components/Testimonials.jsx";
import FaqPreview from "@/components/FaqPreview.jsx";
import ContactForm from "@/components/ContactForm.jsx";
import CTABand from "@/components/CTABand.jsx";
import ScrollProgress from "@/components/ScrollProgress.jsx";

export const metadata = {
  title: "Fence Installation in Greeley, CO",
  description:
    "Gefence LLC installs wood, vinyl, aluminum, deer, and pool fencing plus automatic gates across Greeley & Northern Colorado. Free estimates.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main>
        <Hero />
        <StatsStrip />
        <ServicesGrid />
        <About />
        <ParallaxQuote />
        <Process />
        <GalleryPreview />
        <Testimonials />
        <FaqPreview />
        <ContactForm />
        <CTABand />
      </main>
    </>
  );
}
