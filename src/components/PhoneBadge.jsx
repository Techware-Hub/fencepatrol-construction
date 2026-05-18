"use client";
import { motion } from "framer-motion";
import { FaPhoneAlt } from "react-icons/fa";
import { BUSINESS } from "@/content/index.js";

export default function PhoneBadge({ variant = "default" }) {
  if (variant === "floating") {
    return (
      <motion.a
        href={BUSINESS.phoneHref}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 220 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 z-50 lg:hidden flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-brand-orange to-brand-orangeDark shadow-glow"
        aria-label={`Call ${BUSINESS.phoneDisplay}`}
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-brand-orange/50"
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        <FaPhoneAlt className="text-white text-xl relative z-10" />
      </motion.a>
    );
  }
  return (
    <motion.a
      href={BUSINESS.phoneHref}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="group relative inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-brand-orange to-brand-orangeDark text-white font-bold shadow-glow"
    >
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
      </span>
      <FaPhoneAlt className="text-sm" />
      <span className="text-sm sm:text-base tracking-wide">{BUSINESS.phoneDisplay}</span>
    </motion.a>
  );
}
