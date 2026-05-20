import { FaMapMarkerAlt } from "react-icons/fa";
import PageHero from "@/components/PageHero.jsx";
import CTABand from "@/components/CTABand.jsx";
import { SERVICE_AREAS, BUSINESS } from "@/content/index.js";

export const metadata = {
  title: "Service Areas",
  description:
    "Gefence LLC installs and repairs fences across Greeley, Windsor, Loveland, Fort Collins, and Northern Colorado.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreas() {
  return (
    <main>
      <PageHero
        chip="Where We Work"
        title="Serving"
        accent="Northern Colorado"
        intro={`Based in ${BUSINESS.city}, covering the surrounding towns below.`}
        trail={[{ label: "Home", to: "/" }, { label: "Service Areas" }]}
        image="/img/areas-map.jpg"
      />
      <section className="py-12">
        <div className="container-x grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICE_AREAS.map((a) => (
            <div
              key={a.name}
              className={`rounded-2xl border p-6 ${
                a.primary
                  ? "border-brand-orange/50 bg-brand-orange/10"
                  : "border-white/10 bg-brand-panel/60"
              }`}
            >
              <h3 className="text-white font-bold flex items-center gap-2">
                <FaMapMarkerAlt className="text-brand-orange" /> {a.name}
                {a.primary && <span className="chip ml-1">HQ</span>}
              </h3>
              <p className="text-white/60 text-sm mt-2">{a.blurb}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-white/50 mt-10">
          Don&rsquo;t see your town?{" "}
          <a href={BUSINESS.phoneHref} className="text-brand-orange">
            Call {BUSINESS.phoneDisplay}
          </a>{" "}
          &mdash; we likely cover it.
        </p>
      </section>
      <CTABand />
    </main>
  );
}
