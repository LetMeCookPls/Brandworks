'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const FLOATING_BOXES = [
  {
    id: 'box-red',
    color: 'var(--brand-red)',
    className: 'w-[200px] h-[250px] md:w-[300px] md:h-[400px] top-[0%] left-[-2%] rotate-[-6deg]',
    yOffset: -120,
    delay: 0,
    duration: 8,
  },
  {
    id: 'box-blue-light',
    color: 'var(--brand-blue-light)',
    className: 'w-[180px] h-[180px] md:w-[250px] md:h-[250px] top-[15%] right-[5%] rotate-[12deg] rounded-full',
    yOffset: 150,
    delay: 1.5,
    duration: 10,
  },
  {
    id: 'box-blue-dark',
    color: 'var(--brand-blue-dark)',
    className: 'w-[250px] h-[120px] md:w-[400px] md:h-[180px] bottom-[20%] left-[10%] rotate-[-15deg] rounded-[3rem]',
    yOffset: -80,
    delay: 0.5,
    duration: 9,
  },
  {
    id: 'box-green',
    color: 'var(--brand-green)',
    className: 'w-[280px] h-[300px] md:w-[450px] md:h-[500px] bottom-[-15%] right-[-5%] rotate-[8deg]',
    yOffset: 100,
    delay: 2,
    duration: 12,
  },
  {
    id: 'box-yellow',
    color: 'var(--brand-yellow)',
    className: 'w-[120px] h-[120px] md:w-[160px] md:h-[160px] top-[40%] left-[45%] rotate-[45deg]',
    yOffset: -160,
    delay: 1,
    duration: 7,
  },
];

function FloatingBox({ box, scrollYProgress }: { box: any; scrollYProgress: any }) {
  const y = useTransform(scrollYProgress, [0, 1], [box.yOffset, -box.yOffset]);
  
  return (
    <motion.div
      className={`absolute ${box.className}`}
      style={{ y }}
    >
      <motion.div 
        className="w-full h-full glass border-white/10 relative overflow-hidden"
        style={{ borderRadius: 'inherit' }}
        animate={{
          y: [0, 15, -15, 0],
          rotate: ['0deg', '2deg', '-2deg', '0deg'],
        }}
        transition={{
          duration: box.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: box.delay,
        }}
      >
        {/* Color Tint Overlay inside the glass box */}
        <div 
          className="absolute inset-0 z-0" 
          style={{ 
            backgroundColor: box.color, 
            opacity: 0.3,
          }} 
        />
        
        {/* Faster glow: Radial Gradient instead of heavy blur-3xl */}
        <div 
          className="absolute inset-[-50%] z-[-1]"
          style={{
            background: `radial-gradient(circle at center, ${box.color} 0%, transparent 60%)`,
            opacity: 0.45
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative py-32 sm:py-48 overflow-hidden"
    >
      {/* --- BACKGROUND FLOATING GLASS PANELS --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="relative w-full h-full max-w-[1400px] mx-auto">
          {FLOATING_BOXES.map((box) => (
            <FloatingBox key={box.id} box={box} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>

      {/* --- FOREGROUND CONTENT --- */}
      <div className="relative z-10 px-6 sm:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-24">
          
          {/* Left Column: Heading & Pill */}
          <div className="w-full lg:w-5/12 flex flex-col items-start gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <SectionHeading>About Brandworks</SectionHeading>
            </motion.div>

            {/* Location Pill */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="glass rounded-full py-3 px-6 flex items-center gap-4 border-white/10 shadow-xl"
            >
              <span className="text-2xl drop-shadow-lg">🇰🇼</span>
              <span className="font-space-grotesk font-medium text-white/90 tracking-wide text-sm md:text-base">
                Based in Kuwait City, Kuwait
              </span>
            </motion.div>
          </div>

          {/* Right Column: Copy & Mission */}
          <motion.div 
            className="w-full lg:w-7/12 flex flex-col gap-10 lg:gap-16 lg:mt-32"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            {/* Descriptive Text */}
            <div className="font-dm-sans text-white/70 text-[clamp(16px,1.5vw,20px)] leading-[1.8] font-light flex flex-col gap-8 max-w-3xl drop-shadow-lg">
              <p>
                Brandworks Advertising, a leading service provider in Kuwait, offers a comprehensive suite of solutions encompassing <strong className="text-white font-medium">Carpentry, Acrylic, Metal, Painting Works, Graphics, Signage, Mall Pop Up Production, Display Stand Installation, Digital and LED Screens, Maintenance, MEP, CCTV Services,</strong> and more.
              </p>
              <p>
                Backed by years of experience and a highly skilled team, we deliver innovative, premium-quality solutions tailored to meet diverse client needs. Our goal is to drive business growth and success through exceptional service execution and enduring partnerships.
              </p>
            </div>

            {/* Mission Statement Glass Card */}
            <motion.div 
              className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden group border-white/10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-white/20 group-hover:bg-brand-red transition-colors duration-500" />
              <h4 className="font-syne font-bold text-xl md:text-2xl text-white mb-6 pl-4">Our Mission</h4>
              <p className="font-dm-sans text-white/85 italic leading-relaxed text-lg md:text-xl pl-4 drop-shadow-md">
                &quot;To empower businesses by constructing visually striking, structurally sound, and strategically aligned physical brand experiences.&quot;
              </p>
            </motion.div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}