import PageHero from "@/components/PageHero.jsx";
import CTABand from "@/components/CTABand.jsx";
import FaqAccordion from "@/components/FaqAccordion.jsx";

export const metadata = {
  title: "FAQ",
  description:
    "Answers on fence pricing, permits, materials, timelines, and warranty from Gefence LLC, Greeley CO.",
  alternates: { canonical: "/faq" },
};

export default function Faq() {
  return (
    <main>
      <PageHero
        chip="FAQ"
        title="Questions,"
        accent="answered"
        intro="Everything homeowners ask before a fence project."
        trail={[{ label: "Home", to: "/" }, { label: "FAQ" }]}
      />
      <section className="py-12">
        <div className="container-x">
          <FaqAccordion />
        </div>
      </section>
      <CTABand
        heading="Still have questions?"
        sub="Call us — straight answers, no pressure."
      />
    </main>
  );
}
