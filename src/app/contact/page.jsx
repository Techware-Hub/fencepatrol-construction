import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import PageHero from "@/components/PageHero.jsx";
import ContactForm from "@/components/ContactForm.jsx";
import { BUSINESS } from "@/content/index.js";

export const metadata = {
  title: "Contact & Free Estimate",
  description:
    "Request a free fence estimate from Gefence LLC in Greeley, CO. Call (845) 551-1446 or send your project details.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  const cards = [
    { i: <FaPhoneAlt />, l: "Call", v: BUSINESS.phoneDisplay, href: BUSINESS.phoneHref },
    { i: <FaEnvelope />, l: "Email", v: BUSINESS.email, href: BUSINESS.emailHref },
    { i: <FaMapMarkerAlt />, l: "Area", v: `${BUSINESS.city}, ${BUSINESS.state}` },
    { i: <FaClock />, l: "Hours", v: BUSINESS.hours[0].h },
  ];
  return (
    <main>
      <PageHero
        chip="Get In Touch"
        title="Request your"
        accent="free estimate"
        intro="Tell us about your project — the fastest response is a phone call."
        trail={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />
      <section className="py-8">
        <div className="container-x grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <div
              key={c.l}
              className="rounded-2xl border border-white/10 bg-brand-panel/60 p-5 text-center"
            >
              <div className="text-brand-orange text-xl mx-auto mb-2 w-8 h-8 grid place-items-center">
                {c.i}
              </div>
              <div className="text-white/40 text-xs uppercase tracking-widest">{c.l}</div>
              {c.href ? (
                <a href={c.href} className="text-white font-semibold hover:text-brand-orange">
                  {c.v}
                </a>
              ) : (
                <div className="text-white font-semibold">{c.v}</div>
              )}
            </div>
          ))}
        </div>
      </section>
      <ContactForm />
      <section className="pb-16">
        <div className="container-x">
          <div className="relative rounded-2xl border border-white/10 overflow-hidden h-80 bg-brand-panel/60">
            <iframe
              title={`${BUSINESS.name} service area — ${BUSINESS.city}, ${BUSINESS.state}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                `${BUSINESS.city}, ${BUSINESS.state}`
              )}&z=11&output=embed`}
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="text-center text-white/40 text-xs mt-3">
            Map centered on {BUSINESS.city}, {BUSINESS.state} &mdash; we cover the surrounding {BUSINESS.region} towns.
          </p>
        </div>
      </section>
    </main>
  );
}
