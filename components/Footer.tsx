'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import HoverSplitText from '@/components/HoverSplitText'
import { usePathname } from 'next/navigation'

// ─── Icon components ──────────────────────────────────────────────────────────
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l1.65-3.8A9 9 0 1 1 20 18.94a9 9 0 0 1-12.8 0L3 21z"/>
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1z"/>
  </svg>
)

// Shared staggered animation container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
  }
}

// ─── Inner component — owns all hooks ────────────────────────────────────────
function FooterContent() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start end', 'end end'],
  })

  const wordmarkScale = useTransform(scrollYProgress, [0, 0.35, 0.9, 1], [0.35, 0.35, 1, 1])

  return (
    <footer className="relative w-full bg-[#050508] text-white min-h-[100svh] flex flex-col justify-between">
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 1,
          pointerEvents: 'none',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      >
        <source src="https://res.cloudinary.com/dehtmwxwn/video/upload/v1782716384/VN20260629_122121_fjccwt.mp4" type="video/mp4" />
      </video>

      {/* GRADIENT OVERLAY */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(5,5,8,0.45) 0%, rgba(5,5,8,0.25) 40%, rgba(5,5,8,0.55) 100%)',
        pointerEvents: 'none',
      }} />

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 w-full flex flex-col justify-end min-h-[100svh]">

        {/* WORDMARK SECTION */}
        <div
          ref={wrapperRef}
          style={{
            position: 'relative',
            zIndex: 10,
            marginTop: 'calc(-341px - clamp(30px, 12vw, 130px))',
            height: 'max(80vh, 1000px)',
          }}
        >
          <motion.div
            style={{
              position: 'sticky',
              top: 'calc(100svh - clamp(110px, 23vw, 270px) - 15vh)',
              scale: wordmarkScale,
              transformOrigin: 'bottom center',
              textAlign: 'center',
              willChange: 'transform',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* BRANDWORKS */}
              <div className="liquid-glass-text" style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(72px, 16vw, 190px)',
                letterSpacing: '0.01em',
                lineHeight: 0.92,
                display: 'block',
              }}>
                BRANDWORKS
              </div>
  
              {/* ADVERTISING CO. */}
              <div className="liquid-glass-text" style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(26px, 5.5vw, 62px)',
                letterSpacing: '0.18em',
                marginTop: '-4px',
                display: 'block',
                opacity: 0.88,
                WebkitTextStroke: 'max(0.5px, 0.05vw) rgba(255,255,255,0.7)',
              }}>
                ADVERTISING CO.
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* BOTTOM CONTENT (Staggered smooth reveal) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          variants={containerVariants}
          className="w-full relative z-10 pt-16"
        >
          <motion.div variants={itemVariants}>
            {/* DIVIDER 1 */}
            <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.10)' }} className="md:mx-12 mx-6" />

            {/* NAVIGATION ROW */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }} className="gap-6 md:gap-12 px-6 md:px-12 py-9 text-[13px] md:text-[15px]">
              {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
                <HoverSplitText
                  key={item}
                  text={item}
                  href={`/#${item.toLowerCase()}`}
                  staggerDelay={0.015}
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontWeight: 400,
                    letterSpacing: '0.04em',
                    color: 'rgba(255,255,255,0.55)',
                  }}
                  className="hover:text-white transition-colors duration-200"
                  onClick={(e) => {
                    const el = document.getElementById(item.toLowerCase());
                    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
                  }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            {/* DIVIDER 2 */}
            <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.10)' }} className="md:mx-12 mx-6" />

            {/* CONTACT INFO GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row lg:justify-between w-full gap-10 lg:gap-0 px-6 md:px-12 py-16 items-start">
              {/* COLUMN 1: Address */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.38)', marginBottom: '16px' }}>Address</div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-[10px]">
                  <MapPin size={14} color="rgba(255,255,255,0.45)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div className="flex flex-col gap-[4px] items-center sm:items-start">
                    <span style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }} className="hover:text-white transition-colors">Brand Works International Company LLC</span>
                    <span style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }} className="hover:text-white transition-colors">Street 22, near Naif Poultry</span>
                    <span style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }} className="hover:text-white transition-colors">Shuwaikh Industrial Area 2, Kuwait</span>
                  </div>
                </div>
              </div>

              {/* COLUMN 2: Phone */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.38)', marginBottom: '16px' }}>Phone</div>
                <div className="flex items-center gap-[10px]">
                  <Phone size={14} color="#0DC76A" style={{ flexShrink: 0 }} />
                  <HoverSplitText text="+965 507 27586" href="tel:+96550727586" staggerDelay={0.012} style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.65)' }} className="hover:text-white transition-colors" />
                </div>
                <div className="flex items-center gap-[10px] mt-3">
                  <Phone size={14} color="#0DC76A" style={{ flexShrink: 0 }} />
                  <HoverSplitText text="+971 55 998 1420" href="tel:+971559981420" staggerDelay={0.012} style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.65)' }} className="hover:text-white transition-colors" />
                </div>
              </div>

              {/* COLUMN 3: Email */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.38)', marginBottom: '16px' }}>Email</div>
                <div className="flex items-center gap-[10px]">
                  <Mail size={14} color="#2196E8" style={{ flexShrink: 0 }} />
                  <HoverSplitText text="info@brandworkskwt.com" href="mailto:info@brandworkskwt.com" staggerDelay={0.012} style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.65)' }} className="hover:text-white transition-colors" />
                </div>
                <div className="flex items-center gap-[10px] mt-3">
                  <Mail size={14} color="#2196E8" style={{ flexShrink: 0 }} />
                  <HoverSplitText text="mustafa@brandworkskwt.com" href="mailto:mustafa@brandworkskwt.com" staggerDelay={0.012} style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.65)' }} className="hover:text-white transition-colors" />
                </div>
              </div>

              {/* COLUMN 4: Follow Us */}
              <div className="flex flex-col items-center sm:items-start">
                <div style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.38)', marginBottom: '16px' }}>Follow Us</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }} className="glass-pill glass-hover hover:text-[#F42525] transition-all duration-200 text-[rgba(255,255,255,0.65)] px-4 py-2">
                  <InstagramIcon />
                  <HoverSplitText text="Instagram" href="https://instagram.com/brandworkskw" staggerDelay={0.012} style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '14px', color: 'inherit' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }} className="glass-pill glass-hover hover:text-[#2196E8] transition-all duration-200 text-[rgba(255,255,255,0.65)] px-4 py-2">
                  <LinkedinIcon />
                  <HoverSplitText text="LinkedIn" href="https://linkedin.com/company/brandworks" staggerDelay={0.012} style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '14px', color: 'inherit' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }} className="glass-pill glass-hover hover:text-[#0DC76A] transition-all duration-200 text-[rgba(255,255,255,0.65)] px-4 py-2">
                  <WhatsAppIcon />
                  <HoverSplitText text="WhatsApp" href="https://wa.me/96550727586" staggerDelay={0.012} style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '14px', color: 'inherit' }} />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            {/* DIVIDER 3 */}
            <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.10)' }} className="md:mx-12 mx-6" />

            {/* LEGAL ROW */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }} className="gap-6 md:gap-9 px-6 md:px-12 py-6">
              {[
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms & Conditions', path: '/terms-and-conditions' },
                { name: 'Cookie Policy', path: '/cookies' },
              ].map((item) => (
                <HoverSplitText
                  key={item.name}
                  text={item.name}
                  href={item.path}
                  staggerDelay={0.012}
                  style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}
                  className="hover:text-[rgba(255,255,255,0.75)] transition-colors duration-200"
                />
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            {/* BOTTOM BAR */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 md:px-12 pt-5 pb-10 text-center md:text-left">
              <div className="flex flex-col items-center md:items-start">
                <span style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginBottom: '2px' }}>
                  © {new Date().getFullYear()} Brandworks Advertising Co.
                </span>
                <span style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.22)' }}>
                  All rights reserved.
                </span>
              </div>

              <div className="glass-pill" style={{ color: 'rgba(13,198,106,0.85)', padding: '5px 16px', fontFamily: 'var(--font-space-grotesk), sans-serif', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                ✓ Licensed &amp; Registered in Kuwait
              </div>

              <div style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.20)', letterSpacing: '0.05em' }}>
                Website by Shaw &amp; LetMeCook
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </footer>
  )
}

// ─── Outer export — pathname guard ────────────────────────────────────────────
export default function Footer() {
  return <FooterContent />
}
