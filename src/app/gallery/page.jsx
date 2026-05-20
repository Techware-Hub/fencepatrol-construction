import PageHero from "@/components/PageHero.jsx";
import CTABand from "@/components/CTABand.jsx";
import GalleryClient from "@/components/GalleryClient.jsx";

export const metadata = {
  title: "Project Gallery",
  description:
    "See completed fence, gate, deer, and pool fencing projects by Gefence LLC across Greeley & Northern Colorado.",
  alternates: { canonical: "/gallery" },
};

export default function Gallery() {
  return (
    <main>
      <PageHero
        chip="Our Work"
        title="Recent"
        accent="projects"
        intro="Real fences and gates installed across Northern Colorado."
        trail={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
      />
      <section className="py-10">
        <div className="container-x">
          <GalleryClient />
        </div>
      </section>
      <CTABand
        heading="Want this at your place?"
        sub="Free estimates across Greeley & Northern Colorado."
      />
    </main>
  );
}
