import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 origin-left z-[60] bg-gradient-to-r from-brand-orange via-brand-green to-brand-blue"
      style={{ scaleX }}
    />
  );
}
