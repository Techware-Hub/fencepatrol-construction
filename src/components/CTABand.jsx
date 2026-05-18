import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { BUSINESS } from "@/content/index.js";

export default function CTABand({
  heading = "Ready for a fence that lasts?",
  sub = "Free on-site estimates across Greeley & Northern Colorado.",
}) {
  return (
    <section className="relative py-16">
      <div className="container-x">
        <div className="relative rounded-3xl overflow-hidden border border-brand-orange/40 bg-gradient-to-br from-brand-orange/10 via-brand-panel to-brand-dark p-8 sm:p-12 text-center">
          <h2 className="heading-display text-3xl sm:text-4xl text-white">{heading}</h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">{sub}</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn-primary">
              Get a Free Estimate
            </Link>
            <a href={BUSINESS.phoneHref} className="btn-outline">
              <FaPhoneAlt /> Call {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
