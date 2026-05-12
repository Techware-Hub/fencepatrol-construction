import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import PhoneBadge from "./PhoneBadge.jsx";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact-form", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        <Link to="/" className="flex items-center gap-3 group">
          <motion.img
            src="/logo.png"
            alt="Fencepatrol & Construction"
            className="h-12 sm:h-14 w-auto drop-shadow-[0_4px_18px_rgba(249,115,22,0.45)]"
            whileHover={{ rotate: [0, -4, 4, 0] }}
            transition={{ duration: 0.5 }}
          />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-lg tracking-wide text-white">FENCEPATROL</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-orange">& Construction</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative px-4 py-2 text-sm font-semibold text-white/80 hover:text-white transition-colors group"
            >
              {l.label}
              <span className="absolute left-4 right-4 -bottom-0.5 h-0.5 bg-gradient-to-r from-brand-orange to-brand-green scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
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
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-3 rounded-lg text-white font-semibold hover:bg-white/5"
                >
                  {l.label}
                </motion.a>
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
