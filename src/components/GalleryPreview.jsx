"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import SafeImage from "./SafeImage.jsx";
import { GALLERY } from "@/content/index.js";

export default function GalleryPreview() {
  const items = GALLERY.slice(0, 6);
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="chip mb-4">Recent Work</span>
            <h2 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-white">
              Project{" "}
              <span className="bg-gradient-to-r from-brand-orange to-brand-blue bg-clip-text text-transparent">
                Showcase
              </span>
            </h2>
          </div>
          <Link href="/gallery" className="btn-outline">
            View Full Gallery <HiArrowRight />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {items.map((g, i) => (
            <motion.div
              key={g.image}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="relative rounded-2xl overflow-hidden border border-white/10 group aspect-[4/3]"
            >
              <SafeImage
                src={g.image}
                alt={g.caption}
                fill
                sizes="(max-width:768px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/20 to-transparent opacity-60 group-hover:opacity-90 transition" />
              <div className="absolute bottom-3 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition">
                <div className="text-white font-bold text-sm">{g.caption}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
