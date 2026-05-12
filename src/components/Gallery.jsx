import { motion } from "framer-motion";
import { GALLERY } from "../data.js";

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-24 sm:py-32 overflow-hidden">
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
          <p className="text-white/60 max-w-md">
            Every project tells the same story — broken becomes beautiful. Scroll through.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {GALLERY.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className={`relative rounded-2xl overflow-hidden border border-white/10 group cursor-pointer ${
                i % 5 === 0 ? "row-span-2 col-span-2" : ""
              }`}
            >
              <img
                src={src}
                alt={`Project ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/20 to-transparent opacity-60 group-hover:opacity-90 transition" />
              <div className="absolute bottom-3 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition">
                <div className="text-white font-bold text-sm">Project #{(i + 1).toString().padStart(2, "0")}</div>
                <div className="text-white/60 text-xs">Long Island, NY</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
