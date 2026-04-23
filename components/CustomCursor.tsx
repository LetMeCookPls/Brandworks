'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('');

  // Mouse positions
  const mouse = useRef({ x: 0, y: 0 });
  
  // Ring smoothed positions
  const smoothedRing = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check for touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }
    
    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      
      // Instantly update dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const clickableRegex = /a|button|input|textarea|select/i;
      
      // Check if clicking close to interactive elements 
      // or cards explicitly marking themselves for hover
      const interactiveEl = target.closest('a, button, input, textarea, select');
      const viewableEl = target.closest('[data-cursor="view"]');

      if (viewableEl) {
        setIsHovering(true);
        setHoverText('VIEW');
      } else if (interactiveEl) {
        setIsHovering(true);
        setHoverText('');
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    const render = () => {
      // Lerp for the outer ring (speed up a bit)
      smoothedRing.current.x += (mouse.current.x - smoothedRing.current.x) * 0.2;
      smoothedRing.current.y += (mouse.current.y - smoothedRing.current.y) * 0.2;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${smoothedRing.current.x}px, ${smoothedRing.current.y}px, 0) translate(-50%, -50%)`;
      }
      
      requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    let raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div 
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center font-space-grotesk text-[10px] font-bold transition-all duration-300 ease-out`}
        style={{
          width: isHovering ? (hoverText ? '64px' : '56px') : '36px',
          height: isHovering ? (hoverText ? '64px' : '56px') : '36px',
          border: isHovering ? '1px solid transparent' : '1px solid rgba(255,255,255,0.4)',
          backgroundColor: isHovering ? (hoverText ? 'rgba(244, 37, 37, 0.9)' : 'rgba(244, 37, 37, 0.2)') : 'transparent',
          color: 'white',
        }}
      >
        <span className="opacity-100 mix-blend-normal z-10 transition-opacity duration-300">
          {hoverText}
        </span>
      </div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000]"
        style={{
          transition: 'opacity 0.2s ease',
          opacity: isHovering && hoverText ? 0 : 1
        }}
      />
    </>
  );
}
