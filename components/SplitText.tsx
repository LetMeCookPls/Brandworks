'use client'
import { motion } from 'framer-motion'

interface SplitTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  delay?: number
}

export default function SplitText({ text, className, style, delay = 0 }: SplitTextProps) {
  const chars = text.split('')

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.03, delayChildren: delay }
    }
  }

  const charVariant = {
    hidden: {
      y: '110%',
      opacity: 0,
      rotateX: -40,
    },
    visible: {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as const,  // custom spring easing
      }
    }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        perspective: '800px',
        ...style
      }}
      className={className}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          variants={charVariant}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            transformOrigin: 'bottom center',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}
