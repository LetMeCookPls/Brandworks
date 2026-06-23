'use client';

import { motion, AnimatePresence, useMotionValue, useScroll, useTransform, animate } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import Image from 'next/image';
import { useRef, useEffect, useCallback, useState } from 'react';

// ─── Motion easing ───────────────────────────────────────────────────────────
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Card data types ─────────────────────────────────────────────────────────
type CardVariant = 'portrait' | 'landscape';

interface CardData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tag: string;
  img: string;
  accent: string;
  /** portrait = 3:4 (tall)   |   landscape = 16:9 (wide) */
  variant: CardVariant;
}

// ─── Project data ─────────────────────────────────────────────────────────────
//
//  Three-zone editorial layout matching the reference:
//
//  LEFT (3/12)     │  CENTER HERO (6/12)  │  RIGHT (3/12)
//  ─────────────── │  ────────────────────  │  ───────────────
//  portrait card   │                       │  portrait card
//  landscape card  │  hero carousel        │  landscape card
//
//  Portrait  = aspect-ratio 3:4  (tall)
//  Landscape = aspect-ratio 16:9 (wide)
//
const leftCards: CardData[] = [
  {
    id: 'dior',
    title: 'Dior',
    subtitle: 'Sculptural window display',
    category: 'Window Display',
    tag: 'Installation',
    img: '/images/work_images/Qwe1.jpg',
    accent: '#2C7BE5',
    variant: 'portrait',
  },
  {
    id: 'valentino',
    title: 'Valentino',
    subtitle: 'Beauty mall pop-up in Rosso',
    category: 'Mall Pop-Up',
    tag: 'Production',
    img: '/images/work_images/Qwe2.jpg',
    accent: '#E5302C',
    variant: 'landscape',
  },
];

// ─── Hero carousel slides ────────────────────────────────────────────────────
const heroSlides = [
  {
    id: 'lv',
    title: 'Louis Vuitton',
    subtitle: 'Scale-pattern arch pop-up installation in The Avenues Mall',
    category: 'Mall Pop-Up',
    tag: 'Installation',
    img: '/images/work_images/Qwe3.jpg',
    accent: '#C9A84C',
    year: '2024',
  },
  {
    id: 'mac',
    title: 'MAC Cosmetics',
    subtitle: 'Full shop fit-out with floor-to-ceiling LED signage system',
    category: 'Shop Fit-Out',
    tag: 'Installation',
    img: '/images/work_images/Qwe4.jpg',
    accent: '#E5302C',
    year: '2024',
  },
  {
    id: 'tory',
    title: 'Tory Burch',
    subtitle: 'Arabesque laser-cut window display in 360 Mall',
    category: 'Window Display',
    tag: 'Installation',
    img: '/images/work_images/Qwe5.jpg',
    accent: '#2C7BE5',
    year: '2023',
  },
  {
    id: 'vc',
    title: 'Van Cleef & Arpels',
    subtitle: 'Bespoke full-facade storefront branding & illuminated signage',
    category: 'Window Display',
    tag: 'Signage',
    img: '/images/work_images/Qwe6.jpg',
    accent: '#C9A84C',
    year: '2023',
  },
  {
    id: 'chanel',
    title: 'Chanel',
    subtitle: 'Exclusive holiday season boutique installation',
    category: 'Boutique Display',
    tag: 'Installation',
    img: '/images/work_images/Qwe11.jpg',
    accent: '#000000',
    year: '2024',
  },
  {
    id: 'hermes',
    title: 'Hermès',
    subtitle: 'Artisanal window displays featuring handcrafted elements',
    category: 'Window Display',
    tag: 'Production',
    img: '/images/work_images/Qwe12.jpg',
    accent: '#F37021',
    year: '2023',
  },
  {
    id: 'gucci',
    title: 'Gucci',
    subtitle: 'Immersive pop-up space for the new collection launch',
    category: 'Mall Pop-Up',
    tag: 'Installation',
    img: '/images/work_images/Qwe13.jpg',
    accent: '#105B3A',
    year: '2024',
  },
  {
    id: 'rolex',
    title: 'Rolex',
    subtitle: 'Premium exhibition stand and illuminated logo display',
    category: 'Events & Exhibitions',
    tag: 'Signage',
    img: '/images/work_images/Qwe14.jpg',
    accent: '#006039',
    year: '2023',
  },
  {
    id: 'prada',
    title: 'Prada',
    subtitle: 'Minimalist neon integration for flagship store exterior',
    category: 'Shop Fit-Out',
    tag: 'Signage',
    img: '/images/work_images/Qwe15.jpg',
    accent: '#000000',
    year: '2024',
  },
  {
    id: 'cartier',
    title: 'Cartier',
    subtitle: 'Bespoke red and gold festive mall atrium installation',
    category: 'Mall Pop-Up',
    tag: 'Production',
    img: '/images/work_images/Qwe16.jpg',
    accent: '#E32636',
    year: '2024',
  },
];

