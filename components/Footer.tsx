'use client'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail } from 'lucide-react'

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
import Link from 'next/link'
import SplitText from '@/components/SplitText'
import HoverSplitText from '@/components/HoverSplitText'

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      viewport={{ once: true, margin: '100px' }}
      className="relative w-full overflow-hidden bg-[#050508] text-white"
    >
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
          opacity: 0.55,
          willChange: 'transform, opacity',
          transform: 'translateZ(0)'
        }}
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_074215_04640ca7-042c-45d6-bb56-58b1e8a42489.mp4" type="video/mp4" />
      </video>

      {/* GRADIENT OVERLAY */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(5,5,8,0.45) 0%, rgba(5,5,8,0.25) 40%, rgba(5,5,8,0.55) 100%)'
      }} />

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 w-full">
        {/* WORDMARK SECTION */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: '72px',
          paddingBottom: '40px',
          textAlign: 'center',
          overflow: 'hidden',
        }}>
          {/* BRANDWORKS */}
          <div className="liquid-glass-text" style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(52px, 12vw, 190px)',
            letterSpacing: '0.01em',
            lineHeight: 0.92,
            display: 'block',
          }}>
            <SplitText text="BRANDWORKS" delay={0} />
          </div>

          {/* ADVERTISING CO. */}
          <div className="liquid-glass-text" style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(20px, 4vw, 62px)',
            letterSpacing: '0.18em',
            marginTop: '-4px',
            display: 'block',
            opacity: 0.88,
          }}>
            <SplitText text="ADVERTISING CO." delay={0.3} />
          </div>
        </div>

        {/* DIVIDER 1 */}
        <div style={{
          height: '1px',
          backgroundColor: 'rgba(255,255,255,0.10)',
          position: 'relative',
          zIndex: 10,
        }} className="md:mx-12 mx-6" />

        {/* NAVIGATION ROW */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
          viewport={{ once: true, margin: '-50px' }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 10,
          }}
          className="gap-6 md:gap-12 px-6 md:px-12 py-9 text-[13px] md:text-[15px]"
        >
          {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
            <HoverSplitText
              key={item}
              text={item}
              href={`#${item.toLowerCase()}`}
              staggerDelay={0.015}
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontWeight: 400,
                letterSpacing: '0.04em',
                color: 'rgba(255,255,255,0.55)',
              }}
              className="hover:text-white transition-colors duration-200"
              onClick={() => {
                const el = document.getElementById(item.toLowerCase());
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          ))}
        </motion.div>

        {/* DIVIDER 2 */}
        <div style={{
          height: '1px',
          backgroundColor: 'rgba(255,255,255,0.10)',
          position: 'relative',
          zIndex: 10,
        }} className="md:mx-12 mx-6" />

        {/* CONTACT INFO GRID */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
          viewport={{ once: true, margin: '-50px' }}
          style={{
            position: 'relative',
            zIndex: 10,
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-12 py-12 items-start"
        >
          {/* COLUMN 1: Address */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.38)',
              marginBottom: '16px'
            }}>Address</div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-[10px]">
              <MapPin size={14} color="rgba(255,255,255,0.45)" style={{ marginTop: 2, flexShrink: 0 }} />
              <div className="flex flex-col gap-[2px] items-center sm:items-start">
                <HoverSplitText
                  text="Office 21#, Mezzanine Floor, Al Ritaz Complex,"
                  staggerDelay={0.005}
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.6
                  }}
                  className="hover:text-white transition-colors text-center sm:text-left"
                />
                <HoverSplitText
                  text="Bin Khaldoun St., Hawally, Kuwait"
                  staggerDelay={0.005}
                  style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.6
                  }}
                  className="hover:text-white transition-colors text-center sm:text-left"
                />
              </div>
            </div>
          </div>

          {/* COLUMN 2: Phone */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.38)',
              marginBottom: '16px'
            }}>Phone</div>
            <div className="flex items-center gap-[10px]">
              <Phone size={14} color="#0DC76A" style={{ flexShrink: 0 }} />
              <HoverSplitText
                text="+971 55 998 1420"
                href="tel:+971559981420"
                staggerDelay={0.012}
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.65)',
                }}
                className="hover:text-white transition-colors"
              />
            </div>
            <div className="flex items-center gap-[10px] mt-3">
              <Phone size={14} color="#0DC76A" style={{ flexShrink: 0 }} />
              <HoverSplitText
                text="+965 507 27586"
                href="tel:+96550727586"
                staggerDelay={0.012}
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.65)',
                }}
                className="hover:text-white transition-colors"
              />
            </div>
          </div>

          {/* COLUMN 3: Email */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.38)',
              marginBottom: '16px'
            }}>Email</div>
            <div className="flex items-center gap-[10px]">
              <Mail size={14} color="#2196E8" style={{ flexShrink: 0 }} />
              <HoverSplitText
                text="info@brandworkskwt.com"
                href="mailto:info@brandworkskwt.com"
                staggerDelay={0.012}
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.65)',
                }}
                className="hover:text-white transition-colors"
              />
            </div>
            <div className="flex items-center gap-[10px] mt-3">
              <Mail size={14} color="#2196E8" style={{ flexShrink: 0 }} />
              <HoverSplitText
                text="mustafa@brandworkskwt.com"
                href="mailto:mustafa@brandworkskwt.com"
                staggerDelay={0.012}
                style={{
                  fontFamily: 'var(--font-dm-sans), sans-serif',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.65)',
                }}
                className="hover:text-white transition-colors"
              />
            </div>
          </div>

          {/* COLUMN 4: Follow Us */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.38)',
              marginBottom: '16px'
            }}>Follow Us</div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px',
            }} className="hover:text-[#F42525] hover:translate-x-[3px] transition-all duration-200 text-[rgba(255,255,255,0.65)]">
              <InstagramIcon />
              <HoverSplitText text="Instagram" href="https://instagram.com/brandworkskw" staggerDelay={0.012} style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '14px', color: 'inherit' }} />
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px',
            }} className="hover:text-[#2196E8] hover:translate-x-[3px] transition-all duration-200 text-[rgba(255,255,255,0.65)]">
              <LinkedinIcon />
              <HoverSplitText text="LinkedIn" href="https://linkedin.com/company/brandworks" staggerDelay={0.012} style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '14px', color: 'inherit' }} />
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px',
            }} className="hover:text-[#0DC76A] hover:translate-x-[3px] transition-all duration-200 text-[rgba(255,255,255,0.65)]">
              <WhatsAppIcon />
              <HoverSplitText text="WhatsApp" href="https://wa.me/96550727586" staggerDelay={0.012} style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: '14px', color: 'inherit' }} />
            </div>
          </div>
        </motion.div>

        {/* DIVIDER 3 */}
        <div style={{
          height: '1px',
          backgroundColor: 'rgba(255,255,255,0.10)',
          position: 'relative',
          zIndex: 10,
        }} className="md:mx-12 mx-6" />

        {/* LEGAL ROW */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 }}
          viewport={{ once: true, margin: '-50px' }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 10,
          }}
          className="gap-6 md:gap-9 px-6 md:px-12 py-6"
        >
          {[
            { name: 'Privacy Policy', path: '/privacy' },
            { name: 'Terms & Conditions', path: '/terms' },
            { name: 'Cookie Policy', path: '/cookies' }
          ].map((item) => (
            <HoverSplitText
              key={item.name}
              text={item.name}
              href={item.path}
              staggerDelay={0.012}
              style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.35)',
              }}
              className="hover:text-[rgba(255,255,255,0.75)] transition-colors duration-200"
            />
          ))}
        </motion.div>

        {/* BOTTOM BAR */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay: 0.4 }}
          viewport={{ once: true, margin: '-50px' }}
          style={{
            position: 'relative',
            zIndex: 10,
            borderTop: '1px solid rgba(255,255,255,0.07)',
          }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 md:px-12 pt-5 pb-10 text-center md:text-left"
        >
          <div className="flex flex-col items-center md:items-start">
            <span style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: '2px'
            }}>© 2026 Brandworks Advertising Co.</span>
            <span style={{
              fontFamily: 'var(--font-dm-sans), sans-serif',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.22)'
            }}>All rights reserved.</span>
          </div>

          <div style={{
            background: 'rgba(13,198,106,0.08)',
            border: '1px solid rgba(13,198,106,0.22)',
            color: 'rgba(13,198,106,0.75)',
            borderRadius: '999px',
            padding: '5px 16px',
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: '11px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            ✓ Licensed & Registered in Kuwait
          </div>

          <div style={{
            fontFamily: 'var(--font-dm-sans), sans-serif',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.20)',
            letterSpacing: '0.05em'
          }}>
            Website by Shaw & LetMeCook
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
