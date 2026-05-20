import Link from "next/link";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram } from "react-icons/fa";
import { BUSINESS, SERVICES, SERVICE_AREAS } from "@/content/index.js";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-brand-dark pt-16 pb-8">
      <div className="container-x grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl text-white">
            GEFENCE <span className="text-brand-orange">LLC</span>
          </div>
          <p className="mt-3 text-sm text-white/60">
            {BUSINESS.tagline} {BUSINESS.addressNote}.
          </p>
          <p className="mt-3 text-xs text-white/40">{BUSINESS.licenseNote}</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Services</h4>
          <ul className="space-y-2 text-sm text-white/60">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-brand-orange">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/about" className="hover:text-brand-orange">About</Link></li>
            <li><Link href="/fence-styles" className="hover:text-brand-orange">Fence Styles</Link></li>
            <li><Link href="/gallery" className="hover:text-brand-orange">Gallery</Link></li>
            <li><Link href="/service-areas" className="hover:text-brand-orange">Service Areas</Link></li>
            <li><Link href="/faq" className="hover:text-brand-orange">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-brand-orange">Free Estimate</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li>
              <a href={BUSINESS.phoneHref} className="flex items-center gap-2 hover:text-brand-orange">
                <FaPhoneAlt /> {BUSINESS.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={BUSINESS.emailHref} className="flex items-center gap-2 hover:text-brand-orange">
                <FaEnvelope /> {BUSINESS.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> {BUSINESS.city}, {BUSINESS.state}
            </li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a
              href={BUSINESS.social.facebook}
              aria-label="Facebook"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 grid place-items-center text-white/70 hover:text-brand-orange"
            >
              <FaFacebookF />
            </a>
            <a
              href={BUSINESS.social.instagram}
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/10 grid place-items-center text-white/70 hover:text-brand-orange"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="container-x mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/40">
        <span>© {new Date().getFullYear()} {BUSINESS.legalName}. All rights reserved.</span>
        <span>{SERVICE_AREAS.slice(0, 6).map((a) => a.name).join(" · ")} & more</span>
      </div>
    </footer>
  );
}
