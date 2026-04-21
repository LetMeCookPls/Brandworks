'use client';

import { motion } from 'framer-motion';
import { Square, Store, Layout, Palette } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';

const services = [
  {
    title: 'Signage',
    icon: <Square size={32} />,
    color: '#E8174A', // brand-crimson
    borderColorClass: 'border-t-brand-crimson',
    description: 'High-impact outdoor and indoor signage designed to capture attention and direct footfall.',
  },
  {
    title: 'Shop Installation',
    icon: <Store size={32} />,
    color: '#1E5BAF', // brand-blue
    borderColorClass: 'border-t-brand-blue',
    description: 'End-to-end retail fit-outs and professional installations for a flawless brand presence.',
  },
  {
    title: 'Interior Design',
    icon: <Layout size={32} />,
    color: '#2AADA0', // brand-teal
    borderColorClass: 'border-t-brand-teal',
    description: 'Transforming spaces into immersive brand environments that engage your customers.',
  },
  {
    title: 'Branding & Design',
    icon: <Palette size={32} />,
    color: '#F5D300', // brand-yellow
    borderColorClass: 'border-t-brand-yellow',
    description: 'Strategic visual identities and creative designs that communicate your unique story.',
  },
];

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
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } 
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
              className={`h-full glass-card border-t-4 ${service.borderColorClass} p-8 flex flex-col gap-6`}
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10"
                style={{ color: service.color }}
              >
                {service.icon}
              </div>
              
              <div>
                <h3 className="font-syne font-bold text-2xl text-white mb-3">
                  {service.title}
                </h3>
                <p className="font-dm-sans text-gray-400 leading-relaxed">
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