const rightCards: CardData[] = [
  {
    id: 'tiffany',
    title: 'Tiffany & Co.',
    subtitle: 'Curved LED mall pavilion',
    category: 'Mall Pop-Up',
    tag: 'Installation',
    img: '/images/work_images/Qwe7.jpg',
    accent: '#00A693',
    variant: 'portrait',
  },
  {
    id: 'versace',
    title: 'Versace',
    subtitle: 'Event wall & exhibition branding',
    category: 'Events & Exhibitions',
    tag: 'Production',
    img: '/images/work_images/Qwe8.jpg',
    accent: '#E5302C',
    variant: 'landscape',
  },
];

const centerTopCard: CardData = {
  id: 'center-top',
  title: 'Aesop',
  subtitle: 'Retail interior design',
  category: 'Interior',
  tag: 'Production',
  img: '/images/work_images/Qwe9.jpg',
  accent: '#E5302C',
  variant: 'landscape',
};

const centerBottomCard: CardData = {
  id: 'center-bottom',
  title: 'Kith',
  subtitle: 'Minimalist retail experience',
  category: 'Interior',
  tag: 'Installation',
  img: '/images/work_images/Qwe10.jpg',
  accent: '#2C7BE5',
  variant: 'landscape',
};

// ─── Tag pill colour map ──────────────────────────────────────────────────────
const tagColors: Record<string, { bg: string; color: string }> = {
  Installation: { bg: 'rgba(33,150,232,0.18)', color: '#60b4f8' },
  Production:   { bg: 'rgba(244,37,37,0.15)',  color: '#f47070' },
  Signage:      { bg: 'rgba(255,215,0,0.14)',  color: '#ffd85c' },
};

// ─── Side card component ──────────────────────────────────────────────────────
function SideCard({
  project,
  index,
}: {
  project: CardData;
  index: number;
}) {
  const tag = tagColors[project.tag] ?? { bg: 'rgba(255,255,255,0.10)', color: '#ffffff' };

  return (
    <motion.div
      className={`side-card side-card--${project.variant} group cursor-pointer`}
      style={{ position: 'relative', overflow: 'hidden' }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '100%' }}
      transition={{ duration: 0.85, ease: EASE, delay: index * 0.1 }}
      whileHover={{ scale: 1.012 }}
    >
      {/* Image */}
      <div className="side-card__img-wrap">
        <Image
          src={project.img}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="side-card__img object-cover"
          unoptimized={false}
        />

        {/* accent bar */}
        <div
          className="absolute bottom-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100
                     transition-transform duration-500 origin-left"
          style={{ backgroundColor: project.accent }}
        />
      </div>

      {/* Overlay text */}
      <div className="absolute bottom-0 left-0 right-0 h-[25%] max-h-[25%] flex flex-col justify-center px-4 overflow-hidden
                      glass border-x-0 border-b-0 border-t-white/10 z-20
                      translate-y-1 group-hover:translate-y-0 transition-all duration-500 ease-out">
        {/* Darkening layer strictly constrained to the 25% boundary */}
        <div className="absolute inset-0 bg-black/50 z-0" />
        
        {/* Horizontal arrangement to prevent vertical overflow on small cards */}
        <div className="flex items-center justify-between w-full relative z-10">
           <div className="flex-1 min-w-0 pr-2">
              <h3 className="font-syne font-semibold text-white text-[clamp(11px,1.2vw,16px)] leading-tight truncate">
                {project.title}
              </h3>
              <p className="text-white/50 text-[clamp(9px,0.9vw,11px)] leading-snug truncate mt-0.5 font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-400 delay-75">
                {project.subtitle}
              </p>
           </div>
           {/* Tag - shrinks down if needed, hidden on absolute smallest sizes */}
           <span className="hidden sm:inline-block shrink-0 px-2 py-[2px] text-[8px] font-bold uppercase rounded-full whitespace-nowrap" style={{ background: tag.bg, color: tag.color }}>
             {project.tag}
           </span>
        </div>
      </div>

      {/* accent dot */}
      <div
        className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100
                   transition-opacity duration-300"
        style={{ backgroundColor: project.accent, boxShadow: `0 0 8px ${project.accent}` }}
      />
    </motion.div>
  );
}

