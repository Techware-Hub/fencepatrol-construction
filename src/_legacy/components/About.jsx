import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { STATS } from "../data.js";

const POINTS = [
  "Locally owned & operated — your neighbors, not a call center",
  "Bobcat-equipped crews for fast site prep and grading",
  "Premium materials — wood, vinyl, aluminum, composite",
  "Transparent pricing — no hidden fees, ever",
  "Written warranties on every job",
  "Free on-site estimates within 24 hours",
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-blue-glow opacity-60 pointer-events-none" />
      <div className="container-x relative grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-glowBlue">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=70"
              alt="Construction crew"
              loading="lazy"
              className="w-full h-[440px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring" }}
            className="absolute -bottom-6 -right-6 sm:-right-12 bg-gradient-to-br from-brand-orange to-brand-orangeDark rounded-2xl p-6 shadow-glow max-w-[200px]"
          >
            <div className="heading-display text-5xl text-white">12+</div>
            <div className="text-white/90 font-semibold text-sm uppercase tracking-wider">
              Years of Craft
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="chip mb-4">Who We Are</span>
          <h2 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-white">
            Built On{" "}
            <span className="bg-gradient-to-r from-brand-orange to-brand-blue bg-clip-text text-transparent">
              Hammers, Heart
            </span>
            , <br />
            And Honest Work.
          </h2>
          <p className="mt-5 text-white/65 text-lg leading-relaxed">
            Fencepatrol & Construction is a family-led, Long Island–based team that treats
            every project like our own home. We show up on time, do it right the first
            time, and clean up after ourselves.
          </p>

          <ul className="mt-7 grid sm:grid-cols-2 gap-3">
            {POINTS.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-2.5 text-white/80 text-sm"
              >
                <FaCheckCircle className="text-brand-green mt-0.5 shrink-0" />
                <span>{p}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="container-x mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-brand-panel to-brand-dark text-center"
          >
            <div className="heading-display text-4xl sm:text-5xl bg-gradient-to-r from-brand-orange to-brand-green bg-clip-text text-transparent">
              {s.value}
            </div>
            <div className="mt-2 text-white/60 text-xs sm:text-sm uppercase tracking-wider">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
