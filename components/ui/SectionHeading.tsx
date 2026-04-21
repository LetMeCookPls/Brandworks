'use client';

import { motion } from 'framer-motion';

export default function SectionHeading({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`font-syne font-bold text-4xl md:text-5xl text-white mb-12 flex items-center gap-4 ${className}`}
    >
      <span className="w-8 h-[2px] bg-brand-crimson"></span>
      {children}
    </motion.h2>
  );
}
