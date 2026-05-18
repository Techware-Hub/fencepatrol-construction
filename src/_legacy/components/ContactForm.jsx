import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";
import { SERVICES, PHONE_DISPLAY, PHONE_HREF, EMAIL } from "../data.js";

const FIELDS = [
  { name: "name", placeholder: "Full name", icon: FaUser, type: "text" },
  { name: "phone", placeholder: "Phone number", icon: FaPhoneAlt, type: "tel" },
  { name: "email", placeholder: "Email address", icon: FaEnvelope, type: "email" },
  { name: "zip", placeholder: "ZIP code", icon: FaMapMarkerAlt, type: "text" },
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState(SERVICES[0].slug);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact-form" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-blue-glow opacity-50 pointer-events-none" />
      <motion.div
        className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-brand-orange/15 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container-x relative grid lg:grid-cols-5 gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-2"
        >
          <span className="chip mb-4">Get In Touch</span>
          <h2 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-white">
            Tell Us About Your{" "}
            <span className="bg-gradient-to-r from-brand-orange to-brand-green bg-clip-text text-transparent">
              Project
            </span>
          </h2>
          <p className="mt-5 text-white/65 text-lg">
            Drop your info and which service you need. We reply within 24 hours
            with a no-obligation quote.
          </p>

          <div className="mt-8 space-y-4">
            <motion.a
              href={PHONE_HREF}
              whileHover={{ x: 6 }}
              className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-brand-panel/60 hover:border-brand-orange/50 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-orange to-brand-orangeDark flex items-center justify-center shrink-0">
                <FaPhoneAlt className="text-white" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  Call Direct
                </div>
                <div className="text-white font-bold text-lg">{PHONE_DISPLAY}</div>
              </div>
            </motion.a>
            <motion.a
              href={`mailto:${EMAIL}`}
              whileHover={{ x: 6 }}
              className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-brand-panel/60 hover:border-brand-orange/50 transition"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-blueDeep flex items-center justify-center shrink-0">
                <FaEnvelope className="text-white" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  Email
                </div>
                <div className="text-white font-semibold break-all">{EMAIL}</div>
              </div>
            </motion.a>
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-brand-panel/60">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-green to-emerald-700 flex items-center justify-center shrink-0">
                <FaMapMarkerAlt className="text-white" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  Service Area
                </div>
                <div className="text-white font-semibold">Long Island, NY</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-3"
        >
          <div className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-brand-panel via-brand-dark to-brand-blueDeep/60 p-7 sm:p-10 shadow-glowBlue overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern [background-size:50px_50px] opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)] pointer-events-none" />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative text-center py-14"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="mx-auto w-20 h-20 rounded-full bg-brand-green/20 flex items-center justify-center mb-5"
                  >
                    <FaCheckCircle className="text-brand-green text-5xl" />
                  </motion.div>
                  <h3 className="heading-display text-3xl text-white">Message Sent!</h3>
                  <p className="mt-2 text-white/65">
                    Thanks — we'll be in touch within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={onSubmit}
                  className="relative space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    {FIELDS.map((f, i) => (
                      <motion.div
                        key={f.name}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="relative group"
                      >
                        <f.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-brand-orange transition" />
                        <input
                          type={f.type}
                          name={f.name}
                          required
                          placeholder={f.placeholder}
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-brand-orange focus:bg-white/[0.07] focus:outline-none transition"
                        />
                      </motion.div>
                    ))}
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-white/45 font-semibold">
                      Service Needed
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {SERVICES.map((s) => (
                        <button
                          key={s.slug}
                          type="button"
                          onClick={() => setService(s.slug)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition ${
                            service === s.slug
                              ? "bg-brand-orange border-brand-orange text-white shadow-glow"
                              : "border-white/15 text-white/70 hover:border-white/40"
                          }`}
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell us about your project — size, timeline, anything we should know..."
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-brand-orange focus:bg-white/[0.07] focus:outline-none transition resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-white/55">
                    <input
                      type="checkbox"
                      id="consent"
                      defaultChecked
                      className="mt-0.5 accent-brand-orange"
                    />
                    <label htmlFor="consent">
                      I agree to be contacted by Fencepatrol & Construction about
                      my inquiry.
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary text-base"
                  >
                    <FaPaperPlane /> Send Message
                  </motion.button>

                  <p className="text-center text-xs text-white/40">
                    Or call us at{" "}
                    <a href={PHONE_HREF} className="text-brand-orange font-bold hover:underline">
                      {PHONE_DISPLAY}
                    </a>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
