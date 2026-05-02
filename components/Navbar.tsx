'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from 'framer-motion'
import Link from 'next/link'
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l1.65-3.8A9 9 0 1 1 20 18.94a9 9 0 0 1-12.8 0L3 21z"/>
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1z"/>
  </svg>
)
import HoverSplitText from '@/components/HoverSplitText'

const navLinks = [
  { label: 'Home',     href: '#hero',     hoverColor: '#F42525' },
  { label: 'About',    href: '#about',    hoverColor: '#2196E8' },
  { label: 'Services', href: '#services', hoverColor: '#0DC76A' },
  { label: 'Projects', href: '#projects', hoverColor: '#FFD700' },
  { label: 'Contact',  href: '#contact',  hoverColor: '#0D35C4' },
]

export default function Navbar() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [hideForFooter, setHideForFooter] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [activeLang, setActiveLang] = useState('EN')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const lastYRef = useRef(0)
  
  // Track document height for scroll progress
  const [docHeight, setDocHeight] = useState(0)
  
  useEffect(() => {
    const updateDocHeight = () => {
      setDocHeight(document.documentElement.scrollHeight - window.innerHeight)
    }
    updateDocHeight()
    window.addEventListener('resize', updateDocHeight)
    return () => window.removeEventListener('resize', updateDocHeight)
  }, [])
  
  const scrollProgress = useTransform(scrollY, [0, docHeight || 1], ['0%', '100%'])

  useMotionValueEvent(scrollY, "change", (latest) => {
    lastYRef.current = latest

    if (latest > 60) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  })

  // Hide on footer
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const obs = new IntersectionObserver(
      ([entry]) => setHideForFooter(entry.isIntersecting),
      { threshold: 0.08 }
    )
    obs.observe(footer)
    return () => obs.disconnect()
  }, [])

  // Active section tracking
  useEffect(() => {
    const observers = new Map()
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, { threshold: 0.4 })
    
    navLinks.forEach(link => {
      const id = link.href.slice(1)
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    
    return () => observer.disconnect()
  }, [])

  const handleLangToggle = (lang: string) => {
    setActiveLang(lang)
    if (lang === 'AR') {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    }
  }

  // Combined translation Y
  const translateY = (hideForFooter) && !isMobileMenuOpen ? '-100%' : '0%'

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ 
          y: translateY,
          backgroundColor: 'transparent',
          height: isScrolled ? '64px' : '80px',
        }}
        transition={{ duration: 0.38, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 ${isScrolled ? 'navbar-glass' : ''}`}
        style={{
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        }}
      >
        {/* Top inner glow line when scrolled */}
        {isScrolled && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
          }} />
        )}
        
        {/* Scroll progress bar */}
        {isScrolled && (
          <motion.div style={{
            position: 'absolute', bottom: 0, left: 0,
            height: '1.5px',
            width: scrollProgress,
            background: 'linear-gradient(90deg, #F42525, #2196E8, #0D35C4, #0DC76A, #FFD700)',
            backgroundSize: '300% 100%',
            animation: 'scrollBarCycle 3s linear infinite',
          }} />
        )}

        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: '0 32px',
          height: '100%', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between' 
        }}>
          {/* LEFT — Logo block */}
          <Link href="/" className="flex items-center gap-[10px] group">
            {/* Logo mark */}
            <div style={{ position: 'relative', width: 44, height: 44, flexShrink: 0 }}>
              <img
                src="/logo.png"
                alt="Brandworks Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Brand name */}
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.0 }}>
              <span style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: '24px',
                letterSpacing: '0.06em',
                color: 'white',
                display: 'block',
              }}>BRANDWORKS</span>
              <span style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '11px',
                letterSpacing: '0.16em',
                color: 'rgba(255,255,255,0.55)',
                textTransform: 'uppercase',
                display: 'block',
                marginTop: '1px',
              }}>ADVERTISING CO.</span>
            </div>
          </Link>

          {/* CENTER — Nav links (desktop) */}
          <div className="hidden md:flex gap-9 items-center">
            {navLinks.map((link) => (
              <HoverSplitText
                key={link.label}
                text={link.label}
                href={link.href}
                staggerDelay={0.022}
                duration={0.38}
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '14px',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  color: activeSection === link.href.slice(1) ? 'white' : 'rgba(255,255,255,0.60)',
                }}
                onClick={() => {
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                }}
              />
            ))}
          </div>

          {/* RIGHT — Controls */}
          <div className="flex items-center gap-4">
            {/* EN / AR Language Toggle */}
            <div style={{
              display: 'flex',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '8px',
              overflow: 'hidden',
              backdropFilter: 'blur(8px)',
              background: 'rgba(255,255,255,0.06)',
            }}>
              {['EN', 'AR'].map(lang => (
                <button
                  key={lang}
                  onClick={() => handleLangToggle(lang)}
                  style={{
                    padding: '6px 12px',
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    background: activeLang === lang ? 'rgba(255,255,255,0.15)' : 'transparent',
                    color: activeLang === lang ? 'white' : 'rgba(255,255,255,0.40)',
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* CTA Desktop */}
            <div className="hidden md:block">
              <a
                href="#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'white',
                  border: '1px solid rgba(244,37,37,0.55)',
                  borderRadius: '8px',
                  padding: '8px 18px',
                  background: 'rgba(244,37,37,0.08)',
                  transition: 'background 0.25s, border-color 0.25s',
                  textDecoration: 'none',
                }}
                className="hover:bg-[rgba(244,37,37,0.22)] hover:border-[rgba(244,37,37,0.90)] group"
              >
                <HoverSplitText
                  text="Get a Quote"
                  staggerDelay={0.025}
                  style={{ color: 'inherit', fontFamily: 'inherit', letterSpacing: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', textTransform: 'inherit' }}
                />
              </a>
            </div>

            {/* Mobile Burger */}
            <button 
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] relative z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.div 
                animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} 
                transition={{ duration: 0.3, type: 'spring' }}
                className="w-6 h-[2px] bg-white rounded-full origin-center" 
              />
              <motion.div 
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} 
                transition={{ duration: 0.3 }}
                className="w-6 h-[2px] bg-white rounded-full" 
              />
              <motion.div 
                animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} 
                transition={{ duration: 0.3, type: 'spring' }}
                className="w-6 h-[2px] bg-white rounded-full origin-center" 
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* AR Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            style={{
              position: 'fixed', bottom: '24px', left: '50%',
              background: 'rgba(13,13,15,0.92)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '12px',
              padding: '12px 24px',
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '14px',
              color: 'white',
              zIndex: 100,
            }}
          >
            Arabic version coming soon
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 49,
              background: 'rgba(5,5,8,0.96)',
              backdropFilter: 'blur(32px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Inner Content */}
            <div className="flex flex-col items-center w-full max-w-sm px-6">
              {/* Logo block */}
              <div className="flex flex-col items-center mb-12">
                <div style={{ position: 'relative', width: 36, height: 36, marginBottom: '16px' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, width: 14, height: 14, background: '#F42525' }} />
                  <div style={{ position: 'absolute', top: 11, left: 8, width: 14, height: 14, background: '#2196E8' }} />
                  <div style={{ position: 'absolute', top: 11, right: 0, width: 14, height: 14, background: '#0D35C4' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: 14, height: 14, background: '#0DC76A' }} />
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, background: '#FFD700' }} />
                </div>
                <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '20px', letterSpacing: '0.06em', color: 'white' }}>
                  BRANDWORKS
                </span>
              </div>

              {/* Links */}
              <motion.div 
                className="flex flex-col items-center gap-6 mb-16"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.06 } }
                }}
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.label}
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
                    }}
                  >
                    <HoverSplitText
                      text={link.label}
                      href={link.href}
                      staggerDelay={0.015}
                      duration={0.45}
                      style={{
                        fontFamily: 'var(--font-bebas)',
                        fontSize: '52px',
                        letterSpacing: '0.04em',
                        color: 'rgba(255,255,255,0.85)',
                      }}
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Bottom Elements */}
              <div className="w-full flex flex-col items-center gap-8">
                {/* EN / AR Language Toggle */}
                <div style={{
                  display: 'flex',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.06)',
                }}>
                  {['EN', 'AR'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => handleLangToggle(lang)}
                      style={{
                        padding: '8px 24px',
                        fontFamily: 'var(--font-space-grotesk)',
                        fontSize: '13px',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.25s',
                        background: activeLang === lang ? 'rgba(255,255,255,0.15)' : 'transparent',
                        color: activeLang === lang ? 'white' : 'rgba(255,255,255,0.40)',
                      }}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                <a 
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    width: '100%',
                    padding: '16px 0',
                    textAlign: 'center',
                    background: '#F42525',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: '14px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: 'white',
                    textTransform: 'uppercase',
                  }}
                >
                  Get a Quote &rarr;
                </a>

                <div className="flex gap-6 mt-4 text-[rgba(255,255,255,0.6)]">
                  <a href="https://instagram.com/brandworkskw" target="_blank" rel="noreferrer" className="hover:text-[#F42525] transition-colors"><InstagramIcon /></a>
                  <a href="https://linkedin.com/company/brandworks" target="_blank" rel="noreferrer" className="hover:text-[#2196E8] transition-colors"><LinkedinIcon /></a>
                  <a href="https://wa.me/96550727586" target="_blank" rel="noreferrer" className="hover:text-[#0DC76A] transition-colors"><WhatsAppIcon /></a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
