import PageHero from "@/components/PageHero.jsx";
import SectionHeading from "@/components/SectionHeading.jsx";
import SafeImage from "@/components/SafeImage.jsx";
import CTABand from "@/components/CTABand.jsx";
import ContactForm from "@/components/ContactForm.jsx";
import { BUSINESS, VALUE_PROPS } from "@/content/index.js";

export const metadata = {
  title: "About Us",
  description:
    "Gefence LLC is a Greeley, Colorado fence installation company owned by Gary — licensed, insured, and built on honest work across Northern Colorado.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <main>
      <PageHero
        chip="About Gefence LLC"
        title="Built on"
        accent="honest work"
        intro="Gefence LLC is a locally owned fence company serving Greeley and Northern Colorado."
        trail={[{ label: "Home", to: "/" }, { label: "About" }]}
        image="/img/about-crew.jpg"
      />
      <section className="py-12">
        <div className="container-x grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionHeading center={false} chip="Our Story" title="Local owners," accent="local accountability" />
            <p className="text-white/70">
              Gefence LLC was built around a simple idea: a fence should be set right the first time
              and stand up to everything Colorado throws at it. Owner {BUSINESS.owner} runs every job
              personally &mdash; you talk to the person responsible for the work, not a call center.
            </p>
            <p className="text-white/70 mt-4">
              We install for homeowners and light-commercial properties across Greeley, Windsor, Loveland,
              Fort Collins, and the surrounding towns. Posts go in concrete below the frost line, gates
              are squared and hung to last, and the site is left clean.
            </p>
          </div>
          <div className="relative rounded-3xl overflow-hidden border border-white/10 h-72">
            <SafeImage
              src="/img/about-crew.jpg"
              alt="Gefence LLC crew on a Northern Colorado job site"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container-x">
          <SectionHeading chip="Why Gefence" title="What you get with" accent="every project" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUE_PROPS.map((v) => (
              <div key={v.title} className="rounded-2xl border border-white/10 bg-brand-panel/60 p-6">
                <h3 className="text-white font-bold">{v.title}</h3>
                <p className="text-white/60 text-sm mt-2">{v.text}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-white/40 text-xs mt-8">{BUSINESS.licenseNote}.</p>
        </div>
      </section>
      <ContactForm />
      <CTABand />
    </main>
  );
}
