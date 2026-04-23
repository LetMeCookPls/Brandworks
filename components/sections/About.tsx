'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Text */}
        <motion.div 
          className="w-full lg:w-[55%] flex flex-col items-start"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <SectionHeading>About Brandworks</SectionHeading>
          
          <div className="font-dm-sans text-gray-300 text-lg leading-relaxed flex flex-col gap-6 max-w-2xl">
            <p>
              Brandworks Advertising, a leading service provider in Kuwait, offers a wide range of solutions including Carpentry, Acrylic, Metal, Painting Works, Graphics, Signage, Mall Pop Up Production, Display Stand Installation, Digital and LED Screens, Maintenance, MEP, CCTV Services, and more.
            </p>
            <p>
              With years of experience and a skilled team, we deliver innovative, high-quality solutions to meet diverse client needs, aiming to foster business growth and success through exceptional services and lasting relationships.
            </p>
            <p>
              Contact us today for more information on how we can help achieve your business goals.
            </p>
            
            <div className="mt-4 flex items-center gap-3 py-3 px-5 rounded-full bg-white/5 border border-white/10 w-max">
              <span className="text-xl">🇰🇼</span>
              <span className="font-space-grotesk font-medium text-white tracking-wide">
                Based in Kuwait City, Kuwait
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Visual */}
        <motion.div 
          className="w-full lg:w-[45%] flex justify-center relative mt-12 lg:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
            
            {/* The 2x2 colored grid block */}
            <motion.div 
              className="absolute z-0 transform rotate-6 grid grid-cols-2 grid-rows-2 gap-2"
              animate={{ rotate: [6, 10, 6] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] bg-brand-crimson rounded-3xl" />
              <div className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] bg-brand-blue rounded-3xl" />
              <div className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] bg-brand-teal rounded-3xl" />
              <div className="w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] bg-brand-yellow rounded-3xl" />
            </motion.div>

            {/* Overlay Glass Card */}
            <GlassCard className="relative z-10 p-8 max-w-[280px] sm:max-w-[320px] shadow-2xl ml-12 sm:ml-24 mt-12 sm:mt-24">
              <h4 className="font-syne font-bold text-xl text-white mb-4">Our Mission</h4>
              <p className="font-dm-sans text-gray-200 italic leading-relaxed text-sm sm:text-base">
                &quot;To empower businesses by constructing visually striking, structurally sound, and strategically aligned physical brand experiences.&quot;
              </p>
            </GlassCard>

          </div>
        </motion.div>

      </div>
    </section>
  );
}