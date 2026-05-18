import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { TESTIMONIALS } from "../data.js";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="chip mb-4">Word On The Street</span>
          <h2 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-white">
            Real Clients,{" "}
            <span className="bg-gradient-to-r from-brand-orange to-brand-green bg-clip-text text-transparent">
              Real Results
            </span>
          </h2>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="relative rounded-2xl p-7 border border-white/10 bg-gradient-to-br from-brand-panel to-brand-dark overflow-hidden group"
            >
              <FaQuoteLeft className="absolute -top-2 -right-2 text-brand-orange/10 text-8xl group-hover:text-brand-orange/20 transition" />
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, k) => (
                  <FaStar key={k} className="text-brand-orange" />
                ))}
              </div>
              <p className="text-white/85 leading-relaxed italic">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-orange to-brand-blue flex items-center justify-center font-bold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-bold">{t.name}</div>
                  <div className="text-white/55 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
