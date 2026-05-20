"use client";
import { motion } from "framer-motion";
import {
  FaHardHat,
  FaShieldAlt,
  FaStar,
  FaMapMarkedAlt,
  FaTools,
} from "react-icons/fa";

const ITEMS = [
  { icon: FaTools, label: "500+ Projects" },
  { icon: FaHardHat, label: "12+ Years" },
  { icon: FaShieldAlt, label: "Licensed & Insured" },
  { icon: FaStar, label: "5-Star Rated" },
  { icon: FaMapMarkedAlt, label: "Serving Greeley & NoCo" },
];

export default function StatsStrip() {
  return (
    <section className="relative py-14 border-y border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blueDeep/40 via-brand-dark to-brand-blueDeep/40" />
      <motion.div
        className="absolute -top-20 left-1/4 w-80 h-80 rounded-full bg-brand-orange/15 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <div className="container-x relative">
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
          {ITEMS.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur hover:border-brand-orange/50 hover:bg-brand-orange/10 transition cursor-default"
            >
              <it.icon className="text-brand-orange text-sm" />
              <span className="text-white/85 text-xs sm:text-sm font-semibold">
                {it.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
