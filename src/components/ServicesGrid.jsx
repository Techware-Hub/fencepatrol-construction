"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import SafeImage from "./SafeImage.jsx";
import { SERVICES } from "@/content/index.js";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55 },
  }),
};

export default function ServicesGrid() {
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
          <span className="chip mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" /> What We Do
          </span>
          <h2 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-white">
            Fencing Done{" "}
            <span className="bg-gradient-to-r from-brand-orange to-brand-green bg-clip-text text-transparent">
              Right
            </span>
          </h2>
          <p className="mt-5 text-white/65 text-lg">
            Five focused services — every one backed by a written estimate and workmanship warranty.
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
                <SafeImage
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                  className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{s.summary}</p>

                <Link
                  href={`/services/${s.slug}`}
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
