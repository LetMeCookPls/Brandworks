'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import HoverSplitText from '@/components/HoverSplitText';
import HeroGrid from '@/components/HeroGrid';


const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};


export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20 bg-transparent">

      {/* ── Grid Background ─────────────────────────────────────────── */}
      <HeroGrid />

      {/* ── Content ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

        {/* Left Content */}
        <motion.div
          className="col-span-1 md:col-span-8 flex flex-col items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="flex flex-col mb-6" variants={containerVariants}>
            <motion.span
              className="block font-playfair font-extrabold text-[56px] md:text-[80px] leading-[1.05] tracking-tight text-white m-0"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0 }}
            >
              <HoverSplitText
                text="WE BUILD"
                staggerDelay={0.025}
                duration={0.60}
                style={{ color: 'inherit', fontFamily: 'inherit', letterSpacing: 'inherit' }}
              />
            </motion.span>
            <motion.span
              className="block font-playfair font-extrabold text-[56px] md:text-[80px] leading-[1.05] tracking-tight text-brand-red m-0"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            >
              <HoverSplitText
                text="BRANDS."
                staggerDelay={0.025}
                duration={0.60}
                style={{ color: 'inherit', fontFamily: 'inherit', letterSpacing: 'inherit' }}
              />
            </motion.span>
            <motion.span
              className="block font-playfair font-bold text-3xl md:text-[44px] leading-tight text-gray-400 mt-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            >
              <HoverSplitText
                text="IN REAL LIFE."
                staggerDelay={0.020}
                duration={0.55}
                style={{ color: 'inherit', fontFamily: 'inherit', letterSpacing: 'inherit' }}
              />
            </motion.span>
          </motion.h1>

          <motion.p
            className="font-dm-sans text-xl text-gray-300 tracking-wide mb-10 max-w-xl"
            variants={itemVariants}
          >
            Signage • Installation • Interiors • Design
          </motion.p>

          <motion.div className="flex flex-wrap gap-6 items-center" variants={itemVariants}>
            <a href="#projects" className="group relative block" aria-label="See our portfolio of projects">
              <GlassCard hoverable className="px-8 py-4 bg-white/10 hover:bg-white/15 border-white/20">
                <span className="font-playfair font-semibold text-white tracking-wide group-hover:text-brand-red transition-colors">
                  See Our Work
                </span>
              </GlassCard>
            </a>

            <a
              href="#contact"
              className="group flex items-center gap-2 font-playfair font-medium text-white hover:text-brand-red transition-colors"
              aria-label="Get in touch with us"
            >
              Get in Touch
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right – Stats Card */}
        <motion.div
          className="col-span-1 md:col-span-4 hidden md:block"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
        >
          <GlassCard className="p-8 flex flex-col gap-8 shadow-2xl relative">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-red rounded-full mix-blend-screen filter blur-[64px] opacity-20" aria-hidden="true" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-blue-light rounded-full mix-blend-screen filter blur-[64px] opacity-20" aria-hidden="true" />

            <div className="flex flex-col pl-4 border-l-4 border-brand-red">
              <span className="font-playfair font-normal text-3xl text-white">150+</span>
              <span className="font-dm-sans text-gray-400">Projects Delivered</span>
            </div>

            <div className="flex flex-col pl-4 border-l-4 border-brand-green">
              <span className="font-playfair font-normal text-3xl text-white">GCC</span>
              <span className="font-dm-sans text-gray-400">Kuwait &amp; Region</span>
            </div>

            <div className="flex flex-col pl-4 border-l-4 border-brand-yellow">
              <span className="font-playfair font-normal text-3xl text-white">2015</span>
              <span className="font-dm-sans text-gray-400">Established</span>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* ── Scroll Indicator ──────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={28} className="text-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
