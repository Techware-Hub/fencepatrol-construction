"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SafeImage from "./SafeImage.jsx";

export default function ParallaxQuote() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const xLeft = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.4, 1, 1, 0.4]);

  return (
    <section ref={ref} className="relative py-28 sm:py-40 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-20 -bottom-20">
        <SafeImage
          src="/img/parallax-fence.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/85 to-brand-dark" />
      </motion.div>

      <div className="relative container-x text-center">
        <motion.div style={{ opacity }}>
          <motion.div
            style={{ x: xLeft }}
            className="heading-display text-[14vw] sm:text-[10vw] lg:text-[9rem] leading-none bg-gradient-to-r from-brand-orange via-brand-orangeDark to-brand-orange bg-clip-text text-transparent text-glow-orange"
          >
            FENCES THAT LAST
          </motion.div>
          <motion.div
            style={{ x: xRight }}
            className="heading-display text-[14vw] sm:text-[10vw] lg:text-[9rem] leading-none bg-gradient-to-r from-brand-green via-emerald-400 to-brand-blue bg-clip-text text-transparent mt-2"
          >
            BUILT TO ENDURE
          </motion.div>
        </motion.div>
        <p className="mt-8 text-white/55 text-sm sm:text-base uppercase tracking-[0.4em]">
          — Our Promise In Four Words —
        </p>
      </div>
    </section>
  );
}
