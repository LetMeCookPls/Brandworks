'use client';

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
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
      style={{
        position: 'relative',
        overflow: 'hidden',
        // promote to GPU layer for smooth hover scale
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '100%' }}
      transition={{ duration: 0.85, ease: EASE, delay: index * 0.1 }}
      whileHover={{ scale: 1.012, transition: { duration: 0.3, ease: EASE } }}
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
           {/* Tag */}
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
  scrollScale: MotionValue<number>;
  scrollRadius: MotionValue<number>;
  scrollOpacity: MotionValue<number>;
}

function HeroCard({ scrollScale, scrollRadius, scrollOpacity }: HeroCardProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setCurrent(idx);
  }, []);

  // Auto-advance: use setInterval so it reliably keeps firing every SLIDE_DURATION ms.
  // The interval is cleared and restarted whenever isPaused changes.
  // When manually navigated, we just let the current interval tick — next advance
  // resets the counter because setCurrent triggers a re-render.
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroSlides.length);
      setDirection(1);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [isPaused]);

  const slide = heroSlides[current];
  const tag = tagColors[slide.tag] ?? { bg: 'rgba(255,255,255,0.10)', color: '#ffffff' };

  // Slide variants — crossfade + slight horizontal drift
  // Using "popLayout" mode so exiting slides hand off GPU layer instantly
  const imgVariants = {
    enter: (dir: number) => ({ opacity: 0, scale: 1.04, x: dir * 24 }),
    center: { opacity: 1, scale: 1, x: 0 },
    exit:  (dir: number) => ({ opacity: 0, scale: 0.97, x: dir * -16 }),
  };

  // Text variants — slide up on enter
  const textVariants = {
    enter: { opacity: 0, y: 14 },
    center: { opacity: 1, y: 0 },
    exit:  { opacity: 0, y: -8 },
  };

  return (
    <motion.div
      className="hero-card group cursor-pointer"
      style={{
        position: 'relative',
        overflow: 'hidden',
        scale: scrollScale,
        borderRadius: scrollRadius,
        opacity: scrollOpacity,
        // GPU-promote the hero card so scroll transforms stay on compositor thread
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
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
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Ken Burns slow zoom — continuous grow on the active image */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: SLIDE_DURATION / 1000 + 0.5, ease: 'linear' }}
            style={{ willChange: 'transform' }}
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
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10" />

      {/* ── Top bar — tag + year ── */}
      <div className="absolute top-6 left-6 right-6 flex items-center z-20">
        <AnimatePresence mode="wait">
          <motion.span
            key={slide.id + '-tag'}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3, ease: EASE }}
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
              transition={{ duration: 0.3, ease: EASE }}
              className="text-[11px] text-white/45 font-light tracking-widest font-space-grotesk"
            >
              {slide.year}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Accent progress bar ── */}
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
        <motion.div
          className="absolute inset-0 bg-black/50 z-0"
          style={{ borderBottomLeftRadius: scrollRadius, borderBottomRightRadius: scrollRadius }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id + '-text'}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: EASE }}
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

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Projects() {
  const pinZoneRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: rawScroll } = useScroll({
    target: pinZoneRef,
    offset: ['start start', 'end end'],
  });

  // ── useSpring makes scroll tracking frame-rate-independent ───────────────────
  // Physics-based interpolation works identically at 60, 120 or 144 Hz because
  // spring damping is time-based (seconds), not frame-based (ticks).
  // stiffness/damping tuned for snappy-but-smooth feel without overshoot.
  const scrollYProgress = useSpring(rawScroll, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // ── Desktop detection ────────────────────────────────────────────────────────
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 769px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // ── Animation sequence ───────────────────────────────────────────────────────
  // Phase 1 (0 → 0.4): Hero expands to fill viewport, sides fly out
  // Phase 2 (0.4 → 0.6): Hold max scale for viewing
  // Phase 3 (0.6 → 0.9): Hero holds size but fades away smoothly

  // All transforms use pixel/unitless values — avoids string interpolation
  // which forces JS layout recalc on every frame.

  // Hero scale — max 2.1 avoids vertical clip on normal viewports
  const heroScaleRaw = useTransform(scrollYProgress, [0.15, 0.55], [1, 2.1]);
  // Derived border radius: 20 / scale keeps visual 20px radius constant
  const heroRadiusRaw = useTransform(heroScaleRaw, (s) => 20 / s);

  // Side columns: percentage strings removed — use pixel-based vw fractions
  // These drive GPU translate, not layout reflow
  const leftXRaw       = useTransform(scrollYProgress, [0.15, 0.55], [0, -165]);  // % unit applied in style
  const rightXRaw      = useTransform(scrollYProgress, [0.15, 0.55], [0,  165]);
  const topCenterYRaw  = useTransform(scrollYProgress, [0.15, 0.55], [0, -300]);
  const botCenterYRaw  = useTransform(scrollYProgress, [0.15, 0.55], [0,  300]);

  // Side opacity
  const sideOpacityRaw = useTransform(scrollYProgress, [0.65, 0.75], [1, 0]);

  // Grid Y correction during the "dead zone" entry — using pixel offset instead of vh string
  // 12vh ≈ scrolls with screen; use a fixed 80px which covers most cases without string interpolation
  const gridYRaw = useTransform(scrollYProgress, [0, 0.15, 0.55], [0, -80, 0]);

  // ── Conditional application (desktop only) ───────────────────────────────────
  // Instead of wrapping each value in another useTransform (10 extra derived values),
  // we use a single isDesktop gate directly in useMemo-style derived values.
  // The key insight: we create ONE conditional transform per value, not two.
  const heroScale   = useTransform(heroScaleRaw,    (v) => isDesktop ? v : 1);
  const heroRadius  = useTransform(heroRadiusRaw,   (v) => isDesktop ? v : 20);
  const leftX       = useTransform(leftXRaw,        (v) => isDesktop ? v : 0);
  const rightX      = useTransform(rightXRaw,       (v) => isDesktop ? v : 0);
  const topCenterY  = useTransform(topCenterYRaw,   (v) => isDesktop ? v : 0);
  const botCenterY  = useTransform(botCenterYRaw,   (v) => isDesktop ? v : 0);
  const sideOpacity = useTransform(sideOpacityRaw,  (v) => isDesktop ? v : 1);
  const gridY       = useTransform(gridYRaw,        (v) => isDesktop ? v : 0);

  // Convert unitless numbers to "%" strings only once per derived value
  const leftXPct      = useTransform(leftX,      (v) => `${v}%`);
  const rightXPct     = useTransform(rightX,     (v) => `${v}%`);
  const topCenterYPct = useTransform(topCenterY, (v) => `${v}%`);
  const botCenterYPct = useTransform(botCenterY, (v) => `${v}%`);
  const gridYPx       = useTransform(gridY,      (v) => `${v}px`);

  // visibility: use opacity reaching 0 naturally — avoid useTransform on visibility
  // (not GPU-accelerated; let opacity handle the visual hide, pointer-events handled by CSS)

  return (
    <section id="projects" className="projects-section-outer relative z-10">

      {/* ════════════════════════════════════════════════════════════════
          SCROLL-PIN ZONE — 280 vh of scroll drives the animation
      ════════════════════════════════════════════════════════════════ */}
      <div
        ref={pinZoneRef}
        className="scroll-pin-zone"
      >
        {/* ── STICKY FRAME ── */}
        <div className="scroll-pin-sticky">
          <div className="projects-container" style={{ width: '100%' }}>

            {/* Section header */}
            <div className="projects-header relative z-30">
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
            </div>

            {/* ── 12-column editorial grid ── */}
            <motion.div className="editorial-grid" style={{ y: gridYPx }}>

              {/* LEFT column — slides out left */}
              <motion.div
                className="editorial-col editorial-col--left"
                style={{
                  x: leftXPct,
                  opacity: sideOpacity,
                  willChange: 'transform, opacity',
                }}
              >
                {leftCards.map((card, i) => (
                  <SideCard key={card.id} project={card} index={i} />
                ))}
              </motion.div>

              {/* CENTER hero — grows to fill sticky viewport */}
              <div className="editorial-col editorial-col--hero">
                {/* Floating Top Right */}
                <motion.div style={{
                  y: topCenterYPct,
                  width: '45%',
                  alignSelf: 'flex-end',
                  zIndex: 11,
                  opacity: sideOpacity,
                  willChange: 'transform, opacity',
                }}>
                  <SideCard project={centerTopCard} index={0} />
                </motion.div>
                
                <HeroCard
                  scrollScale={heroScale}
                  scrollRadius={heroRadius}
                  scrollOpacity={useTransform(scrollYProgress, [0, 1], [1, 1])}
                />
                
                {/* Floating Bottom Left */}
                <motion.div style={{
                  y: botCenterYPct,
                  width: '45%',
                  alignSelf: 'flex-start',
                  zIndex: 11,
                  opacity: sideOpacity,
                  willChange: 'transform, opacity',
                }}>
                  <SideCard project={centerBottomCard} index={1} />
                </motion.div>
              </div>

              {/* RIGHT column — slides out right */}
              <motion.div
                className="editorial-col editorial-col--right"
                style={{
                  x: rightXPct,
                  opacity: sideOpacity,
                  willChange: 'transform, opacity',
                }}
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

      </div>
    </section>
  );
}