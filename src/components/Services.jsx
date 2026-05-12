import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiLockClosed } from "react-icons/hi";
import { SERVICES } from "../data.js";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55 },
  }),
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="chip mb-4"><span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" /> What We Do</span>
          <h2 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-white">
            Services Built On{" "}
            <span className="bg-gradient-to-r from-brand-orange to-brand-green bg-clip-text text-transparent">
              Quality & Trust
            </span>
          </h2>
          <p className="mt-5 text-white/65 text-lg">
            From fence repair to full home additions — one crew, one quote, one promise.
          </p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.slug}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              custom={i}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
              className="card-shine group relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-brand-panel to-brand-dark"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-[10px] font-bold text-white/80 border border-white/10">
                  <HiLockClosed size={11} /> PRO ACCESS
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{s.blurb}</p>

                <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-xs text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" /> {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/services/${s.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-brand-orange font-bold text-sm group/btn"
                >
                  View Details
                  <HiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
