'use client';

import { motion } from 'framer-motion';
import HoverSplitText from '@/components/HoverSplitText';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export default function SectionHeading({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const textString = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : String(children);
  
  return (
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`font-syne font-bold text-4xl md:text-5xl text-white mb-12 flex items-center gap-4 ${className}`}
    >
      <span className="w-8 h-[2px] bg-brand-red"></span>
      <HoverSplitText
        text={textString}
        staggerDelay={0.022}
        duration={0.55}
        ease="power3.out"
        style={{
          fontFamily: 'var(--font-syne)',
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 800,
          color: 'white',
          letterSpacing: '-0.02em',
        }}
      />
    </motion.h2>
  );
}
