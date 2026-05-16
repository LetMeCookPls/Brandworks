'use client';

/**
 * HeroVideo
 * ---------
 * The Hero section's background video rendered as a FIXED element so it
 * never scrolls with the page.
 *
 * Visibility logic
 *   - Fully visible (opacity 1) while the user is in Hero + GlobalPartners
 *   - Smoothly fades to 0 as the Services section enters the viewport
 *   - Uses a scroll listener + CSS transition for maximum performance
 *     (avoids Framer Motion so there's no JS animation frame cost)
 */

import { useEffect, useRef } from 'react';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_024928_1efd0b0d-6c02-45a8-8847-1030900c4f63.mp4';

export default function HeroVideo() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    function onScroll() {
      // Target: the #services section
      const services = document.getElementById('services');
      if (!services) return;

      const servicesTop = services.getBoundingClientRect().top;
      const vh = window.innerHeight;

      // Start fading when Services is 80% down the viewport,
      // fully invisible when it reaches 10% from top.
      const fadeStart = vh * 0.8;
      const fadeEnd   = vh * 0.1;

      if (servicesTop >= fadeStart) {
        wrapper!.style.opacity = '1';
      } else if (servicesTop <= fadeEnd) {
        wrapper!.style.opacity = '0';
      } else {
        const progress = (servicesTop - fadeEnd) / (fadeStart - fadeEnd); // 1→0
        wrapper!.style.opacity = String(Math.max(0, Math.min(1, progress)));
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        transition: 'opacity 0.15s linear',
      }}
      aria-hidden="true"
    >
      {/* ── Video ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ opacity: 1 }}
      />

      {/* ── Vignette layers (same as original Hero) ── */}
      {/* Radial vignette — darkens edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, #0D0D0F 100%)',
        }}
      />
      {/* Left-side gradient so text stays legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, #0D0D0F 0%, rgba(13,13,15,0.80) 40%, rgba(13,13,15,0.30) 70%, transparent 100%)',
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{ background: 'linear-gradient(to top, #0D0D0F 0%, transparent 100%)' }}
      />
      {/* Top fade for nav blend */}
      <div
        className="absolute top-0 left-0 right-0 h-24"
        style={{ background: 'linear-gradient(to bottom, #0D0D0F 0%, transparent 100%)' }}
      />
      {/* Brand-red accent tint */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[300px]"
        style={{
          background:
            'radial-gradient(ellipse at bottom left, rgba(244,37,37,0.12) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
