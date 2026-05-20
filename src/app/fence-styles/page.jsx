import PageHero from "@/components/PageHero.jsx";
import SectionHeading from "@/components/SectionHeading.jsx";
import SafeImage from "@/components/SafeImage.jsx";
import CTABand from "@/components/CTABand.jsx";
import { FENCE_STYLES } from "@/content/index.js";

export const metadata = {
  title: "Fence Styles & Materials",
  description:
    "Compare wood, vinyl, chain-link, aluminum, composite, and split-rail fencing — pros, cons, lifespan, and cost — from Gefence LLC in Greeley, CO.",
  alternates: { canonical: "/fence-styles" },
};

export default function FenceStyles() {
  return (
    <main>
      <PageHero
        chip="Fence Styles"
        title="Find the right"
        accent="fence for your property"
        intro="Six proven materials, compared honestly — so you choose with eyes open."
        trail={[{ label: "Home", to: "/" }, { label: "Fence Styles" }]}
      />
      <section className="py-12">
        <div className="container-x space-y-8">
          {FENCE_STYLES.map((st, i) => (
            <div
              key={st.key}
              className="grid lg:grid-cols-2 gap-8 items-center rounded-3xl border border-white/10 bg-brand-panel/50 p-6"
            >
              <div
                className={`relative h-56 rounded-2xl overflow-hidden ${
                  i % 2 ? "lg:order-2" : ""
                }`}
              >
                <SafeImage
                  src={st.image}
                  alt={`${st.name} fence`}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="heading-display text-3xl text-white">{st.name}</h2>
                  <span className="chip">{st.priceTier}</span>
                </div>
                <p className="text-white/70 mt-2">{st.description}</p>
                <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm">
                  <div>
                    <p className="text-brand-green font-bold mb-1">Pros</p>
                    <ul className="text-white/70 space-y-1">
                      {st.pros.map((p) => (
                        <li key={p}>+ {p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-brand-orange font-bold mb-1">Cons</p>
                    <ul className="text-white/70 space-y-1">
                      {st.cons.map((c) => (
                        <li key={c}>&ndash; {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="text-white/50 text-xs mt-4">
                  Best for: {st.bestFor} &middot; Lifespan: {st.lifespan}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="py-12">
        <div className="container-x">
          <SectionHeading chip="Quick Compare" title="Style" accent="comparison" />
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm text-left">
              <thead className="bg-white/5 text-white">
                <tr>
                  <th className="p-3">Style</th>
                  <th className="p-3">Best For</th>
                  <th className="p-3">Lifespan</th>
                  <th className="p-3">Cost</th>
                </tr>
              </thead>
              <tbody>
                {FENCE_STYLES.map((s) => (
                  <tr key={s.key} className="border-t border-white/10 text-white/70">
                    <td className="p-3 text-white">{s.name}</td>
                    <td className="p-3">{s.bestFor}</td>
                    <td className="p-3">{s.lifespan}</td>
                    <td className="p-3">{s.priceTier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <CTABand
        heading="Not sure which style fits?"
        sub="Tell us your goals and budget — we'll recommend the right fence."
      />
    </main>
  );
}
