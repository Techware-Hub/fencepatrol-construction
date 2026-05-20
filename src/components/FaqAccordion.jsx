"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { FAQ_GROUPS } from "@/content/index.js";

function Item({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl bg-brand-panel/50">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 p-4 text-left"
      >
        <span className="text-white font-semibold">{q}</span>
        <FaChevronDown
          className={`text-brand-orange transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-white/65 text-sm">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqAccordion() {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {FAQ_GROUPS.map((g) => (
        <div key={g.group}>
          <h2 className="heading-display text-2xl text-white mb-4">{g.group}</h2>
          <div className="space-y-3">
            {g.items.map((it) => (
              <Item key={it.q} {...it} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
