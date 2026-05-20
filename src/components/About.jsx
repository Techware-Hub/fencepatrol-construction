"use client";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import SafeImage from "./SafeImage.jsx";
import { BUSINESS, VALUE_PROPS } from "@/content/index.js";

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
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-glowBlue h-[440px]">
            <SafeImage
              src="/img/about-crew.jpg"
              alt="Gefence LLC crew on a Northern Colorado job site"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
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
            Local owners,{" "}
            <span className="bg-gradient-to-r from-brand-orange to-brand-blue bg-clip-text text-transparent">
              local accountability
            </span>
            .
          </h2>
          <p className="mt-5 text-white/65 text-lg leading-relaxed">
            Gefence LLC is owned by {BUSINESS.owner} and built around a simple idea: a fence
            should be set right the first time and stand up to everything Colorado throws at it.
            You talk to the person responsible for the work — not a call center.
          </p>

          <ul className="mt-7 grid sm:grid-cols-2 gap-3">
            {VALUE_PROPS.map((v, i) => (
              <motion.li
                key={v.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-2.5 text-white/80 text-sm"
              >
                <FaCheckCircle className="text-brand-green mt-0.5 shrink-0" />
                <span>
                  <span className="font-semibold text-white">{v.title}.</span> {v.text}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
