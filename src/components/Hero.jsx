import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaPhoneAlt, FaStar, FaShieldAlt, FaTools } from "react-icons/fa";
import { HiArrowDown } from "react-icons/hi";
import { PHONE_DISPLAY, PHONE_HREF } from "../data.js";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden"
    >
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-20 -bottom-20 pointer-events-none"
      >
        <img
          src={BG_IMAGE}
          alt=""
          aria-hidden
          className="w-full h-full object-cover opacity-25"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/85 to-brand-dark pointer-events-none" />
      <div className="absolute inset-0 bg-blue-glow pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern [background-size:60px_60px] opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />

      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-orange/20 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-brand-blue/30 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-brand-green/15 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container-x relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            <span className="chip"><FaShieldAlt className="text-brand-green" /> Licensed & Insured</span>
            <span className="chip"><FaStar className="text-brand-orange" /> 5-Star Service</span>
            <span className="chip"><FaTools className="text-brand-blue" /> 12+ Years</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="heading-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white"
          >
            DAMAGE{" "}
            <span className="bg-gradient-to-r from-brand-orange via-brand-orangeDark to-brand-orange bg-clip-text text-transparent text-glow-orange">
              DISAPPEARS
            </span>
            <br />
            BEAUTY{" "}
            <span className="bg-gradient-to-r from-brand-green to-brand-blue bg-clip-text text-transparent">
              APPEARS
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg sm:text-xl text-white/75 max-w-xl leading-relaxed"
          >
            Fencing, construction, remodeling, and landscaping done right.
            Bobcat-powered crews. Built-to-last craftsmanship. Honest pricing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <a href={PHONE_HREF} className="btn-primary text-base sm:text-lg">
              <FaPhoneAlt /> Call {PHONE_DISPLAY}
            </a>
            <a href="#services" className="btn-outline text-base sm:text-lg">
              Explore Services
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex items-center gap-6 text-sm text-white/65"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-brand-orange" />
              ))}
            </div>
            <span>Trusted by 500+ homeowners on Long Island</span>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: logoY, scale: logoScale }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-orange/30 via-brand-blue/20 to-brand-green/20 blur-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.img
            src="/logo.png"
            alt="Fencepatrol & Construction Logo"
            className="relative w-72 sm:w-96 lg:w-[28rem] drop-shadow-[0_20px_50px_rgba(249,115,22,0.45)]"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -left-4 top-8 chip bg-brand-orange/15 border-brand-orange/40 text-white"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            🏗️ Bobcat Crews
          </motion.div>
          <motion.div
            className="absolute -right-2 bottom-16 chip bg-brand-green/15 border-brand-green/40 text-white"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            🌿 Landscaping
          </motion.div>
          <motion.div
            className="absolute left-10 bottom-4 chip bg-brand-blue/15 border-brand-blue/40 text-white"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            🏠 Remodeling
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#services"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 hover:text-white"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll down"
      >
        <HiArrowDown size={26} />
      </motion.a>
    </section>
  );
}
