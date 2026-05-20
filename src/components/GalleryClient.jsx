"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import SafeImage from "./SafeImage.jsx";
import { GALLERY, FENCE_STYLES } from "@/content/index.js";

export default function GalleryClient() {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(null);
  const items = filter === "all" ? GALLERY : GALLERY.filter((g) => g.style === filter);
  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button
          onClick={() => setFilter("all")}
          className={`chip ${filter === "all" ? "border-brand-orange text-white" : ""}`}
        >
          All
        </button>
        {FENCE_STYLES.map((s) => (
          <button
            key={s.key}
            onClick={() => setFilter(s.key)}
            className={`chip ${filter === s.key ? "border-brand-orange text-white" : ""}`}
          >
            {s.name}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((g) => (
          <button
            key={g.image}
            onClick={() => setActive(g)}
            className="group relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3]"
          >
            <SafeImage
              src={g.image}
              alt={g.caption}
              fill
              className="object-cover group-hover:scale-105 transition"
              sizes="(max-width:1024px) 50vw, 33vw"
            />
            <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-left text-white text-sm">
              {g.caption}
              {g.beforeAfter ? " · before/after" : ""}
            </span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] bg-black/85 flex items-center justify-center p-4"
          >
            <button className="absolute top-5 right-5 text-white/70" aria-label="Close">
              <FaTimes size={24} />
            </button>
            <div className="relative w-[90vw] h-[80vh]">
              <SafeImage
                src={active.image}
                alt={active.caption}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
