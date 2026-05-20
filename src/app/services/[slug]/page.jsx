import Link from "next/link";
import { notFound } from "next/navigation";
import { FaCheck, FaPhoneAlt } from "react-icons/fa";
import PageHero from "@/components/PageHero.jsx";
import CTABand from "@/components/CTABand.jsx";
import { getService, SERVICES, BUSINESS } from "@/content/index.js";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return { title: "Service Not Found" };
  return {
    title: s.title,
    description: s.summary,
    alternates: { canonical: `/services/${s.slug}` },
  };
}

export default async function ServiceDetail({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const related = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);
  return (
    <main>
      <PageHero
        chip="Service"
        title={s.title}
        intro={s.summary}
        image={s.image}
        trail={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: s.title },
        ]}
      />
      <section className="py-12">
        <div className="container-x grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="heading-display text-3xl text-white mb-3">Overview</h2>
              <p className="text-white/70">{s.overview}</p>
            </div>
            <div>
              <h2 className="heading-display text-3xl text-white mb-3">What&rsquo;s Included</h2>
              <ul className="grid sm:grid-cols-2 gap-2">
                {s.included.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-white/80 text-sm">
                    <FaCheck className="text-brand-green mt-0.5 shrink-0" /> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="heading-display text-3xl text-white mb-3">Our Process</h2>
              <ol className="space-y-3">
                {s.process.map((p, i) => (
                  <li key={i} className="flex gap-3 text-white/70 text-sm">
                    <span className="heading-display text-brand-orange">
                      {String(i + 1).padStart(2, "0")}
                    </span>{" "}
                    {p}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="heading-display text-3xl text-white mb-3">Common Questions</h2>
              {s.faqs.map((f) => (
                <div key={f.q} className="border-b border-white/10 py-3">
                  <p className="text-white font-semibold">{f.q}</p>
                  <p className="text-white/60 text-sm mt-1">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="space-y-6">
            <div className="rounded-2xl border border-brand-orange/40 bg-brand-panel/70 p-6">
              <h3 className="text-white font-bold">What affects price</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                {s.pricingFactors.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
              <Link href="/contact" className="btn-primary w-full mt-5">
                Get a Free Estimate
              </Link>
              <a href={BUSINESS.phoneHref} className="btn-outline w-full mt-3">
                <FaPhoneAlt /> {BUSINESS.phoneDisplay}
              </a>
            </div>
            <div className="rounded-2xl border border-white/10 bg-brand-panel/60 p-6">
              <h3 className="text-white font-bold mb-3">Related Services</h3>
              <ul className="space-y-2 text-sm">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/services/${r.slug}`} className="text-brand-orange hover:underline">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <CTABand />
    </main>
  );
}
