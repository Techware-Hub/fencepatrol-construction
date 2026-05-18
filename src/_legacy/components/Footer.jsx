import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PHONE_DISPLAY, PHONE_HREF, EMAIL, SLOGAN, SERVICES } from "../data.js";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-brand-dark">
      <div className="container-x py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="Logo" className="h-14 w-auto" />
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            {SLOGAN}. Quality fencing, construction, remodeling, and landscaping for Long Island homeowners.
          </p>
          <div className="flex gap-3 mt-5">
            {[FaFacebook, FaInstagram, FaYoutube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-brand-orange hover:border-brand-orange transition"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 heading-display tracking-widest text-lg">SERVICES</h4>
          <ul className="space-y-2">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/services/${s.slug}`}
                  className="text-white/65 hover:text-brand-orange text-sm transition"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 heading-display tracking-widest text-lg">EXPLORE</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="text-white/65 hover:text-brand-orange">About</a></li>
            <li><a href="#process" className="text-white/65 hover:text-brand-orange">Process</a></li>
            <li><a href="#gallery" className="text-white/65 hover:text-brand-orange">Gallery</a></li>
            <li><a href="#testimonials" className="text-white/65 hover:text-brand-orange">Reviews</a></li>
            <li><a href="#contact" className="text-white/65 hover:text-brand-orange">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 heading-display tracking-widest text-lg">CONTACT</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={PHONE_HREF} className="flex items-start gap-3 text-white/80 hover:text-brand-orange group">
                <FaPhoneAlt className="mt-1 text-brand-orange" />
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">Call</div>
                  <div className="font-bold">{PHONE_DISPLAY}</div>
                </div>
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="flex items-start gap-3 text-white/80 hover:text-brand-orange">
                <FaEnvelope className="mt-1 text-brand-orange" />
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">Email</div>
                  <div className="font-semibold break-all">{EMAIL}</div>
                </div>
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/80">
              <FaMapMarkerAlt className="mt-1 text-brand-orange" />
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">Service Area</div>
                <div>Long Island, NY</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/45">
          <div>© {new Date().getFullYear()} Fencepatrol & Construction. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Licenses</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
