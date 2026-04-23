'use client';

import { motion } from 'framer-motion';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function AnimatedText({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
