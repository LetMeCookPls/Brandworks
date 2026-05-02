'use client';

import { motion } from 'framer-motion';
import { Store, Layout, Monitor, Presentation, Tv, Hammer, Layers, Wrench } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import HoverSplitText from '@/components/HoverSplitText';

const services = [
  {
    title: 'Window Displays',
    icon: <Monitor size={32} />,
    color: '#F42525', // brand-red
    borderColorClass: 'border-t-brand-red',
    description: 'Captivating visual displays designed to stop foot traffic and draw customers into your retail space.',
  },
  {
    title: 'Mall Pop Ups',
    icon: <Store size={32} />,
    color: '#2196E8', // brand-blue-light
    borderColorClass: 'border-t-brand-blue-light',
    description: 'Custom-built temporary retail spaces and kiosks that maximize your brand\'s presence in high-traffic areas.',
  },
  {
    title: 'Exhibition Stands',
    icon: <Presentation size={32} />,
    color: '#0DC76A', // brand-green
    borderColorClass: 'border-t-brand-green',
    description: 'Striking, custom-designed exhibition booths that make your brand stand out at trade shows and events.',
  },
  {
    title: 'Graphics & Signage',
    icon: <Layout size={32} />,
    color: '#FFD700', // brand-yellow
    borderColorClass: 'border-t-brand-yellow',
    description: 'High-impact outdoor and indoor signage designed to capture attention and direct footfall.',
  },
  {
    title: 'Carpentry Works',
    icon: <Hammer size={32} />,
    color: '#9C27B0', // purple
    borderColorClass: 'border-t-[#9C27B0]',
    description: 'Precision woodworking and custom acrylic fabrication for bespoke retail fixtures and displays.',
  },
  {
    title: 'Digital & LED Screens',
    icon: <Tv size={32} />,
    color: '#FF5722', // orange
    borderColorClass: 'border-t-[#FF5722]',
    description: 'State-of-the-art digital displays and LED screens for dynamic, eye-catching visual communication.',
  },
  {
    title: 'Laser Cutting',
    icon: <Layers size={32} />,
    color: '#00BCD4', // cyan
    borderColorClass: 'border-t-[#00BCD4]',
    description: 'High-precision laser cutting for acrylic and metal, enabling intricate designs and perfect finishes.',
  },
  {
    title: 'Maintenance Services',
    icon: <Wrench size={32} />,
    color: '#E91E63', // pink
    borderColorClass: 'border-t-[#E91E63]',
    description: 'Comprehensive maintenance and repair services to keep your installations looking pristine year-round.',
  },
];

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: EASE } 
  },
};

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading>What We Do</SectionHeading>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {services.map((service) => (
          <motion.div key={service.title} variants={cardVariants} className="h-full">
            <motion.div
              whileHover={{ 
                y: -8, 
                boxShadow: `0 20px 40px -10px ${service.color}40`,
                borderColor: 'rgba(255,255,255,0.18)',
                backgroundColor: 'rgba(255,255,255,0.09)'
              }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`h-full glass-card border-t-4 p-8 flex flex-col gap-6 ${service.borderColorClass}`}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10"
                style={{ color: service.color }}
              >
                {service.icon}
              </div>
              
              <div>
                <h3 className="font-syne font-semibold text-xl xl:text-2xl text-white mb-3 leading-tight">
                  {service.title}
                </h3>
                <p className="font-dm-sans text-gray-400 leading-relaxed text-[15px]">
                  {service.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
