'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import Image from 'next/image';
import { useRef } from 'react';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const projects = [
  {
    title: "Louis Vuitton",
    subtitle: "Scale-pattern arch pop-up",
    category: "Mall Pop-Up",
    tag: "Installation",
    color: "bg-brand-yellow",
    size: "md:col-span-2 md:row-span-2",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    accent: "#C9A84C",
  },
  {
    title: "Dior",
    subtitle: "Sculptural window display",
    category: "Window Display",
    tag: "Installation",
    color: "bg-brand-blue-light",
    size: "md:col-span-1 md:row-span-1",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
    accent: "#2C7BE5",
  },
  {
    title: "Valentino",
    subtitle: "Beauty mall pop-up in Rosso",
    category: "Mall Pop-Up",
    tag: "Production",
    color: "bg-brand-red",
    size: "md:col-span-1 md:row-span-1",
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da",
    accent: "#E5302C",
  },
  {
    title: "Tiffany & Co.",
    subtitle: "Curved LED mall pavilion",
    category: "Mall Pop-Up",
    tag: "Installation",
    color: "bg-brand-green",
    size: "md:col-span-1 md:row-span-1",
    img: "https://images.unsplash.com/photo-1573408301185-9519f94816f7",
    accent: "#00A693",
  },
  {
    title: "Shiseido",
    subtitle: "Instore production & display",
    category: "In-Store Stands",
    tag: "Production",
    color: "bg-brand-red",
    size: "md:col-span-1 md:row-span-1",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
    accent: "#E5302C",
  },
  {
    title: "Van Cleef & Arpels",
    subtitle: "Full facade storefront branding",
    category: "Window Display",
    tag: "Signage",
    color: "bg-brand-blue-dark",
    size: "md:col-span-2 md:row-span-1",
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314",
    accent: "#1A2B6D",
  },
  {
    title: "MAC Cosmetics",
    subtitle: "Full shop fit-out & LED signage",
    category: "Shop Fit-Out",
    tag: "Installation",
    color: "bg-brand-yellow",
    size: "md:col-span-2 md:row-span-1",
    img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2",
    accent: "#C9A84C",
  },
  {
    title: "Versace",
    subtitle: "Event wall & exhibition branding",
    category: "Events & Exhibitions",
    tag: "Production",
    color: "bg-brand-red",
    size: "md:col-span-1 md:row-span-1",
    img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    accent: "#E5302C",
  },
  {
    title: "Tory Burch",
    subtitle: "Arabesque laser-cut window",
    category: "Window Display",
    tag: "Installation",
    color: "bg-brand-blue-light",
    size: "md:col-span-1 md:row-span-1",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    accent: "#2C7BE5",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const tagColors: Record<string, string> = {
  Installation: 'bg-brand-blue-light text-white',
  Production: 'bg-brand-red text-white',
  Signage: 'bg-brand-yellow text-black',
};

function ProjectCard({ project }: { project: typeof projects[number] }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 cursor-pointer ${project.size}`}
      data-cursor="view"
    >
      <Image
        src={project.img}
        alt={project.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
        unoptimized={false}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/30 transition-opacity duration-500 group-hover:opacity-90" />

      <div
        className="absolute bottom-0 left-0 w-full h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ backgroundColor: project.accent }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full ${tagColors[project.tag] ?? 'bg-white/20 text-white'}`}>
            {project.tag}
          </span>
          <span className="text-xs text-white/50 font-medium tracking-wide">
            {project.category}
          </span>
        </div>

        <h3
          className="font-syne font-bold text-white leading-tight"
          style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)' }}
        >
          {project.title}
        </h3>
        <p className="text-white/55 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-75 font-light tracking-wide">
          {project.subtitle}
        </p>
      </div>

      <div
        className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: project.accent }}
      />
    </motion.div>
  );
}

const brands = [
  '/images/company_svgs/alpha_nero.svg',
  '/images/company_svgs/altayer.svg',
  '/images/company_svgs/brandoptions.svg',
  '/images/company_svgs/impact.svg',
  '/images/company_svgs/onerx.svg',
  '/images/company_svgs/storemakers.svg',
];

const MarqueeCarousel = () => {
  return (
    <div className="mt-16 sm:mt-24">
      <p className="text-base sm:text-lg text-center text-white/50 mb-8 font-space-grotesk uppercase tracking-[0.2em]">
        Trusted by
      </p>

      <motion.div
        className="relative overflow-hidden py-8 sm:py-12 bg-white/[0.02] border-y border-white/10"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="flex w-full">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="flex shrink-0 gap-16 sm:gap-24 pr-16 sm:pr-24"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {brands.map((brand, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center flex-shrink-0 h-8 sm:h-10 w-auto opacity-50 hover:opacity-100 transition-opacity duration-300"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={brand} alt={`Brand ${idx}`} className="h-full w-auto object-contain" />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32 relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading>Our Work</SectionHeading>


      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 auto-rows-[260px] sm:auto-rows-[320px] gap-4 sm:gap-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {projects.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
        className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10"
      >
        {[
          { label: 'Window Displays', value: '150+' },
          { label: 'Mall Pop-Ups', value: '80+' },
          { label: 'Luxury Brands', value: '40+' },
          { label: 'Years in Kuwait', value: '10+' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center py-7 bg-white/[0.03] hover:bg-white/[0.07] transition-colors duration-300"
          >
            <span className="font-syne font-bold text-3xl sm:text-4xl text-white">
              {stat.value}
            </span>
            <span className="text-xs text-white/40 mt-1 tracking-widest uppercase font-space-grotesk">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

      <MarqueeCarousel />
    </section>
  );
}