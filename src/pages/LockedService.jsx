import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaLock, FaCrown, FaCheck, FaArrowLeft, FaPhoneAlt, FaTimes } from "react-icons/fa";
import { SERVICES, PHONE_DISPLAY, PHONE_HREF } from "../data.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import PhoneBadge from "../components/PhoneBadge.jsx";

const PLANS = [
  {
    name: "Homeowner",
    price: "$0",
    period: "/free",
    color: "from-white/10 to-white/5",
    border: "border-white/15",
    badge: null,
    cta: "Get Estimate",
    perks: [
      "Free on-site estimate",
      "Project consultation",
      "Phone & email support",
      "Standard turnaround",
    ],
  },
  {
    name: "Priority",
    price: "$49",
    period: "/month",
    color: "from-brand-orange to-brand-orangeDark",
    border: "border-brand-orange",
    badge: "Most Popular",
    cta: "Subscribe Now",
    perks: [
      "Skip the line — priority booking",
      "Annual property inspection",
      "10% off all services",
      "Direct line to project manager",
      "Emergency repair within 24h",
    ],
  },
  {
    name: "Estate",
    price: "$149",
    period: "/month",
    color: "from-brand-blue to-brand-blueDeep",
    border: "border-brand-blue",
    badge: "Premium",
    cta: "Go Estate",
    perks: [
      "Everything in Priority",
      "Dedicated crew assignment",
      "Quarterly landscape maintenance",
      "20% off all services",
      "Same-day emergency response",
      "White-glove project mgmt",
    ],
  },
];

export default function LockedService() {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug) || SERVICES[0];
  const [modal, setModal] = useState(null);

  return (
    <div className="relative">
      <Navbar />
      <main className="pt-28">
        <section className="relative py-16 sm:py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/90 to-brand-dark" />
          </div>
          <motion.div
            className="absolute -top-32 left-1/3 w-96 h-96 rounded-full bg-brand-orange/20 blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <div className="container-x relative">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/65 hover:text-white text-sm mb-6"
            >
              <FaArrowLeft /> Back to Home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="chip mb-4"><FaLock /> Pro Access Required</span>
              <h1 className="heading-display text-5xl sm:text-6xl lg:text-7xl text-white">
                {service.title.split(" ")[0]}{" "}
                <span className="bg-gradient-to-r from-brand-orange to-brand-green bg-clip-text text-transparent">
                  {service.title.split(" ").slice(1).join(" ") || "Details"}
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-white/70">{service.blurb}</p>
            </motion.div>
          </div>
        </section>

        <section className="relative py-12">
          <div className="container-x">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden border border-brand-orange/40 bg-gradient-to-br from-brand-orange/10 via-brand-panel to-brand-dark p-8 sm:p-12 text-center"
            >
              <motion.div
                className="absolute inset-0 bg-grid-pattern [background-size:50px_50px] opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
              />
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-brand-orange to-brand-orangeDark flex items-center justify-center shadow-glow mb-5"
              >
                <FaLock className="text-white text-2xl" />
              </motion.div>
              <h2 className="heading-display text-3xl sm:text-4xl text-white">
                This Page Is Locked
              </h2>
              <p className="mt-3 text-white/70 max-w-xl mx-auto">
                Full {service.title.toLowerCase()} project details, gallery, and instant
                booking are reserved for our subscribed members. Pick a plan below or sign
                up free to unlock.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={() => setModal("signup")} className="btn-primary">
                  <FaCrown /> Subscribe to Unlock
                </button>
                <a href={PHONE_HREF} className="btn-outline">
                  <FaPhoneAlt /> Or Just Call {PHONE_DISPLAY}
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative py-16 sm:py-24">
          <div className="container-x">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <span className="chip mb-4">Membership Plans</span>
              <h2 className="heading-display text-4xl sm:text-5xl text-white">
                Pick Your{" "}
                <span className="bg-gradient-to-r from-brand-orange to-brand-blue bg-clip-text text-transparent">
                  Access Level
                </span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              {PLANS.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  whileHover={{ y: -8 }}
                  className={`relative rounded-3xl p-7 border-2 ${p.border} ${
                    p.name === "Priority"
                      ? "bg-gradient-to-br " + p.color + " shadow-glow"
                      : "bg-gradient-to-br from-brand-panel to-brand-dark"
                  }`}
                >
                  {p.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-dark border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-widest">
                      {p.badge}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white">{p.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="heading-display text-5xl text-white">{p.price}</span>
                    <span className="text-white/60 text-sm">{p.period}</span>
                  </div>
                  <ul className="mt-6 space-y-2.5">
                    {p.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5 text-sm text-white/85">
                        <FaCheck className="text-brand-green mt-0.5 shrink-0" /> {perk}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setModal(p.name === "Homeowner" ? "estimate" : "signup")}
                    className={`mt-7 w-full py-3 rounded-full font-bold transition ${
                      p.name === "Priority"
                        ? "bg-white text-brand-dark hover:bg-white/90"
                        : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                    }`}
                  >
                    {p.cta}
                  </button>
                </motion.div>
              ))}
            </div>

            <p className="mt-10 text-center text-white/45 text-sm">
              All plans cancel anytime. No commitment, ever.
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <PhoneBadge variant="floating" />

      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-3xl border border-white/15 bg-gradient-to-br from-brand-panel to-brand-dark p-8"
            >
              <button
                onClick={() => setModal(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                <FaTimes size={20} />
              </button>
              <div className="text-center">
                <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-brand-orange to-brand-orangeDark flex items-center justify-center shadow-glow mb-4">
                  {modal === "signup" ? <FaCrown className="text-white text-xl" /> : <FaPhoneAlt className="text-white text-xl" />}
                </div>
                <h3 className="heading-display text-3xl text-white">
                  {modal === "signup" ? "Almost There!" : "Get Your Estimate"}
                </h3>
                <p className="mt-2 text-white/65 text-sm">
                  {modal === "signup"
                    ? "Subscription portal coming soon. For now, the fastest way to lock in service is to call us direct."
                    : "Tell us about your project — fastest path is a quick call."}
                </p>
              </div>

              <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-brand-orange focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-brand-orange focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-brand-orange focus:outline-none"
                />
                <button type="submit" className="btn-primary w-full">
                  Notify Me When Ready
                </button>
              </form>

              <div className="mt-5 pt-5 border-t border-white/10 text-center">
                <div className="text-xs text-white/45 uppercase tracking-widest">Or call now</div>
                <a href={PHONE_HREF} className="heading-display text-3xl text-white hover:text-brand-orange transition mt-1 inline-block">
                  {PHONE_DISPLAY}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
