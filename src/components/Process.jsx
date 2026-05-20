"use client";
import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/content/index.js";

export default function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="chip mb-4">How It Works</span>
          <h2 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-white">
            From{" "}
            <span className="bg-gradient-to-r from-brand-orange to-brand-orangeDark bg-clip-text text-transparent">
              Quote
            </span>{" "}
            To{" "}
            <span className="bg-gradient-to-r from-brand-green to-brand-blue bg-clip-text text-transparent">
              Finished Fence
            </span>{" "}
            In 4 Steps
          </h2>
        </motion.div>

        <div className="mt-16 relative">
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-brand-orange via-brand-green to-brand-blue opacity-30" />
          <div className="grid lg:grid-cols-4 gap-6 lg:gap-10">
            {PROCESS_STEPS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative text-center group"
              >
                <div className="relative mx-auto w-24 h-24 mb-5">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-orange to-brand-orangeDark blur-xl opacity-50"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  />
                  <div className="relative w-24 h-24 rounded-full bg-brand-dark border-2 border-brand-orange flex items-center justify-center heading-display text-4xl text-white group-hover:border-brand-green transition-colors">
                    {p.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-white/60 text-sm leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
