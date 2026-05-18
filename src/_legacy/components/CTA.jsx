import { motion } from "framer-motion";
import { FaPhoneAlt } from "react-icons/fa";
import { PHONE_DISPLAY, PHONE_HREF } from "../data.js";

export default function CTA() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative rounded-3xl overflow-hidden border border-white/15 p-8 sm:p-14 lg:p-20 bg-gradient-to-br from-brand-blueDeep via-brand-dark to-brand-blueDeep"
        >
          <motion.div
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-orange/30 blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-brand-green/20 blur-3xl"
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 7, repeat: Infinity }}
          />
          <div className="absolute inset-0 bg-grid-pattern [background-size:50px_50px] opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

          <div className="relative grid lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <span className="chip mb-4">Free Estimate</span>
              <h2 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-white">
                Ready To Make{" "}
                <span className="bg-gradient-to-r from-brand-orange to-brand-green bg-clip-text text-transparent">
                  Damage Disappear?
                </span>
              </h2>
              <p className="mt-5 text-white/75 text-lg max-w-xl">
                One call. Free on-site quote. No pressure, no hidden fees. The crew shows up when we say we will.
              </p>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-4">
              <motion.a
                href={PHONE_HREF}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative rounded-2xl p-6 bg-gradient-to-br from-brand-orange to-brand-orangeDark shadow-glow overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.7 }}
                />
                <div className="relative flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                    <motion.span
                      className="absolute inset-0 rounded-full bg-white/30"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <FaPhoneAlt className="text-white text-xl relative" />
                  </div>
                  <div>
                    <div className="text-white/85 text-xs uppercase tracking-widest font-semibold">
                      Call Now
                    </div>
                    <div className="text-white heading-display text-3xl">{PHONE_DISPLAY}</div>
                  </div>
                </div>
              </motion.a>
              <a href={`sms:+1${PHONE_DISPLAY.replace(/\D/g, "")}`} className="btn-outline">
                Text Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
