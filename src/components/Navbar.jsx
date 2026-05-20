"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BUSINESS } from "@/content/index.js";
import PhoneBadge from "./PhoneBadge.jsx";

const LINKS = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/fence-styles", label: "Fence Styles" },
  { to: "/gallery", label: "Gallery" },
  { to: "/service-areas", label: "Service Areas" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname?.() || "";
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-brand-dark/85 backdrop-blur-xl border-b border-white/10 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container-x flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt={BUSINESS.name}
            className="h-11 sm:h-12 w-auto drop-shadow-[0_4px_18px_rgba(249,115,22,0.45)]"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg tracking-wide text-white">GEFENCE</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-orange">
              LLC · Greeley CO
            </span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                href={l.to}
                className={`relative px-4 py-2 text-sm font-semibold transition-colors ${
                  active ? "text-white" : "text-white/80 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:flex">
          <PhoneBadge />
        </div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden text-white p-2"
          aria-label="Menu"
        >
          {open ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-brand-dark/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="container-x py-6 flex flex-col gap-2">
              {LINKS.map((l) => (
                <Link
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-lg text-white font-semibold hover:bg-white/5"
                >
                  {l.label}
                </Link>
              ))}
              <div className="pt-3">
                <PhoneBadge />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
