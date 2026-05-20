"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiPlus } from "react-icons/hi";
import { FAQ_GROUPS } from "@/content/index.js";

export default function FaqPreview() {
  const [open, setOpen] = useState(0);
  const items = FAQ_GROUPS.flatMap((g) => g.items).slice(0, 5);
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x grid lg:grid-cols-5 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <span className="chip mb-4">FAQ</span>
          <h2 className="heading-display text-4xl sm:text-5xl text-white">
            Questions?{" "}
            <span className="bg-gradient-to-r from-brand-orange to-brand-green bg-clip-text text-transparent">
              Answers.
            </span>
          </h2>
          <p className="mt-4 text-white/60">
            Quick rundown of what homeowners ask before they call.
          </p>
          <Link href="/faq" className="btn-outline mt-6">
            See all FAQs
          </Link>
        </motion.div>

        <div className="lg:col-span-3 space-y-3">
          {items.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-xl border border-white/10 bg-brand-panel/60 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="text-white font-semibold">{item.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  className="text-brand-orange shrink-0"
                >
                  <HiPlus size={22} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-white/70 leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
