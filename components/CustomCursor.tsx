'use client';

import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

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

      // Disable cursor over iframes (like maps) or explicitly disabled areas
      const disableEl = target.closest('iframe, [data-cursor-disable="true"]');
      if (disableEl) {
        setIsHidden(true);
        setIsHovering(false);
        return;
      }
      setIsHidden(false);
      
      // Check for interactive elements
      const interactiveEl = target.closest('a, button, input, textarea, select, [role="button"]');

      let isPointer = false;
      if (!interactiveEl) {
        // Fallback: check if the computed cursor is pointer
        const style = window.getComputedStyle(target);
        if (style.cursor === 'pointer') {
          isPointer = true;
        }
      }

      // Check for text elements
      const textTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'strong', 'em', 'li', 'label', 'th', 'td', 'blockquote'];
      let isText = false;
      
      if (target.closest && target.closest(textTags.join(', '))) {
        isText = true;
      } else {
        // Check if the specific target element contains direct text nodes
        for (let i = 0; i < target.childNodes.length; i++) {
          const node = target.childNodes[i];
          if (node.nodeType === Node.TEXT_NODE && node.nodeValue && node.nodeValue.trim() !== '') {
            isText = true;
            break;
          }
        }
      }

      if (interactiveEl || isPointer || isText) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Hide cursor when leaving window entirely
    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    const render = () => {
      // Lerp for the outer ring (slowed down to 0.1 for the classic trailing displacement effect)
      smoothedRing.current.x += (mouse.current.x - smoothedRing.current.x) * 0.1;
      smoothedRing.current.y += (mouse.current.y - smoothedRing.current.y) * 0.1;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${smoothedRing.current.x}px, ${smoothedRing.current.y}px, 0) translate(-50%, -50%)`;
      }
      
      requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    let raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center"
        style={{
          width: isHovering ? '64px' : '36px',
          height: isHovering ? '64px' : '36px',
          border: isHovering ? '1px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.25)',
          background: 'transparent',
          boxShadow: isHovering ? 'inset 0 0 15px rgba(255,255,255,0.3)' : 'inset 0 0 8px rgba(255,255,255,0.15)',
          backdropFilter: 'blur(0px) contrast(160%) saturate(120%)',
          WebkitBackdropFilter: 'blur(0px) contrast(160%) saturate(120%)',
          transition: 'width 0.3s ease-out, height 0.3s ease-out, border 0.3s ease-out, background 0.3s ease-out, box-shadow 0.3s ease-out, opacity 0.3s ease-out',
          opacity: isHidden ? 0 : 1,
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000]"
        style={{
          transition: 'opacity 0.2s ease',
          opacity: isHidden || isHovering ? 0 : 1,
        }}
      />
    </>
  );
}
