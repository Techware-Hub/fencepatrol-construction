import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaHardHat,
  FaTruckPickup,
  FaHome,
  FaTree,
  FaTools,
  FaShieldAlt,
} from "react-icons/fa";

const BADGES = [
  { icon: FaShieldAlt, label: "Licensed & Insured" },
  { icon: FaHardHat, label: "OSHA Certified" },
  { icon: FaTruckPickup, label: "Bobcat Equipped" },
  { icon: FaTools, label: "12+ Yrs Experience" },
  { icon: FaHome, label: "Local Family Owned" },
  { icon: FaTree, label: "Eco-Friendly Crew" },
];

const STATS = [
  { end: 500, suffix: "+", label: "Projects Done" },
  { end: 12, suffix: "+", label: "Years In Business" },
  { end: 100, suffix: "%", label: "Satisfaction" },
  { end: 24, suffix: "/7", label: "Emergency Service" },
];

function Counter({ end, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const dur = 1600;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.floor(end * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setVal(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);

  return (
    <span ref={ref} className="tabular-nums">
      {val}
      {suffix}
    </span>
  );
}

export default function Marquee() {
  return (
    <section className="relative py-14 sm:py-16 border-y border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blueDeep/40 via-brand-dark to-brand-blueDeep/40" />
      <motion.div
        className="absolute -top-20 left-1/4 w-80 h-80 rounded-full bg-brand-orange/15 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="container-x relative">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div className="heading-display text-5xl sm:text-6xl bg-gradient-to-br from-brand-orange via-white to-brand-orange bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">
                <Counter end={s.end} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs sm:text-sm text-white/55 uppercase tracking-widest font-semibold">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 pt-10 border-t border-white/10">
          <div className="text-center text-[11px] uppercase tracking-[0.35em] text-white/40 mb-6 font-semibold">
            Trusted Across Long Island
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
            {BADGES.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur hover:border-brand-orange/50 hover:bg-brand-orange/10 transition cursor-default"
              >
                <b.icon className="text-brand-orange text-sm" />
                <span className="text-white/85 text-xs sm:text-sm font-semibold">
                  {b.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