// ─── Hero card — auto-advancing carousel with Ken Burns grow ─────────────────
const SLIDE_DURATION = 4500; // ms per slide

interface HeroCardProps {
  /** Scroll-driven scale: 1 → fills viewport */
  scrollScale: MotionValue<number>;
  /** Scroll-driven border radius: 20px → 0px */
  scrollRadius: MotionValue<number>;
  /** Scroll-driven opacity: 1 → 0 */
  scrollOpacity: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

function HeroCard({ scrollScale, scrollRadius, scrollOpacity, scrollYProgress }: HeroCardProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setCurrent(idx);
  }, []);

  const advance = useCallback(() => {
    setCurrent(prev => {
      const next = (prev + 1) % heroSlides.length;
      setDirection(1);
      return next;
    });
  }, []);

  // Auto-advance timer — restarts whenever current changes
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(advance, SLIDE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, isPaused, advance]);

  const slide = heroSlides[current];
  const tag = tagColors[slide.tag] ?? { bg: 'rgba(255,255,255,0.10)', color: '#ffffff' };

  // Scroll-driven image zoom scale: starts zoomed in at 1.4, zooms out smoothly to 1.0
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.4, 1.0]);

  // Slide variants — crossfade (opacity) + slight horizontal drift
  const imgVariants = {
    enter: (dir: number) => ({ opacity: 0, scale: 1.06, x: dir * 30 }),
    center: { opacity: 1, scale: 1, x: 0 },
    exit:  (dir: number) => ({ opacity: 0, scale: 0.97, x: dir * -20 }),
  };

  // Text variants — slide up on enter
  const textVariants = {
    enter: { opacity: 0, y: 18 },
    center: { opacity: 1, y: 0 },
    exit:  { opacity: 0, y: -10 },
  };

  return (
    <motion.div
      className="hero-card group cursor-pointer"
      style={{
        position: 'relative',
        overflow: 'hidden',
        // Scroll-driven growth and fade
        scale: scrollScale,
        borderRadius: scrollRadius,
        opacity: scrollOpacity,
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── CAROUSEL IMAGES — crossfade + Ken Burns grow ── */}
      <AnimatePresence initial={false} custom={direction} mode="sync">
        <motion.div
          key={slide.id}
          custom={direction}
          variants={imgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          {/* Scroll-driven zoom wrapper */}
          <motion.div
            className="absolute inset-0"
            style={{ scale: imageScale }}
          >
            {/* Ken Burns slow zoom — continuous grow on the active image */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.0 }}
              animate={{ scale: 1.10 }}
              transition={{ duration: SLIDE_DURATION / 1000 + 1, ease: 'linear' }}
            >
              <Image
                src={slide.img}
                alt={slide.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                unoptimized={false}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10" />

      {/* ── Top bar — tag + year ── */}
      <div className="absolute top-6 left-6 right-6 flex items-center z-20">
        <AnimatePresence mode="wait">
          <motion.span
            key={slide.id + '-tag'}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.4 }}
            className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full"
            style={{ background: tag.bg, color: tag.color, backdropFilter: 'blur(8px)' }}
          >
            {slide.tag}
          </motion.span>
        </AnimatePresence>

        {/* Centered Year */}
        <div className="absolute inset-x-0 flex justify-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.span
              key={slide.id + '-year'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="text-[11px] text-white/45 font-light tracking-widest font-space-grotesk"
            >
              {slide.year}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>



      {/* ── Accent progress bar — animates across full width per slide ── */}
      <AnimatePresence>
        {!isPaused && (
          <motion.div
            key={current + '-bar'}
            className="absolute top-0 left-0 h-[2px] z-30"
            style={{ backgroundColor: slide.accent, width: '100%' }}
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
          />
        )}
      </AnimatePresence>

      {/* ── Bottom overlay — title + subtitle + controls ── */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[25%] max-h-[25%] px-7 flex items-center justify-between z-20
                   glass border-x-0 border-b-0 border-t-white/10"
        style={{ borderBottomLeftRadius: scrollRadius, borderBottomRightRadius: scrollRadius }}
      >
        <div className="absolute inset-0 bg-black/50 z-0" style={{ borderBottomLeftRadius: scrollRadius, borderBottomRightRadius: scrollRadius }} />

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + '-text'}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: EASE }}
            className="flex-1 pr-6 relative z-10"
          >
            <span className="text-[10px] text-white/45 font-medium tracking-wider mb-1 block font-space-grotesk">
              {slide.category}
            </span>
            <h3
              className="font-syne font-bold text-white leading-tight mb-1 truncate"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)' }}
            >
              {slide.title}
            </h3>
            <p
              className="text-white/55 font-light tracking-wide leading-snug line-clamp-1"
              style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)', maxWidth: '40ch' }}
            >
              {slide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* ── Controls: Counter, Dots, Arrows ── */}
        <div className="flex flex-col items-end gap-3 flex-shrink-0 relative z-10">
          <div className="flex items-center gap-4">
            {/* Slide counter */}
            <span className="font-space-grotesk text-[11px] text-white/50 tracking-widest">
              {String(current + 1).padStart(2, '0')}
              <span className="text-white/20 mx-1">/</span>
              {String(heroSlides.length).padStart(2, '0')}
            </span>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {heroSlides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  aria-label={`Go to slide ${i + 1}: ${s.title}`}
                  className="hero-dot"
                  style={{
                    width: i === current ? '28px' : '8px',
                    height: '8px',
                    borderRadius: '999px',
                    background: i === current ? slide.accent : 'rgba(255,255,255,0.25)',
                    transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                    border: 'none',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Prev / Next arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => goTo((current - 1 + heroSlides.length) % heroSlides.length, -1)}
              aria-label="Previous slide"
              className="hero-arrow"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => goTo((current + 1) % heroSlides.length, 1)}
              aria-label="Next slide"
              className="hero-arrow"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Stats bar ────────────────────────────────────────────────────────────────
const stats = [
  { label: 'Window Displays', value: '150+' },
  { label: 'Mall Pop-Ups',    value: '80+'  },
  { label: 'Luxury Brands',   value: '40+'  },
  { label: 'Years in Kuwait', value: '10+'  },
];

// ─── Marquee brands ───────────────────────────────────────────────────────────
const brands = [
  '/images/company_svgs/abra.svg',
  '/images/company_svgs/acerta.svg',
  '/images/company_svgs/allure_designs.svg',
  '/images/company_svgs/alpha_nero.svg',
  '/images/company_svgs/altavia.svg',
  '/images/company_svgs/altayer.svg',
  '/images/company_svgs/art_decor.svg',
  '/images/company_svgs/brandoptions.svg',
  '/images/company_svgs/chalhoub_group.svg',
  '/images/company_svgs/chryseks.svg',
  '/images/company_svgs/edge_global.svg',
  '/images/company_svgs/hemlock.svg',
  '/images/company_svgs/hmy.svg',
  '/images/company_svgs/impact.svg',
  '/images/company_svgs/mb.svg',
  '/images/company_svgs/meisterwek.svg',
  '/images/company_svgs/onerx.svg',
  '/images/company_svgs/pardgroup.svg',
  '/images/company_svgs/roots.svg',
  '/images/company_svgs/storemakers.svg',
  '/images/company_svgs/the_collective.svg',
  '/images/company_svgs/tph.svg',
  '/images/company_svgs/tricolor.svg',
  '/images/company_svgs/visual_display.svg',
  '/images/company_svgs/welldone.svg',
];

function MarqueeCarousel() {
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const track = [...brands, ...brands];

  const startMarquee = useCallback((fromX: number) => {
    animRef.current?.stop();
    if (!trackRef.current) return;
    const halfWidth = trackRef.current.scrollWidth / 2;
    if (!halfWidth) return;
    let start = fromX % halfWidth;
    if (start > 0) start -= halfWidth;
    if (start < -halfWidth) start = 0;
    x.set(start);
    const remaining = halfWidth + start;
    const segmentDuration = (remaining / halfWidth) * 25;
    animRef.current = animate(x, -halfWidth, {
      duration: segmentDuration,
      ease: 'linear',
      onComplete: () => startMarquee(0),
    });
  }, [x]);

  useEffect(() => {
    const t = setTimeout(() => startMarquee(0), 80);
    return () => { clearTimeout(t); animRef.current?.stop(); };
  }, [startMarquee]);

  return (
    <div className="mt-16 sm:mt-24">
      <p className="text-sm text-center text-white/35 mb-8 font-space-grotesk uppercase tracking-[0.22em]">
        Trusted by
      </p>
      <motion.div
        className="relative overflow-hidden py-8 sm:py-12 border-y"
        style={{
          borderColor: 'rgba(255,255,255,0.07)',
          background: 'rgba(255,255,255,0.015)',
          maskImage: 'linear-gradient(to right, transparent, black 14%, black 86%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 14%, black 86%, transparent)',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <motion.div
          ref={trackRef}
          style={{ x, display: 'flex', gap: '4rem' }}
          drag="x"
          dragConstraints={{ left: -100000, right: 100000 }}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => { animRef.current?.stop(); setIsDragging(true); }}
          onDragEnd={() => { setIsDragging(false); startMarquee(x.get()); }}
        >
          {track.map((brand, idx) => (
            <div key={idx} className="flex items-center justify-center flex-shrink-0 h-8 sm:h-10 w-auto
                                      opacity-40 hover:opacity-85 transition-opacity duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={brand} alt={`Brand ${idx}`}
                   className="h-full w-auto object-contain pointer-events-none select-none"
                   draggable={false} />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Projects() {
  // ── Scroll-pin zone ref — 280 vh of scroll drives the animation ─────────────
  const pinZoneRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the pin zone
  // 0 = grid's top hits viewport top  |  1 = grid's bottom hits viewport bottom
  const { scrollYProgress } = useScroll({
    target: pinZoneRef,
    offset: ['start start', 'end end'],
  });

  // ── Desktop detection for animations ────────────────────────────────────────
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 769px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // ── Animation sequence ──────────────────────────────────────────────────────
  // Phase 1 (0 -> 0.4): Hero expands to fill viewport, sides fly out
  // Phase 2 (0.4 -> 0.6): Hold max scale for viewing
  // Phase 3 (0.6 -> 0.9): Hero holds size but fades away smoothly
  
  // Max scale is 2.1 (avoids vertically clipping the arrows on normal viewports)
  const heroScale   = useTransform(scrollYProgress, [0.15, 0.55], [1, 2.1]);
  // Maintain a visual 20px radius by dividing by the current scale
  const heroRadius  = useTransform(heroScale, (scale) => 20 / scale);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

  // Center floating cards translate vertically outward during Phase 1
  const topCenterY = useTransform(scrollYProgress, [0.15, 0.55], ['0%', '-300%']);
  const bottomCenterY = useTransform(scrollYProgress, [0.15, 0.55], ['0%', '300%']);

  // Side columns slide out horizontally during Phase 1
  const leftX  = useTransform(scrollYProgress, [0.15, 0.55], ['0%', '-165%']);
  const rightX = useTransform(scrollYProgress, [0.15, 0.55], ['0%',  '165%']);
  
  // Fade out side columns and floating cards much later in the scroll sequence
  const sideOpacity = useTransform(scrollYProgress, [0.65, 0.75], [1, 0]);
  const sideVisibility = useTransform(scrollYProgress, (v) => v >= 0.75 ? 'hidden' : 'visible');

  // ── Section header: remains fully visible at all times ─────────────────
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
  // Header stays fixed below the Nav bar, acting as a sticky title
  const headerY       = useTransform(scrollYProgress, [0, 1], ['0vh', '0vh']);
  
  // ── Grid positioning ───────────────────────────────────────────────────
  // Simulate normal scroll during the 0-15% "dead zone" so the bottom cards
  // fully enter the viewport on shorter screens, before scattering begins.
  const gridY         = useTransform(scrollYProgress, [0, 0.15, 0.55], ['0vh', '-12vh', '0vh']);

  // ── Responsive Animation Wrappers ───────────────────────────────────────
  // These wrappers ensure the scroll transforms only apply on desktop.
  // On mobile, the elements stay in their default normal-flow positions.
  const activeHeroScale = useTransform(heroScale, v => isDesktop ? v : 1);
  const activeHeroRadius = useTransform(heroRadius, v => isDesktop ? v : 20);
  const activeHeroOpacity = useTransform(heroOpacity, v => isDesktop ? v : 1);
  const activeTopCenterY = useTransform(topCenterY, v => isDesktop ? v : '0%');
  const activeBottomCenterY = useTransform(bottomCenterY, v => isDesktop ? v : '0%');
  const activeLeftX = useTransform(leftX, v => isDesktop ? v : '0%');
  const activeRightX = useTransform(rightX, v => isDesktop ? v : '0%');
  const activeSideOpacity = useTransform(sideOpacity, v => isDesktop ? v : 1);
  const activeSideVisibility = useTransform(sideVisibility, v => isDesktop ? v : 'visible');
  const activeHeaderOpacity = useTransform(headerOpacity, v => isDesktop ? v : 1);
  const activeHeaderY = useTransform(headerY, v => isDesktop ? v : '0vh');
  const activeGridY = useTransform(gridY, v => isDesktop ? v : '0vh');

  return (
    <section id="projects" className="projects-section-outer relative z-10">

      {/* ════════════════════════════════════════════════════════════════
          SCROLL-PIN ZONE — 280 vh gives ~180 vh of animation headroom
          The inner sticky div pins to the top of the viewport while
          the user scrolls through the full 280 vh, driving the hero
          scale + side-column translations via scrollYProgress.
      ════════════════════════════════════════════════════════════════ */}
      <div
        ref={pinZoneRef}
        className="scroll-pin-zone"
      >
        {/* ── STICKY FRAME — stays at top: 0 while pinZoneRef scrolls ── */}
        <div className="scroll-pin-sticky">
          <div className="projects-container" style={{ width: '100%' }}>

            {/* Section header — stays static under nav bar */}
            <motion.div
              className="projects-header relative z-30"
              style={{ opacity: activeHeaderOpacity, y: activeHeaderY }}
            >
              <SectionHeading>Our Works</SectionHeading>
              <motion.p
                className="projects-subtitle font-syne"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
              >
                Selected Luxury Retail &amp; Exhibition Installations<br />Across Global Markets
              </motion.p>
            </motion.div>

            {/* ── 12-column editorial grid ──────────────────────────────
                Col distribution:
                  LEFT  → 3 col  (25%)  translated out left
                  HERO  → 6 col  (50%)  scaled to fill viewport
                  RIGHT → 3 col  (25%)  translated out right
                All gutters: 24 px | hero height: 3 × side-card + 2 × gap
            ─────────────────────────────────────────────────────────── */}
            <motion.div className="editorial-grid" style={{ y: activeGridY }}>

              {/* LEFT column — slides out left */}
              <motion.div
                className="editorial-col editorial-col--left"
                style={{ x: activeLeftX, opacity: activeSideOpacity, visibility: activeSideVisibility as any }}
              >
                {leftCards.map((card, i) => (
                  <SideCard key={card.id} project={card} index={i} />
                ))}
              </motion.div>

              {/* CENTER hero — grows to fill sticky viewport */}
              <div className="editorial-col editorial-col--hero">
                {/* Floating Top Right */}
                <motion.div style={{ y: activeTopCenterY, width: '45%', alignSelf: 'flex-end', zIndex: 11, opacity: activeSideOpacity, visibility: activeSideVisibility as any }}>
                  <SideCard project={centerTopCard} index={0} />
                </motion.div>
                
                <HeroCard 
                  scrollScale={activeHeroScale} 
                  scrollRadius={activeHeroRadius} 
                  scrollOpacity={activeHeroOpacity} 
                  scrollYProgress={scrollYProgress}
                />
                
                {/* Floating Bottom Left */}
                <motion.div style={{ y: activeBottomCenterY, width: '45%', alignSelf: 'flex-start', zIndex: 11, opacity: activeSideOpacity, visibility: activeSideVisibility as any }}>
                  <SideCard project={centerBottomCard} index={1} />
                </motion.div>
              </div>

              {/* RIGHT column — slides out right */}
              <motion.div
                className="editorial-col editorial-col--right"
                style={{ x: activeRightX, opacity: activeSideOpacity, visibility: activeSideVisibility as any }}
              >
                {rightCards.map((card, i) => (
                  <SideCard key={card.id} project={card} index={i} />
                ))}
              </motion.div>

            </motion.div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          BELOW-FOLD CONTENT — normal flow, appears after pin releases
      ════════════════════════════════════════════════════════════════ */}
      <div className="projects-container projects-below-fold">

        {/* Stats bar */}
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="stats-outer">
              <div className="stats-dot" />
              <div className="stats-card">
                <div className="stats-ray" />
                <div className="stats-line stats-topl" />
                <div className="stats-line stats-bottoml" />
                <div className="stats-line stats-leftl" />
                <div className="stats-line stats-rightl" />
                <span className="stats-value font-syne">{stat.value}</span>
                <span className="stats-label font-space-grotesk">{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Brand marquee */}
        {/* <MarqueeCarousel /> */}
      </div>
    </section>
  );
}