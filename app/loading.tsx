'use client';

import { motion } from 'framer-motion';
import Logo from '@/components/Logo';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-brand-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.25, 0.46, 0.45, 0.94],
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
      >
        <Logo className="w-24 h-24 sm:w-32 sm:h-32" />
      </motion.div>
    </div>
  );
}
