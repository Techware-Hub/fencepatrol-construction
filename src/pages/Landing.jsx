import { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Marquee from "../components/Marquee.jsx";
import Services from "../components/Services.jsx";
import About from "../components/About.jsx";
import ParallaxQuote from "../components/ParallaxQuote.jsx";
import Process from "../components/Process.jsx";
import Gallery from "../components/Gallery.jsx";
import Testimonials from "../components/Testimonials.jsx";
import FAQ from "../components/FAQ.jsx";
import ContactForm from "../components/ContactForm.jsx";
import CTA from "../components/CTA.jsx";
import Footer from "../components/Footer.jsx";
import PhoneBadge from "../components/PhoneBadge.jsx";
import ScrollProgress from "../components/ScrollProgress.jsx";

export default function Landing() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return (
    <div className="relative">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <About />
        <ParallaxQuote />
        <Process />
        <Gallery />
        <Testimonials />
        <FAQ />
        <ContactForm />
        <CTA />
      </main>
      <Footer />
      <PhoneBadge variant="floating" />
    </div>
  );
}
