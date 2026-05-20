import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import PageHero from "@/components/PageHero.jsx";
import SectionHeading from "@/components/SectionHeading.jsx";
import SafeImage from "@/components/SafeImage.jsx";
import CTABand from "@/components/CTABand.jsx";
import { SERVICES, PROCESS_STEPS } from "@/content/index.js";

export const metadata = {
  title: "Fence Services",
  description:
    "Fence installation, automatic gates, deer fencing, pool fencing, and fence repair across Greeley & Northern Colorado by Gefence LLC.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <main>
      <PageHero
        chip="Our Services"
        title="Fencing done"
        accent="right"
        intro="Five focused services — every one backed by a written estimate and workmanship warranty."
        trail={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />
      <section className="py-12">
        <div className="container-x grid md:grid-cols-2 gap-6">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group rounded-3xl border border-white/10 bg-brand-panel/60 overflow-hidden hover:border-brand-orange/50 transition"
            >
              <div className="relative h-44">
                <SafeImage
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover opacity-80 group-hover:scale-105 transition"
                  sizes="(max-width:768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <h3 className="heading-display text-2xl text-white">{s.title}</h3>
                <p className="text-white/60 text-sm mt-2">{s.summary}</p>
                <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-semibold mt-4">
                  Learn more <FaArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="py-12">
        <div className="container-x">
          <SectionHeading chip="How It Works" title="A simple," accent="four-step process" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS_STEPS.map((p) => (
              <div key={p.step} className="rounded-2xl border border-white/10 bg-brand-panel/60 p-6">
                <div className="heading-display text-4xl text-brand-orange">{p.step}</div>
                <h3 className="text-white font-bold mt-2">{p.title}</h3>
                <p className="text-white/60 text-sm mt-1">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTABand />
    </main>
  );
}
