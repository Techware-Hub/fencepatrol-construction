import { motion } from "framer-motion";

const VARIANTS = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  fade: {},
  zoom: { scale: 0.9 },
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  once = true,
}) {
  const from = VARIANTS[direction] || VARIANTS.up;
  return (
    <motion.div
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
