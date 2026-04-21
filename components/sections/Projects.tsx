'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import Image from 'next/image';

const projects = [
  { title: "Al-Hamra Mall Signage", category: "Signage", color: "bg-brand-crimson", size: "md:col-span-2 md:row-span-2", img: "https://picsum.photos/seed/p1/800/600" },
  { title: "Nike Kuwait Store Fit-Out", category: "Installation", color: "bg-brand-blue", size: "md:col-span-1 md:row-span-1", img: "https://picsum.photos/seed/p2/800/800" },
  { title: "Boutique Interior, Salmiya", category: "Interiors", color: "bg-brand-teal", size: "md:col-span-1 md:row-span-1", img: "https://picsum.photos/seed/p3/800/800" },
  { title: "Brand Identity — Diwan Co.", category: "Design", color: "bg-brand-yellow", size: "md:col-span-1 md:row-span-1 border-t-0", img: "https://picsum.photos/seed/p4/800/800" },
  { title: "Airport Wayfinding System", category: "Signage", color: "bg-brand-crimson", size: "md:col-span-2 md:row-span-1", img: "https://picsum.photos/seed/p5/1200/600" },
  { title: "Restaurant Interior, Avenues", category: "Interiors", color: "bg-brand-teal", size: "md:col-span-1 md:row-span-1", img: "https://picsum.photos/seed/p6/800/800" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading>Our Work</SectionHeading>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 auto-rows-[280px] sm:auto-rows-[340px] gap-4 sm:gap-6 mt-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover="hover"
            className={`group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 ${project.size}`}
            data-cursor="view"
          >
            {/* Background Image */}
            <Image
              src={project.img}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
            />
            
            {/* Gradient Overlay for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            
            {/* Bottom Content Slide-Up */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out"
            >
              <div className="flex flex-col gap-3">
                <span className={`w-max px-3 py-1 text-xs font-space-grotesk font-bold text-brand-black uppercase tracking-wider rounded-full ${project.color}`}>
                  {project.category}
                </span>
                <h3 className="font-syne font-bold text-2xl sm:text-3xl text-white">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
