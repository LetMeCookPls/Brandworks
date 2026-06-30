'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * VideoBackground
 * ---------------
 * A fixed, full-viewport video that loops silently behind every section
 * EXCEPT the Hero (which has its own video + overflow:hidden) and the
 * Footer (which renders a solid bg-brand-dark surface over the top).
 *
 * z-index strategy
 *   -20  video element   ← lowest, never interacts
 *   -10  dark overlay    ← dims the footage so text stays legible
 *    0+  page content    ← normal flow
 */

const VIDEO_URL =
  'https://res.cloudinary.com/dehtmwxwn/video/upload/v1782451572/Video_Project_3_nzfl0x.mp4';

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollY } = useScroll();
  const [vh, setVh] = useState(800);

  useEffect(() => {
    // Set accurate viewport height on client side
    setVh(window.innerHeight);
    const handleResize = () => setVh(window.innerHeight);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fade IN the video starting at 80% of hero height, fully visible at 150% (mid GlobalPartners)
  // This perfectly crossfades with the HeroGrid fading out!
  const videoOpacity = useTransform(scrollY, [vh * 0.8, vh * 1.5], [0, 0.7]);
  const overlayOpacity = useTransform(scrollY, [vh * 0.8, vh * 1.5], [0, 1]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  }, []);

  return (
    <>
      {/* ── Looping video ── */}
      <motion.video
        ref={videoRef}
        className="fixed inset-0 w-full h-full object-cover pointer-events-none"
        style={{ zIndex: -20, opacity: videoOpacity }}
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        preload="auto"
      />

      {/* ── Dark tint overlay so body text stays readable ── */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -10,
          opacity: overlayOpacity,
          background:
            'linear-gradient(to bottom, rgba(13,13,15,0.45) 0%, rgba(13,13,15,0.35) 100%)',
        }}
        aria-hidden="true"
      />
    </>
  );
}
